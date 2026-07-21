// import React from "react";
// import "./ofcTechPhaseStyles.scss";
// import InputControl from "../../../controls/input/InputControl";
// import TextareaControl from "../../../controls/textarea/textareaControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import BackNavigation from "../../../common/navigation/BackNavigation";

// const MAX_SCORES = {
//   // RS CNR 900M
//   "practical.rscnr900m.clrMode": 5,
//   "practical.rscnr900m.secMode": 5,
//   "practical.rscnr900m.ajMode": 10,

//   // RS STARS V Mk2
//   "practical.rsStarsVMk2.clrComn": 5,
//   "practical.rsStarsVMk2.secComn": 5,
//   "practical.rsStarsVMk2.fh2Comm": 10,

//   // RT Proc
//   "practical.rtProc.sigStrReportSheet": 5,
//   "practical.rtProc.useOfCode": 5,

//   // BFSR
//   "practical.bfsr.installation": 10,
//   "practical.bfsr.initialisation": 10,
//   "practical.bfsr.orientation": 10,
//   "practical.bfsr.drawMap": 10,

//   // Misc
//   "practical.misc.idenOfParts": 10,
//   "practical.misc.outDoorEx": 10,
//   "practical.misc.byt": 5,
// };

// const formatMax = (val) => String(val || 0).padStart(2, "0");

// export default function OfcTechPhase({
//   header,
//   form,
//   onFieldChange,
//   onSubmit,
//   loading,
// }) {
//   const handleChange = (path, value) => {
//     const max = MAX_SCORES[path] ;
//     const num = value === "" ? "" : Number(value);

//     if (value === "" || (Number.isInteger(num) && num >= 0 && num <= max)) {
//       const keys = path.split(".");
//       onFieldChange(keys, value === "" ? "" : num);
//     }
//   };

//   const NumericInput = ({ label, path, max }) => (
//     <div className="ofc-tech-phase-small-card-row">
//       <div className="ofc-tech-phase-numeric-label">{label}</div>
//       <div className="ofc-tech-phase-numeric-input">
//         <InputControl
//           type="numbers"
//           value={getNestedValue(form, path) ?? ""}
//           onChange={(e) => handleChange(path, e.target.value)}
//           styles="ofc-tech-phase-input-narrow"
//           min="0"
//           max={max}
//         />
//         <div className="ofc-tech-phase-max-inline">
//           <span>/</span> <p>{formatMax(max)}</p>
//         </div>
//       </div>
//     </div>
//   );

//   const getNestedValue = (obj, path) => {
//     return path.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : ""), obj);
//   };

//   return (
//     <div className="ofc-tech-phase-page">
//       <div className="ofctp-header">
//         <BackNavigation />
//         <h2>Tech Phase</h2>
//       </div>

//       <div className="ofc-tech-phase-info-card">
//         <div className="ofc-tech-phase-info-left">
//           <div className="ofc-tech-phase-info-row">
//             <div className="ofc-tech-phase-info-label">Army Number</div>
//             <div className="ofc-tech-phase-info-value">{header?.agniveerNo}</div>
//           </div>
//           <div className="ofc-tech-phase-info-row">
//             <div className="ofc-tech-phase-info-label">Squad Number</div>
//             <div className="ofc-tech-phase-info-value">{header?.squadNo}</div>
//           </div>
//         </div>
//         <div className="ofc-tech-phase-info-center">
//           <div className="ofc-tech-phase-info-row">
//             <div className="ofc-tech-phase-info-label">Name</div>
//             <div className="ofc-tech-phase-info-value">{header?.name}</div>
//           </div>
//           <div className="ofc-tech-phase-info-row">
//             <div className="ofc-tech-phase-info-label">Rank</div>
//             <div className="ofc-tech-phase-info-value">{header?.rank}</div>
//           </div>
//         </div>
//         <div className="ofc-tech-phase-info-right">
//           <div className="ofc-tech-phase-info-row">
//             <div className="ofc-tech-phase-info-label">Course</div>
//             <div className="ofc-tech-phase-info-value">{header?.course}</div>
//           </div>
//         </div>
//       </div>

