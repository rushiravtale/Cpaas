// // src/components/pages/commonPages/summary/SummaryContainer.jsx
// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { useParams, useLocation } from "react-router-dom";

// import GunnerSummaryView from "./SummaryView";
// import { fetchSummaryData } from "../../../../store/summary/summaryActions";
// import { getSingleAgniveer } from "../../../../store/tradeUsers/tradeUserActions";

// const SummaryContainer = ({
//   summaryState,
//   fetchSummaryData,
//   getSingleAgniveer,
//   editAgniveer,
// }) => {

//   const { id: agniveerIdFromUrl } = useParams();
//   const location = useLocation();
//   const query = new URLSearchParams(location.search);

//   const tradeIdFromUrl = query.get("tradeId");
//   const courseIdFromUrl = query.get("course");

//   // Local state to behave like class component tracking
//   const [agniveerId, setAgniveerId] = useState(agniveerIdFromUrl || null);
//   const [courseId, setCourseId] = useState(courseIdFromUrl || null);
//   const [tradeId, setTradeId] = useState(tradeIdFromUrl || null);

//   // --------------------------
//   // STEP 1 - Resolve IDs with correct priority (URL → fallback editAgniveer)
//   // --------------------------
//   useEffect(() => {
//     const resolvedAgniveerId =
//       agniveerIdFromUrl ||
//       editAgniveer?._id ||
//       agniveerId;

//     const resolvedCourseId =
//       courseIdFromUrl ||
//       editAgniveer?.courseName?.[0]?._id ||
//       courseId;

//     const resolvedTradeId =
//       tradeIdFromUrl ||
//       editAgniveer?.tradeId?.[0]?._id ||
//       tradeId;

//     setAgniveerId(resolvedAgniveerId);
//     setCourseId(resolvedCourseId);
//     setTradeId(resolvedTradeId);

//   }, [
//     agniveerIdFromUrl,
//     courseIdFromUrl,
//     tradeIdFromUrl,
//     editAgniveer
//   ]);


//   // --------------------------
//   // STEP 2 - Fetch single agniveer when id changes
//   // --------------------------
//   useEffect(() => {
//     if (agniveerId && !editAgniveer) {
//       getSingleAgniveer(agniveerId);
//     }
//   }, [agniveerId, editAgniveer, getSingleAgniveer]);


//   // --------------------------
//   // STEP 3 - Fetch summary ONLY when final IDs are present
//   // --------------------------
//   useEffect(() => {
//     if (agniveerId && courseId && tradeId) {
//       fetchSummaryData(tradeId, courseId, agniveerId);
//     }
//   }, [agniveerId, courseId, tradeId, fetchSummaryData]);


//   return (
//     <GunnerSummaryView
//       summary={summaryState?.summary}
//       editAgniveer={editAgniveer}
//     />
//   );
// };

// const mapStateToProps = (state) => ({
//   summaryState: state.summary,
//   editAgniveer: state.tradeUsers?.editAgniveer,
// });

// const mapDispatchToProps = { fetchSummaryData, getSingleAgniveer };

// export default connect(mapStateToProps, mapDispatchToProps)(SummaryContainer);


// // src/components/pages/commonPages/summary/SummaryContainer.jsx
// import React from "react";
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";

// import GunnerSummaryView from "./SummaryView";
// import { fetchSummaryData } from "../../../../store/summary/summaryActions";
// import { getSingleAgniveer } from "../../../../store/tradeUsers/tradeUserActions";

// class SummaryContainer extends React.Component {
//   constructor(props) {
//     super(props);

//     // Try to get id from match.params (react-router v5) or fallback parse path like the physical container
//     const { match, location } = props;

//     let agniveerId = match?.params?.id;
//     if (!agniveerId) {
//       // fallback: assume last segment is the id (same approach used in physical container)
//       const parts = location.pathname.split("/");
//       agniveerId = parts[parts.length - 1];
//     }

//     // parse query params
//     const query = new URLSearchParams(location.search);
//     const tradeId = query.get("tradeId");
//     const courseId = query.get("course");

//     this.state = {
//       agniveerId: agniveerId || null,
//       tradeId: tradeId || null,
//       courseId: courseId || null,
//     };
//   }

//   componentDidMount() {
//     // On mount: ensure single agniveer is fetched if needed, and summary load attempt
//     const { agniveerId } = this.state;
//     const { editAgniveer } = this.props;

//     // If agniveerId exists and editAgniveer not present => fetch single agniveer
//     if (agniveerId && !editAgniveer) {
//       this.props.getSingleAgniveer(agniveerId);
//     }

