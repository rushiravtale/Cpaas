const { generateResponse } = require("../generateResponse");

module.exports = {
  "s-driverTechPhase-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Driver tech phase saved successfully",
      "s-driverTechPhase-1",
      data
    );
  },
     "s-driverTechPhase-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Driver tech phase has been updated successfully",
      "s-driverTechPhase-2",
      data
    );
  },

    "s-driverTechPhase-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Driver tech phase has been fetch successfully",
      "s-driverTechPhase-3",
      data
    );
  },
  "s-driverTechPhase-4": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Driver tech phase is not found",
      "s-driverTechPhase-4",
      data
    );
  },
};
