const { generateResponse } = require("../generateResponse");

module.exports = {
  "s-gunnerTechPhase-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Gunner tech phase created Successfully",
      "s-gunnerTechPhase-1",
      data
    );
  },
     "s-gunnerTechPhase-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Gunner tech phase has been Updated Successfully",
      "s-gunnerTechPhase-2",
      data
    );
  },

    "s-gunnerTechPhase-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Gunner tech phase has been fetch successfully",
      "s-gunnerTechPhase-3",
      data
    );
  },
  "s-gunnerTechPhase-4": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Gunner tech phase is not found",
      "s-gunnerTechPhase-4",
      data
    );
  },
};
