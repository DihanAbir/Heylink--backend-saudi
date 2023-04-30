const express = require("express");
const router = express.Router();
const { getViewData } = require("../Controller/viewController.js");

router
    .route("/:name")
    .get(getViewData);
module.exports = router;
