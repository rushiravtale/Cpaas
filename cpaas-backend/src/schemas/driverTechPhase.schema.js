const mongoose = require("mongoose");

const DriverTechPhaseSchema = new mongoose.Schema(
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

    theoretical: {
      writtenScore: Number,
      maxWrittenScore: { type: Number, default: 50 },
      quizScore: Number,
      maxQuizScore: { type: Number, default: 30 },
      theoreticalPercentage: { type: Number, default: null },
      theoreticalRank: { type: Number, default: null },
    },

    practical: {
      practTest1: {
        sysTraceOut: Number,
        maxSysTraceOut: { type: Number, default: 10 },
        idenOfPartsScore: Number,
        maxIdenOfPartsScore: { type: Number, default: 10 },
        viva: Number,
        maxViva: { type: Number, default: 5 },
      },

      smlTest: {
        trackWithObst: Number,
        maxTrackWithObst: { type: Number, default: 5 },
        // blt: Number,
        // maxBlt: { type: Number, default: 5 },
        tatraLoading: Number,
        maxTatraLoading: { type: Number, default: 5 },
        blt: Number,
        maxBlt: { type: Number, default: 5 },
        rollingStock: Number,
        maxRollingStock: { type: Number, default: 5 },
        flotation: Number,
        maxFlotation: { type: Number, default: 5 },
      },
      practTest2: {
        tote: Number,
        maxTote: { type: Number, default: 10 },
        fillingChecking: Number,
        maxFillingChecking: { type: Number, default: 5 },
        greasing: Number,
        maxGreasing: { type: Number, default: 5 },
      },
      drivingTest: {
        xCountry: Number,
        maxXCountry: { type: Number, default: 25 },
        obst: Number,
        maxObst: { type: Number, default: 25 },
      },
      practicalPercentage: { type: Number, default: null },
      practicalRank: { type: Number, default: null },
    },
    restrictiveQuality: String,
    totalTheoreticalScore: Number,
    maxTheoraticalScore: { type: Number, default: 80 },
    totalPracticalScore: Number,
    maxPracticalScore: { type: Number, default: 120 },
    finalScore: Number,
    maxTotalScore: { type: Number, default: 200 },
    overallPercentage: { type: Number, default: null },
    overallRank: { type: Number, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("driverTechPhase", DriverTechPhaseSchema);
