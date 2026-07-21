const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = mongoose.Schema(
  {
    name: String,
    userName: { type: String, required: true, unique: true },
    password: String,
    email: { type: String, required: true },
    phoneNo: { type: String, required: false },
    status: { type: Boolean, default: true },
    roleIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
    ],
    tradeId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Trade", required: false },
    ],
    permission: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
        required: false,
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", userSchema);