//     // Attempt to fetch summary (resolve fallbacks inside helper)
//     this.tryResolveIdsAndFetch();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     // If route search changed (e.g., refresh or query param change), update state accordingly
//     if (prevProps.location.search !== this.props.location.search) {
//       const query = new URLSearchParams(this.props.location.search);
//       const newTradeId = query.get("tradeId");
//       const newCourseId = query.get("course");

//       // Only setState if something actually changed to avoid loops
//       if (newTradeId !== this.state.tradeId || newCourseId !== this.state.courseId) {
//         this.setState(
//           (state) => ({
//             tradeId: newTradeId || state.tradeId,
//             courseId: newCourseId || state.courseId,
//           }),
//           () => {
//             // After updating state, attempt fetch again
//             this.tryResolveIdsAndFetch();
//           }
//         );
//       }
//     }

//     // If match.params id changed (route param change) update agniveerId state and re-run logic
//     const prevAgniveerParam = prevProps.match?.params?.id;
//     const currentAgniveerParam = this.props.match?.params?.id;
//     if (prevAgniveerParam !== currentAgniveerParam) {
//       const newAgniveerId = currentAgniveerParam || (() => {
//         const parts = this.props.location.pathname.split("/");
//         return parts[parts.length - 1];
//       })();

//       if (newAgniveerId !== this.state.agniveerId) {
//         this.setState({ agniveerId: newAgniveerId }, () => {
//           // fetch single agniveer if needed and try fetching summary
//           if (newAgniveerId && !this.props.editAgniveer) {
//             this.props.getSingleAgniveer(newAgniveerId);
//           }
//           this.tryResolveIdsAndFetch();
//         });
//       }
//     }

//     // If editAgniveer changed (e.g., due to store update after fetchSingle), re-resolve ids & fetch summary
//     if (prevProps.editAgniveer !== this.props.editAgniveer) {
//       // If we now have editAgniveer and didn't before, try to resolve IDs from it
//       this.tryResolveIdsAndFetch();
//     }

//     // If summaryState changed we don't need to trigger anything here - SummaryView will re-render with new props
//   }

//   // Resolve final ids with priority: URL params (state) -> editAgniveer -> existing state
//   resolveIds = () => {
//     const { editAgniveer } = this.props;
//     const { agniveerId: stateAgniveerId, courseId: stateCourseId, tradeId: stateTradeId } = this.state;

//     const resolvedAgniveerId =
//       stateAgniveerId ||
//       editAgniveer?._id ||
//       null;

//     const resolvedCourseId =
//       stateCourseId ||
//       editAgniveer?.courseName?.[0]?._id ||
//       null;

//     const resolvedTradeId =
//       stateTradeId ||
//       editAgniveer?.tradeId?.[0]?._id ||
//       null;

//     return {
//       agniveerId: resolvedAgniveerId,
//       courseId: resolvedCourseId,
//       tradeId: resolvedTradeId,
//     };
//   };

//   // Try to fetch single agniveer (if necessary) and fetch summary if all IDs are ready.
//   tryResolveIdsAndFetch = () => {
//     const { agniveerId, courseId, tradeId } = this.resolveIds();

//     // If agniveerId exists but editAgniveer not present -> fetch single agniveer
//     if (agniveerId && !this.props.editAgniveer) {
//       this.props.getSingleAgniveer(agniveerId);
//     }

//     // If all three IDs are resolved -> fetch summary
//     if (agniveerId && courseId && tradeId) {
//       // Ensure we're not redundantly calling fetch if the same request already exists in summaryState (optional)
//       // But to keep behavior identical to functional component, just call fetchSummaryData
//       this.props.fetchSummaryData(tradeId, courseId, agniveerId);
//     } else {
//       // If any missing, do nothing (will re-attempt when editAgniveer arrives or URL changes)
//     }

//     // Also update local state to reflect any values coming from editAgniveer (so subsequent UI uses them)
//     const newState = {};
//     if (agniveerId && agniveerId !== this.state.agniveerId) newState.agniveerId = agniveerId;
//     if (courseId && courseId !== this.state.courseId) newState.courseId = courseId;
//     if (tradeId && tradeId !== this.state.tradeId) newState.tradeId = tradeId;

//     if (Object.keys(newState).length > 0) {
//       // Use setState but avoid triggering tryResolveIdsAndFetch recursively by not calling callback here
//       this.setState(newState);
//     }
//   };

//   render() {
//     const { summaryState, editAgniveer ,error} = this.props;

//     return (
//       <GunnerSummaryView
//         summary={summaryState?.summary}
//         editAgniveer={editAgniveer}
//         error={summaryState?.error}
//       />
//     );
//   }
// }

// const mapStateToProps = (state) => (
//   console.log("redux state in summary container",state.summary),
//   {
//   summaryState: state.summary,
//   editAgniveer: state.tradeUsers?.editAgniveer,
// });

