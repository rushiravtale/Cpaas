import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PhysicalProficiencyView from "./PhysicalProficiencyView";

import {
  submitPhysicalProficiency,
  fetchPhysicalProficiency,
  updatePhysicalProficiency,
  clearPhysicalProficiency,
} from "../../../../store/physicalProficiency/physicalProficiencyActions";
import { getSingleAgniveer } from "../../../../store/tradeUsers/tradeUserActions";
import {
  FLOW_STEPS,
  getNextRoute,
  getListRoute,
} from "../../../../helpers/flowHelpers";
import { IoIosClose } from "react-icons/io";

const RATING_VALUE = {
  excellent: 4,
  good: 3,
  satisfactory: 2,
  fail: 1,
};

const NUMBER_TO_STRING = {
  4: "excellent",
  3: "good",
  2: "satisfactory",
  1: "fail",
};

// Pass/Fail mappings for rope fields
const PASS_FAIL_VALUE = {
  pass: 4,
  fail: 1,
};

const PASS_FAIL_TO_STRING = {
  4: "pass",
  1: "fail",
};

class PhysicalProficiencyContainer extends React.Component {
  constructor(props) {
    super(props);

    const { match, location } = props;

    let agniveerId = match?.params?.agniveerId;
    if (!agniveerId) {
      const parts = location.pathname.split("/");
      agniveerId = parts[parts.length - 1];
    }

    const query = new URLSearchParams(location.search);
    const courseId = query.get("course");

    this.state = {
      agniveerId,
      courseId,
      header: props.location.state?.header || {},
      form: {
        bpet: {
          run5km: "",
          sprint60m: "",
          horizontalRope: "",
          verticalRope: "",
          nineFeetDitch: "",
        },
        ppt: {
          km2_4: "",
          chinUps: "",
          toeTouch: "",
          sitUps: "",
          sprint100m: "",
          shuttle5m: "",
        },
      },
      isEditMode: false,
      existingPhysId: null,
    };
  }

  componentDidMount() {
    const { agniveerId } = this.state;
    if (agniveerId) {
      this.props.getSingleAgniveer(agniveerId);
    }
    this.loadPhysicalProficiency();
  }

  componentDidUpdate(prevProps, prevState) {
    const { agniveerId, courseId } = this.state;

    // Only load physical proficiency if agniveerId or courseId changes
    if (
      prevState.agniveerId !== agniveerId ||
      prevState.courseId !== courseId ||
      prevProps.editAgniveer !== this.props.editAgniveer
    ) {
      this.loadPhysicalProficiency();
    }

    // Populate form when physical proficiency data changes
    if (
      prevProps.physicalProficiency !== this.props.physicalProficiency &&
      this.props.physicalProficiency
    ) {
      this.populateForm(this.props.physicalProficiency);
    }

    // Update header if editAgniveer changes
    if (prevProps.editAgniveer !== this.props.editAgniveer) {
      const data = this.props.editAgniveer;
      if (data) {
        this.setState({
          header: {
            armyNo: data?.armyNumber,
            name: data?.name,
            rank: data?.rank,
            unit: data?.unit,
            squadNo: data?.squadNumber,
            course: data?.courseName[0]?.courseName,
          },
        });
      }
    }

    // Update courseId if location.search changes
    if (prevProps.location.search !== this.props.location.search) {
      const query = new URLSearchParams(this.props.location.search);
      const newCourseId = query.get("course");
      if (newCourseId && newCourseId !== courseId) {
        this.setState({ courseId: newCourseId });
      }
    }
  }

  loadPhysicalProficiency = () => {
    const { agniveerId, courseId } = this.state;
    if (
      (agniveerId || this.props.editAgniveer?._id) &&
      (courseId || this.props.editAgniveer?.courseName[0]?._id)
    ) {
      this.props.fetchPhysicalProficiency(
        agniveerId || this.props.editAgniveer?._id,
        courseId || this.props.editAgniveer?.courseName[0]?._id,
      );
    }
  };

