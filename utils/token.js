const jwt = require("jsonwebtoken");

exports.generateToken = (userInfo) => {
  const payLoad = {
    email: userInfo.email,
    role: userInfo.role,
    _id: userInfo._id,
  };
  const token = jwt.sign(payLoad, process.env.TOKEN_SECRET, {
    expiresIn: "7days",
  });

  return token;
};
