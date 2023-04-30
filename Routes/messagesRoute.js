const express = require("express");
const { addMessage, getMessages, deleteMessage } = require("../Controller/messagesController");
const verifyToken = require("../Middleware/verifyToken");
const router = express.Router();

router
    .route("/")
    .post(addMessage)
    .get(verifyToken, getMessages)

router
    .route("/:id")
    .delete(verifyToken, deleteMessage)

module.exports = router;
