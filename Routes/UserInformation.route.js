const express = require("express");
const { route } = require("../app");
const userController = require("../Controller/UserInformation.controller");
const verifyToken = require("../Middleware/verifyToken");
const router = express.Router();

// user login and signup
router.post("/signup", userController.signup);
router.post("/login", userController.login);

// get user info
router.get("/me", verifyToken, userController.getUserInfo);

// password and security
router.patch("/change-email", verifyToken, userController.changeEmail);
router.patch("/change-password", verifyToken, userController.changePassword);

// change username
router.patch("/username/:id", verifyToken, userController.updateUsername);

// user info update by id
router
  .route("/:id")
  .patch(verifyToken, userController.patchUserById);

module.exports = router;
