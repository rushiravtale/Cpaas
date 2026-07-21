// import React from "react";
// import "./driverTechPhaseStyles.scss";
// import InputControl from "../../../controls/input/InputControl";
// import SelectControl from "../../../controls/select/SelectControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import { IoIosArrowBack } from "react-icons/io";
// import { useHistory } from "react-router-dom";

// export default function DriverTechPhase({
//   header,
//   form,
//   onFieldChange,
//   onSelectChange,
//   onWeekChange,
//   onSubmit,
// }) {
//   const history = useHistory();

//   return (
//     <div className="driver-tech-phase-page">
//       <div className="gtp-header">
//         <IoIosArrowBack
//           className="gtp-back-icon"
//           onClick={() => history.goBack()}
//         />
//         <h2>Tech Phase</h2>
//       </div>

//       <div className="driver-tech-phase-info-card">
//         <div className="driver-tech-phase-info-left">
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Army Number</div>
//             <div className="driver-tech-phase-info-value">
//               {header?.agniveerNo}
//             </div>
//           </div>
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Squad Number</div>
//             <div className="driver-tech-phase-info-value">
//               {header?.squadNo}
//             </div>
//           </div>
//         </div>

//         <div className="driver-tech-phase-info-center">
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Name</div>
//             <div className="driver-tech-phase-info-value">{header?.name}</div>
//           </div>
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Rank</div>
//             <div className="driver-tech-phase-info-value">{header?.rank}</div>
//           </div>
//         </div>

//         <div className="driver-tech-phase-info-right">
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Course</div>
//             <div className="driver-tech-phase-info-value">{header?.course}</div>
//           </div>
//         </div>
//       </div>

//       {/* TEST ROWS */}
//       <div className="driver-tech-phase-test-row">
//         {/* PHYSICAL */}
//         <div className="driver-tech-phase-card driver-tech-phase-physical-card">
//           <h3 className="driver-tech-phase-card-title">Physical Test</h3>

//           <div className="driver-tech-phase-two-col">
//             <div className="driver-tech-phase-field-col">
//               <SelectControl
//                 label="BPET"
//                 value={form.bpetOption}
//                 options={[
//                   { value: "excellent", label: "Excellent" },
//                   { value: "satisfactory", label: "Satisfactory" },
//                   { value: "poor", label: "Poor" },
//                 ]}
//                 onChange={(opt) => onSelectChange("bpetOption", opt)}
//                 styles="driver-tech-phase-select-inline"
//               />
//             </div>

//             <div className="driver-tech-phase-field-col">
//               <SelectControl
//                 label="PPT"
//                 value={form.pptOption}
//                 options={[
//                   { value: "excellent", label: "Excellent" },
//                   { value: "satisfactory", label: "Satisfactory" },
//                   { value: "poor", label: "Poor" },
//                 ]}
//                 onChange={(opt) => onSelectChange("pptOption", opt)}
//                 styles="driver-tech-phase-select-inline"
//               />
//             </div>
//           </div>
//         </div>

//         {/* THEORETICAL */}
//         <div className="driver-tech-phase-card driver-tech-phase-theoretical-card">
//           <h3 className="driver-tech-phase-card-title">Theoretical Test</h3>

//           <div className="driver-tech-phase-two-col">
//             <div className="driver-tech-phase-inline-field">
//               <div className="driver-tech-phase-inline-field-wrapper">
//                 <div className="driver-tech-phase-numeric-label-write">
//                   Written
//                 </div>

//                 <InputControl
//                   value={form.written}
//                   onChange={(e) => onFieldChange("written", e.target.value)}
//                   styles="driver-tech-phase-input-inline"
//                 />
//               </div>
//               <div className="driver-tech-phase-max-inline-write">
//                 <span>/</span> <p>50</p>
//               </div>
//             </div>

//             <div className="driver-tech-phase-inline-field">
//               <div className="driver-tech-phase-inline-field-wrapper">
//                 <div className="driver-tech-phase-numeric-label-quiz">Quiz</div>

//                 <InputControl
//                   value={form.quiz}
//                   onChange={(e) => onFieldChange("quiz", e.target.value)}
//                   styles="driver-tech-phase-input-inline"
//                 />
//               </div>
//               <div className="driver-tech-phase-max-inline-quiz">
//                 <span>/</span> <p>30</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* PRACTICAL */}
//       <div className="driver-tech-phase-card driver-tech-phase-practical-card">
//         <h3 className="driver-tech-phase-card-title">Practical Test</h3>

//         <div className="driver-tech-phase-practical-grid">
//           {/* PKT */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">PKT</h4>
//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">S&A</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.pkt_sa || ""}
//                   onChange={(e) => onFieldChange("pkt_sa", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>10</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">
//                 IDEN of Parts
//               </div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.pkt_iden || ""}
//                   onChange={(e) => onFieldChange("pkt_iden", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>04</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* EQPT PH */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">EQPT PH</h4>
//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">
//                 STAB & SI OP
//               </div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.eqpt_stab || ""}
//                   onChange={(e) => onFieldChange("eqpt_stab", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>10</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">
//                 IDEN of Parts
//               </div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.eqpt_iden || ""}
//                   onChange={(e) => onFieldChange("eqpt_iden", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>06</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* GUN PH */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">GUN PH</h4>
//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">S&A</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.gun_sa || ""}
//                   onChange={(e) => onFieldChange("gun_sa", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>20</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">
//                 IDEN of Parts
//               </div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.gun_iden || ""}
//                   onChange={(e) => onFieldChange("gun_iden", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>50</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* MSL */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">MSL PH</h4>
//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">
//                 IDEN of Parts
//               </div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.msl_iden || ""}
//                   onChange={(e) => onFieldChange("msl_iden", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>50</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* IMS */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">IMS</h4>
//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">ATGM</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.ims_atgm || ""}
//                   onChange={(e) => onFieldChange("ims_atgm", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>50</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* FD FIRING */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">FD FIRING</h4>
//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">GUN</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.fd_gun || ""}
//                   onChange={(e) => onFieldChange("fd_gun", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>50</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">PKT</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.fd_pkt || ""}
//                   onChange={(e) => onFieldChange("fd_pkt", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>50</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">MSL</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.fd_msl || ""}
//                   onChange={(e) => onFieldChange("fd_msl", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>50</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* SUBMIT */}
//       <div className="driver-tech-phase-submit-row">
//         <ButtonControl
//           text="Submit"
//           onClick={onSubmit}
//           styles="driver-tech-phase-submit-btn"
//         />
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import "./driverTechPhaseStyles.scss";
// import InputControl from "../../../controls/input/InputControl";
// import SelectControl from "../../../controls/select/SelectControl"; // kept (unused) to preserve original imports
// import TextareaControl from "../../../controls/textarea/textareaControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import { IoIosArrowBack } from "react-icons/io";
// import { useHistory } from "react-router-dom";
// import BackNavigation from "../../../common/navigation/BackNavigation";

