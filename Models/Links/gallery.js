const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const gallerySchema = mongoose.Schema(
  {
    image: {
      data: Buffer,
      contentType: String,
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

const gallery = mongoose.model("gallery", gallerySchema);
module.exports = gallery;
