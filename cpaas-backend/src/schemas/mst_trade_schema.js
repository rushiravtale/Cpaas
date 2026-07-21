const mongoose = require("mongoose");

const mstTradesSchema = mongoose.Schema({
  name: String,
  label: String,
  index: Number,
  // permissionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
});

module.exports = mongoose.model("Trade", mstTradesSchema, "mst_trade");
