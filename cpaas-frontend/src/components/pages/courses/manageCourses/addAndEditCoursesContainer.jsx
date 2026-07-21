// AddAndEditCourseContainer.js

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getCourseById,
  addCourse,
  updateCourse
} from "../../../../store/course/courseActions";
import { fetchUserTrades } from "../../../../store/master/masterActions";
import AddAndEditCourseView from "./addAndEditCourseView";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";

const AddAndEditCourseContainer = (props) => {
  const location = useLocation();
  const [modeFlag, setModeFlag] = useState("add"); 

  useEffect(() => {
    // Changes whenever route changes: add → edit or edit → add
    if (location.pathname.includes("/edit/")) {
      setModeFlag("edit");
    } else {
      setModeFlag("add");
    }
  }, [location.pathname]);

  return (
    <AddAndEditCourseView
      key={modeFlag}   
      {...props}
      modeFlag={modeFlag}
    />
  );
};

const mapStateToProps = (state) => ({
  selectedCourse: state.course.selectedCourse,
  trades: state.master.trades,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getCourseById,
      addCourse,
      updateCourse,
      fetchUserTrades,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAndEditCourseContainer);
