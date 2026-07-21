// import React from "react";
// import CourseSummaryContainer from "../../commonPages/courseSummary/courseSummaryContainer";

// const GunnerHome = ({
//   summary,
//   pending,
//   courseOptions,
//   activeTrade,
//   tradeId,
// }) => {
//   return (
//     <CourseSummaryContainer
//       apiSummary={summary}
//       apiPending={pending}
//       trade="GUNNER"
//       courseOptions={courseOptions}
//       activeTrade={activeTrade}
//       tradeId={tradeId} // ← PASS TO SUMMARY CONTAINER
//     />
//   );
// };

// export default GunnerHome;


// gunnerHome.jsx

import React from "react";
import CourseSummaryContainer from "../../commonPages/courseSummary/courseSummaryContainer";

const TradeHome = ({ summary, pending, courseOptions, activeTrade, tradeId,activeTab }) => {
  return (
    <CourseSummaryContainer
      // apiSummary={summary}
      apiPending={pending}
     trade={activeTab}

      courseOptions={courseOptions}
      tradeId={tradeId}
    />
  );
};

export default TradeHome;
