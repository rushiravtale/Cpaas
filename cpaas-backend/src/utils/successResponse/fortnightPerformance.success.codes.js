const { generateResponse } = require("../generateResponse");

module.exports = {
  "s-fortnightPerformance-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Fortnightly performance created Successfully",
      "s-fortnightPerformance-1",
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

    "s-fortnightPerformance-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "fortnightly performance has been fetch successfully",
      "s-fortnightPerformance-3",
      data
    );
  },
  "s-fortnightPerformance-4": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Fortnightly performance is not found",
      "s-fortnightPerformance-4",
      data
    );
  },
};
