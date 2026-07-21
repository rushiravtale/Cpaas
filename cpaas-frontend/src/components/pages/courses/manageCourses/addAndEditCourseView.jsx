// // addAndEditCourseView.js

// import React, { useEffect, useMemo, useState } from "react";
// import Form from "../../../common/form/form";
// import { useParams } from "react-router-dom";
// import "./addAndEditCourseStyles.scss";
// import {
//   isLoggedInCommander,
//   isLoggedInInstructor,
//   getLoggedInUserTrades,
// } from "../../../../helpers/authLookUp";

// const AddAndEditCourseView = ({
//   selectedCourse,
//   getCourseById,
//   addCourse,
//   updateCourse,
//   fetchUserTrades,
//   trades,
//   modeFlag, 
// }) => {
//   const { id } = useParams();
//   const isEditMode = modeFlag === "edit";

//   const [formData, setFormData] = useState({
//     name: "",
//     tradeId: null,
//     startDate: "",
//     endDate: "",
//   });

//   // Reset when switching to Add mode
//   useEffect(() => {
//     if (!isEditMode) {
//       setFormData({
//         name: "",
//         tradeId: null,
//         startDate: "",
//         endDate: "",
//       });
//     }
//   }, [isEditMode]);

//   const isCommander = isLoggedInCommander();
//   const isInstructor = isLoggedInInstructor();

//   console.log("is instrictor ",isInstructor)
//   const instructorTradeIds = getLoggedInUserTrades() || [];
//   console.log("is instrictor ",isInstructor,instructorTradeIds)


//   useEffect(() => {
//     fetchUserTrades();
//     if (isEditMode) getCourseById(id);
//   }, [id, isEditMode]);

//   useEffect(() => {
//     if (selectedCourse && trades?.length && isEditMode) {
//       const normalizeExistingTrades = () => {
//         if (!selectedCourse.tradeId?.length) return [];

//         return selectedCourse.tradeId
//           .map((t) => {
//             const match = trades.find(
//               (x) => x._id === t.id || x._id === t._id || x.id === t.id
//             );
//             return match
//               ? { label: match.label || match.name, value: match._id || match.id }
//               : null;
//           })
//           .filter(Boolean);
//       };

//       setFormData({
//         name: selectedCourse.name || "",
//         tradeId: normalizeExistingTrades(),
//         startDate: selectedCourse.startDate
//           ? selectedCourse.startDate.substring(0, 10)
//           : "",
//         endDate: selectedCourse.endDate
//           ? selectedCourse.endDate.substring(0, 10)
//           : "",
//       });
//     }
//   }, [selectedCourse, trades, isEditMode]);

//   const tradeOptions = useMemo(() => {
//     if (!trades) return [];

//     if (isCommander) {
//       return trades.map((t) => ({
//         label: t.label || t.name,
//         value: t._id || t.id,
//       }));
//     }

//     if (isInstructor) {
//       return trades
//         .filter((t) => instructorTradeIds.includes(t._id || t.id))
//         .map((t) => ({
//           label: t.label || t.name,
//           value: t._id || t.id,
//         }));
//     }

//     return [];
//   }, [trades, isCommander, isInstructor, instructorTradeIds]);

//   const handleSubmit = () => {
//     const normalizedTradeIds = Array.isArray(formData.tradeId)
//       ? formData.tradeId
//       : formData.tradeId
//       ? [formData.tradeId]
//       : [];

//     const payload = {
//       courseName: formData.name,
//       startDate: formData.startDate,
//       endDate: formData.endDate,
//       tradeId: normalizedTradeIds.map((t) => t.value),
//     };

//     if (isEditMode) updateCourse({ ...payload, id });
//     else addCourse(payload);
//   };

//   const fields = [
//     { label: "Course Name", name: "name", type: "text", validate: true },
//     {
//       label: "Trade",
//       name: "tradeId",
//       type: "select",
//       options: tradeOptions,
//       validate: true,
//     },
//     { label: "Start Date", name: "startDate", type: "date", validate: true },
//     { label: "End Date", name: "endDate", type: "date", validate: true },
//   ];

//   return (
//     <div className="add-edit-course-wrapper">
//       <Form
//         title={isEditMode ? "Edit Course" : "Add Course"}
//         fields={fields}
//         formData={formData}
//         onChange={(name, value) => setFormData({ ...formData, [name]: value })}
//         onSubmit={handleSubmit}
//       />
//     </div>
//   );
// };

// export default AddAndEditCourseView;


// addAndEditCourseView.js


