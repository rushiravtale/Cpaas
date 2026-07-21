import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SidebarView from "./sidebarView";
import { setActiveTab } from "../../../store/sidebar/sidebarActions";
import { logout } from "../../../store/auth/authActions";

class SidebarContainer extends Component {
  render() {
    const { activeTab, tabs, user, setActiveTab,logout } = this.props;

    return (
      <SidebarView
        activeTab={activeTab}
        tabs={tabs}
        user={user}
        logout={logout}
        onTabClick={setActiveTab}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  activeTab: state.sidebar.activeTab,
  tabs: state.sidebar.tabs,
  user: state.auth.loginUser.data,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setActiveTab,
      logout,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
