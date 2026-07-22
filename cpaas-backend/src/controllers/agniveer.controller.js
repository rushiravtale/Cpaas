const Course = require("../schemas/course.schema");
const Agniveer = require("../schemas/agniveer.schema");
const User = require("../schemas/user.schema");
let responseJSON = {};
const sendResponse = require("../utils/sendResponse");
const { Types } = require("mongoose");
const { nullCheck, safeDecode } = require("../helpers/commonFunction.helper");
const mongoose = require("mongoose");
const PhyscialProficiency = require("../schemas/physcialProficiency_schema");
const Trade = require("../schemas/mst_trade_schema");
const GunnerTechPhase = require("../schemas/gunnerTechPhase.schema");
const DriverTechPhase = require("../schemas/driverTechPhase.schema");
const OperatorTechPhase = require("../schemas/operatorTechPhase_schema");
const OfcTechPhase = require("../schemas/ofcTechPhase_schema");
const FortNightProficiency = require("../schemas/fortNight.schema");

const {
  calculatePhyscialProficinecyGrade,
  calculateTechPhaseForIndividualSummary,
  calculateFortNightPerformance,
  calculateOverAll,
  penPicture,
  calculateGrade,
  percentage,
  sumNumericValues,
  calculateAndStoreAllDenseRanksForModel,
} = require("../helpers/agniveerGrade.helper");
const excelHelper = require("../helpers/excel.helper");
const {
  getTradeCodeFromName,
  TECH_PHASE_MODEL,
} = require("../helpers/tradeTemplateMap");

const createAgniveer = async (req, res) => {
  try {
    const {
      name,
      armyNumber,
      rank,
      tradeId,
      squadNumber,
      civilEdn,
      anyOtherQualification,
      fatherName,
      contactNumber,
      address,
      unit,
      courseName,
    } = req.body;

    const userId = res.locals;

    const agniveerData = {
      name,
      armyNumber,
      rank,
      tradeId,
      squadNumber,
      civilEdn,
      anyOtherQualification,
      fatherName,
      contactNumber,
      address,
      unit,
      courseName,
    };
    console.log("userId", userId);

    const userById = await User.findById(userId?.userId);
    const exists = await Agniveer.findOne({ armyNumber });

    if (exists) {
      responseJSON["rid"] = "e-agniveer-9";

      return sendResponse(responseJSON, res);
    }

    var resData;
    if (userId?.role == "Commander") {
      resData = await Agniveer.create(agniveerData);
    } else if (String(userById?.tradeId[0]) == String(tradeId[0])) {
      resData = await Agniveer.create(agniveerData);
    } else {
      responseJSON["rid"] = "e-agniveer-4";

      return sendResponse(responseJSON, res);
    }
    // const resData = await Agniveer.create(agniveerData);

    responseJSON["rid"] = "s-agniveer-1";
    responseJSON["data"] = resData;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.error("Error creating Course:", err.message);
    err.rid = "e-agniveer-1";
    return sendResponse(err, res);
  }
};

const getAllAgniveers = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 10,
      filter,
      courseName,
      squadNumber,
      tradeId,
      grade,
      text,
      armyNumber,
    } = req.query;
    const userId = res.locals;

    courseName = nullCheck(courseName);
    squadNumber = nullCheck(squadNumber);
    armyNumber = nullCheck(armyNumber);
    grade = nullCheck(grade);
    tradeId = nullCheck(tradeId);

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { armyNumber: 1 },
      collation: { locale: "en", numericOrdering: true },
      populate: [{ path: "courseName" }, { path: "tradeId" }],
    };

    let query = {};
    console.log("squadNumber", squadNumber);

    if (userId?.role !== "Commander") {
      const userById = await User.findById(userId?.userId);
      const tradeIds = userById?.tradeId || [];

      query.tradeId = { $in: tradeIds };
    } else {
      if (!tradeId) {
        responseJSON["rid"] = "e-agniveer-6";

        return sendResponse(responseJSON, res);
      }

      query.tradeId = Types.ObjectId.createFromHexString(tradeId);
    }

    if (filter === "all") {
      if (courseName) {
        // courseName is an array field, so we need to check if it contains the ObjectId
        try {
          const courseObjectId = Types.ObjectId.createFromHexString(courseName);
          query.courseName = courseObjectId;
        } catch (err) {
          query.courseName = courseName;
        }
      }
      if (text?.trim().length > 3) {
        console.log("text", text);
        const search = safeDecode(text?.trim());

        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { armyNumber: { $regex: search, $options: "i" } },
        ];
      }

      if (
        squadNumber !== undefined &&
        squadNumber !== null &&
        squadNumber !== "" &&
        squadNumber !== "null"
      ) {
        query.squadNumber = Number(squadNumber);
      }

      if (
        armyNumber !== undefined &&
        armyNumber !== null &&
        armyNumber !== "" &&
        armyNumber !== "null"
      ) {
        query.armyNumber = armyNumber;
      }

      if (grade) {
        if (grade === "D") {
          //  D + NULL + MISSING
          query.$or = [
            { grade: "D" },
            { grade: null },
            { grade: { $exists: false } },
          ];
        } else {
          //  Normal grades: A, B, C
          query.grade = grade;
        }
      }
    }

    // ---------------------------------------------------------
    //  FETCH RANKS IF TRADE IS SELECTED
    // ---------------------------------------------------------
    const result = await Agniveer.paginate(query, options);
    let finalDocs = result.docs.map((d) => d.toObject());

    if (tradeId) {
      try {
        const trade = await Trade.findById(tradeId);
        const tradeCode = getTradeCodeFromName(trade?.name);
        const modelName = TECH_PHASE_MODEL[tradeCode];

        if (modelName) {
          // Dynamic Model Import (ensure these are required at top if not globally available,
          // but strictly speaking we have them imported as consts at top of file)
          let Model;
          if (modelName === "gunnerTechPhase") Model = GunnerTechPhase;
          else if (modelName === "driverTechPhase") Model = DriverTechPhase;
          else if (modelName === "operatorTechPhase") Model = OperatorTechPhase;
          else if (modelName === "ofcTechPhase") Model = OfcTechPhase;

          if (Model) {
            // Get all agniveer Ids from current page
            const agniveerIds = finalDocs.map((d) => d._id);

            // Fetch Tech records for these IDs
            const techRecords = await Model.find({
              agniveerId: { $in: agniveerIds },
            })
              .select("agniveerId overallRank")
              .lean();

            // Create Map: agniveerId -> overallRank
            const rankMap = {};
            techRecords.forEach((r) => {
              rankMap[r.agniveerId.toString()] = r.overallRank;
            });

            // Merge Rank
            finalDocs = finalDocs.map((d) => ({
              ...d,
              overallRank: rankMap[d._id.toString()] || "-",
            }));
          }
        }
      } catch (rankErr) {
        console.error("Error fetching ranks:", rankErr);
      }
    }

    return sendResponse(
      {
        rid: "s-agniveer-3",
        data: {
          data: finalDocs,
          totalDocs: result.totalDocs,
          totalPages: result.totalPages,
          currentPage: result.page,
          hasNextPage: result.hasNextPage,
        },
      },
      res,
    );
  } catch (err) {
    return sendResponse({ rid: "e-agniveer-2", data: err.message }, res);
  }
};

