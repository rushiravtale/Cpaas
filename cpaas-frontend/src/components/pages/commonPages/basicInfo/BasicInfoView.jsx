// import React, { useState, useEffect } from "react";
// import "./basicInfoViewStyles.scss";
// import Form from "../../../common/form/form";

// const BasicInfoView = ({ mode, initialData, loading, onSubmit }) => {
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     setFormData(initialData || {});
//   }, [initialData]);

//   const handleChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     onSubmit(formData);
//   };

// const fields = [
//   { label: "Name", name: "name", type: "text", required: true, validate: true, styles: "input-container" },

//   { label: "Army Number", name: "armyNo", type: "text", required: true, validate: true, styles: "input-container" },

//   { label: "Rank", name: "rank", type: "text", required: true, validate: true, styles: "input-container" },

//   { label: "Trade", name: "trade", type: "text", disabled: mode === "edit", validate: true, styles: "input-container" },

//   { label: "Squad Number", name: "squadNo", type: "text", validate: true, styles: "input-container" },

//   { label: "Civil Education", name: "civilEdn", type: "text", validate: true, styles: "input-container" },

//   { label: "Any Other Qualification", name: "qualification", type: "text", validate: true, styles: "input-container" },

//   { label: "Father's Name", name: "fatherName", type: "text", validate: true, styles: "input-container" },

//   { label: "Contact No.", name: "contactNo", type: "text", validate: true, styles: "input-container" },

//   { label: "Address", name: "address", type: "text", validate: true, styles: "input-container" },

//   { label: "Course", name: "course", type: "text", disabled: mode === "edit", validate: true, styles: "input-container" },
// ];

//   return (
//     <div className="basic-info-wrapper">
//       <Form
//         title={mode === "add" ? "Basic Info" : "Basic Info"}
//         fields={fields}
//         formData={formData}
//         onChange={handleChange}
//         onSubmit={handleSubmit}
//         loading={loading}
//         submitButtonText="Save"
//       />
//     </div>
//   );
// };

// export default BasicInfoView;

// import React, { useState, useEffect } from "react";
// import "./basicInfoViewStyles.scss";
// import Form from "../../../common/form/form";

// const BasicInfoView = ({ mode, initialData, loading, onSubmit }) => {
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     setFormData(initialData || {});
//   }, [initialData]);

//   const handleChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     onSubmit(formData);
//   };

//   const fields = [
//     {
//       label: "Name",
//       name: "name",
//       type: "text",
//       required: true,
//       validate: true,
//       styles: "input-container",
//     },

//     {
//       label: "Army Number",
//       name: "armyNo",
//       type: "text",
//       required: true,
//       validate: true,
//       styles: "input-container",
//     },

//     {
//       label: "Rank",
//       name: "rank",
//       type: "text",
//       required: true,
//       validate: true,
//       styles: "input-container",
//     },

//     {
//       label: "Trade",
//       name: "trade",
//       type: "text",
//       disabled: mode === "edit",
//       validate: true,
//       styles: "input-container",
//     },

//     {
//       label: "Squad Number",
//       name: "squadNo",
//       type: "text",
//       validate: true,
//       styles: "input-container",
//     },

//     {
//       label: "Civil Edn",
//       name: "civilEdn",
//       type: "text",
//       validate: true,
//       styles: "input-container",
//     },

//     {
//       label: "Any Other Qualification",
//       name: "qualification",
//       type: "text",
//       validate: true,
//       styles: "input-container",
//     },

//     {
//       label: "Father's Name",
//       name: "fatherName",
//       type: "text",
//       validate: true,
//       styles: "input-container",
//     },

//     {
//       label: "Contact No.",
//       name: "contactNo",
//       type: "text",
//       validate: true,
//       styles: "input-container",
//     },

//     {
//       label: "Address",
//       name: "address",
//       type: "text",
//       validate: true,
//       styles: "input-container",
//     },

//     {
//       label: "Course",
//       name: "course",
//       type: "text",
//       disabled: mode === "edit",
//       validate: true,
//       styles: "input-container",
//     },
//   ];

//   return (
//     <div className="basic-info-wrapper">
//       <Form
//         title={mode === "add" ? "Basic Info" : "Basic Info"}
//         fields={fields}
//         formData={formData}
//         onChange={handleChange}
//         onSubmit={handleSubmit}
//         loading={loading}
//         submitButtonText="Save"
//       />
//     </div>
//   );
// };

// import React, { useState, useEffect } from "react";
// import "./basicInfoViewStyles.scss";
// import Form from "../../../common/form/form";

