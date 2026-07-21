const { generateResponse } = require("../generateResponse");

module.exports = {
  /** s-auth-1 - USER SUCCESS **/
  "s-users-1": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Users fetch successfully",
      "s-auth-1",
      data
    );
  },
    "s-users-2": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Success",
      "Users updated successfully",
      "s-auth-1",
      data
    );
  },
   "s-users-3": (response, data) => {
    generateResponse(
      response,
      200,
      "Status - Fail",
      "User deleted successfully",
      "s-users-3",
      null
    );
  },
}