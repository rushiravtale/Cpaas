import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OfcTechPhase from "./ofcTechPhase";
import {
  fetchOfcTechPhase,
  saveOfcTechPhase,
} from "../../../../store/techPhase/TechPhaseOfc/ofcTechPhaseActions";
import { getSingleAgniveer } from "../../../../store/tradeUsers/tradeUserActions";
import {
  FLOW_STEPS,
  getNextRoute,
  getListRoute,
} from "../../../../helpers/flowHelpers";
import { IoIosClose } from "react-icons/io";

class OfcTechPhaseContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agniveerId: "",
      courseId: "",
      header: {},
      form: null,
    };
  }

  componentDidMount() {
    this.initializeFromUrlAndProps();
  }

  componentDidUpdate(prevProps, prevState) {
    const { agniveerId, courseId } = this.state;

    if (prevProps.editAgniveer !== this.props.editAgniveer) {
      this.updateHeaderFromAgniveer();
      this.updateIdsFromAgniveer();
    }

    if (
      (agniveerId !== prevState.agniveerId ||
        courseId !== prevState.courseId) &&
      agniveerId &&
      courseId
    ) {
      this.props.fetchOfcTechPhase(agniveerId, courseId);
    }

    if (
      prevProps.ofcTechPhase.form !== this.props.ofcTechPhase.form &&
      this.props.ofcTechPhase.form
    ) {
      this.setState({ form: this.props.ofcTechPhase.form });
    }
  }

  initializeFromUrlAndProps = () => {
    const { match, location, editAgniveer } = this.props;
    let idFromUrl =
      match?.params?.agniveerId || location.pathname.split("/").pop();
    const query = new URLSearchParams(location.search);
    const course = query.get("course");

    const resolvedAgniveerId = idFromUrl || editAgniveer?._id || "";
    const resolvedCourseId = course || editAgniveer?.courseName?.[0]?._id || "";

    this.setState(
      {
        agniveerId: resolvedAgniveerId,
        courseId: resolvedCourseId,
      },
      () => {
        if (resolvedAgniveerId) {
          this.props.getSingleAgniveer(resolvedAgniveerId);
        }
      },
    );
  };

  updateHeaderFromAgniveer = () => {
    const { editAgniveer } = this.props;
    if (!editAgniveer) return;

    this.setState({
      header: {
        agniveerNo: editAgniveer.armyNumber,
        name: editAgniveer.name,
        rank: editAgniveer.rank,
        squadNo: editAgniveer.squadNumber,
        unit: editAgniveer.unit,
        course: editAgniveer.courseName?.[0]?.courseName || "",
      },
    });
  };

  updateIdsFromAgniveer = () => {
    const { editAgniveer } = this.props;
    if (!editAgniveer) return;

    this.setState(() => ({
      agniveerId: editAgniveer?._id,
      courseId: editAgniveer?.courseName?.[0]?._id || "",
    }));
  };

  handleFieldChange = (path, value) => {
    if (typeof path === "string") {
      const keys = path.split(".");
      this.setState((prev) => {
        let current = { ...(prev.form || {}) };
        let temp = current;
        for (let i = 0; i < keys.length - 1; i++) {
          if (!temp[keys[i]]) temp[keys[i]] = {};
          temp = temp[keys[i]];
        }
        temp[keys[keys.length - 1]] = value;
        return { form: current };
      });
    }
  };
  handleSubmit = () => {
    const { form, agniveerId, courseId } = this.state;
    const { ofcTechPhase } = this.props;

    if (!form) return;

    this.props.saveOfcTechPhase(
      form,
      agniveerId,
      courseId,
      ofcTechPhase.recordId,
      (savedData) => {
        const flowMode = this.props.location.state?.flowMode;
        if (flowMode) {
          const tradeIdObj = this.props.editAgniveer?.tradeId?.[0];
          const tradeName = tradeIdObj?.label || tradeIdObj?.name;

          if (tradeName && agniveerId) {
            const nextRoute = getNextRoute(
              FLOW_STEPS.TECH_PHASE,
              tradeName,
              agniveerId,
            );
            if (nextRoute) {
              this.props.history.push({
                pathname: nextRoute,
                search: this.props.location.search,
                state: { flowMode: true },
              });
            }
          }
        }
      },
    );
  };

  handleClose = () => {
    const tradeIdObj = this.props.editAgniveer?.tradeId?.[0];
    const tradeName = tradeIdObj?.label || tradeIdObj?.name;
    const listRoute = getListRoute(tradeName);
    this.props.history.push(listRoute);
  };

  render() {
    const { form, header } = this.state;
    const { ofcTechPhase } = this.props;

    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px 20px",
          }}
        >
          {this.props.location.state?.flowMode && (
            <div
              onClick={this.handleClose}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#d32f2f",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
              }}
              title="Close Flow"
            >
              <IoIosClose size={28} />
            </div>
          )}
        </div>
        <OfcTechPhase
          header={header}
          form={form || {}}
          loading={ofcTechPhase.loading || ofcTechPhase.saving}
          onFieldChange={this.handleFieldChange}
          onSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ofcTechPhase: state.ofcTechPhase,
  editAgniveer: state.tradeUsers?.editAgniveer,
});

const mapDispatchToProps = {
  fetchOfcTechPhase,
  saveOfcTechPhase,
  getSingleAgniveer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(OfcTechPhaseContainer));
