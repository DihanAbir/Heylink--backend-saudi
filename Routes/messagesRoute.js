const express = require("express");
const { addMessage, getMessages, deleteMessage } = require("../Controller/messagesController");
const verifyToken = require("../Middleware/verifyToken");
const router = express.Router();

router
    .route("/")
    .post(addMessage)
router
    .route("/:id")
    .get(verifyToken, getMessages)
    .delete(verifyToken, deleteMessage)

module.exports = router;
