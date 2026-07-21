// import React from "react";
// import "./physicalProficiencyStyles.scss";
// import CheckboxControl from "../../../controls/checkbox/CheckboxControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import { useHistory } from "react-router-dom";
// import BackNavigation from "../../../common/navigation/BackNavigation";

// export default function PhysicalProficiencyView({
//   header,
//   form,
//   updateField,
//   onSubmit,
// }) {

//   const options = [
//     { label: "Excellent", value: "excellent" },
//     { label: "Good", value: "good" },
//     { label: "Satisfactory", value: "satisfactory" },
//     { label: "Fail", value: "fail" },
//   ];

//   return (
//     <div className="pp-page">
//       <BackNavigation />
//       <h2>Physical Proficiency</h2>

//       <div className="pp-info-card">
//         <div className="pp-info-left">
//           <div className="pp-info-row">
//             <div className="pp-info-label">Army Number</div>
//             <div className="pp-info-value">{header?.armyNo || "N/A"}</div>
//           </div>
//           <div className="pp-info-row">
//             <div className="pp-info-label">Squad Number</div>
//             <div className="pp-info-value">{header?.squadNo || "N/A"}</div>
//           </div>
//         </div>
//         <div className="pp-info-center">
//           <div className="pp-info-row">
//             <div className="pp-info-label">Name</div>
//             <div className="pp-info-value">{header?.name || "N/A"}</div>
//           </div>
//           <div className="pp-info-row">
//             <div className="pp-info-label">Rank</div>
//             <div className="pp-info-value">{header?.rank || "N/A"}</div>
//           </div>
//         </div>
//         <div className="pp-info-right">
//           <div className="pp-info-row">
//             <div className="pp-info-label">Course</div>
//             <div className="pp-info-value">{header?.course || "N/A"}</div>
//           </div>
//         </div>
//       </div>

//       {/* BPET */}
//       <div className="pp-section">
//         <h3 className="pp-section-title">BPET</h3>
//         <div className="pp-grid">
//           {["run5km", "sprint60m", "horizontalRope", "verticalRope"].map(
//             (key) => (
//               <div className="pp-card" key={key}>
//                 <div className="pp-card-title">
//                   {key === "run5km"
//                     ? "5 kms Run"
//                     : key === "sprint60m"
//                     ? "60 m Sprint"
//                     : key === "horizontalRope"
//                     ? "Horizontal Rope"
//                     : "Vertical Rope"}
//                 </div>
//                 <CheckboxControl
//                   options={options}
//                   value={form.bpet[key]}
//                   onChange={(val) => updateField("bpet", key, val)}
//                 />
//               </div>
//             )
//           )}
//         </div>
//       </div>

//       {/* PPT */}
//       <div className="pp-section">
//         <h3 className="pp-section-title">PPT</h3>
//         <div className="pp-grid">
//           {["km2_4", "chinUps", "pushUps", "shuttle5m"].map((key) => (
//             <div className="pp-card" key={key}>
//               <div className="pp-card-title">
//                 {key === "km2_4"
//                   ? "2.4 kms"
//                   : key === "chinUps"
//                   ? "Chin Ups"
//                   : key === "pushUps"
//                   ? "Push Ups"
//                   : "5 m Shuttle"}
//               </div>
//               <CheckboxControl
//                 options={options}
//                 value={form.ppt[key]}
//                 onChange={(val) => updateField("ppt", key, val)}
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="pp-submit-row">
//         <ButtonControl
//           text="Submit"
//           onClick={onSubmit}
//           styles="pp-submit-btn"
//         />
//       </div>
//     </div>
//   );
// }

import React, { useMemo } from "react";
import "./physicalProficiencyStyles.scss";
import CheckboxControl from "../../../controls/checkbox/CheckboxControl";
import ButtonControl from "../../../controls/button/ButtonControl";
import BackNavigation from "../../../common/navigation/BackNavigation";