// export default function DriverTechPhase({
//   header,
//   form,
//   onFieldChange,
//   onSubmit,
// }) {
//   const history = useHistory();

//   return (
//     <div className="driver-tech-phase-page">
//       <div className="gtp-header">

//         <BackNavigation/>
//         <h2>Tech Phase</h2>
//       </div>

//       {/* INFO CARD */}
//       <div className="driver-tech-phase-info-card">
//         <div className="driver-tech-phase-info-left">
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Army Number</div>
//             <div className="driver-tech-phase-info-value">
//               {header?.agniveerNo}
//             </div>
//           </div>
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Squad Number</div>
//             <div className="driver-tech-phase-info-value">
//               {header?.squadNo}
//             </div>
//           </div>
//         </div>

//         <div className="driver-tech-phase-info-center">
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Name</div>
//             <div className="driver-tech-phase-info-value">{header?.name}</div>
//           </div>
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Rank</div>
//             <div className="driver-tech-phase-info-value">{header?.rank}</div>
//           </div>
//         </div>

//         <div className="driver-tech-phase-info-right">
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Course</div>
//             <div className="driver-tech-phase-info-value">{header?.course}</div>
//           </div>
//         </div>
//       </div>

//       {/* PRACTICAL TEST TITLE */}
//       <div className="driver-tech-phase-card driver-tech-phase-practical-card">
//         <h3 className="driver-tech-phase-card-title">Practical Test</h3>

//         {/* Grid for two columns (first row) and two columns (second row) */}
//         <div className="driver-tech-phase-practical-grid two-col">
//           {/* PRAC TEST - I */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">PRAC TEST - I</h4>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">Iden of Parts</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.prac1_iden || ""}
//                   onChange={(e) => onFieldChange("prac1_iden", e.target.value)}
//                   styles="driver-tech-phase-input-narrow driver-input-control-wrapper"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>10</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">Sys Trace Out</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.prac1_sysTrace || ""}
//                   onChange={(e) => onFieldChange("prac1_sysTrace", e.target.value)}
//                   styles="driver-tech-phase-input-narrow  driver-input-control-wrapper"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>10</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">VIVA</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.prac1_viva || ""}
//                   onChange={(e) => onFieldChange("prac1_viva", e.target.value)}
//                   styles="driver-tech-phase-input-narrow driver-input-control-wrapper"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>05</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* SML TEST */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">SML TEST</h4>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">Track with Obst</div>
//               <div className="driver-tech-phase-numeric-input sml-col">
//                 <InputControl
//                   value={form.sml_track_obst || ""}
//                   onChange={(e) => onFieldChange("sml_track_obst", e.target.value)}
//                   styles="driver-tech-phase-input-narrow driver-input-control-wrapper"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>05</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">BLT</div>
//               <div className="driver-tech-phase-numeric-input sml-col">
//                 <InputControl
//                   value={form.sml_blt1 || ""}
//                   onChange={(e) => onFieldChange("sml_blt1", e.target.value)}
//                   styles="driver-tech-phase-input-narrow driver-input-control-wrapper"
//                 />
//                 <div className="driver-tech-phase-max-inline ">
//                   <span>/</span> <p>05</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">TATRA Loading</div>
//               <div className="driver-tech-phase-numeric-input sml-col">
//                 <InputControl
//                   value={form.sml_tatra_loading || ""}
//                   onChange={(e) => onFieldChange("sml_tatra_loading", e.target.value)}
//                   styles="driver-tech-phase-input-narrow driver-input-control-wrapper"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>05</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">BLT</div>
//               <div className="driver-tech-phase-numeric-input sml-col">
//                 <InputControl
//                   value={form.sml_blt2 || ""}
//                   onChange={(e) => onFieldChange("sml_blt2", e.target.value)}
//                   styles="driver-tech-phase-input-narrow driver-input-control-wrapper"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>05</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">Rolling Stock</div>
//               <div className="driver-tech-phase-numeric-input sml-col">
//                 <InputControl
//                   value={form.sml_rolling_stock || ""}
//                   onChange={(e) => onFieldChange("sml_rolling_stock", e.target.value)}
//                   styles="driver-tech-phase-input-narrow driver-input-control-wrapper"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>05</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">Flotation</div>
//               <div className="driver-tech-phase-numeric-input sml-col">
//                 <InputControl
//                   value={form.sml_flotation || ""}
//                   onChange={(e) => onFieldChange("sml_flotation", e.target.value)}
//                   styles="driver-tech-phase-input-narrow driver-input-control-wrapper"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>05</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* PRAC TEST - II */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">PRAC TEST - II</h4>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">TOTE</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.prac2_tote || ""}
//                   onChange={(e) => onFieldChange("prac2_tote", e.target.value)}
//                   styles="driver-tech-phase-input-narrow driver-input-control-wrapper"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>10</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">Filling &amp; Checking</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.prac2_fill_check || ""}
//                   onChange={(e) => onFieldChange("prac2_fill_check", e.target.value)}
//                   styles="driver-tech-phase-input-narrow driver-input-control-wrapper"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>05</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">Greasing</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.prac2_greasing || ""}
//                   onChange={(e) => onFieldChange("prac2_greasing", e.target.value)}
//                   styles="driver-tech-phase-input-narrow driver-input-control-wrapper"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>05</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* DRIVING TEST */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">DRIVING TEST</h4>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">X Country</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.driving_xcountry || ""}
//                   onChange={(e) => onFieldChange("driving_xcountry", e.target.value)}
//                   styles="driver-tech-phase-input-narrow driver-input-control-wrapper"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>25</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">Obst</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.driving_obst || ""}
//                   onChange={(e) => onFieldChange("driving_obst", e.target.value)}
//                   styles="driver-tech-phase-input-narrow driver-input-control-wrapper"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>25</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Restrictive Quality (Full width textarea card) */}
//       <div className="driver-tech-phase-card driver-tech-phase-restrictive-card">
//         <TextareaControl
//           label="Restrictive Quality"
//           value={form.restrictiveQuality || ""}
//           onChange={(e) => onFieldChange("restrictiveQuality", e.target.value)}
//           rows={4}
//         />
//       </div>

//       {/* SUBMIT */}
//       <div className="driver-tech-phase-submit-row">
//         <ButtonControl
//           text="Submit"
//           onClick={onSubmit}
//           styles="driver-tech-phase-submit-btn"
//         />
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import "./driverTechPhaseStyles.scss";
// import InputControl from "../../../controls/input/InputControl";
// import TextareaControl from "../../../controls/textarea/textareaControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import BackNavigation from "../../../common/navigation/BackNavigation";

