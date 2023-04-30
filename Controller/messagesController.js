const allMessages = require("../Models/messageModel");


const addMessage = async (req, res, next) => {
    try {
        const newMessage = new allMessages(req.body)
        const result = await newMessage.save()
        res.status(200).json({
            status: "success",
            message: "Message Send successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Message Send Unsuccssfull",
            error: error.message,
        });
    }
};

const getMessages = async (req, res) => {
    // console.log(req.params);
    try {
        const id = req.params.id;
        const result = await allMessages.find({ userInfo: [id] })

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


const deleteMessage = async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await allMessages.deleteOne({ _id: id });
        res.status(200).json({
            status: "success",
            message: "Message Delete successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: "Message Delete Unsuccessfull",
            error: error.message,
        });
    }
};

module.exports = {
    addMessage,
    getMessages,
    deleteMessage
}