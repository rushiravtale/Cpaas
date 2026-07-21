// // CommonTradeTable.jsx
// import React, { useEffect } from "react";
// import CustomDataTable from "../../../common/dataTable/dataTable";
// import { IoIosArrowBack } from "react-icons/io";
// import PopupMenu from "../../../common/popupMenu/PopupMenu";
// import {  } from "../../../../utils/";
// import ButtonControl from "../../../controls/button/ButtonControl";

// import BasicInfoIcon from "/assets/svg/basicInfo.svg";
// import TechPhaseIcon from "/assets/svg/TechPhase.svg";
// import WeeklyIcon from "/assets/svg/weeklyPerformance.svg";
// import SummaryIcon from "/assets/svg/summary.svg";
// import CertificateIcon from "/assets/svg/Certificate.svg";
// import PhysicalPoficiencyIcon from "/assets/svg/physicalProficiency.svg";
// import AddIcon from "/assets/svg/AddIcon.svg";
// import './tradeUserTableStyles.scss';

// const TradeUsersTable = ({
//   title = "Personal Details",
//   trade,
//   grade,
//   data,
//   pagination,
//   loading,
//   fetchPage,
//   addPathPrefix,
//   viewPathPrefix,
//   history,
//   location
// }) => {

//   const appendQuery = (path) => {
//     const qs = location.search || "";
//     return `${path}${qs}`;
//   };

//   const columns = [
//     { name: "Name", selector: row => row.name, sortable: false },
//     { name: "Army Number", selector: row => row.armyNumber, sortable: false },
//     { name: "Squad Number", selector: row => row.squadNumber, sortable: false },
//     { name: "Course", selector: row => row.course, sortable: false },
//     {
//       name: "Actions",
//       width: "80px",
//       cell: (row) => (
//         <PopupMenu
//           options={[
//             {
//               label: "Basic Info",
//               icon: <img src={BasicInfoIcon} className="menu-icon" />,
//               path: appendQuery(`${viewPathPrefix}/basic-info/edit/${(row.armyNumber)}`)
//             },
//             {
//               label: "Physical Proficiency",
//               icon: <img src={PhysicalPoficiencyIcon} className="menu-icon" />,
//               path: appendQuery(`${viewPathPrefix}/physical-proficiency/${(row.armyNumber)}`)
//             },
//             {
//               label: "Tech Phase",
//               icon: <img src={TechPhaseIcon} className="menu-icon" />,
//               path: appendQuery(`${viewPathPrefix}/tech-phase/${(row.armyNumber)}`)
//             },
//             {
//               label: "Fortnightly Performance Sheet",
//               icon: <img src={WeeklyIcon} className="menu-icon" />,
//               path: appendQuery(`${viewPathPrefix}/weekly-performance/${(row.armyNumber)}`)
//             },
//             {
//               label: "Summary",
//               icon: <img src={SummaryIcon} className="menu-icon" />,
//               path: appendQuery(`${viewPathPrefix}/summary/${(row.armyNumber)}`)
//             },
//             {
//               label: "Certificate",
//               icon: <img src={CertificateIcon} className="menu-icon" />,
//               path: appendQuery(`${viewPathPrefix}/certificate/${(row.armyNumber)}`)
//             },
//           ]}
//         />
//       ),
//     }
//   ];

//   return (
//     <div className="trade-list-container">

//       <div className="header">
//         <div className="header-wrapper">
//           <IoIosArrowBack className="back-icon" onClick={() => history.goBack()} />
//           <h2>{title}</h2>
//         </div>

//         <ButtonControl
//           text="Add User"
//           icon={<img src={AddIcon} className="btn-icon" />}
//           to={appendQuery(`${addPathPrefix}/add`)}
//           styles="su-add-btn"
//         />
//       </div>

//       <h4 className="subtitle">
//         {grade === "improvement"
//           ? `${trade} where improvement is required`
//           : `${trade} in Grade ${grade?.slice(-1)?.toUpperCase()}`}
//       </h4>

//       <CustomDataTable
//         columns={columns}
//         data={data}
//         loading={loading}
//         paginationPerPage={pagination?.limit || 10}
//         currentPage={pagination?.currentPage || 1}
//         paginationTotalRows={pagination?.totalDocs || 0}
//         onChangePage={(page) => fetchPage(page)}
//         onChangeRowsPerPage={(limit) => fetchPage(1, limit)}
//       />
//     </div>
//   );
// };

