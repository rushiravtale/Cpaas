// import React from "react";
// import "./headerStyles.scss";
// import SearchBar from "../../controls/searchbar/SearchBar";

// const HeaderView = ({ activeTab, searchValue, setSearchValue }) => {

//  const formatTitle = (text) => {
//   if (!text) return "";

//   if (text.toLowerCase() === "ofc") {
//     return "OFC";
//   }

//   return text
//     .split("-")
//     .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
//     .join(" ");
// };


//   const formattedTitle = formatTitle(activeTab);

//   return (
//     <div className="common-header-container">
//       <div className="header-left">
//         <h2 className="active-tab-title">{formattedTitle}</h2>
//       </div>

//       <div className="header-right">
//         <SearchBar
//           value={searchValue}
//           onChange={(v) => setSearchValue(v)}
//           onClear={() => setSearchValue("")}
//         />
//       </div>
//     </div>
//   );
// };

// export default HeaderView;


// import React from "react";
// import { useLocation } from "react-router-dom";
// import "./headerStyles.scss";
// import SearchBar from "../../controls/searchbar/SearchBar";

// const HeaderView = ({ activeTab, searchValue, setSearchValue,onEnter ,onClear }) => {
//   const location = useLocation();

//   const allowedBases = [
//     "gunner/gunners",
//     "operator/operators",
//     "ofc/ofcs",
//     "driver/drivers"
//   ];

//   const allowedSubPages = [
//     undefined,          
//     "gradeA",
//     "gradeB",
//     "gradeC",
//     "all",
//     "allAgniveers",
//     "improvement",
//     "improvements"
//   ];

//   const singleSegmentRoutes = [
//     "courses",
//     "system-users"
//   ];

//   const path = location.pathname.replace(/^\/+/, "");
//   const segments = path.split("/");

//   const baseRoute = segments.slice(0, 2).join("/");

//   const subPage = segments[2];

//   const isDeepRoute = segments.length > 3;

//   const showSearch =
//     (allowedBases.includes(baseRoute) &&
//       allowedSubPages.includes(subPage) &&
//       !isDeepRoute) ||
//     (segments.length === 1 && singleSegmentRoutes.includes(segments[0]));

//   const formatTitle = (text) => {
//     if (!text) return "";
//     if (text.toLowerCase() === "ofc") return "OFC";

//     return text
//       .split("-")
//       .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
//       .join(" ");
//   };

//   const formattedTitle = formatTitle(activeTab);

//   return (
//     <div className="common-header-container">
//       <div className="header-left">
//         <h2 className="active-tab-title">{formattedTitle}</h2>
//       </div>

//       <div className="header-right">
//         {showSearch && (
// <SearchBar
//   value={searchValue}
//   onChange={setSearchValue}     // local only
//   onEnter={onEnter}             // updates redux
//   onClear={onClear}
// />

//         )}
//       </div>
//     </div>
//   );
// };

// export default HeaderView;



import React from "react";
import { useLocation } from "react-router-dom";
import "./headerStyles.scss";
import SearchBar from "../../controls/searchbar/SearchBar";

const HeaderView = ({
  activeTab,
  searchValue,
  setSearchValue,
  onEnter,
  onClear
}) => {
  const location = useLocation();

  const allowedBases = [
    "gunner/gunners",
    "operator/operators",
    "ofc/ofcs",
    "driver/drivers"
  ];

  const allowedSubPages = [
    undefined,
    "gradeA",
    "gradeB",
    "gradeC",
    "gradeE",
    "all",
    "allAgniveers",
    "improvement",
    "improvements"
  ];

  const singleSegmentRoutes = [
    "courses",
    "system-users"
  ];

  const path = location.pathname.replace(/^\/+/, "");
  const segments = path.split("/");

  /* ---------------- EXISTING LOGIC ---------------- */
  const baseRoute = segments.slice(0, 2).join("/");
  const subPage = segments[2];
  const isDeepRoute = segments.length > 3;

  const showSearchNormal =
    (allowedBases.includes(baseRoute) &&
      allowedSubPages.includes(subPage) &&
      !isDeepRoute) ||
    (segments.length === 1 &&
      singleSegmentRoutes.includes(segments[0]));

  /* ---------------- DASHBOARD SUPPORT ---------------- */
  const isDashboard = segments[0] === "dashboard";

  const dashboardBaseRoute = isDashboard
    ? segments.slice(1, 3).join("/")
    : null;

  const dashboardSubPage = isDashboard ? segments[3] : null;

  const showSearchDashboard =
    isDashboard &&
    allowedBases.includes(dashboardBaseRoute) &&
    allowedSubPages.includes(dashboardSubPage);

  const showSearch = showSearchNormal || showSearchDashboard;

  const formatTitle = (text) => {
    if (!text) return "";
    if (text.toLowerCase() === "ofc") return "OFC";

    return text
      .split("-")
      .map(
        (part) => part.charAt(0).toUpperCase() + part.slice(1)
      )
      .join(" ");
  };

  const formattedTitle = formatTitle(activeTab);

  return (
    <div className="common-header-container">
      <div className="header-left">
        <h2 className="active-tab-title">{formattedTitle}</h2>
      </div>

      <div className="header-right">
        {showSearch && (
          <SearchBar
            value={searchValue}
            onChange={setSearchValue} 
            onEnter={onEnter}         
            onClear={onClear}
          />
        )}
      </div>
    </div>
  );
};

export default HeaderView;
