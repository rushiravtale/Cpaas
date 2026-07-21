const mongoose = require("mongoose");

const userOtpsSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  otp: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  expiryTime: Number,
  active: Boolean,
});

module.exports = mongoose.model("UserOtp", userOtpsSchema, "user_otps");