// // Default maximum scores (can be overridden by backend rawData)
// const DEFAULT_MAX_SCORES = {
//   prac1_iden: 10,
//   prac1_sysTrace: 10,
//   prac1_viva: 5,
//   prac2_tote: 10,
//   prac2_fill_check: 5,
//   prac2_greasing: 5,
//   sml_track_obst: 5,
//   sml_blt1: 5,
//   sml_tatra_loading: 5,
//   sml_blt2: 5,
//   sml_rolling_stock: 5,
//   sml_flotation: 5,
//   driving_xcountry: 25,
//   driving_obst: 25,
// };

// const formatMaxScore = (value) => String(value || 0).padStart(2, "0");

// export default function DriverTechPhase({
//   header,
//   form,
//   rawData,
//   onFieldChange,
//   onSubmit,
//   loading,
// }) {
//   // Get max score from rawData or fallback to default
//   const getMax = (field) => {
//     return rawData?.[field] !== undefined && rawData?.[field] !== null
//       ? Number(rawData[field])
//       : DEFAULT_MAX_SCORES[field] || 0;
//   };

//   // Safe value getter
//   const getValue = (field) => {
//     const val = form?.[field];
//     return val === undefined || val === null || val === "" ? "" : val;
//   };

//   // Handle input change with max validation
//   const handleChange = (field, value) => {
//     const max = getMax(field);
//     const numValue = value === "" ? "" : Number(value);

//     if (
//       value === "" ||
//       (Number.isInteger(numValue) && numValue >= 0 && numValue <= max)
//     ) {
//       onFieldChange(field, value === "" ? "" : numValue);
//     }
//   };

//   return (
//     <div className="driver-tech-phase-page">
//       {/* Header */}
//       <div className="gtp-header">
//         <BackNavigation />
//         <h2>Tech Phase</h2>
//       </div>

//       {/* Info Card */}
//       <div className="driver-tech-phase-info-card">
//         <div className="driver-tech-phase-info-left">
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Army Number</div>
//             <div className="driver-tech-phase-info-value">{header?.agniveerNo}</div>
//           </div>
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Squad Number</div>
//             <div className="driver-tech-phase-info-value">{header?.squadNo}</div>
//           </div>
//         </div>
//         <div className="driver-tech-phase-info-center">
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Name</div>
//             <div className="driver-tech-phase-info-value">{header?.name}</div>
//           </div>
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Rank</div>
//             <div className="driver-tech-phase-info-value">{header?.rank}</div>
//           </div>
//         </div>
//         <div className="driver-tech-phase-info-right">
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Course</div>
//             <div className="driver-tech-phase-info-value">{header?.course}</div>
//           </div>
//         </div>
//       </div>

//       {/* Practical Test */}
//       <div className="driver-tech-phase-card driver-tech-phase-practical-card">
//         <h3 className="driver-tech-phase-card-title">Practical Test</h3>

//         <div className="driver-tech-phase-practical-grid two-col">

//           {/* PRAC TEST - I */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">PRAC TEST - I</h4>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">Iden of Parts</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("prac1_iden")}
//                   onChange={(e) => handleChange("prac1_iden", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("prac1_iden"))}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">Sys Trace Out</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("prac1_sysTrace")}
//                   onChange={(e) => handleChange("prac1_sysTrace", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("prac1_sysTrace"))}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">VIVA</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("prac1_viva")}
//                   onChange={(e) => handleChange("prac1_viva", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("prac1_viva"))}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* SML TEST */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">SML TEST</h4>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">Track with Obst</div>
//               <div className="driver-tech-phase-numeric-input sml-col">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("sml_track_obst")}
//                   onChange={(e) => handleChange("sml_track_obst", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("sml_track_obst"))}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">BLT</div>
//               <div className="driver-tech-phase-numeric-input sml-col">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("sml_blt1")}
//                   onChange={(e) => handleChange("sml_blt1", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("sml_blt1"))}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">TATRA Loading</div>
//               <div className="driver-tech-phase-numeric-input sml-col">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("sml_tatra_loading")}
//                   onChange={(e) => handleChange("sml_tatra_loading", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("sml_tatra_loading"))}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">BLT</div>
//               <div className="driver-tech-phase-numeric-input sml-col">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("sml_blt2")}
//                   onChange={(e) => handleChange("sml_blt2", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("sml_blt2"))}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">Rolling Stock</div>
//               <div className="driver-tech-phase-numeric-input sml-col">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("sml_rolling_stock")}
//                   onChange={(e) => handleChange("sml_rolling_stock", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("sml_rolling_stock"))}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">Flotation</div>
//               <div className="driver-tech-phase-numeric-input sml-col">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("sml_flotation")}
//                   onChange={(e) => handleChange("sml_flotation", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("sml_flotation"))}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* PRAC TEST - II */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">PRAC TEST - II</h4>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">TOTE</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("prac2_tote")}
//                   onChange={(e) => handleChange("prac2_tote", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("prac2_tote"))}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">Filling & Checking</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("prac2_fill_check")}
//                   onChange={(e) => handleChange("prac2_fill_check", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("prac2_fill_check"))}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">Greasing</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("prac2_greasing")}
//                   onChange={(e) => handleChange("prac2_greasing", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("prac2_greasing"))}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* DRIVING TEST */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">DRIVING TEST</h4>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">X Country</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("driving_xcountry")}
//                   onChange={(e) => handleChange("driving_xcountry", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("driving_xcountry"))}</p>
//                 </div>
//               </div>
//             </div>

//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">Obst</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("driving_obst")}
//                   onChange={(e) => handleChange("driving_obst", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("driving_obst"))}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* Restrictive Quality */}
//       <div className="driver-tech-phase-card" style={{ marginBottom: "24px" }}>
//         <TextareaControl
//           label="Restrictive Quality"
//           value={form?.restrictiveQuality || ""}
//           onChange={(e) => onFieldChange("restrictiveQuality", e.target.value)}
//           rows={4}
//         />
//       </div>

//       <div className="driver-tech-phase-submit-row">
//         <ButtonControl
//           text={loading ? "Submitting..." : "Submit"}
//           onClick={onSubmit}
//           disabled={loading}
//           styles="driver-tech-phase-submit-btn"
//         />
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import "./driverTechPhaseStyles.scss";
// import InputControl from "../../../controls/input/InputControl";
// import TextareaControl from "../../../controls/textarea/textareaControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import BackNavigation from "../../../common/navigation/BackNavigation";

