// import React from "react";
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
// import FortnightlyPerformanceSheet from "./FortnightlyPerformanceSheet";

// import {
//   loadFortnightlyPerformance,
//   createFortnightlyPerformance,
// } from "../../../../store/fortnightlyPerformance/FortnightlyPerformanceActions";

// import { getSingleAgniveer } from "../../../../store/tradeUsers/tradeUserActions";

// class FortnightlyPerformanceSheetContainer extends React.Component {
//   constructor(props) {
//     super(props);

//     const { match, location } = props;

//     let agniveerId = match?.params?.agniveerId;
//     if (!agniveerId) {
//       const parts = location.pathname.split("/");
//       agniveerId = parts[parts.length - 1];
//     }

//     const query = new URLSearchParams(location.search);
//     const courseId = query.get("course");

//     this.state = {
//       agniveerId,
//       courseId,
//       performanceData: null,
//       isEditMode: false,
//       existingId: null,
//     };
//   }

//   componentDidMount() {
//     const { agniveerId, courseId } = this.state;

//     if (agniveerId) {
//       this.props.getSingleAgniveer(agniveerId);
//     }

//     this.loadPerformance();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevProps.performance !== this.props.performance) {
//       this.populatePerformance(this.props.performance);
//     }

//     if (prevProps.location.search !== this.props.location.search) {
//       const query = new URLSearchParams(this.props.location.search);
//       const courseId = query.get("course");

//       if (courseId !== this.state.courseId) {
//         this.setState({ courseId }, () => this.loadPerformance());
//       }
//     }

//     if (prevProps.editAgniveer !== this.props.editAgniveer) {
//       this.loadPerformance();
//     }
//   }

//   loadPerformance = () => {
//     const { agniveerId, courseId } = this.state;

//     const resolvedAgniveerId =
//       agniveerId || this.props.editAgniveer?._id;

//     const resolvedCourseId =
//       courseId || this.props.editAgniveer?.courseName?.[0]?._id;

//     if (resolvedAgniveerId && resolvedCourseId) {
//       this.props.loadFortnightlyPerformance(
//         resolvedAgniveerId,
//         resolvedCourseId
//       );
//     }
//   };

//   populatePerformance = (data) => {
//     if (!data) return;

//     this.setState({
//       performanceData: data,
//       isEditMode: true,
//       existingId: data?._id,
//     });
//   };

//   updateField = (key, value) => {
//     this.setState((prev) => ({
//       performanceData: {
//         ...prev.performanceData,
//         [key]: value,
//       },
//     }));
//   };

//   onSubmit = () => {
//     const { performanceData, isEditMode, existingId, agniveerId, courseId } =
//       this.state;

//     const resolvedAgniveerId =
//       agniveerId || this.props.editAgniveer?._id;

//     const resolvedCourseId =
//       courseId || this.props.editAgniveer?.courseName?.[0]?._id;

//     if (!resolvedAgniveerId || !resolvedCourseId) {
//       alert("Agniveer ID or Course ID missing!");
//       return;
//     }

//     const payload = {
//       ...performanceData,
//       agniveerId: resolvedAgniveerId,
//       courseId: resolvedCourseId,
//     };

//     this.props.createFortnightlyPerformance(payload, () => {
//       console.log("Saved Successfully");
//     });
//   };

//   render() {
//     const { performanceData } = this.state;

//     return (
//       <FortnightlyPerformanceSheet
//         performance={performanceData}
//         updateField={this.updateField}
//         onSubmit={this.onSubmit}
//       />
//     );
//   }
// }

// const mapStateToProps = (state) => (
//   console.log("redux state ",state),
//   {
//   performance: state.fortnightlyPerformance?.data,
//   editAgniveer: state.tradeUsers?.editAgniveer,
// });

// export default connect(mapStateToProps, {
//   createFortnightlyPerformance,
//   loadFortnightlyPerformance,
//   getSingleAgniveer,
// })(withRouter(FortnightlyPerformanceSheetContainer));

// import React from "react";
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
// import FortnightlyPerformanceSheet from "./FortnightlyPerformanceSheet";

// import {
//   loadFortnightlyPerformance,
//   createFortnightlyPerformance,
// } from "../../../../store/fortnightlyPerformance/FortnightlyPerformanceActions";

// import { getSingleAgniveer } from "../../../../store/tradeUsers/tradeUserActions";

// const CLEAN_KEYS = [
//   "physicalTraining",
//   "gamesPerformance",
//   "motivationLevel",
//   "militaryBearing",
//   "situationalAwareness",
//   "classPerformance",
//   "morale",
//   "decisionMaking",
//   "resilience",
//   "integrity",
//   "problemSolving",
// ];

// class FortnightlyPerformanceSheetContainer extends React.Component {
//   constructor(props) {
//     super(props);

