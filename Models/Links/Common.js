const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const linksSchema = mongoose.Schema(
  {
    link: {
      type: String,
    },
    linkTitle: {
      type: String,
    },
    image: {
      contentType: String,
    },
    activeFrom: {
      type: String,
    },
    activeUntile: {
      type: String,
    },
    show: {
      type: String,
      enum: ["true", "false"],
      default: "true",
    },

    moveToBottom: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },
    effects: {
      type: String,
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

const common = mongoose.model("common", linksSchema);
module.exports = common;
