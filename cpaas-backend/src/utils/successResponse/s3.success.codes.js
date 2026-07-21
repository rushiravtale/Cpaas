const { generateResponse } = require("../generateResponse");

module.exports = {
  "s-s3-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "File added Successfully",
      "s-s3-1",
      data
    );
  },
  "s-s3-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "archived Successfully",
      "s-s3-2",
      data
    );
  },
  "s-s3-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Listing the files Successfully",
      "s-s3-3",
      data
    );
  },
  "s-s3-4": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "File found",
      "s-s3-4",
      data
    );
  },
  "s-s3-5": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Files Listed",
      "s-s3-5",
      data
    );
  },
  "s-s3-6": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "File Uploaded Successfully",
      "s-s3-6",
      data
    );
  },
  "s-s3-7": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Download link generated Successfully",
      "s-s3-7",
      data
    );
  },
  "s-s3-8": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "upload links generated Successfully",
      "s-s3-8",
      data
    );
  },
  "s-s3-9": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "File deleted Successfully",
      "s-s3-9",
      data
    );
  },
  "s-s3-10": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Request queued Successfully",
      "s-s3-10",
      data
    );
  },
  "s-s3-11": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Zip generated Successfully",
      "s-s3-11",
      data
    );
  },
  "s-s3-12": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Multiupload aborted Successfully",
      "s-s3-12",
      data
    );
  },
  "s-s3-13": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Request Deleted Successfully",
      "s-s3-13",
      data
    );
  },
  "s-s3-14": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Requests Fetched",
      "s-s3-14",
      data
    );
  },
};