// export default TradeUsersTable;

// import React, { useEffect } from "react";
// import CustomDataTable from "../../../common/dataTable/dataTable";
// import { IoIosArrowBack } from "react-icons/io";
// import PopupMenu from "../../../common/popupMenu/PopupMenu";
// import ButtonControl from "../../../controls/button/ButtonControl";

// import BasicInfoIcon from "/assets/svg/basicInfo.svg";
// import TechPhaseIcon from "/assets/svg/TechPhase.svg";
// import WeeklyIcon from "/assets/svg/weeklyPerformance.svg";
// import SummaryIcon from "/assets/svg/summary.svg";
// import CertificateIcon from "/assets/svg/Certificate.svg";
// import PhysicalPoficiencyIcon from "/assets/svg/physicalProficiency.svg";
// import AddIcon from "/assets/svg/AddIcon.svg";
// import './tradeUserTableStyles.scss';
// import BackNavigation from "../../../common/navigation/BackNavigation";

// const TradeUsersTable = ({
//   title = "Personal Details",
//   trade,
//   grade,
//   data,
//   pagination,
//   loading,
//   fetchPage,
//   addPathPrefix,
//   viewPathPrefix,
//   history,
//   location
// }) => {

//     const formatTrade = (trade) => {
//   if (!trade) return "";

//   const t = trade.toLowerCase();

//   if (t === "ofc" || t === "ofcs") {
//     return "OFC";
//   }

//   const singular = t.endsWith("s") ? t.slice(0, -1) : t;

//   return singular.charAt(0).toUpperCase() + singular.slice(1);
// };

// const tradeFormatted = formatTrade(trade);

// console.log("formated trade",tradeFormatted)
//   const isAllAgniveers = location.pathname.includes("all");

//   console.log("grade is ",grade)
//   const shouldShowSubtitle = !isAllAgniveers && grade;

//   const appendQuery = (path) => {
//     const qs = location.search || "";
//     return `${path}${qs}`;
//   };

//   const columns = [
//     { name: "Name", selector: row => row.name, sortable: false },
//     { name: "Army Number", selector: row => row.armyNumber, sortable: false },
//     { name: "Squad Number", selector: row => row.squadNumber, sortable: false },
//     { name: "Course", selector: row => row.course, sortable: false },
//     {
//       name: "Performance Details",
//       width: "200px",
//       cell: (row) => (
//         <PopupMenu
//           options={[
//             {
//               label: "Basic Info",
//               icon: <img src={BasicInfoIcon} className="menu-icon" />,
//               path: appendQuery(`${viewPathPrefix}/basic-info/edit/${row.id}`)
//             },
//             {
//               label: "Physical Proficiency",
//               icon: <img src={PhysicalPoficiencyIcon} className="menu-icon" />,
//               path: appendQuery(`${viewPathPrefix}/physical-proficiency/${row.id}`)
//             },
//             {
//               label: "Tech Phase",
//               icon: <img src={TechPhaseIcon} className="menu-icon" />,
//               path: appendQuery(`${viewPathPrefix}/tech-phase/${row.id}`)
//             },
//             {
//               label: "Fortnightly Performance Sheet",
//               icon: <img src={WeeklyIcon} className="menu-icon" />,
//               path: appendQuery(`${viewPathPrefix}/weekly-performance/${row.id}`)
//             },
//             {
//               label: "Summary",
//               icon: <img src={SummaryIcon} className="menu-icon" />,
//               path: appendQuery(`${viewPathPrefix}/summary/${row.id}`)
//             },
//             {
//               label: "Certificate",
//               icon: <img src={CertificateIcon} className="menu-icon" />,
//               path: appendQuery(`${viewPathPrefix}/certificate/${row.id}`)
//             },
//           ]}
//         />
//       ),
//     }
//   ];

//   return (
//     <div className="trade-list-container">

//       <div className="header">
//         <div className="header-wrapper">
//           <BackNavigation/>
//           <h2>{title}</h2>
//         </div>
// <ButtonControl
//   text={trade ? "Add Agniveer" : "Add User"}
//   icon={<img src={AddIcon} className="btn-icon" />}
//   to={appendQuery(`${addPathPrefix}/add`)}
//   styles="su-add-btn"
// />

//       </div>

