const { generateResponse } = require("../generateResponse");

module.exports = {
  "e-gunnerTechPhase-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      data.data,
      "e-gunnerTechPhase-1",
      null
    );
  },
  "e-gunnerTechPhase-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      data.data,
      "e-gunnerTechPhase-2",
      null
    );
  },
  "e-gunnerTechPhase-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Gunner tech phase is not found.",
      "e-gunnerTechPhase-3",
      null
    );
  },

};
