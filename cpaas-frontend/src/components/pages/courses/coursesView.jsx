// // src/containers/course/coursesView.jsx
// import React from "react";
// import CustomDataTable from "../../common/dataTable/dataTable";
// import PopupMenu from "../../common/popupMenu/PopupMenu";
// import ButtonControl from "../../controls/button/ButtonControl";
// import "./coursesStyles.scss";
// import EditIcon from "/assets/svg/edit.svg";
// import DeleteIcon from "/assets/svg/delete.svg";
// import AgniVeerIcon from "/assets/svg/agniVeer.svg";
// import AddIcon from "/assets/svg/AddIcon.svg";

// import moment from 'moment';
// import { getTradeName } from "../../../helpers/masterLookup";
// const CoursesView = ({
//   courses,
//   pagination,
//   onPageChange,
//   onRowsPerPageChange,
//   onDeleteCourse,
// }) => {
//   const columns = [

//     {
//       name: "Course Name",
//       selector: (row) => row.name,
//       sortable: false,
//     },
//     {
//       name: "Start Date",
//       selector: (row) =>  moment(row.startDate).format("DD-MM-YYYY"),
//       sortable: false,
//     },
//     {
//       name: "End Date",
//       selector: (row) =>moment(row.endDate).format("DD-MM-YYYY"),
//       sortable: false,
//     },
// {
//   name: "Trade",
//   selector: (row) => {
//     if (!row.trade) return "-";

//     if (Array.isArray(row.trade)) {
//       return row.trade.map((id) => getTradeName(id) || id).join(", ");
//     }

//     return getTradeName(row.trade) || row.trade;
//   },
//   sortable: false,
// },

//     {
//       name: "Actions",
//       width: "80px",
//       cell: (row) => (
//         <PopupMenu
//           options={[
//             {
//               label: "Edit Course",
//               icon: <img src={EditIcon} alt="edit" className="menu-icon" />,
//               path: `/courses/edit/${row.id}`,
//             },
//             {
//               label: "View All Agniveers",
//               icon: <img src={AgniVeerIcon} alt="edit" className="menu-icon" />,
//               path: `/courses/agniVeers/${row.id}`,
//             },
//             {
//               label: "Delete Course",
//               icon: <img src={DeleteIcon} alt="delete" className="menu-icon" />,
//               action: () => onDeleteCourse(row),
//             },
//           ]}
//         />
//       ),
//     },
//   ];
//   const renderRowsPerPage = () => (
//     <select
//       value={pagination.limit}
//       onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
//     >
//       {[5, 10, 25, 50].map((n) => (
//         <option key={n} value={n}>
//           {n}
//         </option>
//       ))}
//     </select>
//   );
//   return (
//     <div className="course-wrapper">
//       <div className="course-header">
//         <ButtonControl
//           text="Add Course"
//           icon={<img src={AddIcon} alt="add" className="btn-icon" />}
//           to="/courses/add"
//           styles="course-add-btn"
//         />
//       </div>
//       <CustomDataTable
//         title=""
//         columns={columns}
//         data={courses || []}
//         paginationPerPage={pagination.limit}
//         paginationTotalRows={pagination.totalDocs}
//         currentPage={pagination.currentPage}
//         onChangePage={onPageChange}
//         onChangeRowsPerPage={onRowsPerPageChange}
//         displayRowsPerPage={renderRowsPerPage()}
//       />
//     </div>
//   );
// };
// export default CoursesView;

// // src/containers/course/coursesView.jsx
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// import CustomDataTable from "../../common/dataTable/dataTable";
// import PopupMenu from "../../common/popupMenu/PopupMenu";
// import ButtonControl from "../../controls/button/ButtonControl";
// import "./coursesStyles.scss";

// import EditIcon from "/assets/svg/edit.svg";
// import DeleteIcon from "/assets/svg/delete.svg";
// import AgniVeerIcon from "/assets/svg/agniVeer.svg";
// import AddIcon from "/assets/svg/AddIcon.svg";

// import moment from "moment";
// import { getTradeName } from "../../../helpers/masterLookup";
// import ConfirmationDialog from "../../common/Modal/modalView";

// const CoursesView = ({
//   courses,
//   pagination,
//   onPageChange,
//   onRowsPerPageChange,
//   onDeleteCourse,
// }) => {
//   const searchValue = useSelector((state) => state.search.searchValue);

//   const [filteredCourses, setFilteredCourses] = useState(courses);

//   const [showConfirm, setShowConfirm] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [modalMessage, setModalMessage] = useState("");

//   const handleConfirmDelete = () => {
//     if (selectedCourse) {
//       onDeleteCourse(selectedCourse);
//     }
//     setShowConfirm(false);
//     setSelectedCourse(null);
//   };

//   const handleCloseModal = () => {
//     setShowConfirm(false);
//     setSelectedCourse(null);
//   };
//   useEffect(() => {
//     if (!searchValue) {
//       setFilteredCourses(courses);
//       return;
//     }