//     const { match, location } = props;

//     let agniveerId = match?.params?.agniveerId;
//     if (!agniveerId) {
//       const parts = location.pathname.split("/");
//       agniveerId = parts[parts.length - 1];
//     }

//     const query = new URLSearchParams(location.search);
//     const courseId = query.get("course");

//     this.state = {
//       agniveerId,
//       courseId,
//       performanceData: {},
//     };
//   }

//   componentDidMount() {
//     const { agniveerId } = this.state;

//     if (agniveerId) {
//       this.props.getSingleAgniveer(agniveerId);
//     }

//     this.loadPerformance();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { agniveerId, courseId } = this.state;
//     const { editAgniveer } = this.props;

//     // Re-load performance if agniveerId or courseId changes or editAgniveer changes
//     if (
//       prevState.agniveerId !== agniveerId ||
//       prevState.courseId !== courseId ||
//       prevProps.editAgniveer !== editAgniveer
//     ) {
//       this.loadPerformance();
//     }

//     // Populate performanceData when redux data changes
//     if (prevProps.performance !== this.props.performance) {
//       this.populatePerformance(this.props.performance);
//     }

//     // Update state from editAgniveer if needed
//     if (prevProps.editAgniveer !== editAgniveer && editAgniveer) {
//       this.setState({
//         agniveerId: this.state.agniveerId || editAgniveer._id,
//         courseId:
//           this.state.courseId || editAgniveer?.courseName?.[0]?._id,
//       });
//     }

//     // Update courseId if location.search changes
//     if (prevProps.location.search !== this.props.location.search) {
//       const query = new URLSearchParams(this.props.location.search);
//       const newCourseId = query.get("course");
//       if (newCourseId && newCourseId !== courseId) {
//         this.setState({ courseId: newCourseId });
//       }
//     }
//   }

//   loadPerformance = () => {
//     let { agniveerId, courseId } = this.state;
//     const { editAgniveer } = this.props;

//     // Fallback to editAgniveer if missing
//     agniveerId = agniveerId || editAgniveer?._id;
//     courseId = courseId || editAgniveer?.courseName?.[0]?._id;

//     if (agniveerId && courseId) {
//       this.props.loadFortnightlyPerformance(agniveerId, courseId);
//     }
//   };

//   populatePerformance = (data) => {
//     if (!data) return;

//     const cleaned = {};

//     CLEAN_KEYS.forEach((k) => {
//       if (data[k]) cleaned[k] = data[k];
//     });

//     cleaned.sequence = data.sequence;

//     this.setState({ performanceData: cleaned });
//   };

//   updateField = (key, value) => {
//     this.setState((prev) => ({
//       performanceData: {
//         ...prev.performanceData,
//         [key]: value,
//       },
//     }));
//   };

//   computeTotal = (data) => {
//     return CLEAN_KEYS.reduce((sum, k) => sum + (data[k]?.score || 0), 0);
//   };

//   onSubmit = () => {
//     let { performanceData, agniveerId, courseId } = this.state;
//     const { editAgniveer } = this.props;

//     // Fallback if missing
//     agniveerId = agniveerId || editAgniveer?._id;
//     courseId = courseId || editAgniveer?.courseName?.[0]?._id;

//     if (!agniveerId || !courseId) {
//       alert("Agniveer ID or Course ID missing!");
//       return;
//     }

//     const finalPayload = {
//       agniveerId,
//       courseId,
//       ...performanceData,
//       totalFortnightPerformance: this.computeTotal(performanceData),
//     };

//     this.props.createFortnightlyPerformance(finalPayload, agniveerId, courseId);
//   };

//   render() {
//     const { performanceData } = this.state;

//     return (
//       <FortnightlyPerformanceSheet
//         performance={performanceData}
//         updateField={this.updateField}
//         onSubmit={this.onSubmit}
//       />
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   performance: state.fortnightlyPerformance?.data,
//   editAgniveer: state.tradeUsers?.editAgniveer,
// });

// export default connect(mapStateToProps, {
//   createFortnightlyPerformance,
//   loadFortnightlyPerformance,
//   getSingleAgniveer,
// })(withRouter(FortnightlyPerformanceSheetContainer));

// import React from "react";
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
// import FortnightlyPerformanceSheet from "./FortnightlyPerformanceSheet";

// import {
//   loadFortnightlyPerformance,
//   createFortnightlyPerformance,
// } from "../../../../store/fortnightlyPerformance/FortnightlyPerformanceActions";

// import { getSingleAgniveer } from "../../../../store/tradeUsers/tradeUserActions";

