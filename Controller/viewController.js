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
        const id = userData?._id

        const commonData = await common.find({ userInfo: [id] })
        const socialData = await social.find({ userInfo: [id] })
        const galleryData = await gallery.find({ userInfo: [id] })
        const menuData = await menu.find({ userInfo: [id] })
        const locationData = await location.find({ userInfo: [id] })
        const musicData = await music.find({ userInfo: [id] })

        const messageData = await message.find({ userInfo: [id] })

        const result = { userData, commonData, socialData, galleryData, menuData, locationData, musicData, messageData }

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