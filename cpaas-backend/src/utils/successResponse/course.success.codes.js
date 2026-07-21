const { generateResponse } = require("../generateResponse");

module.exports = {
  "s-course-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Courses created successfully",
      "s-course-1",
      data
    );
  },
     "s-course-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Courses has been updated successfully",
      "s-course-2",
      data
    );
  },

    "s-course-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Courses has been fetch successfully",
      "s-course-3",
      data
    );
  },
  "s-course-4": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Courses has been deleted successfully",
      "s-course-4",
      data
    );
  },
};