// const DEFAULT_MAX_SCORES = {
//   practTest1_idenOfPartsScore: 10,
//   practTest1_sysTraceOut: 10,
//   practTest1_viva: 5,
//   practTest2_tote: 10,
//   practTest2_fillingChecking: 5,
//   practTest2_greasing: 5,
//   smlTest_trackWithObst: 5,
//   smlTest_tatraLoading: 5,
//   smlTest_blt: 5,
//   smlTest_rollingStock: 5,
//   smlTest_flotation: 5,
//   drivingTest_xCountry: 25,
//   drivingTest_obst: 25,
// };

// const formatMaxScore = (value) => String(value || 0).padStart(2, "0");

// export default function DriverTechPhase({
//   header,
//   form,
//   rawData,
//   onFieldChange,
//   onSubmit,
//   loading,
// }) {
//   // Safely get max score by traversing rawData.maxScores or fallback to default
//   const getMax = (key) => {
//     return rawData?.maxScores?.[key] ?? DEFAULT_MAX_SCORES[key] ?? 0;
//   };

//   // Safely get value from nested form object
//   const getValue = (path) => {
//     const keys = path.split(".");
//     let current = form;
//     for (const key of keys) {
//       current = current?.[key];
//       if (current === undefined || current === null) return "";
//     }
//     return current === "" ? "" : current;
//   };

//   // Handle input with validation against max
//   const handleChange = (path, value) => {
//     // Map form path to the flat key used in maxScores
//     const maxKeyMap = {
//       "practical.practTest1.idenOfPartsScore": "practTest1_idenOfPartsScore",
//       "practical.practTest1.sysTraceOut": "practTest1_sysTraceOut",
//       "practical.practTest1.viva": "practTest1_viva",
//       "practical.practTest2.tote": "practTest2_tote",
//       "practical.practTest2.fillingChecking": "practTest2_fillingChecking",
//       "practical.practTest2.greasing": "practTest2_greasing",
//       "practical.smlTest.trackWithObst": "smlTest_trackWithObst",
//       "practical.smlTest.tatraLoading": "smlTest_tatraLoading",
//       "practical.smlTest.blt": "smlTest_blt",
//       "practical.smlTest.rollingStock": "smlTest_rollingStock",
//       "practical.smlTest.flotation": "smlTest_flotation",
//       "practical.drivingTest.xCountry": "drivingTest_xCountry",
//       "practical.drivingTest.obst": "drivingTest_obst",
//     };

//     const maxKey = maxKeyMap[path];
//     if (!maxKey) return; // safety

//     const max = getMax(maxKey);
//     const numValue = value === "" ? "" : Number(value);

//     if (
//       value === "" ||
//       (Number.isInteger(numValue) && numValue >= 0 && numValue <= max)
//     ) {
//       onFieldChange(path, value === "" ? "" : numValue);
//     }
//   };

//   return (
//     <div className="driver-tech-phase-page">
//       {/* Header */}
//       <div className="gtp-header">
//         <BackNavigation />
//         <h2>Tech Phase</h2>
//       </div>

//       {/* Info Card */}
//       <div className="driver-tech-phase-info-card">
//         <div className="driver-tech-phase-info-left">
//           <div  className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Army Number</div>
//             <div className="driver-tech-phase-info-value">{header?.agniveerNo}</div>
//           </div>
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Squad Number</div>
//             <div className="driver-tech-phase-info-value">{header?.squadNo}</div>
//           </div>
//         </div>
//         <div className="driver-tech-phase-info-center">
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Name</div>
//             <div className="driver-tech-phase-info-value">{header?.name}</div>
//           </div>
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Rank</div>
//             <div className="driver-tech-phase-info-value">{header?.rank}</div>
//           </div>
//         </div>
//         <div className="driver-tech-phase-info-right">
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Course</div>
//             <div className="driver-tech-phase-info-value">{header?.course}</div>
//           </div>
//         </div>
//       </div>

//       {/* Practical Test */}
//       <div className="driver-tech-phase-card driver-tech-phase-practical-card">
//         <h3 className="driver-tech-phase-card-title">Practical Test</h3>
//         <div className="driver-tech-phase-practical-grid two-col">
//           {/* PRAC TEST - I */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">PRAC TEST - I</h4>
//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">Iden of Parts</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.practTest1.idenOfPartsScore")}
//                   onChange={(e) => handleChange("practical.practTest1.idenOfPartsScore", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("practTest1_idenOfPartsScore"))}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">Sys Trace Out</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.practTest1.sysTraceOut")}
//                   onChange={(e) => handleChange("practical.practTest1.sysTraceOut", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("practTest1_sysTraceOut"))}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">VIVA</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.practTest1.viva")}
//                   onChange={(e) => handleChange("practical.practTest1.viva", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("practTest1_viva"))}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* SML TEST */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">SML TEST</h4>
//             {[
//               { label: "Track with Obst", path: "practical.smlTest.trackWithObst", key: "smlTest_trackWithObst" },
//               { label: "TATRA Loading", path: "practical.smlTest.tatraLoading", key: "smlTest_tatraLoading" },
//               { label: "BLT", path: "practical.smlTest.blt", key: "smlTest_blt" },
//               { label: "Rolling Stock", path: "practical.smlTest.rollingStock", key: "smlTest_rollingStock" },
//               { label: "Flotation", path: "practical.smlTest.flotation", key: "smlTest_flotation" },
//             ].map((item) => (
//               <div key={item.key} className="driver-tech-phase-small-card-row">
//                 <div className="driver-tech-phase-numeric-label">{item.label}</div>
//                 <div className="driver-tech-phase-numeric-input sml-col">
//                   <InputControl
//                     type="numbers"
//                     value={getValue(item.path)}
//                     onChange={(e) => handleChange(item.path, e.target.value)}
//                     styles="driver-tech-phase-input-narrow"
//                   />
//                   <div className="driver-tech-phase-max-inline">
//                     <span>/</span> <p>{formatMaxScore(getMax(item.key))}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* PRAC TEST - II */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">PRAC TEST - II</h4>
//             {[
//               { label: "TOTE", path: "practical.practTest2.tote", key: "practTest2_tote" },
//               { label: "Filling & Checking", path: "practical.practTest2.fillingChecking", key: "practTest2_fillingChecking" },
//               { label: "Greasing", path: "practical.practTest2.greasing", key: "practTest2_greasing" },
//             ].map((item) => (
//               <div key={item.key} className="driver-tech-phase-small-card-row">
//                 <div className="driver-tech-phase-numeric-label">{item.label}</div>
//                 <div className="driver-tech-phase-numeric-input">
//                   <InputControl
//                     type="numbers"
//                     value={getValue(item.path)}
//                     onChange={(e) => handleChange(item.path, e.target.value)}
//                     styles="driver-tech-phase-input-narrow"
//                   />
//                   <div className="driver-tech-phase-max-inline">
//                     <span>/</span> <p>{formatMaxScore(getMax(item.key))}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* DRIVING TEST */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">DRIVING TEST</h4>
//             {[
//               { label: "X Country", path: "practical.drivingTest.xCountry", key: "drivingTest_xCountry" },
//               { label: "Obst", path: "practical.drivingTest.obst", key: "drivingTest_obst" },
//             ].map((item) => (
//               <div key={item.key} className="driver-tech-phase-small-card-row">
//                 <div className="driver-tech-phase-numeric-label">{item.label}</div>
//                 <div className="driver-tech-phase-numeric-input">
//                   <InputControl
//                     type="numbers"
//                     value={getValue(item.path)}
//                     onChange={(e) => handleChange(item.path, e.target.value)}
//                     styles="driver-tech-phase-input-narrow"
//                   />
//                   <div className="driver-tech-phase-max-inline">
//                     <span>/</span> <p>{formatMaxScore(getMax(item.key))}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Restrictive Quality */}
//       <div className="driver-tech-phase-card" style={{ marginBottom: "24px" }}>
//         <TextareaControl
//           label="Restrictive Quality"
//           value={form?.restrictiveQuality || ""}
//           onChange={(e) => onFieldChange("restrictiveQuality", e.target.value)}
//           rows={4}
//         />
//       </div>