//     const lower = searchValue.toLowerCase();

//     const result = courses.filter((c) => {
//       const name = c.name?.toLowerCase() || "";

//       const startDate = moment(c.startDate).format("DD-MM-YYYY").toLowerCase();

//       const endDate = moment(c.endDate).format("DD-MM-YYYY").toLowerCase();

//       let tradeString = "";
//       if (c.trade) {
//         if (Array.isArray(c.trade)) {
//           tradeString = c.trade
//             .map((id) => getTradeName(id)?.toLowerCase() || "")
//             .join(" ");
//         } else {
//           tradeString = getTradeName(c.trade)?.toLowerCase() || "";
//         }
//       }

//       return (
//         name.includes(lower) ||
//         startDate.includes(lower) ||
//         endDate.includes(lower) ||
//         tradeString.includes(lower)
//       );
//     });

//     setFilteredCourses(result);
//   }, [searchValue, courses]);
//   // -------------------------------------------------

//   const buildTradeAgniveerUrl = (row) => {
//     const courseId = row.id;

//     if (!row.trade) return "/";

//     const tradeId = Array.isArray(row.trade) ? row.trade[0] : row.trade;

//     const tradeName = getTradeName(tradeId);
//     if (!tradeName) return "/";

//     const slug = tradeName.toLowerCase().replace(/\s+/g, "-");

//     return `/${slug}/${slug}s/all?course=${courseId}&tradeId=${tradeId}`;
//   };

//   const columns = [
//     {
//       name: "Course Name",
//       selector: (row) => row.name,
//       sortable: false,
//     },
//     {
//       name: "Start Date",
//       selector: (row) => moment(row.startDate).format("DD-MM-YYYY"),
//       sortable: false,
//     },
//     {
//       name: "End Date",
//       selector: (row) => moment(row.endDate).format("DD-MM-YYYY"),
//       sortable: false,
//     },
//     {
//       name: "Trade",
//       selector: (row) => {
//         if (!row.trade) return "-";

//         if (Array.isArray(row.trade)) {
//           return row.trade.map((id) => getTradeName(id) || id).join(", ");
//         }
//         return getTradeName(row.trade) || row.trade;
//       },
//       sortable: false,
//     },
//     {
//       name: "Actions",
//       width: "80px",
//       cell: (row) => {
//         const agniveerURL = buildTradeAgniveerUrl(row);

//         return (
//           <PopupMenu
//             options={[
//               {
//                 label: "Edit Course",
//                 icon: <img src={EditIcon} alt="edit" className="menu-icon" />,
//                 path: `/courses/edit/${row.id}`,
//               },
//               {
//                 label: "View All Agniveers",
//                 icon: (
//                   <img
//                     src={AgniVeerIcon}
//                     alt="agniveer"
//                     className="menu-icon"
//                   />
//                 ),
//                 path: agniveerURL,
//               },
//               {
//                 label: "Delete Course",
//                 icon: (
//                   <img src={DeleteIcon} alt="delete" className="menu-icon" />
//                 ),
//                 action: () => {
//                   setSelectedCourse(row);
//                   setModalMessage(
//                     `Are you sure you want to delete this course?`
//                   );
//                   setShowConfirm(true);
//                 },
//               },
//             ]}
//           />
//         );
//       },
//     },
//   ];

//   const renderRowsPerPage = () => (
//     <select
//       value={pagination.limit}
//       onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
//     >
//       {[5, 10, 25, 50].map((n) => (
//         <option key={n} value={n}>
//           {n}
//         </option>
//       ))}
//     </select>
//   );

//   return (
//     <div className="course-wrapper">
//       <ConfirmationDialog
//         show={showConfirm}
//         onClose={handleCloseModal}
//         onConfirm={handleConfirmDelete}
//         title="Delete Course"
//         message={modalMessage}
//         confirmLabel="Delete"
//         cancelLabel="Cancel"
//         size="sm"
//       />
//       <div className="course-header">
//         <ButtonControl
//           text="Add Course"
//           icon={<img src={AddIcon} alt="add" className="btn-icon" />}
//           to="/courses/add"
//           styles="course-add-btn"
//         />
//       </div>

//       <CustomDataTable
//         title=""
//         columns={columns}
//         data={filteredCourses} // 🔍 filtered data
//         paginationPerPage={pagination.limit}
//         paginationTotalRows={pagination.totalDocs}
//         currentPage={pagination.currentPage}
//         onChangePage={onPageChange}
//         onChangeRowsPerPage={onRowsPerPageChange}
//         displayRowsPerPage={renderRowsPerPage()}
//       />
//     </div>
//   );
// };

// export default CoursesView;

// src/containers/course/coursesView.jsx
import React, { useState } from "react";

import CustomDataTable from "../../common/dataTable/dataTable";
import PopupMenu from "../../common/popupMenu/PopupMenu";
import ButtonControl from "../../controls/button/ButtonControl";
import "./coursesStyles.scss";

