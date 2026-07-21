// import React from "react";
// import "./operatorTechPhaseStyles.scss";
// import InputControl from "../../../controls/input/InputControl";
// import SelectControl from "../../../controls/select/SelectControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import { IoIosArrowBack } from "react-icons/io";
// import TextareaControl from "../../../controls/textarea/textareaControl";

// import { useHistory } from "react-router-dom";

// export default function OperatorTechPhase({
//   header,
//   form,
//   onFieldChange,
//   onSelectChange,
//   onWeekChange,
//   onSubmit,
// }) {
//   const history = useHistory();

//   // Helper to render numeric input with max value shown
//   const NumericRow = ({ label, valueKey, max = "", placeholder = "" }) => (
//     <div className="operator-tech-phase-small-card-row">
//       <div className="operator-tech-phase-numeric-label">{label}</div>
//       <div className="operator-tech-phase-numeric-input">
//         <InputControl
//           value={form?.[valueKey] ?? ""}
//           onChange={(e) => onFieldChange(valueKey, e.target.value)}
//           styles="operator-tech-phase-input-narrow"
//           placeholder={placeholder}
//         />
//         <div className="operator-tech-phase-max-inline">
//           <span>/</span> <p>{max}</p>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="operator-tech-phase-page">
//       <div className="ostp-header">
//         <IoIosArrowBack
//           className="ostp-back-icon"
//           onClick={() => history.goBack()}
//         />
//         <h2>Tech Phase</h2>
//       </div>

//       <div className="operator-tech-phase-info-card">
//         <div className="operator-tech-phase-info-left">
//           <div className="operator-tech-phase-info-row">
//             <div className="operator-tech-phase-info-label">Army Number</div>
//             <div className="operator-tech-phase-info-value">
//               {header?.agniveerNo}
//             </div>
//           </div>
//           <div className="operator-tech-phase-info-row">
//             <div className="operator-tech-phase-info-label">Squad Number</div>
//             <div className="operator-tech-phase-info-value">
//               {header?.squadNo}
//             </div>
//           </div>
//         </div>

//         <div className="operator-tech-phase-info-center">
//           <div className="operator-tech-phase-info-row">
//             <div className="operator-tech-phase-info-label">Name</div>
//             <div className="operator-tech-phase-info-value">{header?.name}</div>
//           </div>
//           <div className="operator-tech-phase-info-row">
//             <div className="operator-tech-phase-info-label">Rank</div>
//             <div className="operator-tech-phase-info-value">{header?.rank}</div>
//           </div>
//         </div>

//         <div className="operator-tech-phase-info-right">
//           <div className="operator-tech-phase-info-row">
//             <div className="operator-tech-phase-info-label">Course</div>
//             <div className="operator-tech-phase-info-value">
//               {header?.course}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* PRACTICAL - Main Grid */}
//       <div className="operator-tech-phase-card operator-tech-phase-practical-card">
//         <h3 className="operator-tech-phase-card-title">Practical Test</h3>

//         <div className="operator-tech-phase-practical-grid">
//           {/* RS CNR 900M */}
//           <div className="operator-tech-phase-small-card">
//             <h4 className="operator-tech-phase-small-card-title">
//               RS CNR 900M
//             </h4>
//             <NumericRow
//               label="CLR Mode"
//               valueKey="rs_cnr_clr"
//               max="05"
//               placeholder=""
//             />
//             <NumericRow
//               label="SEC Mode"
//               valueKey="rs_cnr_sec"
//               max="10"
//               placeholder=""
//             />
//             <NumericRow
//               label="AJ Mode"
//               valueKey="rs_cnr_aj"
//               max="10"
//               placeholder=""
//             />
//           </div>

//           {/* RS STARS V MK - II */}
//           <div className="operator-tech-phase-small-card">
//             <h4 className="operator-tech-phase-small-card-title">
//               RS STARS V MK - II
//             </h4>
//             <NumericRow
//               label="CLR Comm"
//               valueKey="rs_stars_clr"
//               max="05"
//             />
//             <NumericRow
//               label="SEC Comm"
//               valueKey="rs_stars_sec"
//               max="10"
//             />
//             <NumericRow
//               label="FH-2 Comm"
//               valueKey="rs_stars_fh2"
//               max="10"
//             />
//           </div>

//           {/* DCH */}
//           <div className="operator-tech-phase-small-card">
//             <h4 className="operator-tech-phase-small-card-title">DCH</h4>
//             <NumericRow label="ID Sel" valueKey="dch_id_sel" max="05" />
//             <NumericRow label="SR Comm" valueKey="dch_sr_comm" max="05" />
//             <NumericRow label="Tele" valueKey="dch_tele" max="10" />
//           </div>

//           {/* RT PROC */}
//           <div className="operator-tech-phase-small-card">
//             <h4 className="operator-tech-phase-small-card-title">RT PROC</h4>
//             <NumericRow
//               label="Sig Str Report Sheet"
//               valueKey="rt_sig_str"
//               max="05"
//             />
//             <NumericRow
//               label="Use of Code Words & Unicode"
//               valueKey="rt_code_words"
//               max="10"
//             />
//             <NumericRow label="VIVA" valueKey="rt_viva" max="05" />
//           </div>

