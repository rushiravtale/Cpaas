const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const UserToken = require("../schemas/user_tokens.schema");
const authHelper = require("../helpers/auth.helper");
const jwtTokenHelper = require("../helpers/jwt.token.helper");

// var randtoken = require("rand-token");
var moment = require("moment");

/**  Generate Auth & Refresh Tokens **/
const createAuthAndRefreshTokenForUser = function (
  userId,
  userDataForToken,
  tokenSecret,
  tokenOptions
) {
  return new Promise(async (resolve, reject) => {
    try {
      /* Fetch token details for  user */
       
      var userWithToken = await UserToken.findOne({ userId: userId });

      /* Destroy token */
      if (userWithToken) await this.destroyToken(userId);

      /* Generate new auth token */
      const jwtToken = await jwtTokenHelper.getJwtToken(
        JSON.parse(JSON.stringify(userDataForToken)),
        tokenSecret,
        tokenOptions
      );

      if (!jwtToken) reject(this.generateTokenGenerationError());
      /* Create refresh Token */
      var userDataRefreshToken = await authHelper.prepareDataForRefreshToken(
        userId
      );  

      if (!userDataRefreshToken) {
        reject(this.generateTokenGenerationError());
      }
      userDataRefreshToken["type"] = "refreshToken";
      let refreshTokenOptions = {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      };

      const refreshToken = await this.generateRefreshToken(
        userDataRefreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        refreshTokenOptions
      );

      if (!refreshToken) reject(this.generateTokenGenerationError());
      console.log("jwtToken:" + jwtToken + " refreshToken:" + refreshToken);
      /* Save auth token */
      let otpToken = await new UserToken({
        userId: userId,
        token: jwtToken,
        refreshToken: refreshToken,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        expiryTime: this.calculateTokenExpiryTime(process.env.JWT_EXPIRES_IN),
        refreshExpiryTime: this.calculateTokenExpiryTime(
          process.env.REFRESH_TOKEN_EXPIRES_IN
        ),
      }).save();

      /* Fetch the new details for user */
      userWithToken = await UserToken.findOne({ userId: userId });

      resolve(userWithToken);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

/** Destroy Token */
// exports.destroyToken = function (userId) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       var query = { userId: userId };
//       UserToken.deleteOne(query, function (err, obj) {
//         if (err) throw err;
//         console.log("1 document deleted");
//       });
//       resolve(userId);
//     } catch (err) {
//       reject(err);
//     }
//   });
// };

const destroyToken = async (userId) => {
  console.log("destroyToken", typeof userId);
  
  try {
    
    const result = await UserToken.deleteOne({ userId: userId });
console.log("result",result);

    if (result.deletedCount === 0) {
      console.log("No user found to delete");
    } else {
      console.log("User deleted successfully");
    }
  } catch (err) {
    console.error("Error deleting user:", err);
  }
}; 

const generateRefreshToken = function (
  userDataRefreshToken,
  refreshTokenSecret,
  refreshTokenOptions
) {
  /* Create refresh Token */
  // var refreshToken = randtoken.uid(256);
  // return refreshToken;

  return new Promise(async (resolve, reject) => {
    try {
      /* Generate new auth token */
      const jwtToken = await jwtTokenHelper.getJwtToken(
        userDataRefreshToken,
        refreshTokenSecret,
        refreshTokenOptions
      );
      resolve(jwtToken);
    } catch (err) {
      reject(err);
    }
  });
};

const calculateTokenExpiryTime = function (expiryTime) {
  /* Get hours, minutes, seconds from expiryTime */
  var hours = 0;
  var minutes = 0;
  var seconds = 0;
  var temp = expiryTime;

  var time = temp.split("s");
  if (time.length > 1) {
    seconds = time[0];
    if (time.length > 1) temp = time[1];
  }
  time = temp.split("m");
  if (time.length > 1) {
    minutes = time[0];
    if (time.length > 1) temp = time[1];
  }
  time = temp.split("h");
  if (time.length > 1) {
    hours = time[0];
  }

  /* Calculate timestamp for expiry time */
  let expiry = moment()
    .add(hours, "hours")
    .add(minutes, "minutes")
    .add(seconds, "seconds")
    .unix();
  return expiry;
};

/** Generate Errors **/
/** Generate Token Error **/
const generateTokenGenerationError = function () {
  let error = new Error();
  error.rid = "e-auth-18";
  return error;
};


module.exports={
  generateTokenGenerationError,
  calculateTokenExpiryTime,
  generateRefreshToken,
  createAuthAndRefreshTokenForUser,

destroyToken
  
}
