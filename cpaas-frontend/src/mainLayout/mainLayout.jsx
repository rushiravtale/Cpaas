import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import './mainLayoutStyles.scss';

import { logout } from "../store/auth/authActions";
import SidebarView from "../components/common/sidebar/sidebarContainer";
import Footer from "../components/common/footer/footer";
import HeaderContainer from "../components/common/header/headerContainer";
import { fetchUserTrades,fetchUserRoles } from "../store/master/masterActions";
class MainLayout extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount()
  {
    this.props.fetchUserTrades();
    this.props.fetchUserRoles();

  }

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const { children} = this.props;

    return (
      <div className="main-layout">
      <div className="main-layout-left-wrapper">
        <SidebarView/>
      </div>
<div className="main-layout-right-wrapper">
        <HeaderContainer/>
        <main>{children}</main>
        <Footer/>

</div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    loginUser: state.auth.loginUser,
    accessToken: state.auth.accessToken,
  };
};


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logout,
      fetchUserRoles,
      fetchUserTrades
    },
    dispatch
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
