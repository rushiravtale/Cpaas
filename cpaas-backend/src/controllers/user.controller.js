const User = require("../schemas/user.schema");
const Roles = require("../schemas/mst_roles.schema");
var bcrypt = require("bcryptjs");
let responseJSON = {};
const sendResponse = require("../utils/sendResponse");
const {
  createUserValidation,
  updateUserValidation,
} = require("../helpers/joi.helper");
const { nullCheck, safeDecode } = require("../helpers/commonFunction.helper");

/** Create new user **/
// exports.createUser = async (req, res) => {
//   console.log("req",req);

//   try {
//     /* Create user */
//     User.create(
//       {
//         userName: req.body.userName,
//         password: bcrypt.hashSync(req.body.password, 8),
//         status: 1,

//       },
//       (err, user) => {
//         /* If user not created, throw error */
//         if (err) {
//           console.log(err);
//           err.rid = "e-auth-1";
//           return sendResponse(err, res);
//         }
//         /* Assign user roles */
//         let userRoles = req.body.roles;
//         if (userRoles) {
//           for (let index = 0; index < userRoles.length; index++) {
//             const userRoleId = userRoles[index];

//             const query = { userName: req.body.userName };
//             const updateDocument = {
//               $push: { roleId: userRoleId },
//             };
//             User.updateOne(query, updateDocument).then((newUserRole) => {
//               responseJSON["rid"] = "s-auth-1";
//               responseJSON["data"] = user;
//               return sendResponse(responseJSON, res);
//             });
//           }
//         } else {
//           let err = new Error();
//           err.rid = "e-auth-1";
//           return sendResponse(err, res);
//         }
//       }
//     );
//   } catch (err) {
//     //If any issues with try,catch
//     console.log(err);
//     err.rid = "e-auth-1";
//     return sendResponse(err, res);
//   }
// };

const createUser = async (req, res) => {
  try {
    const { name, userName, password, email, phoneNo, roleIds, tradeId } =
      req.body;

    const userId = res.locals;
    console.log("req.user", userId);

    const { error } = createUserValidation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((d) => d.message),
      });
    }

    const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
    console.log("existingUser", existingUser);

    const roleById = await Roles.findById({ _id: roleIds[0] });
    console.log("userById", roleById);

    // Only "Instructor" can assign tradeId
    if (tradeId?.length > 0 && roleById?.name == "Commander") {
      responseJSON["rid"] = "e-users-1";

      return sendResponse(responseJSON, res);
    }

    if (existingUser) {
      if (existingUser.userName === userName) responseJSON["rid"] = "e-users-3";
      else if (existingUser.email === email) responseJSON["rid"] = "e-users-5";

      return sendResponse(responseJSON, res);
    }

    // if (userId) {
    //   return res
    //     .status(401)
    //     .json({ message: "Unauthorized: Admin ID missing" });
    // }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const userData = {
      name,
      userName,
      password: hashedPassword,
      email,
      phoneNo,
      roleIds,
      tradeId,
      // createdBy: userId,
    };

    const newUser = await User.create(userData);
    const user = await User.findById(newUser._id).select("-permission");

    responseJSON["rid"] = "s-auth-1";
    responseJSON["data"] = user;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.error("Error creating user:", err);
    err.rid = "e-auth-1";
    return sendResponse(err, res);
  }
};

// const getAllUsers = async (req, res) => {
//   try {
//     const { page = 1, limit = 10 } = req.query;

//     const options = {
//       page: parseInt(page),
//       limit: parseInt(limit),
//       sort: { createdAt: -1 },

//       populate: "tradeId", // if you have refs
//       populate: "roleIds",
//     };
//     const result = await User.paginate({}, options);
//     const responseData = {
//       data: result.docs,
//       totalDocs: result.totalDocs,
//       totalPages: result.totalPages,
//       currentPage: result.page,
//       hasNextPage: result.hasNextPage,
//     };
//     // const getAllUser = await User.find();

