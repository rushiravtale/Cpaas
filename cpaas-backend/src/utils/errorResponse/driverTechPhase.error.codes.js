const { generateResponse } = require("../generateResponse");

module.exports = {
  "e-driverTechPhase-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      data.data,
      "e-driverTechPhase-1",
      null
    );
  },
  "e-driverTechPhase-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      data.data,
      "e-driverTechPhase-2",
      null
    );
  },
  "e-driverTechPhase-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Driver tech phase is not found.",
      "e-driverTechPhase-3",
      null
    );
  },

};