// import React, { useEffect, useState } from "react";
// import Form from "../../../common/form/form";
// import { useParams } from "react-router-dom";
// import "./addAndEditCourseStyles.scss";
// import {
//   isLoggedInCommander,
//   isLoggedInInstructor,
//   getLoggedInUserTrades,
// } from "../../../../helpers/authLookUp";

// const AddAndEditCourseView = ({
//   selectedCourse,
//   getCourseById,
//   addCourse,
//   updateCourse,
//   fetchUserTrades,
//   trades,
//   modeFlag,
// }) => {
//   const { id } = useParams();
//   const isEditMode = modeFlag === "edit";

//   const [formData, setFormData] = useState({
//     name: "",
//     tradeId: null,
//     startDate: "",
//     endDate: "",
//   });

//   useEffect(() => {
//     if (!isEditMode) {
//       setFormData({
//         name: "",
//         tradeId: null,
//         startDate: "",
//         endDate: "",
//       });
//     }
//   }, [isEditMode]);

//   const isCommander = isLoggedInCommander();
//   const isInstructor = isLoggedInInstructor();
//   const instructorTradeIds = getLoggedInUserTrades() || [];





//   useEffect(() => {
//     fetchUserTrades();
//     if (isEditMode) getCourseById(id);
//   }, [id, isEditMode]);

//   // useEffect(() => {
//   //   if (selectedCourse && trades?.length && isEditMode) {
//   //     const normalizeExistingTrades = () => {
//   //       if (!selectedCourse.tradeId?.length) return [];

//   //       return selectedCourse.tradeId
//   //         .map((t) => {
//   //           const match = trades.find(
//   //             (x) => x._id === t.id || x._id === t._id || x.id === t.id
//   //           );
//   //           return match
//   //             ? { label: match.label || match.name, value: match._id || match.id }
//   //             : null;
//   //         })
//   //         .filter(Boolean);
//   //     };

//   //     setFormData({
//   //       name: selectedCourse.name || "",
//   //       tradeId: normalizeExistingTrades(),
//   //       startDate: selectedCourse.startDate
//   //         ? selectedCourse.startDate.substring(0, 10)
//   //         : "",
//   //       endDate: selectedCourse.endDate
//   //         ? selectedCourse.endDate.substring(0, 10)
//   //         : "",
//   //     });
//   //   }
//   // }, [selectedCourse, trades, isEditMode]);

//   useEffect(() => {
//   if (selectedCourse && trades?.length && isEditMode) {
//     const normalizeTrade = () => {
//       if (!Array.isArray(selectedCourse.tradeId) || selectedCourse.tradeId.length === 0)
//         return null;

//       const t = selectedCourse.tradeId[0]; 

//       const match = trades.find(
//         (x) => x._id === t.id || x._id === t._id || x.id === t.id
//       );

//       return match ? (match._id || match.id) : null;
//     };

//     setFormData({
//       name: selectedCourse.name || "",
//       tradeId: normalizeTrade(),
//       startDate: selectedCourse.startDate?.substring(0, 10) || "",
//       endDate: selectedCourse.endDate?.substring(0, 10) || "",
//     });
//   }
// }, [selectedCourse, trades, isEditMode]);


// let tradeOptions = [];

// if (trades && trades.length) {

//   const normalizedInstructorIds = instructorTradeIds.map(
//     (t) => String(t._id || t.id)
//   );


//   if (isCommander) {
//     tradeOptions = trades.map((t) => ({
//       label: t.label || t.name,
//       value: t._id || t.id,
//     }));
//   } 
//   else if (isInstructor) {
//     tradeOptions = trades
//       .filter((t) =>
//         normalizedInstructorIds.includes(String(t._id || t.id))
//       )
//       .map((t) => ({
//         label: t.label || t.name,
//         value: t._id || t.id,
//       }));
//   }
// }




//   const handleSubmit = () => {
//    const normalizedTradeIds = Array.isArray(formData.tradeId)
//   ? formData.tradeId
//   : formData.tradeId
//   ? [formData.tradeId]
//   : [];


// const payload = {
//   courseName: formData.name,
//   startDate: formData.startDate,
//   endDate: formData.endDate,
//   tradeId: normalizedTradeIds,
// };


//     if (isEditMode) updateCourse({ ...payload, id });
//     else addCourse(payload);
//   };

//   const fields = [
//     { label: "Course Name", name: "name", type: "text", validate: true },
//     {
//   label: "Trade",
//   name: "tradeId",
//   type: "checkbox-single",
//   options: tradeOptions,
//   validate: true,
// },

//     { label: "Start Date", name: "startDate", type: "date", validate: true },
//     { label: "End Date", name: "endDate", type: "date", validate: true },
//   ];

