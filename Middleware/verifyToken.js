const jwt = require("jsonwebtoken");
const { promisify } = require("util");
module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")?.[1];
    if (!token) {
      return res.status(400).json({
        status: "error",
        error: "you are not login",
      });
    }

    const decode = await promisify(jwt.verify)(token, '6d26f2079e3afdfc7508685c1684ef815cc7d1430183702eaa5e055738deaea18f20f0603d436630886e7c5b82aa3e40d971855efea4f37a7f2370ecd05b432d');

    req.user = decode;
    next();
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "invalid token",
      error: error.message,
    });
  }
};
