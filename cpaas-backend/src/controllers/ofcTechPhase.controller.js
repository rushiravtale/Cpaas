const {
  calculateGrade,
  percentage,
  calculateAndStoreAllDenseRanksForModel,
} = require("../helpers/agniveerGrade.helper");
const OfcTechPhase = require("../schemas/ofcTechPhase_schema");
const sendResponse = require("../utils/sendResponse");
const Agniveer = require("../schemas/agniveer.schema");
const mongoose = require("mongoose");

// const calculateAndStoreAllDenseRanks = async (courseId) => {
//   const docs = await OfcTechPhase.find({ courseId });

//   const rankAndSave = async (valueGetter, updatePath) => {
//     const sorted = [...docs].sort((a, b) => valueGetter(b) - valueGetter(a));

//     let prev = null;

//     for (let i = 0; i < sorted.length; i++) {
//       const curr = valueGetter(sorted[i]);
//       const rank = curr === prev ? i : i + 1; // ✅ GAP LOGIC

//       await OfcTechPhase.findByIdAndUpdate(sorted[i]._id, {
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
//   const docs = await OfcTechPhase.find({ courseId }).lean();

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

//       await OfcTechPhase.updateOne(
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

// const createOfcTechPhase = async (req, res) => {
//   try {
//     const {
//       _id,
//       agniveerId,
//       courseId,
//       practical,
//       restrictiveQuality,
//       finalScore,
//       totalPracticalScore,
//       theoretical,
//       totalTheoreticalScore,
//     } = req.body;

//     const filter = _id ? { _id } : { agniveerId, courseId };
//     console.log("req.body", req.body, agniveerId, courseId);

//     const resData = await OfcTechPhase.findOneAndUpdate(
//       filter,
//       {
//         agniveerId,
//         courseId,
//         theoretical,
//         practical,
//         restrictiveQuality,
//         totalTheoreticalScore,
//         totalPracticalScore,
//         finalScore,
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
//     const updatedPhase = await OfcTechPhase.findByIdAndUpdate(
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

//     let gradeValue = calculateGrade(
//       resData?.finalScore,
//       resData?.maxTotalScore
//     );

//     var agniveerRes;

//     var agniveerRes = await Agniveer.findOne({
//       _id: new mongoose.Types.ObjectId(resData?.agniveerId),
//       courseName: new mongoose.Types.ObjectId(resData?.courseId),
//     });

//     var updatedAgniveerGradeRes = await Agniveer.findByIdAndUpdate(
//       agniveerRes._id,
//       { grade: gradeValue },
//       { new: true }
//     );

//     await calculateAndStoreAllDenseRanks(courseId);
//     const finalData = await OfcTechPhase.find(resData._id);

//     responseJSON["rid"] = _id ? "s-ofcTechPhase-2" : "s-ofcTechPhase-1";
//     // responseJSON["data"] = resData;
//     responseJSON["data"] = finalData[0];
//     return sendResponse(responseJSON, res);
//   } catch (err) {
//     console.log("error", err);
//     err.rid = "e-ofcTechPhase-1";
//     return sendResponse(err, res);
//   }
// };

//

// const createOfcTechPhase = async (req, res) => {
//   try {
//     const {
//       _id,
//       agniveerId,
//       courseId,
//       practical = {},
//       theoretical = {},
//       restrictiveQuality,
//       finalScore,
//       totalPracticalScore,
//       totalTheoreticalScore,
//     } = req.body;

//     const filter = _id ? { _id } : { agniveerId, courseId };

//     /* ================= 1️⃣ UPSERT (SAFE) ================= */
//     const resData = await OfcTechPhase.findOneAndUpdate(
//       filter,
//       {
//         $set: {
//           agniveerId,
//           courseId,
//           restrictiveQuality,
//           totalTheoreticalScore,
//           totalPracticalScore,
//           finalScore,

//           // theoretical scores
//           "theoretical.writtenScore": theoretical.writtenScore,
//           "theoretical.quizScore": theoretical.quizScore,
//           "theoretical.maxWrittenScore": theoretical.maxWrittenScore,
//           "theoretical.maxQuizScore": theoretical.maxQuizScore,

//           // practical scores
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

//     /* ================= 2️⃣ CALCULATE PERCENTAGES ================= */
//     const theoreticalPercentage = percentage(
//       resData.totalTheoreticalScore,
//       resData.maxTheoraticalScore
//     );

//     const practicalPercentage = percentage(
//       resData.totalPracticalScore,
//       resData.maxPracticalScore
//     );

