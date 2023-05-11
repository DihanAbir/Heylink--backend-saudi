const express = require("express");
const router = express.Router();
const verifyToken = require("../../Middleware/verifyToken.js");
const { createLocation, getLocations, updateLocationById, deleteLocation, getLocationByID } = require("../../Controller/LinksController/LocationsController.js");

router
    .route("/")
    .post(verifyToken, createLocation)
    .get(verifyToken, getLocations);
router
    .route("/:id")
    .patch(verifyToken, updateLocationById)
    .delete(verifyToken, deleteLocation)
    .get(verifyToken, getLocationByID);
module.exports = router;
