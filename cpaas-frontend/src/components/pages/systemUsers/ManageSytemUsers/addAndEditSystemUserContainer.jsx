import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  getSystemUserById,
  addSystemUser,
  updateSystemUser,
} from "../../../../store/systemUsers/SystemUserActions";

import {
  fetchUserTrades,
  fetchUserRoles,
} from "../../../../store/master/masterActions";

import  AddAndEditSystemUser  from "./addAndEditSystemUser";

class AddAndEditSystemUserContainer extends Component {
  componentDidMount() {
    const { fetchUserRoles, fetchUserTrades } = this.props;
    fetchUserRoles();
    fetchUserTrades();
  }

  render() {
    return (
      <AddAndEditSystemUser
        selectedUser={this.props.selectedUser}
        roles={this.props.roles}
        trades={this.props.trades}
        loginUser={this.props.loginUser}
        getSystemUserById={this.props.getSystemUserById}
        addSystemUser={this.props.addSystemUser}
        updateSystemUser={this.props.updateSystemUser}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  selectedUser: state.systemUsers.selectedUser,
  roles: state.master.roles,
  trades: state.master.trades,
  loginUser: state.auth.loginUser?.data,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSystemUserById,
      addSystemUser,
      updateSystemUser,
      fetchUserRoles,
      fetchUserTrades,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAndEditSystemUserContainer);
