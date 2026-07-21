const { generateResponse } = require("../generateResponse");

module.exports = {
  "e-users-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Only Instructor role can assign trade",
      "e-users-1",
      null
    );
  },
  "e-users-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "User is not found.",
      "e-users-2",
      null
    );
  },
  "e-users-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Username already exists",
      "e-users-3",
      null
    );
  },

  "e-users-4": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      data.data,
      "e-users-4",
      null
    );
  },
  "e-users-5": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Email already exists",
      "e-users-5",
      null
    );
  },

   "e-users-6": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "User deleted successfully",
      "e-users-6",
      null
    );
  },

     "e-users-7": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Instructor cannot create Commander",
      "e-users-7",
      null
    );
  },
};
