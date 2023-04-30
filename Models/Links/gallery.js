const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const gallerySchema = mongoose.Schema(
  {
    // image: {
    //   data: Buffer,
    //   contentType: String,
    // },

    title: {
      type: String,
    },
    show: {
      type: String,
      enum: ["true", "false"],
      default: "true",
    },
    showAs: {
      type: String,
      enum: ["slider", "grid"],
      default: "slider",
    },

    descriptionAndLinks: {
      type: String,
      enum: ["forslider", "forEveryImage"],
      default: "slider",
    },

    addDescription: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },

    imageSliderTitle: {
      type: String,
    },
    imageSliderDescription: {
      type: String,
    },

    addlinks: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },

    linkText: {
      type: String,
    },
    linkUrl: {
      type: String,
    },

    imageTitle: {
      type: String,
    },
    imageDescription: {
      type: String,
    },
    imagelinkText: {
      type: String,
    },
    imagelinkurl: {
      type: String,
    },

    imageShapeAndSize: {
      type: String,
    },

    advanceImageAutomatically: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },

    advanceImageAutomaticallyTime: {
      type: String,
    },

    appearanceTitleAndDescriptionColor: {
      type: String,
    },
    appearanceLinkTextColor: {
      type: String,
    },
    appearanceButtonBackgroundColorColor: {
      type: String,
    },

    showAsGridImages: [
      {
        imageLinkUrl: { type: String },
      },
    ],
    showAsGridShapeAndSizeImagePerRow: {
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

const gallery = mongoose.model("gallery", gallerySchema);
module.exports = gallery;
