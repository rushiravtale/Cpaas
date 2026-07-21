
const mongoose = require("mongoose");


const mstPermissionsSchema = mongoose.Schema(
  {
    name: String,
    trade:String,
    permission: { type: [String], default: [] }

  },
  { timestamps: true }
);


module.exports = mongoose.model("Permission", mstPermissionsSchema, "mst_permissions");
