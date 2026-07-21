const FortNightProficiency = require("../schemas/fortNight.schema");
const sendResponse = require("../utils/sendResponse");

const createFortnightPerformanceController = async (req, res) => {
  try {
    const {
      agniveerId,
      courseId,
      physicalTraining,
      gamesPerformance,
      motivationLevel,
      militaryBearing,
      situationalAwareness,
      classPerformance,
      morale,
      decisionMaking,
      resilience,
      integrity,
      totalFortnightPerformance,
    } = req.body;

    const userId = req.user?._id;

    const data = {
      agniveerId,
      courseId,
      physicalTraining,
      gamesPerformance,
      motivationLevel,
      militaryBearing,
      situationalAwareness,
      classPerformance,
      morale,
      decisionMaking,
      resilience,
      integrity,
      totalFortnightPerformance,
    };
    console.log("data", data);

    const resData = await FortNightProficiency.create(data);


     const getData = await FortNightProficiency.find({
      agniveerId,
      courseId,
    });
    resData.sequence = getData.length;
    await resData.save(); 

   
    console.log("getData", getData?.length);

    data.sequence = getData?.length;

    responseJSON["rid"] = "s-fortnightPerformance-1";
    responseJSON["data"] = resData;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.error("Error creating Course:", err);
    err.rid = "e-fortnightPerformance-1";
    return sendResponse(err, res);
  }
};

const getFortnightPerformance = async (req, res) => {
  try {
    const { agniveerId, courseId } = req.query;

    const data = await FortNightProficiency.findOne({
      agniveerId,
      courseId,
    }).sort({ createdAt: -1 });

 

    if (!data) {
      responseJSON["rid"] = "s-fortnightPerformance-4";
      responseJSON["data"] = null;
      return sendResponse(responseJSON, res);
    }
    console.log("data", data);

    responseJSON["rid"] = "s-fortnightPerformance-3";
    responseJSON["data"] = data;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.log("error", err);
    err.rid = "e-fortnightPerformance-1";
    return sendResponse(err, res);
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
      twoPointFourKm,
      chinUps,
      pushUps,
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
      },
      ppt: {
        twoPointFourKm,
        chinUps,
        pushUps,
        fiveMeterShuttle,
      },
    };
    console.log("data", data);

    const updatedData = await PhyscialProficiency.findByIdAndUpdate(
      physcialProficiencyId,
      { $set: data },
      { new: true }
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
      res
    );
  }
};

module.exports = {
  createFortnightPerformanceController,
  getFortnightPerformance,
  updatePhyscialProficiency,
};
