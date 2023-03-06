const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const socialSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    link: {
      type: String,
    },
    bottom: {
      type: String,
      enum: ["button", "icon"],
      default: "button",
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

const social = mongoose.model("social", socialSchema);
module.exports = social;