//     const overallPercentage = percentage(
//       resData.totalPracticalScore + resData.totalTheoreticalScore,
//       resData.maxTheoraticalScore + resData.maxPracticalScore
//     );

//     /* ================= 3️⃣ UPDATE PERCENTAGES ================= */
//     await OfcTechPhase.updateOne(
//       { _id: resData._id },
//       {
//         $set: {
//           "theoretical.theoreticalPercentage": Number(theoreticalPercentage),
//           "practical.practicalPercentage": Number(practicalPercentage),
//           overallPercentage: Number(overallPercentage),
//         },
//       }
//     );

//     /* ================= 4️⃣ UPDATE AGNIVEER GRADE ================= */
//     const gradeValue = calculateGrade(
//       resData.finalScore,
//       resData.maxTotalScore
//     );

//     await Agniveer.updateOne(
//       { _id: resData.agniveerId },
//       { $set: { grade: gradeValue } }
//     );

//     /* ================= 5️⃣ RANK CALCULATION ================= */
//     await calculateAndStoreAllDenseRanks(courseId);

//     /* ================= 6️⃣ FETCH FINAL UPDATED RECORD ================= */
//     const finalData = await OfcTechPhase.findById(resData._id);

//     responseJSON.rid = _id
//       ? "s-ofcTechPhase-2"
//       : "s-ofcTechPhase-1";

//     responseJSON.data = finalData;

//     return sendResponse(responseJSON, res);
//   } catch (err) {
//     console.log("error", err);
//     err.rid = "e-ofcTechPhase-1";
//     return sendResponse(err, res);
//   }
// };

const createOfcTechPhase = async (req, res) => {
  try {
    const {
      _id,
      agniveerId,
      courseId,
      practical = {},
      theoretical = {},
      restrictiveQuality,
      finalScore,
      totalPracticalScore,
      totalTheoreticalScore,
    } = req.body;

    const filter = _id ? { _id } : { agniveerId, courseId };

    /* =====================================================
       1️⃣ UPSERT — SAVE FULL OBJECTS (CRITICAL FIX)
    ====================================================== */

    const resData = await OfcTechPhase.findOneAndUpdate(
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

          // ⚡️ FORCE UPDATE MAX SCORES
          maxPracticalScore: 120,
          maxTheoraticalScore: 80,
          maxTotalScore: 200,
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
      resData.totalTheoreticalScore,
      resData.maxTheoraticalScore,
    );

    const practicalPercentage = percentage(
      resData.totalPracticalScore,
      resData.maxPracticalScore,
    );

    const overallPercentage = percentage(
      resData.totalTheoreticalScore + resData.totalPracticalScore,
      resData.maxTheoraticalScore + resData.maxPracticalScore,
    );

    /* =====================================================
       3️⃣ UPDATE ONLY PERCENTAGES
    ====================================================== */

    await OfcTechPhase.updateOne(
      { _id: resData._id },
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
      resData.finalScore,
      resData.maxTotalScore,
    );

    await Agniveer.updateOne(
      { _id: resData.agniveerId },
      { $set: { grade: gradeValue } },
    );

    /* =====================================================
       5️⃣ RANK CALCULATION
    ====================================================== */

    await calculateAndStoreAllDenseRanksForModel(OfcTechPhase, courseId);

    /* =====================================================
       6️⃣ FINAL FETCH (WITH FULL PRACTICAL OBJECT)
    ====================================================== */

    const finalData = await OfcTechPhase.findById(resData._id);

    responseJSON.rid = _id ? "s-ofcTechPhase-2" : "s-ofcTechPhase-1";

    responseJSON.data = finalData;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.error("ERROR ➜ createOfcTechPhase", err);
    err.rid = "e-ofcTechPhase-1";
    return sendResponse(err, res);
  }
};

const getOfcTechPhase = async (req, res) => {
  try {
    const { agniveerId, courseId } = req.query;

    const data = await OfcTechPhase.findOne({
      agniveerId,
      courseId,
    });

    if (!data) {
      responseJSON["rid"] = "s-ofcTechPhase-4";
      responseJSON["data"] = null;
      return sendResponse(responseJSON, res);
    }
    console.log("data", data);

    responseJSON["rid"] = "s-ofcTechPhase-3";
    responseJSON["data"] = data;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.log("error", err);
    err.rid = "e-ofcTechPhase-1";
    return sendResponse(err, res);
  }
};

module.exports = {
  createOfcTechPhase,
  getOfcTechPhase,
};
