const PhyscialProficiency = require("../schemas/physcialProficiency_schema");
const sendResponse = require("../utils/sendResponse");

const createPhyscialProficiency = async (req, res) => {
  try {
    const {
      agniveerId,
      courseId,
      fiveKmRun,
      sixtyMeterSprint,
      horizontalRope,
      verticalRope,
      nineFeetDitch,
      twoPointFourKm,
      chinUps,
      toeTouch,
      sitUps,
      sprint100m,
      fiveMeterShuttle,
    } = req.body;

    const userId = req.user?._id;

    const data = {
      agniveerId,
      courseId,
      bpet: {
        fiveKmRun,
        sixtyMeterSprint,
        horizontalRope,
        verticalRope,
        nineFeetDitch,
      },
      ppt: {
        twoPointFourKm,
        chinUps,
        toeTouch,
        sitUps,
        sprint100m,
        fiveMeterShuttle,
      },
      maxTotalPptPerformance: 24,
      maxTotalBpetPerformance: 16,
      maxTotalPhyscialPerformance: 40,
    };
    console.log("data", data);

    const resData = await PhyscialProficiency.create(data);

    responseJSON["rid"] = "s-physicalProficiency-1";
    responseJSON["data"] = resData;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.error("Error creating Course:", err);
    err.rid = "e-physicalProficiency-1";
    return sendResponse(err, res);
  }
};

const getPhyscialProficiencyById = async (req, res) => {
  try {
    const { agniveerId, courseId } = req.query;
    const data = await PhyscialProficiency.findOne({
      agniveerId,
      courseId,
    });
    if (!data) {
      responseJSON["rid"] = "s-physicalProficiency-4";
      responseJSON["data"] = null;
      return sendResponse(responseJSON, res);
    }
    console.log("data", data);

    responseJSON["rid"] = "s-physicalProficiency-3";
    responseJSON["data"] = data;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.log("error", err);

    err.rid = "e-physicalProficiency-2";
    return sendResponse(
      { rid: "e-physicalProficiency-2", data: err.message },
      res,
    );
  }
};

const updatePhyscialProficiency = async (req, res) => {
  try {
    const {
      physcialProficiencyId,
      fiveKmRun,
      sixtyMeterSprint,
      horizontalRope,
      verticalRope,
      nineFeetDitch,
      twoPointFourKm,
      chinUps,
      toeTouch,
      sitUps,
      sprint100m,
      fiveMeterShuttle,
    } = req.body;
    console.log("req.body", req.body);

    const data = {
      physcialProficiencyId,

      bpet: {
        fiveKmRun,
        sixtyMeterSprint,
        horizontalRope,
        verticalRope,
        nineFeetDitch,
      },
      ppt: {
        twoPointFourKm,
        chinUps,
        toeTouch,
        sitUps,
        sprint100m,
        fiveMeterShuttle,
      },
      maxTotalPptPerformance: 24,
      maxTotalBpetPerformance: 16,
      maxTotalPhyscialPerformance: 40,
    };
    console.log("data", data);

    const updatedData = await PhyscialProficiency.findByIdAndUpdate(
      physcialProficiencyId,
      { $set: data },
      { new: true },
    );

    console.log("updatedData", updatedData);

    if (!updatedData) {
      responseJSON["rid"] = "e-physicalProficiency-3";

      return sendResponse(responseJSON, res);
    }

    responseJSON["rid"] = "s-physicalProficiency-2";
    responseJSON["data"] = updatedData;
    return sendResponse(responseJSON, res);
  } catch (err) {
    err.rid = "e-physicalProficiency-2";
    return sendResponse(
      { rid: "e-physicalProficiency-2", data: err.message },
      res,
    );
  }
};

module.exports = {
  createPhyscialProficiency,
  getPhyscialProficiencyById,
  updatePhyscialProficiency,
};
