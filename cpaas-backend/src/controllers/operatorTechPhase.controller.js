const {
  calculateGrade,
  percentage,
  calculateAndStoreAllDenseRanksForModel,
} = require("../helpers/agniveerGrade.helper");
const OperatorTechPhase = require("../schemas/operatorTechPhase_schema");
const sendResponse = require("../utils/sendResponse");
const Agniveer = require("../schemas/agniveer.schema");
const mongoose = require("mongoose");

// const calculateAndStoreAllDenseRanks = async (courseId) => {
//   const docs = await OperatorTechPhase.find({ courseId });

//   const rankAndSave = async (valueGetter, updatePath) => {
//     const sorted = [...docs].sort((a, b) => valueGetter(b) - valueGetter(a));

//     let prev = null;

//     for (let i = 0; i < sorted.length; i++) {
//       const curr = valueGetter(sorted[i]);
//       const rank = curr === prev ? i : i + 1; // ✅ GAP LOGIC

//       await OperatorTechPhase.findByIdAndUpdate(sorted[i]._id, {
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
//   const docs = await OperatorTechPhase.find({ courseId }).lean();

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

//       await OperatorTechPhase.updateOne(
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

// const createOperatorTechPhase = async (req, res) => {
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

//     const resData = await OperatorTechPhase.findOneAndUpdate(
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
//     console.log("resData", resData);

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
//     console.log(
//       "practicalPercentage",
//       practicalPercentage,
//       theoreticalPercentage,
//       overallPercentage
//     );

//     //  3. UPDATE PERCENTAGES
//     const updatedPhase = await OperatorTechPhase.findByIdAndUpdate(
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
//     console.log("updatedPhase", updatedPhase);

//     let gradeValue = calculateGrade(
//       resData?.finalScore,
//       resData?.maxTotalScore
//     );

//     var agniveerRes;

//     var agniveerRes = await Agniveer.findOne({
//       _id: new mongoose.Types.ObjectId(resData?.agniveerId),
//       courseName: new mongoose.Types.ObjectId(resData?.courseId),
//     });
//     console.log("gradeValue", gradeValue);

//     var updatedAgniveerGradeRes = await Agniveer.findByIdAndUpdate(
//       agniveerRes._id,
//       { grade: gradeValue },
//       { new: true }
//     );

//     await calculateAndStoreAllDenseRanks(courseId);

//     const finalData = await OperatorTechPhase.find(resData._id);

//     responseJSON["rid"] = _id
//       ? "s-operatorTechPhase-2"
//       : "s-operatorTechPhase-1";
//     // responseJSON["data"] = resData;
//     // responseJSON["data"] = updatedPhase;

//     responseJSON["data"] = finalData[0];
//     return sendResponse(responseJSON, res);
//   } catch (err) {
//     console.log("err", err);
//     err.rid = "e-operatorTechPhase-1";
//     return sendResponse(err, res);
//   }
// };

//

// const createOperatorTechPhase = async (req, res) => {
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

//     /* ================= 1️⃣ SAFE UPSERT ================= */
//     const resData = await OperatorTechPhase.findOneAndUpdate(
//       filter,
//       {
//         $set: {
//           agniveerId,
//           courseId,
//           restrictiveQuality,
//           totalTheoreticalScore,
//           totalPracticalScore,
//           finalScore,

//           // THEORETICAL (SAFE)
//           "theoretical.writtenScore": theoretical.writtenScore,
//           "theoretical.quizScore": theoretical.quizScore,
//           "theoretical.maxWrittenScore": theoretical.maxWrittenScore,
//           "theoretical.maxQuizScore": theoretical.maxQuizScore,

//           // PRACTICAL (SAFE)
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
//     await OperatorTechPhase.updateOne(
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

//     /* ================= 5️⃣ CALCULATE RANKS ================= */
//     await calculateAndStoreAllDenseRanks(courseId);

//     /* ================= 6️⃣ FINAL FETCH ================= */
//     const finalData = await OperatorTechPhase.findById(resData._id);

//     responseJSON.rid = _id
//       ? "s-operatorTechPhase-2"
//       : "s-operatorTechPhase-1";

//     responseJSON.data = finalData;

//     return sendResponse(responseJSON, res);
//   } catch (err) {
//     console.log("err", err);
//     err.rid = "e-operatorTechPhase-1";
//     return sendResponse(err, res);
//   }
// };

const createOperatorTechPhase = async (req, res) => {
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
    const resData = await OperatorTechPhase.findOneAndUpdate(
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
      resData.totalPracticalScore + resData.totalTheoreticalScore,
      resData.maxTheoraticalScore + resData.maxPracticalScore,
    );

    /* =====================================================
       3️⃣ UPDATE ONLY DERIVED FIELDS
    ====================================================== */
    await OperatorTechPhase.updateOne(
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
    await calculateAndStoreAllDenseRanksForModel(OperatorTechPhase, courseId);

    /* =====================================================
       6️⃣ FINAL FETCH (FULL PRACTICAL OBJECT)
    ====================================================== */
    const finalData = await OperatorTechPhase.findById(resData._id);

    responseJSON.rid = _id ? "s-operatorTechPhase-2" : "s-operatorTechPhase-1";

    responseJSON.data = finalData;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.log("err", err);
    err.rid = "e-operatorTechPhase-1";
    return sendResponse(err, res);
  }
};

const getOperatorTechPhase = async (req, res) => {
  try {
    const { agniveerId, courseId } = req.query;

    const data = await OperatorTechPhase.findOne({
      agniveerId,
      courseId,
    });

    if (!data) {
      responseJSON["rid"] = "s-operatorTechPhase-4";
      responseJSON["data"] = null;
      return sendResponse(responseJSON, res);
    }
    console.log("data", data);

    responseJSON["rid"] = "s-operatorTechPhase-3";
    responseJSON["data"] = data;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.log("error", err);
    err.rid = "e-operatorTechPhase-1";
    return sendResponse(err, res);
  }
};

module.exports = {
  createOperatorTechPhase,
  getOperatorTechPhase,
};