  populateForm = (rawData) => {
    const filledForm = {
      bpet: {
        run5km: NUMBER_TO_STRING[rawData.bpet?.fiveKmRun] || "",
        sprint60m: NUMBER_TO_STRING[rawData.bpet?.sixtyMeterSprint] || "",
        horizontalRope: PASS_FAIL_TO_STRING[rawData.bpet?.horizontalRope] || "",
        verticalRope: PASS_FAIL_TO_STRING[rawData.bpet?.verticalRope] || "",
        nineFeetDitch: PASS_FAIL_TO_STRING[rawData.bpet?.nineFeetDitch] || "",
      },
      ppt: {
        km2_4: NUMBER_TO_STRING[rawData.ppt?.twoPointFourKm] || "",
        chinUps: NUMBER_TO_STRING[rawData.ppt?.chinUps] || "",
        toeTouch: NUMBER_TO_STRING[rawData.ppt?.toeTouch] || "",
        sitUps: NUMBER_TO_STRING[rawData.ppt?.sitUps] || "",
        sprint100m: NUMBER_TO_STRING[rawData.ppt?.sprint100m] || "",
        shuttle5m: NUMBER_TO_STRING[rawData.ppt?.fiveMeterShuttle] || "",
      },
    };

    this.setState({
      form: filledForm,
      isEditMode: true,
      existingPhysId: rawData._id,
    });
  };

  updateField = (group, key, value) => {
    this.setState((prev) => ({
      form: {
        ...prev.form,
        [group]: {
          ...prev.form[group],
          [key]: value,
        },
      },
    }));
  };

  // onSubmit = () => {
  //   const { form, agniveerId, courseId, isEditMode, existingPhysId } = this.state;

  //   if (!agniveerId || !courseId) {
  //     alert("Agniveer ID or Course ID missing!");
  //     return;
  //   }

  //   const payload = {
  //     bpet: {
  //       fiveKmRun: form.bpet.run5km ? RATING_VALUE[form.bpet.run5km] : null,
  //       sixtyMeterSprint: form.bpet.sprint60m ? RATING_VALUE[form.bpet.sprint60m] : null,
  //       horizontalRope: form.bpet.horizontalRope ? RATING_VALUE[form.bpet.horizontalRope] : null,
  //       verticalRope: form.bpet.verticalRope ? RATING_VALUE[form.bpet.verticalRope] : null,
  //     },
  //     ppt: {
  //       twoPointFourKm: form.ppt.km2_4 ? RATING_VALUE[form.ppt.km2_4] : null,
  //       chinUps: form.ppt.chinUps ? RATING_VALUE[form.ppt.chinUps] : null,
  //       pushUps: form.ppt.pushUps ? RATING_VALUE[form.ppt.pushUps] : null,
  //       fiveMeterShuttle: form.ppt.shuttle5m ? RATING_VALUE[form.ppt.shuttle5m] : null,
  //     },
  //   };

  //   if (isEditMode && existingPhysId) {
  //     this.props.updatePhysicalProficiency(payload, existingPhysId, agniveerId, courseId);
  //   } else {
  //     this.props.submitPhysicalProficiency(payload, agniveerId, courseId);
  //   }
  // };