//       <div className="driver-tech-phase-submit-row">
//         <ButtonControl
//           text={loading ? "Submitting..." : "Submit"}
//           onClick={onSubmit}
//           disabled={loading}
//           styles="driver-tech-phase-submit-btn"
//         />
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import "./driverTechPhaseStyles.scss";
// import InputControl from "../../../controls/input/InputControl";
// import TextareaControl from "../../../controls/textarea/textareaControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import BackNavigation from "../../../common/navigation/BackNavigation";

// const DEFAULT_MAX_SCORES = {
//   practTest1_idenOfPartsScore: 10,
//   practTest1_sysTraceOut: 10,
//   practTest1_viva: 5,
//   practTest2_tote: 10,
//   practTest2_fillingChecking: 5,
//   practTest2_greasing: 5,
//   smlTest_trackWithObst: 5,
//   smlTest_tatraLoading: 5,
//   smlTest_blt: 5,
//   smlTest_rollingStock: 5,
//   smlTest_flotation: 5,
//   drivingTest_xCountry: 25,
//   drivingTest_obst: 25,
// };

// const formatMaxScore = (value) => String(value || 0).padStart(2, "0");

// // List of all required practical field paths
// const REQUIRED_PRACTICAL_PATHS = [
//   "practical.practTest1.idenOfPartsScore",
//   "practical.practTest1.sysTraceOut",
//   "practical.practTest1.viva",
//   "practical.practTest2.tote",
//   "practical.practTest2.fillingChecking",
//   "practical.practTest2.greasing",
//   "practical.smlTest.trackWithObst",
//   "practical.smlTest.tatraLoading",
//   "practical.smlTest.blt",
//   "practical.smlTest.rollingStock",
//   "practical.smlTest.flotation",
//   "practical.drivingTest.xCountry",
//   "practical.drivingTest.obst",
// ];

// export default function DriverTechPhase({
//   header,
//   form,
//   rawData,
//   onFieldChange,
//   onSubmit,
//   loading,
// }) {
//   // Safely get max score by traversing rawData.maxScores or fallback to default
//   const getMax = (key) => {
//     return rawData?.maxScores?.[key] ?? DEFAULT_MAX_SCORES[key] ?? 0;
//   };

//   // Safely get value from nested form object
//   const getValue = (path) => {
//     const keys = path.split(".");
//     let current = form;
//     for (const key of keys) {
//       current = current?.[key];
//       if (current === undefined || current === null) return "";
//     }
//     return current === "" ? "" : current;
//   };

//   // Handle input with validation against max
//   const handleChange = (path, value) => {
//     const maxKeyMap = {
//       "practical.practTest1.idenOfPartsScore": "practTest1_idenOfPartsScore",
//       "practical.practTest1.sysTraceOut": "practTest1_sysTraceOut",
//       "practical.practTest1.viva": "practTest1_viva",
//       "practical.practTest2.tote": "practTest2_tote",
//       "practical.practTest2.fillingChecking": "practTest2_fillingChecking",
//       "practical.practTest2.greasing": "practTest2_greasing",
//       "practical.smlTest.trackWithObst": "smlTest_trackWithObst",
//       "practical.smlTest.tatraLoading": "smlTest_tatraLoading",
//       "practical.smlTest.blt": "smlTest_blt",
//       "practical.smlTest.rollingStock": "smlTest_rollingStock",
//       "practical.smlTest.flotation": "smlTest_flotation",
//       "practical.drivingTest.xCountry": "drivingTest_xCountry",
//       "practical.drivingTest.obst": "drivingTest_obst",
//     };

//     const maxKey = maxKeyMap[path];
//     if (!maxKey) return;

//     const max = getMax(maxKey);
//     const numValue = value === "" ? "" : Number(value);

//     if (
//       value === "" ||
//       (Number.isInteger(numValue) && numValue >= 0 && numValue <= max)
//     ) {
//       onFieldChange(path, value === "" ? "" : numValue);
//     }
//   };

//   // NEW: Form completion check
//   const isFormComplete = () => {
//     const allFieldsFilled = REQUIRED_PRACTICAL_PATHS.every((path) => {
//       const val = getValue(path);
//       return val !== "" && val !== null && val !== undefined;
//     });

//     const restrictiveFilled = (form?.restrictiveQuality || "").trim().length > 0;

//     return allFieldsFilled && restrictiveFilled;
//   };

//   return (
//     <div className="driver-tech-phase-page">
//       {/* Header */}
//       <div className="gtp-header">
//         <BackNavigation />
//         <h2>Tech Phase</h2>
//       </div>

//       {/* Info Card */}
//       <div className="driver-tech-phase-info-card">
//         <div className="driver-tech-phase-info-left">
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Army Number</div>
//             <div className="driver-tech-phase-info-value">{header?.agniveerNo}</div>
//           </div>
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Squad Number</div>
//             <div className="driver-tech-phase-info-value">{header?.squadNo}</div>
//           </div>
//         </div>
//         <div className="driver-tech-phase-info-center">
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Name</div>
//             <div className="driver-tech-phase-info-value">{header?.name}</div>
//           </div>
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Rank</div>
//             <div className="driver-tech-phase-info-value">{header?.rank}</div>
//           </div>
//         </div>
//         <div className="driver-tech-phase-info-right">
//           <div className="driver-tech-phase-info-row">
//             <div className="driver-tech-phase-info-label">Course</div>
//             <div className="driver-tech-phase-info-value">{header?.course}</div>
//           </div>
//         </div>
//       </div>