//           {/* RS VRC */}
//           <div className="operator-tech-phase-small-card">
//             <h4 className="operator-tech-phase-small-card-title">RS VRC</h4>
//             <NumericRow
//               label="Dual Freq"
//               valueKey="rs_vrc_dual_freq"
//               max="05"
//             />
//           </div>

//           {/* Iden of Parts (right-most in second row) */}
//           <div className="operator-tech-phase-small-card">
//             <h4 className="operator-tech-phase-small-card-title">Iden of Parts</h4>
//             <div style={{ minHeight: "56px" }}>
//               <div className="operator-tech-phase-small-card-row">
//                 <div className="operator-tech-phase-numeric-label">Iden of Parts</div>
//                 <div className="operator-tech-phase-numeric-input">
//                   <InputControl
//                     value={form?.practical_iden_parts ?? ""}
//                     onChange={(e) => onFieldChange("practical_iden_parts", e.target.value)}
//                     styles="operator-tech-phase-input-narrow"
//                   />
//                   <div className="operator-tech-phase-max-inline">
//                     <span>/</span> <p>10</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Row 3 - BTY */}
//           <div className="operator-tech-phase-small-card">
//             <h4 className="operator-tech-phase-small-card-title">BTY</h4>
//             <NumericRow label="Series" valueKey="bty_series" max="05" />
//             <NumericRow label="Parallel" valueKey="bty_parallel" max="05" />
//           </div>

//           {/* Outdoor Ex */}
//           <div className="operator-tech-phase-small-card">
//             <h4 className="operator-tech-phase-small-card-title">Outdoor Ex</h4>
//             <div style={{ minHeight: "56px" }}>
//               <div className="operator-tech-phase-small-card-row">
//                 <div className="operator-tech-phase-numeric-label">Outdoor Ex</div>
//                 <div className="operator-tech-phase-numeric-input">
//                   <InputControl
//                     value={form?.outdoor_ex ?? ""}
//                     onChange={(e) => onFieldChange("outdoor_ex", e.target.value)}
//                     styles="operator-tech-phase-input-narrow"
//                   />
//                   <div className="operator-tech-phase-max-inline">
//                     <span>/</span> <p>10</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="operator-tech-phase-small-card operator-tech-phase-empty-slot" aria-hidden>
//           </div>
//         </div>
//       </div>

//       <div className="operator-tech-phase-card operator-tech-phase-restrictive">

//            <TextareaControl
//                     label="Restrictive Quality"
//                     value={form.restrictiveQuality || ""}
//                     onChange={(e) => onFieldChange("restrictiveQuality", e.target.value)}
//                     rows={4}
//                   />
//       </div>

//       <div className="operator-tech-phase-submit-row">
//         <ButtonControl
//           text="Submit"
//           onClick={onSubmit}
//           styles="operator-tech-phase-submit-btn"
//         />
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import "./operatorTechPhaseStyles.scss";
// import InputControl from "../../../controls/input/InputControl";
// import TextareaControl from "../../../controls/textarea/textareaControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import BackNavigation from "../../../common/navigation/BackNavigation";

// const MAX_SCORES = {
//   clrMode: 5,
//   secMode: 10,
//   ajMode: 10,
//   clrComn: 5,
//   secComn: 10,
//   fh2Comm: 10,
//   idsel:   5,
//   srComn: 5,
//   tele: 10,
//   sigStrReportSheet: 5,
//   useOfCode: 10,
//   viva: 5,
//   dualFreq: 5,
//   series: 5,
//   parallel: 5,
//   idenOfParts: 8,
//   outDoorEx: 10,
// };

// const formatMax = (val) => String(val || 0).padStart(2, "0");

// export default function OperatorTechPhase({
//   header,
//   form,
//   rawData,
//   onFieldChange,
//   onSubmit,
//   loading,
// }) {
//   const getMax = (key) => MAX_SCORES[key] || 10;

//   const handleChange = (key, value) => {
//     const max = getMax(key);
//     const num = value === "" ? "" : Number(value);

//     if (value === "" || (Number.isInteger(num) && num >= 0 && num <= max)) {
//       onFieldChange(key, value === "" ? "" : num);
//     }
//   };

//   const NumericInput = ({ label, field, max }) => (
//     <div className="operator-tech-phase-small-card-row">
//       <div className="operator-tech-phase-numeric-label">{label}</div>
//       <div className="operator-tech-phase-numeric-input">
//         <InputControl
//           type="numbers"
//           value={form?.[field] ?? ""}
//           onChange={(e) => handleChange(field, e.target.value)}
//           styles="operator-tech-phase-input-narrow"
//           min="0"
//           max={max}
//         />
//         <div className="operator-tech-phase-max-inline">
//           <span>/</span> <p>{formatMax(max)}</p>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="operator-tech-phase-page">
//       <div className="ostp-header">
//         <BackNavigation />
//         <h2>Tech Phase</h2>
//       </div>

