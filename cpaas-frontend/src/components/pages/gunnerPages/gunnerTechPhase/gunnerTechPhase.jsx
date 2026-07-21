// import React from "react";
// import "./gunnerTechPhaseStyles.scss";
// import InputControl from "../../../controls/input/InputControl";
// import SelectControl from "../../../controls/select/SelectControl";
// import TextareaControl from "../../../controls/textarea/textareaControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import { IoIosArrowBack } from "react-icons/io";
// import { useHistory } from "react-router-dom";
// import BackNavigation from "../../../common/navigation/BackNavigation";

// export default function GunnerTechPhase({
//   header,
//   form,
//   onFieldChange,
//   onSelectChange,
//   onWeekChange,
//   onSubmit,
// }) {
//   const history = useHistory();
//   return (
//     <div className="gunner-tech-phase-page">
//       <div className="gtp-header">
//         {/* <IoIosArrowBack
//           className="gtp-back-icon"
//           onClick={() => history.goBack()}
//         /> */}

//         <BackNavigation/>
//         <h2>Tech Phase</h2>
//       </div>
//       <div className="gunner-tech-phase-info-card">
//         <div className="gunner-tech-phase-info-left">
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Army Number</div>
//             <div className="gunner-tech-phase-info-value">
//               {header?.agniveerNo}
//             </div>
//           </div>
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Squad Number</div>
//             <div className="gunner-tech-phase-info-value">
//               {header?.squadNo}
//             </div>
//           </div>
//         </div>
//         <div className="gunner-tech-phase-info-center">
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Name</div>
//             <div className="gunner-tech-phase-info-value">{header?.name}</div>
//           </div>
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Rank</div>
//             <div className="gunner-tech-phase-info-value">{header?.rank}</div>
//           </div>
//         </div>
//         <div className="gunner-tech-phase-info-right">
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Course</div>
//             <div className="gunner-tech-phase-info-value">{header?.course}</div>
//           </div>
//         </div>
//       </div>
//       {/* WEEK SELECT */}
//       <div className="gunner-tech-phase-controls-row">
//         <div className="gunner-tech-phase-controls-spacer" />
//       </div>
//       {/* TEST ROWS */}
//       <div className="gunner-tech-phase-test-row">
//         {/* THEORETICAL */}
//         <div
//           className="gunner-tech-phase-card
// gunner-tech-phase-theoretical-card"
//         >
//           <h3 className="gunner-tech-phase-card-title">Theoretical Test</h3>
//           <div className="gunner-tech-phase-two-col">
//             <div className="gunner-tech-phase-inline-field">
//               <div className="gunner-tech-phase-inline-field-wrapper">
//                 <div className="gunner-tech-phase-numeric-label-write">
//                   Written
//                 </div>
//                 <InputControl
//                   value={form.written}
//                   onChange={(e) => onFieldChange("written", e.target.value)}
//                   styles="gunner-tech-phase-input-inline"
//                 />
//               </div>
//               <div className="gunner-tech-phase-max-inline-write">
//                 <span>/</span> <p>50</p>
//               </div>
//             </div>
//             <div className="gunner-tech-phase-inline-field">
//               <div className="gunner-tech-phase-inline-field-wrapper">
//                 <div className="gunner-tech-phase-numeric-label-quiz">Quiz</div>
//                 <InputControl
//                   value={form.quiz}
//                   onChange={(e) => onFieldChange("quiz", e.target.value)}
//                   styles="gunner-tech-phase-input-inline"
//                 />
//               </div>
//               <div className="gunner-tech-phase-max-inline-quiz">
//                 <span>/</span> <p>30</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* PRACTICAL */}
//       <div
//         className="gunner-tech-phase-card
// gunner-tech-phase-practical-card"
//       >
//         <h3 className="gunner-tech-phase-card-title">Practical Test</h3>
//         <div className="gunner-tech-phase-practical-grid">
//           {/* PKT */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">PKT</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">S&A</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.pkt_sa || ""}
//                   onChange={(e) => onFieldChange("pkt_sa", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>10</p>
//                 </div>
//               </div>
//             </div>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">
//                 Iden of Parts
//               </div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.pkt_Iden || ""}
//                   onChange={(e) => onFieldChange("pkt_Iden", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>04</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* EQPT */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">EQPT PH</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">
//                 STAB & SI OP
//               </div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.eqpt_stab || ""}
//                   onChange={(e) => onFieldChange("eqpt_stab", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>10</p>
//                 </div>
//               </div>
//             </div>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">
//                 Iden of Parts
//               </div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.eqpt_Iden || ""}
//                   onChange={(e) => onFieldChange("eqpt_Iden", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>06</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* GUN PH */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">GUN PH</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">S&A</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.gun_sa || ""}
//                   onChange={(e) => onFieldChange("gun_sa", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>20</p>
//                 </div>
//               </div>
//             </div>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">
//                 Iden of Parts
//               </div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.gun_Iden || ""}
//                   onChange={(e) => onFieldChange("gun_Iden", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>50</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* MSL */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">MSL PH</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">
//                 Iden of Parts
//               </div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.msl_Iden || ""}
//                   onChange={(e) => onFieldChange("msl_Iden", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>50</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* IMS */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">IMS</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">ATGM</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.ims_atgm || ""}
//                   onChange={(e) => onFieldChange("ims_atgm", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>50</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* FD FIRING */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">FD FIRING</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">GUN</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.fd_gun || ""}
//                   onChange={(e) => onFieldChange("fd_gun", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>50</p>
//                 </div>
//               </div>
//             </div>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">PKT</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.fd_pkt || ""}
//                   onChange={(e) => onFieldChange("fd_pkt", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>50</p>
//                 </div>
//               </div>
//             </div>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">MSL</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   value={form.fd_msl || ""}
//                   onChange={(e) => onFieldChange("fd_msl", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>50</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="gunner-tech-phase-card" style={{ marginBottom: "24px" }}>
//         <TextareaControl
//           label="Restrictive Quality"
//           value={form.restrictiveQuality || ""}
//           onChange={(e) => onFieldChange("restrictiveQuality", e.target.value)}
//           rows={4}
//         />
//       </div>
//       <div className="gunner-tech-phase-submit-row">
//         <ButtonControl
//           text="Submit"
//           onClick={onSubmit}
//           styles="gunner-tech-phase-submit-btn"
//         />
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import "./gunnerTechPhaseStyles.scss";
// import InputControl from "../../../controls/input/InputControl";
// import TextareaControl from "../../../controls/textarea/textareaControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import BackNavigation from "../../../common/navigation/BackNavigation";

// export default function GunnerTechPhase({
//   header,
//   form,
//   rawData,
//   onFieldChange,
//   onSubmit,
//   loading,
// }) {

//   const getMax = (path) => {
//     const keys = path.split(".");
//     let current = rawData;
//     for (let key of keys) {
//       current = current?.[key];
//       if (current === undefined) return 0;
//     }
//     return Number(current) || 0;
//   };

//   const getValue = (path) => {

//     const keys = path.split(".");

//     let current = form;
//       console.log("current",form)

//     for (let key of keys) {
//       current = current?.[key];
//       if (current === undefined || current === null) return "";
//     }
//     return current === "" ? "" : Number(current);
//   };

//   // Handle input change with max validation
//   const handleChange = (path, value) => {
//     const max = getMax(getMaxPath(path));
//     const numValue = value === "" ? "" : Number(value);

//     if (value === "" || (numValue >= 0 && numValue <= max)) {
//       onFieldChange(path, value === "" ? "" : numValue);
//     }
//   };