//       <div className="ofc-tech-phase-card ofc-tech-phase-practical-card">
//         <h3 className="ofc-tech-phase-card-title">Practical Test</h3>
//         <div className="ofc-tech-phase-practical-grid">
//           <div className="ofc-tech-phase-small-card">
//             <h4 className="ofc-tech-phase-small-card-title">RS CNR 900M</h4>
//             <NumericInput label="CLR Mode" path="practical.rscnr900m.clrMode" max={5} />
//             <NumericInput label="SEC Mode" path="practical.rscnr900m.secMode" max={5} />
//             <NumericInput label="AJ Mode" path="practical.rscnr900m.ajMode" max={10} />
//           </div>

//           <div className="ofc-tech-phase-small-card">
//             <h4 className="ofc-tech-phase-small-card-title">RS STARS V MK-II</h4>
//             <NumericInput label="CLR Comn" path="practical.rsStarsVMk2.clrComn" max={5} />
//             <NumericInput label="SEC Comn" path="practical.rsStarsVMk2.secComn" max={5} />
//             <NumericInput label="FH-2 Comm" path="practical.rsStarsVMk2.fh2Comm" max={10} />
//           </div>

//            <div className="ofc-tech-phase-small-card">
//             <NumericInput label="Bty" path="practical.misc.byt" max={5} />
//           </div>

//           <div className="ofc-tech-phase-small-card">
//             <h4 className="ofc-tech-phase-small-card-title">RT PROC</h4>
//             <NumericInput label="Sig Str Report Sheet" path="practical.rtProc.sigStrReportSheet" max={5} />
//             <NumericInput label="Use of Code Word & Unicode Key" path="practical.rtProc.useOfCode" max={5} />
//           </div>

//           <div className="ofc-tech-phase-small-card">
//             <h4 className="ofc-tech-phase-small-card-title">BFSR (SR)/(MR)</h4>
//             <NumericInput label="Installation" path="practical.bfsr.installation" max={10} />
//             <NumericInput label="Initialisation" path="practical.bfsr.initialisation" max={10} />
//             <NumericInput label="Orientation" path="practical.bfsr.orientation" max={10} />
//             <NumericInput label="Draw Map/Op of 17 Mtr Mob Most" path="practical.bfsr.drawMap" max={10} />
//           </div>
//           <div className="ofc-tech-phase-small-card">
//             <NumericInput label="Iden of Parts" path="practical.misc.idenOfParts" max={10} />
//           </div>

//            <div className="ofc-tech-phase-small-card">
//             <NumericInput label="Outdoor Ex" path="practical.misc.outDoorEx" max={10} />
//           </div>

//         </div>
//       </div>

//       <div className="ofc-tech-phase-card ofc-tech-phase-restrictive">
//         <TextareaControl
//           label="Restrictive Quality"
//           value={form?.restrictiveQuality || ""}
//           onChange={(e) => onFieldChange(["restrictiveQuality"], e.target.value)}
//           rows={4}
//         />
//       </div>

//       <div className="ofc-tech-phase-submit-row">
//         <ButtonControl
//           text={loading ? "Saving..." : "Submit"}
//           onClick={onSubmit}
//           disabled={loading}
//           styles="ofc-tech-phase-submit-btn"
//         />
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import "./ofcTechPhaseStyles.scss";
// import InputControl from "../../../controls/input/InputControl";
// import TextareaControl from "../../../controls/textarea/textareaControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import BackNavigation from "../../../common/navigation/BackNavigation";

// const MAX_SCORES = {
//     "theoretical.writtenScore": 50,
//   "theoretical.quizScore": 30,
//   // RS CNR 900M
//   "practical.rscnr900m.clrMode": 5,
//   "practical.rscnr900m.secMode": 5,
//   "practical.rscnr900m.ajMode": 10,

//   // RS STARS V Mk2
//   "practical.rsStarsVMk2.clrComn": 5,
//   "practical.rsStarsVMk2.secComn": 5,
//   "practical.rsStarsVMk2.fh2Comm": 10,

//   // RT Proc
//   "practical.rtProc.sigStrReportSheet": 5,
//   "practical.rtProc.useOfCode": 5,

//   // BFSR
//   "practical.bfsr.installation": 10,
//   "practical.bfsr.initialisation": 10,
//   "practical.bfsr.orientation": 10,
//   "practical.bfsr.drawMap": 10,

