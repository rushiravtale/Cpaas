const { generateResponse } = require("../generateResponse");

module.exports = {
  "e-course-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      data.data,
      "e-course-1",
      null
    );
  },
  "e-course-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      data.data,
      "e-course-2",
      null
    );
  },
  "e-course-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Course is not found.",
      "e-course-3",
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
    "e-course-5": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Course name already exists.",
      "e-course-5",
      null
    );
  },


      "e-course-6": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Deletion not allowed. This course is assigned to one or more Agniveers.",
      "e-course-6",
      null
    );
  },

   "e-course-7": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "This course cannot be updated because it is assigned to one or more Agniveers.",
      "e-course-7",
      null
    );
  },



};