//   // Map form path to rawData max path
//   const getMaxPath = (formPath) => {
//     const mapping = {
//       // Theoretical
//       "theoretical.writtenScore": "theoretical.maxWrittenScore",
//       "theoretical.quizScore": "theoretical.maxQuizScore",

//       // Practical
//       "practical.pkt.saScore": "practical.pkt.maxsaScore",
//       "practical.pkt.idenOfPartsScore": "practical.pkt.maxIdenOfPartsScore",
//       "practical.eqptph.stabsiop": "practical.eqptph.maxStabsiop",
//       "practical.eqptph.idenOfPartsScore": "practical.eqptph.maxIdenOfPartsScore",
//       "practical.gunph.sa": "practical.gunph.maxSa",
//       "practical.gunph.idenOfPartsScore": "practical.gunph.maxIdenOfPartsScore",
//       "practical.mslph.idenOfPartsScore": "practical.mslph.maxIdenOfPartsScore",
//       "practical.ims.atgm": "practical.ims.maxAtgm",
//       "practical.fdfiring.gun": "practical.fdfiring.maxGun",
//       "practical.fdfiring.pkt": "practical.fdfiring.maxPkt",
//       "practical.fdfiring.msl": "practical.fdfiring.maxMsl",
//     };

//     return mapping[formPath] || formPath;
//   };

//   return (
//     <div className="gunner-tech-phase-page">
//       <div className="gtp-header">
//         <BackNavigation />
//         <h2>Tech Phase</h2>
//       </div>

//       {/* Header Info Card */}
//       <div className="gunner-tech-phase-info-card">
//         <div className="gunner-tech-phase-info-left">
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Army Number</div>
//             <div className="gunner-tech-phase-info-value">{header?.agniveerNo}</div>
//           </div>
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Squad Number</div>
//             <div className="gunner-tech-phase-info-value">{header?.squadNo}</div>
//           </div>
//         </div>
//         <div className="gunner-tech-phase-info-center">
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Name</div>
//             <div className="gunner-tech-phase-info-value">{header?.name}</div>
//           </div>
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Rank</div>
//             <div className="gunner-tech-phase-info-value">{header?.rank}</div>
//           </div>
//         </div>
//         <div className="gunner-tech-phase-info-right">
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Course</div>
//             <div className="gunner-tech-phase-info-value">{header?.course}</div>
//           </div>
//         </div>
//       </div>

//       {/* Theoretical Test */}
//       <div className="gunner-tech-phase-test-row">
//         <div className="gunner-tech-phase-card gunner-tech-phase-theoretical-card">
//           <h3 className="gunner-tech-phase-card-title">Theoretical Test</h3>
//           <div className="gunner-tech-phase-two-col">
//             <div className="gunner-tech-phase-inline-field">
//               <div className="gunner-tech-phase-inline-field-wrapper">
//                 <div className="gunner-tech-phase-numeric-label-write">Written</div>
//                 <InputControl
//                   type="numbers"
//                   value={getValue("theoretical.writtenScore")}
//                   onChange={(e) => handleChange("theoretical.writtenScore", e.target.value)}
//                   styles="gunner-tech-phase-input-inline"
//                 />
//               </div>
//               <div className="gunner-tech-phase-max-inline-write">
//                 <span>/</span> <p>{getMax("theoretical.maxWrittenScore")}</p>
//               </div>
//             </div>

//             <div className="gunner-tech-phase-inline-field">
//               <div className="gunner-tech-phase-inline-field-wrapper">
//                 <div className="gunner-tech-phase-numeric-label-quiz">Quiz</div>
//                 <InputControl
//                   type="numbers"
//                   value={getValue("theoretical.quizScore")}
//                   onChange={(e) => handleChange("theoretical.quizScore", e.target.value)}
//                   styles="gunner-tech-phase-input-inline"
//                 />
//               </div>
//               <div className="gunner-tech-phase-max-inline-quiz">
//                 <span>/</span> <p>{getMax("theoretical.maxQuizScore")}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Practical Test */}
//       <div className="gunner-tech-phase-card gunner-tech-phase-practical-card">
//         <h3 className="gunner-tech-phase-card-title">Practical Test</h3>
//         <div className="gunner-tech-phase-practical-grid">
//           {/* PKT */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">PKT</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">S&A</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.pkt.saScore")}
//                   onChange={(e) => handleChange("practical.pkt.saScore", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{getMax("practical.pkt.maxsaScore")}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">Iden of Parts</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.pkt.idenOfPartsScore")}
//                   onChange={(e) => handleChange("practical.pkt.idenOfPartsScore", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{getMax("practical.pkt.maxIdenOfPartsScore")}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* EQPT PH */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">EQPT PH</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">STAB & SI OP</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.eqptph.stabsiop")}
//                   onChange={(e) => handleChange("practical.eqptph.stabsiop", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{getMax("practical.eqptph.maxStabsiop")}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">Iden of Parts</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.eqptph.idenOfPartsScore")}
//                   onChange={(e) => handleChange("practical.eqptph.idenOfPartsScore", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{getMax("practical.eqptph.maxIdenOfPartsScore")}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* GUN PH */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">GUN PH</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">S&A</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.gunph.sa")}
//                   onChange={(e) => handleChange("practical.gunph.sa", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{getMax("practical.gunph.maxSa")}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">Iden of Parts</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.gunph.idenOfPartsScore")}
//                   onChange={(e) => handleChange("practical.gunph.idenOfPartsScore", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{getMax("practical.gunph.maxIdenOfPartsScore")}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* MSL PH */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">MSL PH</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">Iden of Parts</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.mslph.idenOfPartsScore")}
//                   onChange={(e) => handleChange("practical.mslph.idenOfPartsScore", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{getMax("practical.mslph.maxIdenOfPartsScore")}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* IMS */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">IMS</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">ATGM</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.ims.atgm")}
//                   onChange={(e) => handleChange("practical.ims.atgm", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{getMax("practical.ims.maxAtgm")}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* FD FIRING */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">FD FIRING</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">GUN</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.fdfiring.gun")}
//                   onChange={(e) => handleChange("practical.fdfiring.gun", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{getMax("practical.fdfiring.maxGun")}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">PKT</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.fdfiring.pkt")}
//                   onChange={(e) => handleChange("practical.fdfiring.pkt", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{getMax("practical.fdfiring.maxPkt")}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">MSL</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.fdfiring.msl")}
//                   onChange={(e) => handleChange("practical.fdfiring.msl", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{getMax("practical.fdfiring.maxMsl")}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="gunner-tech-phase-card" style={{ marginBottom: "24px" }}>
//         <TextareaControl
//           label="Restrictive Quality"
//           value={form?.restrictiveQuality || ""}
//           onChange={(e) => onFieldChange("restrictiveQuality", e.target.value)}
//           rows={4}
//         />
//       </div>

//       <div className="gunner-tech-phase-submit-row">
//         <ButtonControl
//           text={"Submit"}
//           onClick={onSubmit}
//           disabled={loading}
//           styles="gunner-tech-phase-submit-btn"
//         />
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import "./gunnerTechPhaseStyles.scss";
// import InputControl from "../../../controls/input/InputControl";
// import TextareaControl from "../../../controls/textarea/textareaControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import BackNavigation from "../../../common/navigation/BackNavigation";

// export default function GunnerTechPhase({
//   header,
//   form,
//   rawData,
//   onFieldChange,
//   onSubmit,
//   loading,
// }) {

//   // -----------------------------------------
//   // FALLBACK MAX SCORE VALUES (Default Values)
//   // -----------------------------------------
//   const fallbackMaxScores = {
//     // Theoretical
//     "theoretical.maxWrittenScore": 50,
//     "theoretical.maxQuizScore": 20,

