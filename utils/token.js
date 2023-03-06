const jwt = require("jsonwebtoken");

exports.generateToken = (userInfo) => {
  const payLoad = {
    email: userInfo.email,
    role: userInfo.role,
    _id: userInfo._id,
  };
  const token = jwt.sign(payLoad, '6d26f2079e3afdfc7508685c1684ef815cc7d1430183702eaa5e055738deaea18f20f0603d436630886e7c5b82aa3e40d971855efea4f37a7f2370ecd05b432d', {
    expiresIn: "7days",
  });

  return token;
};
