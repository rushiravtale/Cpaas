import React, { Component } from "react";
import { connect } from "react-redux";
import GunnerHome from "./gunnerHome";
import { fetchCourses } from "../../../../store/master/masterActions";
import { getTradeId } from "../../../../helpers/masterLookup";
import { getCourseOptionsForTrade } from "../../../../helpers/courseOptionsHelper";

class GunnerHomeContainer extends Component {
  componentDidMount() {
    const tradeId = getTradeId(this.props.activeTrade);

    // this.props.fetchSummary(null, null);
    this.props.fetchCourses(tradeId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeTrade !== this.props.activeTrade) {
      const tradeId = getTradeId(this.props.activeTrade);
      this.props.fetchCourses(tradeId);
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
      <GunnerHome
        summary={summary}
        pending={pending}
        courseOptions={courseOptions}
        activeTrade={activeTrade}
        activeTab={activeTrade}

        tradeId={tradeId}                   
      />
    );
  }
}

const mapStateToProps = (state) => (
  {
  summary: state.courseSummary.data,
  pending: state.courseSummary.pending,
  activeTrade: state.sidebar.activeTab,
  courses: state.master.courses,
  trades: state.master.trades,
});



export default connect(mapStateToProps, {  fetchCourses })(
  GunnerHomeContainer
);