//     // PKT
//     "practical.pkt.maxsaScore": 30,
//     "practical.pkt.maxIdenOfPartsScore": 20,

//     // EQPT PH
//     "practical.eqptph.maxStabsiop": 30,
//     "practical.eqptph.maxIdenOfPartsScore": 20,

//     // GUN PH
//     "practical.gunph.maxSa": 30,
//     "practical.gunph.maxIdenOfPartsScore": 20,

//     // MSL PH
//     "practical.mslph.maxIdenOfPartsScore": 20,

//     // IMS
//     "practical.ims.maxAtgm": 30,

//     // FD FIRING
//     "practical.fdfiring.maxGun": 30,
//     "practical.fdfiring.maxPkt": 30,
//     "practical.fdfiring.maxMsl": 30,
//   };

//   // Helper function to safely get nested values
//   const getNested = (obj, path) => {
//     const keys = path.split(".");
//     let current = obj;
//     for (let key of keys) {
//       current = current?.[key];
//       if (current === undefined) return undefined;
//     }
//     return current;
//   };

//   // -----------------------------------------
//   // GET MAX SCORE WITH FALLBACK
//   // -----------------------------------------
//   const getMax = (path) => {
//     const valueFromState = getNested(rawData, path);

//     if (valueFromState !== undefined && valueFromState !== null) {
//       return Number(valueFromState) || 0;
//     }

//     // fallback value
//     return fallbackMaxScores[path] ?? 0;
//   };

//   const getValue = (path) => {
//     const valueFromForm = getNested(form, path);
//     if (valueFromForm === undefined || valueFromForm === null) return "";
//     return valueFromForm === "" ? "" : Number(valueFromForm);
//   };

//   // MAP form field → rawData max path
//   const getMaxPath = (formPath) => {
//     const mapping = {
//       "theoretical.writtenScore": "theoretical.maxWrittenScore",
//       "theoretical.quizScore": "theoretical.maxQuizScore",

//       "practical.pkt.saScore": "practical.pkt.maxsaScore",
//       "practical.pkt.idenOfPartsScore": "practical.pkt.maxIdenOfPartsScore",

//       "practical.eqptph.stabsiop": "practical.eqptph.maxStabsiop",
//       "practical.eqptph.idenOfPartsScore": "practical.eqptph.maxIdenOfPartsScore",

//       "practical.gunph.sa": "practical.gunph.maxSa",
//       "practical.gunph.idenOfPartsScore": "practical.gunph.maxIdenOfPartsScore",

//       "practical.mslph.idenOfPartsScore": "practical.mslph.maxIdenOfPartsScore",

//       "practical.ims.atgm": "practical.ims.maxAtgm",

//       "practical.fdfiring.gun": "practical.fdfiring.maxGun",
//       "practical.fdfiring.pkt": "practical.fdfiring.maxPkt",
//       "practical.fdfiring.msl": "practical.fdfiring.maxMsl",
//     };

//     return mapping[formPath] || formPath;
//   };

//   // handle input change with validation
//   const handleChange = (path, value) => {
//     const max = getMax(getMaxPath(path));
//     const numValue = value === "" ? "" : Number(value);

//     if (value === "" || (numValue >= 0 && numValue <= max)) {
//       onFieldChange(path, value === "" ? "" : numValue);
//     }
//   };

//   return (
//     <div className="gunner-tech-phase-page">
//       <div className="gtp-header">
//         <BackNavigation />
//         <h2>Tech Phase</h2>
//       </div>

//       {/* Header Info Card */}
//       <div className="gunner-tech-phase-info-card">
//         <div className="gunner-tech-phase-info-left">
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Army Number</div>
//             <div className="gunner-tech-phase-info-value">{header?.agniveerNo}</div>
//           </div>
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Squad Number</div>
//             <div className="gunner-tech-phase-info-value">{header?.squadNo}</div>
//           </div>
//         </div>
//         <div className="gunner-tech-phase-info-center">
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Name</div>
//             <div className="gunner-tech-phase-info-value">{header?.name}</div>
//           </div>
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Rank</div>
//             <div className="gunner-tech-phase-info-value">{header?.rank}</div>
//           </div>
//         </div>
//         <div className="gunner-tech-phase-info-right">
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Course</div>
//             <div className="gunner-tech-phase-info-value">{header?.course}</div>
//           </div>
//         </div>
//       </div>

//       {/* The rest of your component remains EXACTLY the same */}
//       {/* ----------------------------------------------- */}
//       {/* NO CHANGES MADE BELOW — all original code kept */}
//       {/* ----------------------------------------------- */}

//       {/* Theoretical Test */}
//       <div className="gunner-tech-phase-test-row">
//         <div className="gunner-tech-phase-card gunner-tech-phase-theoretical-card">
//           <h3 className="gunner-tech-phase-card-title">Theoretical Test</h3>
//           <div className="gunner-tech-phase-two-col">
//             <div className="gunner-tech-phase-inline-field">
//               <div className="gunner-tech-phase-inline-field-wrapper">
//                 <div className="gunner-tech-phase-numeric-label-write">Written</div>
//                 <InputControl
//                   type="numbers"
//                   value={getValue("theoretical.writtenScore")}
//                   onChange={(e) => handleChange("theoretical.writtenScore", e.target.value)}
//                   styles="gunner-tech-phase-input-inline"
//                 />
//               </div>
//               <div className="gunner-tech-phase-max-inline-write">
//                 <span>/</span> <p>{getMax("theoretical.maxWrittenScore")}</p>
//               </div>
//             </div>

//             <div className="gunner-tech-phase-inline-field">
//               <div className="gunner-tech-phase-inline-field-wrapper">
//                 <div className="gunner-tech-phase-numeric-label-quiz">Quiz</div>
//                 <InputControl
//                   type="numbers"
//                   value={getValue("theoretical.quizScore")}
//                   onChange={(e) => handleChange("theoretical.quizScore", e.target.value)}
//                   styles="gunner-tech-phase-input-inline"
//                 />
//               </div>
//               <div className="gunner-tech-phase-max-inline-quiz">
//                 <span>/</span> <p>{getMax("theoretical.maxQuizScore")}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Practical Test */}
//       {/* --- Entire practical block unchanged --- */}
//       {/* (keeping your exact structure; only getMax() now uses fallback logic) */}

//       <div className="gunner-tech-phase-card" style={{ marginBottom: "24px" }}>
//         <TextareaControl
//           label="Restrictive Quality"
//           value={form?.restrictiveQuality || ""}
//           onChange={(e) => onFieldChange("restrictiveQuality", e.target.value)}
//           rows={4}
//         />
//       </div>

//       <div className="gunner-tech-phase-submit-row">
//         <ButtonControl
//           text={"Submit"}
//           onClick={onSubmit}
//           disabled={loading}
//           styles="gunner-tech-phase-submit-btn"
//         />
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import "./gunnerTechPhaseStyles.scss";
// import InputControl from "../../../controls/input/InputControl";
// import TextareaControl from "../../../controls/textarea/textareaControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import BackNavigation from "../../../common/navigation/BackNavigation";

// const DEFAULT_MAX_SCORES = {
//   theoretical: {
//     maxWrittenScore: 50,
//     maxQuizScore: 30,
//   },
//   practical: {
//     pkt: {
//       maxsaScore: 10,
//       maxIdenOfPartsScore: 4,
//     },
//     eqptph: {
//       maxStabsiop: 50,
//       maxIdenOfPartsScore: 50,
//     },
//     gunph: {
//       maxSa: 50,
//       maxIdenOfPartsScore: 50,
//     },
//     mslph: {
//       maxIdenOfPartsScore: 50,
//     },
//     ims: {
//       maxAtgm: 100,
//     },
//     fdfiring: {
//       maxGun: 100,
//       maxPkt: 100,
//       maxMsl: 100,
//     },
//   },
// };

