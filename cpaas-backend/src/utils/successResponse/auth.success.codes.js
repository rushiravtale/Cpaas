const { generateResponse } = require("../generateResponse");

module.exports = {
  /** s-auth-1 - USER SUCCESS **/
  "s-auth-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "User saved successfully",
      "s-auth-1",
      data
    );
  },

  /** s-auth-2 - s-auth-3 - FORGOT PASSWORD SUCCESS **/
  "s-auth-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Forgot Password processed successfully",
      "s-auth-2",
      data
    );
  },

  "s-auth-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Password reset successful",
      "s-auth-3",
      data
    );
  },

  /** s-auth-4 - s-auth-5 - OTP SUCCESS **/
  "s-auth-4": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "OTP has been sent successfully",
      "s-auth-4",
      data
    );
  },

  "s-auth-5": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "OTP has been verified successfully",
      "s-auth-5",
      data
    );
  },

  /** s-auth-6 - CHANGE PASSWORD SUCCESS **/
  "s-auth-6": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Password has been changed successfully",
      "s-auth-6",
      data
    );
  },

  /** s-auth-7 - TOKEN GENERATION SUCCESS **/
  "s-auth-7": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Token generated successfully",
      "s-auth-7",
      data
    );
  },

  /** s-auth-8 - LOGOUT SUCCESS **/
  "s-auth-8": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Logged out successfully",
      "s-auth-8",
      data
    );
  },

   "s-auth-9": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Users fetch successfully",
      "s-auth-9",
      data
    );
  },
    "s-auth-10": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "User Logged In successfully",
      "s-auth-10",
      data
    );
  },
};