//       {shouldShowSubtitle && (
//         <h4 className="subtitle">
//           {grade === "improvement"
//             ? `${tradeFormatted} where improvement is required`
//             : `${tradeFormatted} in Grade ${grade?.slice(-1)?.toUpperCase()}`}
//         </h4>
//       )}

//       <CustomDataTable
//         columns={columns}
//         data={data}
//         loading={loading}
//         paginationPerPage={pagination?.limit || 10}
//         currentPage={pagination?.currentPage || 1}
//         paginationTotalRows={pagination?.totalDocs || 0}
//         onChangePage={(page) => fetchPage(page)}
//         onChangeRowsPerPage={(limit) => fetchPage(1, limit)}
//       />
//     </div>
//   );
// };

// export default TradeUsersTable;

import { useState } from "react";
import { useDispatch } from "react-redux";
import CustomDataTable from "../../../common/dataTable/dataTable";
import BackNavigation from "../../../common/navigation/BackNavigation";
import PopupMenu from "../../../common/popupMenu/PopupMenu";
import ButtonControl from "../../../controls/button/ButtonControl";
import ImportModal from "./ImportModal";
import { exportAgniveers } from "../../../../store/tradeUsers/tradeUserActions";

import BasicInfoIcon from "/assets/svg/basicInfo.svg";
import TechPhaseIcon from "/assets/svg/TechPhase.svg";
import WeeklyIcon from "/assets/svg/weeklyPerformance.svg";
import SummaryIcon from "/assets/svg/summary.svg";
import CertificateIcon from "/assets/svg/Certificate.svg";
import PhysicalPoficiencyIcon from "/assets/svg/physicalProficiency.svg";
import AddIcon from "/assets/svg/AddIcon.svg";

import "./tradeUserTableStyles.scss";