// const getAllAgniveers = async (req, res) => {
//   try {
//     let {
//       page = 1,
//       limit = 10,
//       filter,
//       courseName,
//       squadNumber,
//       tradeId,
//       grade,
//       text,
//     } = req.query;

//     const userId = res.locals;

//     courseName = nullCheck(courseName);
//     squadNumber = nullCheck(squadNumber);
//     grade = nullCheck(grade);
//     tradeId = nullCheck(tradeId);

//     const options = {
//       page: parseInt(page),
//       limit: parseInt(limit),
//       sort: { createdAt: -1 },
//       populate: [{ path: "courseName" }, { path: "tradeId" }],
//     };

//     let query = {};

//     // 🔐 Role-based trade filter
//     if (userId?.role !== "Commander") {
//       const userById = await User.findById(userId?.userId);
//       const tradeIds = userById?.tradeId || [];
//       query.tradeId = { $in: tradeIds };
//     } else {
//       if (!tradeId) {
//         return sendResponse(
//           { rid: "e-agniveer-6", data: "TradeId required" },
//           res
//         );
//       }
//       query.tradeId = new Types.ObjectId(tradeId);
//     }

//     // 🧠 Combined filters
//     if (filter === "all") {
//       const andConditions = [];

//       // ✅ Course filter
//       if (courseName) {
//         andConditions.push({ courseName });
//       }

//       // 🔍 Text search (name OR armyNumber) after 3 chars
//       if (text?.trim().length >= 3) {
//         const search = text.trim();
//         andConditions.push({
//           $or: [
//             { name: { $regex: search, $options: "i" } },
//             { armyNumber: { $regex: search, $options: "i" } },
//           ],
//         });
//       }

//       // 🔢 Squad number filter
//       if (
//         squadNumber !== undefined &&
//         squadNumber !== null &&
//         squadNumber !== "" &&
//         squadNumber !== "null"
//       ) {
//         andConditions.push({ squadNumber: Number(squadNumber) });
//       }

//       // 🎓 Grade filter
//       if (grade) {
//         if (grade === "D") {
//           andConditions.push({
//             $or: [
//               { grade: "D" },
//               { grade: null },
//               { grade: { $exists: false } },
//             ],
//           });
//         } else {
//           andConditions.push({ grade });
//         }
//       }

//       // 🧩 Apply all conditions
//       if (andConditions.length > 0) {
//         query.$and = andConditions;
//       }
//     }

//     // 📦 Fetch paginated data
//     const result = await Agniveer.paginate(query, options);

//     return sendResponse(
//       {
//         rid: "s-agniveer-3",
//         data: {
//           data: result.docs,
//           totalDocs: result.totalDocs,
//           totalPages: result.totalPages,
//           currentPage: result.page,
//           hasNextPage: result.hasNextPage,
//         },
//       },
//       res
//     );
//   } catch (err) {
//     return sendResponse(
//       { rid: "e-agniveer-2", data: err.message },
//       res
//     );
//   }
// };

const getAgniveerById = async (req, res) => {
  try {
    const { id } = req.params;
    const resAgniveer = await Agniveer.findById(id).populate([
      "tradeId",
      "courseName",
    ]);
    if (!resAgniveer) {
      responseJSON["rid"] = "e-agniveer-3";

      return sendResponse(responseJSON, res);
    }
    console.log("resAgniveer", resAgniveer);

    responseJSON["rid"] = "s-agniveer-3";
    responseJSON["data"] = resAgniveer;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.log("error", err);

    err.rid = "e-agniveer-2";
    return sendResponse({ rid: "e-agniveer-2", data: err.message }, res);
  }
};

