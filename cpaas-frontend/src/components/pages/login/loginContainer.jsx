import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import LoginView from "./loginView";
import { fetchUserRoles } from "../../../store/master/masterActions";
import { login } from "../../../store/auth/authActions";


class LoginContainer extends Component {
  componentDidMount() {
    this.props.fetchUserRoles();

  }

  componentDidUpdate() {
  }

  loginHandler = (data) => {
    this.props.login(data);
  };


  render() {
    const { rolesPending, rolesError, roles ,loginUser} = this.props;

    return (
      <LoginView
        rolesPending={rolesPending}
        rolesError={rolesError}
        roles={roles}
        loginUser={loginUser}
        loginHandler={this.loginHandler}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    rolesPending: state.master.rolesPending,
    rolesError: state.master.rolesError,
    roles: state.master.roles,

    authSuccess: state.auth.authSuccess,
    loginUser: state.auth.loginUser,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchUserRoles,
      login,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
