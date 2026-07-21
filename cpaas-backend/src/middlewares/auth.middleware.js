var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const sendResponse = require("../utils/sendResponse");
const UserToken = require("../schemas/user_tokens.schema");

/** Verify Auth Token **/
// exports.verifyAuthToken = function (req, res, next) {
//   let bearer = req.headers["authorization"];
//   console.log("BEARER: " + bearer);
//   var bearerToken = bearer?.split(" ");
//   var token = bearerToken[1];
//   console.log(" TOKEN: " + token);
//   var error = new Error();

//   /* Send missing token error if auth token not in request header */
//   if (!token) {
//     error.rid = "e-auth-15";
//     return sendResponse(error, res);
//   }
//   console.log("TOKEN: " + token + " SECRET: " + process.env.TOKEN_SECRET);

//   jwt.verify(
//     token,
//     process.env.TOKEN_SECRET,
//     // { ignoreExpiration: true },
//     function (err, decoded) {
//       /* Send invalid/expired token error if auth token is expired */
//       console.log("DECODED : " + JSON.stringify(decoded));
//       if (err) {
//         console.log("ERROR1: " + err);
//         error.rid = "e-auth-14";
//         return sendResponse(error, res);
//       }

//       // save to request for use in other routes
//       res.locals.userId = decoded._id;
//       res.locals.verifiedToken = token;

//       /* Check if token exists in db */
//       UserToken.findOne({
//         userId: decoded._id,
//       }).then(async (userWithToken) => {
//         /* User not found */
//         console.log("userWithToken", userWithToken);

//         if (!userWithToken) {
//           error.rid = "e-auth-2";
//           return sendResponse(error, res);
//         }
//         /* Send unauthorized access error if access token does not exist/match */
//         if (
//           userWithToken["token"] == null ||
//           userWithToken["token"] == undefined ||
//           userWithToken["token"] !== token
//         ) {
//           error.rid = "e-auth-16";
//           return sendResponse(error, res);
//         }
//       });
//       next();
//     }
//   );
// };


exports.verifyAuthToken = async function (req, res, next) {
  try {
    let bearer = req.headers["authorization"];
    var bearerToken = bearer.split(" ");
    var token = bearerToken[1];
    var error = new Error();
console.log("bearer",bearer);
console.log("token",token);


    /* Send missing token error if auth token not in request header */
    if (!token) {
      error.rid = "e-auth-15";
      return sendResponse(error, res);
    }

    jwt.verify(
      token,
      process.env.TOKEN_SECRET,
      // { ignoreExpiration: true },
      async function (err, decoded) {
        /* Send invalid/expired token error if auth token is expired */
        console.log("decoded",decoded);
        
        if (err) {
          error.rid = "e-auth-14";
          return sendResponse(error, res);
        }
        // save to request for use in other routes
        res.locals.userId = decoded._id;
        res.locals.role = decoded.rname;
        res.locals.verifiedToken = token;
        res.locals.isCustomer = decoded.isCustomer;
        res.locals.userSequenceId = decoded.userSequenceId;
        var userWithToken = await UserToken.findOne({ userId: decoded._id });
        //console.log(JSON.stringify(userWithToken,null,4))
        if (!userWithToken) {
          const error = new Error();
          error.rid = "e-auth-2";
          return sendResponse(error, res);
        }
        if (
          userWithToken["token"] == null ||
          userWithToken["token"] == undefined ||
          userWithToken["token"] !== token
        ) {
          const error = new Error();
          error.rid = "e-auth-16";
          return sendResponse(error, res);
        }
        next();
      }
    );
  } catch (error) {
    error.rid = "e-auth-16";
    return sendResponse(error, res);
  }
};
/** Verify Refresh Token **/
exports.verifyRefreshToken = function (req, res, next) {
  let bearer = req.headers["authorization"];
  console.log("BEARER: " + bearer);
  var bearerToken = bearer.split(" ");
  var refreshToken = bearerToken[1];

  /* Send missing refresh token error if token not in request header */
  var error = new Error();
  if (!refreshToken) {
    error.rid = "e-auth-15";
    return sendResponse(error, res);
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    // { ignoreExpiration: true },
    function (err, decoded) {
      /* Send unauthorized access error if refresh token is expired */
      if (err) {
        console.log(err);
        error.rid = "e-auth-16";
        return sendResponse(error, res);
      }

      // save to request for use in other routes
      res.locals.userId = decoded.id;
      console.log("decoded.id: " + decoded.id);
      /* Check if token exists in db */
      UserToken.findOne({
        where: { userId: decoded.id },
      }).then(async (userWithToken) => {
        /* User not found */
        if (!userWithToken) {
          error.rid = "e-auth-2";
          return sendResponse(error, res);
        }
        /* Send invalid token error if refresh token does not match/exist */
        console.log("userWithToken: " + JSON.stringify(userWithToken));
        if (
          userWithToken["refreshToken"] == null ||
          userWithToken["refreshToken"] == undefined ||
          userWithToken["refreshToken"] != refreshToken
        ) {
          error.rid = "e-auth-13";
          return sendResponse(error, res);
        }
        next();
      });
    }
  );
};
