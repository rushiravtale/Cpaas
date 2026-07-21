// import React from "react";
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
// import CertificateView from "./certificateView";
// import { fetchSummaryData } from "../../../../store/summary/summaryActions";
// import { getSingleAgniveer } from "../../../../store/tradeUsers/tradeUserActions";
// import { loadFortnightlyPerformance } from "../../../../store/fortnightlyPerformance/FortnightlyPerformanceActions";

// class CertificateContainer extends React.Component {
//   constructor(props) {
//     super(props);

//     const { match, location } = props;

//     let agniveerId = match?.params?.id || match?.params?.agniveerId;

//     if (!agniveerId) {
//       const parts = location.pathname.split("/").filter(Boolean);
//       const last = parts[parts.length - 1];
//       if (last && /^[0-9a-fA-F]{6,}$/.test(last)) agniveerId = last;
//     }

//     const query = new URLSearchParams(location.search);
//     const courseId = query.get("course");
//     const tradeId = query.get("tradeId") || query.get("trade");

//     this.state = {
//       agniveerId,
//       courseId,
//       tradeId,
//     };
//   }

//   componentDidMount() {
//     this.initialLoad();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { editAgniveer, location } = this.props;
//     let newState = {};

//     if (editAgniveer) {
//       if (!this.state.agniveerId && editAgniveer._id) {
//         newState.agniveerId = editAgniveer._id;
//       }
//       if (!this.state.courseId && editAgniveer.courseName?.[0]?._id) {
//         newState.courseId = editAgniveer.courseName[0]._id;
//       }
//       if (!this.state.tradeId && editAgniveer.tradeId?.[0]?._id) {
//         newState.tradeId = editAgniveer.tradeId[0]._id;
//       }
//     }

//     if (location.search !== prevProps.location.search) {
//       const query = new URLSearchParams(location.search);
//       const newCourse = query.get("course");
//       if (newCourse && newCourse !== this.state.courseId) {
//         newState.courseId = newCourse;
//       }
//     }

//     if (Object.keys(newState).length > 0) {
//       this.setState(newState, this.fetchAll);
//     } else if (
//       prevState.agniveerId !== this.state.agniveerId ||
//       prevState.courseId !== this.state.courseId ||
//       prevState.tradeId !== this.state.tradeId
//     ) {
//       this.fetchAll();
//     }
//   }

//   initialLoad = () => {
//     const { agniveerId } = this.state;
//     const { editAgniveer, getSingleAgniveer } = this.props;

//     if (agniveerId && !editAgniveer) {
//       getSingleAgniveer(agniveerId);
//     }

//     this.fetchAll();
//   };

//   fetchAll = () => {
//     const {
//       agniveerId: stateAgniveerId,
//       courseId: stateCourseId,
//       tradeId: stateTradeId,
//     } = this.state;
//     const {
//       editAgniveer,
//       fetchSummaryData,
//       loadFortnightlyPerformance,
//       getSingleAgniveer,
//     } = this.props;

//     const agniveerId = stateAgniveerId || editAgniveer?._id;
//     const courseId = stateCourseId || editAgniveer?.courseName?.[0]?._id;
//     const tradeId =
//       stateTradeId ||
//       (editAgniveer?.tradeId && editAgniveer.tradeId[0]
//         ? editAgniveer.tradeId[0]._id
//         : undefined);

//     // if (agniveerId && !editAgniveer) {
//     //   getSingleAgniveer(agniveerId);
//     // }

//     if (agniveerId && courseId && tradeId) {
//       fetchSummaryData(tradeId, courseId, agniveerId);
//       loadFortnightlyPerformance(agniveerId, courseId);
//     }
//   };

//   render() {
//     const { summaryState, editAgniveer, fortnightly } = this.props;

//     return (
//       <CertificateView
//         summary={summaryState?.summary}
//         editAgniveer={editAgniveer}
//         loading={summaryState?.loading}
//         fortnightly={fortnightly}
//         error={summaryState?.error}
//       />
//     );
//   }
// }

// const mapStateToProps = (state) => (
//   console.log("redux state is ",state),
//   {
//     summaryState: state.summary,
//     editAgniveer: state.tradeUsers?.editAgniveer,
//     fortnightly: state.fortnightlyPerformance?.data,
//   }
// );

// const mapDispatchToProps = {
//   fetchSummaryData,
//   getSingleAgniveer,
//   loadFortnightlyPerformance,
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withRouter(CertificateContainer));

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CertificateView from "./certificateView";
import { fetchSummaryData } from "../../../../store/summary/summaryActions";
import { getSingleAgniveer } from "../../../../store/tradeUsers/tradeUserActions";
import { loadFortnightlyPerformance } from "../../../../store/fortnightlyPerformance/FortnightlyPerformanceActions";
import { isLoggedInCommander, isLoggedInInstructor } from "../../../../helpers/authLookUp";

