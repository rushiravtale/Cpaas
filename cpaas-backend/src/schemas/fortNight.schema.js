const mongoose = require("mongoose");

const totalVal = {type:Number, default:10}

const FortNightlyPerformanceSchema = new mongoose.Schema(
  {
    agniveerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agniveer",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    sequence: Number,
    physicalTraining: { score: Number, remark: String, total : totalVal },
    gamesPerformance: { score: Number, remark: String, total : totalVal },
    motivationLevel: { score: Number, remark: String, total : totalVal },
    militaryBearing: { score: Number, remark: String, total : totalVal },
    situationalAwareness: { score: Number, remark: String, total : totalVal },

    classPerformance: { score: Number, remark: String, total : totalVal },
    morale: { score: Number, remark: String, total : totalVal },
    decisionMaking: { score: Number, remark: String, total : totalVal },
    resilience: { score: Number, remark: String, total : totalVal },
    integrity: { score: Number, remark: String, total : totalVal },
    totalFortnightPerformance: Number,
    maxTotalFortnightPerformance: { type: Number, default: 100 },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Performance", FortNightlyPerformanceSchema);
