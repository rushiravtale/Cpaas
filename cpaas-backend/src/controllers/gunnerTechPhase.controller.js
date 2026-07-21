const {
  calculateGrade,
  percentage,
  calculateDenseRanksByPercentage,
  calculateAndStoreAllDenseRanksForModel,
} = require("../helpers/agniveerGrade.helper");
const Agniveer = require("../schemas/agniveer.schema");
const GunnerTechPhase = require("../schemas/gunnerTechPhase.schema");
const sendResponse = require("../utils/sendResponse");
const mongoose = require("mongoose");

// const calculateAndStoreAllDenseRanks1 = async (courseId) => {
//   const docs = await GunnerTechPhase.find({ courseId });

//   const rankAndSave = async (valueGetter, updatePath) => {
//     const sorted = [...docs].sort((a, b) => valueGetter(b) - valueGetter(a));
//     console.log("sorted.length", sorted.length);
//     const totalCount = sorted.length;
//     let prev = null;

//     for (let i = 0; i < sorted.length; i++) {
//       const curr = valueGetter(sorted[i]);
//       const rank = curr === prev ? i : i + 1; // ✅ GAP LOGIC

//       await GunnerTechPhase.findByIdAndUpdate(sorted[i]._id, {
//         $set: { [updatePath]: rank },
//       });

//       prev = curr;
//     }
//   };

//   await rankAndSave((d) => d.overallPercentage, "overallRank");

//   await rankAndSave(
//     (d) => d.theoretical.theoreticalPercentage,
//     "theoretical.theoreticalRank"
//   );

//   await rankAndSave(
//     (d) => d.practical.practicalPercentage,
//     "practical.practicalRank"
//   );
// };

//main

// const calculateAndStoreAllDenseRanks = async (courseId) => {
//   const docs = await GunnerTechPhase.find({ courseId }).lean();

//   const rankAndSave = async (label, valueGetter, updateBuilder) => {
//     console.log(`\n--- ${label} RANKING START ---`);

//     const sorted = docs
//       .filter((d) => typeof valueGetter(d) === "number")
//       .sort((a, b) => valueGetter(b) - valueGetter(a));

//     let prevValue = null;
//     let rank = 0;

//     for (let i = 0; i < sorted.length; i++) {
//       const currValue = valueGetter(sorted[i]);

//       if (currValue !== prevValue) {
//         rank = i + 1; // competition rank
//       }

//       console.log(
//         `ID: ${sorted[i]._id} | ${label}: ${currValue} | Rank: ${rank}`
//       );

//       await GunnerTechPhase.updateOne(
//         { _id: sorted[i]._id },
//         { $set: updateBuilder(currValue, rank) }
//       );

//       prevValue = currValue;
//     }

//     console.log(`--- ${label} RANKING END ---`);
//   };

//   // OVERALL
//   await rankAndSave(
//     "OVERALL",
//     (d) => d.overallPercentage,
//     (value, rank) => ({
//       overallPercentage: value,
//       overallRank: rank,
//     })
//   );

//   // THEORETICAL
//   await rankAndSave(
//     "THEORETICAL",
//     (d) => d?.theoretical?.theoreticalPercentage,
//     (value, rank) => ({
//       theoretical: {
//         theoreticalPercentage: value,
//         theoreticalRank: rank,
//       },
//     })
//   );

//   // PRACTICAL
//   await rankAndSave(
//     "PRACTICAL",
//     (d) => d?.practical?.practicalPercentage,
//     (value, rank) => ({
//       practical: {
//         practicalPercentage: value,
//         practicalRank: rank,
//       },
//     })
//   );
// };

// const createGunnerTechPhase = async (req, res) => {
//   try {
//     const {
//       _id,
//       agniveerId,
//       courseId,
//       theoretical,
//       practical,
//       restrictiveQuality,
//       totalTheoreticalScore,
//       totalPracticalScore,
//       finalScore,
//     } = req.body;

//     const filter = _id ? { _id } : { agniveerId, courseId };

//     //  1. SAFE UPSERT USING $set
//     const resData = await GunnerTechPhase.findOneAndUpdate(
//       filter,
//       {
//         $set: {
//           agniveerId,
//           courseId,
//           theoretical,
//           practical,
//           restrictiveQuality,
//           totalTheoreticalScore,
//           totalPracticalScore,
//           finalScore,
//         },
//       },
//       {
//         new: true,
//         upsert: true,
//         runValidators: true,
//         setDefaultsOnInsert: true,
//       }
//     );

//     //  2. CALCULATE PERCENTAGES
//     let theoreticalPercentage = percentage(
//       resData.totalTheoreticalScore,
//       resData.maxTheoraticalScore
//     );