// const CLEAN_KEYS = [
//   "physicalTraining",
//   "gamesPerformance",
//   "motivationLevel",
//   "militaryBearing",
//   "situationalAwareness",
//   "classPerformance",
//   "morale",
//   "decisionMaking",
//   "resilience",
//   "integrity",
//   "problemSolving",
// ];

// class FortnightlyPerformanceSheetContainer extends React.Component {
//   state = {
//     agniveerId: null,
//     courseId: null,
//     performanceData: {},
//   };

//   componentDidMount() {
//     const { match, location } = this.props;

//     const agniveerId =
//       match?.params?.agniveerId ||
//       location.pathname.split("/").pop();

//     const query = new URLSearchParams(location.search);
//     const courseId = query.get("course");

//     this.setState({ agniveerId, courseId }, () => {
//       if (agniveerId) this.props.getSingleAgniveer(agniveerId);
//       this.loadPerformance();
//     });
//   }

//   componentDidUpdate(prevProps) {
//     if (prevProps.performance !== this.props.performance) {
//       this.populatePerformance(this.props.performance);
//     }
//   }

//   loadPerformance = () => {
//     const { agniveerId, courseId } = this.state;
//     if (agniveerId && courseId) {
//       this.props.loadFortnightlyPerformance(agniveerId, courseId);
//     }
//   };

//   populatePerformance = (data) => {
//     if (!data) return;

//     const cleaned = {};
//     CLEAN_KEYS.forEach((k) => {
//       if (data[k]) cleaned[k] = data[k];
//     });

//     cleaned.sequence = data.sequence;
//     this.setState({ performanceData: cleaned });
//   };

//   updateField = (key, value) => {
//     this.setState((prev) => ({
//       performanceData: {
//         ...prev.performanceData,
//         [key]: value,
//       },
//     }));
//   };

//   computeTotal = (data) =>
//     CLEAN_KEYS.reduce((sum, k) => sum + (data[k]?.score || 0), 0);

//   normalizePerformanceData = () => {
//     const normalized = {};

//     CLEAN_KEYS.forEach((key) => {
//       normalized[key] = this.state.performanceData[key] || {
//         score: 0,
//         remark: "low",
//       };
//     });

//     return normalized;
//   };

//   onSubmit = () => {
//     const { agniveerId, courseId } = this.state;
//     if (!agniveerId || !courseId) {
//       alert("Agniveer ID or Course ID missing!");
//       return;
//     }

//     const normalizedData = this.normalizePerformanceData();

//     const finalPayload = {
//       agniveerId,
//       courseId,
//       ...normalizedData,
//       totalFortnightPerformance: this.computeTotal(normalizedData),
//     };

//     this.props.createFortnightlyPerformance(
//       finalPayload,
//       agniveerId,
//       courseId
//     );
//   };

//   render() {
//     return (
//       <FortnightlyPerformanceSheet
//         performance={this.state.performanceData}
//         updateField={this.updateField}
//         onSubmit={this.onSubmit}
//       />
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   performance: state.fortnightlyPerformance?.data,
//   editAgniveer: state.tradeUsers?.editAgniveer,
// });

// export default connect(mapStateToProps, {
//   createFortnightlyPerformance,
//   loadFortnightlyPerformance,
//   getSingleAgniveer,
// })(withRouter(FortnightlyPerformanceSheetContainer));

// FortnightlyPerformanceSheetContainer.js (ONLY THIS FILE NEEDS CHANGE)

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FortnightlyPerformanceSheet from "./FortnightlyPerformanceSheet";
import {
  loadFortnightlyPerformance,
  createFortnightlyPerformance,
} from "../../../../store/fortnightlyPerformance/FortnightlyPerformanceActions";
import { getSingleAgniveer } from "../../../../store/tradeUsers/tradeUserActions";
import {
  FLOW_STEPS,
  getNextRoute,
  getListRoute,
} from "../../../../helpers/flowHelpers";
import { IoIosClose } from "react-icons/io";

const CLEAN_KEYS = [
  "physicalTraining",
  "gamesPerformance",
  "motivationLevel",
  "militaryBearing",
  "situationalAwareness",
  "classPerformance",
  "morale",
  "decisionMaking",
  "resilience",
  "integrity",
  "problemSolving",
];

class FortnightlyPerformanceSheetContainer extends React.Component {
  constructor(props) {
    super(props);
    const { match, location } = props;
    let agniveerId = match?.params?.agniveerId;
    if (!agniveerId) {
      const parts = location.pathname.split("/");
      agniveerId = parts[parts.length - 1];
    }
    const query = new URLSearchParams(location.search);
    const courseId = query.get("course");

    this.state = {
      agniveerId,
      courseId,
      performanceData: this.getDefaultPerformanceData(),
    };
  }

