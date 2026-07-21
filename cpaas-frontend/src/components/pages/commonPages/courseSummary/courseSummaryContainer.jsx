// src/containers/courseSummary/CourseSummaryContainer.jsx
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CourseSummaryView from "./courseSummary";
import { getTradeName } from "../../../../helpers/masterLookup";
import {
  fetchCourseSummary,
  resetCourseSummary,
} from "../../../../store/courseSummary/courseSummaryActions";

const ALLOWED_SUMMARY_PATHS = ["/gunner", "/operator", "/ofc", "/driver"];

class CourseSummaryContainer extends Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(props.location?.search || "");
    const fromUrlCourse = params.get("course") || "";
    const fromUrlSquad = params.get("armyNo") || "";
    const fromUrlUnit = params.get("unit") || "";
    const fromUrlTradeId = params.get("tradeId") || "";

    console.log("get  squad from url is ", fromUrlSquad);

    this.state = {
      // selectedCourseId: props.dashboardNavigation ? "" : fromUrlCourse,
      selectedCourseId:
        props.selectedCourseId !== undefined
          ? props.selectedCourseId
          : props.dashboardNavigation
            ? ""
            : fromUrlCourse,
      armyNumber:
        props.enteredArmyNumber !== undefined
          ? props.enteredArmyNumber
          : props.dashboardNavigation
            ? ""
            : fromUrlSquad,
      unit:
        props.enteredUnit !== undefined
          ? props.enteredUnit
          : props.dashboardNavigation
            ? ""
            : fromUrlUnit,
      tradeId: props.dashboardNavigation
        ? props.tradeId || ""
        : fromUrlTradeId || "",
    };

    this.squadTypingTimer = null;
  }

  componentDidMount() {
    const { selectedCourseId, tradeId } = this.state;
    // Clear summary on initial mount
    this.props.resetCourseSummary();

    // Initial fetch if course exists
    if (selectedCourseId) {
      this.props.fetchCourseSummary(selectedCourseId, tradeId);
    }

    // Listen to route changes
    if (!this.props.dashboardNavigation) {
      this.unlisten = this.props.history.listen((location) => {
        const params = new URLSearchParams(location.search);
        const courseId = params.get("course") || "";
        const armyNo = params.get("armyNo") || "";
        const unitVal = params.get("unit") || "";
        const newTradeId = params.get("tradeId") || "";

        // Clear summary if tradeId or course changes
        if (
          newTradeId !== this.state.tradeId ||
          courseId !== this.state.selectedCourseId
        ) {
          this.props.resetCourseSummary();
        }

        this.setState(
          {
            selectedCourseId: courseId,
            armyNumber: armyNo,
            unit: unitVal,
            tradeId: newTradeId,
          },
          () => {
            if (ALLOWED_SUMMARY_PATHS.includes(location.pathname) && courseId) {
              this.props.fetchCourseSummary(courseId, newTradeId);
            }
          },
        );

        if (!ALLOWED_SUMMARY_PATHS.includes(location.pathname)) {
          this.props.resetCourseSummary();
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Handle tradeId prop changes (for dashboard navigation)
    if (prevProps.tradeId !== this.props.tradeId) {
      const newTradeId = this.props.tradeId || "";
      const currentCourseId = this.props.dashboardNavigation
        ? this.props.selectedCourseId || this.state.selectedCourseId
        : this.state.selectedCourseId;

      this.setState(
        {
          tradeId: newTradeId,
          // Only clear courseId if not in dashboard navigation mode or if courseId prop is not provided
          ...(this.props.dashboardNavigation && this.props.selectedCourseId
            ? {}
            : {
                selectedCourseId: "",
                armyNumber: "",
                unit: "",
              }),
        },
        () => {
          if (!this.props.dashboardNavigation) {
            this.updateUrl();
          }
          this.props.resetCourseSummary();

          // Refetch if course is selected and we're in dashboard navigation mode
          if (
            this.props.dashboardNavigation &&
            currentCourseId &&
            newTradeId
          ) {
            this.props.fetchCourseSummary(currentCourseId, newTradeId);
          }
        },
      );
    }

    // Handle selectedCourseId prop changes (for dashboard navigation)
    if (
      this.props.dashboardNavigation &&
      prevProps.selectedCourseId !== this.props.selectedCourseId
    ) {
      const courseId = this.props.selectedCourseId || "";
      const tradeId = this.props.tradeId || this.state.tradeId || "";

      this.setState({ selectedCourseId: courseId }, () => {
        if (courseId && tradeId) {
          this.props.fetchCourseSummary(courseId, tradeId);
        } else if (!courseId) {
          this.props.resetCourseSummary();
        }
      });
    }

    // Fetch summary if courseId changes in state (for non-dashboard navigation)
    if (
      !this.props.dashboardNavigation &&
      prevState.selectedCourseId !== this.state.selectedCourseId &&
      this.state.selectedCourseId
    ) {
      const effectiveTradeId = this.state.tradeId || this.props.tradeId || null;
      this.props.fetchCourseSummary(this.state.selectedCourseId, effectiveTradeId);
    }

    // Reset if courseId cleared
    if (prevState.selectedCourseId && !this.state.selectedCourseId) {
      this.props.resetCourseSummary();
    }
  }

  componentWillUnmount() {
    this.unlisten?.();
    clearTimeout(this.squadTypingTimer);

    const nextPath = this.props.history.location.pathname;

    if (!ALLOWED_SUMMARY_PATHS.includes(nextPath)) {
      this.props.resetCourseSummary();
    }
  }

  updateUrl = () => {
    if (this.props.dashboardNavigation) return;

    const { selectedCourseId, armyNumber, unit } = this.state; // Fixed: Use armyNumber from state, likely mismatch in orig code

    const params = new URLSearchParams();
    if (selectedCourseId) params.set("course", selectedCourseId);
    if (armyNumber) params.set("armyNo", armyNumber);
    if (unit) params.set("unit", unit);
    if (this.props.tradeId) params.set("tradeId", this.props.tradeId);

    const newSearch = params.toString();
    const newUrl = `${this.props.location.pathname}${
      newSearch ? `?${newSearch}` : ""
    }`;

    if (
      this.props.location.search !== `?${newSearch}` &&
      newSearch !== this.props.location.search.slice(1)
    ) {
      this.props.history.replace(newUrl);
    }
  };

  handleChange = (field, value) => {
    // if (field === "selectedCourse") {
    //   const courseId = value ? value.value : "";
    //   this.setState({ selectedCourseId: courseId }, () => {
    //     if (!this.props.dashboardNavigation) this.updateUrl();
    //   });
    //   return;
    // }

    if (field === "selectedCourse") {
      const courseId = value ? value.value : "";
      const effectiveTradeId = this.props.dashboardNavigation
        ? (this.props.tradeId || null)
        : (this.state.tradeId || this.props.tradeId || null);
      
      this.setState({ selectedCourseId: courseId }, () => {
        // Always update URL
        const params = new URLSearchParams(window.location.search);
        if (courseId) params.set("course", courseId);
        else params.delete("course");
        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}?${params.toString()}`,
        );
        if (!this.props.dashboardNavigation) this.updateUrl();
        
        // Fetch course summary when course is selected
        if (courseId) {
          // In dashboard navigation mode, fetch immediately
          // In non-dashboard mode, componentDidUpdate will also handle it (but this ensures immediate fetch)
          this.props.fetchCourseSummary(courseId, effectiveTradeId);
        } else {
          this.props.resetCourseSummary();
        }
      });
      return;
    }

    if (field === "armyNumber") {
      this.setState({ armyNumber: value }, () => {
        // Always update URL
        const params = new URLSearchParams(window.location.search);
        if (value) params.set("armyNo", value);
        else params.delete("armyNo");

        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}?${params.toString()}`,
        );
        if (!this.props.dashboardNavigation) this.updateUrl();
      });
    }

    if (field === "unit") {
      this.setState({ unit: value }, () => {
        // Always update URL
        const params = new URLSearchParams(window.location.search);
        if (value) params.set("unit", value);
        else params.delete("unit");

        window.history.replaceState(
          {},
          "",
          `${window.location.pathname}?${params.toString()}`,
        );
        if (!this.props.dashboardNavigation) this.updateUrl();
      });
    }
  };

  handleSubmit = () => {
    if (!this.props.dashboardNavigation) this.updateUrl();
  };

  getSelectedCourseOption = () => {
    console.log("sonali call");
    const { courseOptions = [] } = this.props;
    console.log("courseOptions:", courseOptions);
    const { selectedCourseId } = this.state;
    console.log("selectedCourseId:", selectedCourseId);
    if (!selectedCourseId) return null;

    return (
      courseOptions.find(
        (opt) => String(opt.value) === String(selectedCourseId),
      ) || null
    );
  };

  render() {
    const {
      courseOptions = [],
      tradeId: propTradeId,
      dashboardSummaryData = {},
      courseSummary,
      trade,
      customStyles,
      dashboardNavigation,
    } = this.props;

    const effectiveTradeId = dashboardNavigation
      ? propTradeId
      : this.state.tradeId || propTradeId;

    const tradeName = getTradeName(effectiveTradeId) || trade || "";
    const summaryData = courseSummary?.summary || {};

    return (
      <CourseSummaryView
        trade={tradeName}
        courseOptions={courseOptions}
        summaryData={summaryData}
        selectedCourse={this.getSelectedCourseOption()}
        selectedCourseId={this.state.selectedCourseId}
        armyNumber={this.state.armyNumber}
        unit={this.state.unit}
        tradeId={effectiveTradeId}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        customStyles={customStyles}
        dashboardSummaryData={dashboardSummaryData}
        dashboardNavigation={dashboardNavigation}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  courseSummary: state.courseSummary,
});

const mapDispatchToProps = {
  fetchCourseSummary,
  resetCourseSummary,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CourseSummaryContainer));
