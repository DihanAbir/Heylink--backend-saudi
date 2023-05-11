const express = require("express");
const router = express.Router();
const verifyToken = require("../../Middleware/verifyToken.js");
const { createLinks, getLinks, updateLinksById, deleteLinks, getLinksByID } = require("../../Controller/LinksController/LinksController.js");

router
    .route("/")
    .post(verifyToken, createLinks)
    .get(verifyToken, getLinks);
router
    .route("/:id")
    .patch(verifyToken, updateLinksById)
    .delete(verifyToken, deleteLinks)
    .get(verifyToken, getLinksByID);
module.exports = router;
