// import React from "react";
// import "./dashboardStyles.scss";
// import CourseSummaryContainer from "../courseSummary/courseSummaryContainer";
// import { getTradeName } from "../../../../helpers/masterLookup";

// import dash_military from "../../../../../public/assets/icons/military_13416519 1.svg";
// import dash_squad from "../../../../../public/assets/icons/squad_3475849 1.svg";
// import dash_nowar from "../../../../../public/assets/icons/no-war_8706084 1.svg";
// import dash_military2 from "../../../../../public/assets/icons/military_11808894 1.png";

// import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";

// const DashboardView = ({
//   userRole,
//   userTrades = [],
//   topStats = {},
//   trades = [],
//   courses = [],
//   activeTrade,
//   setActiveTrade,
// }) => {
//   const isCommander = userRole === "Commander";
//   const allowedTrades = isCommander
//     ? trades
//     : trades.filter((t) => userTrades.includes(t._id));

//   const tradeNameFormatted = (name) =>
//     name.toLowerCase() === "ofc" ? "OFC" : name;

//   const selectedIndex = allowedTrades.findIndex((t) => t.name === activeTrade);

//   return (

//     <div className="dashboard-outer-wrapper">

//     <div className="dashboard-top-cards">
//         <div className="stat-card total-courses">
//           <img className="stat-card-img" src={dash_military} />
//           <div className="stat-card-info">
//             <div className="label stat-label">
//               Total <span>Courses</span>
//             </div>
//             <div className="value">{topStats.totalCourses || 400}</div>
//           </div>
//         </div>
//         <div className="stat-card trained">
//           <img className="stat-card-img" src={dash_squad} />

//           <div className="stat-card-info">
//             <div className="label stat-label">
//               Agniveers <span>Trained</span>
//             </div>

//             <div className="value">{topStats.trained || 4250}</div>
//           </div>
//         </div>
//         <div className="stat-card passed">
//           <img className="stat-card-img" src={dash_military2} />

//           <div className="stat-card-info">
//             <div className="label stat-label">
//               Agniveers <span>Passed</span>
//             </div>

//             <div className="value">{topStats.passed || 3950}</div>
//           </div>
//         </div>
//         <div className="stat-card failed">
//           <img className="stat-card-img" src={dash_nowar} />

//           <div className="stat-card-info">
//             <div className="label stat-label">
//               Agniveers <span>Failed</span>
//             </div>

//             <div className="value">{topStats.failed || 300}</div>
//           </div>
//         </div>
//       </div>

//        <TabList className="trade-tabs">
//           {allowedTrades.map((trade) => (
//             <Tab
//               key={trade._id}
//               className="trade-tab"
//               selectedClassName="trade-tab-active"
//             >
//               {tradeNameFormatted(trade.name)}
//             </Tab>
//           ))}
//         </TabList>
//     <div className="dashboard-wrapper">

//       <Tabs
//         className="trade-tabs-tab-wrapper"
//         selectedIndex={selectedIndex >= 0 ? selectedIndex : 0}
//         onSelect={(index) => setActiveTrade(allowedTrades[index].name)}
//       >

//         {allowedTrades.map((trade) => {
//           const tradeId = getTradeName.inverse?.[trade.name] || "";
//           const courseOptions = courses
//             .filter((c) => c.tradeId?.includes(tradeId))
//             .map((c) => ({ label: c.courseName, value: c._id }));

//           return (
//             <TabPanel key={trade._id}>
//                 <CourseSummaryContainer
//                   trade={trade.name}
//                   tradeId={tradeId}
//                   courseOptions={courseOptions}
//                   customStyles={"no-top-borders"}
//                 />
//             </TabPanel>
//           );
//         })}
//       </Tabs>
//     </div>
//     </div>

//   );
// };

// export default DashboardView;

// import React, { useEffect } from "react";
// import "./dashboardStyles.scss";
// import CourseSummaryContainer from "../courseSummary/courseSummaryContainer";
// import { getTradeId, getTradeName } from "../../../../helpers/masterLookup";