//       {/* Practical Test */}
//       <div className="driver-tech-phase-card driver-tech-phase-practical-card">
//         <h3 className="driver-tech-phase-card-title">Practical Test</h3>
//         <div className="driver-tech-phase-practical-grid two-col">
//           {/* PRAC TEST - I */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">PRAC TEST - I</h4>
//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">Iden of Parts</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   type="text"
//                   inputMode="decimal"
//                   value={getValue("practical.practTest1.idenOfPartsScore")}
//                   onChange={(e) => handleChange("practical.practTest1.idenOfPartsScore", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("practTest1_idenOfPartsScore"))}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">Sys Trace Out</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   type="text"
//                   inputMode="decimal"
//                   value={getValue("practical.practTest1.sysTraceOut")}
//                   onChange={(e) => handleChange("practical.practTest1.sysTraceOut", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("practTest1_sysTraceOut"))}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="driver-tech-phase-small-card-row">
//               <div className="driver-tech-phase-numeric-label">VIVA</div>
//               <div className="driver-tech-phase-numeric-input">
//                 <InputControl
//                   type="text"
//                   inputMode="decimal"
//                   value={getValue("practical.practTest1.viva")}
//                   onChange={(e) => handleChange("practical.practTest1.viva", e.target.value)}
//                   styles="driver-tech-phase-input-narrow"
//                 />
//                 <div className="driver-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("practTest1_viva"))}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* SML TEST */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">SML TEST</h4>
//             {[
//               { label: "Track with Obst", path: "practical.smlTest.trackWithObst", key: "smlTest_trackWithObst" },
//               { label: "TATRA Loading", path: "practical.smlTest.tatraLoading", key: "smlTest_tatraLoading" },
//               { label: "BLT", path: "practical.smlTest.blt", key: "smlTest_blt" },
//               { label: "Rolling Stock", path: "practical.smlTest.rollingStock", key: "smlTest_rollingStock" },
//               { label: "Flotation", path: "practical.smlTest.flotation", key: "smlTest_flotation" },
//             ].map((item) => (
//               <div key={item.key} className="driver-tech-phase-small-card-row">
//                 <div className="driver-tech-phase-numeric-label">{item.label}</div>
//                 <div className="driver-tech-phase-numeric-input sml-col">
//                   <InputControl
//                     type="text"
//                   inputMode="decimal"
//                     value={getValue(item.path)}
//                     onChange={(e) => handleChange(item.path, e.target.value)}
//                     styles="driver-tech-phase-input-narrow"
//                   />
//                   <div className="driver-tech-phase-max-inline">
//                     <span>/</span> <p>{formatMaxScore(getMax(item.key))}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* PRAC TEST - II */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">PRAC TEST - II</h4>
//             {[
//               { label: "TOTE", path: "practical.practTest2.tote", key: "practTest2_tote" },
//               { label: "Filling & Checking", path: "practical.practTest2.fillingChecking", key: "practTest2_fillingChecking" },
//               { label: "Greasing", path: "practical.practTest2.greasing", key: "practTest2_greasing" },
//             ].map((item) => (
//               <div key={item.key} className="driver-tech-phase-small-card-row">
//                 <div className="driver-tech-phase-numeric-label">{item.label}</div>
//                 <div className="driver-tech-phase-numeric-input">
//                   <InputControl
//                     type="text"
//                   inputMode="decimal"
//                     value={getValue(item.path)}
//                     onChange={(e) => handleChange(item.path, e.target.value)}
//                     styles="driver-tech-phase-input-narrow"
//                   />
//                   <div className="driver-tech-phase-max-inline">
//                     <span>/</span> <p>{formatMaxScore(getMax(item.key))}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* DRIVING TEST */}
//           <div className="driver-tech-phase-small-card">
//             <h4 className="driver-tech-phase-small-card-title">DRIVING TEST</h4>
//             {[
//               { label: "X Country", path: "practical.drivingTest.xCountry", key: "drivingTest_xCountry" },
//               { label: "Obst", path: "practical.drivingTest.obst", key: "drivingTest_obst" },
//             ].map((item) => (
//               <div key={item.key} className="driver-tech-phase-small-card-row">
//                 <div className="driver-tech-phase-numeric-label">{item.label}</div>
//                 <div className="driver-tech-phase-numeric-input">
//                   <InputControl
//                     type="text"
//                   inputMode="decimal"
//                     value={getValue(item.path)}
//                     onChange={(e) => handleChange(item.path, e.target.value)}
//                     styles="driver-tech-phase-input-narrow"
//                   />
//                   <div className="driver-tech-phase-max-inline">
//                     <span>/</span> <p>{formatMaxScore(getMax(item.key))}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Restrictive Quality */}
//       <div className="driver-tech-phase-card" style={{ marginBottom: "24px" }}>
//         <TextareaControl
//           label="Restrictive Quality"
//           value={form?.restrictiveQuality || ""}
//           onChange={(e) => onFieldChange("restrictiveQuality", e.target.value)}
//           rows={4}
//         />
//       </div>

//       <div className="driver-tech-phase-submit-row">
//         <ButtonControl
//           text={"Submit"}
//           onClick={onSubmit}
//           disabled={loading || !isFormComplete()}
//           styles="driver-tech-phase-submit-btn"
//         />
//       </div>
//     </div>
//   );
// }

import React from "react";
import "./driverTechPhaseStyles.scss";
import InputControl from "../../../controls/input/InputControl";
import TextareaControl from "../../../controls/textarea/textareaControl";
import ButtonControl from "../../../controls/button/ButtonControl";
import BackNavigation from "../../../common/navigation/BackNavigation";

// Default max scores (used when rawData is missing)
const DEFAULT_MAX_SCORES = {
  theoretical: {
    maxWrittenScore: 50,
    maxQuizScore: 30,
  },
  practical: {
    practTest1_idenOfPartsScore: 10,
    practTest1_sysTraceOut: 10,
    practTest1_viva: 5,
    practTest2_tote: 10,
    practTest2_fillingChecking: 5,
    practTest2_greasing: 5,
    smlTest_trackWithObst: 5,
    smlTest_tatraLoading: 5,
    smlTest_blt: 5,
    smlTest_rollingStock: 5,
    smlTest_flotation: 5,
    drivingTest_xCountry: 25,
    drivingTest_obst: 25,
  },
};

const formatMaxScore = (value) => String(value || 0).padStart(2, "0");