//     let practicalPercentage = percentage(
//       resData.totalPracticalScore,
//       resData.maxPracticalScore
//     );

//     let overallPercentage = percentage(
//       resData.totalPracticalScore + resData.totalTheoreticalScore,
//       resData.maxTheoraticalScore + resData.maxPracticalScore
//     );

//     //  3. UPDATE PERCENTAGES
//     const updatedPhase = await GunnerTechPhase.findByIdAndUpdate(
//       resData._id,
//       {
//         $set: {
//           "theoretical.theoreticalPercentage": Number(theoreticalPercentage),
//           "practical.practicalPercentage": Number(practicalPercentage),
//           overallPercentage: Number(overallPercentage),
//         },
//       },
//       { new: true }
//     );

//     //  4. UPDATE AGNIVEER GRADE
//     const gradeValue = calculateGrade(
//       resData.finalScore,
//       resData.maxTotalScore
//     );

//     const updatedAgniveer = await Agniveer.findByIdAndUpdate(
//       agniveerId,
//       { $set: { grade: gradeValue } },
//       { new: true }
//     );

//     //  5. CALCULATE & STORE RANKS
//     await calculateAndStoreAllDenseRanks(courseId);
// console.log("resData",resData);
// console.log("updatedAgniveer",updatedAgniveer);

//     //  6. FETCH FINAL UPDATED DATA FOR RESPONSE (THIS WAS MISSING)
//     const finalData = await GunnerTechPhase.find(resData._id);
//     console.log("finalData", finalData);

//     //  7. SEND CORRECT RESPONSE
//     responseJSON["rid"] = _id ? "s-gunnerTechPhase-2" : "s-gunnerTechPhase-1";
//     responseJSON["data"] = finalData[0];
//     // responseJSON["data"] = resData;
//     return sendResponse(responseJSON, res);
//   } catch (err) {
//     console.log("error", err);
//     err.rid = "e-gunnerTechPhase-1";
//     return sendResponse(err, res);
//   }
// };

//main

// services/calculateRanks.js

// const createGunnerTechPhase = async (req, res) => {
//   try {
//     const {
//       _id,
//       agniveerId,
//       courseId,
//       theoretical = {},
//       practical = {},
//       restrictiveQuality,
//       totalTheoreticalScore,
//       totalPracticalScore,
//       finalScore,
//     } = req.body;

//     const filter = _id ? { _id } : { agniveerId, courseId };

//     /* =====================================================
//        1️⃣ UPSERT — SAVE SCORES SAFELY (NO OVERWRITE)
//     ====================================================== */

//     const savedPhase = await GunnerTechPhase.findOneAndUpdate(
//       filter,
//       {
//         $set: {
//           agniveerId,
//           courseId,
//           restrictiveQuality,
//           totalTheoreticalScore,
//           totalPracticalScore,
//           finalScore,

//           // THEORETICAL
//           "theoretical.writtenScore": theoretical.writtenScore,
//           "theoretical.quizScore": theoretical.quizScore,
//           "theoretical.maxWrittenScore": theoretical.maxWrittenScore,
//           "theoretical.maxQuizScore": theoretical.maxQuizScore,

//           // PRACTICAL
//           "practical.practicalScore": practical.practicalScore,
//           "practical.maxPracticalScore": practical.maxPracticalScore,
//         },
//       },
//       {
//         new: true,
//         upsert: true,
//         runValidators: true,
//         setDefaultsOnInsert: true,
//       }
//     );

//     /* =====================================================
//        2️⃣ CALCULATE PERCENTAGES
//     ====================================================== */

//     const theoreticalPercentage = percentage(
//       savedPhase.totalTheoreticalScore,
//       savedPhase.maxTheoraticalScore
//     );

//     const practicalPercentage = percentage(
//       savedPhase.totalPracticalScore,
//       savedPhase.maxPracticalScore
//     );

//     const overallPercentage = percentage(
//       savedPhase.totalTheoreticalScore + savedPhase.totalPracticalScore,
//       savedPhase.maxTheoraticalScore + savedPhase.maxPracticalScore
//     );

//     /* =====================================================
//        3️⃣ UPDATE PERCENTAGES
//     ====================================================== */

//     await GunnerTechPhase.updateOne(
//       { _id: savedPhase._id },
//       {
//         $set: {
//           "theoretical.theoreticalPercentage": Number(theoreticalPercentage),
//           "practical.practicalPercentage": Number(practicalPercentage),
//           overallPercentage: Number(overallPercentage),
//         },
//       }
//     );

//     /* =====================================================
//        4️⃣ UPDATE AGNIVEER GRADE
//     ====================================================== */

//     const gradeValue = calculateGrade(
//       savedPhase.finalScore,
//       savedPhase.maxTotalScore
//     );