//     responseJSON["rid"] = "s-users-1";
//     responseJSON["data"] = responseData;
//     return sendResponse(responseJSON, res);
//   } catch (err) {
//     console.log("err", err);

//     err.rid = "e-users-4";
//     return sendResponse({ rid: "e-users-4", data: err.message }, res);
//   }
// };

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, text } = req.query;

    let query = {};

    if (text?.trim().length >= 3) {
      console.log("text", text);

      const search = safeDecode(text?.trim());
console.log("search",search);

      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { userName: { $regex: search, $options: "i" } },
      ];
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: ["tradeId", "roleIds"], // ✅ populate multiple refs
    };
    console.log("query", query);

    // ✅ Fetch paginated users
    const result = await User.paginate(query, options);
    console.log("result", result);

    // ✅ Structure response
    const responseData = {
      data: result.docs,
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
      currentPage: result.page,
      hasNextPage: result.hasNextPage,
    };

    // ✅ Define responseJSON before using it
    const responseJSON = {
      rid: "s-users-1",
      data: responseData,
    };

    return sendResponse(responseJSON, res);
  } catch (err) {
    console.error("Error in getAllUsers:", err);

    err.rid = "e-users-4";
    return sendResponse(err, res);
  }
};

const updateUser = async (req, res) => {
  console.log("req", res.locals);

  const loggedUser = res.locals;

  try {
    const {
      name,
      userName,
      password,
      email,
      phoneNo,
      roleIds,
      tradeId,
      userId,
    } = req.body;

    const { error } = updateUserValidation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((d) => d.message),
      });
    }

    const existingUser = await User.findOne({
      $or: [{ userName }, { email }],
      _id: { $ne: userId },
    });
    console.log("existingUser", existingUser);

    console.log("userById", roleIds);
    const roleById = await Roles.findById({ _id: roleIds[0] });

    // Only "Instructor" can assign tradeId
    if (tradeId?.length > 0 && roleById?.name == "Commander") {
      responseJSON["rid"] = "e-users-1";

      return sendResponse(responseJSON, res);
    }

    if (existingUser) {
      if (existingUser.userName === userName) responseJSON["rid"] = "e-users-3";
      else if (existingUser.email === email) responseJSON["rid"] = "e-users-5";

      return sendResponse(responseJSON, res);
    }

    const userData = {
      name,
      userName,

      email,
      phoneNo,
      roleIds,
      tradeId,
      // createdBy: userId,
    };

    if (password) {
      const hashedPassword = bcrypt.hashSync(password, 8);
      userData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId, // userId from token
      { $set: userData }, // update fields from request body
      { new: true } // return updated user
    ).select("-permission");

    if (!updatedUser) {
      responseJSON["rid"] = "e-users-2";

      return sendResponse(responseJSON, res);
    }

    responseJSON["rid"] = "s-users-2";
    responseJSON["data"] = updatedUser;
    return sendResponse(responseJSON, res);
  } catch (err) {
    err.rid = "e-users-4";
    return sendResponse({ rid: "e-users-4", data: err.message }, res);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate(["tradeId", "roleIds"]);
    if (!user) {
      responseJSON["rid"] = "e-users-2";

      return sendResponse(responseJSON, res);
    }
    console.log("user", user);

    responseJSON["rid"] = "s-users-1";
    responseJSON["data"] = user;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.error("Error deleting user:", err);
    err.rid = "e-users-4";
    return sendResponse({ rid: "e-users-4", data: err.message }, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(" req.params", req.params);

    const user = await User.findById(id);
    if (!user) {
      responseJSON["rid"] = "e-users-2";

      return sendResponse(responseJSON, res);
    }

    await User.deleteOne({ _id: id });

    responseJSON["rid"] = "s-users-3";
    responseJSON["data"] = null;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.error("Error deleting user:", err);
    err.rid = "e-users-4";
    return sendResponse({ rid: "e-users-4", data: err.message }, res);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
};