// export default function GunnerTechPhase({
//   header,
//   form,
//   rawData,
//   onFieldChange,
//   onSubmit,
//   loading,
// }) {
//   // Safely get max value with fallback
//   const getMax = (path) => {
//     const keys = path.split(".");
//     let current = rawData || DEFAULT_MAX_SCORES;

//     for (let key of keys) {
//       current = current?.[key];
//       if (current === undefined || current === null) {
//         // Traverse fallback structure
//         const fallback = DEFAULT_MAX_SCORES;
//         let fallbackCurrent = fallback;
//         for (let k of keys) {
//           fallbackCurrent = fallbackCurrent?.[k];
//           if (fallbackCurrent === undefined) return 0;
//         }
//         return Number(fallbackCurrent) || 0;
//       }
//     }
//     return Number(current) || 0;
//   };

//   // Safely get current form value
//   const getValue = (path) => {
//     const keys = path.split(".");
//     let current = form;

//     for (let key of keys) {
//       current = current?.[key];
//       if (current === undefined || current === null) return "";
//     }

//     // Return empty string if empty, otherwise convert to number for input
//     return current === "" || current === null || current === undefined
//       ? ""
//       : Number(current);
//   };

//   // Handle input change with max validation
//   const handleChange = (path, value) => {
//     const max = getMax(getMaxPath(path));
//     const numValue = value === "" ? "" : Number(value);

//     // Allow empty or valid number within range
//     if (value === "" || (Number.isInteger(numValue) && numValue >= 0 && numValue <= max)) {
//       onFieldChange(path, value === "" ? "" : numValue);
//     }
//   };

//   // Map form field path to corresponding max score path in rawData or defaults
//   const getMaxPath = (formPath) => {
//     const mapping = {
//       // Theoretical
//       "theoretical.writtenScore": "theoretical.maxWrittenScore",
//       "theoretical.quizScore": "theoretical.maxQuizScore",

//       // Practical
//       "practical.pkt.saScore": "practical.pkt.maxsaScore",
//       "practical.pkt.idenOfPartsScore": "practical.pkt.maxIdenOfPartsScore",

//       "practical.eqptph.stabsiop": "practical.eqptph.maxStabsiop",
//       "practical.eqptph.idenOfPartsScore": "practical.eqptph.maxIdenOfPartsScore",

//       "practical.gunph.sa": "practical.gunph.maxSa",
//       "practical.gunph.idenOfPartsScore": "practical.gunph.maxIdenOfPartsScore",

//       "practical.mslph.idenOfPartsScore": "practical.mslph.maxIdenOfPartsScore",

//       "practical.ims.atgm": "practical.ims.maxAtgm",

//       "practical.fdfiring.gun": "practical.fdfiring.maxGun",
//       "practical.fdfiring.pkt": "practical.fdfiring.maxPkt",
//       "practical.fdfiring.msl": "practical.fdfiring.maxMsl",
//     };

//     return mapping[formPath] || formPath;
//   };

//   return (
//     <div className="gunner-tech-phase-page">
//       <div className="gtp-header">
//         <BackNavigation />
//         <h2>Tech Phase</h2>
//       </div>

//       {/* Header Info Card */}
//       <div className="gunner-tech-phase-info-card">
//         <div className="gunner-tech-phase-info-left">
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Army Number</div>
//             <div className="gunner-tech-phase-info-value">{header?.agniveerNo || "-"}</div>
//           </div>
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Squad Number</div>
//             <div className="gunner-tech-phase-info-value">{header?.squadNo || "-"}</div>
//           </div>
//         </div>
//         <div className="gunner-tech-phase-info-center">
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Name</div>
//             <div className="gunner-tech-phase-info-value">{header?.name || "-"}</div>
//           </div>
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Rank</div>
//             <div className="gunner-tech-phase-info-value">{header?.rank || "-"}</div>
//           </div>
//         </div>
//         <div className="gunner-tech-phase-info-right">
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Course</div>
//             <div className="gunner-tech-phase-info-value">{header?.course || "-"}</div>
//           </div>
//         </div>
//       </div>

//       {/* Theoretical Test */}
//       <div className="gunner-tech-phase-test-row">
//         <div className="gunner-tech-phase-card gunner-tech-phase-theoretical-card">
//           <h3 className="gunner-tech-phase-card-title">Theoretical Test</h3>
//           <div className="gunner-tech-phase-two-col">
//             <div className="gunner-tech-phase-inline-field">
//               <div className="gunner-tech-phase-inline-field-wrapper">
//                 <div className="gunner-tech-phase-numeric-label-write">Written</div>
//                 <InputControl
//                   type="numbers"
//                   value={getValue("theoretical.writtenScore")}
//                   onChange={(e) => handleChange("theoretical.writtenScore", e.target.value)}
//                   styles="gunner-tech-phase-input-inline"
//                   placeholder="0"
//                 />
//               </div>
//               <div className="gunner-tech-phase-max-inline-write">
//                 <span>/</span> <p>{getMax("theoretical.maxWrittenScore")}</p>
//               </div>
//             </div>

//             <div className="gunner-tech-phase-inline-field">
//               <div className="gunner-tech-phase-inline-field-wrapper">
//                 <div className="gunner-tech-phase-numeric-label-quiz">Quiz</div>
//                 <InputControl
//                   type="numbers"
//                   value={getValue("theoretical.quizScore")}
//                   onChange={(e) => handleChange("theoretical.quizScore", e.target.value)}
//                   styles="gunner-tech-phase-input-inline"
//                   placeholder="0"
//                 />
//               </div>
//               <div className="gunner-tech-phase-max-inline-quiz">
//                 <span>/</span> <p>{getMax("theoretical.maxQuizScore")}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Practical Test */}
//       <div className="gunner-tech-phase-card gunner-tech-phase-practical-card">
//         <h3 className="gunner-tech-phase-card-title">Practical Test</h3>
//         <div className="gunner-tech-phase-practical-grid">
//           {/* PKT */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">PKT</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">S&A</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.pkt.saScore")}
//                   onChange={(e) => handleChange("practical.pkt.saScore", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                   placeholder="0"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{getMax("practical.pkt.maxsaScore")}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">Iden of Parts</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.pkt.idenOfPartsScore")}
//                   onChange={(e) => handleChange("practical.pkt.idenOfPartsScore", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                   placeholder="0"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{getMax("practical.pkt.maxIdenOfPartsScore")}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* EQPT PH */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">EQPT PH</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">STAB & SI OP</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.eqptph.stabsiop")}
//                   onChange={(e) => handleChange("practical.eqptph.stabsiop", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                   placeholder="0"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{getMax("practical.eqptph.maxStabsiop")}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">Iden of Parts</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.eqptph.idenOfPartsScore")}
//                   onChange={(e) => handleChange("practical.eqptph.idenOfPartsScore", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                   placeholder="0"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{getMax("practical.eqptph.maxIdenOfPartsScore")}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* GUN PH */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">GUN PH</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">S&A</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.gunph.sa")}
//                   onChange={(e) => handleChange("practical.gunph.sa", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                   placeholder="0"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{getMax("practical.gunph.maxSa")}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">Iden of Parts</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.gunph.idenOfPartsScore")}
//                   onChange={(e) => handleChange("practical.gunph.idenOfPartsScore", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                   placeholder="0"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{getMax("practical.gunph.maxIdenOfPartsScore")}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* MSL PH */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">MSL PH</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">Iden of Parts</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.mslph.idenOfPartsScore")}
//                   onChange={(e) => handleChange("practical.mslph.idenOfPartsScore", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                   placeholder="0"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{getMax("practical.mslph.maxIdenOfPartsScore")}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* IMS */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">IMS</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">ATGM</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.ims.atgm")}
//                   onChange={(e) => handleChange("practical.ims.atgm", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                   placeholder="0"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{getMax("practical.ims.maxAtgm")}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">FD FIRING</h4>
//             {["gun", "pkt", "msl"].map((item) => (
//               <div key={item} className="gunner-tech-phase-small-card-row">
//                 <div className="gunner-tech-phase-numeric-label">
//                   {item.toUpperCase()}
//                 </div>
//                 <div className="gunner-tech-phase-numeric-input">
//                   <InputControl
//                     type="numbers"
//                     value={getValue(`practical.fdfiring.${item}`)}
//                     onChange={(e) => handleChange(`practical.fdfiring.${item}`, e.target.value)}
//                     styles="gunner-tech-phase-input-narrow"
//                     placeholder="0"
//                   />
//                   <div className="gunner-tech-phase-max-inline">
//                     <span>/</span> <p>{getMax(`practical.fdfiring.max${item.charAt(0).toUpperCase() + item.slice(1)}`)}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Restrictive Quality */}
//       <div className="gunner-tech-phase-card" style={{ marginBottom: "24px" }}>
//         <TextareaControl
//           label="Restrictive Quality"
//           value={form?.restrictiveQuality || ""}
//           onChange={(e) => onFieldChange("restrictiveQuality", e.target.value)}
//           rows={4}
//           placeholder="Enter any remarks or restrictive qualities..."
//         />
//       </div>

