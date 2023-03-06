const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const musicSchema = mongoose.Schema(
  {
    link: {
      type: String,
    },
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    show: {
      type: String,
      enum: ["true", "false"],
      default: "true",
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

const music = mongoose.model("music", musicSchema);
module.exports = music;
