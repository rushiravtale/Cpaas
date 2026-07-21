// // src/components/pages/dashboard/DashboardContainer.jsx
// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import DashboardView from "./DashboardView";
// import { getTradeId } from "../../../../helpers/masterLookup";

// const DashboardContainer = ({
//   authUser,
//   trades = [],
//   courses = [],
//   summaryData,
// }) => {
//   const userRole = authUser?.data?.roleIds?.[0]?.name || "";
//   const userTradeIds = authUser?.data?.tradeId || [];

//   const isCommander = userRole === "Commander";
//   const allowedTradeNames = isCommander
//     ? trades.map((t) => t.name)
//     : trades
//         .filter((t) => userTradeIds.includes(t._id))
//         .map((t) => t.name);

//   const [activeTrade, setActiveTrade] = useState(allowedTradeNames[0] || "Gunner");

//   useEffect(() => {
//     if (!allowedTradeNames.includes(activeTrade)) {
//       setActiveTrade(allowedTradeNames[0] || "");
//     }
//   }, [allowedTradeNames.join(","), activeTrade]);

//   const topStats = {
//     totalCourses: 400,
//     trained: 4250,
//     passed: 3950,
//     failed: 300,
//   };

//   return (
//     <DashboardView
//       userRole={userRole}
//       userTrades={userTradeIds}
//       topStats={topStats}
//       trades={trades}
//       courses={courses}
//       activeTrade={activeTrade}
//       setActiveTrade={setActiveTrade}
//     />
//   );
// };

// const mapStateToProps = (state) => ({
//   authUser: state.auth.loginUser,
//   trades: state.master.trades || [],
//   courses: state.master.courses || [],
//   summaryData: state.courseSummary.data,
// });

// export default connect(mapStateToProps)(DashboardContainer);



// // src/components/pages/dashboard/DashboardContainer.jsx
// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import DashboardView from "./DashboardView";
// import { getTradeId } from "../../../../helpers/masterLookup";

// const DashboardContainer = ({
//   authUser,
//   trades = [],
//   courses = [],
//   summaryData,
// }) => {
//   const userRole = authUser?.data?.roleIds?.[0]?.name || "";
//   const userTradeIds = authUser?.data?.tradeId || [];

//   const isCommander = userRole === "Commander";
//   const allowedTradeNames = isCommander
//     ? trades.map((t) => t.name)
//     : trades
//         .filter((t) => userTradeIds.includes(t._id))
//         .map((t) => t.name);

//   const [activeTrade, setActiveTradeState] =
//     useState(allowedTradeNames[0] || "Gunner");

//   //
//   //  ⭐ WRAPPER: update trade + update URL
//   //
//   const setActiveTrade = (tradeName) => {
//     setActiveTradeState(tradeName);

//     // Get tradeId from lookup helper
//     const tradeId = getTradeId(tradeName);

//     // Update URL query params WITHOUT refresh
//     const params = new URLSearchParams(window.location.search);
//     params.set("tradeId", tradeId);

//     window.history.replaceState({}, "", `${window.location.pathname}?${params}`);
//   };

//   // Keep activeTrade in sync if allowed trades change
//   useEffect(() => {
//     if (!allowedTradeNames.includes(activeTrade)) {
//       setActiveTrade(allowedTradeNames[0] || "");
//     }
//   }, [allowedTradeNames.join(","), activeTrade]);

//   const topStats = {
//     totalCourses: 400,
//     trained: 4250,
//     passed: 3950,
//     failed: 300,
//   };

//   return (
//     <DashboardView
//       userRole={userRole}
//       userTrades={userTradeIds}
//       topStats={topStats}
//       trades={trades}
//       courses={courses}
//       activeTrade={activeTrade}
//       setActiveTrade={setActiveTrade}
//     />
//   );
// };

// const mapStateToProps = (state) => ({
//   authUser: state.auth.loginUser,
//   trades: state.master.trades || [],
//   courses: state.master.courses || [],
//   summaryData: state.courseSummary.data,
// });

// export default connect(mapStateToProps)(DashboardContainer);


