const common = require("../Models/Links/Common");
const gallery = require("../Models/Links/gallery");
const location = require("../Models/Links/Location");
const menu = require("../Models/Links/Menu");
const music = require("../Models/Links/Music");
const social = require("../Models/Links/Social");
const message = require("../Models/message");
const User = require("../Models/UserInformation");

exports.getViewData = async (req, res) => {
    try {
        const { name } = req.params;

        const userData = await User.findOne({ username: name });
        if (!userData) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }

        const id = userData._id;
        // galleryData, menuData,musicData,
        const [commonData, socialData, locationData, messageData] = await Promise.all([
            common.find({ userInfo: [id] }),
            social.find({ userInfo: [id] }),
            location.find({ userInfo: [id] }),
            message.find({ userInfo: [id] }),
            // gallery.find({ userInfo: [id] }),
            // menu.find({ userInfo: [id] }),
            // music.find({ userInfo: [id] }),
        ]);
        // galleryData, menuData,musicData,
        const result = { userData, commonData, socialData, locationData, messageData };

        res.status(200).json({
            status: "success",
            message: "Data fetched successfully",
            data: result,
        });

    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Data couldn't be fetched",
            error: error.message,
        });
    }
}