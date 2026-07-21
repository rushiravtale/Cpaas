const { generateResponse } = require("../generateResponse");

module.exports = {
  "s-physicalProficiency-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Physical proficiency created successfully",
      "s-physicalProficiency-1",
      data
    );
  },
     "s-physicalProficiency-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Physical proficiency has been updated successfully",
      "s-physicalProficiency-2",
      data
    );
  },

    "s-physicalProficiency-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Physical proficiency has been fetch successfully",
      "s-physicalProficiency-3",
      data
    );
  },
  "s-physicalProficiency-4": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Physical proficiency is not found",
      "s-physicalProficiency-4",
      data
    );
  },
};
