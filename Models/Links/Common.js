const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const linksSchema = mongoose.Schema(
  {
    link: {
      type: String,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    activeFrom: {
      type: String,
    },
    activeUntile: {
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

const common = mongoose.model("common", linksSchema);
module.exports = common;
