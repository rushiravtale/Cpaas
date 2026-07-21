const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const authHelper = require("../helpers/auth.helper");
const userTokenHelper = require("../helpers/user.token.helper");
const otpHelper = require("../helpers/otp.helper");
const userHelper = require("../helpers/user.helper");

const sendResponse = require("../utils/sendResponse");
const { response } = require("express");
var responseJSON = {};

/** Sign In **/
const signin = (req, res) => {
  console.log("req123", req.body);

  /* Map user from User table fetch user roles */
  let whereClause = {
    userName: req.body.userName,
    roleIds: { $in: [req.body.roleIds] },
  };
  userHelper
    .fetchUserWithRolesAndPermissions(whereClause, [])
    .then(async (user) => {
      // console.log("USER: " + JSON.stringify(user));

      /* If user not found, throw error */
      var err = userHelper.generateUserNullError(user);
      if (err) return sendResponse(err, res);

      /* If user password not found, throw error */
      if (!user.password) {
        err.rid = "e-auth-3";
        return sendResponse(err, res);
      }

      /* If user password does not match, throw error */
      err = userHelper.generateUserInvalidPasswordError(
        user,
        req.body.password
      );
      if (err) return sendResponse(err, res);

      /* If user role not found, throw error */
      err = userHelper.generateNoUserRoleError(user);
      if (err) return sendResponse(err, res);

      /* Prepare data for generating token */
      authHelper.prepareDataForNewToken(user._id).then((userDataForToken) => {
        if (!userDataForToken) {
          return sendResponse({ rid: "e-auth-1" }, res);
        }
        let tokenOptions = {
          expiresIn: process.env.JWT_EXPIRES_IN,
        };

        /* Fetch user details with token */
        authHelper
          .getUserByIdWithAuthToken(
            user.id,
            "-password",
            userDataForToken,
            process.env.TOKEN_SECRET,
            tokenOptions
          )
          .then((response) => {
            console.log("response123", response);

            console.log("response: " + JSON.stringify(response));
            responseJSON["rid"] = "s-auth-10";
            responseJSON["data"] = response;
            return sendResponse(responseJSON, res);
          })
          .catch((error) => {
            error.rid = "e-auth-1";
            return sendResponse(error, res);
          });
      });
    })
    .catch((error) => {
      error.rid = "e-auth-1";
      return sendResponse(error, res);
    });
};

/** Generate OTP **/
const generateOtp = async (req, res) => {
  const userIdentifier = req.body.userIdentifier;

  otpHelper
    .generateOtpForUser(userIdentifier)
    .then((user) => {
      console.log("otp");
      responseJSON["rid"] = "s-auth-4";
      responseJSON["data"] = user;
      return sendResponse(responseJSON, res);
    })
    .catch((err) => {
      return sendResponse(err, res);
    });
};

/** Verify OTP **/
const verifyOtp = async (req, res) => {
  const userIdentifier = req.body.userIdentifier;
  const otp = req.body.otp;

  otpHelper
    .verifyOtp(userIdentifier, otp)
    .then((user) => {
      responseJSON["rid"] = "s-auth-5";
      responseJSON["data"] = user;
      return sendResponse(responseJSON, res);
    })
    .catch((err) => {
      return sendResponse(err, res);
    });
};

/** Change Password **/
const changePassword = async (req, res) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  let verifiedToken = res.locals.verifiedToken;
  console.log("RES :" + JSON.stringify(res.locals));
  let userId = res.locals.userId;
  console.log("VERIFIED TOKEN:" + verifiedToken + " USERID: " + userId);
  authHelper
    .changePassword(userId, oldPassword, newPassword)
    .then((user) => {
      console.log("USER:" + JSON.stringify(user));
      responseJSON["rid"] = "s-auth-6";
      responseJSON["data"] = user;
      return sendResponse(responseJSON, res);
    })
    .catch((err) => {
      return sendResponse(err, res);
    });
};

/** Refresh Auth Token **/
const refreshAuthToken = async (req, res) => {
  let userId = res.locals.userId;
  console.log("USERID:" + JSON.stringify(userId));
  authHelper.prepareDataForNewToken(userId).then((userDataForRefreshToken) => {
    let tokenOptions = {
      expiresIn: process.env.JWT_EXPIRES_IN,
    };

    /* Fetch user details with new token */
    authHelper
      .getUserByIdWithAuthToken(
        userId,
        { password: 0 },
        userDataForRefreshToken,
        process.env.TOKEN_SECRET,
        tokenOptions
      )
      .then((response) => {
        responseJSON["rid"] = "s-auth-7";
        responseJSON["data"] = response;
        return sendResponse(responseJSON, res);
      })
      .catch((error) => {
        let err = userTokenHelper.generateTokenGenerationError();
        return sendResponse(err, res);
      });
  });
};

/** Logout **/
const logout = async (req, res) => {
  let userId = res.locals.userId;
  authHelper
    .logout(userId)
    .then((response) => {
      console.log("Logout response: " + JSON.stringify(response));
      responseJSON["rid"] = "s-auth-8";
      responseJSON["data"] = [];
      console.log("responseJSON: " + JSON.stringify(responseJSON));
      return sendResponse(responseJSON, res);
    })
    .catch((error) => {
      console.log("Logout error: " + JSON.stringify(error));
      return sendResponse(error, res);
    });
};

/** Forgot Password **/
const forgotPassword = async (req, res) => {
  const userName = req.body.userName;
  otpHelper
    .generateOtpForUser(userName)
    .then((response) => {
      responseJSON["rid"] = "s-auth-2";
      responseJSON["data"] = response;
      return sendResponse(responseJSON, res);
    })
    .catch((err) => {
      return sendResponse(err, res);
    });
};

/** Reset Password **/
const resetPassword = async (req, res) => {
  let userName = req.body.userName;
  let otp = req.body.otp; // Need to remove otp in production
  let newPassword = req.body.newPassword;

  authHelper
    .resetPassword(userName, otp, newPassword)
    .then((response) => {
      responseJSON["rid"] = "s-auth-3";
      responseJSON["data"] = response;
      return sendResponse(responseJSON, res);
    })
    .catch((error) => {
      return sendResponse(error, res);
    });
};

module.exports = {
  resetPassword,
  signin,
  forgotPassword,
  logout,
  refreshAuthToken,
  changePassword,
  verifyOtp,
  generateOtp,
};