//   // Misc
//   "practical.misc.idenOfParts": 10,
//   "practical.misc.outDoorEx": 10,
//   "practical.misc.byt": 5,
// };

// const formatMax = (val) => String(val || 0).padStart(2, "0");

// // List of all practical fields that must be filled
// const REQUIRED_PRACTICAL_FIELDS = Object.keys(MAX_SCORES);

// export default function OfcTechPhase({
//   header,
//   form,
//   onFieldChange,
//   onSubmit,
//   loading,
// }) {
//   const handleChange = (path, value) => {
//     const max = MAX_SCORES[path];
//     const num = value === "" ? "" : Number(value);

//     if (value === "" || (Number.isInteger(num) && num >= 0 && num <= max)) {
//       const keys = path.split(".");
//       onFieldChange(keys, value === "" ? "" : num);
//     }
//   };

//   const NumericInput = ({ label, path, max }) => (
//     <div className="ofc-tech-phase-small-card-row">
//       <div className="ofc-tech-phase-numeric-label">{label}</div>
//       <div className="ofc-tech-phase-numeric-input">
//         <InputControl
//           type="numbers"
//           value={getNestedValue(form, path) ?? ""}
//           onChange={(e) => handleChange(path, e.target.value)}
//           styles="ofc-tech-phase-input-narrow"
//           min="0"
//           max={max}
//         />
//         <div className="ofc-tech-phase-max-inline">
//           <span>/</span> <p>{formatMax(max)}</p>
//         </div>
//       </div>
//     </div>
//   );

//   const getNestedValue = (obj, path) => {
//     return path.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : ""), obj);
//   };

//   // ---------- NEW: Submit button disable logic ----------
//  const isFormComplete = () => {
//   const allPracticalsFilled = REQUIRED_PRACTICAL_FIELDS.every(
//     (field) => getNestedValue(form, field) !== "" && getNestedValue(form, field) !== undefined
//   );
//   const restrictiveFilled = (form?.restrictiveQuality || "").trim().length > 0;
//   const theoreticalFilled =
//     form?.theoretical?.writtenScore !== "" && form?.theoretical?.quizScore !== "";

//   return allPracticalsFilled && restrictiveFilled && theoreticalFilled;
// };

//   // ----------------------------------------------------

//   return (
//     <div className="ofc-tech-phase-page">
//       <div className="ofctp-header">
//         <BackNavigation />
//         <h2>Tech Phase</h2>
//       </div>

//       <div className="ofc-tech-phase-info-card">
//         <div className="ofc-tech-phase-info-left">
//           <div className="ofc-tech-phase-info-row">
//             <div className="ofc-tech-phase-info-label">Army Number</div>
//             <div className="ofc-tech-phase-info-value">{header?.agniveerNo}</div>
//           </div>
//           <div className="ofc-tech-phase-info-row">
//             <div className="ofc-tech-phase-info-label">Squad Number</div>
//             <div className="ofc-tech-phase-info-value">{header?.squadNo}</div>
//           </div>
//         </div>
//         <div className="ofc-tech-phase-info-center">
//           <div className="ofc-tech-phase-info-row">
//             <div className="ofc-tech-phase-info-label">Name</div>
//             <div className="ofc-tech-phase-info-value">{header?.name}</div>
//           </div>
//           <div className="ofc-tech-phase-info-row">
//             <div className="ofc-tech-phase-info-label">Rank</div>
//             <div className="ofc-tech-phase-info-value">{header?.rank}</div>
//           </div>
//         </div>
//         <div className="ofc-tech-phase-info-right">
//           <div className="ofc-tech-phase-info-row">
//             <div className="ofc-tech-phase-info-label">Course</div>
//             <div className="ofc-tech-phase-info-value">{header?.course}</div>
//           </div>
//         </div>
//       </div>

//       <div className="ofc-tech-phase-card ofc-tech-phase-theoretical-card">
//   <h3 className="ofc-tech-phase-card-title">Theoretical Test</h3>
//   <div className="ofc-tech-phase-two-col">
//     <div className="ofc-tech-phase-inline-field">
//       <div className="ofc-tech-phase-inline-field-wrapper">
//         <div className="ofc-tech-phase-numeric-label">Written</div>
//         <InputControl
//   type="numbers"
//   value={form?.theoretical?.writtenScore || ""}
//   onChange={(e) =>
//     handleChange("theoretical.writtenScore", e.target.value)
//   }
//   styles="ofc-tech-phase-input-inline"
//   min="0"
//   max={50}
// />