export default function PhysicalProficiencyView({
  header,
  form,
  updateField,
  onSubmit,
}) {
  const options = [
    { label: "Excellent", value: "excellent" },
    { label: "Good", value: "good" },
    { label: "Satisfactory", value: "satisfactory" },
    { label: "Fail", value: "fail" },
  ];

  // Pass/Fail options for rope fields
  const passFailOptions = [
    { label: "Pass", value: "pass" },
    { label: "Fail", value: "fail" },
  ];

  // ---------- CHECK IF ALL FIELDS ARE SELECTED ----------
  const isFormComplete = useMemo(() => {
    const bpetKeys = [
      "run5km",
      "sprint60m",
      "horizontalRope",
      "verticalRope",
      "nineFeetDitch",
    ];
    const pptKeys = [
      "km2_4",
      "chinUps",
      "toeTouch",
      "sitUps",
      "sprint100m",
      "shuttle5m",
    ];

    const bpetComplete = bpetKeys.every((k) => form.bpet[k]);
    const pptComplete = pptKeys.every((k) => form.ppt[k]);

    return bpetComplete && pptComplete;
  }, [form]);

  return (
    <div className="pp-page">
      <BackNavigation />
      <h2>Physical Proficiency</h2>

      <div className="pp-info-card">
        <div className="pp-info-left">
          <div className="pp-info-row">
            <div className="pp-info-label">Army Number</div>
            <div className="pp-info-value">{header?.armyNo || "N/A"}</div>
          </div>
          <div className="pp-info-row">
            <div className="pp-info-label">Squad Number</div>
            <div className="pp-info-value">{header?.squadNo || "N/A"}</div>
          </div>
        </div>

        <div className="pp-info-center">
          <div className="pp-info-row">
            <div className="pp-info-label">Name</div>
            <div className="pp-info-value">{header?.name || "N/A"}</div>
          </div>
          <div className="pp-info-row">
            <div className="pp-info-label">Rank</div>
            <div className="pp-info-value">{header?.rank || "N/A"}</div>
          </div>
        </div>

        <div className="pp-info-right">
          <div className="pp-info-row">
            <div className="pp-info-label">Course</div>
            <div className="pp-info-value">{header?.course || "N/A"}</div>
          </div>
          <div className="pp-info-row">
            <div className="pp-info-label">Unit</div>
            <div className="pp-info-value">{header?.unit || "N/A"}</div>
          </div>
        </div>
      </div>

      {/* BPET */}
      <div className="pp-section">
        <h3 className="pp-section-title">BPET</h3>
        <div className="pp-grid">
          {[
            "run5km",
            "sprint60m",
            "horizontalRope",
            "verticalRope",
            "nineFeetDitch",
          ].map((key) => {
            // Use Pass/Fail options for rope and ditch fields
            const isPassFailField =
              key === "horizontalRope" ||
              key === "verticalRope" ||
              key === "nineFeetDitch";
            const fieldOptions = isPassFailField ? passFailOptions : options;

            return (
              <div className="pp-card" key={key}>
                <div className="pp-card-title">
                  {key === "run5km"
                    ? "5 Kms Run"
                    : key === "sprint60m"
                      ? "60 Mtr Sprint"
                      : key === "horizontalRope"
                        ? "Horizontal Rope"
                        : key === "verticalRope"
                          ? "Vertical Rope"
                          : "9 Feet Ditch"}
                </div>
                <CheckboxControl
                  options={fieldOptions}
                  value={form.bpet[key]}
                  onChange={(val) => updateField("bpet", key, val)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* PPT */}
      <div className="pp-section">
        <h3 className="pp-section-title">PPT</h3>
        <div className="pp-grid">
          {[
            "km2_4",
            "chinUps",
            "toeTouch",
            "shuttle5m",
            "sitUps",
            "sprint100m",
          ].map((key) => (
            <div className="pp-card" key={key}>
              <div className="pp-card-title">
                {key === "km2_4"
                  ? "2.4 Kms Run"
                  : key === "chinUps"
                    ? "Chin Up"
                    : key === "toeTouch"
                      ? "Toe Touch"
                      : key === "sitUps"
                        ? "Sit Up"
                        : key === "sprint100m"
                          ? "100 Mtr Sprint"
                          : "5 Mtr Shuttle"}
              </div>
              <CheckboxControl
                options={options}
                value={form.ppt[key]}
                onChange={(val) => updateField("ppt", key, val)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pp-submit-row">
        <ButtonControl
          text="Submit"
          onClick={onSubmit}
          styles="pp-submit-btn"
          disabled={!isFormComplete} // <<===== IMPORTANT
        />
      </div>
    </div>
  );
}
