const { generateResponse } = require("../generateResponse");

module.exports = {
  "s-agniveer-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Agniveer has been created successfully",
      "s-agniveer-1",
      data
    );
  },
     "s-agniveer-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Agniveer has been updated successfully",
      "s-agniveer-2",
      data
    );
  },
      "s-agniveer-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Agniveer has been fetch successfully",
      "s-agniveer-3",
      data
    );
  },
  "s-agniveer-4": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Agniveer has been deleted successfully",
      "s-agniveer-4",
      data
    );
  },
  "s-agniveer-5": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Agniveer individual report has been fetch successfully",
      "s-agniveer-5",
      data
    );
  },

    "s-agniveer-6": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Records has been fetch successfully",
      "s-agniveer-6",
      data
    );
  },
  "s-agniveer-7": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Agniveers have been exported successfully",
      "s-agniveer-7",
      data
    );
  },
  "s-agniveer-8": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Agniveers have been imported successfully",
      "s-agniveer-8",
      data
    );
  },


};
