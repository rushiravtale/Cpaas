const User = require("../schemas/user.schema");
var bcrypt = require("bcryptjs");
const Role = require("../schemas/mst_roles.schema");
const Permission = require("../schemas/mst_permissions.schema");

/** Fetch user with where condition, fields to be excluded in query and with roles and permissions **/
const fetchUserWithRolesAndPermissions = function (
  whereClause,
  fieldsToBeExcluded
) {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne(whereClause)
        .populate(["roleIds", "tradeId", "permission"])
        .select(fieldsToBeExcluded);

      console.log("permisssion", user);
      let permission;
      if (user?.roleIds[0]?.name == "Instructor") {
        permission = await Permission.findOne({
          role: user?.roleIds[0]?.name,
          trade: user?.tradeId[0]?.name?.toLowerCase(),
        });
      } else {
        permission = await Permission.findOne({
          role: user?.roleIds[0]?.name
          
        });
      }
      if (permission) {
        user.permission = [permission._id];
        await user.save();
      }
      user = await User.findOne(whereClause)
        .populate(["roleIds", "tradeId", "permission"])
        .select(fieldsToBeExcluded);
      console.log("permission123", permission);

      resolve(user);
    } catch (err) {
      reject(err);
    }
  });
};

/** Generate Errors */
/** Generate user null error **/
const generateUserNullError = function (user) {
  if (user == null || user == undefined) {
    let err = new Error();
    err.rid = "e-auth-2";
    return err;
  }
  return null;
};

/** Generate invalid password error **/
const generateUserInvalidPasswordError = function (user, password) {
  var passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    let err = new Error();
    err.rid = "e-auth-3";
    return err;
  } else return null;
};

/** Generate no user role error **/
const generateNoUserRoleError = function (user) {
  if (!user.roleIds || user.roleIds.length <= 0) {
    let err = new Error();
    err.rid = "e-auth-4";
    return err;
  } else return null;
};

module.exports = {
  generateNoUserRoleError,
  fetchUserWithRolesAndPermissions,
  generateUserInvalidPasswordError,
  generateUserNullError,
};
