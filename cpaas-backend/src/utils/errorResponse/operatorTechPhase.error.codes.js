const { generateResponse } = require("../generateResponse");

module.exports = {
  "e-operatorTechPhase-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      data.data,
      "e-operatorTechPhase-1",
      null
    );
  },
  "e-operatorTechPhase-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      data.data,
      "e-operatorTechPhase-2",
      null
    );
  },
  "e-operatorTechPhase-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Operator tech phase is not found.",
      "e-operatorTechPhase-3",
      null
    );
  },

};