// // src/components/pages/dashboard/DashboardContainer.jsx
// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import DashboardView from "./DashboardView";
// import { getTradeId } from "../../../../helpers/masterLookup";
// import { fetchCourses } from "../../../../store/master/masterActions";
// import { fetchSummary } from "../../../../store/courseSummary/courseSummaryActions";

// const DashboardContainer = ({
//   authUser,
//   trades = [],
//   courses = [],
//   summaryData,
//   fetchCourses,
//   fetchSummary,
// }) => {
//   const userRole = authUser?.data?.roleIds?.[0]?.name || "";
//   const userTradeIds = authUser?.data?.tradeId || [];

//   const isCommander = userRole === "Commander";
//   const allowedTradeNames = isCommander
//     ? trades.map((t) => t.name)
//     : trades
//         .filter((t) => userTradeIds.includes(t._id))
//         .map((t) => t.name);

//   const [activeTrade, setActiveTradeState] =
//     useState(allowedTradeNames[0] || "Gunner");


//   const setActiveTrade = (tradeName) => {
//     setActiveTradeState(tradeName);

//     const tradeId = getTradeId(tradeName);

//     const params = new URLSearchParams(window.location.search);
//     params.set("tradeId", tradeId);
//     window.history.replaceState({}, "", `${window.location.pathname}?${params}`);

//     fetchCourses(tradeId);
//   };

//   useEffect(() => {
//     const tradeId = getTradeId(activeTrade);
    
//     fetchSummary(null, null);    
//     fetchCourses(tradeId);       
//   }, []);

//   useEffect(() => {
//     if (!allowedTradeNames.includes(activeTrade)) {
//       setActiveTrade(allowedTradeNames[0] || "");
//     }
//   }, [allowedTradeNames.join(","), activeTrade]);

//   const topStats = {
//     totalCourses: 400,
//     trained: 4250,
//     passed: 3950,
//     failed: 300,
//   };

//   return (
//     <DashboardView
//       userRole={userRole}
//       userTrades={userTradeIds}
//       topStats={topStats}
//       trades={trades}
//       courses={courses}          
//       activeTrade={activeTrade}
//       setActiveTrade={setActiveTrade}
//       summaryData={summaryData}
//     />
//   );
// };

// const mapStateToProps = (state) => (
  
//   console.log("state",state.master.courses),{
//   authUser: state.auth.loginUser,
//   trades: state.master.trades || [],
//   courses: state.master.courses || [],         
//   summaryData: state.courseSummary.data,
// });

// export default connect(mapStateToProps, {
//   fetchCourses,
//   fetchSummary
// })(DashboardContainer);



// import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import DashboardView from "./DashboardView";
// import { getTradeId } from "../../../../helpers/masterLookup";
// import { fetchCourses } from "../../../../store/master/masterActions";
// import { fetchSummary } from "../../../../store/courseSummary/courseSummaryActions";
// import { isLoggedInCommander, getLoggedInUserTrades } from "../../../../helpers/authLookUp";

// const DashboardContainer = ({
//   authUser,
//   trades = [],
//   courses = [],
//   summaryData,
//   fetchCourses,
//   fetchSummary,
// }) => {
//   const isCommander = isLoggedInCommander();
//   const userTradeIds = getLoggedInUserTrades();

//   const allowedTrades = isCommander
//     ? trades
//     : trades.filter((t) => userTradeIds.includes(t._id));

//   const defaultTradeName = isCommander
//     ? "Gunner"
//     : allowedTrades[0]?.name || "Gunner";

//   const [activeTrade, setActiveTradeState] = useState(defaultTradeName);

// const setActiveTrade = (tradeName) => {
//   if (!tradeName || tradeName === activeTrade) return;

//   setActiveTradeState(tradeName);
//   const tradeId = getTradeId(tradeName);

//   // Build new params, but REMOVE course and armyNo when trade changes
//   const params = new URLSearchParams(window.location.search);
//   params.delete("course");   // ← Remove old course
//   params.delete("armyNo");    // ← Remove old armyNo
//   params.set("tradeId", tradeId);  // Set new tradeId

//   window.history.replaceState(
//     {},
//     "",
//     `${window.location.pathname}?${params.toString()}`
//   );

