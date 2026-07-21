import React from "react";
import CourseSummaryContainer from "../../commonPages/courseSummary/courseSummaryContainer";

const DriverHome = ({
  summary,
  pending,
  courseOptions,
  activeTrade,
  activeTab,
  tradeId,
}) => {
  return (
    <CourseSummaryContainer
      // apiSummary={summary}
      apiPending={pending}
     trade={activeTab}
      courseOptions={courseOptions}
      activeTrade={activeTrade}
      tradeId={tradeId}
    />
  );
};

export default DriverHome;
