const { generateResponse } = require("../generateResponse");

module.exports = {
  /** e-auth-1 - e-auth-4 - USER ERRORS **/
  "e-auth-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Login Failed",
      "Error in signing in the user",
      "e-auth-1",
      null
    );
  },

  "e-auth-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "User Not found or not active",
      "e-auth-2",
      null
    );
  },

  "e-auth-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Invalid UserName/Password",
      "e-auth-3",
      null
    );
  },

  "e-auth-4": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "User is not associated with any roles",
      "e-auth-4",
      null
    );
  },

  /** e-auth-5 - e-auth-6 - FORGOT PASSWORD ERRORS **/
  "e-auth-5": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Error in processing forgot password request",
      "e-auth-5",
      null
    );
  },

  "e-auth-6": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Password reset failed",
      "e-auth-6",
      null
    );
  },

  /** e-auth-7 - e-auth-9 - CHANGE PASSWORD ERRORS **/
  "e-auth-7": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Error in processing change password request",
      "e-auth-7",
      null
    );
  },

  "e-auth-8": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Invalid Password",
      "e-auth-8",
      null
    );
  },

  "e-auth-9": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Incorrect Old Password",
      "e-auth-9",
      null
    );
  },

  //e-auth-10 - e--auth-11 OTP ERRORS
  "e-auth-10": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Error in generating otp for user",
      "e-auth-10",
      null
    );
  },

  "e-auth-11": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Invalid OTP",
      "e-auth-11",
      null
    );
  },

  /** e-auth-12 - e-auth-17 - PERMISSION ERRORS **/
  "e-auth-12": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Access Denied",
      "e-auth-12",
      null
    );
  },

  "e-auth-13": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Invalid token",
      "e-auth-13",
      null
    );
  },

  "e-auth-14": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Invalid or Expired Token",
      "e-auth-14",
      null
    );
  },

  "e-auth-15": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Missing Token",
      "e-auth-15",
      null
    );
  },

  "e-auth-16": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Unauthorized Access",
      "e-auth-16",
      null
    );
  },

  "e-auth-17": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Invalid or Expired Refresh Token",
      "e-auth-17",
      null
    );
  },

  /** e-auth-18 - TOKEN ERRORS **/
  "e-auth-18": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Error in generating token",
      "e-auth-18",
      null
    );
  },

  /** e-auth-18 - LOGOUT ERRORS **/
  "e-auth-19": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "Error in logging out user",
      "e-auth-19",
      null
    );
  },

  /** e-auth-18 - LOGOUT ERRORS **/




};
