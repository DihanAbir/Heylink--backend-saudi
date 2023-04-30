const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const allMessagesSchema = mongoose.Schema(
    {
        messageText: {
            type: String,
        },
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        receivedData: {
            type: Date,
            default: Date.now,
        },
        userInfo: [
            {
                type: ObjectId,
                ref: "User",
                required: [true, "userInfo is required"],
            },
        ],
    },

    {
        timestamps: true,
    }
);

const allMessages = mongoose.model("allMessages", allMessagesSchema);
module.exports = allMessages;
