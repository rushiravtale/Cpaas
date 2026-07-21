// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import BasicInfoView from "./BasicInfoView";
// import { withRouter } from "react-router-dom";
// import { createAgniveer ,getSingleAgniveer} from "../../../../store/tradeUsers/tradeUserActions";
// import {
//   getTradeName,
//   getTradeId,
//   getCourseName,
//   getCourseId,
// } from "../../../../helpers/masterLookup";

// class BasicInfoContainer extends Component {
//   state = {
//     mode: "add",
//     loading: false,
//     initialData: {},
//   };

//   componentDidMount() {
//     this.determineMode();
//   }

// // componentDidUpdate(prevProps) {
// //   if (
// //     this.props.location.pathname !== prevProps.location.pathname ||
// //     this.props.location.search !== prevProps.location.search
// //   ) {
// //     this.determineMode();
// //   }
// // }

// componentDidUpdate(prevProps) {
//   // Already checking URL changes
//   if (
//     this.props.location.pathname !== prevProps.location.pathname ||
//     this.props.location.search !== prevProps.location.search
//   ) {
//     this.determineMode();
//   }

//   // NEW: Detect when Redux has fetched the edit user
//   if (
//     this.props.editAgniveer &&
//     this.props.editAgniveer !== prevProps.editAgniveer
//   ) {
//     const ag = this.props.editAgniveer;

//     this.setState({
//       initialData: {
//         name: ag.name || "",
//         armyNo: ag.armyNumber || "",
//         rank: ag.rank || "",
//         trade: ag.tradeId?.[0]?.label || "",
//         tradeId: ag.tradeId?.[0]?._id || "",
//         squadNo: ag.squadNumber || "",
//         civilEdn: ag.civilEdn || "",
//         qualification: ag.anyOtherQualification || "",
//         fatherName: ag.fatherName || "",
//         contactNo: ag.contactNumber || "",
//         address: ag.address || "",
//         course: ag.courseName?.[0]?.courseName || "",
//         courseId: ag.courseName?.[0]?._id || "",
//       },
//     });
//   }
// }

// //   determineMode = () => {
// //     const { location } = this.props;

// //     const params = new URLSearchParams(location.search);
// //     const courseId = params.get("course");
// //     const tradeId = params.get("tradeId");
// //     const squad = params.get("squad");

// //     const pathParts = location.pathname.split("/");
// //     const last = pathParts[pathParts.length - 1];
// //     const secondLast = pathParts[pathParts.length - 2];

// //     if (last === "add") {
// //       const tradeName = getTradeName(tradeId);
// //       const courseName = getCourseName(courseId);

// //       this.setState({
// //         mode: "add",
// //         initialData: {
// //           trade: tradeName || "",
// //           tradeId: tradeId || "",
// //           course: courseName || "",
// //           courseId: courseId || "",
// //           squadNo: squad || "",
// //         },
// //       });
// //       return;
// //     }

// //     if (this.props.match.params.id && secondLast === "edit") {
// //          const armyNumber = this.props.match.params.id;
// //       this.setState({ mode: "edit" });
// //        this.props.getSingleAgniveer(armyNumber);
// //       return;
// //     }

// //     this.setState({ mode: "add", initialData: {} });
// //   };

// determineMode = () => {
//   const { location, match } = this.props;

//   const params = new URLSearchParams(location.search);
//   const courseId = params.get("course");
//   const tradeId = params.get("tradeId");
//   const squad = params.get("squad");

//   const pathParts = location.pathname.split("/");
//   const last = pathParts[pathParts.length - 1];
//   const secondLast = pathParts[pathParts.length - 2];

//   // ---------------- ADD MODE ----------------
//   if (last === "add") {
//     const tradeName = getTradeName(tradeId);
//     const courseName = getCourseName(courseId);

//     this.setState({
//       mode: "add",
//       initialData: {
//         trade: tradeName || "",
//         tradeId: tradeId || "",
//         course: courseName || "",
//         courseId: courseId || "",
//         squadNo: squad || "",
//       },
//     });
//     return;
//   }

//   // ---------------- EDIT MODE ----------------
//   if (match.params.id && secondLast === "edit") {
//     const armyNumber = match.params.id;   // <--- EXTRACTED HERE

//     this.setState({ mode: "edit" });

//     // Call the API to fetch agniveer details
//     this.props.getSingleAgniveer(armyNumber);

//     return;
//   }

//   // Default fallback
//   this.setState({ mode: "add", initialData: {} });
// };

//   handleSubmit = (formData) => {
//   const { token, createAgniveer } = this.props;
// const { mode } = this.state;

//     const payload = {
//       name: formData.name,
//       armyNumber: formData.armyNo,
//       rank: formData.rank,
//       tradeId: [getTradeId(formData.trade)],
//       squadNumber: formData.squadNo,
//       civilEdn: formData.civilEdn,
//       anyOtherQualification: formData.qualification,
//       fatherName: formData.fatherName,
//       contactNumber: formData.contactNo,
//       address: formData.address,
//       courseName: [getCourseId(formData.course)],
//     };