// const mapDispatchToProps = { fetchSummaryData, getSingleAgniveer };

// // withRouter used to provide location & match (same pattern as your PhysicalProficiencyContainer)
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SummaryContainer));



// src/components/pages/commonPages/summary/SummaryContainer.jsx
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import GunnerSummaryView from "./summaryView";
import { fetchSummaryData } from "../../../../store/summary/summaryActions";
import { getSingleAgniveer } from "../../../../store/tradeUsers/tradeUserActions";

class SummaryContainer extends React.Component {
  constructor(props) {
    super(props);

    const { match, location } = props;

    let agniveerId = match?.params?.id;
    if (!agniveerId) {
      const parts = location.pathname.split("/");
      agniveerId = parts[parts.length - 1];
    }

    const query = new URLSearchParams(location.search);
    const tradeId = query.get("tradeId");
    const courseId = query.get("course");

    this.state = {
      agniveerId: agniveerId || null,
      tradeId: tradeId || null,
      courseId: courseId || null,
    };

    this.lastFetchKey = null;
    this.singleAgniveerFetched = null;
  }

  componentDidMount() {
    const { agniveerId } = this.state;
    const { editAgniveer } = this.props;

    if (agniveerId ) {
      this.callGetSingleAgniveer(agniveerId);
    }

    this.tryResolveAndFetch();
  }

  componentDidUpdate(prevProps, prevState) {


 

    if (prevProps.location.search !== this.props.location.search) {
      const query = new URLSearchParams(this.props.location.search);
      const tradeId = query.get("tradeId");
      const courseId = query.get("course");

      if (tradeId !== this.state.tradeId || courseId !== this.state.courseId) {
        this.setState(
          { tradeId: tradeId || null, courseId: courseId || null },
          () => this.tryResolveAndFetch()
        );
      }
    }

    const prevId = prevProps.match?.params?.id;
    const currId = this.props.match?.params?.id;


       if (prevId !== currId) {
  this.lastFetchKey = null; 
  this.callGetSingleAgniveer(currId);
}
    if (prevId !== currId) {
      let newAgniveerId = currId;

      if (!newAgniveerId) {
        const parts = this.props.location.pathname.split("/");
        newAgniveerId = parts[parts.length - 1];
      }

      if (newAgniveerId !== this.state.agniveerId) {
        this.setState({ agniveerId: newAgniveerId }, () => {
          if (newAgniveerId && !this.props.editAgniveer) {
            this.callGetSingleAgniveer(newAgniveerId);
          }
          this.tryResolveAndFetch();
        });
      }
    }

    if (prevProps.editAgniveer !== this.props.editAgniveer) {
      this.tryResolveAndFetch();
    }
  }
  
callGetSingleAgniveer = (id) => {
  if (!id) return;

  if (this.lastFetchedAgniveerId === id) return;

  this.lastFetchedAgniveerId = id;
  this.props.getSingleAgniveer(id);
};


  resolveIds = () => {
    const { editAgniveer } = this.props;
    const { agniveerId, courseId, tradeId } = this.state;

    return {
      agniveerId:  editAgniveer?._id || null,
      courseId:  editAgniveer?.courseName?.[0]?._id || null,
      tradeId:  editAgniveer?.tradeId?.[0]?._id || null,
    };
  };

 tryResolveAndFetch = () => {
  const routeAgniveerId =
    this.props.match?.params?.id ||
    this.props.location.pathname.split("/").pop();

  const { editAgniveer } = this.props;

  // ❌ Do nothing if redux still has old user
  if (!editAgniveer || editAgniveer._id !== routeAgniveerId) {
    return;
  }

  const agniveerId = editAgniveer._id;
  const courseId = editAgniveer?.courseName?.[0]?._id;
  const tradeId = editAgniveer?.tradeId?.[0]?._id;

  if (!agniveerId || !tradeId || !courseId) return;

  const key = `${tradeId}_${courseId}_${agniveerId}`;
  if (this.lastFetchKey === key) return;

  this.lastFetchKey = key;

  this.props.fetchSummaryData(tradeId, courseId, agniveerId);
};


  render() {
    return (
      <GunnerSummaryView
        summary={this.props.summaryState?.summary}
        error={this.props.summaryState?.error}
        editAgniveer={this.props.editAgniveer}
        loading={this.props.summaryState?.loading}
      />
    );
  }
}

const mapStateToProps = (state) => (

  console.log("edit agniveer state ",state.tradeUsers?.editAgniveer),
  
  {
  summaryState: state.summary,
  editAgniveer: state.tradeUsers?.editAgniveer,
});

const mapDispatchToProps = { fetchSummaryData, getSingleAgniveer };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SummaryContainer));
