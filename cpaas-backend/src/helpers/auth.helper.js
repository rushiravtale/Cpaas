const User = require("../schemas/user.schema");
var bcrypt = require("bcryptjs");
const userHelper = require("../helpers/user.helper");
const userTokenHelper = require("../helpers/user.token.helper");
const otpHelper = require("../helpers/otp.helper");
const UserOtp = require("../schemas/user_otps.schema");
const UserToken = require("../schemas/user_tokens.schema");

/** Fetch user with ID and generate token **/
exports.getUserByIdWithAuthToken = function (
  userId,
  arrayFieldsToExclude,
  userDataForToken,
  tokenSecret,
  tokenOptions
) {
  return new Promise(async (resolve, reject) => {
    try {
      /* Map user from User table fetch user roles */
      let whereClause = { _id: userId };
   
      let user = await userHelper.fetchUserWithRolesAndPermissions(
        whereClause,
        arrayFieldsToExclude
      );

      /* If user not found, throw error */
      let err = userHelper.generateUserNullError(user);
      if (err) reject(err);

      /* Create new auth and refresh token */
      let userWithToken = await userTokenHelper.createAuthAndRefreshTokenForUser(
        userId,
        userDataForToken,
        tokenSecret,
        tokenOptions
      );

      if (!userWithToken)
        reject(userTokenHelper.generateTokenGenerationError());

      let response = {
        id: user.id,
        accessToken: userWithToken["token"],
        accessTokenExpiryTime: userWithToken["expiryTime"],
        refreshToken: userWithToken["refreshToken"],
        refreshTokenExpiryTime: userWithToken["refreshExpiryTime"],
        data: user,
      };

      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

/** Change Password **/
exports.changePassword = function (userId, oldPassword, newPassword) {
  return new Promise(async (resolve, reject) => {
    try {
      /* Map user from User table */
      let whereClause = { id: userId, status: 1 };
      let fieldsToBeExcluded = "";

      let user = await userHelper.fetchUserWithRolesAndPermissions(
        whereClause,
        fieldsToBeExcluded
      );

      /* If user not found, throw error */
      var err = userHelper.generateUserNullError(user);
      if (err) reject(err);

      this.compareOldInvalidPassword(user.password, oldPassword).then(
        async (isPasswordValid) => {
          /* If old password does not match with one in db */
          if (!isPasswordValid) {
            err = this.generateInvalidOldPasswordError();
            reject(err);
          } else {
            /* Set new password for user */
            const query = { id: user.id };
            const update = {
              $set: { password: bcrypt.hashSync(newPassword, 8) },
            };
            const options = {};
            await User.updateOne(query, update, options);

            let changedPasswordUser = User.findOne(
              { id: user.id },
              { password: 0 }
            );
            resolve(changedPasswordUser);
          }
        }
      );
    } catch (err) {
      console.log(err);
      err["rid"] = "e-auth-7";
      reject(err);
    }
  });
};

/** Prepare data for new token **/
exports.prepareDataForNewToken = function (userId) {
  console.log("prepareDataForNewToken",userId);
  
  return new Promise(async (resolve, reject) => {
    try {
      let userDataForToken;
      /* Fetch user with Roles & Permissions */
      let user = await userHelper.fetchUserWithRolesAndPermissions(
        { _id: userId },
        { password: 0 }
      );

      /* If user not found, throw error */
      let err = userHelper.generateUserNullError(user);
      if (err) reject(err);
      /* If user found prepare data for token generation */
      if (user) {
        userDataForToken = {
          _id: user._id,
          rid: user.roleIds[0].id,
          rname: user.roleIds[0].name,
          status: user.status,
        };
        // console.log("userDataForToken: " + JSON.stringify(userDataForToken));
      }
      resolve(userDataForToken);
    } catch (err) {
      reject(err);
    }
  });
};

/** Prepare data for refresh token **/
exports.prepareDataForRefreshToken = function (userId) {
  return new Promise(async (resolve, reject) => {
    try {
      /* Fetch user with Roles & Permissions */
      let user = await userHelper.fetchUserWithRolesAndPermissions(
        { _id: userId },
        { password: 0 }
      );
      console.log("prepareDataForRefreshToken user :",user )
      /* If user not found, throw error */
      let err = userHelper.generateUserNullError(user);
      if (err) reject(err);

      /* If user found prepare data for token generation */
      if (user) {
        let rid = user.roleIds[0].id;
        let rname = user.roleIds[0].name;
        let userDataForToken = {
          id: user.id,
          rid: rid,
          rname: rname,
          status: user.status,
          type: "refreshToken",
        };
        console.log("prepareDataForRefreshToken: " + JSON.stringify(userDataForToken));
        resolve(userDataForToken);
      }
    } catch (err) {
      reject(err);
    }
  });
};

/** Logout **/
exports.logout = function (userId) {
  return new Promise(async (resolve, reject) => {
    try {
      /* Find if otp exists for user, delete it if it it exists */
      UserOtp.findOne({ userId: userId }).then(async (userWithOtp) => {
        /* Destroy otp */
        otpHelper.destroyOtp(userId);
      });

      /* Find if token exists for user, delete it if it it exists */
      UserToken.findOne({ userId: userId }).then((userWithToken) => {
        /* Destroy token */
        userTokenHelper.destroyToken(userId);
      });
      resolve(userId);
    } catch (err) {
      reject(err);
    }
  });
};

/** Reset Password */
exports.resetPassword = function (userName, otp, newPassword) {
  return new Promise(async (resolve, reject) => {
    try {
      /* Verify otp */
      otpHelper
        .verifyOtp(userName, otp)
        .then(async (response) => {
          const query = { id: response.id };
          const update = {
            $set: { password: bcrypt.hashSync(newPassword, 8) },
          };

          /* If otp is verified, set new password */
          const options = {};
          await User.updateOne(query, update, options);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (err) {
      reject(err);
    }
  });
};

/** Generate Errors */
/** Generate invalid old password error **/
exports.generateInvalidOldPasswordError = function () {
  let err = new Error();
  err.rid = "e-auth-9";
  return err;
};

/** Compare old password error **/
exports.compareOldInvalidPassword = function (userPassword, password) {
  return new Promise(async (resolve, reject) => {
    try {
      var passwordIsValid = bcrypt.compareSync(password, userPassword);
      resolve(passwordIsValid);
    } catch (error) {
      reject(error);
    }
  });
};
