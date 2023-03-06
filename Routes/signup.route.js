const express = require("express");
const signupController = require("../Controller/signup.controller");
const verifyToken = require("../Middleware/verifyToken");
const router = express.Router();

router
  .route("/")
  .post(verifyToken, signupController.createSignup)
  .get(verifyToken, signupController.getSignup);
router
  .route("/:id")
  .delete(verifyToken, signupController.deletesignupById)
  .patch(verifyToken, signupController.patchsignupById);

module.exports = router;
