const mongoose = require("mongoose");

const OfcTechPhaseSchema = new mongoose.Schema(
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
      rscnr900m: {
        clrMode: Number,
        maxClrMode: { type: Number, default: 5 },
        secMode: Number,
        maxSecMode: { type: Number, default: 5 },
        ajMode: Number,
        maxAjMode: { type: Number, default: 10 },
      },
      rsStarsVMk2: {
        clrComn: Number,
        maxClrComn: { type: Number, default: 5 },
        secComn: Number,
        maxSecComn: { type: Number, default: 5 },
        fh2Comm: Number,
        maxFh2Comm: { type: Number, default: 10 },
      },

      rtProc: {
        sigStrReportSheet: Number,
        maxSigStrReportSheet: { type: Number, default: 5 },
        useOfCode: Number,
        maxUseOfCode: { type: Number, default: 5 },
      },

      bfsr: {
        installation: Number,
        maxInstallation: { type: Number, default: 10 },
        initialisation: Number,
        maxInitialisation: { type: Number, default: 10 },
        orientation: Number,
        maxOrientation: { type: Number, default: 10 },
        drawMap: Number,
        maxDrawMap: { type: Number, default: 10 },
      },

      misc: {
        idenOfParts: Number,
        maxIdenOfParts: { type: Number, default: 10 },
        outDoorEx: Number,
        MaxOutDoorEx: { type: Number, default: 10 },
        byt: Number,
        maxByt: { type: Number, default: 5 },
      },
      dch: {
        idSelection: Number,
        maxIdSelection: { type: Number, default: 5 },
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

module.exports = mongoose.model("ofcTechPhase", OfcTechPhaseSchema);
