// import React, { Component } from "react";
// import { connect } from "react-redux";
// import HeaderView from "./headerView";
// import { setSearchValue, clearSearchValue } from "../../../store/search/searchActions";

// class HeaderContainer extends Component {
//   state = {
//     localSearch: this.props.searchValue || ""
//   };

//   handleChange = (v) => {
//     this.setState({ localSearch: v }); 
//   };

//   handleEnter = () => {
//     this.props.setSearchValue(this.state.localSearch); 
//   };

//   handleClear = () => {
//     this.setState({ localSearch: "" });
//     this.props.clearSearchValue(); 
//   };

//   render() {
//     const { activeTab } = this.props;

//     return (
//       <HeaderView
//         activeTab={activeTab}
//         searchValue={this.state.localSearch}
//         setSearchValue={this.handleChange}
//         onEnter={this.handleEnter}
//         onClear={this.handleClear}
//       />
//     );
//   }
// }


// const mapStateToProps = (state) => (
//   {
//   activeTab: state.sidebar.activeTab,
//   searchValue: state.search.searchValue,
// });

// const mapDispatchToProps = {
//   setSearchValue,
//   clearSearchValue,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);





// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
// import { history } from "../../../store/configure/configureStore";

// import HeaderView from "./headerView";
// import {
//   setSearchValue,
//   clearSearchValue,
// } from "../../../store/search/searchActions";

// class HeaderContainer extends Component {
//   state = {
//     localSearch: this.props.searchValue || "",
//   };



//   getSearchRouteKey = (pathname) => {
//   const path = pathname.replace(/^\/+/, "");
//   const segments = path.split("/");

//   // single segment routes
//   if (segments.length === 1) {
//     return segments[0];
//   }

//   // dashboard routes
//   if (segments[0] === "dashboard") {
//     return `dashboard/${segments[1]}/${segments[2]}`;
//   }

//   // normal routes
//   return segments.slice(0, 2).join("/");
// };



// componentDidUpdate(prevProps) {
//   const prevPath = prevProps.location.pathname;
//   const currentPath = this.props.location.pathname;

//   if (prevPath !== currentPath) {
//     if (this.isSearchAllowed(currentPath)) {
//       this.resetSearch();
//     }
//   }
// }


//   componentWillUnmount() {
//     const nextPath = history.location.pathname;

//     // If moving OUT of searchable routes → clear
//     if (!this.isSearchAllowed(nextPath)) {
//       this.resetSearch();
//     }
//   }

//   resetSearch = () => {
//     this.setState({ localSearch: "" });
//     this.props.clearSearchValue();
//   };

//   isSearchAllowed = (pathname) => {
//     const allowedBases = [
//       "gunner/gunners",
//       "operator/operators",
//       "ofc/ofcs",
//       "driver/drivers",
//     ];

//     const allowedSubPages = [
//       undefined,
//       "gradeA",
//       "gradeB",
//       "gradeC",
//       "all",
//       "allAgniveers",
//       "improvement",
//       "improvements",
//     ];

//     const singleSegmentRoutes = ["courses", "system-users"];

//     const path = pathname.replace(/^\/+/, "");
//     const segments = path.split("/");

//     const baseRoute = segments.slice(0, 2).join("/");
//     const subPage = segments[2];
//     const isDeepRoute = segments.length > 3;

//     const showSearchNormal =
//       (allowedBases.includes(baseRoute) &&
//         allowedSubPages.includes(subPage) &&
//         !isDeepRoute) ||
//       (segments.length === 1 &&
//         singleSegmentRoutes.includes(segments[0]));

//     const isDashboard = segments[0] === "dashboard";
//     const dashboardBaseRoute = isDashboard
//       ? segments.slice(1, 3).join("/")
//       : null;
//     const dashboardSubPage = isDashboard ? segments[3] : null;

//     const showSearchDashboard =
//       isDashboard &&
//       allowedBases.includes(dashboardBaseRoute) &&
//       allowedSubPages.includes(dashboardSubPage);

//     return showSearchNormal || showSearchDashboard;
//   };

//   handleChange = (value) => {
//     this.setState({ localSearch: value });
//   };

//   handleEnter = (encodedValue) => {
//     this.props.setSearchValue(encodedValue);
//   };

//   handleClear = () => {
//     this.resetSearch();
//   };

//   render() {
//     const { activeTab } = this.props;

//     return (
//       <HeaderView
//         activeTab={activeTab}
//         searchValue={this.state.localSearch}
//         setSearchValue={this.handleChange}
//         onEnter={this.handleEnter}
//         onClear={this.handleClear}
//       />
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   activeTab: state.sidebar.activeTab,
//   activePage: state.sidebar.activePage,
//   searchValue: state.search.searchValue,
// });

// const mapDispatchToProps = {
//   setSearchValue,
//   clearSearchValue,
// };

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
// );

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { history } from "../../../store/configure/configureStore";

import HeaderView from "./headerView";
import {
  setSearchValue,
  clearSearchValue,
} from "../../../store/search/searchActions";

class HeaderContainer extends Component {
  state = {
    localSearchValue: this.props.searchValue || "", // sync on mount
  };

  getSearchRouteKey = (pathname) => {
    // ... (keep unchanged)
  };

  componentDidUpdate(prevProps) {
    const prevPath = prevProps.location.pathname;
    const currentPath = this.props.location.pathname;

    if (prevPath !== currentPath) {
      if (this.isSearchAllowed(currentPath)) {
        this.resetSearch();
      } else {
        this.setState({ localSearchValue: "" });
      }
    }

    // Sync Redux → local if Redux was cleared externally
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ localSearchValue: this.props.searchValue || "" });
    }
  }

  componentWillUnmount() {
    const nextPath = history.location.pathname;
    if (!this.isSearchAllowed(nextPath)) {
      this.resetSearch();
    }
  }

  resetSearch = () => {
    this.props.clearSearchValue();
    this.setState({ localSearchValue: "" });
  };

  isSearchAllowed = (pathname) => {
    // ... (keep your existing logic unchanged)
  };

  handleLocalChange = (value) => {
    this.setState({ localSearchValue: value });
  };

  handleEnter = (encodedValue) => {
    this.props.setSearchValue(encodedValue);
    this.setState({ localSearchValue: decodeURIComponent(encodedValue) });
  };

  handleClear = () => {
    this.resetSearch();
  };

  render() {
    const { activeTab } = this.props;
    const { localSearchValue } = this.state;

    return (
      <HeaderView
        activeTab={activeTab}
        searchValue={localSearchValue}           // use local state
        setSearchValue={this.handleLocalChange} // only updates local
        onEnter={this.handleEnter}              // updates Redux
        onClear={this.handleClear}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  activeTab: state.sidebar.activeTab,
  searchValue: state.search.searchValue,
});

const mapDispatchToProps = {
  setSearchValue,
  clearSearchValue,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
);