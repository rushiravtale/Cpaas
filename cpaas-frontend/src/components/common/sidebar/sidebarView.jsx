

// import React, { useEffect } from "react";
// import "./sidebarStyles.scss";
// import { MdExpandMore } from "react-icons/md";
// import { FaUserCircle } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom";
// import { getAllowedSidebarTabs,  isLoggedInCommander,
//   isLoggedInInstructor,
//   getLoggedInUserTrades } from "../../../helpers/authLookUp";
// import { getTradeId } from "../../../helpers/masterLookup";

// const SidebarView = ({ activeTab, onTabClick, user, logout }) => {
//   const location = useLocation();



// function getDashboardUrl() {
//   let tradeId = null;

//   if (isLoggedInCommander()) {
//     tradeId = "6911a7ffe82ed8049416dee9";  // default gunner trade
//   }

//   if (isLoggedInInstructor()) {
//     const trades = getLoggedInUserTrades();

//     if (Array.isArray(trades)) {
//       const t = trades[0];

//       if (typeof t === "string") tradeId = t;               // tradeId as string
//       else if (typeof t === "object") tradeId = t._id;     // tradeId as object → use _id
//     }
//   }

//   if (!tradeId) return "/dashboard";

//   return `/dashboard?tradeId=${tradeId}`;
// }



//   useEffect(() => {
//     const pathToTabMap = {
//       "/dashboard": "Dashboard",
//       "/gunner": "Gunner",
//       "/driver": "Driver",
//       "/operator": "Operator",
//       "/ofc": "OFC",
//       "/system-users": "System Users",
//       "/courses": "Courses",
//     };

//     const currentTab = pathToTabMap[location.pathname];
//     if (
//       currentTab &&
//       currentTab.toLowerCase() !== (activeTab || "").toLowerCase()
//     ) {
//       onTabClick(currentTab);
//     }
//   }, [location.pathname, activeTab, onTabClick]);

//   const allTabs = [
//     { path: "/dashboard", label: "Dashboard" },
//     { path: "/gunner", label: "Gunner" },
//     { path: "/driver", label: "Driver" },
//     { path: "/operator", label: "Operator" },
//     { path: "/ofc", label: "Ofc" },
//     { path: "/system-users", label: "System users" },
//     { path: "/courses", label: "Courses" },
//   ];

//   const allowedTabs = getAllowedSidebarTabs();
//   const filteredTabs = allTabs.filter((t) =>
//     allowedTabs.includes(t.label.toLowerCase())
//   );

//   // -----------------------------
//   // 🔥 COMPUTE TRADE ID FOR TRADE TABS
//   // -----------------------------
//  function getUrlWithTradeId(tabLabel, basePath) {
//   const tradeTabs = ["gunner", "driver", "operator", "ofc"]; // FIXED

//   const isTradeTab = tradeTabs.includes(tabLabel.toLowerCase());
//   if (!isTradeTab) return basePath;

//   const tradeId = getTradeId(tabLabel); // "OFC" → tradeId
//   if (!tradeId) return basePath;

//   return `${basePath}?tradeId=${tradeId}`;
// }


//   return (
//     <div className="sidebar-container">
//       <div className="logo-section">
//         <h1>CPAAS</h1>
//         <p>Commanders Predictive Analysis and Assessment System</p>
//       </div>

//       <div className="user-section">
//         <div className="user-profile-info-wrapper">
//           <FaUserCircle className="user-img" size={45} />
//           <div className="user-info">
//             <span className="user-name">{user.name}</span>
//             <span className="user-role">{user.roleIds[0].name}</span>
//           </div>
//         </div>
//         <MdExpandMore />
//       </div>

//       <div className="tabs-section">
//         {filteredTabs.map((tab) => {
//           const isActive =
//             activeTab && activeTab.toLowerCase() === tab.label.toLowerCase();

//           // const finalUrl = getUrlWithTradeId(tab.label, tab.path);
//           const finalUrl =
//   tab.label.toLowerCase() === "dashboard"
//     ? getDashboardUrl()
//     : getUrlWithTradeId(tab.label, tab.path);


//           return (
//             <Link
//               key={tab.label}
//               to={finalUrl}
//               className={`tab-item ${isActive ? "active" : ""}`}
//               onClick={() => onTabClick(tab.label)}
//             >
//               {isActive && <div className="active-indicator" />}
//              <span className="tab-label">
//   {tab.label.toLowerCase() === "ofc" ? "OFC" : tab.label}
// </span>

//             </Link>
//           );
//         })}
//       </div>

//       <div className="logout-section" onClick={logout}>
//         <span className="logout-text">Logout</span>
//       </div>
//     </div>
//   );
// };
// export default SidebarView;


