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

    const decode = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET);

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