//   fetchCourses(tradeId);
// };

//   useEffect(() => {
//     fetchSummary();

//     if (allowedTrades.length === 0) return;

//     const initialTradeName = isCommander
//       ? "Gunner"
//       : allowedTrades[0].name;

//     const tradeId = getTradeId(initialTradeName);

//     const params = new URLSearchParams(window.location.search);
//     params.set("tradeId", tradeId);
//     window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);

//     setActiveTradeState(initialTradeName);
//     fetchCourses(tradeId);
//   }, [allowedTrades.length, isCommander]);

//   useEffect(() => {
//     if (allowedTrades.length && !allowedTrades.some(t => t.name === activeTrade)) {
//       const fallback = isCommander ? "Gunner" : allowedTrades[0]?.name;
//       if (fallback) setActiveTrade(fallback);
//     }
//   }, [allowedTrades, activeTrade, isCommander]);

//   const topStats = {
//     totalCourses: summaryData?.totalCourses || 400,
//     trained: summaryData?.trained || 4250,
//     passed: summaryData?.passed || 3950,
//     failed: summaryData?.failed || 300,
//   };

//   return (
//     <DashboardView
//       isCommander={isCommander}
//       userTrades={userTradeIds}
//       topStats={topStats}
//       trades={allowedTrades}
//       courses={courses}
//       activeTrade={activeTrade}
//       setActiveTrade={setActiveTrade}
//     />
//   );
// };

// const mapStateToProps = (state) => ({
//   authUser: state.auth.loginUser,
//   trades: state.master.trades || [],
//   courses: state.master.courses || [],
//   summaryData: state.courseSummary.data || {},
// });

// export default connect(mapStateToProps, {
//   fetchCourses,
//   fetchSummary,
// })(DashboardContainer);




// import React, { useEffect, useMemo, useState, useCallback } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import DashboardView from "./DashboardView";

// import { getTradeId } from "../../../../helpers/masterLookup";
// import { fetchCourses } from "../../../../store/master/masterActions";
// import { fetchDashboard } from "../../../../store/dashboard/dashboardActions";
// // import { fetchSummary } from "../../../../store/courseSummary/courseSummaryActions";

// import {
//   isLoggedInCommander,
//   getLoggedInUserTrades,
// } from "../../../../helpers/authLookUp";

// const DashboardContainer = () => {
//   const dispatch = useDispatch();

//   const trades = useSelector((state) => state.master.trades || []);
//   const courses = useSelector((state) => state.master.courses || []);
//   const summaryData = useSelector((state) => state.courseSummary.data || {});

//   // ---------- USER ROLE ----------
//   const isCommander = isLoggedInCommander();
//   const userTradeIds = getLoggedInUserTrades();

//  const allowedTrades = useMemo(() => {
//   if (isCommander) return trades;

//   const normalizedTradeIds = userTradeIds.map((t) =>
//     typeof t === "string" ? t : t._id
//   );

//   return trades.filter((t) => normalizedTradeIds.includes(t._id));
// }, [trades, isCommander, userTradeIds]);


//   const [activeTrade, setActiveTrade] = useState("Gunner");

 
//   const initializeTradeFromURL = useCallback(() => {
//     if (!allowedTrades.length) return;

//     const params = new URLSearchParams(window.location.search);
//     const urlTradeId = params.get("tradeId");

//     // Check if URL has valid trade
//     if (urlTradeId) {
//       const found = allowedTrades.find((t) => getTradeId(t.name) === urlTradeId);
//       if (found) {
//         setActiveTrade(found.name);
//         dispatch(fetchCourses(urlTradeId));
//         dispatch(fetchDashboard());

//         return;
//       }
//     }

//     // Fallback defaults
//     const fallbackName = isCommander ? "Gunner" : allowedTrades[0]?.name;
//     const fallbackId = getTradeId(fallbackName);

//     params.set("tradeId", fallbackId);
//     window.history.replaceState({}, "", `${window.location.pathname}?${params}`);

//     setActiveTrade(fallbackName);
//     dispatch(fetchCourses(fallbackId));
//   }, [allowedTrades, dispatch, isCommander]);