const updateAgniveer = async (req, res) => {
  try {
    const {
      name,
      armyNumber,
      rank,
      tradeId,
      squadNumber,
      civilEdn,
      anyOtherQualification,
      fatherName,
      contactNumber,
      address,
      unit,
      courseName,
      agniveerId,
    } = req.body;
    const userId = res.locals;

    const agniveerData = {
      name,
      armyNumber,
      rank,
      // tradeId,
      squadNumber,
      civilEdn,
      anyOtherQualification,
      fatherName,
      contactNumber,
      address,
      unit,
      courseName,
      agniveerId,
    };
    var updatedAgniveer;
    const userById = await User.findById(userId?.userId);
    const agniveerById = await Agniveer.findById(agniveerId);

    // const armyNumberExists = await Agniveer.findOne({ armyNumber });

    const armyNumberExists = await Agniveer.findOne({
      $or: [{ armyNumber }],
      _id: { $ne: agniveerId },
    });

    if (armyNumberExists) {
      responseJSON["rid"] = "e-agniveer-9";

      return sendResponse(responseJSON, res);
    }
    console.log("agniveerById", agniveerById);

    // const agniveerDataById = await Agniveer.findOne({
    //   _id: agniveerId,
    // });

    // console.log("agniveerDataById", agniveerDataById);

    const agniveerPhysicalProficiency = await PhyscialProficiency.findOne({
      agniveerId,
      courseId: courseName[0],
    });
    const agniveerFortnightly = await FortNightProficiency.findOne({
      agniveerId,
      courseId: courseName[0],
    });

    console.log(
      "agniveerPhysicalProficiency",
      agniveerPhysicalProficiency,
      agniveerFortnightly,
    );

    if (
      (agniveerFortnightly ||
        agniveerPhysicalProficiency ||
        agniveerById?.grade) &&
      agniveerById?.courseName != courseName[0]
    ) {
      responseJSON["rid"] = "e-agniveer-8";

      return sendResponse(responseJSON, res);
    }

    if (userId?.role == "Commander") {
      updatedAgniveer = await Agniveer.findByIdAndUpdate(
        agniveerId,
        { $set: agniveerData },
        { new: true },
      );
    } else if (String(userById?.tradeId[0]) == String(tradeId[0])) {
      updatedAgniveer = await Agniveer.findByIdAndUpdate(
        agniveerId,
        { $set: agniveerData },
        { new: true },
      );
    } else {
      responseJSON["rid"] = "e-agniveer-5";

      return sendResponse(responseJSON, res);
    }

    console.log("updatedAgniveer", updatedAgniveer?.grade);

    if (!updatedAgniveer) {
      responseJSON["rid"] = "e-agniveer-3";

      return sendResponse(responseJSON, res);
    }

    responseJSON["rid"] = "s-agniveer-2";
    responseJSON["data"] = updatedAgniveer;
    return sendResponse(responseJSON, res);
  } catch (err) {
    err.rid = "e-agniveer-2";
    return sendResponse(err, res);
  }
};

const deleteAgniveer = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(" req.params", req.params);

    const resAgniveer = await Agniveer.findById(id);
    if (!resAgniveer) {
      responseJSON["rid"] = "e-agniveer-3";

      return sendResponse(responseJSON, res);
    }

    await Agniveer.deleteOne({ _id: id });

    responseJSON["rid"] = "s-agniveer-4";
    responseJSON["data"] = null;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.error("Error deleting user:", err);
    err.rid = "e-agniveer-2";
    return sendResponse({ rid: "e-agniveer-2", data: err.message }, res);
  }
};

// const getGradeReport = async (req, res) => {
//   try {
//     const { courseId , squadNumber } = req.query;

//     if (!courseId) {
//       return res.status(400).json({
//         success: false,
//         message: "courseId is required",
//       });
//     }

//     const pipeline = [];

//     // 1. FILTER ONLY BY COURSE
//     pipeline.push({
//       $match: {
//         courseName: new mongoose.Types.ObjectId(courseId),
//       },
//     });

//     //  2. UNWIND courseName (because it's an array)
//     pipeline.push({ $unwind: "$courseName" });

//     //  3. GROUP ONLY BY COURSE
//     pipeline.push({
//       $group: {
//         _id: "$courseName",

//         gradeA: {
//           $sum: { $cond: [{ $eq: ["$grade", "A"] }, 1, 0] },
//         },
//         gradeB: {
//           $sum: { $cond: [{ $eq: ["$grade", "B"] }, 1, 0] },
//         },
//         gradeC: {
//           $sum: { $cond: [{ $eq: ["$grade", "C"] }, 1, 0] },
//         },
//         // gradeD: {
//         //   $sum: { $cond: [{ $eq: ["$grade", "D"] }, 1, 0] },
//         // },
//         gradeD: {
//           $sum: {
//             $cond: [
//               {
//                 $or: [
//                   { $eq: ["$grade", "D"] },
//                   { $eq: ["$grade", null] },
//                   { $eq: [{ $type: "$grade" }, "missing"] },
//                 ],
//               },
//               1,
//               0,
//             ],
//           },
//         },

//         totalCount: { $sum: 1 },
//       },
//     });

//     //  4. FINAL OUTPUT FORMAT (SINGLE OBJECT)
//     pipeline.push({
//       $project: {
//         _id: 0,
//         courseId: "$_id",

//         gradeA: 1,
//         gradeB: 1,
//         gradeC: 1,
//         gradeD: 1,
//         totalCount: 1,
//       },
//     });

//     const result = await Agniveer.aggregate(pipeline);

//     //  Convert array → single object
//     const finalResult = result[0] || {
//       courseId,
//       gradeA: 0,
//       gradeB: 0,
//       gradeC: 0,
//       gradeD: 0,
//       totalCount: 0,
//     };

//     res.status(200).json({
//       success: true,
//       data: finalResult, //  SINGLE OBJECT
//     });
//   } catch (error) {
//     console.error("Grade Report Error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// const getAgniveerIndiviualReport = async (req, res) => {
//   try {
//     console.log("getAgniveerIndiviualReport");

//     const { courseId, agniveerId, tradeId } = req.query;

//     const agniveerObjId = new mongoose.Types.ObjectId(agniveerId);
//     const courseObjId = new mongoose.Types.ObjectId(courseId);

//     let physicalFitness = null;
//     let techFinalRes = null;
//     let fortNightPerformanceRes = null;

//     const resAgniveer = await Agniveer.findById(agniveerObjId);
//     console.log("resAgniveer", resAgniveer);

//     // ==============================
//     //  1. PHYSICAL PROFICIENCY
//     // ==============================
//     const physicalProficiencyData = await PhyscialProficiency.findOne({
//       agniveerId: agniveerObjId,
//       courseId: courseObjId,
//     });

//     if (physicalProficiencyData) {
//       physicalFitness = calculatePhyscialProficinecyGrade(
//         physicalProficiencyData.bpet,
//         physicalProficiencyData.ppt,
//         physicalProficiencyData.maxTotalPhyscialPerformance,
//         physicalProficiencyData.maxTotalBpetPerformance,
//         physicalProficiencyData.maxTotalPptPerformance
//       );
//     }

//     // ==============================
//     // 2. FORTNIGHT PERFORMANCE (LATEST)
//     // ==============================
//     const fortNightlyData = await FortNightProficiency.findOne({
//       agniveerId: agniveerObjId,
//       courseId: courseObjId,
//     }).sort({ createdAt: -1 });

//     if (fortNightlyData) {
//       fortNightPerformanceRes = calculateFortNightPerformance(fortNightlyData);
//     }

