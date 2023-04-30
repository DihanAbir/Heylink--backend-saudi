const bcrypt = require("bcryptjs");
const {
  signupService,
  loginService,
  patchUserIdService,
} = require("../Services/UserInformation.service");
const { generateToken } = require("../utils/token");
const User = require("../Models/UserInformation");

exports.signup = async (req, res) => {
  console.log(req.body);
  try {
    const result = await signupService(req.body);

    if (result) {
      const token = generateToken(result);
      res.status(200).json({
        status: "success",
        message: "Data insert successfully",
        data: { result: result, token },
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data couldn't insert z",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  console.log(req.body.email);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        error: error.message,
      });
    }

    const result = await loginService(email);

    if (!result) {
      return res.status(400).json({
        status: "error",
        error: "no user found please create an account",
      });
    }

    const isPasswordValid = result.comparePassword(password, result.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        status: "error",
        error: "password is not correct",
      });
    }
    if (result.status != "active") {
      return res.status(400).json({
        status: "error",
        error: "account not active",
      });
    }

    const token = generateToken(result);
    const { password: pwd, ...others } = result.toObject();

    res.status(200).json({
      status: "success",
      message: "Data insert successfully",
      data: { result: others, token },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data couldn't insert a",
      error: error.message,
    });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const result = await loginService(req.user?.email);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data couldn't insert",
      error: error.message,
    });
  }
};

exports.patchUserById = async (req, res, next) => {
  // console.log(req.body, req.params.id, "hello");
  try {
    const { id } = req.params;
    const imageFile = req.body;
    // console.log("image file", imageFile);
    const result = await patchUserIdService(id, req.body, imageFile);
    res.status(200).json({
      status: "success",
      message: "Update successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "upadate couldn't success",
      error: error.message,
    });
  }
};


// change email
exports.changeEmail = async (req, res) => {
  const { currentEmail, currentPassword, newEmail } = req.body;
  const { _id } = req.user;
  console.log(_id, currentPassword);
  try {

    const checkEmail = await User.findOne({ email: newEmail })
    console.log(checkEmail);
    if (checkEmail) {
      return res.status(400).json({
        status: "error",
        error: "The Email is Already in use",
      });
    }

    if (!currentEmail || !currentPassword || !newEmail) {
      return res.status(400).json({
        status: "error",
        error: "Please Provide User Info",
      });
    }
    else if (currentEmail && currentPassword && newEmail) {
      const userInfo = await User.findById({ _id: _id })
      if (userInfo?.email === currentEmail) {
        const isPasswordValid = userInfo.comparePassword(currentPassword, userInfo?.password);

        if (!isPasswordValid) {
          return res.status(400).json({
            status: "error",
            error: "password is not correct",
          });
        }
        if (isPasswordValid) {
          console.log("password valid");
          const result = await User.updateOne(
            { _id: _id },
            { $set: { email: newEmail } },
            { runValidators: true }
          );
          const user = await User.findOne({ email: newEmail });
          if (user) {
            const token = generateToken(user);
            res.status(200).json({
              status: "success",
              token: token,
              result: user
            });
          }
        }
      }
      else {
        return res.status(400).json({
          status: "error",
          error: "email is Wrong",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "upadate couldn't success",
      error: error.message,
    });
  }
}



// password change
exports.changePassword = async (req, res) => {
  const { newPassword, currentPassword, currentEmail } = req.body;
  const { _id } = req.user;
  console.log(_id, newPassword);
  try {

    if (!newPassword || !currentEmail || !currentPassword) {
      return res.status(400).json({
        status: "error",
        error: "Please Provide Password",
      });
    }
    else if (newPassword && currentEmail && currentPassword) {
      const userInfo = await User.findById({ _id: _id })
      if (userInfo?.email === currentEmail) {
        const isPasswordValid = userInfo.comparePassword(currentPassword, userInfo?.password);

        if (!isPasswordValid) {
          return res.status(400).json({
            status: "error",
            error: "password is not correct",
          });
        }
        if (isPasswordValid) {
          // console.log("password valid");

          bcrypt.hash(newPassword, 10, async function (err, hash) {
            const result = await User.updateOne(
              { _id: _id },
              { $set: { password: hash } },
              { runValidators: true }
            );
          });

          const user = await User.findOne({ email: userInfo?.email });
          if (user) {
            const token = generateToken(user);
            res.status(200).json({
              status: "success",
              token: token,
              result: user
            });
          }
        }
      }
      else {
        return res.status(400).json({
          status: "error",
          error: "email is Wrong",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "upadate couldn't success",
      error: error.message,
    });
  }
}
