// import React, { useEffect, useMemo, useState } from "react";
// import { useParams, useHistory, useLocation } from "react-router-dom";
// import Form from "../../../common/form/form";
// import "./addAndEditSystemUserStyles.scss";

// const AddAndEditSystemUser = ({
//   selectedUser,
//   getSystemUserById,
//   addSystemUser,
//   updateSystemUser,
//   trades,
//   roles,
//   loginUser,
// }) => {
//   const { id: userId } = useParams();
//   const history = useHistory();
//   const location = useLocation();

//   const isEditMode = location.pathname.includes("/edit/");
//   const [formTitle] = useState(isEditMode ? "Edit User" : "Add User");
//   const [formData, setFormData] = useState({
//     name: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//     email: "",
//     phone: "",
//     role: "",
//     trade: "",
//   });

//   const loggedInRoleLabel = useMemo(
//     () => loginUser?.roleIds?.[0]?.label || loginUser?.roleIds?.[0]?.name || "",
//     [loginUser]
//   );

//   const isLoggedInInstructor = loggedInRoleLabel === "Instructor";
//   const isLoggedInCommander = loggedInRoleLabel === "Commander";

//   useEffect(() => {
//     if (isEditMode && userId) {
//       getSystemUserById(userId);
//     } else {
//       setFormData({
//         name: "",
//         username: "",
//         password: "",
//         confirmPassword: "",
//         email: "",
//         phone: "",
//         role: "",
//         trade: "",
//       });
//     }
//   }, [isEditMode, userId, getSystemUserById]);

//   useEffect(() => {
//     if (isEditMode && selectedUser) {
//       const getOption = (arr, key) =>
//         arr?.[0]
//           ? {
//               value: arr[0]._id || arr[0].id,
//               label: arr[0].label || arr[0].name,
//             }
//           : "";

//       setFormData({
//         name: selectedUser.name || "",
//         username: selectedUser.userName || "",
//         email: selectedUser.email || "",
//         phone: selectedUser.phoneNo || "",
//         role: getOption(selectedUser.roleIds),
//         trade: getOption(selectedUser.tradeId),
//         password: "",
//         confirmPassword: "",
//       });
//     }
//   }, [selectedUser, isEditMode]);

//   const roleOptions = useMemo(
//     () =>
//       roles?.map((r) => ({
//         label: r.label || r.name,
//         value: r._id,
//         isDisabled: isLoggedInInstructor && (r.label || r.name) === "Commander",
//       })) || [],
//     [roles, isLoggedInInstructor]
//   );

//   const tradeOptions = useMemo(
//     () =>
//       trades?.map((t) => ({ label: t.label, value: t._id })) || [],
//     [trades]
//   );

//   const isTradeDisabled = useMemo(() => {
//     if (isLoggedInCommander) return true;
//     if (isLoggedInInstructor) {
//       return formData.role?.label !== "Instructor" && formData.role !== "";
//     }
//     return false;
//   }, [isLoggedInCommander, isLoggedInInstructor, formData.role]);

//   const handleChange = (name, value) => {
//     setFormData((prev) => {
//       const updated = { ...prev, [name]: value };
//       if (name === "role" && value?.label === "Commander") {
//         updated.trade = "";
//       }
//       return updated;
//     });
//   };

//   const getId = (opt) => (opt && typeof opt === "object" ? opt.value : opt || null);

//   const constructPayload = () => {
//     const payload = {
//       userName: formData.username,
//       name: formData.name,
//       password: formData.password,
//       phoneNo: formData.phone,
//       email: formData.email,
//       roleIds: formData.role ? [getId(formData.role)] : [],
//     };

//     if (
//       isLoggedInInstructor &&
//       formData.role?.label === "Instructor" &&
//       formData.trade
//     ) {
//       payload.tradeId = [getId(formData.trade)];
//     }

//     return payload;
//   };

//   const handleSubmit = () => {
//     const payload = constructPayload();
//     if (isEditMode && userId) {
//       updateSystemUser({ ...payload, id: userId });
//     } else {
//       addSystemUser(payload);
//     }
//     history.push("/system-users");
//   };

//   const fields = [
//     {
//       label: "Name",
//       name: "name",
//       type: "text",
//       styles: "input-container",
//       validate: true,
//     },
//     {
//       label: "Username",
//       name: "username",
//       type: "text",
//       styles: "input-container",
//       validate: true,
//     },
//     {
//       label: "Password",
//       name: "password",
//       type: "password",
//       styles: "input-container",
//       validate: !isEditMode,
//     },
//     {
//       label: "Confirm Password",
//       name: "confirmPassword",
//       type: "password",
//       styles: "input-container",
//       validate: !isEditMode,
//     },
//     {
//       label: "Email Address",
//       name: "email",
//       type: "text",
//       styles: "input-container",
//       validate: true,
//     },
//     {
//       label: "Phone Number",
//       name: "phone",
//       type: "text",
//       styles: "input-container",
//       validate: true,
//     },
//     {
//       label: "Role",
//       name: "role",
//       type: "select",
//       styles: "input-container",
//       options: roleOptions,
//       validate: true,
//     },
//     {
//       label: "Trade",
//       name: "trade",
//       type: "select",
//       styles: "input-container",
//       options: tradeOptions,
//       isDisabled: isTradeDisabled,
//       validate: !isLoggedInCommander && !isTradeDisabled,
//     },
//   ];

