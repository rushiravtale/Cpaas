// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import DriverTechPhase from "./driverTechPhase";
// import * as TechPhaseActions from "../../../../store/techPhase/TechPhaseActions";
// import "./driverTechPhaseStyles.scss";

// const DriverTechPhaseContainer = ({
//   techPhase,
//   loadTechPhase,
//   saveTechPhase,
// }) => {
//   const [form, setForm] = useState(techPhase.form || { week: "week1" });

//   useEffect(() => {
//     loadTechPhase();
//   }, [loadTechPhase]);

//   useEffect(() => {
//     if (techPhase.form) {
//       setForm(techPhase.form);
//     }
//   }, [techPhase.form]);

//   const onFieldChange = (name, value) => {
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const onSelectChange = (name, selectedOption) => {
//     setForm((prev) => ({ ...prev, [name]: selectedOption }));
//   };

//   const onWeekChange = (weekValue) => {
//     setForm((prev) => ({ ...prev, week: weekValue }));
//   };

//   const handleSubmit = () => {
//     saveTechPhase(form);
//   };

//   return (
//     <DriverTechPhase
//       header={techPhase.header}
//       form={form}
//       onFieldChange={onFieldChange}
//       onSelectChange={(name, opt) => onSelectChange(name, opt)}
//       onWeekChange={onWeekChange}
//       onSubmit={handleSubmit}
//     />
//   );
// };

// const mapStateToProps = (state) => ({
//   techPhase: state.techPhase || {},
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       loadTechPhase: TechPhaseActions.loadTechPhaseData,
//       saveTechPhase: TechPhaseActions.saveTechPhaseData,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(DriverTechPhaseContainer);

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DriverTechPhase from "./driverTechPhase";
import {
  fetchDriverTechPhase,
  saveDriverTechPhase,
} from "../../../../store/techPhase/TechPhaseDriver/techPhaseDriverActions";
import { getSingleAgniveer } from "../../../../store/tradeUsers/tradeUserActions";
import {
  FLOW_STEPS,
  getNextRoute,
  getListRoute,
} from "../../../../helpers/flowHelpers";
import { IoIosClose } from "react-icons/io";

class DriverTechPhaseContainer extends Component {
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
      this.props.fetchDriverTechPhase(agniveerId, courseId);
    }

    if (
      prevProps.techPhaseDriver?.form !== this.props.techPhaseDriver?.form &&
      this.props.techPhaseDriver?.form
    ) {
      this.setState({ form: this.props.techPhaseDriver?.form });
    }
  }

  initializeFromUrlAndProps = () => {
    const { match, location, editAgniveer } = this.props;
    let idFromUrl =
      match?.params?.agniveerId || location.pathname.split("/").pop();
    const query = new URLSearchParams(location.search);
    const course = query.get("course");
    console.log("cours id from url", course);

    const resolvedAgniveerId = idFromUrl || editAgniveer?._id || "";
    const resolvedCourseId = course || editAgniveer?.courseName?.[0]?._id || "";

    (console.log("resolved course id ", resolvedCourseId),
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
      ));
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
      agniveerId: editAgniveer._id,
      courseId: editAgniveer.courseName?.[0]?._id || "",
    }));
  };

  handleFieldChange = (path, value) => {
    const keys = path.split(".");
    this.setState((prev) => {
      let current = { ...prev.form };

      if (keys.length === 1) {
        current[keys[0]] = value;
      } else if (keys.length === 2) {
        current[keys[0]] = { ...current[keys[0]], [keys[1]]: value };
      } else if (keys.length === 3) {
        current[keys[0]] = {
          ...current[keys[0]],
          [keys[1]]: {
            ...(current[keys[0]]?.[keys[1]] || {}),
            [keys[2]]: value,
          },
        };
      }

      return { form: current };
    });
  };

  handleSubmit = () => {
    const { form, agniveerId, courseId } = this.state;
    const { techPhaseDriver } = this.props;

    if (!form) return;

    this.props.saveDriverTechPhase(
      form,
      agniveerId,
      courseId,
      techPhaseDriver?.recordId,
      () => {
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
    const { techPhaseDriver } = this.props;

    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "20px 20px",
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
        <DriverTechPhase
          header={header}
          rawData={techPhaseDriver?.rawData}
          form={form || {}}
          loading={techPhaseDriver?.loading || techPhaseDriver?.saving}
          onFieldChange={this.handleFieldChange}
          onSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => (
  console.log("redux satate in driver techphase", state),
  {
    techPhaseDriver: state.techPhaseDriver,
    editAgniveer: state.tradeUsers?.editAgniveer,
  }
);

const mapDispatchToProps = {
  fetchDriverTechPhase,
  saveDriverTechPhase,
  getSingleAgniveer,
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(DriverTechPhaseContainer));
