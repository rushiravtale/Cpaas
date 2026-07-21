const { generateResponse } = require("../generateResponse");

module.exports = {
  "e-mst-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      data.data,
      "e-mst-1",
      null
    );
  },
};
