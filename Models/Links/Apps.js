const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const appsSchema = mongoose.Schema(
  {
    ioslink: {
      type: String,
    },
    androidlink: {
      type: String,
    },
    userInfo: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const apps = mongoose.model("apps", appsSchema);
module.exports = apps;
