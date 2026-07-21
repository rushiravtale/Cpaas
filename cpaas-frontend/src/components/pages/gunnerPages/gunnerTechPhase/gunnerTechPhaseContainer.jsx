// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import GunnerTechPhase from "./gunnerTechPhase";
// import * as TechPhaseActions from "../../../../store/techPhase/TechPhaseActions";
// import "./gunnerTechPhaseStyles.scss";

// const GunnerTechPhaseContainer = ({
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
//     // dispatch save action with current form
//     saveTechPhase(form);
//   };

//   return (
//     <GunnerTechPhase
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

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(GunnerTechPhaseContainer);

// src/components/pages/gunnerPages/gunnerTechPhase/gunnerTechPhaseContainer.jsx

import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  fetchGunnerTechPhase,
  saveGunnerTechPhase,
} from "../../../../store/techPhase/TechPhaseGunner/techPhaseGunnerActions";
import { getSingleAgniveer } from "../../../../store/tradeUsers/tradeUserActions";
import GunnerTechPhase from "./gunnerTechPhase";
import {
  FLOW_STEPS,
  getNextRoute,
  getListRoute,
} from "../../../../helpers/flowHelpers";
import { IoIosClose } from "react-icons/io";

class GunnerTechPhaseContainer extends Component {
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
      this.props.fetchGunnerTechPhase(agniveerId, courseId);
    }

    if (
      prevProps.techPhaseGunner.form !== this.props.techPhaseGunner.form &&
      this.props.techPhaseGunner.form
    ) {
      this.setState({ form: this.props.techPhaseGunner.form });
    }
  }

  initializeFromUrlAndProps = () => {
    const { match, location, editAgniveer } = this.props;

    let idFromUrl = match?.params?.agniveerId;
    if (!idFromUrl) {
      const parts = location.pathname.split("/");
      idFromUrl = parts[parts.length - 1];
    }

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
    const keys = path.split(".");

    this.setState((prev) => {
      const updatedForm = { ...prev.form };

      if (keys.length === 1) {
        updatedForm[keys[0]] = value;
      } else if (keys.length === 2) {
        updatedForm[keys[0]] = {
          ...updatedForm[keys[0]],
          [keys[1]]: value,
        };
      } else if (keys.length === 3) {
        updatedForm[keys[0]] = {
          ...updatedForm[keys[0]],
          [keys[1]]: {
            ...updatedForm[keys[0]][keys[1]],
            [keys[2]]: value,
          },
        };
      }

      return { form: updatedForm };
    });
  };

  handleSubmit = () => {
    const { form, agniveerId, courseId } = this.state;
    const { techPhaseGunner } = this.props;

    if (!form) return;

    const theo = form.theoretical || {};
    const prac = form.practical || {};

    const totalTheo =
      (Number(theo.writtenScore) || 0) + (Number(theo.quizScore) || 0);

    const totalPrac =
      (Number(prac.pkt?.saScore) || 0) +
      (Number(prac.pkt?.idenOfPartsScore) || 0) +
      (Number(prac.eqptph?.opStabSys) || 0) +
      (Number(prac.eqptph?.opGnrSi) || 0) +
      (Number(prac.eqptph?.opSmkSys) || 0) +
      (Number(prac.eqptph?.idenOfPartsScore) || 0) +
      (Number(prac.gunph?.sa) || 0) +
      (Number(prac.gunph?.idenOfPartsScore) || 0) +
      (Number(prac.mslph?.msl) || 0) +
      (Number(prac.mslph?.idenOfPartsScore) || 0) +
      (Number(prac.ims?.atgm) || 0) +
      (Number(prac.fdfiring?.gun) || 0) +
      (Number(prac.fdfiring?.pkt) || 0) +
      (Number(prac.fdfiring?.msl) || 0);

    const updatedForm = {
      ...form,
      totalTheoreticalScore: totalTheo,
      totalPracticalScore: totalPrac,
      finalScore: totalTheo + totalPrac,
    };

    this.props.saveGunnerTechPhase(
      updatedForm,
      agniveerId,
      courseId,
      techPhaseGunner.recordId,
      (savedData) => {
        // Redirection logic
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
    const { techPhaseGunner } = this.props;

    if (!form || techPhaseGunner.loading) {
      /* empty */
    }

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
        <GunnerTechPhase
          header={header}
          rawData={techPhaseGunner.rawData}
          form={form}
          loading={techPhaseGunner.loading || techPhaseGunner.saving}
          onFieldChange={this.handleFieldChange}
          onSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  techPhaseGunner: state.techPhaseGunner,
  editAgniveer: state.tradeUsers?.editAgniveer,
});

const mapDispatchToProps = {
  fetchGunnerTechPhase,
  saveGunnerTechPhase,
  getSingleAgniveer,
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(GunnerTechPhaseContainer));
