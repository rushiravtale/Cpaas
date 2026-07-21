import React from "react";
import { FadeLoader } from "react-spinners";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./BigLoaderStyles.scss";


const BigLoader = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="big-loader-overlay">
      <div className="big-loader-spinner">
        <FadeLoader
          color="black"
          loading={true}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isOpen: state.loader?.isOpen,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(BigLoader);
