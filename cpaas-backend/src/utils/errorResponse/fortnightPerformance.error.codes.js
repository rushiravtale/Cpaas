const { generateResponse } = require("../generateResponse");

module.exports = {
  "e-fortnightPerformance-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      data.data,
      "e-fortnightPerformance-1",
      null
    );
  },
  "e-physicalProficiency-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      data.data,
      "e-physicalProficiency-2",
      null
    );
  },
  "e-physicalProficiency-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Physical Proficiency is not found.",
      "e-physicalProficiency-3",
      null
    );
  },
  "e-course-4": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Commander must provide tradeId to fetch courses.",
      "e-course-4",
      null
    );
  },
};