//       {/* Header Info */}
//       <div className="operator-tech-phase-info-card">
//         <div className="operator-tech-phase-info-left">
//           <div className="operator-tech-phase-info-row">
//             <div className="operator-tech-phase-info-label">Army Number</div>
//             <div className="operator-tech-phase-info-value">{header?.agniveerNo}</div>
//           </div>
//           <div className="operator-tech-phase-info-row">
//             <div className="operator-tech-phase-info-label">Squad Number</div>
//             <div className="operator-tech-phase-info-value">{header?.squadNo}</div>
//           </div>
//         </div>
//         <div className="operator-tech-phase-info-center">
//           <div className="operator-tech-phase-info-row">
//             <div className="operator-tech-phase-info-label">Name</div>
//             <div className="operator-tech-phase-info-value">{header?.name}</div>
//           </div>
//           <div className="operator-tech-phase-info-row">
//             <div className="operator-tech-phase-info-label">Rank</div>
//             <div className="operator-tech-phase-info-value">{header?.rank}</div>
//           </div>
//         </div>
//         <div className="operator-tech-phase-info-right">
//           <div className="operator-tech-phase-info-row">
//             <div className="operator-tech-phase-info-label">Course</div>
//             <div className="operator-tech-phase-info-value">{header?.course}</div>
//           </div>
//         </div>
//       </div>

//       {/* Practical Grid */}
//       <div className="operator-tech-phase-card operator-tech-phase-practical-card">
//         <h3 className="operator-tech-phase-card-title">Practical Test</h3>
//         <div className="operator-tech-phase-practical-grid">

//           {/* RS CNR 100 */}
//           <div className="operator-tech-phase-small-card">
//             <h4 className="operator-tech-phase-small-card-title">RS CNR 900M</h4>
//             <NumericInput label="CLR Mode" field="clrMode" max={5} />
//             <NumericInput label="SEC Mode" field="secMode" max={10} />
//             <NumericInput label="AJ Mode" field="ajMode" max={10} />
//           </div>

//           {/* RS STARS V Mk */}
//           <div className="operator-tech-phase-small-card">
//             <h4 className="operator-tech-phase-small-card-title">RS STARS V MK - II</h4>
//             <NumericInput label="CLR Comn" field="clrComn" max={5} />
//             <NumericInput label="SEC Comn" field="secComn" max={10} />
//             <NumericInput label="FH-2 Comm" field="fh2Comm" max={10} />
//           </div>

//           {/* DCH */}
//           <div className="operator-tech-phase-small-card">
//             <h4 className="operator-tech-phase-small-card-title">DCH</h4>
//             <NumericInput label="ID Sel" field="idsel" max={5} />
//             <NumericInput label="SR Comn" field="srComn" max={5} />
//             <NumericInput label="Tele" field="tele" max={10} />
//           </div>

//           {/* RT Proc */}
//           <div className="operator-tech-phase-small-card">
//             <h4 className="operator-tech-phase-small-card-title">RT PROC</h4>
//             <NumericInput label="Sig Str Report Sheet" field="sigStrReportSheet" max={5} />
//             <NumericInput label="Use of Code Words & Unicode" field="useOfCode" max={10} />
//             <NumericInput label="VIVA" field="viva" max={5} />
//           </div>

//           {/* RS VRC */}
//           <div className="operator-tech-phase-small-card">
//             <h4 className="operator-tech-phase-small-card-title">RS VRC</h4>
//             <NumericInput label="Dual Freq" field="dualFreq" max={5} />
//           </div>

//   <div className="operator-tech-phase-small-card">
//             <NumericInput label="Iden of Parts" field="idenOfParts" max={10} />
//           </div>

//           {/* BYT */}
//           <div className="operator-tech-phase-small-card">
//             <h4 className="operator-tech-phase-small-card-title">BYT</h4>
//             <NumericInput label="Series" field="series" max={5} />
//             <NumericInput label="Parallel" field="parallel" max={5} />
//           </div>

//    <div className="operator-tech-phase-small-card">
//             <NumericInput label="Outdoor Ex" field="outDoorEx" max={10} />
//           </div>

//         </div>
//       </div>

//       <div className="operator-tech-phase-card operator-tech-phase-restrictive">
//         <TextareaControl
//           label="Restrictive Quality"
//           value={form?.restrictiveQuality || ""}
//           onChange={(e) => onFieldChange("restrictiveQuality", e.target.value)}
//           rows={4}
//         />
//       </div>

//       {/* Submit Button */}
//       <div className="operator-tech-phase-submit-row">
//         <ButtonControl
//           text={loading ? "Saving..." : "Submit"}
//           onClick={onSubmit}
//           disabled={loading}
//           styles="operator-tech-phase-submit-btn"
//         />
//       </div>
//     </div>
//   );
// }

