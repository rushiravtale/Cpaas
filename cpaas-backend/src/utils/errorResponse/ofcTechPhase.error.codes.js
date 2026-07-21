const { generateResponse } = require("../generateResponse");

module.exports = {
  "e-ofcTechPhase-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      data.data,
      "e-ofcTechPhase-1",
      null
    );
  },
  "e-ofcTechPhase-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      data.data,
      "e-ofcTechPhase-2",
      null
    );
  },
  "e-ofcTechPhase-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Ofc tech phase is not found.",
      "e-ofcTechPhase-3",
      null
    );
  },

};
