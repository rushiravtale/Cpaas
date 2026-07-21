const { generateResponse } = require("../generateResponse");

module.exports = {
  "s-ofcTechPhase-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Ofc tech phase created successfully",
      "s-ofcTechPhase-1",
      data
    );
  },
     "s-ofcTechPhase-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Ofc tech phase has been updated successfully",
      "s-ofcTechPhase-2",
      data
    );
  },

    "s-ofcTechPhase-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Ofc tech phase has been fetch successfully",
      "s-ofcTechPhase-3",
      data
    );
  },
  "s-ofcTechPhase-4": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Ofc tech phase is not found",
      "s-ofcTechPhase-4",
      data
    );
  },
};
