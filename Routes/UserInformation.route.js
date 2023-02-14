const express = require("express");
const { route } = require("../app");
const userController = require("../Controller/UserInformation.controller");
const veryfyToken = require("../Middleware/verifyToken");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);

router.get("/me", veryfyToken, userController.getUserInfo);

module.exports = router;
