const mongoose = require("mongoose");

const userTokensSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  token: String,
  refreshToken: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  expiryTime: Number,
  refreshExpiryTime: Number,
});

module.exports = mongoose.model("UserToken", userTokensSchema, "user_tokens");