// import dash_military from "../../../../../public/assets/icons/military_13416519 1.svg";
// import dash_squad from "../../../../../public/assets/icons/squad_3475849 1.svg";
// import dash_nowar from "../../../../../public/assets/icons/no-war_8706084 1.svg";
// import dash_military2 from "../../../../../public/assets/icons/military_11808894 1.png";

// import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";

// const DashboardView = ({
//   userRole,
//   userTrades ,
//   topStats = {},
//   trades,
//   courses ,
//   activeTrade,
//   setActiveTrade,
// }) => {
//   const isCommander = userRole === "Commander";
//   const allowedTrades = isCommander
//     ? trades
//     : trades.filter((t) => userTrades.includes(t._id));

//   const tradeNameFormatted = (name) =>
//     name.toLowerCase() === "ofc" ? "OFC" : name;

//   // Find active index
//   const selectedIndex = Math.max(
//     0,
//     allowedTrades.findIndex((t) => t.name === activeTrade)
//   );

//   useEffect(()=>
//   {
//     console.log("courses",courses)

//   },[courses])
//   return (
//     <div className="dashboard-outer-wrapper">
//       <div className="dashboard-top-cards">
//         <div className="stat-card total-courses">
//           <img className="stat-card-img" src={dash_military} />
//           <div className="stat-card-info">
//             <div className="label stat-label">
//               Total <span>Courses</span>
//             </div>
//             <div className="value">{topStats.totalCourses || 400}</div>
//           </div>
//         </div>
//         <div className="stat-card trained">
//           <img className="stat-card-img" src={dash_squad} />
//           <div className="stat-card-info">
//             <div className="label stat-label">
//               Agniveers <span>Trained</span>
//             </div>
//             <div className="value">{topStats.trained || 4250}</div>
//           </div>
//         </div>
//         <div className="stat-card passed">
//           <img className="stat-card-img" src={dash_military2} />
//           <div className="stat-card-info">
//             <div className="label stat-label">
//               Agniveers <span>Passed</span>
//             </div>
//             <div className="value">{topStats.passed || 3950}</div>
//           </div>
//         </div>
//         <div className="stat-card failed">
//           <img className="stat-card-img" src={dash_nowar} />
//           <div className="stat-card-info">
//             <div className="label stat-label">
//               Agniveers <span>Failed</span>
//             </div>
//             <div className="value">{topStats.failed || 300}</div>
//           </div>
//         </div>
//       </div>

//       <TabList className="trade-tabs">
//         {allowedTrades.map((trade, index) => (
//           <Tab
//             key={trade._id}
//             className={`trade-tab ${
//               index === selectedIndex ? "trade-tab-active" : ""
//             }`}
//             onClick={() => setActiveTrade(trade.name)}
//           >
//             {tradeNameFormatted(trade.name)}
//           </Tab>
//         ))}
//       </TabList>

//       <div className="dashboard-wrapper">
//         <Tabs
//           selectedIndex={selectedIndex}
//           onSelect={(index) => setActiveTrade(allowedTrades[index].name)}
//           forceRenderTabPanel
//           className="trade-tabs-tab-wrapper"
//         >
//           {allowedTrades.map((trade) => {
//            const tradeId = getTradeId(trade?.name);
// console.log("[DEBUG] trade.name:", trade?.name);
// console.log("[DEBUG] computed tradeId:", tradeId);

// const courseOptions = courses
//   .filter((c) => {
//     console.log("[DEBUG] checking course:", {
//       courseId: c._id,
//       courseName: c.courseName,
//       courseTradeId: c.tradeId,
//       expectedTradeId: tradeId,
//       includes: c.tradeId?.includes(tradeId),
//     });

//     return c.tradeId?.includes(tradeId);
//   })
//   .map((c) => {
//     console.log("[DEBUG] mapping course:", {
//       courseId: c._id,
//       courseName: c.courseName,
//     });
//     return { label: c.courseName, value: c._id };
//   });

// console.log("[DEBUG] FINAL courseOptions:", courseOptions);

//             return (
//               <TabPanel key={trade._id}>
//                 <CourseSummaryContainer
//                   trade={trade.name}
//                   tradeId={tradeId}
//                   courseOptions={courseOptions}
//                   customStyles={"no-top-borders"}
//                 />
//               </TabPanel>
//             );
//           })}
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default DashboardView;