  getDefaultPerformanceData = () => {
    const defaults = {};
    CLEAN_KEYS.forEach((key) => {
      defaults[key] = {
        score: 0,
        remark: "low",
        total: 10,
      };
    });
    defaults.sequence = "0";
    return defaults;
  };

  componentDidMount() {
    const { agniveerId } = this.state;
    if (agniveerId) {
      this.props.getSingleAgniveer(agniveerId);
    }
    this.loadPerformance();
  }

  componentDidUpdate(prevProps, prevState) {
    const { agniveerId, courseId } = this.state;
    const { editAgniveer } = this.props;

    if (
      prevState.agniveerId !== agniveerId ||
      prevState.courseId !== courseId ||
      prevProps.editAgniveer !== editAgniveer
    ) {
      this.loadPerformance();
    }

    if (prevProps.performance !== this.props.performance) {
      this.populatePerformance(this.props.performance);
    }

    if (prevProps.editAgniveer !== editAgniveer && editAgniveer) {
      this.setState({
        agniveerId: this.state.agniveerId || editAgniveer._id,
        courseId: this.state.courseId || editAgniveer?.courseName?.[0]?._id,
      });
    }

    if (prevProps.location.search !== this.props.location.search) {
      const query = new URLSearchParams(this.props.location.search);
      const newCourseId = query.get("course");
      if (newCourseId && newCourseId !== courseId) {
        this.setState({ courseId: newCourseId });
      }
    }
  }

  loadPerformance = () => {
    let { agniveerId, courseId } = this.state;
    const { editAgniveer } = this.props;

    agniveerId = agniveerId || editAgniveer?._id;
    courseId = courseId || editAgniveer?.courseName?.[0]?._id;

    if (agniveerId && courseId) {
      this.props.loadFortnightlyPerformance(agniveerId, courseId);
    }
  };

  populatePerformance = (data) => {
    const performance = this.getDefaultPerformanceData();

    if (data) {
      CLEAN_KEYS.forEach((key) => {
        if (data[key]) {
          performance[key] = {
            score: data[key].score ?? 0,
            remark: data[key].remark ?? "low",
            total: data[key].total ?? 10,
          };
        }
      });

      performance.sequence = data.sequence ?? performance.sequence;
      performance.totalFortnightPerformance =
        data.totalFortnightPerformance ?? 0;
    }

    this.setState({ performanceData: performance });
  };

  updateField = (key, value) => {
    this.setState((prev) => ({
      performanceData: {
        ...prev.performanceData,
        [key]: {
          ...prev.performanceData[key],
          ...value,
          total: 10,
        },
      },
    }));
  };

  computeTotal = (data) => {
    return CLEAN_KEYS.reduce((sum, k) => sum + (data[k]?.score || 0), 0);
  };

  onSubmit = () => {
    let { performanceData, agniveerId, courseId } = this.state;
    const { editAgniveer } = this.props;

    agniveerId = agniveerId || editAgniveer?._id;
    courseId = courseId || editAgniveer?.courseName?.[0]?._id;

    if (!agniveerId || !courseId) {
      alert("Agniveer ID or Course ID missing!");
      return;
    }

    const finalPayload = {
      agniveerId,
      courseId,
      ...performanceData,
      totalFortnightPerformance: this.computeTotal(performanceData),
    };

    this.props.createFortnightlyPerformance(
      finalPayload,
      agniveerId,
      courseId,
      () => {
        const flowMode = this.props.location.state?.flowMode;
        if (flowMode) {
          const tradeIdObj = this.props.editAgniveer?.tradeId?.[0];
          const tradeName = tradeIdObj?.label || tradeIdObj?.name;

          if (tradeName) {
            // End of flow, go to list
            const listRoute = getListRoute(tradeName);
            this.props.history.push(listRoute);
          }
        }
      },
    );
  };

  handleClose = () => {
    const tradeIdObj = this.props.editAgniveer?.tradeId?.[0];
    const tradeName = tradeIdObj?.label || tradeIdObj?.name;
    const listRoute = getListRoute(tradeName);
    this.props.history.push(listRoute);
  };

  render() {
    const { performanceData } = this.state;
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px 20px",
          }}
        >
          {this.props.location.state?.flowMode && (
            <div
              onClick={this.handleClose}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#d32f2f",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              }}
              title="Close Flow"
            >
              <IoIosClose size={28} />
            </div>
          )}
        </div>
        <FortnightlyPerformanceSheet
          performance={performanceData}
          updateField={this.updateField}
          onSubmit={this.onSubmit}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  performance: state.fortnightlyPerformance?.data,
  editAgniveer: state.tradeUsers?.editAgniveer,
});

export default connect(mapStateToProps, {
  createFortnightlyPerformance,
  loadFortnightlyPerformance,
  getSingleAgniveer,
})(withRouter(FortnightlyPerformanceSheetContainer));
