const express = require("express");
const router = express.Router();
const verifyToken = require("../../Middleware/verifyToken.js");
const { createSocial, getSocial, updateSocialById, deleteSocial, getSocialByID } = require("../../Controller/LinksController/SocialController.js");

router
    .route("/")
    .post(verifyToken, createSocial)
    .get(verifyToken, getSocial);
router
    .route("/:id")
    .patch(verifyToken, updateSocialById)
    .delete(verifyToken, deleteSocial)
    .get(verifyToken, getSocialByID);
module.exports = router;
