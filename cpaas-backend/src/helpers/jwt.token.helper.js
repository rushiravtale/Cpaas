const jwt = require("jsonwebtoken");

/** Generate new jwt token **/
exports.getJwtToken = function (userData, tokenSecret, options) {
  return jwt.sign(userData, tokenSecret, options);
};

/** Verify jwt token **/
exports.verifyToken = function (jwtInputToken, tokenSecret, callback) {
  jwt.verify(jwtInputToken, tokenSecret, callback);
};
