const errorResponse = require("./errorResponse");
const successResponse = require("./successResponse");

module.exports = (reqRes, res) => {
  console.log("reqRes: " + JSON.stringify(reqRes));
  if (reqRes.rid[0] === "s") {
    return successResponse[reqRes.rid](res, reqRes.data);
  } else {
    return errorResponse[reqRes.rid](res, reqRes);
  }
};
