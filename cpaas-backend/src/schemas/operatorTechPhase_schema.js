const mongoose = require("mongoose");

const OperatorTechPhaseSchema = new mongoose.Schema(
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
      rscnr100: {
        clrMode: Number,
        maxClrMode: { type: Number, default: 5 },
        secMode: Number,
        maxSecMode: { type: Number, default: 10 },
        ajMode: Number,
        maxAjMode: { type: Number, default: 10 },
      },
      rsStarsVMk: {
        clrComn: Number,
        maxClrComn: { type: Number, default: 5 },
        secComn: Number,
        maxSecComn: { type: Number, default: 10 },
        fh2Comm: Number,
        maxFh2Comm: { type: Number, default: 10 },
      },

      dch: {
        idsel: Number,
        maxIdsel: { type: Number, default: 5 },
        srComn: Number,
        maxSrComn: { type: Number, default: 5 },
        tele: Number,
        maxTele: { type: Number, default: 10 },
      },

      rtProc: {
        sigStrReportSheet: Number,
        maxSigStrReportSheet: { type: Number, default: 5 },
        useOfCode: Number,
        maxUseOfCode: { type: Number, default: 10 },
        viva: Number,
        maxViva: { type: Number, default: 5 },
      },

      rsVrc: {
        dualFreq: Number,
        maxDualFreq: { type: Number, default: 5 },
      },
      byt: {
        seriesParallel: Number,
        maxSeriesParallel: { type: Number, default: 5 },
      },

      misc: {
        idenOfParts: Number,
        maxIdenOfParts: { type: Number, default: 10 },
        outDoorEx: Number,
        MaxOutDoorEx: { type: Number, default: 10 },
      },
      practicalPercentage: { type: Number, default: null },
      practicalRank: { type: Number, default: null },
    },
    restrictiveQuality: String,

    totalPracticalScore: Number,
    maxPracticalScore: { type: Number, default: 120 },
    totalTheoreticalScore: Number,
    maxTheoraticalScore: { type: Number, default: 80 },
    finalScore: Number,
    maxTotalScore: { type: Number, default: 200 },
    overallPercentage: { type: Number, default: null },
    overallRank: { type: Number, default: null },
  },
  { timestamps: true },
);

module.exports = mongoose.model("operatorTechPhase", OperatorTechPhaseSchema);
