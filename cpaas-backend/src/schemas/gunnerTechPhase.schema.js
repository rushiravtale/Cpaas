const mongoose = require("mongoose");

const GunnerTechPhaseSchema = new mongoose.Schema(
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
      pkt: {
        saScore: Number,
        maxsaScore: { type: Number, default: 6 },
        idenOfPartsScore: Number,
        maxIdenOfPartsScore: { type: Number, default: 4 },
      },

      eqptph: {
        opStabSys: Number,
        maxOpStabSys: { type: Number, default: 5 },
        opGnrSi: Number,
        maxOpGnrSi: { type: Number, default: 6 },
        opSmkSys: Number,
        maxOpSmkSys: { type: Number, default: 5 },
        idenOfPartsScore: Number,
        maxIdenOfPartsScore: { type: Number, default: 4 },
      },
      gunph: {
        sa: Number,
        maxSa: { type: Number, default: 5 },
        idenOfPartsScore: Number,
        maxIdenOfPartsScore: { type: Number, default: 10 },
      },
      mslph: {
        msl: Number,
        maxMsl: { type: Number, default: 5 },
        idenOfPartsScore: Number,
        maxIdenOfPartsScore: { type: Number, default: 10 },
      },
      ims: {
        atgm: Number,
        maxAtgm: { type: Number, default: 20 },
      },
      fdfiring: {
        gun: Number,
        maxGun: { type: Number, default: 15 },
        pkt: Number,
        maxPkt: { type: Number, default: 10 },
        msl: Number,
        maxMsl: { type: Number, default: 15 },
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
  { timestamps: true },
);

module.exports = mongoose.model("gunnerTechPhase", GunnerTechPhaseSchema);