//   // ---------- RUN SUMMARY FETCH ----------
//   useEffect(() => {
//     // dispatch(fetchSummary());
//   }, [dispatch]);

//   // ---------- ON TRADES LOADED OR URL CHANGE ----------
//   useEffect(() => {
//     initializeTradeFromURL();
//   }, [allowedTrades, initializeTradeFromURL]);

//   // --------------------------------------------------------------------
//   // VALIDATE ACTIVE TRADE WHEN ALLOWED TRADES CHANGE
//   // --------------------------------------------------------------------
//   useEffect(() => {
//     if (!allowedTrades.length) return;

//     const valid = allowedTrades.some((t) => t.name === activeTrade);

//     if (!valid) {
//       const fallback = isCommander ? "Gunner" : allowedTrades[0]?.name;
//       if (fallback) {
//         const fallbackId = getTradeId(fallback);

//         const params = new URLSearchParams(window.location.search);
//         params.set("tradeId", fallbackId);
//         window.history.replaceState({}, "", `${window.location.pathname}?${params}`);

//         setActiveTrade(fallback);
//         dispatch(fetchCourses(fallbackId));
//       }
//     }
//   }, [allowedTrades, activeTrade, dispatch, isCommander]);

//   // --------------------------------------------------------------------
//   // CLICK HANDLER FOR CHANGING TRADES
//   // --------------------------------------------------------------------
//   const onChangeTrade = useCallback(
//     (tradeName) => {
//       if (!tradeName || tradeName === activeTrade) return;

//       const tradeId = getTradeId(tradeName);
//       const params = new URLSearchParams(window.location.search);

//       params.delete("course");
//       params.delete("armyNo");
//       params.set("tradeId", tradeId);

//       window.history.replaceState(
//         {},
//         "",
//         `${window.location.pathname}?${params.toString()}`
//       );

//       setActiveTrade(tradeName);
//       dispatch(fetchCourses(tradeId));
//     },
//     [activeTrade, dispatch]
//   );

//   // ---------- Summary numbers ----------
//   const topStats = {
//     totalCourses: summaryData?.totalCourses || 400,
//     trained: summaryData?.trained || 4250,
//     passed: summaryData?.passed || 3950,
//     failed: summaryData?.failed || 300,
//   };

//   return (
//     <DashboardView
//       isCommander={isCommander}
//       userTrades={userTradeIds}
//       trades={allowedTrades}
//       courses={courses}
//       topStats={topStats}
//       activeTrade={activeTrade}
//       setActiveTrade={onChangeTrade}
//     />
//   );
// };

// export default DashboardContainer;




// import React, { Component } from "react";
// import { connect } from "react-redux";
// import DashboardView from "./DashboardView";

// import { getTradeId } from "../../../../helpers/masterLookup";
// import { fetchCourses } from "../../../../store/master/masterActions";
// import { fetchDashboard } from "../../../../store/dashboard/dashboardActions";

// import {
//   isLoggedInCommander,
//   getLoggedInUserTrades,
// } from "../../../../helpers/authLookUp";

// class DashboardContainer extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       activeTrade: "Gunner",
//     };

//     this.initializeTradeFromURL = this.initializeTradeFromURL.bind(this);
//     this.onChangeTrade = this.onChangeTrade.bind(this);

//     this.isCommander = isLoggedInCommander();
//     this.userTradeIds = getLoggedInUserTrades();
//   }

//   // --------------------------------------------------
//   // Allowed trades logic (memo equivalent)
//   // --------------------------------------------------
//   get allowedTrades() {
//     const { trades } = this.props;

//     if (this.isCommander) return trades || [];

//     const normalizedTradeIds = this.userTradeIds.map((t) =>
//       typeof t === "string" ? t : t._id
//     );

//     return (trades || []).filter((t) =>
//       normalizedTradeIds.includes(t._id)
//     );
//   }

//   // --------------------------------------------------
//   // Initialize trade from URL
//   // --------------------------------------------------
//   initializeTradeFromURL() {
//     const allowedTrades = this.allowedTrades;
//     if (!allowedTrades.length) return;

