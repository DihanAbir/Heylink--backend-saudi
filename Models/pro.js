const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const proSchema = mongoose.Schema(
  {
    subscriptionplane: {
      type: String,
    },
    price: {
      type: String,
    },
    country: {
      type: String,
    },
    discountcode: {
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

const pro = mongoose.model("pro", proSchema);
module.exports = pro;