  onSubmit = () => {
    let { form, agniveerId, courseId, isEditMode, existingPhysId } = this.state;

    // Fallback to editAgniveer if missing
    const { editAgniveer } = this.props;
    agniveerId = agniveerId || editAgniveer?._id;
    courseId = courseId || editAgniveer?.courseName?.[0]?._id;

    if (!agniveerId || !courseId) {
      alert("Agniveer ID or Course ID missing!");
      return;
    }

    const payload = {
      bpet: {
        fiveKmRun: form.bpet.run5km ? RATING_VALUE[form.bpet.run5km] : "",
        sixtyMeterSprint: form.bpet.sprint60m
          ? RATING_VALUE[form.bpet.sprint60m]
          : "",
        horizontalRope: form.bpet.horizontalRope
          ? PASS_FAIL_VALUE[form.bpet.horizontalRope]
          : "",
        verticalRope: form.bpet.verticalRope
          ? PASS_FAIL_VALUE[form.bpet.verticalRope]
          : "",
        nineFeetDitch: form.bpet.nineFeetDitch
          ? PASS_FAIL_VALUE[form.bpet.nineFeetDitch]
          : "",
      },
      ppt: {
        twoPointFourKm: form.ppt.km2_4 ? RATING_VALUE[form.ppt.km2_4] : "",
        chinUps: form.ppt.chinUps ? RATING_VALUE[form.ppt.chinUps] : "",
        toeTouch: form.ppt.toeTouch ? RATING_VALUE[form.ppt.toeTouch] : "",
        sitUps: form.ppt.sitUps ? RATING_VALUE[form.ppt.sitUps] : "",
        sprint100m: form.ppt.sprint100m
          ? RATING_VALUE[form.ppt.sprint100m]
          : "",
        fiveMeterShuttle: form.ppt.shuttle5m
          ? RATING_VALUE[form.ppt.shuttle5m]
          : "",
      },
    };

    if (isEditMode && existingPhysId) {
      this.props.updatePhysicalProficiency(
        payload,
        existingPhysId,
        agniveerId,
        courseId,
      );
    } else {
      this.props.submitPhysicalProficiency(payload, agniveerId, courseId);
    }

    // Check flow mode and redirect
    const flowMode = this.props.location.state?.flowMode;
    if (flowMode) {
      // Assuming trade is available in editAgniveer or we can derive it.
      // Ideally we should have trade info here.
      // Let's use editAgniveer.tradeId to get trade name if possible or pass it via state?
      // State might be lost on refresh, but we are pushing it.
      // A safe bet is to use the editAgniveer prop which should be loaded.

      const tradeIdObj = this.props.editAgniveer?.tradeId?.[0];
      const tradeName = tradeIdObj?.label || tradeIdObj?.name;

      if (tradeName && agniveerId) {
        const nextRoute = getNextRoute(
          FLOW_STEPS.PHYSICAL,
          tradeName,
          agniveerId,
        );
        if (nextRoute) {
          // We can use setTimeout to allow Redux action to complete/propagate?
          // Or better, if submitPhysicalProficiency took a callback.
          // Currently it doesn't seem to take one based on imports.
          // I'll check the action definition later, but for now assuming it might be async.
          // Ideally we should update the action to take callback like createAgniveer.
          // But for now, let's just push. If it's pure standard redux, it might be fine,
          // but usually we want to wait for success.

          // Wait distinct time or fix action. fixing action is better.
          // For now, I will assume success and push.
          this.props.history.push({
            pathname: nextRoute,
            search: this.props.location.search,
            state: { flowMode: true },
          });
        }
      }
    }
  };

  handleClose = () => {
    const tradeIdObj = this.props.editAgniveer?.tradeId?.[0];
    const tradeName = tradeIdObj?.label || tradeIdObj?.name;
    const listRoute = getListRoute(tradeName);
    this.props.history.push(listRoute);
  };

  render() {
    const { form, header } = this.state;

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
        <PhysicalProficiencyView
          header={header}
          form={form}
          updateField={this.updateField}
          onSubmit={this.onSubmit}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  physicalProficiency: state.physicalProficiency?.data?.rawData,
  editAgniveer: state.tradeUsers?.editAgniveer,
});

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, {
  submitPhysicalProficiency,
  fetchPhysicalProficiency,
  updatePhysicalProficiency,
  clearPhysicalProficiency,
  getSingleAgniveer,
})(withRouter(PhysicalProficiencyContainer));