//     // ==============================
//     // 3. TRADE DETAILS
//     // ==============================
//     const tradeRes = await Trade.findById(tradeId);
//     const tradeName = tradeRes?.name;

//     // ==============================
//     // 4. TECH PHASE (TRADE WISE)
//     // ==============================
//     let techPhaseData = null;
//     let techPhaseDataCount = null;
//     if (tradeName === "Gunner") {
//       techPhaseData = await GunnerTechPhase.findOne({
//         agniveerId: agniveerObjId,
//         courseId: courseObjId,
//       });
//       techPhaseDataCount = await GunnerTechPhase.find({
//         courseId: courseObjId,
//       });
//       console.log("techPhaseDataCount", techPhaseDataCount.length);
//     } else if (tradeName === "Driver") {
//       techPhaseData = await DriverTechPhase.findOne({
//         agniveerId: agniveerObjId,
//         courseId: courseObjId,
//       });
//       techPhaseDataCount = await DriverTechPhase.find({
//         courseId: courseObjId,
//       });
//     } else if (tradeName === "Operator") {
//       techPhaseData = await OperatorTechPhase.findOne({
//         agniveerId: agniveerObjId,
//         courseId: courseObjId,
//       });
//       techPhaseDataCount = await OperatorTechPhase.find({
//         courseId: courseObjId,
//       });
//     } else {
//       techPhaseData = await OfcTechPhase.findOne({
//         agniveerId: agniveerObjId,
//         courseId: courseObjId,
//       });
//       techPhaseDataCount = await OfcTechPhase.find({
//         courseId: courseObjId,
//       });
//     }
//     console.log("techPhaseData", techPhaseData);

//     if (techPhaseData) {
//       techFinalRes = calculateTechPhaseForIndividualSummary(
//         techPhaseData,
//         tradeName
//       );
//     }

//     // ==============================
//     // 5. VALIDATION
//     // ==============================
//     if (!techFinalRes || !physicalFitness || !fortNightPerformanceRes) {
//       responseJSON["rid"] = "e-agniveer-7";
//       return sendResponse(responseJSON, res);
//     }

//     // ==============================
//     // 6. CALCULATE OVERALL
//     // ==============================
//     const calculateOverAllData = calculateOverAll(
//       techFinalRes,
//       physicalFitness,
//       fortNightPerformanceRes
//     );
//     console.log("calculateOverAllData", calculateOverAllData);
//     console.log("techFinalRes", techFinalRes);
//     console.log("physicalFitness", physicalFitness);
//     console.log("fortNightPerformanceRes", fortNightPerformanceRes);

//     // ==============================
//     // 7. FINAL STRUCTURED RESPONSE
//     // ==============================
//     const finalData = {
//       trade: tradeName,
//       techPhase: techFinalRes,
//       physicalFitness: physicalFitness,
//       fortNightly: fortNightPerformanceRes,
//       calculateOverAllData: calculateOverAllData,
//     };

//     // ==============================
//     // 8. PEN PICTURE GENERATION
//     // ==============================
//     const penPicRes = penPicture(
//       finalData,
//       tradeName,
//       resAgniveer,
//       techPhaseDataCount?.length
//     );

//     finalData.penPicture = penPicRes;

//     // ==============================
//     // 9. SUCCESS RESPONSE
//     // ==============================
//     return sendResponse(
//       {
//         rid: "s-agniveer-3",
//         data: finalData,
//       },
//       res
//     );
//   } catch (err) {
//     console.error("Individual Report Error:", err);
//     return sendResponse({ rid: "e-agniveer-2", message: err.message }, res);
//   }
// };