//   return (
//     <div className="add-edit-user-wrapper">
//       <Form
//         title={formTitle}
//         fields={fields}
//         formData={formData}
//         onChange={handleChange}
//         onSubmit={handleSubmit}
//       />
//     </div>
//   );
// };

// export default AddAndEditSystemUser;



import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import Form from "../../../common/form/form";
import "./addAndEditSystemUserStyles.scss";

import {
  getLoggedInUserRole,
  isLoggedInCommander,
  isLoggedInInstructor,
} from "../../../../helpers/authLookUp";
import { getRoleName } from "../../../../helpers/masterLookup";

const AddAndEditSystemUser = ({
  selectedUser,
  getSystemUserById,
  addSystemUser,
  updateSystemUser,
  trades,
  roles,
}) => {
  const { id: userId } = useParams();
  const history = useHistory();
  const location = useLocation();

  const isEditMode = location.pathname.includes("/edit/");
  const [formTitle] = useState(isEditMode ? "Edit User" : "Add User");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    role: "",
    trade: "",
  });

  const loggedInRoleLabel = getLoggedInUserRole();
  const isCommander = isLoggedInCommander();
  const isInstructor = isLoggedInInstructor();

  useEffect(() => {
    if (isEditMode && userId) {
      getSystemUserById(userId);
    } else {
      setFormData({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        phone: "",
        role: "",
        trade: "",
      });
    }
  }, [isEditMode, userId, getSystemUserById]);

  useEffect(() => {
    if (isEditMode && selectedUser) {
      setFormData({
        name: selectedUser.name || "",
        username: selectedUser.userName || "",
        email: selectedUser.email || "",
        phone: selectedUser.phoneNo || "",

        role:
          selectedUser.roleIds?.[0]?._id ||
          selectedUser.roleIds?.[0]?.id ||
          null,

        trade:
          selectedUser.tradeId?.[0]?._id ||
          selectedUser.tradeId?.[0]?.id ||
          null,

        password: "",
        confirmPassword: "",
      });
    }
  }, [selectedUser, isEditMode]);

  const roleOptions =
    roles?.map((r) => ({
      label: r.label || r.name,
      value: r._id,
      isDisabled: isInstructor && (r.label || r.name) === "Commander",
    })) || [];

  const isTradeDisabled = getRoleName(formData.role) === "Commander";


  const tradeOptions =
    trades?.map((t) => ({
      label: t.label,
      value: t._id,
      isDisabled: isTradeDisabled,
    })) || [];

  const handleChange = (name, value) => {
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "role" && getRoleName(value) === "Commander") {
        updated.trade = null;
      }

      return updated;
    });
  };

  const getId = (opt) =>
    opt && typeof opt === "object" ? opt.value : opt || null;

  const constructPayload = () => {
    const payload = {
      userName: formData.username,
      name: formData.name,
      password: formData.password,
      phoneNo: formData.phone,
      email: formData.email,
      roleIds: formData.role ? [getId(formData.role)] : [],
    };

    if (getRoleName(formData.role) === "Instructor" && formData.trade) {
      payload.tradeId = [formData.trade];
    }

    if (getRoleName(formData.role) === "Commander") {
      payload.tradeId = [];
    }

    return payload;
  };

  // const handleSubmit = () => {
  //   const payload = constructPayload();
  //   if (isEditMode && userId) {
  //     updateSystemUser({ ...payload, id: userId });
  //   } else {
  //     addSystemUser(payload);
  //   }
  // };

  const handleSubmit = () => {
  const payload = constructPayload();

  if (isEditMode && userId) {
    updateSystemUser({ ...payload, id: userId });
  } else {
   addSystemUser(payload, () => {
      setFormData({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        phone: "",
        role: "",
        trade: "",
      });
   })
  }
};


  const fields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      styles: "input-container",
      validate: true,
    },
    {
      label: "Username",
      name: "username",
      type: "text",
      styles: "input-container",
      validate: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      styles: "input-container",
      validate: !isEditMode,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      styles: "input-container",
      validate: !isEditMode,
    },
    {
      label: "Email Address",
      name: "email",
      type: "text",
      styles: "input-container",
      validate: true,
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "text",
      styles: "input-container",
      validate: true,
      maxLength: 10, 
      inputMode: "numeric"
    },
    {
      label: "Role",
      name: "role",
      type: "checkbox-single",
      options: roleOptions,
      validate: true,
    },
  {
  label: "Trade",
  name: "trade",
  type: "checkbox-single",
  options: tradeOptions,
  disableAll: isTradeDisabled,
  validate: getRoleName(formData.role) === "Instructor",
},

  ];

  return (
    <div className="add-edit-user-wrapper">
      <Form
        title={formTitle}
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddAndEditSystemUser;