//       </div>
//       <div className="ofc-tech-phase-max-inline">
//         / <p>50</p>
//       </div>
//     </div>

//     <div className="ofc-tech-phase-inline-field">
//       <div className="ofc-tech-phase-inline-field-wrapper">
//         <div className="ofc-tech-phase-numeric-label">Quiz</div>
//       <InputControl
//   type="numbers"
//   value={form?.theoretical?.quizScore || ""}
//   onChange={(e) =>
//     handleChange("theoretical.quizScore", e.target.value)
//   }
//   styles="ofc-tech-phase-input-inline"
//   min="0"
//   max={30}
// />

//       </div>
//       <div className="ofc-tech-phase-max-inline">
//         / <p>30</p>
//       </div>
//     </div>
//   </div>
// </div>

//       <div className="ofc-tech-phase-card ofc-tech-phase-practical-card">
//         <h3 className="ofc-tech-phase-card-title">Practical Test</h3>
//         <div className="ofc-tech-phase-practical-grid">
//           <div className="ofc-tech-phase-small-card">
//             <h4 className="ofc-tech-phase-small-card-title">RS CNR 900M</h4>
//             <NumericInput label="CLR Mode" path="practical.rscnr900m.clrMode" max={5} />
//             <NumericInput label="SEC Mode" path="practical.rscnr900m.secMode" max={5} />
//             <NumericInput label="AJ Mode" path="practical.rscnr900m.ajMode" max={10} />
//           </div>

//           <div className="ofc-tech-phase-small-card">
//             <h4 className="ofc-tech-phase-small-card-title">RS STARS V MK-II</h4>
//             <NumericInput label="CLR Comn" path="practical.rsStarsVMk2.clrComn" max={5} />
//             <NumericInput label="SEC Comn" path="practical.rsStarsVMk2.secComn" max={5} />
//             <NumericInput label="FH-2 Comm" path="practical.rsStarsVMk2.fh2Comm" max={10} />
//           </div>

//           <div className="ofc-tech-phase-small-card">
//             <NumericInput label="Bty" path="practical.misc.byt" max={5} />
//           </div>

//           <div className="ofc-tech-phase-small-card">
//             <h4 className="ofc-tech-phase-small-card-title">RT PROC</h4>
//             <NumericInput label="Sig Str Report Sheet" path="practical.rtProc.sigStrReportSheet" max={5} />
//             <NumericInput label="Use of Code Word & Unicode Key" path="practical.rtProc.useOfCode" max={5} />
//           </div>

//           <div className="ofc-tech-phase-small-card">
//             <h4 className="ofc-tech-phase-small-card-title">BFSR (SR)/(MR)</h4>
//             <NumericInput label="Installation" path="practical.bfsr.installation" max={10} />
//             <NumericInput label="Initialisation" path="practical.bfsr.initialisation" max={10} />
//             <NumericInput label="Orientation" path="practical.bfsr.orientation" max={10} />
//             <NumericInput label="Draw Map/Op of 17 Mtr Mob Most" path="practical.bfsr.drawMap" max={10} />
//           </div>
//           <div className="ofc-tech-phase-small-card">
//             <NumericInput label="Iden of Parts" path="practical.misc.idenOfParts" max={10} />
//           </div>

//           <div className="ofc-tech-phase-small-card">
//             <NumericInput label="Outdoor Ex" path="practical.misc.outDoorEx" max={10} />
//           </div>
//         </div>
//       </div>

//       <div className="ofc-tech-phase-card ofc-tech-phase-restrictive">
//         <TextareaControl
//           label="Restrictive Quality"
//           value={form?.restrictiveQuality || ""}
//           onChange={(e) => onFieldChange(["restrictiveQuality"], e.target.value)}
//           rows={4}
//         />
//       </div>

//       <div className="ofc-tech-phase-submit-row">
//         <ButtonControl
//           text={"Submit"}
//           onClick={onSubmit}
//           disabled={loading || !isFormComplete()}
//           styles="ofc-tech-phase-submit-btn"
//         />
//       </div>
//     </div>
//   );
// }