const getGradeReport = async (req, res) => {
  try {
    const { courseId, squadNumber, tradeId } = req.query;
    const userId = res.locals;

    // Build initial match condition for tradeId (before unwinding)
    const initialMatchCondition = {};

    // Apply role-based tradeId filtering (similar to getAllAgniveers)
    if (userId?.role !== "Commander") {
      const userById = await User.findById(userId?.userId);
      const userTradeIds = userById?.tradeId || [];
      if (userTradeIds.length > 0) {
        initialMatchCondition.tradeId = { $in: userTradeIds };
      }
    } else {
      // For Commander, use tradeId from query if provided
      const normalizedTradeId = nullCheck(tradeId);
      if (normalizedTradeId) {
        try {
          initialMatchCondition.tradeId = Types.ObjectId.createFromHexString(normalizedTradeId);
        } catch (err) {
          initialMatchCondition.tradeId = normalizedTradeId;
        }
      }
    }

    // Build match condition for after unwinding
    const matchCondition = {};

    //  Optional courseId filter
    if (courseId) {
      matchCondition.courseName = new mongoose.Types.ObjectId(courseId);
    }

    //  Optional squadNumber filter
    if (
      squadNumber !== undefined &&
      squadNumber !== null &&
      squadNumber !== "" &&
      squadNumber !== "null"
    ) {
      matchCondition.squadNumber = Number(squadNumber);
    }

    const pipeline = [
      // 0️ FILTER BY TRADE ID FIRST (before unwinding)
      ...(Object.keys(initialMatchCondition).length > 0
        ? [{ $match: initialMatchCondition }]
        : []),

      // 1️ UNWIND courseName (array)
      {
        $unwind: "$courseName",
      },

      // 2️ APPLY MATCH IF ANY FILTER EXISTS (after unwinding)
      ...(Object.keys(matchCondition).length > 0
        ? [{ $match: matchCondition }]
        : []),

      // 3️ GROUP BY COURSE
      {
        $group: {
          _id: "$courseName",

          gradeA: {
            $sum: { $cond: [{ $eq: ["$grade", "A"] }, 1, 0] },
          },
          gradeB: {
            $sum: { $cond: [{ $eq: ["$grade", "B"] }, 1, 0] },
          },
          gradeC: {
            $sum: { $cond: [{ $eq: ["$grade", "C"] }, 1, 0] },
          },
          gradeE: {
            $sum: { $cond: [{ $eq: ["$grade", "E"] }, 1, 0] },
          },
          gradeD: {
            $sum: {
              $cond: [
                {
                  $or: [
                    { $eq: ["$grade", "D"] },
                    { $eq: ["$grade", null] },
                    { $eq: [{ $type: "$grade" }, "missing"] },
                  ],
                },
                1,
                0,
              ],
            },
          },

          totalCount: { $sum: 1 },
        },
      },

      // 4️ FINAL SHAPE
      {
        $project: {
          _id: 0,
          courseId: "$_id",
          gradeA: 1,
          gradeB: 1,
          gradeC: 1,
          gradeE: 1,
          gradeD: 1,
          totalCount: 1,
        },
      },
    ];

    const result = await Agniveer.aggregate(pipeline);

    return res.status(200).json({
      success: true,
      message: "Grade has been fetch successfully",
      data: result, //  array (one per course)
    });
  } catch (error) {
    console.error("Grade Report Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getAgniveerIndiviualReport = async (req, res) => {
  try {
    const { courseId, agniveerId, tradeId } = req.query;

    const agniveerObjId = new mongoose.Types.ObjectId(agniveerId);
    const courseObjId = new mongoose.Types.ObjectId(courseId);

    let physicalFitness = null;
    let techFinalRes = null;
    let fortNightPerformanceRes = null;

    const resAgniveer = await Agniveer.findById(agniveerObjId);

    // ==============================
    // 1. PHYSICAL PROFICIENCY
    // ==============================
    const physicalProficiencyData = await PhyscialProficiency.findOne({
      agniveerId: agniveerObjId,
      courseId: courseObjId,
    });

    if (physicalProficiencyData) {
      physicalFitness = calculatePhyscialProficinecyGrade(
        physicalProficiencyData.bpet,
        physicalProficiencyData.ppt,
        physicalProficiencyData.maxTotalPhyscialPerformance,
        physicalProficiencyData.maxTotalBpetPerformance,
        physicalProficiencyData.maxTotalPptPerformance,
      );
    }

    // ==============================
    // 2. FORTNIGHT PERFORMANCE
    // ==============================
    const fortNightlyData = await FortNightProficiency.findOne({
      agniveerId: agniveerObjId,
      courseId: courseObjId,
    }).sort({ createdAt: -1 });

    if (fortNightlyData) {
      fortNightPerformanceRes = calculateFortNightPerformance(fortNightlyData);
    }

    // ==============================
    // 3. TRADE DETAILS
    // ==============================
    const tradeRes = await Trade.findById(tradeId);
    const tradeName = tradeRes?.name;

    // ==============================
    // 4. TECH PHASE (TRADE WISE)
    // ==============================
    let techPhaseData = null;
    
    // Count agniveers filtered by both courseId and tradeId
    const tradeObjectId = mongoose.Types.ObjectId.isValid(tradeId)
      ? new mongoose.Types.ObjectId(tradeId)
      : tradeId;
    
    let techPhaseDataCount = await Agniveer.countDocuments({
      courseName: courseObjId,
      tradeId: tradeObjectId,
    });

    if (tradeName === "Gunner") {
      techPhaseData = await GunnerTechPhase.findOne({
        agniveerId: agniveerObjId,
        courseId: courseObjId,
      });
    } else if (tradeName === "Driver") {
      techPhaseData = await DriverTechPhase.findOne({
        agniveerId: agniveerObjId,
        courseId: courseObjId,
      });
    } else if (tradeName === "Operator") {
      techPhaseData = await OperatorTechPhase.findOne({
        agniveerId: agniveerObjId,
        courseId: courseObjId,
      });
    } else {
      techPhaseData = await OfcTechPhase.findOne({
        agniveerId: agniveerObjId,
        courseId: courseObjId,
      });
    }

    console.log("techPhaseData", techPhaseData);

    if (techPhaseData) {
      techFinalRes = calculateTechPhaseForIndividualSummary(
        techPhaseData,
        tradeName,
      );
    }

    // ==============================
    //  5. VALIDATION (AS YOU WANTED)
    // ==============================
    if (!techFinalRes || !physicalFitness || !fortNightPerformanceRes) {
      responseJSON["rid"] = "e-agniveer-7";
      return sendResponse(responseJSON, res);
    }

    // ==============================
    //  6. CALCULATE OVERALL
    // ==============================
    const calculateOverAllData = calculateOverAll(
      techFinalRes,
      physicalFitness,
      fortNightPerformanceRes,
    );

    // ==============================
    //  7. FINAL RESPONSE STRUCTURE
    // ==============================
    const finalData = {
      trade: tradeName,
      techPhase: techFinalRes,
      physicalFitness,
      fortNightly: fortNightPerformanceRes,
      calculateOverAllData,
    };

    // ==============================
    //  8. PEN PICTURE
    // ==============================

    const penPicRes = penPicture(
      finalData,
      tradeName,
      resAgniveer,
      techPhaseDataCount,
    );

    // penPicture now returns an object with html, performanceCategory, and overAllPercentage
    finalData.penPicture = penPicRes.html;
    finalData.penPictureCategory = penPicRes.performanceCategory;

    // ==============================
    //  9. SUCCESS RESPONSE
    // ==============================
    return sendResponse(
      {
        rid: "s-agniveer-3",
        data: finalData,
      },
      res,
    );
  } catch (err) {
    console.error("Individual Report Error:", err);
    return sendResponse({ rid: "e-agniveer-2", message: err.message }, res);
  }
};

const getDashboardSummary = async (req, res) => {
  try {
    // Count distinct course names using aggregation
    const courseCountResult = await Course.aggregate([
      {
        $group: {
          _id: "$courseName",
        },
      },
      {
        $count: "totalCourses",
      },
    ]);

    const totalCourses =
      courseCountResult.length > 0 ? courseCountResult[0].totalCourses : 0;

    //  Total Trained (all agniveers)
    const trained = await Agniveer.countDocuments();

    //  Passed (A, B, C, E)
    const passed = await Agniveer.countDocuments({
      grade: { $in: ["A", "B", "C", "E"] },
    });

    //  Failed (D)
    // const failed = await Agniveer.countDocuments({
    //   grade: "D",
    // });
    const failed = await Agniveer.countDocuments({
      $or: [{ grade: "D" }, { grade: null }, { grade: { $exists: false } }],
    });

    let finalData = {
      totalCourses,
      trained,
      passed,
      failed,
    };

    return sendResponse(
      {
        rid: "s-agniveer-6",
        data: finalData,
      },
      res,
    );
  } catch (error) {
    console.error("Dashboard Summary Error:", error);
    return sendResponse({ rid: "e-agniveer-2", message: error.message }, res);
  }
};

const getTradeDashboardSummary = async (req, res) => {
  try {
    //  1. Get Trade ID
    const { id } = req.params;
    console.log("req.params", req.params);

    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Trade not found",
      });
    }

    // Convert id to ObjectId for proper matching
    const tradeObjectId = mongoose.Types.ObjectId.isValid(id)
      ? new mongoose.Types.ObjectId(id)
      : id;

    //  2. Total Courses - Count distinct course names where tradeId array contains the trade ID
    const courseCountResult = await Course.aggregate([
      {
        $match: {
          tradeId: tradeObjectId,
        },
      },
      {
        $group: {
          _id: "$courseName",
        },
      },
      {
        $count: "totalCourses",
      },
    ]);

    const totalCourses =
      courseCountResult.length > 0 ? courseCountResult[0].totalCourses : 0;

    //  3. Trained
    const trained = await Agniveer.countDocuments({
      tradeId: id,
    });

    //  4. Passed (A,B,C,E)
    const passed = await Agniveer.countDocuments({
      tradeId: id,
      grade: { $in: ["A", "B", "C", "E"] },
    });

    //  5. Failed (D)
    const failed = await Agniveer.countDocuments({
      tradeId: id,
      $or: [{ grade: "D" }, { grade: null }, { grade: { $exists: false } }],
    });

    let finalData = {
      totalCourses,
      trained,
      passed,
      failed,
    };

    return sendResponse(
      {
        rid: "s-agniveer-6",
        data: finalData,
      },
      res,
    );
  } catch (error) {
    console.error("Trade Dashboard Error:", error);
    return sendResponse({ rid: "e-agniveer-2", message: error.message }, res);
  }
};