//   return (
//     <div className="add-edit-course-wrapper">
//       <Form
//         title={isEditMode ? "Edit Course" : "Add Course"}
//         fields={fields}
//         formData={formData}
//         onChange={(name, value) => setFormData({ ...formData, [name]: value })}
//         onSubmit={handleSubmit}
//       />
//     </div>
//   );
// };

// export default AddAndEditCourseView;




import React, { useEffect, useState } from "react";
import Form from "../../../common/form/form";
import { useParams } from "react-router-dom";
import "./addAndEditCourseStyles.scss";
import {
  isLoggedInCommander,
  isLoggedInInstructor,
  getLoggedInUserTrades,
} from "../../../../helpers/authLookUp";


const AddAndEditCourseView = ({
  selectedCourse,
  getCourseById,
  addCourse,
  updateCourse,
  fetchUserTrades,
  trades,
  modeFlag,
}) => {
  const { id } = useParams();
  const isEditMode = modeFlag === "edit";


  const [formData, setFormData] = useState({
    name: "",
    tradeId: null,
    startDate: "",
    endDate: "",
  });


  useEffect(() => {
    if (!isEditMode) {
      setFormData({
        name: "",
        tradeId: null,
        startDate: "",
        endDate: "",
      });
    }
  }, [isEditMode]);


  const isCommander = isLoggedInCommander();
  const isInstructor = isLoggedInInstructor();
  const instructorTradeIds = getLoggedInUserTrades() || [];


  useEffect(() => {
    fetchUserTrades();
    if (isEditMode) getCourseById(id);
  }, [id, isEditMode]);


  useEffect(() => {
    if (selectedCourse && trades?.length && isEditMode) {
      const normalizeTrade = () => {
        if (!Array.isArray(selectedCourse.tradeId) || selectedCourse.tradeId.length === 0)
          return null;


        const t = selectedCourse.tradeId[0];


        const match = trades.find(
          (x) => x._id === t.id || x._id === t._id || x.id === t.id
        );


        return match ? (match._id || match.id) : null;
      };


      setFormData({
        name: selectedCourse.name || "",
        tradeId: normalizeTrade(),
        startDate: selectedCourse.startDate?.substring(0, 10) || "",
        endDate: selectedCourse.endDate?.substring(0, 10) || "",
      });
    }
  }, [selectedCourse, trades, isEditMode]);


  let tradeOptions = [];


  if (trades && trades.length) {
    const normalizedInstructorIds = instructorTradeIds.map(
      (t) => String(t._id || t.id)
    );


    if (isCommander) {
      tradeOptions = trades.map((t) => ({
        label: t.label || t.name,
        value: t._id || t.id,
      }));
    } else if (isInstructor) {
      tradeOptions = trades
        .filter((t) =>
          normalizedInstructorIds.includes(String(t._id || t.id))
        )
        .map((t) => ({
          label: t.label || t.name,
          value: t._id || t.id,
        }));
    }
  }


  const handleSubmit = () => {
    const normalizedTradeIds = Array.isArray(formData.tradeId)
      ? formData.tradeId
      : formData.tradeId
      ? [formData.tradeId]
      : [];


    if (isEditMode) {
      const payload = {
        id,
        name: formData.name,
        tradeId: normalizedTradeIds,
        startDate: formData.startDate,
        endDate: formData.endDate,
      };
      updateCourse(payload);
    } else {
      const payload = {
        courseName: formData.name,
        tradeId: normalizedTradeIds,
        startDate: formData.startDate,
        endDate: formData.endDate,
      };
      addCourse(payload,()=>
      {
          setFormData({
        name: "",
        tradeId: null,
        startDate: "",
        endDate: "",
      });

      });


      // setFormData({
      //   name: "",
      //   tradeId: null,
      //   startDate: "",
      //   endDate: "",
      // });
    }
  };


  const fields = [
    { label: "Course Name", name: "name", type: "text", validate: true },
    {
      label: "Trade",
      name: "tradeId",
      type: "checkbox-single",
      options: tradeOptions,
      validate: true,
    },
    { label: "Start Date", name: "startDate", type: "date", validate: true },
    { label: "End Date", name: "endDate", type: "date", validate: true },
  ];


  return (
    <div className="add-edit-course-wrapper">
      <Form
        title={isEditMode ? "Edit Course" : "Add Course"}
        fields={fields}
        formData={formData}
        onChange={(name, value) => setFormData({ ...formData, [name]: value })}
        onSubmit={handleSubmit}
      />
    </div>
  );
};


export default AddAndEditCourseView;


