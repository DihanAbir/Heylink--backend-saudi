const express = require("express");
const messageController = require("../Controller/message.controller");
const verifyToken = require("../Middleware/verifyToken");
const router = express.Router();

router
  .route("/")
  .post(verifyToken, messageController.createMessage)
  .get(verifyToken, messageController.getMessage);
router
  .route("/:id")
  .delete(verifyToken, messageController.deleteMessageById)
  .patch(verifyToken, messageController.patchMessageById);

module.exports = router;