//       <div className="gunner-tech-phase-submit-row">
//         <ButtonControl
//           text={loading ? "Submitting..." : "Submit"}
//           onClick={onSubmit}
//           disabled={loading}
//           styles="gunner-tech-phase-submit-btn"
//         />
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import "./gunnerTechPhaseStyles.scss";
// import InputControl from "../../../controls/input/InputControl";
// import TextareaControl from "../../../controls/textarea/textareaControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import BackNavigation from "../../../common/navigation/BackNavigation";

// // Fallback default max scores (used when rawData is missing or incomplete)
// const DEFAULT_MAX_SCORES = {
//   theoretical: {
//     maxWrittenScore: 50,
//     maxQuizScore: 30,
//   },
//   practical: {
//     pkt: {
//       maxsaScore: 10,
//       maxIdenOfPartsScore: 4,
//     },
//     eqptph: {
//       maxStabsiop: 10,
//       maxIdenOfPartsScore: 6,
//     },
//     gunph: {
//       maxSa: 20,
//       maxIdenOfPartsScore: 10,
//     },
//     mslph: {
//       maxIdenOfPartsScore: 10,
//     },
//     ims: {
//       maxAtgm: 20,
//     },
//     fdfiring: {
//       maxGun: 12,
//       maxPkt: 8,
//       maxMsl: 10,
//     },
//   },
// };

// // Helper to format number as two digits (e.g., 6 → "06", 10 → "10")
// const formatMaxScore = (value) => {
//   if (value === undefined || value === null) return "00";
//   return String(value).padStart(2, "0");
// };

// export default function GunnerTechPhase({
//   header,
//   form,
//   rawData,
//   onFieldChange,
//   onSubmit,
//   loading,
// }) {
//   // Safely get max value with fallback
//   const getMax = (path) => {
//     const keys = path.split(".");
//     let current = rawData;

//     // Traverse rawData first
//     for (let key of keys) {
//       current = current?.[key];
//       if (current === undefined || current === null) {
//         // Fall back to DEFAULT_MAX_SCORES
//         let fallback = DEFAULT_MAX_SCORES;
//         for (let k of keys) {
//           fallback = fallback?.[k];
//           if (fallback === undefined) return 0;
//         }
//         return Number(fallback) || 0;
//       }
//     }
//     return Number(current) || 0;
//   };

//   const getValue = (path) => {
//     const keys = path.split(".");
//     let current = form;

//     for (let key of keys) {
//       current = current?.[key];
//       if (current === undefined || current === null) return "";
//     }
//     return current === "" ? "" : Number(current);
//   };

//   // Handle input change with max validation
//   const handleChange = (path, value) => {
//     const max = getMax(getMaxPath(path));
//     const numValue = value === "" ? "" : Number(value);

//     if (value === "" || (Number.isInteger(numValue) && numValue >= 0 && numValue <= max)) {
//       onFieldChange(path, value === "" ? "" : numValue);
//     }
//   };

//   // Map form path to rawData max path
//   const getMaxPath = (formPath) => {
//     const mapping = {
//       // Theoretical
//       "theoretical.writtenScore": "theoretical.maxWrittenScore",
//       "theoretical.quizScore": "theoretical.maxQuizScore",

//       // Practical
//       "practical.pkt.saScore": "practical.pkt.maxsaScore",
//       "practical.pkt.idenOfPartsScore": "practical.pkt.maxIdenOfPartsScore",

//       "practical.eqptph.stabsiop": "practical.eqptph.maxStabsiop",
//       "practical.eqptph.idenOfPartsScore": "practical.eqptph.maxIdenOfPartsScore",

//       "practical.gunph.sa": "practical.gunph.maxSa",
//       "practical.gunph.idenOfPartsScore": "practical.gunph.maxIdenOfPartsScore",

//       "practical.mslph.idenOfPartsScore": "practical.mslph.maxIdenOfPartsScore",

//       "practical.ims.atgm": "practical.ims.maxAtgm",

//       "practical.fdfiring.gun": "practical.fdfiring.maxGun",
//       "practical.fdfiring.pkt": "practical.fdfiring.maxPkt",
//       "practical.fdfiring.msl": "practical.fdfiring.maxMsl",
//     };
//     return mapping[formPath] || formPath;
//   };

//   return (
//     <div className="gunner-tech-phase-page">
//       <div className="gtp-header">
//         <BackNavigation />
//         <h2>Tech Phase</h2>
//       </div>

//       {/* Header Info Card */}
//       <div className="gunner-tech-phase-info-card">
//         <div className="gunner-tech-phase-info-left">
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Army Number</div>
//             <div className="gunner-tech-phase-info-value">{header?.agniveerNo}</div>
//           </div>
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Squad Number</div>
//             <div className="gunner-tech-phase-info-value">{header?.squadNo}</div>
//           </div>
//         </div>
//         <div className="gunner-tech-phase-info-center">
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Name</div>
//             <div className="gunner-tech-phase-info-value">{header?.name}</div>
//           </div>
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Rank</div>
//             <div className="gunner-tech-phase-info-value">{header?.rank}</div>
//           </div>
//         </div>
//         <div className="gunner-tech-phase-info-right">
//           <div className="gunner-tech-phase-info-row">
//             <div className="gunner-tech-phase-info-label">Course</div>
//             <div className="gunner-tech-phase-info-value">{header?.course}</div>
//           </div>
//         </div>
//       </div>

