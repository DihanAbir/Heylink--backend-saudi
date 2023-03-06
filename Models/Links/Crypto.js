const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const cryptoSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    address: {
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

const crypto = mongoose.model("crypto", cryptoSchema);
module.exports = crypto;
