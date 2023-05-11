const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token");
const User = require("../Models/UserInformation");


// user Singup with email, username and Password
exports.signup = async (req, res) => {
  try {
    const findEmail = await User.findOne({ email: req.body.email })
    const findUsername = await User.findOne({ username: req.body.username })
    if (findEmail || findUsername) {
      res.status(200).json({
        status: "error",
        message: {
          emailMessage: findEmail ? "Email Already in Use" : "",
          usernameMessage: findUsername ? "Username already in use" : ""
        },
        data: req.body.email
      });
    }
    else {
      if (findUsername) {
        // console.log("ace");
        return res.status(400).json({
          status: "error",
          message: { usernameMessage: "Username already in use" },
          error: "upadate couldn't success",
        });
      }

      else {
        const newUser = {
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          verified: req.body.verified ? req.body.verified : "false"
        }
        const result = await User.create(newUser)

        if (result) {
          const token = generateToken(result);
          res.status(200).json({
            status: "success",
            message: "Data insert successfully",
            data: { result: result, token },
          });
        }
      }

    }

  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data couldn't insert z",
      error: error.message,
    });
  }
};



// user Singup with email, username and Password
exports.signupWithSocial = async (req, res) => {
  console.log(req.body);
  try {
    const findEmail = await User.findOne({ email: req.body.email })
    const findUsername = await User.findOne({ username: req.body.username })

    console.log(findEmail, findUsername);

    if (findEmail && findEmail?.createWith === "google") {
      console.log("ace user");
      const token = generateToken(findEmail);
      res.status(200).json({
        status: "success",
        message: "Data insert successfully",
        token: token,
        data: findEmail,
      });
    }
    else {
      if (findUsername) {
        return res.send({ message: { usernameMessage: "Username already in use" } })
      }
      else {
        const newUser = {
          email: req.body.email,
          username: req.body.username,
          profiletitle: req.body.profiletitle && req.body.profiletitle,
          image: req.body.image,
          createWith: req.body.createWith,
          verified: req.body.verified
        }
        const result = await User.create(newUser)

        if (result) {
          const token = generateToken(result);
          res.status(200).json({
            status: "success",
            message: "Data insert successfully",
            token: token,
            data: result,
          });
        }
      }

    }

  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data couldn't insert z",
      error: error.message,
    });
  }
};


// user login with email and Password
exports.login = async (req, res) => {
  // console.log(req.body.email);
  try {

    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({
        status: "error",
        error: error.message,
      });
    }
    else {
      const findEmail = await User.findOne({ email: email })
      // console.log(findEmail);
      if (!findEmail) {
        return res.send({
          status: "error",
          message: { emailMessage: "There is no account on this email" }
        });
      }
      else {
        const isPasswordValid = findEmail.comparePassword(password, findEmail?.password);
        // console.log(isPasswordValid);
        if (isPasswordValid) {
          // console.log("password valid");
          const token = generateToken(findEmail);
          // console.log(object);
          const { password: pwd, ...others } = findEmail.toObject();

          res.status(200).json({
            status: "success",
            message: "Data insert successfully",
            data: { result: others, token },
          });
        }
        else {
          // console.log("password wrong");
          return res.send({
            status: "error",
            message: { passwordMessage: "password is not correct" }
          });
        }
      }

    }

  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data couldn't insert a",
      error: error.message,
    });
  }
};



// get user info
exports.getUserInfo = async (req, res) => {
  try {
    const email = req.user.email
    const result = await User.findOne({ email });
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


// user info update by user id
exports.patchUserById = async (req, res) => {
  console.log(req.body, "id: ", req.params.id, "hello");
  try {
    const { id } = req.params;
    const result = await User.updateOne(
      { _id: id },
      { $set: req.body },
      { runValidators: true }
    );
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
  // console.log(_id, currentPassword);
  try {

    const checkEmail = await User.findOne({ email: newEmail })
    // console.log(checkEmail);
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
          // console.log("password valid");
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
  // console.log(_id, newPassword);
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



// username update by user id
exports.updateUsername = async (req, res, next) => {
  // console.log(req.body, req.params.id, "hello");
  try {
    const { id } = req.params;
    // console.log(id, req.body);

    if (req.body) {
      const findUsername = await User.findOne({ username: req.body.username })
      if (findUsername) {
        // console.log("ace");
        return res.status(400).json({
          status: "error",
          message: "Username already in use",
          error: "upadate couldn't success",
        });
      }
      else {
        // console.log("nai");
        const result = await User.updateOne(
          { _id: id },
          { $set: req.body },
          { runValidators: true }
        );
        return res.status(200).json({
          status: "success",
          message: "username Update successfully",
          data: result,
        });
      }
    }
    else {
      return res.status(400).json({
        status: "error",
        message: "Please Provide new Username",
        error: "Data not found",
      });
    }

  }
  catch (error) {
    res.status(400).json({
      status: "error",
      message: "upadate couldn't success",
      error: error.message,
    });
  }
};