//     if (mode === "add") {
//       createAgniveer(payload, token);
//     } else {
//       // Update logic can be added later if needed
//       console.warn("Edit mode not fully implemented yet");
//     }
//   };

//   render() {
//     const { mode, loading, initialData } = this.state;

//     return (
//       <BasicInfoView
//         mode={mode}
//         loading={loading}
//         initialData={initialData}
//         onSubmit={this.handleSubmit}
//       />
//     );
//   }
// }

// const mapStateToProps = (state) => (
//     console.log("redux state in basic info container is ",state),
//     {
//   token: state.auth.token,
//   master: state.master,
//   editAgniveer: state.tradeUsers.editAgniveer,
// loadingEditAgniveer: state.tradeUsers.loadingEditAgniveer,

// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({ createAgniveer,getSingleAgniveer }, dispatch);

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(BasicInfoContainer)
// );

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import BasicInfoView from "./BasicInfoView";
// import { withRouter } from "react-router-dom";
// import { createAgniveer, getSingleAgniveer, updateAgniveer } from "../../../../store/tradeUsers/tradeUserActions";
// import {
//   getTradeName,
//   getTradeId,
//   getCourseName,
//   getCourseId,
// } from "../../../../helpers/masterLookup";

// class BasicInfoContainer extends Component {
//   state = {
//     mode: "add",
//     loading: false,
//     initialData: {},
//   };

//   componentDidMount() {
//     this.determineMode();
//   }

//   componentDidUpdate(prevProps) {
//     if (
//       this.props.location.pathname !== prevProps.location.pathname ||
//       this.props.location.search !== prevProps.location.search
//     ) {
//       this.determineMode();
//     }

//     if (
//       this.props.editAgniveer &&
//       this.props.editAgniveer !== prevProps.editAgniveer
//     ) {
//       const ag = this.props.editAgniveer;

//       this.setState({
//         initialData: {
//           name: ag.name || "",
//           armyNo: ag.armyNumber || "",
//           rank: ag.rank || "",
//           trade: ag.tradeId?.[0]?.label || "",
//           tradeId: ag.tradeId?.[0]?._id || "",
//           squadNo: ag.squadNumber || "",
//           civilEdn: ag.civilEdn || "",
//           qualification: ag.anyOtherQualification || "",
//           fatherName: ag.fatherName || "",
//           contactNo: ag.contactNumber || "",
//           address: ag.address || "",
//           course: ag.courseName?.[0]?.courseName || "",
//           courseId: ag.courseName?.[0]?._id || "",
//           agniveerId: ag._id,
//         },
//       });
//     }
//   }

//   determineMode = () => {
//     const { location, match } = this.props;

//     const params = new URLSearchParams(location.search);
//     const courseId = params.get("course");
//     const tradeId = params.get("tradeId");
//     const squad = params.get("squad");

//     const pathParts = location.pathname.split("/");
//     const last = pathParts[pathParts.length - 1];
//     const secondLast = pathParts[pathParts.length - 2];

//     if (last === "add") {
//       this.setState({
//         mode: "add",
//         initialData: {
//           trade: getTradeName(tradeId) || "",
//           tradeId: tradeId || "",
//           course: getCourseName(courseId) || "",
//           courseId: courseId || "",
//           squadNo: squad || "",
//         },
//       });
//       return;
//     }

//     if (match.params.id && secondLast === "edit") {
//       const armyNumber = match.params.id;
//       this.setState({ mode: "edit" });

//       this.props.getSingleAgniveer(armyNumber);

//       return;
//     }

//     this.setState({ mode: "add", initialData: {} });
//   };

//   handleSubmit = (formData) => {
//     const { token, createAgniveer, updateAgniveer } = this.props;
//     const { mode, initialData } = this.state;

//     const payload = {
//       name: formData.name,
//       armyNumber: formData.armyNo,
//       rank: formData.rank,
//       tradeId: [getTradeId(formData.trade)],
//       squadNumber: formData.squadNo,
//       civilEdn: formData.civilEdn,
//       anyOtherQualification: formData.qualification,
//       fatherName: formData.fatherName,
//       contactNumber: formData.contactNo,
//       address: formData.address,
//       courseName: [getCourseId(formData.course)],
//     };

//     if (mode === "add") {
//       createAgniveer(payload, token);
//     } else {
//       const updatePayload = {
//         ...payload,
//         agniveerId: initialData.agniveerId,  // REQUIRED for update
//       };

//       updateAgniveer(updatePayload, token);
//     }
//   };

//   render() {
//     const { mode, loading, initialData } = this.state;

//     return (
//       <BasicInfoView
//         mode={mode}
//         loading={loading}
//         initialData={initialData}
//         onSubmit={this.handleSubmit}
//       />
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   token: state.auth.token,
//   master: state.master,
//   editAgniveer: state.tradeUsers.editAgniveer,
//   loadingEditAgniveer: state.tradeUsers.loadingEditAgniveer,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({ createAgniveer, getSingleAgniveer, updateAgniveer }, dispatch);

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(BasicInfoContainer)
// );

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BasicInfoView from "./BasicInfoView";
import { withRouter } from "react-router-dom";

