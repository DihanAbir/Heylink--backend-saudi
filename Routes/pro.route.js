const express = require("express");
const proController = require("../Controller/pro.controller");
const verifyToken = require("../Middleware/verifyToken");
const router = express.Router();

router
  .route("/")
  .post(verifyToken, proController.createPro)
  .get(verifyToken, proController.getPro);
router
  .route("/:id")
  //   .delete(verifyToken, proController.deleteEmployeeById)
  .patch(verifyToken, proController.patchProById);

module.exports = router;