//       {/* Theoretical Test */}
//       <div className="gunner-tech-phase-test-row">
//         <div className="gunner-tech-phase-card gunner-tech-phase-theoretical-card">
//           <h3 className="gunner-tech-phase-card-title">Theoretical Test</h3>
//           <div className="gunner-tech-phase-two-col">
//             <div className="gunner-tech-phase-inline-field">
//               <div className="gunner-tech-phase-inline-field-wrapper">
//                 <div className="gunner-tech-phase-numeric-label-write">Written</div>
//                 <InputControl
//                   type="numbers"
//                   value={getValue("theoretical.writtenScore")}
//                   onChange={(e) => handleChange("theoretical.writtenScore", e.target.value)}
//                   styles="gunner-tech-phase-input-inline"
//                 />
//               </div>
//               <div className="gunner-tech-phase-max-inline-write">
//                 <span>/</span> <p>{formatMaxScore(getMax("theoretical.maxWrittenScore"))}</p>
//               </div>
//             </div>
//             <div className="gunner-tech-phase-inline-field">
//               <div className="gunner-tech-phase-inline-field-wrapper">
//                 <div className="gunner-tech-phase-numeric-label-quiz">Quiz</div>
//                 <InputControl
//                   type="numbers"
//                   value={getValue("theoretical.quizScore")}
//                   onChange={(e) => handleChange("theoretical.quizScore", e.target.value)}
//                   styles="gunner-tech-phase-input-inline"
//                 />
//               </div>
//               <div className="gunner-tech-phase-max-inline-quiz">
//                 <span>/</span> <p>{formatMaxScore(getMax("theoretical.maxQuizScore"))}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Practical Test */}
//       <div className="gunner-tech-phase-card gunner-tech-phase-practical-card">
//         <h3 className="gunner-tech-phase-card-title">Practical Test</h3>
//         <div className="gunner-tech-phase-practical-grid">
//           {/* PKT */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">PKT</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">S&A</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.pkt.saScore")}
//                   onChange={(e) => handleChange("practical.pkt.saScore", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("practical.pkt.maxsaScore"))}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">Iden of Parts</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.pkt.idenOfPartsScore")}
//                   onChange={(e) => handleChange("practical.pkt.idenOfPartsScore", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("practical.pkt.maxIdenOfPartsScore"))}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* EQPT PH */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">EQPT PH</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">STAB & SI OP</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.eqptph.stabsiop")}
//                   onChange={(e) => handleChange("practical.eqptph.stabsiop", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("practical.eqptph.maxStabsiop"))}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">Iden of Parts</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.eqptph.idenOfPartsScore")}
//                   onChange={(e) => handleChange("practical.eqptph.idenOfPartsScore", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("practical.eqptph.maxIdenOfPartsScore"))}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* GUN PH */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">GUN PH</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">S&A</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.gunph.sa")}
//                   onChange={(e) => handleChange("practical.gunph.sa", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("practical.gunph.maxSa"))}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">Iden of Parts</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.gunph.idenOfPartsScore")}
//                   onChange={(e) => handleChange("practical.gunph.idenOfPartsScore", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("practical.gunph.maxIdenOfPartsScore"))}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* MSL PH */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">MSL PH</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">Iden of Parts</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.mslph.idenOfPartsScore")}
//                   onChange={(e) => handleChange("practical.mslph.idenOfPartsScore", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("practical.mslph.maxIdenOfPartsScore"))}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* IMS */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">IMS</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">ATGM</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.ims.atgm")}
//                   onChange={(e) => handleChange("practical.ims.atgm", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("practical.ims.maxAtgm"))}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* FD FIRING */}
//           <div className="gunner-tech-phase-small-card">
//             <h4 className="gunner-tech-phase-small-card-title">FD FIRING</h4>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">GUN</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.fdfiring.gun")}
//                   onChange={(e) => handleChange("practical.fdfiring.gun", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("practical.fdfiring.maxGun"))}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">PKT</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.fdfiring.pkt")}
//                   onChange={(e) => handleChange("practical.fdfiring.pkt", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("practical.fdfiring.maxPkt"))}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="gunner-tech-phase-small-card-row">
//               <div className="gunner-tech-phase-numeric-label">MSL</div>
//               <div className="gunner-tech-phase-numeric-input">
//                 <InputControl
//                   type="numbers"
//                   value={getValue("practical.fdfiring.msl")}
//                   onChange={(e) => handleChange("practical.fdfiring.msl", e.target.value)}
//                   styles="gunner-tech-phase-input-narrow"
//                 />
//                 <div className="gunner-tech-phase-max-inline">
//                   <span>/</span> <p>{formatMaxScore(getMax("practical.fdfiring.maxMsl"))}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="gunner-tech-phase-card" style={{ marginBottom: "24px" }}>
//         <TextareaControl
//           label="Restrictive Quality"
//           value={form?.restrictiveQuality || ""}
//           onChange={(e) => onFieldChange("restrictiveQuality", e.target.value)}
//           rows={4}
//         />
//       </div>

//       <div className="gunner-tech-phase-submit-row">
//         <ButtonControl
//           text={loading ? "Submitting..." : "Submit"}
//           onClick={onSubmit}
//           disabled={loading}
//           styles="gunner-tech-phase-submit-btn"
//         />
//       </div>
//     </div>
//   );
// }

import React from "react";
import "./gunnerTechPhaseStyles.scss";
import InputControl from "../../../controls/input/InputControl";
import TextareaControl from "../../../controls/textarea/textareaControl";
import ButtonControl from "../../../controls/button/ButtonControl";
import BackNavigation from "../../../common/navigation/BackNavigation";

// Fallback default max scores (used when rawData is missing or incomplete)
const DEFAULT_MAX_SCORES = {
  theoretical: {
    maxWrittenScore: 50,
    maxQuizScore: 30,
  },
  practical: {
    pkt: {
      maxsaScore: 6,
      maxIdenOfPartsScore: 4,
    },
    eqptph: {
      maxOpStabSys: 5,
      maxOpGnrSi: 6,
      maxOpSmkSys: 5,
      maxIdenOfPartsScore: 4,
    },
    gunph: {
      maxSa: 5,
      maxIdenOfPartsScore: 10,
    },
    mslph: {
      maxMsl: 5,
      maxIdenOfPartsScore: 10,
    },
    ims: {
      maxAtgm: 20,
    },
    fdfiring: {
      maxGun: 15,
      maxPkt: 10,
      maxMsl: 15,
    },
  },
};

// Helper to format number as two digits (e.g., 6 → "06", 10 → "10")
const formatMaxScore = (value) => {
  if (value === undefined || value === null) return "00";
  return String(value).padStart(2, "0");
};

// All required form paths that must be filled
const REQUIRED_FIELDS = [
  "theoretical.writtenScore",
  "theoretical.quizScore",
  "practical.pkt.saScore",
  "practical.pkt.idenOfPartsScore",
  "practical.eqptph.opStabSys",
  "practical.eqptph.opGnrSi",
  "practical.eqptph.opSmkSys",
  "practical.eqptph.idenOfPartsScore",
  "practical.gunph.sa",
  "practical.gunph.idenOfPartsScore",
  "practical.mslph.msl",
  "practical.mslph.idenOfPartsScore",
  "practical.ims.atgm",
  "practical.fdfiring.gun",
  "practical.fdfiring.pkt",
  "practical.fdfiring.msl",
];