//     await Agniveer.updateOne(
//       { _id: agniveerId },
//       { $set: { grade: gradeValue } }
//     );

//     /* =====================================================
//        5️⃣ CALCULATE & STORE RANKS (FOR ENTIRE COURSE)
//     ====================================================== */

//     await calculateAndStoreAllDenseRanks(courseId);

//     /* =====================================================
//        6️⃣ FETCH FINAL UPDATED RECORD (WITH RANKS)
//     ====================================================== */

//     const finalData = await GunnerTechPhase.findById(savedPhase._id);

//     /* =====================================================
//        7️⃣ SEND RESPONSE
//     ====================================================== */

//     responseJSON.rid = _id
//       ? "s-gunnerTechPhase-2"
//       : "s-gunnerTechPhase-1";

//     responseJSON.data = finalData;

//     return sendResponse(responseJSON, res);
//   } catch (err) {
//     console.error("ERROR ➜ createGunnerTechPhase", err);
//     err.rid = "e-gunnerTechPhase-1";
//     return sendResponse(err, res);
//   }
// };

const createGunnerTechPhase = async (req, res) => {
  try {
    const {
      _id,
      agniveerId,
      courseId,
      theoretical = {},
      practical = {},
      restrictiveQuality,
      totalTheoreticalScore,
      totalPracticalScore,
      finalScore,
    } = req.body;

    const filter = _id ? { _id } : { agniveerId, courseId };

    /* =====================================================
       1️⃣ UPSERT — SAVE FULL OBJECTS (CRITICAL FIX)
    ====================================================== */

    const savedPhase = await GunnerTechPhase.findOneAndUpdate(
      filter,
      {
        $set: {
          agniveerId,
          courseId,
          restrictiveQuality,
          totalTheoreticalScore,
          totalPracticalScore,
          finalScore,

          // ✅ SAVE COMPLETE OBJECTS
          theoretical,
          practical,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    /* =====================================================
       2️⃣ CALCULATE PERCENTAGES
    ====================================================== */

    const theoreticalPercentage = percentage(
      savedPhase.totalTheoreticalScore,
      savedPhase.maxTheoraticalScore,
    );

    const practicalPercentage = percentage(
      savedPhase.totalPracticalScore,
      savedPhase.maxPracticalScore,
    );

    const overallPercentage = percentage(
      savedPhase.totalTheoreticalScore + savedPhase.totalPracticalScore,
      savedPhase.maxTheoraticalScore + savedPhase.maxPracticalScore,
    );

    /* =====================================================
       3️⃣ UPDATE ONLY PERCENTAGES (NO DATA LOSS)
    ====================================================== */

    await GunnerTechPhase.updateOne(
      { _id: savedPhase._id },
      {
        $set: {
          "theoretical.theoreticalPercentage": Number(theoreticalPercentage),
          "practical.practicalPercentage": Number(practicalPercentage),
          overallPercentage: Number(overallPercentage),
        },
      },
    );

    /* =====================================================
       4️⃣ UPDATE AGNIVEER GRADE
    ====================================================== */

    const gradeValue = calculateGrade(
      savedPhase.finalScore,
      savedPhase.maxTotalScore,
    );

    await Agniveer.updateOne(
      { _id: agniveerId },
      { $set: { grade: gradeValue } },
    );

    /* =====================================================
       5️⃣ CALCULATE & STORE RANKS
    ====================================================== */

    await calculateAndStoreAllDenseRanksForModel(GunnerTechPhase, courseId);

    /* =====================================================
       6️⃣ FINAL FETCH (WITH PRACTICAL STRUCTURE + RANKS)
    ====================================================== */

    const finalData = await GunnerTechPhase.findById(savedPhase._id);

    responseJSON.rid = _id ? "s-gunnerTechPhase-2" : "s-gunnerTechPhase-1";

    responseJSON.data = finalData;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.error("ERROR ➜ createGunnerTechPhase", err);
    err.rid = "e-gunnerTechPhase-1";
    return sendResponse(err, res);
  }
};

const getGunnerTechPhase = async (req, res) => {
  try {
    const { agniveerId, courseId } = req.query;

    const data = await GunnerTechPhase.findOne({
      agniveerId,
      courseId,
    });

    if (!data) {
      responseJSON["rid"] = "s-gunnerTechPhase-4";
      responseJSON["data"] = null;
      return sendResponse(responseJSON, res);
    }
    console.log("data", data);

    responseJSON["rid"] = "s-gunnerTechPhase-3";
    responseJSON["data"] = data;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.log("error", err);
    err.rid = "e-gunnerTechPhase-1";
    return sendResponse(err, res);
  }
};

module.exports = {
  createGunnerTechPhase,
  getGunnerTechPhase,
};
