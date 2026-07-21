import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCourses } from "../../../../store/master/masterActions";
import { getTradeId } from "../../../../helpers/masterLookup";
import { getCourseOptionsForTrade } from "../../../../helpers/courseOptionsHelper";

import OfcHome from "./ofcHome";

class OfcHomeContainer extends Component {
  componentDidMount() {
    const tradeId = getTradeId(this.props.activeTrade);

    this.props.fetchCourses(tradeId); // ← fetch courses on mount
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeTrade !== this.props.activeTrade) {
      const tradeId = getTradeId(this.props.activeTrade);
      this.props.fetchCourses(tradeId); // ← refetch when trade changes
    }
  }

  render() {
    const { summary, pending, activeTrade, courses, trades } = this.props;

    const tradeId = getTradeId(activeTrade);

    const courseOptions = getCourseOptionsForTrade(
      courses,
      trades,
      activeTrade
    );

    return (
      <OfcHome
        summary={summary}
        pending={pending}
        courseOptions={courseOptions}
        activeTrade={activeTrade}
        activeTab={activeTrade}

        tradeId={tradeId}               // ← PASS TRADE ID
      />
    );
  }
}

const mapStateToProps = (state) => ({
  summary: state.courseSummary.data,
  pending: state.courseSummary.pending,
  activeTrade: state.sidebar.activeTab,
  courses: state.master.courses,
  trades: state.master.trades,
});

export default connect(mapStateToProps, {  fetchCourses })(
  OfcHomeContainer
);