const exportAgniveers = async (req, res) => {
  try {
    let { courseName, squadNumber, tradeId, grade, text, armyNumber } =
      req.query;
    const userId = res.locals;

    courseName = nullCheck(courseName);
    squadNumber = nullCheck(squadNumber);
    armyNumber = nullCheck(armyNumber);
    grade = nullCheck(grade);
    tradeId = nullCheck(tradeId);

    let query = {};

    // Apply role-based filtering (same as getAllAgniveers)
    if (userId?.role !== "Commander") {
      const userById = await User.findById(userId?.userId);
      const tradeIds = userById?.tradeId || [];
      query.tradeId = { $in: tradeIds };
    } else {
      if (!tradeId) {
        responseJSON["rid"] = "e-agniveer-6";
        return sendResponse(responseJSON, res);
      }
      // Convert tradeId string to ObjectId
      try {
        query.tradeId = Types.ObjectId.createFromHexString(tradeId);
      } catch (err) {
        // If tradeId is already an ObjectId or invalid, use it as is
        query.tradeId = tradeId;
      }
    }

    // Apply filters - build $and array to handle multiple conditions properly
    const andConditions = [];

    if (courseName) {
      try {
        // Convert courseName string to ObjectId
        // courseName is an array field in the schema, so MongoDB will match if the ObjectId is in the array
        const courseObjectId = Types.ObjectId.createFromHexString(courseName);
        andConditions.push({ courseName: courseObjectId });
      } catch (err) {
        console.error("Error converting courseName to ObjectId:", err);
        // If courseName is already an ObjectId or invalid, use it as is
        andConditions.push({ courseName: courseName });
      }
    }

    if (text?.trim().length > 3) {
      const search = safeDecode(text?.trim());
      andConditions.push({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { armyNumber: { $regex: search, $options: "i" } },
        ],
      });
    }

    if (
      squadNumber !== undefined &&
      squadNumber !== null &&
      squadNumber !== "" &&
      squadNumber !== "null"
    ) {
      andConditions.push({ squadNumber: Number(squadNumber) });
    }

    if (
      armyNumber !== undefined &&
      armyNumber !== null &&
      armyNumber !== "" &&
      armyNumber !== "null"
    ) {
      andConditions.push({ armyNumber: armyNumber });
    }

    if (grade) {
      // Handle grade conversion (gradeA -> A, gradeE -> E, improvement -> D)
      let gradeValue = grade;
      if (grade.startsWith("grade")) {
        const g = grade.replace("grade", "");
        if (["A", "B", "C", "E"].includes(g)) {
          gradeValue = g;
        }
      } else if (grade === "improvement") {
        gradeValue = "D";
      }

      if (gradeValue === "D") {
        andConditions.push({
          $or: [{ grade: "D" }, { grade: null }, { grade: { $exists: false } }],
        });
      } else if (["A", "B", "C", "E"].includes(gradeValue)) {
        andConditions.push({ grade: gradeValue });
      }
    }

    // Combine all conditions
    if (andConditions.length > 0) {
      query.$and = andConditions;
    }

    // Fetch all agniveers matching the query (no pagination for export)
    const agniveers = await Agniveer.find(query)
      .populate("tradeId")
      .populate("courseName")
      .sort({ createdAt: -1 });

    console.log(`Export: Found ${agniveers.length} agniveers for export`);
    console.log("Export query:", JSON.stringify(query, null, 2));

    // Fetch all trades and courses for mapping
    const trades = await Trade.find();
    const courses = await Course.find();

    // Resolve tradeCode for template (DVR, GUN, OFC, OPR)
    let tradeCode = null;
    const resolvedTradeId = query.tradeId?.$in?.[0] || query.tradeId;
    const tradeIdVal =
      resolvedTradeId?.toString?.() ||
      (Array.isArray(resolvedTradeId) ? resolvedTradeId[0] : resolvedTradeId);
    if (tradeIdVal) {
      const trade = trades.find(
        (t) => (t._id || t).toString() === tradeIdVal.toString(),
      );
      tradeCode = trade
        ? getTradeCodeFromName(trade.name || trade.label)
        : null;
    }
    if (!tradeCode && agniveers.length > 0) {
      const firstTrade =
        agniveers[0].tradeId?.[0]?.name || agniveers[0].tradeId?.[0]?.label;
      tradeCode = getTradeCodeFromName(firstTrade);
    }
    if (!tradeCode) {
      responseJSON["rid"] = "e-agniveer-6";
      responseJSON["data"] = {
        message: "Could not determine trade for export format",
      };
      return sendResponse(responseJSON, res);
    }

    // Resolve course for metadata (when filtered by course)
    let courseForMeta = null;
    if (courseName) {
      try {
        const cid = Types.ObjectId.createFromHexString(courseName);
        courseForMeta = courses.find(
          (c) => c._id.toString() === cid.toString(),
        );
      } catch (_) {}
    }
    if (!courseForMeta && agniveers.length > 0) {
      const firstCid =
        agniveers[0].courseName?.[0]?._id || agniveers[0].courseName?.[0];
      if (firstCid) {
        courseForMeta = courses.find(
          (c) => c._id.toString() === (firstCid._id || firstCid).toString(),
        );
      }
    }

    // Fetch PhyscialProficiency, TechPhase, and FortNightProficiency for each agniveer+course
    const physicalMap = new Map();
    const techPhaseMap = new Map();
    const fortnightlyMap = new Map();
    const TechPhaseModel = {
      DVR: DriverTechPhase,
      GUN: GunnerTechPhase,
      OFC: OfcTechPhase,
      OPR: OperatorTechPhase,
    }[tradeCode];

    for (const ag of agniveers) {
      const courseIds = (ag.courseName || []).map((c) => c?._id || c);
      for (const cid of courseIds) {
        const key = `${ag._id}_${cid}`;
        const [physical, techPhase, fortnightly] = await Promise.all([
          PhyscialProficiency.findOne({
            agniveerId: ag._id,
            courseId: cid,
          }),
          TechPhaseModel
            ? TechPhaseModel.findOne({
                agniveerId: ag._id,
                courseId: cid,
              })
            : Promise.resolve(null),
          FortNightProficiency.findOne({
            agniveerId: ag._id,
            courseId: cid,
          }).sort({ createdAt: -1 }),
        ]);
        if (physical) physicalMap.set(key, physical);
        if (techPhase) techPhaseMap.set(key, techPhase);
        if (fortnightly) fortnightlyMap.set(key, fortnightly);
      }
    }

    // Generate Excel buffer using trade-specific template
    const excelBuffer = await excelHelper.exportAgniveersToExcelByTrade(
      agniveers,
      trades,
      courses,
      tradeCode,
      {
        course: courseForMeta || undefined,
        physicalMap,
        techPhaseMap,
        fortnightlyMap,
      },
    );

    console.log(
      `Export: Generated Excel buffer of size ${excelBuffer.length} bytes`,
    );

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "-");
    const filename = `CPAAS_${tradeCode}_export_${dateStr}.xlsx`;
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    // Send file buffer directly (don't use sendResponse for file downloads)
    res.send(excelBuffer);
  } catch (err) {
    console.error("Export Error:", err);
    return sendResponse({ rid: "e-agniveer-2", data: err.message }, res);
  }
};

