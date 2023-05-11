const location = require("../../Models/Links/Location");
const social = require("../../Models/Links/Social");

// create location
const createLocation = async (req, res) => {
    try {
        const result = await location.create(req.body);
        res.status(200).json({
            status: "success",
            message: "Data inserted successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Data couldn't insert",
            error: error.message,
        });
    }
}


// get all location data
const getLocations = async (req, res) => {
    try {
        const userId = req.user?._id;
        const result = await location.find({ userInfo: [userId] });

        res.status(200).json({
            status: "success",
            message: "Data get successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Data couldn't get",
            error: error.message,
        });
    }
};


// get location by id
const getLocationByID = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await location.findById(id);
        res.status(200).json({
            status: "success",
            message: "Data get successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Data couldn't get",
            error: error.message,
        });
    }
};


// update location by id
const updateLocationById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        // console.log(id, updateData);

        if (updateData) {
            const result = await location.updateOne(
                { _id: id },
                { $set: updateData },
                { runValidators: true }
            );
            res.status(200).json({
                status: "success",
                message: "Update successfully",
                data: result,
            });
        } else {
            res.status(400).json({
                status: "error",
                message: "upadate couldn't success",
                error: "No Update Data",
            });
        }

    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "upadate couldn't success",
            error: error.message,
        });
    }
};

// delete location by id
const deleteLocation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await location.deleteOne({ _id: id });
        res.status(200).json({
            status: "success",
            message: "Data delete successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Data is not Delete",
            error: error.message,
        });
    }
};


module.exports = {
    createLocation,
    getLocations,
    updateLocationById,
    getLocationByID,
    deleteLocation
}