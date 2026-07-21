const { generateResponse } = require("../generateResponse");

module.exports = {
  "s-mst-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "User roles fetch successfully",
      "s-mst-1",
      data
    );
  },
  "s-mst-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Trade has been fetch successfully",
      "s-mst-2",
      data
    );
  },
    "s-mst-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Permission has been fetch successfully",
      "s-mst-3",
      data
    );
  },
};
