const { generateResponse } = require("../generateResponse");

module.exports = {
  "e-s3-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Failed",
      "Invalid File ID",
      "e-s3-1",
      null
    );
  },
  "e-s3-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Failed",
      "File name cannot be empty",
      "e-s3-2",
      null
    );
  },
  "e-s3-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Failed",
      "Error Inserting",
      "e-s3-3",
      null
    );
  },
  "e-s3-4": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Failed",
      "Error archiving",
      "e-s3-4",
      null
    );
  },
  "e-s3-5": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Failed",
      "Error Listing the files",
      "e-s3-5",
      null
    );
  },
  "e-s3-6": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Failed",
      "File not found",
      "e-s3-6",
      null
    );
  },
  "e-s3-7": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Failed",
      "Invalid upload type",
      "e-s3-7",
      null
    );
  },
  "e-s3-8": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Failed",
      "upload Error",
      "e-s3-8",
      null
    );
  },
  "e-s3-9": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Failed",
      "Error fetching file from file master",
      "e-s3-9",
      null
    );
  },
  "e-s3-10": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Failed",
      "Couldnt get the zip",
      "e-s3-10",
      null
    );
  },
  "e-s3-11": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Failed",
      "Error getting download url",
      "e-s3-11",
      null
    );
  },
  "e-s3-12": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Failed",
      "Error fetching pending requests",
      "e-s3-12",
      null
    );
  },
  "e-s3-13": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Failed",
      "No pending requests",
      "e-s3-13",
      null
    );
  },
  "e-s3-14": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Failed",
      "Could not Delete Request",
      "e-s3-14",
      null
    );
  },
  "e-s3-15": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Failed",
      "Error Listing requests",
      "e-s3-15",
      null
    );
  },
};
