import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Store } from "react-notifications-component";

import { hideAlert } from "../../../store/alert/alertActions";

const Alert = ({ isOpen, title, msg, type, hideAlert }) => {
  useEffect(() => {
    if (isOpen) {
      Store.addNotification({
        title: title,
        message: msg,
        type: type,
        container: "top-right",
        dismiss: {
          duration: 3000,
        },
      });
      hideAlert();
    }
  }, [isOpen, title, msg, type, hideAlert]);

  return null;
};

Alert.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  msg: PropTypes.string,
  type: PropTypes.string,
  hideAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isOpen: state.alert.isOpen,
  title: state.alert.title,
  msg: state.alert.msg,
  type: state.alert.type,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      hideAlert,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