//     const params = new URLSearchParams(window.location.search);
//     const urlTradeId = params.get("tradeId");

//     if (urlTradeId) {
//       const found = allowedTrades.find(
//         (t) => getTradeId(t.name) === urlTradeId
//       );

//       if (found) {
//         this.setState({ activeTrade: found.name });
//         this.props.fetchCourses(urlTradeId);
//         this.props.fetchDashboard();
//         return;
//       }
//     }

//     // Fallback
//     const fallbackName = this.isCommander ? "Gunner" : allowedTrades[0]?.name;
//     const fallbackId = getTradeId(fallbackName);

//     params.set("tradeId", fallbackId);
//     window.history.replaceState({}, "", `${window.location.pathname}?${params}`);

//     this.setState({ activeTrade: fallbackName });
//     this.props.fetchCourses(fallbackId);
//   }

//   // --------------------------------------------------
//   // Component lifecycle
//   // --------------------------------------------------
//   componentDidMount() {
//     this.initializeTradeFromURL();
//     this.props.fetchDashboard();
//     // this.props.fetchSummary();  // keep commented as in original
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const allowedTrades = this.allowedTrades;

//     // Re-run initializer if trades changed
//     if (prevProps.trades !== this.props.trades) {
//       this.initializeTradeFromURL();
//     }

//     // Validate active trade when allowed trades change
//     if (prevProps.trades !== this.props.trades) {
//       if (allowedTrades.length) {
//         const valid = allowedTrades.some(
//           (t) => t.name === this.state.activeTrade
//         );

//         if (!valid) {
//           const fallback = this.isCommander
//             ? "Gunner"
//             : allowedTrades[0]?.name;

//           if (fallback) {
//             const fallbackId = getTradeId(fallback);
//             const params = new URLSearchParams(window.location.search);

//             params.set("tradeId", fallbackId);
//             window.history.replaceState(
//               {},
//               "",
//               `${window.location.pathname}?${params}`
//             );

//             this.setState({ activeTrade: fallback });
//             this.props.fetchCourses(fallbackId);
//           }
//         }
//       }
//     }
//   }

//   // --------------------------------------------------
//   // Trade selector click handler
//   // --------------------------------------------------
//   onChangeTrade(tradeName) {
//     if (!tradeName || tradeName === this.state.activeTrade) return;

//     const tradeId = getTradeId(tradeName);
//     const params = new URLSearchParams(window.location.search);

//     params.delete("course");
//     params.delete("armyNo");
//     params.set("tradeId", tradeId);

//     window.history.replaceState(
//       {},
//       "",
//       `${window.location.pathname}?${params.toString()}`
//     );

//     this.setState({ activeTrade: tradeName });
//     this.props.fetchCourses(tradeId);
//   }

//   // --------------------------------------------------
//   // Render
//   // --------------------------------------------------
//   render() {
//     const { courses, summaryData } = this.props;
//     const { activeTrade } = this.state;
//     const allowedTrades = this.allowedTrades;

//     const topStats = {
//       totalCourses: summaryData?.totalCourses || 400,
//       trained: summaryData?.trained || 4250,
//       passed: summaryData?.passed || 3950,
//       failed: summaryData?.failed || 300,
//     };

//     return (
//       <DashboardView
//         isCommander={this.isCommander}
//         userTrades={this.userTradeIds}
//         trades={allowedTrades}
//         courses={courses}
//         topStats={topStats}
//         activeTrade={activeTrade}
//         setActiveTrade={this.onChangeTrade}
//       />
//     );
//   }
// }


// const mapStateToProps = (state) => (
  
//   console.log("redux state in dashboard container ",state),
//   {
//   trades: state.master.trades || [],
//   courses: state.master.courses || [],
//     summaryData: state.dashboard.data || {},  
// });

// export default connect(mapStateToProps, {
//   fetchCourses,
//   fetchDashboard,
// })(DashboardContainer);



import React, { Component } from "react";
import { connect } from "react-redux";
import DashboardView from "./DashboardView";

