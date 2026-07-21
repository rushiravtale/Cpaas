
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const courseSchema = mongoose.Schema(
  {
    courseName: { type: String, required: true, unique: true },
    tradeId: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Trade", required: true },
    ],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);
courseSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Course", courseSchema, "courses");