// // OperatorTechPhase.jsx - FIXED VERSION
// import React from "react";
// import "./operatorTechPhaseStyles.scss";
// import InputControl from "../../../controls/input/InputControl";
// import TextareaControl from "../../../controls/textarea/textareaControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import BackNavigation from "../../../common/navigation/BackNavigation";

// const MAX_SCORES = {
//   theoreticalWritten: 50,
//   theoreticalQuiz: 30,
//   clrMode: 5,
//   secMode: 10,
//   ajMode: 10,
//   clrComn: 5,
//   secComn: 10,
//   fh2Comm: 10,
//   idsel: 5,
//   srComn: 5,
//   tele: 10,
//   sigStrReportSheet: 5,
//   useOfCode: 10,
//   viva: 5,
//   dualFreq: 5,
//   series: 5,
//   parallel: 5,
//   idenOfParts: 8,
//   outDoorEx: 10,
// };

// const formatMax = (val) => String(val || 0).padStart(2, "0");

// const REQUIRED_FIELDS = [
//   "theoretical.writtenScore",
//   "theoretical.quizScore",
//   "clrMode",
//   "secMode",
//   "ajMode",
//   "clrComn",
//   "secComn",
//   "fh2Comm",
//   "idsel",
//   "srComn",
//   "tele",
//   "sigStrReportSheet",
//   "useOfCode",
//   "viva",
//   "dualFreq",
//   "series",
//   "parallel",
//   "idenOfParts",
//   "outDoorEx",
// ];

// export default function OperatorTechPhase({
//   header,
//   form,
//   rawData,
//   onFieldChange,
//   onSubmit,
//   loading,
// }) {
//   const getValue = (field) => {
//     const keys = field.split(".");
//     let val = form;
//     for (let k of keys) {
//       val = val?.[k];
//       if (val === undefined || val === null) return "";
//     }
//     return val;
//   };

//   // Fixed: Proper max detection for theoretical fields
//   const getMaxScore = (field) => {
//     if (field === "theoretical.writtenScore") return MAX_SCORES.theoreticalWritten;
//     if (field === "theoretical.quizScore") return MAX_SCORES.theoreticalQuiz;
//     const key = field.includes(".") ? field.split(".")[1] : field;
//     return MAX_SCORES[key] || 10;
//   };

//   // Unified change handler that respects correct max
//   const handleChange = (field, value) => {
//     const max = getMaxScore(field);
//     const num = value === "" ? "" : Number(value);

//     if (value === "" || (Number.isInteger(num) && num >= 0 && num <= max)) {
//       onFieldChange(field, value === "" ? "" : num);
//     }
//   };

//   const NumericInput = ({ label, field, max }) => (
//     <div className="operator-tech-phase-small-card-row">
//       <div className="operator-tech-phase-numeric-label">{label}</div>
//       <div className="operator-tech-phase-numeric-input">
//         <InputControl
//           type="numbers"
//           value={getValue(field)}
//           onChange={(e) => handleChange(field, e.target.value)}
//           styles="operator-tech-phase-input-narrow"
//           min="0"
//           max={max}
//         />
//         <div className="operator-tech-phase-max-inline">
//           <span>/</span> <p>{formatMax(max)}</p>
//         </div>
//       </div>
//     </div>
//   );

//   const isFormComplete = () => {
//     const allFilled = REQUIRED_FIELDS.every((field) => {
//       const val = getValue(field);
//       return val !== "" && val !== null && val !== undefined;
//     });
//     return allFilled && (form?.restrictiveQuality || "").trim().length > 0;
//   };

//   return (
//     <div className="operator-tech-phase-page">
//       <div className="ostp-header">
//         <BackNavigation />
//         <h2>Tech Phase</h2>
//       </div>

//       {/* Header Info */}
//       <div className="operator-tech-phase-info-card">
//         <div className="operator-tech-phase-info-left">
//           <div className="operator-tech-phase-info-row">
//             <div className="operator-tech-phase-info-label">Army Number</div>
//             <div className="operator-tech-phase-info-value">{header?.agniveerNo}</div>
//           </div>
//           <div className="operator-tech-phase-info-row">
//             <div className="operator-tech-phase-info-label">Squad Number</div>
//             <div className="operator-tech-phase-info-value">{header?.squadNo}</div>
//           </div>
//         </div>
//         <div className="operator-tech-phase-info-center">
//           <div className="operator-tech-phase-info-row">
//             <div className="operator-tech-phase-info-label">Name</div>
//             <div className="operator-tech-phase-info-value">{header?.name}</div>
//           </div>
//           <div className="operator-tech-phase-info-row">
//             <div className="operator-tech-phase-info-label">Rank</div>
//             <div className="operator-tech-phase-info-value">{header?.rank}</div>
//           </div>
//         </div>
//         <div className="operator-tech-phase-info-right">
//           <div className="operator-tech-phase-info-row">
//             <div className="operator-tech-phase-info-label">Course</div>
//             <div className="operator-tech-phase-info-value">{header?.course}</div>
//           </div>
//         </div>
//       </div>

