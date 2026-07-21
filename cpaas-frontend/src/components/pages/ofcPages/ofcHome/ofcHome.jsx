import React from "react";
import CourseSummaryContainer from "../../commonPages/courseSummary/courseSummaryContainer";

const OfcHome = ({ summary, pending, courseOptions, activeTrade, tradeId,activeTab }) => {
  return (
    <CourseSummaryContainer
      apiSummary={summary}
      apiPending={pending}
        trade={activeTab}

      courseOptions={courseOptions}
      activeTrade={activeTrade}
      tradeId={tradeId}
    />
  );
};

export default OfcHome;
