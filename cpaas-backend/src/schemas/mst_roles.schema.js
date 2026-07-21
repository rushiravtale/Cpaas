const mongoose = require("mongoose");

const mstRolesSchema = mongoose.Schema({
  name: String,
  description: String,
  label: String,
  // permissionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
});

module.exports = mongoose.model("Role", mstRolesSchema, "mst_roles");