const importAgniveers = async (req, res) => {
  try {
    const userId = res.locals;
    const file = req.file;
    const tradeIdFromBody = req.body?.tradeId;

    if (!file) {
      responseJSON["rid"] = "e-agniveer-10";
      return sendResponse(responseJSON, res);
    }

    const allowedMimeTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      responseJSON["rid"] = "e-agniveer-10";
      return sendResponse(responseJSON, res);
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      responseJSON["rid"] = "e-agniveer-11";
      return sendResponse(responseJSON, res);
    }

    const userById = await User.findById(userId?.userId);
    const userTradeIds = userById?.tradeId || [];

    let tradeId = tradeIdFromBody;
    if (!tradeId && userTradeIds.length === 1) {
      tradeId = userTradeIds[0];
    }
    if (!tradeId) {
      responseJSON["rid"] = "e-agniveer-12";
      responseJSON["data"] = {
        message:
          "Army Number, Trade Name, and Course Name are required for import. " +
          "Please ensure you are on the correct trade-specific page (e.g. Driver, Gunner) so Trade is set.",
      };
      return sendResponse(responseJSON, res);
    }

    const trades = await Trade.find();
    const trade = trades.find(
      (t) => (t._id || t).toString() === (tradeId._id || tradeId).toString(),
    );
    const tradeCode = trade
      ? getTradeCodeFromName(trade.name || trade.label)
      : null;
    if (!tradeCode) {
      responseJSON["rid"] = "e-agniveer-12";
      responseJSON["data"] = { message: "Invalid trade for import" };
      return sendResponse(responseJSON, res);
    }

    let parseResult;
    try {
      parseResult = excelHelper.parseExcelFileByTrade(file.buffer, tradeCode);
    } catch (parseError) {
      responseJSON["rid"] = "e-agniveer-10";
      responseJSON["data"] = {
        message: "Invalid Excel file format or wrong trade format",
      };
      return sendResponse(responseJSON, res);
    }

    const { rows } = parseResult;
    if (!rows || rows.length === 0) {
      responseJSON["rid"] = "e-agniveer-12";
      responseJSON["data"] = {
        errors: [
          {
            row: "-",
            field: "ARMY NO",
            message:
              "No data rows found. All rows appear to have empty Army Numbers or the sheet is blank.",
            data: [],
          },
        ],
        results: { created: 0, updated: 0, failed: 0 },
      };
      return sendResponse(responseJSON, res);
    }

    const courses = await Course.find();
    const course = excelHelper.resolveCourseFromExcel(
      parseResult,
      courses,
      tradeId,
    );
    if (!course) {
      responseJSON["rid"] = "e-agniveer-12";
      responseJSON["data"] = {
        message:
          "Army Number, Trade Name, and Course Name (COURSE BATCH NO) are required. " +
          "Ensure TRADE and COURSE BATCH NO are filled in the header row, and the course exists for this trade.",
      };
      return sendResponse(responseJSON, res);
    }

    const courseId = course._id;

    const validationErrors = [];
    for (const { rowIndex, data } of rows) {
      const errs = excelHelper.validateAgniveerRowByTrade(
        data,
        rowIndex,
        tradeCode,
      );
      validationErrors.push(...errs);
    }

    if (validationErrors.length > 0) {
      responseJSON["rid"] = "e-agniveer-12";
      responseJSON["data"] = {
        errors: validationErrors,
        results: { created: 0, updated: 0, failed: rows.length },
      };
      return sendResponse(responseJSON, res);
    }

    const results = { created: 0, updated: 0, failed: 0, errors: [] };
    const TechPhaseModel = {
      DVR: DriverTechPhase,
      GUN: GunnerTechPhase,
      OFC: OfcTechPhase,
      OPR: OperatorTechPhase,
    }[tradeCode];

    const MAX_TOTAL_SCORE = { DVR: 200, GUN: 200, OFC: 200, OPR: 200 };
    const maxTotalScore = MAX_TOTAL_SCORE[tradeCode] || 200;
    let anyTechPhaseUpdated = false;

    for (const { rowIndex, data } of rows) {
      try {
        const {
          agniveer: agniveerData,
          physical,
          techPhase,
          fortnightly,
        } = excelHelper.convertRowToAgniveerAndRelated(
          data,
          tradeCode,
          tradeId,
          courseId,
        );

        if (userId?.role !== "Commander") {
          const userTradeIdStrs = userTradeIds.map((id) => id.toString());
          const tradeIdStr = (tradeId._id || tradeId).toString();
          if (!userTradeIdStrs.includes(tradeIdStr)) {
            results.failed++;
            results.errors.push({
              row: rowIndex,
              field: "Trade",
              message: "You do not have permission to import this trade",
              data: data,
            });
            continue;
          }
        }

        let existingAgniveer = await Agniveer.findOne({
          armyNumber: agniveerData.armyNumber,
        });

        let agniveerId;
        if (existingAgniveer) {
          if (userId?.role !== "Commander") {
            const existingTradeIdStr = existingAgniveer.tradeId[0]?.toString();
            const userTradeIdStrs = userTradeIds.map((id) => id.toString());
            if (!userTradeIdStrs.includes(existingTradeIdStr)) {
              results.failed++;
              results.errors.push({
                row: rowIndex,
                field: "Army Number",
                message: "You do not have permission to update this agniveer",
                data: data,
              });
              continue;
            }
          }
          await Agniveer.findByIdAndUpdate(
            existingAgniveer._id,
            { $set: agniveerData },
            { new: true },
          );
          agniveerId = existingAgniveer._id;
          results.updated++;
        } else {
          const created = await Agniveer.create(agniveerData);
          agniveerId = created._id;
          results.created++;
        }

        if (agniveerId && (physical || techPhase)) {
          if (physical && Object.keys(physical.bpet || {}).length > 0) {
            await PhyscialProficiency.findOneAndUpdate(
              { agniveerId, courseId },
              { $set: physical },
              { upsert: true, new: true },
            );
          }
          if (techPhase && TechPhaseModel) {
            const hasPractical =
              techPhase.practical &&
              Object.values(techPhase.practical).some(
                (v) => v && typeof v === "object" && Object.keys(v).length > 0,
              );
            const hasTheoretical =
              techPhase.theoretical &&
              (techPhase.theoretical.writtenScore != null ||
                techPhase.theoretical.quizScore != null);
            if (hasPractical || hasTheoretical) {
              const savedPhase = await TechPhaseModel.findOneAndUpdate(
                { agniveerId, courseId },
                { $set: techPhase },
                { upsert: true, new: true },
              );

              const totalTheo = sumNumericValues(techPhase.theoretical);
              const totalPrac = sumNumericValues(techPhase.practical);
              const finalScore = totalTheo + totalPrac;

              const maxTheo = 80;
              const maxPrac = 120;
              const theoreticalPct = percentage(totalTheo, maxTheo);
              const practicalPct = percentage(totalPrac, maxPrac);
              const overallPct = percentage(finalScore, maxTotalScore);

              await TechPhaseModel.updateOne(
                { _id: savedPhase._id },
                {
                  $set: {
                    totalTheoreticalScore: totalTheo,
                    totalPracticalScore: totalPrac,
                    finalScore,
                    "theoretical.theoreticalPercentage": theoreticalPct,
                    "practical.practicalPercentage": practicalPct,
                    overallPercentage: overallPct,
                  },
                },
              );

              const gradeValue = calculateGrade(finalScore, maxTotalScore);
              await Agniveer.updateOne(
                { _id: agniveerId },
                { $set: { grade: gradeValue } },
              );

              anyTechPhaseUpdated = true;
            }
          }
        }

        if (agniveerId && fortnightly) {
          await FortNightProficiency.findOneAndUpdate(
            { agniveerId, courseId },
            { $set: { ...fortnightly, agniveerId, courseId } },
            { upsert: true, new: true },
          );
        }
      } catch (error) {
        results.failed++;
        results.errors.push({
          row: rowIndex,
          field: "General",
          message: error.message || "Failed to process row",
          data: data,
        });
      }
    }

    // If there are processing errors, return them
    if (results.errors.length > 0) {
      responseJSON["rid"] = "e-agniveer-12";
      responseJSON["data"] = {
        errors: results.errors,
        results: {
          created: results.created,
          updated: results.updated,
          failed: results.failed,
        },
      };
      return sendResponse(responseJSON, res);
    }

    if (anyTechPhaseUpdated && TechPhaseModel) {
      await calculateAndStoreAllDenseRanksForModel(TechPhaseModel, courseId);
    }

    // Success response
    responseJSON["rid"] = "s-agniveer-8";
    responseJSON["data"] = {
      created: results.created,
      updated: results.updated,
      total: rows.length,
    };
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.error("Import Error:", err);
    return sendResponse({ rid: "e-agniveer-2", data: err.message }, res);
  }
};

module.exports = {
  createAgniveer,
  getAllAgniveers,
  getAgniveerById,
  updateAgniveer,
  deleteAgniveer,
  getGradeReport,
  getAgniveerIndiviualReport,
  getDashboardSummary,
  getTradeDashboardSummary,
  exportAgniveers,
  importAgniveers,
};