//       {/* Theoretical Test Section - NOW SUPPORTS 50 & 30 */}
//       <div className="operator-tech-phase-card operator-tech-phase-theoretical-card">
//         <h3 className="operator-tech-phase-card-title">Theoretical Test</h3>
//         <div className="operator-tech-phase-two-col">
//           <div className="operator-tech-phase-inline-field">
//             <div className="operator-tech-phase-inline-field-wrapper">
//               <div className="operator-tech-phase-numeric-label-write">Written</div>
//               <InputControl
//                 type="numbers"
//                 value={getValue("theoretical.writtenScore")}
//                 onChange={(e) => handleChange("theoretical.writtenScore", e.target.value)}
//                 styles="operator-tech-phase-input-inline"
//                 min="0"
//                 max="50"
//               />
//             </div>
//             <div className="operator-tech-phase-max-inline-write">
//               <span>/</span> <p>50</p>
//             </div>
//           </div>
//           <div className="operator-tech-phase-inline-field">
//             <div className="operator-tech-phase-inline-field-wrapper">
//               <div className="operator-tech-phase-numeric-label-quiz">Quiz</div>
//               <InputControl
//                 type="numbers"
//                 value={getValue("theoretical.quizScore")}
//                 onChange={(e) => handleChange("theoretical.quizScore", e.target.value)}
//                 styles="operator-tech-phase-input-inline"
//                 min="0"
//                 max="30"
//               />
//             </div>
//             <div className="operator-tech-phase-max-inline-quiz">
//               <span>/</span> <p>30</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Practical Test Section */}
//       <div className="operator-tech-phase-card operator-tech-phase-practical-card">
//         <h3 className="operator-tech-phase-card-title">Practical Test</h3>
//         <div className="operator-tech-phase-practical-grid">
//           <div className="operator-tech-phase-small-card">
//             <h4 className="operator-tech-phase-small-card-title">RS CNR 900M</h4>
//             <NumericInput label="CLR Mode" key="clrMode" field="clrMode" max={5} />
//             <NumericInput label="SEC Mode" key="secMode"  field="secMode" max={10} />
//             <NumericInput label="AJ Mode" field="ajMode" max={10} />
//           </div>
//           <div className="operator-tech-phase-small-card">
//             <h4 className="operator-tech-phase-small-card-title">RS STARS V MK - II</h4>
//             <NumericInput label="CLR Comn" field="clrComn" max={5} />
//             <NumericInput label="SEC Comn" field="secComn" max={10} />
//             <NumericInput label="FH-2 Comm" field="fh2Comm" max={10} />
//           </div>
//           <div className="operator-tech-phase-small-card">
//             <h4 className="operator-tech-phase-small-card-title">DCH</h4>
//             <NumericInput label="ID Sel" field="idsel" max={5} />
//             <NumericInput label="SR Comn" field="srComn" max={5} />
//             <NumericInput label="Tele" field="tele" max={10} />
//           </div>
//           <div className="operator-tech-phase-small-card">
//             <h4 className="operator-tech-phase-small-card-title">RT PROC</h4>
//             <NumericInput label="Sig Str Report Sheet" field="sigStrReportSheet" max={5} />
//             <NumericInput label="Use of Code Words & Unicode" field="useOfCode" max={10} />
//             <NumericInput label="VIVA" field="viva" max={5} />
//           </div>
//           <div className="operator-tech-phase-small-card">
//             <h4 className="operator-tech-phase-small-card-title">RS VRC</h4>
//             <NumericInput label="Dual Freq" field="dualFreq" max={5} />
//           </div>
//           <div className="operator-tech-phase-small-card">
//             <NumericInput label="Iden of Parts" field="idenOfParts" max={8} />
//           </div>
//           <div className="operator-tech-phase-small-card">
//             <h4 className="operator-tech-phase-small-card-title">BYT</h4>
//             <NumericInput label="Series" field="series" max={5} />
//             <NumericInput label="Parallel" field="parallel" max={5} />
//           </div>
//           <div className="operator-tech-phase-small-card">
//             <NumericInput label="Outdoor Ex" field="outDoorEx" max={10} />
//           </div>
//         </div>
//       </div>

//       {/* Restrictive Quality */}
//       <div className="operator-tech-phase-card operator-tech-phase-restrictive">
//         <TextareaControl
//           label="Restrictive Quality"
//           value={form?.restrictiveQuality || ""}
//           onChange={(e) => onFieldChange("restrictiveQuality", e.target.value)}
//           rows={4}
//         />
//       </div>

//       {/* Submit */}
//       <div className="operator-tech-phase-submit-row">
//         <ButtonControl
//           text="Submit"
//           onClick={onSubmit}
//           disabled={loading || !isFormComplete()}
//           styles="operator-tech-phase-submit-btn"
//         />
//       </div>
//     </div>
//   );
// }

import BackNavigation from "../../../common/navigation/BackNavigation";
import ButtonControl from "../../../controls/button/ButtonControl";
import InputControl from "../../../controls/input/InputControl";
import TextareaControl from "../../../controls/textarea/textareaControl";
import "./operatorTechPhaseStyles.scss";

