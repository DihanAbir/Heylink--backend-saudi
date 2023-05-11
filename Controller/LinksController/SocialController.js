const social = require("../../Models/Links/Social");

// create social
const createSocial = async (req, res) => {
    try {
        console.log(req.body);
        const result = await social.create(req.body);
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


// get all social data
const getSocial = async (req, res) => {
    try {
        const userId = req.user?._id;
        const result = await social.find({ userInfo: [userId] });

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


// get social by id
const getSocialByID = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await social.findById(id);
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


// update social by id
const updateSocialById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (updateData) {
            const result = await social.updateOne(
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

// delete social by id
const deleteSocial = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await social.deleteOne({ _id: id });
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
    createSocial,
    getSocial,
    updateSocialById,
    getSocialByID,
    deleteSocial
}