import React, { useEffect } from "react";
import "./sidebarStyles.scss";
import { MdExpandMore } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import {
  getAllowedSidebarTabs,
  isLoggedInCommander,
  isLoggedInInstructor,
  getLoggedInUserTrades,
} from "../../../helpers/authLookUp";
import { getTradeId } from "../../../helpers/masterLookup";

const SidebarView = ({ activeTab, onTabClick, user, logout }) => {
  const location = useLocation();


  useEffect(() => {
    const tradeSegments = {
      gunner: "Gunner",
      driver: "Driver",
      operator: "Operator",
      ofc: "Ofc",
    };

    const pathname = location.pathname.toLowerCase();
    const searchParams = new URLSearchParams(location.search);
    const hasTradeId = searchParams.has("tradeId");

    if (hasTradeId) return; 

    let detectedTradeLabel = null;

    for (const [segment, label] of Object.entries(tradeSegments)) {
      if (pathname.startsWith(`/${segment}`)) {
        detectedTradeLabel = label;
        break;
      }
    }

    if (detectedTradeLabel) {
      const tradeId = getTradeId(detectedTradeLabel);
      if (tradeId) {
        const newUrl = `${location.pathname}?tradeId=${tradeId}${location.hash}`;
        window.history.replaceState(null, "", newUrl);
      }
    }
  }, [location.pathname, location.search]);

  function getDashboardUrl() {
    let tradeId = null;
    if (isLoggedInCommander()) {
      tradeId = "6911a7ffe82ed8049416dee9";
    }
    if (isLoggedInInstructor()) {
      const trades = getLoggedInUserTrades();
      if (Array.isArray(trades) && trades.length > 0) {
        const t = trades[0];
        tradeId = typeof t === "string" ? t : t._id;
      }
    }
    return tradeId ? `/dashboard?tradeId=${tradeId}` : "/dashboard";
  }

  useEffect(() => {
    const pathToTabMap = {
      "/dashboard": "Dashboard",
      "/gunner": "Gunner",
      "/driver": "Driver",
      "/operator": "Operator",
      "/ofc": "OFC",
      "/system-users": "System Users",
      "/courses": "Courses",
    };

    const basePath = Object.keys(pathToTabMap).find((path) =>
      location.pathname.startsWith(path)
    );

    const currentTab = basePath ? pathToTabMap[basePath] : null;

    if (
      currentTab &&
      currentTab.toLowerCase() !== (activeTab || "").toLowerCase()
    ) {
      onTabClick(currentTab);
    }
  }, [location.pathname, activeTab, onTabClick]);

  const allTabs = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/gunner", label: "Gunner" },
    { path: "/driver", label: "Driver" },
    { path: "/operator", label: "Operator" },
    { path: "/ofc", label: "Ofc" },
    { path: "/system-users", label: "System users" },
    { path: "/courses", label: "Courses" },
  ];

  const allowedTabs = getAllowedSidebarTabs();
  const filteredTabs = allTabs.filter((t) =>
    allowedTabs.includes(t.label.toLowerCase())
  );

  function getUrlWithTradeId(tabLabel, basePath) {
    const tradeTabs = ["gunner", "driver", "operator", "ofc"];
    const isTradeTab = tradeTabs.includes(tabLabel.toLowerCase());
    if (!isTradeTab) return basePath;

    const tradeId = getTradeId(tabLabel);
    return tradeId ? `${basePath}?tradeId=${tradeId}` : basePath;
  }

  return (
    <div className="sidebar-container">
      <div className="logo-section">
        <h1>CPAAS</h1>
        <p>Commanders Predictive Analysis and Assessment Software</p>
      </div>

      <div className="user-section">
        <div className="user-profile-info-wrapper">
          <FaUserCircle className="user-img" size={45} />
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.roleIds[0].name}</span>
          </div>
        </div>
        <MdExpandMore />
      </div>

      <div className="tabs-section">
        {filteredTabs.map((tab) => {
          const isActive =
            activeTab && activeTab.toLowerCase() === tab.label.toLowerCase();

          const finalUrl =
            tab.label.toLowerCase() === "dashboard"
              ? getDashboardUrl()
              : getUrlWithTradeId(tab.label, tab.path);

          return (
            <Link
              key={tab.label}
              to={finalUrl}
              className={`tab-item ${isActive ? "active" : ""}`}
              onClick={() => onTabClick(tab.label)}
            >
              {isActive && <div className="active-indicator" />}
              <span className="tab-label">
                {tab.label.toLowerCase() === "ofc" ? "OFC" : tab.label}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="logout-section" onClick={logout}>
        <span className="logout-text">Logout</span>
      </div>
    </div>
  );
};

export default SidebarView;