const REQUIRED_FIELDS = [
  "theoretical.writtenScore",
  "theoretical.quizScore",
  "practical.practTest1.idenOfPartsScore",
  "practical.practTest1.sysTraceOut",
  "practical.practTest1.viva",
  "practical.practTest2.tote",
  "practical.practTest2.fillingChecking",
  "practical.practTest2.greasing",
  "practical.smlTest.trackWithObst",
  "practical.smlTest.tatraLoading",
  "practical.smlTest.blt",
  "practical.smlTest.rollingStock",
  "practical.smlTest.flotation",
  "practical.drivingTest.xCountry",
  "practical.drivingTest.obst",
];

export default function DriverTechPhase({
  header,
  form,
  rawData,
  onFieldChange,
  onSubmit,
  loading,
}) {
  const getMax = (path) => {
    const keys = path.split(".");
    let current = rawData;

    for (let key of keys) {
      current = current?.[key];
      if (current === undefined || current === null) {
        let fallback = DEFAULT_MAX_SCORES;
        for (let k of keys) {
          fallback = fallback?.[k];
          if (fallback === undefined) return 0;
        }
        return Number(fallback) || 0;
      }
    }
    return Number(current) || 0;
  };

  const getValue = (path) => {
    const keys = path.split(".");
    let current = form;
    for (let key of keys) {
      current = current?.[key];
      if (current === undefined || current === null) return "";
    }
    return current === undefined || current === null ? "" : current;
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

    const max = getMax(getMaxPath(path));
    const numValue = roundedValue === "" ? "" : Number(roundedValue);

    // Only update if it's a valid number within range or a partial decimal (like "5.")
    if (roundedValue === "" || (numValue >= 0 && numValue <= max)) {
      onFieldChange(path, roundedValue);
    }
  };

  const handleBlur = (path, value) => {
    if (value === "" || value === null || value === undefined) return;

    const roundedValue = roundToTwoDecimals(value);
    if (roundedValue !== value) {
      const max = getMax(getMaxPath(path));
      const numValue = Number(roundedValue);

      // Only update if rounded value is within max range
      if (!isNaN(numValue) && numValue >= 0 && numValue <= max) {
        onFieldChange(path, roundedValue);
      }
    }
  };

  const getMaxPath = (formPath) => {
    const mapping = {
      "theoretical.writtenScore": "theoretical.maxWrittenScore",
      "theoretical.quizScore": "theoretical.maxQuizScore",
      "practical.practTest1.idenOfPartsScore":
        "practical.practTest1_idenOfPartsScore",
      "practical.practTest1.sysTraceOut": "practical.practTest1_sysTraceOut",
      "practical.practTest1.viva": "practical.practTest1_viva",
      "practical.practTest2.tote": "practical.practTest2_tote",
      "practical.practTest2.fillingChecking":
        "practical.practTest2_fillingChecking",
      "practical.practTest2.greasing": "practical.practTest2_greasing",
      "practical.smlTest.trackWithObst": "practical.smlTest_trackWithObst",
      "practical.smlTest.tatraLoading": "practical.smlTest_tatraLoading",
      "practical.smlTest.blt": "practical.smlTest_blt",
      "practical.smlTest.rollingStock": "practical.smlTest_rollingStock",
      "practical.smlTest.flotation": "practical.smlTest_flotation",
      "practical.drivingTest.xCountry": "practical.drivingTest_xCountry",
      "practical.drivingTest.obst": "practical.drivingTest_obst",
    };
    return mapping[formPath] || formPath;
  };

  const isFormComplete = () => {
    const allFieldsFilled = REQUIRED_FIELDS.every((path) => {
      const val = getValue(path);
      return val !== "" && val !== null && val !== undefined;
    });
    return allFieldsFilled;
  };

  return (
    <div className="driver-tech-phase-page">
      <div className="gtp-header">
        <BackNavigation />
        <h2>Tech Phase</h2>
      </div>

      {/* Info Card */}
      <div className="driver-tech-phase-info-card">
        <div className="driver-tech-phase-info-left">
          <div className="driver-tech-phase-info-row">
            <div className="driver-tech-phase-info-label">Army Number</div>
            <div className="driver-tech-phase-info-value">
              {header?.agniveerNo}
            </div>
          </div>
          <div className="driver-tech-phase-info-row">
            <div className="driver-tech-phase-info-label">Squad Number</div>
            <div className="driver-tech-phase-info-value">
              {header?.squadNo}
            </div>
          </div>
        </div>
        <div className="driver-tech-phase-info-center">
          <div className="driver-tech-phase-info-row">
            <div className="driver-tech-phase-info-label">Name</div>
            <div className="driver-tech-phase-info-value">{header?.name}</div>
          </div>
          <div className="driver-tech-phase-info-row">
            <div className="driver-tech-phase-info-label">Rank</div>
            <div className="driver-tech-phase-info-value">{header?.rank}</div>
          </div>
        </div>
        <div className="driver-tech-phase-info-right">
          <div className="driver-tech-phase-info-row">
            <div className="driver-tech-phase-info-label">Course</div>
            <div className="driver-tech-phase-info-value">{header?.course}</div>
          </div>
          <div className="driver-tech-phase-info-row">
            <div className="driver-tech-phase-info-label">Unit</div>
            <div className="driver-tech-phase-info-value">
              {header?.unit || "-"}
            </div>
          </div>
        </div>
      </div>

      {/* Theoretical Test */}
      <div className="driver-tech-phase-test-row">
        <div className="driver-tech-phase-card driver-tech-phase-theoretical-card">
          <h3 className="driver-tech-phase-card-title">Theoretical Test</h3>
          <div className="driver-tech-phase-two-col">
            <div className="driver-tech-phase-inline-field">
              <div className="driver-tech-phase-inline-field-wrapper">
                <div className="driver-tech-phase-numeric-label-write">
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
                  styles="driver-tech-phase-input-inline"
                />
              </div>
              <div className="driver-tech-phase-max-inline-write">
                <span>/</span>{" "}
                <p>{formatMaxScore(getMax("theoretical.maxWrittenScore"))}</p>
              </div>
            </div>
            <div className="driver-tech-phase-inline-field">
              <div className="driver-tech-phase-inline-field-wrapper">
                <div className="driver-tech-phase-numeric-label-quiz">QUIZ</div>
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
                  styles="driver-tech-phase-input-inline"
                />
              </div>
              <div className="driver-tech-phase-max-inline-quiz">
                <span>/</span>{" "}
                <p>{formatMaxScore(getMax("theoretical.maxQuizScore"))}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Practical Test */}
      <div className="driver-tech-phase-card driver-tech-phase-practical-card">
        <h3 className="driver-tech-phase-card-title">Practical Test</h3>
        <div className="driver-tech-phase-practical-grid two-col">
          {/* PRAC TEST - I */}
          <div className="driver-tech-phase-small-card">
            <h4 className="driver-tech-phase-small-card-title">
              PRAC TEST - I
            </h4>
            <div className="driver-tech-phase-small-card-row">
              <div className="driver-tech-phase-numeric-label">
                Iden of Parts
              </div>
              <div className="driver-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.practTest1.idenOfPartsScore")}
                  onChange={(e) =>
                    handleChange(
                      "practical.practTest1.idenOfPartsScore",
                      e.target.value,
                    )
                  }
                  onBlur={(e) =>
                    handleBlur(
                      "practical.practTest1.idenOfPartsScore",
                      e.target.value,
                    )
                  }
                  styles="driver-tech-phase-input-narrow"
                />
                <div className="driver-tech-phase-max-inline">
                  <span>/</span>{" "}
                  <p>
                    {formatMaxScore(
                      getMax("practical.practTest1_idenOfPartsScore"),
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="driver-tech-phase-small-card-row">
              <div className="driver-tech-phase-numeric-label">
                Sys Trace Out
              </div>
              <div className="driver-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.practTest1.sysTraceOut")}
                  onChange={(e) =>
                    handleChange(
                      "practical.practTest1.sysTraceOut",
                      e.target.value,
                    )
                  }
                  onBlur={(e) =>
                    handleBlur(
                      "practical.practTest1.sysTraceOut",
                      e.target.value,
                    )
                  }
                  styles="driver-tech-phase-input-narrow"
                />
                <div className="driver-tech-phase-max-inline">
                  <span>/</span>{" "}
                  <p>
                    {formatMaxScore(getMax("practical.practTest1_sysTraceOut"))}
                  </p>
                </div>
              </div>
            </div>
            <div className="driver-tech-phase-small-card-row">
              <div className="driver-tech-phase-numeric-label">VIVA</div>
              <div className="driver-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.practTest1.viva")}
                  onChange={(e) =>
                    handleChange("practical.practTest1.viva", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.practTest1.viva", e.target.value)
                  }
                  styles="driver-tech-phase-input-narrow"
                />
                <div className="driver-tech-phase-max-inline">
                  <span>/</span>{" "}
                  <p>{formatMaxScore(getMax("practical.practTest1_viva"))}</p>
                </div>
              </div>
            </div>
          </div>

          {/* SML TEST */}
          <div className="driver-tech-phase-small-card">
            <h4 className="driver-tech-phase-small-card-title">SML TEST</h4>
            {[
              {
                label: "Track with Obst",
                path: "practical.smlTest.trackWithObst",
                key: "practical.smlTest_trackWithObst",
              },
              {
                label: "TATRA Loading",
                path: "practical.smlTest.tatraLoading",
                key: "practical.smlTest_tatraLoading",
              },
              {
                label: "BLT",
                path: "practical.smlTest.blt",
                key: "practical.smlTest_blt",
              },
              {
                label: "Rolling Stock",
                path: "practical.smlTest.rollingStock",
                key: "practical.smlTest_rollingStock",
              },
              {
                label: "Flotation",
                path: "practical.smlTest.flotation",
                key: "practical.smlTest_flotation",
              },
            ].map((item) => (
              <div key={item.key} className="driver-tech-phase-small-card-row">
                <div className="driver-tech-phase-numeric-label">
                  {item.label}
                </div>
                <div className="driver-tech-phase-numeric-input sml-col">
                  <InputControl
                    type="text"
                    inputMode="decimal"
                    value={getValue(item.path)}
                    onChange={(e) => handleChange(item.path, e.target.value)}
                    onBlur={(e) => handleBlur(item.path, e.target.value)}
                    styles="driver-tech-phase-input-narrow"
                  />
                  <div className="driver-tech-phase-max-inline">
                    <span>/</span> <p>{formatMaxScore(getMax(item.key))}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PRAC TEST - II */}
          <div className="driver-tech-phase-small-card">
            <h4 className="driver-tech-phase-small-card-title">
              PRAC TEST - II
            </h4>
            {[
              {
                label: "TOTE",
                path: "practical.practTest2.tote",
                key: "practical.practTest2_tote",
              },
              {
                label: "Filling & Checking",
                path: "practical.practTest2.fillingChecking",
                key: "practical.practTest2_fillingChecking",
              },
              {
                label: "Greasing",
                path: "practical.practTest2.greasing",
                key: "practical.practTest2_greasing",
              },
            ].map((item) => (
              <div key={item.key} className="driver-tech-phase-small-card-row">
                <div className="driver-tech-phase-numeric-label">
                  {item.label}
                </div>
                <div className="driver-tech-phase-numeric-input">
                  <InputControl
                    type="text"
                    inputMode="decimal"
                    value={getValue(item.path)}
                    onChange={(e) => handleChange(item.path, e.target.value)}
                    onBlur={(e) => handleBlur(item.path, e.target.value)}
                    styles="driver-tech-phase-input-narrow"
                  />
                  <div className="driver-tech-phase-max-inline">
                    <span>/</span> <p>{formatMaxScore(getMax(item.key))}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DRIVING TEST */}
          <div className="driver-tech-phase-small-card">
            <h4 className="driver-tech-phase-small-card-title">DRIVING TEST</h4>
            {[
              {
                label: "X Country",
                path: "practical.drivingTest.xCountry",
                key: "practical.drivingTest_xCountry",
              },
              {
                label: "Obst",
                path: "practical.drivingTest.obst",
                key: "practical.drivingTest_obst",
              },
            ].map((item) => (
              <div key={item.key} className="driver-tech-phase-small-card-row">
                <div className="driver-tech-phase-numeric-label">
                  {item.label}
                </div>
                <div className="driver-tech-phase-numeric-input">
                  <InputControl
                    type="text"
                    inputMode="decimal"
                    value={getValue(item.path)}
                    onChange={(e) => handleChange(item.path, e.target.value)}
                    onBlur={(e) => handleBlur(item.path, e.target.value)}
                    styles="driver-tech-phase-input-narrow"
                  />
                  <div className="driver-tech-phase-max-inline">
                    <span>/</span> <p>{formatMaxScore(getMax(item.key))}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="driver-tech-phase-card" style={{ marginBottom: "24px" }}>
        <TextareaControl
          label="Restrictive Quality"
          value={form?.restrictiveQuality || ""}
          onChange={(e) => onFieldChange("restrictiveQuality", e.target.value)}
          rows={4}
        />
      </div>

      <div className="driver-tech-phase-submit-row">
        <ButtonControl
          text="Submit"
          onClick={onSubmit}
          disabled={loading || !isFormComplete()}
          styles="driver-tech-phase-submit-btn"
        />
      </div>
    </div>
  );
}