const TradeUsersTable = ({
  title = "Personal Details",
  trade,
  tradeId,
  grade,
  data = [],
  pagination,
  loading,
  fetchPage,
  addPathPrefix,
  viewPathPrefix,
  location,
}) => {
  const dispatch = useDispatch();
  const [showImportModal, setShowImportModal] = useState(false);
  // const searchValue = useSelector((state) => state.search.searchValue);

  // const filteredData = useMemo(() => {
  //   if (!searchValue?.trim()) return data;

  //   const query = searchValue.toLowerCase();

  //   return data.filter((row) => {
  //     const fields = [
  //       row.name,
  //       row.armyNumber,
  //       row.squadNumber,
  //       row.course,
  //       row.trade,
  //     ];

  //     return fields.some((field) =>
  //       String(field || "")
  //         .toLowerCase()
  //         .includes(query)
  //     );
  //   });
  // }, [ data]);

  const filteredData = data;

  const formatTrade = (trade) => {
    if (!trade) return "";

    const t = trade.toLowerCase();
    if (t === "ofc" || t === "ofcs") return "OFC";

    const singular = t.endsWith("s") ? t.slice(0, -1) : t;
    return singular.charAt(0).toUpperCase() + singular.slice(1);
  };

  const tradeFormatted = formatTrade(trade);

  const isAllAgniveers = location.pathname.includes("all");
  const shouldShowSubtitle = !isAllAgniveers && grade;

  const appendQuery = (path, courseId = null) => {
    const qs =
      `${
        courseId ? `${location.search}&course=${courseId}` : location.search
      }` || "";
    return `${path}${qs}`;
  };

  const columns = [
    { name: "Army Number", selector: (row) => row.armyNumber, sortable: false },
    // {
    //   name: "Course Rank",
    //   selector: (row) => row.overallRank || "-",
    //   sortable: false,
    //   width: "60px",
    // },
    { name: "Rank", selector: (row) => row.rank, sortable: false },
    { name: "Name", selector: (row) => row.name, sortable: false },
    { name: "Unit", selector: (row) => row.unit || "-", sortable: false },
    { name: "Course", selector: (row) => row.course, sortable: false },
    {
      name: "Squad Number",
      selector: (row) => row.squadNumber,
      sortable: false,
    },
    {
      name: "Performance Details",
      width: "200px",
      cell: (row) => (
        <PopupMenu
          options={[
            {
              label: "Basic Info",
              icon: <img src={BasicInfoIcon} className="menu-icon" />,
              path: appendQuery(`${viewPathPrefix}/basic-info/edit/${row.id}`),
            },
            {
              label: "Physical Proficiency",
              icon: <img src={PhysicalPoficiencyIcon} className="menu-icon" />,
              path: appendQuery(
                `${viewPathPrefix}/physical-proficiency/${row.id}`,
              ),
            },
            {
              label: "Tech Phase",
              icon: <img src={TechPhaseIcon} className="menu-icon" />,
              path: appendQuery(`${viewPathPrefix}/tech-phase/${row.id}`),
            },
            {
              label: "Fortnightly Performance Sheet",
              icon: <img src={WeeklyIcon} className="menu-icon" />,
              path: appendQuery(
                `${viewPathPrefix}/weekly-performance/${row.id}`,
              ),
            },
            {
              label: "Summary",
              icon: <img src={SummaryIcon} className="menu-icon" />,
              path: appendQuery(`${viewPathPrefix}/summary/${row.id}`),
            },
            {
              label: "Certificate",
              icon: <img src={CertificateIcon} className="menu-icon" />,
              path: appendQuery(
                `${viewPathPrefix}/certificate/${row.id}`,
                row.courseId,
              ),
            },
          ]}
        />
      ),
    },
  ];

  const renderRowsPerPage = () => (
    <select
      value={pagination?.limit || 10}
      onChange={(e) => fetchPage(1, Number(e.target.value))}
    >
      {[5, 10, 25, 50].map((n) => (
        <option key={n} value={n}>
          {n}
        </option>
      ))}
    </select>
  );

  const handleExport = () => {
    const params = new URLSearchParams(location.search);
    const filters = {};

    // Extract filters from URL params, fallback to tradeId prop
    const tradeIdFromUrl = params.get("tradeId");
    const courseName = params.get("course");
    const armyNumber = params.get("armyNo");

    // Convert grade from URL format (gradeA) to query format (A)
    let gradeValue = null;
    if (grade) {
      if (grade.startsWith("grade")) {
        const g = grade.replace("grade", "");
        if (["A", "B", "C", "E"].includes(g)) {
          gradeValue = g;
        }
      } else if (grade === "improvement") {
        gradeValue = "D";
      }
    }

    filters.tradeId =
      tradeIdFromUrl ||
      (tradeId != null
        ? typeof tradeId === "string"
          ? tradeId
          : (tradeId._id || tradeId)?.toString?.()
        : undefined);
    if (courseName) filters.courseName = courseName;
    if (armyNumber) filters.armyNumber = armyNumber;
    if (gradeValue) filters.grade = gradeValue;
    filters.filter = "all";

    dispatch(exportAgniveers(filters));
  };

  const handleImport = () => {
    setShowImportModal(true);
  };

  return (
    <div className="trade-list-container">
      <div className="header">
        <div className="header-wrapper">
          <BackNavigation />
          <h2>{title}</h2>
        </div>

        <div className="header-actions">
          <ButtonControl
            text="Export Excel"
            onClick={handleExport}
            styles="export-btn"
          />
          <ButtonControl
            text="Import Excel"
            onClick={handleImport}
            styles="import-btn"
          />
          <ButtonControl
            text={trade ? "Add Agniveer" : "Add User"}
            icon={<img src={AddIcon} className="btn-icon" />}
            to={{
              pathname: `${addPathPrefix}/add`,
              search: location.search,
              state: { flowMode: true },
            }}
            styles="su-add-btn"
          />
        </div>
      </div>

      <ImportModal
        show={showImportModal}
        onClose={() => setShowImportModal(false)}
        tradeId={tradeId}
      />

      {shouldShowSubtitle && (
        <h4 className="subtitle">
          {grade === "improvement"
            ? `${tradeFormatted} where improvement is required`
            : `${tradeFormatted} in Grade ${grade?.slice(-1)?.toUpperCase()}`}
        </h4>
      )}

      <CustomDataTable
        columns={columns}
        data={filteredData}
        loading={loading}
        paginationPerPage={pagination?.limit || 10}
        currentPage={pagination?.currentPage || 1}
        paginationTotalRows={pagination?.totalDocs || 0}
        onChangePage={(page) => fetchPage(page, pagination?.limit)}
        onChangeRowsPerPage={(limit) => fetchPage(1, limit)}
        displayRowsPerPage={renderRowsPerPage()}
        fixedHeader
      />
    </div>
  );
};

export default TradeUsersTable;