const MAX_SCORES = {
  theoreticalWritten: 50,
  theoreticalQuiz: 30,
  clrMode: 5,
  secMode: 10,
  ajMode: 10,
  clrComn: 5,
  secComn: 10,
  fh2Comm: 10,
  idsel: 5,
  srComn: 5,
  tele: 10,
  sigStrReportSheet: 5,
  useOfCode: 10,
  viva: 5,
  dualFreq: 5,
  seriesParallel: 5,
  idenOfParts: 10,
  outDoorEx: 10,
};

const formatMax = (val) => String(val || 0).padStart(2, "0");

const REQUIRED_FIELDS = [
  "theoretical.writtenScore",
  "theoretical.quizScore",
  "clrMode",
  "secMode",
  "ajMode",
  "clrComn",
  "secComn",
  "fh2Comm",
  "idsel",
  "srComn",
  "tele",
  "sigStrReportSheet",
  "useOfCode",
  "viva",
  "dualFreq",
  "seriesParallel",
  "idenOfParts",
  "outDoorEx",
];

export default function OperatorTechPhase({
  header,
  form,
  onFieldChange,
  onSubmit,
  loading,
}) {
  const getValue = (field) => {
    if (!field.includes(".")) return form?.[field] ?? "";
    const keys = field.split(".");
    let val = form;
    for (let k of keys) {
      val = val?.[k];
      if (val === undefined || val === null) return "";
    }
    return val;
  };

  const getMaxScore = (field) => {
    if (field === "theoretical.writtenScore")
      return MAX_SCORES.theoreticalWritten;
    if (field === "theoretical.quizScore") return MAX_SCORES.theoreticalQuiz;
    const key = field.includes(".") ? field.split(".")[1] : field;
    return MAX_SCORES[key] || 10;
  };

  // Helper function to round values to 2 decimal places
  const roundToTwoDecimals = (value) => {
    if (value === "" || value === null || value === undefined) return "";
    const num = parseFloat(value);
    if (isNaN(num)) return value; // Return original if not a number
    return parseFloat(num.toFixed(2)).toString();
  };

  const handleChange = (field, value) => {
    if (value !== "" && !/^\d*\.?\d*$/.test(value)) return;

    // If value ends with ".", keep it as-is (user is still typing)
    let roundedValue = value;
    if (value !== "" && !value.endsWith(".")) {
      const num = parseFloat(value);
      if (!isNaN(num)) {
        roundedValue = parseFloat(num.toFixed(2)).toString();
      }
    }

    const max = getMaxScore(field);
    const num = roundedValue === "" ? "" : Number(roundedValue);

    // Only update if it's a valid number within range or a partial decimal (like "5.")
    if (roundedValue === "" || (num >= 0 && num <= max)) {
      onFieldChange(field, roundedValue);
    }
  };

  const handleBlur = (field, value) => {
    if (value === "" || value === null || value === undefined) return;

    const roundedValue = roundToTwoDecimals(value);
    if (roundedValue !== value) {
      const max = getMaxScore(field);
      const numValue = Number(roundedValue);

      // Only update if rounded value is within max range
      if (!isNaN(numValue) && numValue >= 0 && numValue <= max) {
        onFieldChange(field, roundedValue);
      }
    }
  };

  const isFormComplete = () => {
    const allFilled = REQUIRED_FIELDS.every((field) => {
      const val = getValue(field);
      return val !== "" && val !== null && val !== undefined;
    });
    return allFilled;
  };

  return (
    <div className="operator-tech-phase-page">
      <div className="ostp-header">
        <BackNavigation />
        <h2>Tech Phase</h2>
      </div>

      {/* Header Info */}
      <div className="operator-tech-phase-info-card">
        <div className="operator-tech-phase-info-left">
          <div className="operator-tech-phase-info-row">
            <div className="operator-tech-phase-info-label">Army Number</div>
            <div className="operator-tech-phase-info-value">
              {header?.agniveerNo}
            </div>
          </div>
          <div className="operator-tech-phase-info-row">
            <div className="operator-tech-phase-info-label">Squad Number</div>
            <div className="operator-tech-phase-info-value">
              {header?.squadNo}
            </div>
          </div>
        </div>
        <div className="operator-tech-phase-info-center">
          <div className="operator-tech-phase-info-row">
            <div className="operator-tech-phase-info-label">Name</div>
            <div className="operator-tech-phase-info-value">{header?.name}</div>
          </div>
          <div className="operator-tech-phase-info-row">
            <div className="operator-tech-phase-info-label">Rank</div>
            <div className="operator-tech-phase-info-value">{header?.rank}</div>
          </div>
        </div>
        <div className="operator-tech-phase-info-right">
          <div className="operator-tech-phase-info-row">
            <div className="operator-tech-phase-info-label">Course</div>
            <div className="operator-tech-phase-info-value">
              {header?.course}
            </div>
          </div>
        </div>
      </div>

      {/* Theoretical Test Section */}
      <div className="operator-tech-phase-card operator-tech-phase-theoretical-card">
        <h3 className="operator-tech-phase-card-title">Theoretical Test</h3>
        <div className="operator-tech-phase-two-col">
          <div className="operator-tech-phase-inline-field">
            <div className="operator-tech-phase-inline-field-wrapper">
              <div className="operator-tech-phase-numeric-label-write">
                WRITTEN
              </div>
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
                styles="operator-tech-phase-input-inline"
              />
            </div>
            <div className="operator-tech-phase-max-inline-write">
              <span>/</span> <p>50</p>
            </div>
          </div>
          <div className="operator-tech-phase-inline-field">
            <div className="operator-tech-phase-inline-field-wrapper">
              <div className="operator-tech-phase-numeric-label-quiz">QUIZ</div>
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
                styles="operator-tech-phase-input-inline"
              />
            </div>
            <div className="operator-tech-phase-max-inline-quiz">
              <span>/</span> <p>30</p>
            </div>
          </div>
        </div>
      </div>

      {/* Practical Test Section */}
      <div className="operator-tech-phase-card operator-tech-phase-practical-card">
        <h3 className="operator-tech-phase-card-title">Practical Test</h3>
        <div className="operator-tech-phase-practical-grid">
          <div className="operator-tech-phase-small-card">
            <h4 className="operator-tech-phase-small-card-title">
              RS CNR 900M
            </h4>
            <div className="operator-tech-phase-small-card-row">
              <div className="operator-tech-phase-numeric-label">CLR Comn</div>
              <div className="operator-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("clrMode")}
                  onChange={(e) => handleChange("clrMode", e.target.value)}
                  onBlur={(e) => handleBlur("clrMode", e.target.value)}
                  styles="operator-tech-phase-input-narrow"
                />
                <div className="operator-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(5)}</p>
                </div>
              </div>
            </div>
            <div className="operator-tech-phase-small-card-row">
              <div className="operator-tech-phase-numeric-label">SEC Comn</div>
              <div className="operator-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("secMode")}
                  onChange={(e) => handleChange("secMode", e.target.value)}
                  onBlur={(e) => handleBlur("secMode", e.target.value)}
                  styles="operator-tech-phase-input-narrow"
                />
                <div className="operator-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(10)}</p>
                </div>
              </div>
            </div>
            <div className="operator-tech-phase-small-card-row">
              <div className="operator-tech-phase-numeric-label">AJ Comn</div>
              <div className="operator-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("ajMode")}
                  onChange={(e) => handleChange("ajMode", e.target.value)}
                  onBlur={(e) => handleBlur("ajMode", e.target.value)}
                  styles="operator-tech-phase-input-narrow"
                />
                <div className="operator-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(10)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="operator-tech-phase-small-card">
            <h4 className="operator-tech-phase-small-card-title">
              RS STARS V MK - II
            </h4>
            <div className="operator-tech-phase-small-card-row">
              <div className="operator-tech-phase-numeric-label">CLR Comn</div>
              <div className="operator-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("clrComn")}
                  onChange={(e) => handleChange("clrComn", e.target.value)}
                  onBlur={(e) => handleBlur("clrComn", e.target.value)}
                  styles="operator-tech-phase-input-narrow"
                />
                <div className="operator-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(5)}</p>
                </div>
              </div>
            </div>
            <div className="operator-tech-phase-small-card-row">
              <div className="operator-tech-phase-numeric-label">SEC Comn</div>
              <div className="operator-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("secComn")}
                  onChange={(e) => handleChange("secComn", e.target.value)}
                  onBlur={(e) => handleBlur("secComn", e.target.value)}
                  styles="operator-tech-phase-input-narrow"
                />
                <div className="operator-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(10)}</p>
                </div>
              </div>
            </div>
            <div className="operator-tech-phase-small-card-row">
              <div className="operator-tech-phase-numeric-label">FH-2 Comm</div>
              <div className="operator-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("fh2Comm")}
                  onChange={(e) => handleChange("fh2Comm", e.target.value)}
                  onBlur={(e) => handleBlur("fh2Comm", e.target.value)}
                  styles="operator-tech-phase-input-narrow"
                />
                <div className="operator-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(10)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="operator-tech-phase-small-card">
            <h4 className="operator-tech-phase-small-card-title">DCH</h4>
            <div className="operator-tech-phase-small-card-row">
              <div className="operator-tech-phase-numeric-label">ID Sel</div>
              <div className="operator-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("idsel")}
                  onChange={(e) => handleChange("idsel", e.target.value)}
                  onBlur={(e) => handleBlur("idsel", e.target.value)}
                  styles="operator-tech-phase-input-narrow"
                />
                <div className="operator-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(5)}</p>
                </div>
              </div>
            </div>
            <div className="operator-tech-phase-small-card-row">
              <div className="operator-tech-phase-numeric-label">SR Comn</div>
              <div className="operator-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("srComn")}
                  onChange={(e) => handleChange("srComn", e.target.value)}
                  onBlur={(e) => handleBlur("srComn", e.target.value)}
                  styles="operator-tech-phase-input-narrow"
                />
                <div className="operator-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(5)}</p>
                </div>
              </div>
            </div>
            <div className="operator-tech-phase-small-card-row">
              <div className="operator-tech-phase-numeric-label">Tele</div>
              <div className="operator-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("tele")}
                  onChange={(e) => handleChange("tele", e.target.value)}
                  onBlur={(e) => handleBlur("tele", e.target.value)}
                  styles="operator-tech-phase-input-narrow"
                />
                <div className="operator-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(10)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="operator-tech-phase-small-card">
            <h4 className="operator-tech-phase-small-card-title">RT PROC</h4>
            <div className="operator-tech-phase-small-card-row">
              <div className="operator-tech-phase-numeric-label">
                Fill Up Sig Str Report Sheet
              </div>
              <div className="operator-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("sigStrReportSheet")}
                  onChange={(e) =>
                    handleChange("sigStrReportSheet", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("sigStrReportSheet", e.target.value)
                  }
                  styles="operator-tech-phase-input-narrow"
                />
                <div className="operator-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(5)}</p>
                </div>
              </div>
            </div>
            <div className="operator-tech-phase-small-card-row">
              <div className="operator-tech-phase-numeric-label">
                Making Call with Code Words & Unicode
              </div>
              <div className="operator-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("useOfCode")}
                  onChange={(e) => handleChange("useOfCode", e.target.value)}
                  onBlur={(e) => handleBlur("useOfCode", e.target.value)}
                  styles="operator-tech-phase-input-narrow"
                />
                <div className="operator-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(10)}</p>
                </div>
              </div>
            </div>
            <div className="operator-tech-phase-small-card-row">
              <div className="operator-tech-phase-numeric-label">VIVA</div>
              <div className="operator-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("viva")}
                  onChange={(e) => handleChange("viva", e.target.value)}
                  onBlur={(e) => handleBlur("viva", e.target.value)}
                  styles="operator-tech-phase-input-narrow"
                />
                <div className="operator-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(5)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="operator-tech-phase-small-card">
            <h4 className="operator-tech-phase-small-card-title">RS VRC</h4>
            <div className="operator-tech-phase-small-card-row">
              <div className="operator-tech-phase-numeric-label">Dual Freq</div>
              <div className="operator-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("dualFreq")}
                  onChange={(e) => handleChange("dualFreq", e.target.value)}
                  onBlur={(e) => handleBlur("dualFreq", e.target.value)}
                  styles="operator-tech-phase-input-narrow"
                />
                <div className="operator-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(5)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="operator-tech-phase-small-card">
            <h4 className="operator-tech-phase-small-card-title">
              Iden of Parts
            </h4>
            <div className="operator-tech-phase-small-card-row">
              <div className="operator-tech-phase-numeric-label">
                Iden of Parts
              </div>
              <div className="operator-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("idenOfParts")}
                  onChange={(e) => handleChange("idenOfParts", e.target.value)}
                  onBlur={(e) => handleBlur("idenOfParts", e.target.value)}
                  styles="operator-tech-phase-input-narrow"
                />
                <div className="operator-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(10)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="operator-tech-phase-small-card">
            <h4 className="operator-tech-phase-small-card-title">BTY</h4>
            <div className="operator-tech-phase-small-card-row">
              <div className="operator-tech-phase-numeric-label">
                Parallel/Series
              </div>
              <div className="operator-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("seriesParallel")}
                  onChange={(e) =>
                    handleChange("seriesParallel", e.target.value)
                  }
                  onBlur={(e) => handleBlur("seriesParallel", e.target.value)}
                  styles="operator-tech-phase-input-narrow"
                />
                <div className="operator-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(5)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="operator-tech-phase-small-card">
            <h4 className="operator-tech-phase-small-card-title">Outdoor</h4>
            <div className="operator-tech-phase-small-card-row">
              <div className="operator-tech-phase-numeric-label">
                Outdoor Ex
              </div>
              <div className="operator-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("outDoorEx")}
                  onChange={(e) => handleChange("outDoorEx", e.target.value)}
                  onBlur={(e) => handleBlur("outDoorEx", e.target.value)}
                  styles="operator-tech-phase-input-narrow"
                />
                <div className="operator-tech-phase-max-inline">
                  <span>/</span> <p>{formatMax(10)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restrictive Quality */}
      <div className="operator-tech-phase-card operator-tech-phase-restrictive">
        <TextareaControl
          label="Restrictive Quality"
          value={form?.restrictiveQuality || ""}
          onChange={(e) => onFieldChange("restrictiveQuality", e.target.value)}
          rows={4}
        />
      </div>

      <div className="operator-tech-phase-submit-row">
        <ButtonControl
          text="Submit"
          onClick={onSubmit}
          disabled={loading || !isFormComplete()}
          styles="operator-tech-phase-submit-btn"
        />
      </div>
    </div>
  );
}