// const BasicInfoView = ({ mode, initialData, loading, onSubmit, courseOptions }) => {
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     setFormData(initialData || {});
//   }, [initialData]);

//   const handleChange = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     onSubmit(formData);
//   };

//   const fields = [
//     {
//       label: "Name",
//       name: "name",
//       type: "text",
//       required: true,
//       validate: true,
//       styles: "input-container",
//     },

//     {
//       label: "Army Number",
//       name: "armyNo",
//       type: "text",
//       required: true,
//       validate: true,
//       styles: "input-container",
//     },

//     {
//       label: "Rank",
//       name: "rank",
//       type: "text",
//       required: true,
//       validate: true,
//       styles: "input-container",
//     },

//     {
//       label: "Trade",
//       name: "trade",
//       type: "text",
//       disabled: mode === "edit",
//       validate: true,
//       styles: "input-container",
//     },

//     {
//       label: "Squad Number",
//       name: "squadNo",
//       type: "text",
//       validate: true,
//       styles: "input-container",
//     },

//     {
//       label: "Civil Edn",
//       name: "civilEdn",
//       type: "text",
//       validate: true,
//       styles: "input-container",
//     },

//     {
//       label: "Any Other Qualification",
//       name: "qualification",
//       type: "text",
//       validate: true,
//       styles: "input-container",
//     },

//     {
//       label: "Father's Name",
//       name: "fatherName",
//       type: "text",
//       validate: true,
//       styles: "input-container",
//     },

//     {
//       label: "Contact No.",
//       name: "contactNo",
//       type: "text",
//       validate: true,
//       styles: "input-container",
//     },

//     {
//       label: "Address",
//       name: "address",
//       type: "text",
//       validate: true,
//       styles: "input-container",
//     },

//     {
//       label: "Course",
//       name: "course",
//       type: "select",
//       validate: true,
//       styles: "input-container",
//       options: courseOptions,
//       isDisabled: false,
//     },
//   ];

//   return (
//     <div className="basic-info-wrapper">
//       <Form
//         title={mode === "add" ? "Basic Info" : "Basic Info"}
//         fields={fields}
//         formData={formData}
//         onChange={handleChange}
//         onSubmit={handleSubmit}
//         loading={loading}
//         submitButtonText="Save"
//       />
//     </div>
//   );
// };

// export default BasicInfoView;

import React, { useState, useEffect } from "react";
import "./basicInfoViewStyles.scss";
import Form from "../../../common/form/form";

const BasicInfoView = ({
  mode,
  initialData,
  loading,
  onSubmit,
  courseOptions,
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);

    // if (mode === "add") {
    //   setFormData((prev) => ({
    //     trade: prev.trade || "",
    //     tradeId: prev.tradeId || "",
    //     course: prev.course || null,
    //     courseId: prev.courseId || "",
    //   }));
    // }
  };

  const fields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      required: true,
      validate: true,
      styles: "input-container",
    },
    {
      label: "Army Number",
      name: "armyNo",
      type: "text",
      required: true,
      validate: true,
      styles: "input-container",
    },
    {
      label: "Rank",
      name: "rank",
      type: "text",
      required: true,
      validate: true,
      styles: "input-container",
    },
    {
      label: "Unit",
      name: "unit",
      type: "text",
      required: true,
      validate: true,
      styles: "input-container",
    },
    {
      label: "Trade",
      name: "trade",
      type: "text",
      disabled: true,
      validate: true,
      styles: "input-container",
    },
    {
      label: "Squad Number",
      name: "squadNo",
      type: "text",
      validate: true,
      styles: "input-container",
    },
    {
      label: "Civil Edn",
      name: "civilEdn",
      type: "text",
      validate: true,
      styles: "input-container",
    },
    {
      label: "Any Other Qualification",
      name: "qualification",
      type: "text",
      validate: true,
      styles: "input-container",
    },
    {
      label: "Father's Name",
      name: "fatherName",
      type: "text",
      validate: true,
      styles: "input-container",
    },
    {
      label: "Contact No.",
      name: "contactNo",
      type: "text",
      validate: true,
      styles: "input-container",
      maxLength: 10,
      inputMode: "numeric",
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      validate: true,
      styles: "input-container",
    },
    {
      label: "Course",
      name: "course",
      type: "select",
      validate: true,
      styles: "input-container",
      options: courseOptions,
      isDisabled: false,
    },
  ];

  return (
    <div className="basic-info-wrapper">
      <Form
        title={mode === "add" ? "Basic Info" : "Basic Info"}
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        submitButtonText="Save"
      />
    </div>
  );
};

export default BasicInfoView;
