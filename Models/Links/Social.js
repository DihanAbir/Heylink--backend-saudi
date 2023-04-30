const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const socialSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    link: {
      type: String,
    },
    image: {
      type: String,
      required: true
    },

    bottom: {
      type: String,
      default: "icon",
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