import React from "react";
import "./ofcTechPhaseStyles.scss";
import InputControl from "../../../controls/input/InputControl";
import TextareaControl from "../../../controls/textarea/textareaControl";
import ButtonControl from "../../../controls/button/ButtonControl";
import BackNavigation from "../../../common/navigation/BackNavigation";

const MAX_SCORES = {
  "theoretical.writtenScore": 50,
  "theoretical.quizScore": 30,
  // RS CNR 900M
  "practical.rscnr900m.clrMode": 5,
  "practical.rscnr900m.secMode": 5,
  "practical.rscnr900m.ajMode": 10,

  // RS STARS V Mk2
  "practical.rsStarsVMk2.clrComn": 5,
  "practical.rsStarsVMk2.secComn": 5,
  "practical.rsStarsVMk2.fh2Comm": 10,

  // RT Proc
  "practical.rtProc.sigStrReportSheet": 5,
  "practical.rtProc.useOfCode": 5,

  // BFSR
  "practical.bfsr.installation": 10,
  "practical.bfsr.initialisation": 10,
  "practical.bfsr.orientation": 10,
  "practical.bfsr.drawMap": 10,

  // DCH
  "practical.dch.idSelection": 5,

  // Misc
  "practical.misc.idenOfParts": 10,
  "practical.misc.outDoorEx": 10,
  "practical.misc.byt": 5,
};

const formatMax = (val) => String(val || 0).padStart(2, "0");

const REQUIRED_PRACTICAL_FIELDS = Object.keys(MAX_SCORES).filter((key) =>
  key.startsWith("practical."),
);

