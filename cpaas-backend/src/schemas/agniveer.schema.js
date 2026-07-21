const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const agniveerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    armyNumber: { type: String, required: true, unique: true },
    rank: { type: String, required: true },
    unit: { type: String, required: true },
    tradeId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Trade", required: true },
    ],
    squadNumber: { type: Number, required: true },
    civilEdn: { type: String, required: true },
    anyOtherQualification: { type: String, required: true },
    fatherName: { type: String, required: true },
    contactNumber: { type: String, required: true, match: /^[0-9]{10}$/ },
    address: { type: String, required: true },
    grade: { type: String, default: null },
    courseName: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    ],
  },
  { timestamps: true },
);
agniveerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Agniveer", agniveerSchema, "agniveer");
