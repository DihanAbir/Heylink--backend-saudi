const common = require("../../Models/Links/Common");

const createLinks = async (req, res) => {
    try {
        const result = await common.create(req.body);
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


// get all Links data
const getLinks = async (req, res) => {
    try {
        const userId = req.user?._id;
        const result = await common.find({ userInfo: [userId] });

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


// get Links by id
const getLinksByID = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await common.findById(id);
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


// update links by id
const updateLinksById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        // console.log(updateData);

        if (updateData) {
            const result = await common.updateOne(
                { _id: id },
                { $set: updateData },
                { runValidators: true }
            );
            res.status(200).json({
                status: "success",
                message: "Update successfully",
                data: result,
            });
        }
        else {
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

// delete links by id
const deleteLinks = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await common.deleteOne({ _id: id });
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
    createLinks,
    getLinks,
    updateLinksById,
    getLinksByID,
    deleteLinks
}