class CertificateContainer extends React.Component {
  constructor(props) {
    super(props);
    const { match, location, editAgniveer } = props;

    // Extract agniveerId from route
    let agniveerId = match?.params?.id || match?.params?.agniveerId;
    if (!agniveerId) {
      const parts = location.pathname.split("/").filter(Boolean);
      const last = parts[parts.length - 1];
      if (last && /^[0-9a-fA-F]{6,}$/.test(last)) agniveerId = last;
    }

    // Extract from query params
    const query = new URLSearchParams(location.search);
    const courseId = query.get("course");
    const tradeId = query.get("tradeId") || query.get("trade");

    this.state = {
      agniveerId,
      courseId,
      tradeId,
      signatureImage: null, // Store signature image as base64
    };

    // Initialize previous values correctly to avoid false-positive changes on mount
    this.prevAgniveerId = agniveerId || editAgniveer?._id || null;
    this.prevCourseId = courseId || editAgniveer?.courseName?.[0]?._id || null;
    this.prevTradeId = tradeId || editAgniveer?.tradeId?.[0]?._id || null;
  }

  componentDidMount() {
    this.fetchRequiredData(true); // true = initial load / page refresh
  }

  componentDidUpdate(prevProps) {
    let shouldFetch = false;

    const currentAgniveerId = this.getAgniveerId();
    const currentCourseId = this.getCourseId();
    const currentTradeId = this.getTradeId();

    // Check if key values actually changed
    if (
      this.prevCourseId &&
      (currentAgniveerId !== this.prevAgniveerId ||
        currentCourseId !== this.prevCourseId ||
        currentTradeId !== this.prevTradeId)
    ) {
      shouldFetch = true;
    }

    // Update tracking values
    this.prevAgniveerId = currentAgniveerId;
    this.prevCourseId = currentCourseId;
    this.prevTradeId = currentTradeId;

    // Handle query param changes (e.g., ?course=...)
    if (this.props.location.search !== prevProps.location.search) {
      const query = new URLSearchParams(this.props.location.search);
      const newCourseId = query.get("course");

      if (newCourseId && newCourseId !== currentCourseId) {
        this.setState({ courseId: newCourseId });
        shouldFetch = true;
      }
    }

    if (shouldFetch) {
      this.fetchRequiredData(false);
    }
  }

  getAgniveerId = () => {
    return this.state.agniveerId || this.props.editAgniveer?._id;
  };

  getCourseId = () => {
    return (
      this.state.courseId ||
      (this.props.editAgniveer?.courseName?.[0]?._id ?? null)
    );
  };

  getTradeId = () => {
    return this.state.tradeId || this.props.editAgniveer?.tradeId?.[0]?._id;
  };

  fetchRequiredData = (isInitialLoad) => {
    const { getSingleAgniveer } = this.props;

    const agniveerId = this.getAgniveerId();
    const courseId = this.getCourseId();
    const tradeId = this.getTradeId();

    // Only fetch single agniveer on initial load if not already in redux (direct URL access / refresh)
    if (isInitialLoad && agniveerId) {
      getSingleAgniveer(agniveerId);
    }
    console.log("courseId:", courseId);
    // Fetch summary and fortnightly only if all IDs are available
    if (agniveerId && courseId && tradeId) {
      this.props.fetchSummaryData(tradeId, courseId, agniveerId);
      this.props.loadFortnightlyPerformance(agniveerId, courseId);
    }
  };

  handleSignatureUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ signatureImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  render() {
    const { summaryState, editAgniveer, fortnightly } = this.props;
    const isCommander = isLoggedInCommander();
    const isInstructor = isLoggedInInstructor();
    const canEdit = isCommander || isInstructor;

    return (
      <CertificateView
        summary={summaryState?.summary}
        editAgniveer={editAgniveer}
        loading={summaryState?.loading}
        fortnightly={fortnightly}
        error={summaryState?.error}
        signatureImage={this.state.signatureImage}
        onSignatureUpload={this.handleSignatureUpload}
        canEdit={canEdit}
      />
    );
  }
}

const mapStateToProps = (state) => {
  console.log("redux state is ", state);
  return {
    summaryState: state.summary,
    editAgniveer: state.tradeUsers?.editAgniveer,
    fortnightly: state.fortnightlyPerformance?.data,
  };
};

const mapDispatchToProps = {
  fetchSummaryData,
  getSingleAgniveer,
  loadFortnightlyPerformance,
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CertificateContainer));