import {
  createAgniveer,
  getSingleAgniveer,
  updateAgniveer,
} from "../../../../store/tradeUsers/tradeUserActions";
import { fetchCourses } from "../../../../store/master/masterActions";

import { getTradeName, getCourseName } from "../../../../helpers/masterLookup";

import { getCourseOptionsForTrade } from "../../../../helpers/courseOptionsHelper";
import {
  FLOW_STEPS,
  getNextRoute,
  getListRoute,
} from "../../../../helpers/flowHelpers";
import { IoIosClose } from "react-icons/io";

class BasicInfoContainer extends Component {
  state = {
    mode: "add",
    loading: false,
    initialData: {},
    tradeIdFromUrl: "",
    courseIdFromUrl: "",
  };

  componentDidMount() {
    this.determineMode();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.location.pathname !== prevProps.location.pathname ||
      this.props.location.search !== prevProps.location.search
    ) {
      this.determineMode();
    }

    if (this.props.editAgniveer !== prevProps.editAgniveer) {
      const ag = this.props.editAgniveer;

      this.setState({
        initialData: {
          name: ag?.name,
          armyNo: ag?.armyNumber,
          rank: ag?.rank,
          unit: ag?.unit,
          trade: ag?.tradeId?.[0]?.label || "",
          tradeId: ag?.tradeId?.[0]?._id || "",
          squadNo: ag?.squadNumber,
          civilEdn: ag?.civilEdn,
          qualification: ag?.anyOtherQualification,
          fatherName: ag?.fatherName,
          contactNo: ag?.contactNumber,
          address: ag?.address,

          course: {
            value: ag?.courseName?.[0]?._id,
            label: ag?.courseName?.[0]?.courseName,
          },

          courseId: ag?.courseName?.[0]?._id,
          agniveerId: ag?._id,
        },
      });
    }
  }

  determineMode = () => {
    const { location } = this.props;

    const params = new URLSearchParams(location.search);
    const tradeId = params.get("tradeId");
    const courseId = params.get("course");
    const squad = params.get("squad");

    const pathParts = location.pathname.split("/");
    const last = pathParts.at(-1);
    const secondLast = pathParts.at(-2);

    this.setState({ tradeIdFromUrl: tradeId, courseIdFromUrl: courseId });

    if (last === "add") {
      this.setState({
        mode: "add",
        initialData: {
          trade: getTradeName(tradeId) || "",
          tradeId: tradeId,
          course: courseId
            ? { value: courseId, label: getCourseName(courseId) }
            : null,
          courseId: courseId || "",
          squadNo: squad || "",
        },
      });

      this.props.fetchCourses(tradeId);

      return;
    }

    if (secondLast === "edit") {
      const armyNo = this.props.match.params.id;

      this.setState({ mode: "edit" });

      this.props.getSingleAgniveer(armyNo);

      if (tradeId) this.props.fetchCourses(tradeId);

      return;
    }
  };

  handleSubmit = (formData) => {
    const { token, createAgniveer, updateAgniveer } = this.props;
    const { mode, initialData } = this.state;

    const payload = {
      name: formData.name,
      armyNumber: formData.armyNo,
      rank: formData.rank,
      unit: formData.unit,
      tradeId: [initialData.tradeId],
      squadNumber: formData.squadNo,
      civilEdn: formData.civilEdn,
      anyOtherQualification: formData.qualification,
      fatherName: formData.fatherName,
      contactNumber: formData.contactNo,
      address: formData.address,
      courseName: [formData.course?.value],
    };

    if (mode === "add") {
      createAgniveer(payload, (newData) => {
        const flowMode = this.props.location.state?.flowMode;
        if (flowMode && newData?._id) {
          const nextRoute = getNextRoute(
            FLOW_STEPS.BASIC_INFO,
            initialData.trade,
            newData._id,
          );
          if (nextRoute) {
            this.props.history.push({
              pathname: nextRoute,
              search: this.props.location.search,
              state: { flowMode: true },
            });
            return;
          }
        }

        this.setState((prev) => ({
          initialData: {
            ...prev.initialData,
            trade: initialData.trade,
            tradeId: initialData.tradeId,
            squadNo: "",
          },
        }));
      });
    } else {
      updateAgniveer({ ...payload, agniveerId: initialData.agniveerId }, token);
    }
  };

  handleClose = () => {
    const { initialData } = this.state;
    const listRoute = getListRoute(initialData.trade);
    this.props.history.push(listRoute);
  };

  render() {
    const { mode, loading, initialData, tradeIdFromUrl } = this.state;
    const { courses, trades } = this.props.master;

    const tradeName = getTradeName(tradeIdFromUrl);

    const courseOptions = getCourseOptionsForTrade(courses, trades, tradeName);

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
        <BasicInfoView
          mode={mode}
          loading={loading}
          initialData={initialData}
          onSubmit={this.handleSubmit}
          courseOptions={courseOptions}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  master: state.master,
  editAgniveer: state.tradeUsers.editAgniveer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { createAgniveer, getSingleAgniveer, updateAgniveer, fetchCourses },
    dispatch,
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BasicInfoContainer),
);
