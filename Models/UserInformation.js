const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      //   validate: {
      //     validator: (value) =>
      //       validator.isStrongPassword(value, {
      //         minLength: 6,
      //       }),
      //     message: "Password {VALUE} is not strong",
      //   },
    },

    role: {
      type: String,
    },

    username: {
      type: String,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },

    image: {
      data: Buffer,
      contentType: String,
    },
    profiletitle: {
      type: String,
    },
    quicklyjump: {
      type: String,
    },

    shortcut: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },

    qrCode: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },

    customeAvators: {
      type: String,
    },

    them: {
      type: String,
    },
    footer: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },

  { timestamps: true }
);

// password hashing
userSchema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcryptjs.hashSync(password);
  this.password = hashedPassword;
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcryptjs.compareSync(password, hash);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
