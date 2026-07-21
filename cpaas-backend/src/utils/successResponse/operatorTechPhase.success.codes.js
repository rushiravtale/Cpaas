const { generateResponse } = require("../generateResponse");

module.exports = {
  "s-operatorTechPhase-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Operator tech phase create successfully",
      "s-operatorTechPhase-1",
      data
    );
  },
     "s-operatorTechPhase-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Operator tech phase has been updated successfully",
      "s-operatorTechPhase-2",
      data
    );
  },

    "s-operatorTechPhase-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Operator tech phase has been fetch successfully",
      "s-operatorTechPhase-3",
      data
    );
  },
  "s-operatorTechPhase-4": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Operator tech phase is not found",
      "s-operatorTechPhase-4",
      data
    );
  },
};