import { getTradeId } from "../../../../helpers/masterLookup";
import { fetchCourses } from "../../../../store/master/masterActions";
import { fetchDashboard, fetchTradeDashboard } from "../../../../store/dashboard/dashboardActions";

import {
  isLoggedInCommander,
  getLoggedInUserTrades,
} from "../../../../helpers/authLookUp";

class DashboardContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTrade: "Gunner",
    };

    this.initializeTradeFromURL = this.initializeTradeFromURL.bind(this);
    this.onChangeTrade = this.onChangeTrade.bind(this);

    this.isCommander = isLoggedInCommander();
    this.userTradeIds = getLoggedInUserTrades();
  }

  get allowedTrades() {
    const { trades } = this.props;

    if (this.isCommander) return trades || [];

    const normalizedTradeIds = this.userTradeIds.map((t) =>
      typeof t === "string" ? t : t._id
    );

    return (trades || []).filter((t) =>
      normalizedTradeIds.includes(t._id)
    );
  }

  initializeTradeFromURL() {
    const allowedTrades = this.allowedTrades;
    if (!allowedTrades.length) return;

    const params = new URLSearchParams(window.location.search);
    const urlTradeId = params.get("tradeId");

    if (urlTradeId) {
      const found = allowedTrades.find(
        (t) => getTradeId(t.name) === urlTradeId
      );

      if (found) {
        const tradeId = getTradeId(found.name);
        this.setState({ activeTrade: found.name });
        this.props.fetchCourses(tradeId);
        this.props.fetchDashboard();
        this.props.fetchTradeDashboard(tradeId); // fetch trade-specific summary
        return;
      }
    }

    const fallbackName = this.isCommander ? "Gunner" : allowedTrades[0]?.name;
    const fallbackId = getTradeId(fallbackName);

    params.set("tradeId", fallbackId);
    window.history.replaceState({}, "", `${window.location.pathname}?${params}`);

    this.setState({ activeTrade: fallbackName });
    this.props.fetchCourses(fallbackId);
    this.props.fetchTradeDashboard(fallbackId);
  }

  componentDidMount() {
    this.initializeTradeFromURL();
    this.props.fetchDashboard();
  }

  componentDidUpdate(prevProps, prevState) {
    const allowedTrades = this.allowedTrades;

    if (prevProps.trades !== this.props.trades) {
      this.initializeTradeFromURL();
    }

    if (prevState.activeTrade !== this.state.activeTrade) {
      const tradeId = getTradeId(this.state.activeTrade);
      this.props.fetchTradeDashboard(tradeId);
    }
  }

  onChangeTrade(tradeName) {
    if (!tradeName || tradeName === this.state.activeTrade) return;

    const tradeId = getTradeId(tradeName);
    const params = new URLSearchParams(window.location.search);

    params.delete("course");
    params.delete("armyNo");
    params.set("tradeId", tradeId);

    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);

    this.setState({ activeTrade: tradeName });
    this.props.fetchCourses(tradeId);
    this.props.fetchTradeDashboard(tradeId);
  }

  render() {
    const { courses, summaryData, tradeSummaryData } = this.props;
    const { activeTrade } = this.state;
    const allowedTrades = this.allowedTrades;

    const topStats = {
      totalCourses: summaryData?.totalCourses,
      trained: summaryData?.trained ,
      passed: summaryData?.passed ,
      failed: summaryData?.failed ,
    };

    return (
      <DashboardView
        isCommander={this.isCommander}
        userTrades={this.userTradeIds}
        trades={allowedTrades}
        courses={courses}
        topStats={topStats}
        activeTrade={activeTrade}
        setActiveTrade={this.onChangeTrade}
        tradeSummaryData={tradeSummaryData} // pass trade-specific dashboard data
      />
    );
  }
}

const mapStateToProps = (state) => (

  console.log("redux state in dashboard",state),
  {
  trades: state.master.trades || [],
  courses: state.master.courses || [],
  summaryData: state.dashboard.data || {},
  tradeSummaryData: state.dashboard.tradeData || {}, // trade-specific data
});

export default connect(mapStateToProps, {
  fetchCourses,
  fetchDashboard,
  fetchTradeDashboard,
})(DashboardContainer);
