const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const signupSchema = mongoose.Schema(
  {
    emailSignup: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },
    buttonText: {
      type: String,
    },
    successMessage: {
      type: String,
    },
    termsAndConditions: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },
    label: {
      type: String,
    },
    termsUrl: {
      type: String,
    },
    appearance: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },

    buttonColor: {
      type: String,
    },
    buttonBorderColor: {
      type: String,
    },
    buttonTextColor: {
      type: String,
    },
    successMessageColor: {
      type: String,
    },
    successMessageTextColor: {
      type: String,
    },

    smsSignup: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },

    buttonTextSms: {
      type: String,
    },
    successMessageSms: {
      type: String,
    },
    termsAndConditionsSms: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },
    labelSms: {
      type: String,
    },
    termsUrlSms: {
      type: String,
    },
    appearanceSms: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },

    buttonColorSms: {
      type: String,
    },
    buttonBorderColorSms: {
      type: String,
    },
    buttonTextColorSms: {
      type: String,
    },
    successMessageColorSms: {
      type: String,
    },
    successMessageTextColorSms: {
      type: String,
    },

    whatsAppSignup: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },

    buttonTextWhatsApp: {
      type: String,
    },
    successMessageWhatsApp: {
      type: String,
    },
    termsAndConditionsWhatsApp: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },
    labelWhatsApp: {
      type: String,
    },
    termsUrlWhatsApp: {
      type: String,
    },
    appearanceWhatsApp: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },

    buttonColorWhatsApp: {
      type: String,
    },
    buttonBorderColorWhatsApp: {
      type: String,
    },
    buttonTextColorWhatsApp: {
      type: String,
    },
    successMessageColorWhatsApp: {
      type: String,
    },
    successMessageTextColorWhatsApp: {
      type: String,
    },

    source: {
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

const signup = mongoose.model("signup", signupSchema);
module.exports = signup;
