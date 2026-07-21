import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import GunnerWeeklyPerformaceSheet from "./gunnerWeeklyPerformaceSheet";
import * as weeklyActions from "../../../../store/weeklyPerformace/weeklyPerformaceActions";

const GunnerWeeklyPerformaceSheetContainer = (props) => {
  const { performance, actions } = props;

  useEffect(() => {
    actions.loadWeeklyPerformance();
  }, []);

  return (
    <GunnerWeeklyPerformaceSheet performance={performance} actions={actions} />
  );
};

const mapStateToProps = (state) => {
  return {
    performance: state.performance?.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(weeklyActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GunnerWeeklyPerformaceSheetContainer);