export default function OfcTechPhase({
  header,
  form,
  onFieldChange,
  onSubmit,
  loading,
}) {
  const getValue = (path) => {
    return (
      path
        .split(".")
        .reduce((o, k) => (o && o[k] !== undefined ? o[k] : ""), form) ?? ""
    );
  };

  // Helper function to round values to 2 decimal places
  const roundToTwoDecimals = (value) => {
    if (value === "" || value === null || value === undefined) return "";
    const num = parseFloat(value);
    if (isNaN(num)) return value; // Return original if not a number
    return parseFloat(num.toFixed(2)).toString();
  };

  const handleChange = (path, value) => {
    if (value !== "" && !/^\d*\.?\d*$/.test(value)) return;

    // If value ends with ".", keep it as-is (user is still typing)
    let roundedValue = value;
    if (value !== "" && !value.endsWith(".")) {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        roundedValue = parseFloat(num.toFixed(2)).toString();
      }
    }

    const max = MAX_SCORES[path] || 0;
    const num = roundedValue === "" ? "" : Number(roundedValue);

    // Only update if it's a valid number within range or a partial decimal (like "5.")
    if (roundedValue === "" || (num >= 0 && num <= max)) {
      onFieldChange(path, roundedValue);
    }
  };

  const handleBlur = (path, value) => {
    if (value === "" || value === null || value === undefined) return;

    const roundedValue = roundToTwoDecimals(value);
    if (roundedValue !== value) {
      const max = MAX_SCORES[path] || 0;
      const numValue = Number(roundedValue);

      // Only update if rounded value is within max range
      if (!isNaN(numValue) && numValue >= 0 && numValue <= max) {
        onFieldChange(path, roundedValue);
      }
    }
  };

  const isFormComplete = () => {
    const theoreticalFilled =
      getValue("theoretical.writtenScore") !== "" &&
      getValue("theoretical.quizScore") !== "";

    const allPracticalsFilled = REQUIRED_PRACTICAL_FIELDS.every(
      (field) => getValue(field) !== "" && getValue(field) !== undefined,
    );

    return theoreticalFilled && allPracticalsFilled;
  };

  return (
    <div className="ofc-tech-phase-page">
      <div className="ofctp-header">
        <BackNavigation />
        <h2>Tech Phase</h2>
      </div>

      <div className="ofc-tech-phase-info-card">
        <div className="ofc-tech-phase-info-left">
          <div className="ofc-tech-phase-info-row">
            <div className="ofc-tech-phase-info-label">Army Number</div>
            <div className="ofc-tech-phase-info-value">
              {header?.agniveerNo}
            </div>
          </div>
          <div className="ofc-tech-phase-info-row">
            <div className="ofc-tech-phase-info-label">Squad Number</div>
            <div className="ofc-tech-phase-info-value">{header?.squadNo}</div>
          </div>
        </div>
        <div className="ofc-tech-phase-info-center">
          <div className="ofc-tech-phase-info-row">
            <div className="ofc-tech-phase-info-label">Name</div>
            <div className="ofc-tech-phase-info-value">{header?.name}</div>
          </div>
          <div className="ofc-tech-phase-info-row">
            <div className="ofc-tech-phase-info-label">Rank</div>
            <div className="ofc-tech-phase-info-value">{header?.rank}</div>
          </div>
        </div>
        <div className="ofc-tech-phase-info-right">
          <div className="ofc-tech-phase-info-row">
            <div className="ofc-tech-phase-info-label">Course</div>
            <div className="ofc-tech-phase-info-value">{header?.course}</div>
          </div>
          <div className="ofc-tech-phase-info-row">
            <div className="ofc-tech-phase-info-label">Unit</div>
            <div className="ofc-tech-phase-info-value">
              {header?.unit || "-"}
            </div>
          </div>
        </div>
      </div>

      <div className="ofc-tech-phase-card ofc-tech-phase-theoretical-card">
        <h3 className="ofc-tech-phase-card-title">Theoretical Test</h3>
        <div className="ofc-tech-phase-two-col">
          <div className="ofc-tech-phase-inline-field">
            <div className="ofc-tech-phase-inline-field-wrapper">
              <div className="ofc-tech-phase-numeric-label">WRITTEN</div>
              <InputControl
                type="text"
                inputMode="decimal"
                value={getValue("theoretical.writtenScore")}
                onChange={(e) =>
                  handleChange("theoretical.writtenScore", e.target.value)
                }
                onBlur={(e) =>
                  handleBlur("theoretical.writtenScore", e.target.value)
                }
                styles="ofc-tech-phase-input-inline"
              />
            </div>
            <div className="ofc-tech-phase-max-inline">
              / <p>{formatMax(50)}</p>
            </div>
          </div>

          <div className="ofc-tech-phase-inline-field">
            <div className="ofc-tech-phase-inline-field-wrapper">
              <div className="ofc-tech-phase-numeric-label">QUIZ</div>
              <InputControl
                type="text"
                inputMode="decimal"
                value={getValue("theoretical.quizScore")}
                onChange={(e) =>
                  handleChange("theoretical.quizScore", e.target.value)
                }
                onBlur={(e) =>
                  handleBlur("theoretical.quizScore", e.target.value)
                }
                styles="ofc-tech-phase-input-inline"
              />
            </div>
            <div className="ofc-tech-phase-max-inline">
              / <p>{formatMax(30)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="ofc-tech-phase-card ofc-tech-phase-practical-card">
        <h3 className="ofc-tech-phase-card-title">Practical Test</h3>
        <div className="ofc-tech-phase-practical-grid">
          <div className="ofc-tech-phase-small-card">
            <h4 className="ofc-tech-phase-small-card-title">RS CNR 900M</h4>
            <div className="ofc-tech-phase-small-card-row">
              <div className="ofc-tech-phase-numeric-label">CLR Comn</div>
              <div className="ofc-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.rscnr900m.clrMode")}
                  onChange={(e) =>
                    handleChange("practical.rscnr900m.clrMode", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.rscnr900m.clrMode", e.target.value)
                  }
                  styles="ofc-tech-phase-input-narrow"
                />
                <div className="ofc-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(5)}</p>
                </div>
              </div>
            </div>
            <div className="ofc-tech-phase-small-card-row">
              <div className="ofc-tech-phase-numeric-label">SEC Comn</div>
              <div className="ofc-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.rscnr900m.secMode")}
                  onChange={(e) =>
                    handleChange("practical.rscnr900m.secMode", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.rscnr900m.secMode", e.target.value)
                  }
                  styles="ofc-tech-phase-input-narrow"
                />
                <div className="ofc-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(5)}</p>
                </div>
              </div>
            </div>
            <div className="ofc-tech-phase-small-card-row">
              <div className="ofc-tech-phase-numeric-label">AJ Comn</div>
              <div className="ofc-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.rscnr900m.ajMode")}
                  onChange={(e) =>
                    handleChange("practical.rscnr900m.ajMode", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.rscnr900m.ajMode", e.target.value)
                  }
                  styles="ofc-tech-phase-input-narrow"
                />
                <div className="ofc-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(10)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="ofc-tech-phase-small-card">
            <h4 className="ofc-tech-phase-small-card-title">
              RS STARS V MK-II
            </h4>
            <div className="ofc-tech-phase-small-card-row">
              <div className="ofc-tech-phase-numeric-label">CLR Comn</div>
              <div className="ofc-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.rsStarsVMk2.clrComn")}
                  onChange={(e) =>
                    handleChange(
                      "practical.rsStarsVMk2.clrComn",
                      e.target.value,
                    )
                  }
                  onBlur={(e) =>
                    handleBlur("practical.rsStarsVMk2.clrComn", e.target.value)
                  }
                  styles="ofc-tech-phase-input-narrow"
                />
                <div className="ofc-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(5)}</p>
                </div>
              </div>
            </div>
            <div className="ofc-tech-phase-small-card-row">
              <div className="ofc-tech-phase-numeric-label">SEC Comn</div>
              <div className="ofc-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.rsStarsVMk2.secComn")}
                  onChange={(e) =>
                    handleChange(
                      "practical.rsStarsVMk2.secComn",
                      e.target.value,
                    )
                  }
                  onBlur={(e) =>
                    handleBlur("practical.rsStarsVMk2.secComn", e.target.value)
                  }
                  styles="ofc-tech-phase-input-narrow"
                />
                <div className="ofc-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(5)}</p>
                </div>
              </div>
            </div>
            <div className="ofc-tech-phase-small-card-row">
              <div className="ofc-tech-phase-numeric-label">FH-2 Comn</div>
              <div className="ofc-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.rsStarsVMk2.fh2Comm")}
                  onChange={(e) =>
                    handleChange(
                      "practical.rsStarsVMk2.fh2Comm",
                      e.target.value,
                    )
                  }
                  onBlur={(e) =>
                    handleBlur("practical.rsStarsVMk2.fh2Comm", e.target.value)
                  }
                  styles="ofc-tech-phase-input-narrow"
                />
                <div className="ofc-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(10)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="ofc-tech-phase-small-card">
            <h4 className="ofc-tech-phase-small-card-title">BTY</h4>
            <div className="ofc-tech-phase-small-card-row">
              <div className="ofc-tech-phase-numeric-label">
                Series/Parallel
              </div>
              <div className="ofc-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.misc.byt")}
                  onChange={(e) =>
                    handleChange("practical.misc.byt", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.misc.byt", e.target.value)
                  }
                  styles="ofc-tech-phase-input-narrow"
                />
                <div className="ofc-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(5)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="ofc-tech-phase-small-card">
            <h4 className="ofc-tech-phase-small-card-title">RT PROC</h4>
            <div className="ofc-tech-phase-small-card-row">
              <div className="ofc-tech-phase-numeric-label">
                Fill Up Sig Str Report Sheet
              </div>
              <div className="ofc-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.rtProc.sigStrReportSheet")}
                  onChange={(e) =>
                    handleChange(
                      "practical.rtProc.sigStrReportSheet",
                      e.target.value,
                    )
                  }
                  onBlur={(e) =>
                    handleBlur(
                      "practical.rtProc.sigStrReportSheet",
                      e.target.value,
                    )
                  }
                  styles="ofc-tech-phase-input-narrow"
                />
                <div className="ofc-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(5)}</p>
                </div>
              </div>
            </div>
            <div className="ofc-tech-phase-small-card-row">
              <div className="ofc-tech-phase-numeric-label">
                Making Call with Code Word & Unicode
              </div>
              <div className="ofc-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.rtProc.useOfCode")}
                  onChange={(e) =>
                    handleChange("practical.rtProc.useOfCode", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.rtProc.useOfCode", e.target.value)
                  }
                  styles="ofc-tech-phase-input-narrow"
                />
                <div className="ofc-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(5)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="ofc-tech-phase-small-card">
            <h4 className="ofc-tech-phase-small-card-title">BFSR (SR)/(MR)</h4>
            <div className="ofc-tech-phase-small-card-row">
              <div className="ofc-tech-phase-numeric-label">Installation</div>
              <div className="ofc-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.bfsr.installation")}
                  onChange={(e) =>
                    handleChange("practical.bfsr.installation", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.bfsr.installation", e.target.value)
                  }
                  styles="ofc-tech-phase-input-narrow"
                />
                <div className="ofc-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(10)}</p>
                </div>
              </div>
            </div>
            <div className="ofc-tech-phase-small-card-row">
              <div className="ofc-tech-phase-numeric-label">Initialisation</div>
              <div className="ofc-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.bfsr.initialisation")}
                  onChange={(e) =>
                    handleChange(
                      "practical.bfsr.initialisation",
                      e.target.value,
                    )
                  }
                  onBlur={(e) =>
                    handleBlur("practical.bfsr.initialisation", e.target.value)
                  }
                  styles="ofc-tech-phase-input-narrow"
                />
                <div className="ofc-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(10)}</p>
                </div>
              </div>
            </div>
            <div className="ofc-tech-phase-small-card-row">
              <div className="ofc-tech-phase-numeric-label">Orientation</div>
              <div className="ofc-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.bfsr.orientation")}
                  onChange={(e) =>
                    handleChange("practical.bfsr.orientation", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.bfsr.orientation", e.target.value)
                  }
                  styles="ofc-tech-phase-input-narrow"
                />
                <div className="ofc-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(10)}</p>
                </div>
              </div>
            </div>
            <div className="ofc-tech-phase-small-card-row">
              <div className="ofc-tech-phase-numeric-label">
                Draw Map/Op of 17 Mtr Mob Mast(Any Two)
              </div>
              <div className="ofc-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.bfsr.drawMap")}
                  onChange={(e) =>
                    handleChange("practical.bfsr.drawMap", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.bfsr.drawMap", e.target.value)
                  }
                  styles="ofc-tech-phase-input-narrow"
                />
                <div className="ofc-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(10)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="ofc-tech-phase-small-card">
            <h4 className="ofc-tech-phase-small-card-title">DCH</h4>
            <div className="ofc-tech-phase-small-card-row">
              <div className="ofc-tech-phase-numeric-label">ID Selection</div>
              <div className="ofc-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.dch.idSelection")}
                  onChange={(e) =>
                    handleChange("practical.dch.idSelection", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.dch.idSelection", e.target.value)
                  }
                  styles="ofc-tech-phase-input-narrow"
                />
                <div className="ofc-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(5)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="ofc-tech-phase-small-card">
            <h4 className="ofc-tech-phase-small-card-title">Iden of Parts</h4>
            <div className="ofc-tech-phase-small-card-row">
              <div className="ofc-tech-phase-numeric-label">Iden of Parts</div>
              <div className="ofc-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.misc.idenOfParts")}
                  onChange={(e) =>
                    handleChange("practical.misc.idenOfParts", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.misc.idenOfParts", e.target.value)
                  }
                  styles="ofc-tech-phase-input-narrow"
                />
                <div className="ofc-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(10)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="ofc-tech-phase-small-card">
            <h4 className="ofc-tech-phase-small-card-title">Outdoor</h4>
            <div className="ofc-tech-phase-small-card-row">
              <div className="ofc-tech-phase-numeric-label">Outdoor Ex</div>
              <div className="ofc-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.misc.outDoorEx")}
                  onChange={(e) =>
                    handleChange("practical.misc.outDoorEx", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.misc.outDoorEx", e.target.value)
                  }
                  styles="ofc-tech-phase-input-narrow"
                />
                <div className="ofc-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(10)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ofc-tech-phase-card ofc-tech-phase-restrictive">
        <TextareaControl
          label="Restrictive Quality"
          value={form?.restrictiveQuality || ""}
          onChange={(e) => onFieldChange("restrictiveQuality", e.target.value)}
          rows={4}
        />
      </div>

      <div className="ofc-tech-phase-submit-row">
        <ButtonControl
          text="Submit"
          onClick={onSubmit}
          disabled={loading || !isFormComplete()}
          styles="ofc-tech-phase-submit-btn"
        />
      </div>
    </div>
  );
}