import React, { useMemo } from "react";
import "./dashboardStyles.scss";
import CourseSummaryContainer from "../courseSummary/courseSummaryContainer";
import { getTradeId } from "../../../../helpers/masterLookup";
import dash_military from "../../../../../public/assets/icons/military_13416519 1.svg";
import dash_squad from "../../../../../public/assets/icons/squad_3475849 1.svg";
import dash_nowar from "../../../../../public/assets/icons/no-war_8706084 1.svg";
import dash_military2 from "../../../../../public/assets/icons/infantry.svg";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const DashboardView = ({
  isCommander,
  userTrades,
  topStats = {},
  trades,
  courses,
  activeTrade,
  setActiveTrade,
  tradeSummaryData,
}) => {
  const params = new URLSearchParams(window.location.search);
  const urlCourseId = params.get("course") || "";
  const urlArmyNumber = params.get("armyNo") || "";

  console.log("army number in url is ",urlArmyNumber)


  const selectedIndex = Math.max(
    0,
    trades.findIndex((t) => t.name === activeTrade)
  );

  const tradeNameFormatted = (name) =>
    name.toLowerCase() === "ofc" ? "OFC" : name;

  const tabsData = useMemo(() => {
    return trades.map((trade) => {
      const tradeId = getTradeId(trade.name);
      const courseOptions = courses
        .filter((c) => c.tradeId?.includes(tradeId))
        .map((c) => ({ label: c.courseName, value: c._id }));

      return { trade, tradeId, courseOptions };
    });
  }, [trades, courses]);

  return (
    <div className="dashboard-outer-wrapper">
      <div className="dashboard-top-cards">
        <div className="stat-card total-courses">
          <img
            className="stat-card-img"
            src={dash_military}
            alt="Total Courses"
          />
          <div className="stat-card-info">
            <div className="label stat-label">
              Total <span>Courses</span>
            </div>
            <div className="value">{topStats.totalCourses}</div>
          </div>
        </div>
        <div className="stat-card trained">
          <img className="stat-card-img" src={dash_squad} alt="Trained" />
          <div className="stat-card-info">
            <div className="label stat-label">
              Agniveers <span>Trained</span>
            </div>
            <div className="value">{topStats.trained }</div>
          </div>
        </div>
        <div className="stat-card passed">
          <img className="stat-card-img" src={dash_military2} alt="Passed" />
          <div className="stat-card-info">
            <div className="label stat-label">
              Agniveers <span>Passed</span>
            </div>
            <div className="value">{topStats.passed }</div>
          </div>
        </div>
        <div className="stat-card failed">
          <img className="stat-card-img" src={dash_nowar} alt="Failed" />
          <div className="stat-card-info">
            <div className="label stat-label">
              Agniveers <span>Failed</span>
            </div>
            <div className="value">{topStats.failed}</div>
          </div>
        </div>
      </div>

      <TabList className="trade-tabs">
        {trades.map((trade, index) => (
          <Tab
            key={trade._id}
            className={`trade-tab ${
              index === selectedIndex ? "trade-tab-active" : ""
            }`}
            onClick={() => setActiveTrade(trade.name)}
          >
            {tradeNameFormatted(trade.name)}
          </Tab>
        ))}
      </TabList>

      <div className="dashboard-wrapper">
        <Tabs
          selectedIndex={selectedIndex}
          onSelect={(index) => setActiveTrade(trades[index].name)}
          // forceRenderTabPanel
          className="trade-tabs-tab-wrapper"
        >
          {tabsData.map(({ trade, tradeId, courseOptions }) => (
            <TabPanel key={trade._id}>
              <CourseSummaryContainer
                trade={trade.name}
                courseOptions={courseOptions}
                customStyles="no-top-borders"
                dashboardNavigation={true}
                dashboardSummaryData={tradeSummaryData}
                tradeId={tradeId}
                selectedCourseId={urlCourseId}
                enteredArmyNumber={urlArmyNumber}
              />
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardView;
