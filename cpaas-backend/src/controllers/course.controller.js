const { safeDecode, nullCheck } = require("../helpers/commonFunction.helper");
const Course = require("../schemas/course.schema");
const User = require("../schemas/user.schema");
let responseJSON = {};
const sendResponse = require("../utils/sendResponse");
const mongoose = require("mongoose");
const Agniveer = require("../schemas/agniveer.schema");

const createCourse = async (req, res) => {
  try {
    const { courseName, startDate, endDate, tradeId } = req.body;

    const userId = req.user?._id;

    const newName = courseName.trim();

    // Normalize tradeId to array
    const tradeIdsArray = Array.isArray(tradeId) ? tradeId : [tradeId].filter(Boolean);

    //  Check if course already exists
    const exists = await Course.findOne({ courseName: newName });
    console.log("exists", exists);

    if (exists) {
      // Course exists - add new tradeId(s) to existing course's tradeId array
      // Convert tradeIds to ObjectIds for comparison
      const tradeIdsObjectIds = tradeIdsArray.map(id => 
        mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : id
      );

      // Use $addToSet to add tradeIds without duplicates
      const updatedCourse = await Course.findByIdAndUpdate(
        exists._id,
        {
          $addToSet: { tradeId: { $each: tradeIdsObjectIds } },
          // Update dates if provided (optional - you may want to keep existing dates)
          ...(startDate && { startDate }),
          ...(endDate && { endDate }),
        },
        { new: true }
      );

      responseJSON["rid"] = "s-course-1";
      responseJSON["data"] = updatedCourse;
      return sendResponse(responseJSON, res);
    }

    // Course doesn't exist - create new course
    const courseData = {
      courseName: newName,
      startDate,
      endDate,
      tradeId: tradeIdsArray,
    };
    console.log("courseData", courseData);
    const resData = await Course.create(courseData);

    responseJSON["rid"] = "s-course-1";
    responseJSON["data"] = resData;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.error("Error creating Course:", err);
    err.rid = "e-course-1";
    return sendResponse(err, res);
  }
};

// const getAllCoursesWithPagination = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, courseName } = req.query;
//     const userId = res.locals;
//     console.log("userId", userId);

//     let query = {};
//     const safeCourseName = nullCheck(courseName);

//     if (safeCourseName) query.courseName = safeDecode(safeCourseName);

//     const options = {
//       page: parseInt(page),
//       limit: parseInt(limit),
//       sort: { createdAt: -1 },
//     };

//     var result;
//     if (userId?.role == "Commander") {
//       result = await Course.paginate({}, options);
//     } else {
//       const userById = await User.findById(userId?.userId);
//       console.log("userById", userById);

//       const tradeIds = userById?.tradeId || [];

//       // Fetch only courses whose tradeId matches user's tradeId
//       result = await Course.paginate({ tradeId: { $in: tradeIds } }, options);
//     }

//     const responseData = {
//       data: result.docs,
//       totalDocs: result.totalDocs,
//       totalPages: result.totalPages,
//       currentPage: result.page,
//       hasNextPage: result.hasNextPage,
//     };

//     const responseJSON = {
//       rid: "s-course-3",
//       data: responseData,
//     };

//     return sendResponse(responseJSON, res);
//   } catch (err) {
//     err.rid = "e-course-2";
//     return sendResponse({ rid: "e-course-2", data: err.message }, res);
//   }
// };

const getAllCoursesWithPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10, text } = req.query;
    const userId = res.locals;

    let query = {};
    // const safeCourseName = nullCheck(courseName);

    // //  Add courseName filter
    // if (safeCourseName) {
    //   query.courseName = safeDecode(safeCourseName);
    // }

    if (text?.trim().length > 3) {
      console.log("text", text);

      const search = safeDecode(text?.trim());

      query.$or = [
        { courseName: { $regex: search, $options: "i" } },
        // { armyNumber: { $regex:  search, $options: "i" } },
      ];
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
    };

    //  Apply tradeId filter for Non-Commander
    if (userId?.role !== "Commander") {
      const userById = await User.findById(userId?.userId);

      const tradeIds = userById?.tradeId || [];

      query.tradeId = { $in: tradeIds };
    }

    console.log("FINAL QUERY:", query);

    //  Combined filtering + pagination
    const result = await Course.paginate(query, options);

    const responseData = {
      data: result.docs,
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
      currentPage: result.page,
      hasNextPage: result.hasNextPage,
    };

    const responseJSON = {
      rid: "s-course-3",
      data: responseData,
    };

    return sendResponse(responseJSON, res);
  } catch (err) {
    return sendResponse({ rid: "e-course-2", data: err.message }, res);
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const resCourse = await Course.findById(id).populate("tradeId");
    if (!resCourse) {
      responseJSON["rid"] = "e-course-3";

      return sendResponse(responseJSON, res);
    }
    console.log("resCourse", resCourse);

    responseJSON["rid"] = "s-course-3";
    responseJSON["data"] = resCourse;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.log("error", err);

    err.rid = "e-course-2";
    return sendResponse({ rid: "e-course-2", data: err.message }, res);
  }
};

