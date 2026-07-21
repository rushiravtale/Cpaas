// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
// import OperatorTechPhase from "./operatorTechPhase";
// import {
//   fetchOperatorTechPhase,
//   saveOperatorTechPhase,
// } from "../../../../store/techPhase/TechPhaseOperator/techPhaseOperatorActions";
// import { getSingleAgniveer } from "../../../../store/tradeUsers/tradeUserActions";

// class OperatorTechPhaseContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       agniveerId: "",
//       courseId: "",
//       header: {},
//       form: null,
//     };
//   }

//   componentDidMount() {
//     this.initializeFromUrlAndProps();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { agniveerId, courseId } = this.state;

//     if (prevProps.editAgniveer !== this.props.editAgniveer) {
//       this.updateHeaderFromAgniveer();
//       this.updateIdsFromAgniveer();
//     }

//     if (
//       (agniveerId !== prevState.agniveerId || courseId !== prevState.courseId) &&
//       agniveerId &&
//       courseId
//     ) {
//       this.props.fetchOperatorTechPhase(agniveerId, courseId);
//     }

//     if (
//       prevProps.techPhaseOperator.form !== this.props.techPhaseOperator.form &&
//       this.props.techPhaseOperator.form
//     ) {
//       this.setState({ form: this.props.techPhaseOperator.form });
//     }
//   }

//   initializeFromUrlAndProps = () => {
//     const { match, location, editAgniveer } = this.props;
//     let idFromUrl = match?.params?.agniveerId || location.pathname.split("/").pop();
//     const query = new URLSearchParams(location.search);
//     const course = query.get("course");

//     const resolvedAgniveerId = idFromUrl || editAgniveer?._id || "";
//     const resolvedCourseId = course || editAgniveer?.courseName?.[0]?._id || "";

//     this.setState({
//       agniveerId: resolvedAgniveerId,
//       courseId: resolvedCourseId,
//     }, () => {
//       if (resolvedAgniveerId) {
//         this.props.getSingleAgniveer(resolvedAgniveerId);
//       }
//     });
//   };

//   updateHeaderFromAgniveer = () => {
//     const { editAgniveer } = this.props;
//     if (!editAgniveer) return;

//     this.setState({
//       header: {
//         agniveerNo: editAgniveer.armyNumber,
//         name: editAgniveer.name,
//         rank: editAgniveer.rank,
//         squadNo: editAgniveer.squadNumber,
//         course: editAgniveer.courseName?.[0]?.courseName || "",
//       },
//     });
//   };

//   updateIdsFromAgniveer = () => {
//     const { editAgniveer } = this.props;
//     if (!editAgniveer) return;

//     this.setState((prev) => ({
//       agniveerId: prev.agniveerId || editAgniveer._id,
//       courseId: prev.courseId || editAgniveer.courseName?.[0]?._id || "",
//     }));
//   };

//   handleFieldChange = (field, value) => {
//     this.setState((prev) => ({
//       form: { ...prev.form, [field]: value },
//     }));
//   };

//   handleSubmit = () => {
//     const { form, agniveerId, courseId } = this.state;
//     const { techPhaseOperator } = this.props;

//     if (!form) return;

//     this.props.saveOperatorTechPhase(
//       form,
//       agniveerId,
//       courseId,
//       techPhaseOperator.recordId
//     );
//   };

//   render() {
//     const { form, header } = this.state;
//     const { techPhaseOperator } = this.props;

//     return (
//       <OperatorTechPhase
//         header={header}
//         rawData={techPhaseOperator.rawData}
//         form={form || {}}
//         loading={techPhaseOperator.loading || techPhaseOperator.saving}
//         onFieldChange={this.handleFieldChange}
//         onSubmit={this.handleSubmit}
//       />
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   techPhaseOperator: state.techPhaseOperator,
//   editAgniveer: state.tradeUsers?.editAgniveer,
// });

// const mapDispatchToProps = {
//   fetchOperatorTechPhase,
//   saveOperatorTechPhase,
//   getSingleAgniveer,
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withRouter(OperatorTechPhaseContainer));

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OperatorTechPhase from "./operatorTechPhase";
import {
  fetchOperatorTechPhase,
  saveOperatorTechPhase,
} from "../../../../store/techPhase/TechPhaseOperator/techPhaseOperatorActions";
import { getSingleAgniveer } from "../../../../store/tradeUsers/tradeUserActions";
import {
  FLOW_STEPS,
  getNextRoute,
  getListRoute,
} from "../../../../helpers/flowHelpers";
import { IoIosClose } from "react-icons/io";

class OperatorTechPhaseContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { agniveerId: "", courseId: "", header: {}, form: null };
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
      this.props.fetchOperatorTechPhase(agniveerId, courseId);
    }

    if (
      prevProps.techPhaseOperator.form !== this.props.techPhaseOperator.form &&
      this.props.techPhaseOperator.form
    ) {
      this.setState({ form: this.props.techPhaseOperator.form });
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
      { agniveerId: resolvedAgniveerId, courseId: resolvedCourseId },
      () => {
        if (resolvedAgniveerId)
          this.props.getSingleAgniveer(resolvedAgniveerId);
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
    this.setState((prev) => ({
      agniveerId: editAgniveer?._id,
      courseId: editAgniveer?.courseName?.[0]?._id || "",
    }));
  };

  handleFieldChange = (field, value) => {
    this.setState((prev) => {
      const keys = field.split("."); // e.g., ["theoretical", "writtenScore"]
      const newForm = { ...prev.form };
      let temp = newForm;

      keys.forEach((k, i) => {
        if (i === keys.length - 1) {
          temp[k] = value; // last key → set value
        } else {
          temp[k] = { ...temp[k] }; // copy nested object
          temp = temp[k];
        }
      });

      return { form: newForm };
    });
  };

  handleSubmit = () => {
    const { form, agniveerId, courseId } = this.state;
    if (!form) return;
    this.props.saveOperatorTechPhase(
      form,
      agniveerId,
      courseId,
      this.props.techPhaseOperator.recordId,
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
    const { techPhaseOperator } = this.props;
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
        <OperatorTechPhase
          header={header}
          rawData={techPhaseOperator.rawData}
          form={form || {}}
          loading={techPhaseOperator.loading || techPhaseOperator.saving}
          onFieldChange={this.handleFieldChange}
          onSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => (
  console.log("redux state is", state),
  {
    techPhaseOperator: state.techPhaseOperator,
    editAgniveer: state.tradeUsers?.editAgniveer,
  }
);

const mapDispatchToProps = {
  fetchOperatorTechPhase,
  saveOperatorTechPhase,
  getSingleAgniveer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(OperatorTechPhaseContainer));
