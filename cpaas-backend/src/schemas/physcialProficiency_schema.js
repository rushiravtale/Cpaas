const mongoose = require("mongoose");

//const ratingEnum = ["Excellent", "Good", "Satisfactory", "Fail"];
const ratingEnum = [4, 3, 2, 1];
const passFailEnum = [4, 1]; // Pass = 4, Fail = 1

const PhyscialProficiencySchema = new mongoose.Schema(
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

    bpet: {
      fiveKmRun: { type: Number, enum: ratingEnum, required: true, default: 1 },
      sixtyMeterSprint: {
        type: Number,
        enum: ratingEnum,
        required: true,
        default: 1,
      },
      horizontalRope: {
        type: Number,
        enum: passFailEnum,
        required: true,
        default: 1,
      },
      verticalRope: {
        type: Number,
        enum: passFailEnum,
        required: true,
        default: 1,
      },
      nineFeetDitch: {
        type: Number,
        enum: passFailEnum,
        required: true,
        default: 1,
      },
    },

    ppt: {
      twoPointFourKm: {
        type: Number,
        enum: ratingEnum,
        required: true,
        default: 1,
      },
      chinUps: { type: Number, enum: ratingEnum, required: true, default: 1 },
      toeTouch: { type: Number, enum: ratingEnum, required: true, default: 1 },
      sitUps: { type: Number, enum: ratingEnum, required: true, default: 1 },
      sprint100m: {
        type: Number,
        enum: ratingEnum,
        required: true,
        default: 1,
      },
      fiveMeterShuttle: {
        type: Number,
        enum: ratingEnum,
        required: true,
        default: 1,
      },
    },
    maxTotalPptPerformance: { type: Number, default: 24 },
    maxTotalBpetPerformance: { type: Number, default: 20 },
    maxTotalPhyscialPerformance: { type: Number, default: 44 },
  },
  { timestamps: true },
);

module.exports = mongoose.model(
  "PhyscialProficiency",
  PhyscialProficiencySchema,
);