import EditIcon from "/assets/svg/edit.svg";
import DeleteIcon from "/assets/svg/delete.svg";
import AgniVeerIcon from "/assets/svg/agniVeer.svg";
import AddIcon from "/assets/svg/AddIcon.svg";

import moment from "moment";
import { getTradeName } from "../../../helpers/masterLookup";
import ConfirmationDialog from "../../common/Modal/modalView";

const CoursesView = ({
  courses,
  pagination,
  onPageChange,
  onRowsPerPageChange,
  onDeleteCourse,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [modalMessage, setModalMessage] = useState("");

  const handleConfirmDelete = () => {
    if (selectedCourse) {
      onDeleteCourse(selectedCourse);
    }
    setShowConfirm(false);
    setSelectedCourse(null);
  };

  const handleCloseModal = () => {
    setShowConfirm(false);
    setSelectedCourse(null);
  };

  const buildTradeAgniveerUrl = (row) => {
    const courseId = row.id;

    if (!row.trade) return "/";

    const tradeId = Array.isArray(row.trade) ? row.trade[0] : row.trade;

    const tradeName = getTradeName(tradeId);
    if (!tradeName) return "/";

    const slug = tradeName.toLowerCase().replace(/\s+/g, "-");

    return `/${slug}/${slug}s/all?course=${courseId}&tradeId=${tradeId}`;
  };

  const columns = [
    {
      name: "Course Name",
      selector: (row) => row.name,
      sortable: false,
    },
    {
      name: "Start Date",
      selector: (row) => moment(row.startDate).format("DD-MM-YYYY"),
      sortable: false,
    },
    {
      name: "End Date",
      selector: (row) => moment(row.endDate).format("DD-MM-YYYY"),
      sortable: false,
    },
    {
      name: "Trade",
      selector: (row) => {
        if (!row.trade) return "-";

        // If trade is already a formatted string (from courseActions), return it
        if (typeof row.trade === "string" && row.trade !== "-") {
          // If it contains ObjectIds (long hex strings), try to resolve them
          // Otherwise, return as-is (already formatted)
          if (row.trade.match(/^[0-9A-F]{24}(,\s*[0-9A-F]{24})*$/i)) {
            // It's ObjectIds, try to resolve them
            const tradeIds = row.trade.split(/,?\s+/).filter(Boolean);
            const tradeNames = tradeIds.map((id) => {
              const tradeName = getTradeName(id.trim());
              return tradeName ? tradeName.toUpperCase() : id;
            });
            return tradeNames.join(", ");
          }
          // Already formatted trade names, return as-is
          return row.trade.toUpperCase();
        }

        // If trade is an array (fallback for raw data)
        if (Array.isArray(row.trade)) {
          return row.trade
            .map((id) => {
              const tradeId = id?._id || id?.id || id;
              const tradeName = getTradeName(tradeId);
              return tradeName ? tradeName.toUpperCase() : tradeId;
            })
            .join(", ");
        }

        // Try to get trade name if it's a single ID
        const tradeName = getTradeName(row.trade);
        if (tradeName) {
          return tradeName.toUpperCase();
        }

        return row.trade || "-";
      },
      sortable: false,
    },
    {
      name: "Actions",
      width: "80px",
      cell: (row) => {
        const agniveerURL = buildTradeAgniveerUrl(row);

        return (
          <PopupMenu
            options={[
              {
                label: "Edit Course",
                icon: <img src={EditIcon} alt="edit" className="menu-icon" />,
                path: `/courses/edit/${row.id}`,
              },
              {
                label: "View All Agniveers",
                icon: (
                  <img
                    src={AgniVeerIcon}
                    alt="agniveer"
                    className="menu-icon"
                  />
                ),
                path: agniveerURL,
              },
              {
                label: "Delete Course",
                icon: (
                  <img src={DeleteIcon} alt="delete" className="menu-icon" />
                ),
                action: () => {
                  setSelectedCourse(row);
                  setModalMessage(
                    "Are you sure you want to delete this course?",
                  );
                  setShowConfirm(true);
                },
              },
            ]}
          />
        );
      },
    },
  ];

  const renderRowsPerPage = () => (
    <select
      value={pagination.limit}
      onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
    >
      {[5, 10, 25, 50].map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
    </select>
  );

  return (
    <div className="course-wrapper">
      <ConfirmationDialog
        show={showConfirm}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Delete Course"
        message={modalMessage}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        size="sm"
      />
      <div className="course-header">
        <ButtonControl
          text="Add Course"
          icon={<img src={AddIcon} alt="add" className="btn-icon" />}
          to="/courses/add"
          styles="course-add-btn"
        />
      </div>

      <CustomDataTable
        title=""
        columns={columns}
        data={courses || []}
        paginationPerPage={pagination.limit}
        paginationTotalRows={pagination.totalDocs}
        currentPage={pagination.currentPage}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onRowsPerPageChange}
        displayRowsPerPage={renderRowsPerPage()}
      />
    </div>
  );
};

export default CoursesView;
