const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const UserOtp = require("../schemas/user_otps.schema");
const User = require("../schemas/user.schema");
var moment = require("moment");
const authHelper = require("../helpers/auth.helper");
const userHelper = require("../helpers/user.helper");

/** Generate Otp for user **/
exports.generateOtpForUser = function (userIdentifier) {
  const otpLength = process.env.OTP_LENGTH;

  return new Promise(async (resolve, reject) => {
    try {
      /* Map user from User table */
      let user = await User.findOne({ userName: userIdentifier });

      /* If user not found, throw error */
      var err = null;
      err = userHelper.generateUserNullError(user);
      if (err) reject(err);

      /* If user found, check if otp exists for user */
      if (user != null) {
        let userOtp = await UserOtp.find({ userId: user["_id"] });
        /* If otp exists, destroy otp */
        if (userOtp != null && userOtp.length != null) {
          this.destroyOtp(user._id);
        }

        /* Generate new otp for given length */
        const otp = await this.generateNewOtp(otpLength);

        /* If otp could not be generated throw error */
        if (!otp) {
          reject(this.generateOtpGenerationError());
        }

        /* Get hours, minutes, seconds from env variable expiryTime */
        let expiry = this.calculateOtpExpiryTime();

        /* Create & save new UserOtp record with new expiry time */
        let otpUser = await new UserOtp({
          userId: user.id,
          otp: otp,
          active: true,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          expiryTime: expiry,
        }).save();
        console.log("\n\nRESPONSE OTP USER " + JSON.stringify(otpUser));
        resolve(otpUser);
      }
    } catch (err) {
      console.log(err);
      err.rid = "e-auth-10";
      reject(err);
    }
  });
};

/** Verify Otp **/
exports.verifyOtp = async (userIdentifier, otp) => {
  return new Promise(async (resolve, reject) => {
    try {
      /* Map user from User table fetch user roles */
      let whereClause = { userName: userIdentifier };
      let fieldsToBeExcluded = "-password";

      let user = await userHelper.fetchUserWithRolesAndPermissions(
        whereClause,
        fieldsToBeExcluded
      );

      /* If user not found, throw error */
      var err = userHelper.generateUserNullError(user);
      if (err) reject(err);

      /* Map user from UserOtp table with userId, otp and active otp */
      let userotp = await UserOtp.findOne({
        userId: user.id,
        otp: otp,
        expiryTime: { $gte: moment().unix() },
      });

      // console.log("\n\nRESPONSE USER OTP: " + JSON.stringify(userotp));
      /* If user with otp and active OTP not found, throw error, else fetch sign in details */
      if (!userotp) {
        reject(this.generateInvalidOtpError());
      } else {
        const query = { userId: user.id };
        const update = {
          $set: { active: false },
        };
        const options = {};
        await UserOtp.updateOne(query, update, options);

        // await UserOtp.update({ active: false }, { where: { userId: user.id } });

        /* If user with no roles found, throw error */
        err = userHelper.generateNoUserRoleError(user);
        if (err) reject(err);

        /* Prepare data for fetching new token */
        let userDataForToken = await authHelper.prepareDataForNewToken(user.id);
        // console.log("userDataForToken:" + JSON.stringify(userDataForToken));
        let tokenOptions = {
          expiresIn: process.env.JWT_EXPIRES_IN,
        };

        /* Create new token */
        authHelper
          .getUserByIdWithAuthToken(
            user.id,
            { password: 0 },
            userDataForToken,
            process.env.TOKEN_SECRET,
            tokenOptions
          )
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(this.generateInvalidOtpError());
          });
      }
    } catch (err) {
      reject(this.generateInvalidOtpError());
    }
  });
};

/* Calculate timestamp for otp expiry time */
exports.calculateOtpExpiryTime = function () {
  let expiryTime = process.env.OTP_EXPIRES_IN;
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

/* Generate new otp for given length */
exports.generateNewOtp = function (otpLength) {
  return new Promise(async (resolve, reject) => {
    try {
      /* Generate new otp for given length */
      const otp = Math.floor(
        Math.pow(10, otpLength - 1) +
          Math.random() *
            (Math.pow(10, otpLength) - Math.pow(10, otpLength - 1) - 1)
      );
      resolve(otp);
    } catch (err) {
      reject(err);
    }
  });
};

/* Destroy otp */
/* Destroy otp */
exports.destroyOtp = async function (userId) {
  console.log("OTP DELETION " + JSON.stringify(userId));
  try {
    var myquery = { userId: userId };
    await UserOtp.deleteOne(myquery);
    console.log("1 document deleted");
    await UserOtp.find({ userId: userId });
    return userId;
  } catch (err) {
    throw err;
  }
};

/** Generate Errors */
/** Generate otp generation error **/
exports.generateOtpGenerationError = function () {
  let err = new Error();
  err.rid = "e-auth-12";
  return err;
};

/** Generate invalid otp error **/
exports.generateInvalidOtpError = function () {
  let err = new Error();
  err.rid = "e-auth-11";
  return err;
};