export default function GunnerTechPhase({
  header,
  form,
  rawData,
  onFieldChange,
  onSubmit,
  loading,
}) {
  // Safely get max value with fallback
  const getMax = (path) => {
    const keys = path.split(".");
    let current = rawData;

    // Traverse rawData first
    for (let key of keys) {
      current = current?.[key];
      if (current === undefined || current === null) {
        // Fall back to DEFAULT_MAX_SCORES
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
    return current;
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

  // Map form path to rawData max path
  const getMaxPath = (formPath) => {
    const mapping = {
      // Theoretical
      "theoretical.writtenScore": "theoretical.maxWrittenScore",
      "theoretical.quizScore": "theoretical.maxQuizScore",

      // Practical
      "practical.pkt.saScore": "practical.pkt.maxsaScore",
      "practical.pkt.idenOfPartsScore": "practical.pkt.maxIdenOfPartsScore",

      "practical.eqptph.opStabSys": "practical.eqptph.maxOpStabSys",
      "practical.eqptph.opGnrSi": "practical.eqptph.maxOpGnrSi",
      "practical.eqptph.opSmkSys": "practical.eqptph.maxOpSmkSys",
      "practical.eqptph.idenOfPartsScore":
        "practical.eqptph.maxIdenOfPartsScore",

      "practical.gunph.sa": "practical.gunph.maxSa",
      "practical.gunph.idenOfPartsScore": "practical.gunph.maxIdenOfPartsScore",

      "practical.mslph.msl": "practical.mslph.maxMsl",
      "practical.mslph.idenOfPartsScore": "practical.mslph.maxIdenOfPartsScore",

      "practical.ims.atgm": "practical.ims.maxAtgm",

      "practical.fdfiring.gun": "practical.fdfiring.maxGun",
      "practical.fdfiring.pkt": "practical.fdfiring.maxPkt",
      "practical.fdfiring.msl": "practical.fdfiring.maxMsl",
    };
    return mapping[formPath] || formPath;
  };

  // NEW: Form completion check
  const isFormComplete = () => {
    const allFieldsFilled = REQUIRED_FIELDS.every((path) => {
      const val = getValue(path);
      return val !== "" && val !== null && val !== undefined;
    });

    return allFieldsFilled;
  };

  return (
    <div className="gunner-tech-phase-page">
      <div className="gtp-header">
        <BackNavigation />
        <h2>Tech Phase</h2>
      </div>

      {/* Header Info Card */}
      <div className="gunner-tech-phase-info-card">
        <div className="gunner-tech-phase-info-left">
          <div className="gunner-tech-phase-info-row">
            <div className="gunner-tech-phase-info-label">Army Number</div>
            <div className="gunner-tech-phase-info-value">
              {header?.agniveerNo}
            </div>
          </div>
          <div className="gunner-tech-phase-info-row">
            <div className="gunner-tech-phase-info-label">Squad Number</div>
            <div className="gunner-tech-phase-info-value">
              {header?.squadNo}
            </div>
          </div>
        </div>
        <div className="gunner-tech-phase-info-center">
          <div className="gunner-tech-phase-info-row">
            <div className="gunner-tech-phase-info-label">Name</div>
            <div className="gunner-tech-phase-info-value">{header?.name}</div>
          </div>
          <div className="gunner-tech-phase-info-row">
            <div className="gunner-tech-phase-info-label">Rank</div>
            <div className="gunner-tech-phase-info-value">{header?.rank}</div>
          </div>
        </div>
        <div className="gunner-tech-phase-info-right">
          <div className="gunner-tech-phase-info-row">
            <div className="gunner-tech-phase-info-label">Course</div>
            <div className="gunner-tech-phase-info-value">{header?.course}</div>
          </div>
          <div className="gunner-tech-phase-info-row">
            <div className="gunner-tech-phase-info-label">Unit</div>
            <div className="gunner-tech-phase-info-value">
              {header?.unit || "-"}
            </div>
          </div>
        </div>
      </div>

      {/* Theoretical Test */}
      <div className="gunner-tech-phase-test-row">
        <div className="gunner-tech-phase-card gunner-tech-phase-theoretical-card">
          <h3 className="gunner-tech-phase-card-title">Theoretical Test</h3>
          <div className="gunner-tech-phase-two-col">
            <div className="gunner-tech-phase-inline-field">
              <div className="gunner-tech-phase-inline-field-wrapper">
                <div className="gunner-tech-phase-numeric-label-write">
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
                  styles="gunner-tech-phase-input-inline"
                />
              </div>
              <div className="gunner-tech-phase-max-inline-write">
                <span>/</span>{" "}
                <p>{formatMaxScore(getMax("theoretical.maxWrittenScore"))}</p>
              </div>
            </div>
            <div className="gunner-tech-phase-inline-field">
              <div className="gunner-tech-phase-inline-field-wrapper">
                <div className="gunner-tech-phase-numeric-label-quiz">QUIZ</div>
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
                  styles="gunner-tech-phase-input-inline"
                />
              </div>
              <div className="gunner-tech-phase-max-inline-quiz">
                <span>/</span>{" "}
                <p>{formatMaxScore(getMax("theoretical.maxQuizScore"))}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Practical Test */}
      <div className="gunner-tech-phase-card gunner-tech-phase-practical-card">
        <h3 className="gunner-tech-phase-card-title">Practical Test</h3>
        <div className="gunner-tech-phase-practical-grid">
          {/* PKT */}
          <div className="gunner-tech-phase-small-card">
            <h4 className="gunner-tech-phase-small-card-title">PKT PH</h4>
            <div className="gunner-tech-phase-small-card-row">
              <div className="gunner-tech-phase-numeric-label">S&A</div>
              <div className="gunner-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.pkt.saScore")}
                  onChange={(e) =>
                    handleChange("practical.pkt.saScore", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.pkt.saScore", e.target.value)
                  }
                  styles="gunner-tech-phase-input-narrow"
                />
                <div className="gunner-tech-phase-max-inline">
                  <span>/</span>{" "}
                  <p>{formatMaxScore(getMax("practical.pkt.maxsaScore"))}</p>
                </div>
              </div>
            </div>
            <div className="gunner-tech-phase-small-card-row">
              <div className="gunner-tech-phase-numeric-label">
                Iden of Parts
              </div>
              <div className="gunner-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.pkt.idenOfPartsScore")}
                  onChange={(e) =>
                    handleChange(
                      "practical.pkt.idenOfPartsScore",
                      e.target.value,
                    )
                  }
                  onBlur={(e) =>
                    handleBlur("practical.pkt.idenOfPartsScore", e.target.value)
                  }
                  styles="gunner-tech-phase-input-narrow"
                />
                <div className="gunner-tech-phase-max-inline">
                  <span>/</span>{" "}
                  <p>
                    {formatMaxScore(
                      getMax("practical.pkt.maxIdenOfPartsScore"),
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* EQPT PH */}
          <div className="gunner-tech-phase-small-card">
            <h4 className="gunner-tech-phase-small-card-title">EQPT PH</h4>
            <div className="gunner-tech-phase-small-card-row">
              <div className="gunner-tech-phase-numeric-label">
                Op of Stab Sys
              </div>
              <div className="gunner-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.eqptph.opStabSys")}
                  onChange={(e) =>
                    handleChange("practical.eqptph.opStabSys", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.eqptph.opStabSys", e.target.value)
                  }
                  styles="gunner-tech-phase-input-narrow"
                />
                <div className="gunner-tech-phase-max-inline">
                  <span>/</span>{" "}
                  <p>
                    {formatMaxScore(getMax("practical.eqptph.maxOpStabSys"))}
                  </p>
                </div>
              </div>
            </div>

            <div className="gunner-tech-phase-small-card-row">
              <div className="gunner-tech-phase-numeric-label">
                Op of Gnr Sight
              </div>
              <div className="gunner-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.eqptph.opGnrSi")}
                  onChange={(e) =>
                    handleChange("practical.eqptph.opGnrSi", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.eqptph.opGnrSi", e.target.value)
                  }
                  styles="gunner-tech-phase-input-narrow"
                />
                <div className="gunner-tech-phase-max-inline">
                  <span>/</span>{" "}
                  <p>{formatMaxScore(getMax("practical.eqptph.maxOpGnrSi"))}</p>
                </div>
              </div>
            </div>

            <div className="gunner-tech-phase-small-card-row">
              <div className="gunner-tech-phase-numeric-label">
                Op of Smk Sys
              </div>
              <div className="gunner-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.eqptph.opSmkSys")}
                  onChange={(e) =>
                    handleChange("practical.eqptph.opSmkSys", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.eqptph.opSmkSys", e.target.value)
                  }
                  styles="gunner-tech-phase-input-narrow"
                />
                <div className="gunner-tech-phase-max-inline">
                  <span>/</span>{" "}
                  <p>
                    {formatMaxScore(getMax("practical.eqptph.maxOpSmkSys"))}
                  </p>
                </div>
              </div>
            </div>

            <div className="gunner-tech-phase-small-card-row">
              <div className="gunner-tech-phase-numeric-label">
                Iden of Parts
              </div>
              <div className="gunner-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.eqptph.idenOfPartsScore")}
                  onChange={(e) =>
                    handleChange(
                      "practical.eqptph.idenOfPartsScore",
                      e.target.value,
                    )
                  }
                  onBlur={(e) =>
                    handleBlur(
                      "practical.eqptph.idenOfPartsScore",
                      e.target.value,
                    )
                  }
                  styles="gunner-tech-phase-input-narrow"
                />
                <div className="gunner-tech-phase-max-inline">
                  <span>/</span>{" "}
                  <p>
                    {formatMaxScore(
                      getMax("practical.eqptph.maxIdenOfPartsScore"),
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* GUN PH */}
          <div className="gunner-tech-phase-small-card">
            <h4 className="gunner-tech-phase-small-card-title">GUN PH</h4>
            <div className="gunner-tech-phase-small-card-row">
              <div className="gunner-tech-phase-numeric-label">S&A</div>
              <div className="gunner-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.gunph.sa")}
                  onChange={(e) =>
                    handleChange("practical.gunph.sa", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.gunph.sa", e.target.value)
                  }
                  styles="gunner-tech-phase-input-narrow"
                />
                <div className="gunner-tech-phase-max-inline">
                  <span>/</span>{" "}
                  <p>{formatMaxScore(getMax("practical.gunph.maxSa"))}</p>
                </div>
              </div>
            </div>
            <div className="gunner-tech-phase-small-card-row">
              <div className="gunner-tech-phase-numeric-label">
                Iden of Parts
              </div>
              <div className="gunner-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.gunph.idenOfPartsScore")}
                  onChange={(e) =>
                    handleChange(
                      "practical.gunph.idenOfPartsScore",
                      e.target.value,
                    )
                  }
                  onBlur={(e) =>
                    handleBlur(
                      "practical.gunph.idenOfPartsScore",
                      e.target.value,
                    )
                  }
                  styles="gunner-tech-phase-input-narrow"
                />
                <div className="gunner-tech-phase-max-inline">
                  <span>/</span>{" "}
                  <p>
                    {formatMaxScore(
                      getMax("practical.gunph.maxIdenOfPartsScore"),
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* MSL PH */}
          <div className="gunner-tech-phase-small-card">
            <h4 className="gunner-tech-phase-small-card-title">MSL PH</h4>
            <div className="gunner-tech-phase-small-card-row">
              <div className="gunner-tech-phase-numeric-label">
                Msl Firing cct
              </div>
              <div className="gunner-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.mslph.msl")}
                  onChange={(e) =>
                    handleChange("practical.mslph.msl", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.mslph.msl", e.target.value)
                  }
                  styles="gunner-tech-phase-input-narrow"
                />
                <div className="gunner-tech-phase-max-inline">
                  <span>/</span>{" "}
                  <p>{formatMaxScore(getMax("practical.mslph.maxMsl"))}</p>
                </div>
              </div>
            </div>
            <div className="gunner-tech-phase-small-card-row">
              <div className="gunner-tech-phase-numeric-label">
                Iden of Parts
              </div>
              <div className="gunner-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.mslph.idenOfPartsScore")}
                  onChange={(e) =>
                    handleChange(
                      "practical.mslph.idenOfPartsScore",
                      e.target.value,
                    )
                  }
                  onBlur={(e) =>
                    handleBlur(
                      "practical.mslph.idenOfPartsScore",
                      e.target.value,
                    )
                  }
                  styles="gunner-tech-phase-input-narrow"
                />
                <div className="gunner-tech-phase-max-inline">
                  <span>/</span>{" "}
                  <p>
                    {formatMaxScore(
                      getMax("practical.mslph.maxIdenOfPartsScore"),
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* IMS */}
          <div className="gunner-tech-phase-small-card">
            <h4 className="gunner-tech-phase-small-card-title">IMS</h4>
            <div className="gunner-tech-phase-small-card-row">
              <div className="gunner-tech-phase-numeric-label">ATGM</div>
              <div className="gunner-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.ims.atgm")}
                  onChange={(e) =>
                    handleChange("practical.ims.atgm", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.ims.atgm", e.target.value)
                  }
                  styles="gunner-tech-phase-input-narrow"
                />
                <div className="gunner-tech-phase-max-inline">
                  <span>/</span>{" "}
                  <p>{formatMaxScore(getMax("practical.ims.maxAtgm"))}</p>
                </div>
              </div>
            </div>
          </div>

          {/* FD FIRING */}
          <div className="gunner-tech-phase-small-card">
            <h4 className="gunner-tech-phase-small-card-title">FD FIRING</h4>
            <div className="gunner-tech-phase-small-card-row">
              <div className="gunner-tech-phase-numeric-label">GUN</div>
              <div className="gunner-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.fdfiring.gun")}
                  onChange={(e) =>
                    handleChange("practical.fdfiring.gun", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.fdfiring.gun", e.target.value)
                  }
                  styles="gunner-tech-phase-input-narrow"
                />
                <div className="gunner-tech-phase-max-inline">
                  <span>/</span>{" "}
                  <p>{formatMaxScore(getMax("practical.fdfiring.maxGun"))}</p>
                </div>
              </div>
            </div>
            <div className="gunner-tech-phase-small-card-row">
              <div className="gunner-tech-phase-numeric-label">PKT</div>
              <div className="gunner-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.fdfiring.pkt")}
                  onChange={(e) =>
                    handleChange("practical.fdfiring.pkt", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.fdfiring.pkt", e.target.value)
                  }
                  styles="gunner-tech-phase-input-narrow"
                />
                <div className="gunner-tech-phase-max-inline">
                  <span>/</span>{" "}
                  <p>{formatMaxScore(getMax("practical.fdfiring.maxPkt"))}</p>
                </div>
              </div>
            </div>
            <div className="gunner-tech-phase-small-card-row">
              <div className="gunner-tech-phase-numeric-label">MSL</div>
              <div className="gunner-tech-phase-numeric-input">
                <InputControl
                  type="text"
                  inputMode="decimal"
                  value={getValue("practical.fdfiring.msl")}
                  onChange={(e) =>
                    handleChange("practical.fdfiring.msl", e.target.value)
                  }
                  onBlur={(e) =>
                    handleBlur("practical.fdfiring.msl", e.target.value)
                  }
                  styles="gunner-tech-phase-input-narrow"
                />
                <div className="gunner-tech-phase-max-inline">
                  <span>/</span>{" "}
                  <p>{formatMaxScore(getMax("practical.fdfiring.maxMsl"))}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gunner-tech-phase-card" style={{ marginBottom: "24px" }}>
        <TextareaControl
          label="Restrictive Quality"
          value={form?.restrictiveQuality || ""}
          onChange={(e) => onFieldChange("restrictiveQuality", e.target.value)}
          rows={4}
        />
      </div>

      <div className="gunner-tech-phase-submit-row">
        <ButtonControl
          text={"Submit"}
          onClick={onSubmit}
          disabled={loading || !isFormComplete()}
          styles="gunner-tech-phase-submit-btn"
        />
      </div>
    </div>
  );
}
