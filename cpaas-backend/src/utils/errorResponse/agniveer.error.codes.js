const { generateResponse } = require("../generateResponse");

module.exports = {
  "e-agniveer-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Unable to create agniveer.",
      "e-agniveer-1",
      null
    );
  },
  "e-agniveer-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
       "Unable to update agniveer.",
      "e-agniveer-2",
      null
    );
  },
  "e-agniveer-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Agniveer is not found.",
      "e-agniveer-3",
      null
    );
  },
  "e-agniveer-4": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Agniveer cannot be created because your trade does not match.",
      "e-agniveer-4",
      null
    );
  },
  "e-agniveer-5": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Agniveer cannot be updated because your trade does not match.",
      "e-agniveer-4",
      null
    );
  },
  "e-agniveer-6": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "tradeId is missing. Unable to fetch Agniveer",
      "e-agniveer-6",
      null
    );
  },
  "e-agniveer-7": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Evaluation of selected Agniveer is not fully completed. Kindly ensure that you fill Physical Proficiency, Tech Phase and Performance report data and retry",
      "e-agniveer-7",
      null
    );
  },

   "e-agniveer-8": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Agniveer is already enrolled to other course.",
      "e-agniveer-8",
      null
    );
  },


     "e-agniveer-9": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Army number should be unique.",
      "e-agniveer-9",
      null
    );
  },
  "e-agniveer-10": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Invalid Excel file format. Please upload a valid .xlsx or .xls file.",
      "e-agniveer-10",
      data || null
    );
  },
  "e-agniveer-11": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Excel file is too large. Maximum file size is 10MB.",
      "e-agniveer-11",
      data || null
    );
  },
  "e-agniveer-12": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Validation errors found in Excel data. Please check the error details.",
      "e-agniveer-12",
      data || null
    );
  },
  "e-agniveer-13": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Trade or Course not found during import. Please verify the names match existing records.",
      "e-agniveer-13",
      data || null
    );
  },

};
