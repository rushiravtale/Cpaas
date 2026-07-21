// import React, { useEffect } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {
//   loadSystemUsers,
//   deleteSystemUser,
// } from "../../../store/systemUsers/SystemUserActions";
// import SystemUserView from "./SystemUserView";

// const SystemUserContainer = ({
//   users,
//   pagination,
//   loadSystemUsers,
//   deleteSystemUser,
// }) => {
//   useEffect(() => {
//     loadSystemUsers(pagination.currentPage, pagination.limit);
//   }, []);

//   const handlePageChange = (page) => {
//     loadSystemUsers(page, pagination.limit);
//   };

//   const handleRowsChange = (limit) => {
//     loadSystemUsers(1, limit);
//   };

//   const handleDeleteUser = (user) => {
//     deleteSystemUser(user.id);
//   };

//   return (
//     <SystemUserView
//       users={users}
//       pagination={pagination}
//       onPageChange={handlePageChange}
//       onRowsPerPageChange={handleRowsChange}
//       onDeleteUser={handleDeleteUser}
//     />
//   );
// };

// const mapStateToProps = (state) => ({
//   users: state.systemUsers.users,
//   pagination: state.systemUsers.pagination,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       loadSystemUsers,
//       deleteSystemUser,
//     },
//     dispatch
//   );

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SystemUserContainer);



import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { history } from "../../../store/configure/configureStore";
import {
  loadSystemUsers,
  deleteSystemUser,
  resetSystemUsersPagination,
} from "../../../store/systemUsers/SystemUserActions";
import SystemUserView from "./SystemUserView";
import { withRouter } from "react-router-dom";

import {
  clearSearchValue,
  setSearchValue
} from "../../../store/search/searchActions";

class SystemUserContainer extends Component {
  componentDidMount() {
    this.props.clearSearchValue()
    

    const { pagination, loadSystemUsers, location } = this.props;

    // Only run on exact /system-users
    if (location.pathname === "/system-users") {
     loadSystemUsers(pagination.currentPage, pagination.limit, this.props.text);

    }
  }
componentDidUpdate(prevProps) {

  const { pagination, loadSystemUsers, location, text } = this.props;

  const routeChanged = prevProps.location.pathname !== location.pathname;
  const searchChanged = prevProps.text !== text;
  const isMainRoute = location.pathname === "/system-users";

  // If route changed and we are on main route
  if (routeChanged && isMainRoute) {
    loadSystemUsers(pagination.currentPage, pagination.limit, text);
    return;
  }

  // If search value changed → restart from page 1
  if (isMainRoute && searchChanged) {
    loadSystemUsers(1, pagination.limit, text);
    return;
  }

  // Pagination changed and main route → load with search applied
  if (
    isMainRoute &&
    (prevProps.pagination.currentPage !== pagination.currentPage ||
      prevProps.pagination.limit !== pagination.limit)
  ) {
    loadSystemUsers(pagination.currentPage, pagination.limit, text);
  }
}


componentWillUnmount() {

  const nextPath = history.location.pathname;


  if (!nextPath.includes("system-users")) {
    this.props.resetSystemUsersPagination();
  }
}

handlePageChange = (page) => {
  this.props.loadSystemUsers(page, this.props.pagination.limit, this.props.text);
};

handleRowsChange = (limit) => {
  this.props.loadSystemUsers(1, limit, this.props.text);
};

  handleDeleteUser = (user) => {
    this.props.deleteSystemUser(user.id);
  };

  render() {
    const { users, pagination } = this.props;

    return (
      <SystemUserView
        users={users}
        pagination={pagination}
        onPageChange={this.handlePageChange}
        onRowsPerPageChange={this.handleRowsChange}
        onDeleteUser={this.handleDeleteUser}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.systemUsers.users,
  pagination: state.systemUsers.pagination,
  text: state.search?.searchValue || ""
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      loadSystemUsers,
      deleteSystemUser,
      resetSystemUsersPagination,
      clearSearchValue,
      setSearchValue
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SystemUserContainer)
);