const updateCourse = async (req, res) => {
  try {
    const { courseName, tradeId, courseId, startDate, endDate } = req.body;

    const name = courseName?.trim();
    const courseObjId = new mongoose.Types.ObjectId(courseId);

    // 1️⃣ Check course exists
    const course = await Course.findById(courseObjId);
    if (!course) {
      return sendResponse({ rid: "e-course-3" }, res);
    }

    // 2️⃣ Check duplicate course name
    if (name && name !== course.courseName) {
      const duplicate = await Course.findOne({
        courseName: name,
        _id: { $ne: courseObjId },
      });

      if (duplicate) {
        return sendResponse({ rid: "e-course-5" }, res);
      }
    }

    // 3️⃣ Restrict updates only if course is assigned (for name changes)
    const isNameChanged = name && name !== course.courseName;

    if (isNameChanged) {
      const isAssigned = await Agniveer.exists({
        courseName: courseObjId,
      });

      if (isAssigned) {
        return sendResponse({ rid: "e-course-7" }, res);
      }
    }

    // 4️⃣ Prepare update object
    const updateData = {};
    
    if (name) updateData.courseName = name;
    if (startDate) updateData.startDate = startDate;
    if (endDate) updateData.endDate = endDate;

    // Normalize tradeId to array and add to existing tradeIds
    if (tradeId) {
      const tradeIdsArray = Array.isArray(tradeId) ? tradeId : [tradeId].filter(Boolean);
      const tradeIdsObjectIds = tradeIdsArray.map(id => 
        mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : id
      );
      
      // Use $addToSet to add tradeIds without duplicates
      // MongoDB supports mixing regular fields with operators in the same update object
      updateData.$addToSet = { tradeId: { $each: tradeIdsObjectIds } };
    }

    // 5️⃣ Update course
    const updatedCourse = await Course.findByIdAndUpdate(
      courseObjId,
      updateData,
      { new: true }
    );

    return sendResponse({ rid: "s-course-2", data: updatedCourse }, res);
  } catch (err) {
    console.error("updateCourse error:", err);
    return sendResponse({ rid: "e-course-2", data: err.message }, res);
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️ Check course exists
    const course = await Course.findById(id);
    if (!course) {
      return sendResponse({ rid: "e-course-3" }, res);
    }
console.log("course",course);

    // 2️ Check if course is assigned to any Agniveer
    const isAssigned = await Agniveer.exists({
      courseName: course._id,
    });

    if (isAssigned) {
      return sendResponse({ rid: "e-course-6" }, res);
    }

    // 3️ Delete course
    await Course.deleteOne({ _id: id });

    return sendResponse({ rid: "s-course-4", data: null }, res);
  } catch (err) {
    console.error("Error deleting course:", err);
    return sendResponse({ rid: "e-course-2", data: err.message }, res);
  }
};

const getAllCourses = async (req, res) => {
  try {
    const userId = res.locals;
    console.log("userId", userId);
    const { tradeId } = req.query;
    let query = {};

    // If user is not Commander → filter by tradeId
    if (userId?.role == "Instructor") {
      const userById = await User.findById(userId?.userId);
      console.log("userById", userById);

      const tradeIds = userById?.tradeId || [];
      query.tradeId = { $in: tradeIds };
    } else if (userId?.role === "Commander") {
      if (!tradeId) {
        responseJSON["rid"] = "e-course-4";

        return sendResponse(responseJSON, res);
      }

      query.tradeId = tradeId;
    }

    // Fetch all courses without pagination
    const result = await Course.find(query).sort({ createdAt: -1 });

    const responseJSON = {
      rid: "s-course-3",
      data: result, // full list
    };

    return sendResponse(responseJSON, res);
  } catch (err) {
    err.rid = "e-course-2";
    return sendResponse({ rid: "e-course-2", data: err.message }, res);
  }
};

module.exports = {
  createCourse,
  getAllCoursesWithPagination,
  getCourseById,
  updateCourse,
  deleteCourse,
  getAllCourses,
};
