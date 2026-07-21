// import React from "react";
// import RangeInput from "../../../../components/controls/range/RangeInput";
// import "./fortnightlyPerformanceSheetStyles.scss";
// import { IoIosArrowBack } from "react-icons/io";
// import { useHistory } from "react-router-dom";
// import InputControl from "../../../../components/controls/input/InputControl";

// const getRatingText = (value, max = 10) => {
//   const percentage = (value / max) * 100;
//   if (percentage >= 80) return "Excellent";
//   if (percentage >= 60) return "Average";
//   if (percentage >= 50) return "Low";
//   return "Below Average";
// };

// const DEFAULT_PERFORMANCE_FIELDS = [
//   { id: "physical_training", label: "Physical Training", value: 0, min: 0, max: 10, step: 1 },
//   { id: "motivation_level", label: "Motivation Level", value: 0, min: 0, max: 10, step: 1 },
//   { id: "military_bearing", label: "Military Bearing", value: 0, min: 0, max: 10, step: 1 },
//   { id: "situational_awareness", label: "Situational Awareness", value: 0, min: 0, max: 10, step: 1 },
//   { id: "problem_solving", label: "Problem Solving / Mental Agility", value: 0, min: 0, max: 10, step: 1 },
//   { id: "class_performance", label: "Class Performance", value: 0, min: 0, max: 10, step: 1 },
//   { id: "morale", label: "Morale", value: 0, min: 0, max: 10, step: 1 },
//   { id: "decision_making", label: "Decision Making / Sound Judgement", value: 0, min: 0, max: 10, step: 1 },
//   { id: "resilience", label: "Resilience / Mental Toughness (Grit)", value: 0, min: 0, max: 10, step: 1 },
//   { id: "integrity", label: "Integrity", value: 0, min: 0, max: 10, step: 1 },
// ].map(field => ({
//   ...field,
//   colorStart: "#9b4cff",
//   colorEnd: "#2ad0ff",
// }));

// const FortnightlyPerformanceSheet = ({ performance = [], actions }) => {
//   const history = useHistory();

//   console.log("performance is  like this ",performance)
//   const mergedPerformance = DEFAULT_PERFORMANCE_FIELDS.map(defaultField => {
//     const current = performance?.find(p => p.id === defaultField?.id);
//     return current ? { ...defaultField, ...current } : defaultField;
//   });

//   const left = mergedPerformance.slice(0, Math.ceil(mergedPerformance.length / 2));
//   const right = mergedPerformance.slice(Math.ceil(mergedPerformance.length / 2));

//   const handleChange = (id, newValue) => {
//     actions.setWeeklyPerformance({ id, value: Number(newValue) });
//   };

//   const handleFortnightChange = (e) => {

//   };

//   return (
//     <div className="fortnightly-sheet">
//       <div className="fps-header-wrapper">
//         <div className="fps-header">
//           <IoIosArrowBack
//             className="fps-back-icon"
//             onClick={() => history.goBack()}
//           />
//           <h2>Fortnightly Performance Sheet</h2>
//         </div>

//         <InputControl
//           value=""
//           onChange={handleFortnightChange}
//           className="fortnight-input"
//           styles="fortnight-input"
//         />
//       </div>

//       <div className="sheet-body">
//         <div className="sheet-column">
//           {left.map(p => (
//             <div className="sheet-row" key={p.id}>
//               <div className="row-control">
//                 <div className="row-label">{p.label}</div>
//                 <div className="value-label">
//                   {p.value}/{p.max}{" "}
//                   <span className="rating-text">({getRatingText(p.value, p.max)})</span>
//                 </div>
//               </div>
//               <RangeInput
//                 min={p.min}
//                 max={p.max}
//                 step={p.step}
//                 value={p.value}
//                 onChange={val => handleChange(p.id, val)}
//                 fillColorStart={p.colorStart}
//                 fillColorEnd={p.colorEnd}
//                 dotColor="#ffffff"
//                 showTicks={true}
//               />
//             </div>
//           ))}
//         </div>

//         <div className="sheet-column">
//           {right.map(p => (
//             <div className="sheet-row" key={p.id}>
//               <div className="row-control">
//                 <div className="row-label">{p.label}</div>
//                 <div className="value-label">
//                   {p.value}/{p.max}{" "}
//                   <span className="rating-text">({getRatingText(p.value, p.max)})</span>
//                 </div>
//               </div>
//               <RangeInput
//                 min={p.min}
//                 max={p.max}
//                 step={p.step}
//                 value={p.value}
//                 onChange={val => handleChange(p.id, val)}
//                 fillColorStart={p.colorStart}
//                 fillColorEnd={p.colorEnd}
//                 dotColor="#ffffff"
//                 showTicks={true}
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="sheet-footer">
//         <button
//           className="submit-btn"
//           onClick={() => actions.saveWeeklyPerformance(mergedPerformance)}
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FortnightlyPerformanceSheet;

// import React from "react";
// import RangeInput from "../../../../components/controls/range/RangeInput";
// import "./fortnightlyPerformanceSheetStyles.scss";
// import { IoIosArrowBack } from "react-icons/io";
// import { useHistory } from "react-router-dom";
// import InputControl from "../../../../components/controls/input/InputControl";

// const getRatingText = (value, max = 10) => {
//   const percentage = (value / max) * 100;
//   if (percentage >= 80) return "Excellent";
//   if (percentage >= 60) return "Average";
//   if (percentage >= 50) return "Low";
//   return "Below Average";
// };

// const FIELD_MAP = {
//   physical_training: "physicalTraining",
//   games_performance: "gamesPerformance",
//   motivation_level: "motivationLevel",
//   military_bearing: "militaryBearing",
//   situational_awareness: "situationalAwareness",
//   problem_solving: "decisionMaking",
//   class_performance: "classPerformance",
//   morale: "morale",
//   decision_making: "decisionMaking",
//   resilience: "resilience",
//   integrity: "integrity"
// };

// const DEFAULT_PERFORMANCE_FIELDS = [
//   { id: "physical_training", label: "Physical Training", value: 0, min: 0, max: 10, step: 1 },
//   { id: "games_performance", label: "Games Performance", value: 0, min: 0, max: 10, step: 1 },
//   { id: "motivation_level", label: "Motivation Level", value: 0, min: 0, max: 10, step: 1 },
//   { id: "military_bearing", label: "Military Bearing", value: 0, min: 0, max: 10, step: 1 },
//   { id: "situational_awareness", label: "Situational Awareness", value: 0, min: 0, max: 10, step: 1 },
//   { id: "problem_solving", label: "Problem Solving / Mental Agility", value: 0, min: 0, max: 10, step: 1 },
//   { id: "class_performance", label: "Class Performance", value: 0, min: 0, max: 10, step: 1 },
//   { id: "morale", label: "Morale", value: 0, min: 0, max: 10, step: 1 },
//   { id: "decision_making", label: "Decision Making / Judgement", value: 0, min: 0, max: 10, step: 1 },
//   { id: "resilience", label: "Resilience / Grit", value: 0, min: 0, max: 10, step: 1 },
//   { id: "integrity", label: "Integrity", value: 0, min: 0, max: 10, step: 1 },
// ].map(field => ({
//   ...field,
//   colorStart: "#9b4cff",
//   colorEnd: "#2ad0ff",
// }));

// const FortnightlyPerformanceSheet = ({ performance, actions }) => {
//   const history = useHistory();

//   console.log("performance is like this ", performance);

//   const safePerformance = performance && typeof performance === "object" ? performance : {};

//   const sequenceNumber = safePerformance?.sequence ?? "";

//   const convertedPerformance = Object.keys(FIELD_MAP).map(key => {
//     const apiKey = FIELD_MAP[key];
//     const apiData = safePerformance[apiKey];

//     return apiData && typeof apiData === "object"
//       ? { id: key, value: apiData.score ?? 0, remark: apiData.remark ?? "" }
//       : { id: key, value: 0, remark: "" };
//   });

//   const mergedPerformance = DEFAULT_PERFORMANCE_FIELDS.map(field => {
//     const found = convertedPerformance.find(p => p.id === field.id);
//     return found ? { ...field, value: found.value } : field;
//   });

//   const left = mergedPerformance.slice(0, Math.ceil(mergedPerformance.length / 2));
//   const right = mergedPerformance.slice(Math.ceil(mergedPerformance.length / 2));

//   const handleChange = (id, newValue) => {
//     actions.setWeeklyPerformance({ id, value: Number(newValue) });
//   };

//   return (
//     <div className="fortnightly-sheet">
//       <div className="fps-header-wrapper">
//         <div className="fps-header">
//           <IoIosArrowBack className="fps-back-icon" onClick={() => history.goBack()} />
//           <h2>Fortnightly Performance Sheet</h2>
//         </div>

//         {/* Sequence Number Input (Disabled) */}
//         <InputControl
//           value={sequenceNumber}
//           disabled={true}
//           className="fortnight-input"
//           styles="fortnight-input"
//           placeholder="Sequence"
//         />
//       </div>

//       <div className="sheet-body">
//         <div className="sheet-column">
//           {left.map(p => (
//             <div className="sheet-row" key={p.id}>
//               <div className="row-control">
//                 <div className="row-label">{p.label}</div>
//                 <div className="value-label">
//                   {p.value}/{p.max} (<span className="rating-text">{getRatingText(p.value)}</span>)
//                 </div>
//               </div>

//               <RangeInput
//                 min={p.min}
//                 max={p.max}
//                 step={p.step}
//                 value={p.value}
//                 onChange={val => handleChange(p.id, val)}
//                 fillColorStart={p.colorStart}
//                 fillColorEnd={p.colorEnd}
//                 dotColor="#ffffff"
//                 showTicks
//               />
//             </div>
//           ))}
//         </div>

//         <div className="sheet-column">
//           {right.map(p => (
//             <div className="sheet-row" key={p.id}>
//               <div className="row-control">
//                 <div className="row-label">{p.label}</div>
//                 <div className="value-label">
//                   {p.value}/{p.max} (<span className="rating-text">{getRatingText(p.value)}</span>)
//                 </div>
//               </div>

//               <RangeInput
//                 min={p.min}
//                 max={p.max}
//                 step={p.step}
//                 value={p.value}
//                 onChange={val => handleChange(p.id, val)}
//                 fillColorStart={p.colorStart}
//                 fillColorEnd={p.colorEnd}
//                 dotColor="#ffffff"
//                 showTicks
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="sheet-footer">
//         <button
//           className="submit-btn"
//           onClick={() => actions.saveWeeklyPerformance(mergedPerformance)}
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FortnightlyPerformanceSheet;

// import React, { useMemo } from "react";
// import RangeInput from "../../../../components/controls/range/RangeInput";
// import "./fortnightlyPerformanceSheetStyles.scss";
// import { IoIosArrowBack } from "react-icons/io";
// import { useHistory } from "react-router-dom";
// import InputControl from "../../../../components/controls/input/InputControl";
// import BackNavigation from "../../../common/navigation/BackNavigation";

// const getRatingText = (value, max = 10) => {
//   const percentage = (value / max) * 100;
//   if (percentage >= 80) return "Excellent";
//   if (percentage >= 60) return "Average";
//   if (percentage <= 50) return "Low";
// };

// const FIELD_MAP = {
//   physical_training: "physicalTraining",
//   performance_in_Games_Sports: "gamesPerformance",
//   motivation_level: "motivationLevel",
//   military_bearing: "militaryBearing",
//   situational_awareness: "situationalAwareness",
//   class_performance: "classPerformance",
//   morale: "morale",
//   decision_making: "decisionMaking",
//   resilience: "resilience",
//   integrity: "integrity",
// };

//   const formatLabel = (label) => {
//   let formatted = label.replace(/_/g, " ");

//   // Uppercase First Letters
//   formatted = formatted.replace(/\b\w/g, (l) => l.toUpperCase());

//   // Apply simple rule-based refinements
//   const rules = [
//     { match: "Performance In Games Sports", replace: "Performance in Games/Sports" },
//     { match: "Decision Making", replace: "Decision Making / Sound Judgement" },
//     { match: "Resilience", replace: "Resilience / Mental Toughness (Grit)" },
//   ];

//   for (const r of rules) {
//     if (formatted === r.match) return r.replace;
//   }

//   return formatted;
// };

// const DEFAULT_FIELDS = Object.keys(FIELD_MAP).map((id) => ({
//   id,
//   apiKey: FIELD_MAP[id],
//   min: 0,
//   max: 10,
//   step: 1,
//   label: formatLabel(id),

//   colorStart: "#9b4cff",
//   colorEnd: "#2ad0ff",
// }));

// const FortnightlyPerformanceSheet = ({ performance, updateField, onSubmit }) => {
//   const history = useHistory();

//   const merged = useMemo(() => {
//     return DEFAULT_FIELDS.map((f) => {
//       const existing = performance?.[f.apiKey];
//       return {
//         ...f,
//         value: existing?.score ?? 0,
//         remark: existing?.remark ?? "",
//       };
//     });
//   }, [performance]);

//   const left = merged.slice(0, Math.ceil(merged.length / 2));
//   const right = merged.slice(Math.ceil(merged.length / 2));

//   const handleChange = (id, val) => {
//     const apiKey = FIELD_MAP[id];

//     updateField(apiKey, {
//       score: Number(val),
//       remark: getRatingText(Number(val)).toLowerCase(),
//     });
//   };

//   return (
//     <div className="fortnightly-sheet">

//         <div className="fps-header">
//           <BackNavigation/>

//         </div>
//       <div className="fps-header-wrapper">

//           <h2>Fortnightly Performance Sheet</h2>

//         <InputControl
//           value={performance?.sequence || "0"}
//           disabled={true}
//           className="fortnight-input"
//           styles="fortnight-input"
//           placeholder=""
//         />
//       </div>

//       <div className="sheet-body">

//         <div className="sheet-column">
//           {left.map((p) => (
//             <div className="sheet-row" key={p.id}>
//               <div className="row-control">
//                 <div className="row-label">{p.label}</div>
//                 <div className="value-label">
//                   {p.value}/{p.max} (<span className="rating-text">{getRatingText(p.value)}</span>)
//                 </div>
//               </div>

//               <RangeInput
//                 min={p.min}
//                 max={p.max}
//                 step={p.step}
//                 value={p.value}
//                 onChange={(val) => handleChange(p.id, val)}
//                 fillColorStart={p.colorStart}
//                 fillColorEnd={p.colorEnd}
//                 dotColor="#ffffff"
//                 showTicks
//               />
//             </div>
//           ))}
//         </div>

//         <div className="sheet-column">
//           {right.map((p) => (
//             <div className="sheet-row" key={p.id}>
//               <div className="row-control">
//                 <div className="row-label">{p.label}</div>
//                 <div className="value-label">
//                   {p.value}/{p.max} (<span className="rating-text">{getRatingText(p.value)}</span>)
//                 </div>
//               </div>

//               <RangeInput
//                 min={p.min}
//                 max={p.max}
//                 step={p.step}
//                 value={p.value}
//                 onChange={(val) => handleChange(p.id, val)}
//                 fillColorStart={p.colorStart}
//                 fillColorEnd={p.colorEnd}
//                 dotColor="#ffffff"
//                 showTicks
//               />
//             </div>
//           ))}
//         </div>

//       </div>

//       <div className="sheet-footer">
//         <button className="submit-btn" onClick={onSubmit}>
//           Submit
//         </button>
//       </div>

//     </div>
//   );
// };

// export default FortnightlyPerformanceSheet;

// import React, { useMemo } from "react";
// import RangeInput from "../../../../components/controls/range/RangeInput";
// import "./fortnightlyPerformanceSheetStyles.scss";
// import { IoIosArrowBack } from "react-icons/io";
// import { useHistory } from "react-router-dom";
// import InputControl from "../../../../components/controls/input/InputControl";
// import BackNavigation from "../../../common/navigation/BackNavigation";

// const getRatingText = (value, max = 10) => {
//   const percentage = (value / max) * 100;
//   if (percentage >= 80) return "Excellent";
//   if (percentage >= 60) return "Average";
//   if (percentage <= 50) return "Low";
// };

// const FIELD_MAP = {
//   physical_training: "physicalTraining",
//   performance_in_Games_Sports: "gamesPerformance",
//   motivation_level: "motivationLevel",
//   military_bearing: "militaryBearing",
//   situational_awareness: "situationalAwareness",
//   class_performance: "classPerformance",
//   morale: "morale",
//   decision_making: "decisionMaking",
//   resilience: "resilience",
//   integrity: "integrity",
// };

//   const formatLabel = (label) => {
//   let formatted = label.replace(/_/g, " ");

//   // Uppercase First Letters
//   formatted = formatted.replace(/\b\w/g, (l) => l.toUpperCase());

//   // Apply simple rule-based refinements
//   const rules = [
//     { match: "Performance In Games Sports", replace: "Performance in Games/Sports" },
//     { match: "Decision Making", replace: "Decision Making / Sound Judgement" },
//     { match: "Resilience", replace: "Resilience / Mental Toughness (Grit)" },
//   ];

//   for (const r of rules) {
//     if (formatted === r.match) return r.replace;
//   }

//   return formatted;
// };

// const DEFAULT_FIELDS = Object.keys(FIELD_MAP).map((id) => ({
//   id,
//   apiKey: FIELD_MAP[id],
//   min: 0,
//   max: 10,
//   step: 1,
//   label: formatLabel(id),

//   colorStart: "#9b4cff",
//   colorEnd: "#2ad0ff",
// }));

// const FortnightlyPerformanceSheet = ({ performance, updateField, onSubmit }) => {
//   const history = useHistory();

//   const merged = useMemo(() => {
//     return DEFAULT_FIELDS.map((f) => {
//       const existing = performance?.[f.apiKey];
//       return {
//         ...f,
//         value: existing?.score ?? 0,
//         remark: existing?.remark ?? "",
//       };
//     });
//   }, [performance]);

//   const left = merged.slice(0, Math.ceil(merged.length / 2));
//   const right = merged.slice(Math.ceil(merged.length / 2));

//   const handleChange = (id, val) => {
//     const apiKey = FIELD_MAP[id];

//     updateField(apiKey, {
//       score: Number(val),
//       remark: getRatingText(Number(val)).toLowerCase(),
//     });
//   };

//   return (
//     <div className="fortnightly-sheet">

//         <div className="fps-header">
//           <BackNavigation/>

//         </div>
//       <div className="fps-header-wrapper">

//           <h2>Fortnightly Performance Sheet</h2>

//         <InputControl
//           value={performance?.sequence || "0"}
//           className="fortnight-input"
//           styles="fortnight-input"
//           innerInputStyles="fortnight-input-custom-styles"
//           placeholder=""
//           disabled={true}
//         />
//       </div>

//       <div className="sheet-body">

//         <div className="sheet-column">
//           {left.map((p) => (
//             <div className="sheet-row" key={p.id}>
//               <div className="row-control">
//                 <div className="row-label">{p.label}</div>
//                 <div className="value-label">
//                   {p.value}/{p.max} (<span className="rating-text">{getRatingText(p.value)}</span>)
//                 </div>
//               </div>

//               <RangeInput
//                 min={p.min}
//                 max={p.max}
//                 step={p.step}
//                 value={p.value}
//                 onChange={(val) => handleChange(p.id, val)}
//                 fillColorStart={p.colorStart}
//                 fillColorEnd={p.colorEnd}
//                 dotColor="#ffffff"
//                 showTicks
//               />
//             </div>
//           ))}
//         </div>

//         <div className="sheet-column">
//           {right.map((p) => (
//             <div className="sheet-row" key={p.id}>
//               <div className="row-control">
//                 <div className="row-label">{p.label}</div>
//                 <div className="value-label">
//                   {p.value}/{p.max} (<span className="rating-text">{getRatingText(p.value)}</span>)
//                 </div>
//               </div>

//               <RangeInput
//                 min={p.min}
//                 max={p.max}
//                 step={p.step}
//                 value={p.value}
//                 onChange={(val) => handleChange(p.id, val)}
//                 fillColorStart={p.colorStart}
//                 fillColorEnd={p.colorEnd}
//                 dotColor="#ffffff"
//                 showTicks
//               />
//             </div>
//           ))}
//         </div>

//       </div>

//       <div className="sheet-footer">
//         <button className="submit-btn" onClick={onSubmit}>
//           Submit
//         </button>
//       </div>

//     </div>
//   );
// };

// export default FortnightlyPerformanceSheet;

// import React, { useMemo } from "react";
// import RangeInput from "../../../../components/controls/range/RangeInput";
// import "./fortnightlyPerformanceSheetStyles.scss";
// import { IoIosArrowBack } from "react-icons/io";
// import { useHistory } from "react-router-dom";
// import InputControl from "../../../../components/controls/input/InputControl";
// import BackNavigation from "../../../common/navigation/BackNavigation";

// const getRatingText = (value, max = 10) => {
//   const percentage = (value / max) * 100;
//   if (percentage >= 80) return "Excellent";
//   if (percentage >= 60) return "Average";
//   return "Low"; // Covers <= 50% and everything below
// };

// const FIELD_MAP = {
//   physical_training: "physicalTraining",
//   performance_in_Games_Sports: "gamesPerformance",
//   motivation_level: "motivationLevel",
//   military_bearing: "militaryBearing",
//   situational_awareness: "situationalAwareness",
//   class_performance: "classPerformance",
//   morale: "morale",
//   decision_making: "decisionMaking",
//   resilience: "resilience",
//   integrity: "integrity",
// };

// const formatLabel = (label) => {
//   let formatted = label.replace(/_/g, " ");
//   // Uppercase First Letters
//   formatted = formatted.replace(/\b\w/g, (l) => l.toUpperCase());
//   // Apply simple rule-based refinements
//   const rules = [
//     { match: "Performance In Games Sports", replace: "Performance in Games/Sports" },
//     { match: "Decision Making", replace: "Decision Making / Sound Judgement" },
//     { match: "Resilience", replace: "Resilience / Mental Toughness (Grit)" },
//   ];
//   for (const r of rules) {
//     if (formatted === r.match) return r.replace;
//   }
//   return formatted;
// };

// const DEFAULT_FIELDS = Object.keys(FIELD_MAP).map((id) => ({
//   id,
//   apiKey: FIELD_MAP[id],
//   min: 0,
//   max: 10,
//   step: 1,
//   label: formatLabel(id),
//   colorStart: "#9b4cff",
//   colorEnd: "#2ad0ff",
// }));

// const FortnightlyPerformanceSheet = ({ performance, updateField, onSubmit }) => {
//   const history = useHistory();

//   const merged = useMemo(() => {
//     return DEFAULT_FIELDS.map((f) => {
//       const existing = performance?.[f.apiKey];
//       const score = existing?.score ?? 0;
//       const remarkFromExisting = existing?.remark;
//       // If there's no existing remark, or it's empty, compute it from score
//       const remark = remarkFromExisting || getRatingText(score).toLowerCase();

//       return {
//         ...f,
//         value: score,
//         remark,
//       };
//     });
//   }, [performance]);

//   const left = merged.slice(0, Math.ceil(merged.length / 2));
//   const right = merged.slice(Math.ceil(merged.length / 2));

//   const handleChange = (id, val) => {
//     const apiKey = FIELD_MAP[id];
//     updateField(apiKey, {
//       score: Number(val),
//       remark: getRatingText(Number(val)).toLowerCase(),
//     });
//   };

//   return (
//     <div className="fortnightly-sheet">
//       <div className="fps-header">
//         <BackNavigation />
//       </div>
//       <div className="fps-header-wrapper">
//         <h2>Fortnightly Performance Sheet</h2>
//         <InputControl
//           value={performance?.sequence || "0"}
//           className="fortnight-input"
//           styles="fortnight-input"
//           innerInputStyles="fortnight-input-custom-styles"
//           placeholder=""
//           disabled={true}
//         />
//       </div>
//       <div className="sheet-body">
//         <div className="sheet-column">
//           {left.map((p) => (
//             <div className="sheet-row" key={p.id}>
//               <div className="row-control">
//                 <div className="row-label">{p.label}</div>
//                 <div className="value-label">
//                   {p.value}/{p.max} (<span className="rating-text">{getRatingText(p.value)}</span>)
//                 </div>
//               </div>
//               <RangeInput
//                 min={p.min}
//                 max={p.max}
//                 step={p.step}
//                 value={p.value}
//                 onChange={(val) => handleChange(p.id, val)}
//                 fillColorStart={p.colorStart}
//                 fillColorEnd={p.colorEnd}
//                 dotColor="#ffffff"
//                 showTicks
//               />
//             </div>
//           ))}
//         </div>
//         <div className="sheet-column">
//           {right.map((p) => (
//             <div className="sheet-row" key={p.id}>
//               <div className="row-control">
//                 <div className="row-label">{p.label}</div>
//                 <div className="value-label">
//                   {p.value}/{p.max} (<span className="rating-text">{getRatingText(p.value)}</span>)
//                 </div>
//               </div>
//               <RangeInput
//                 min={p.min}
//                 max={p.max}
//                 step={p.step}
//                 value={p.value}
//                 onChange={(val) => handleChange(p.id, val)}
//                 fillColorStart={p.colorStart}
//                 fillColorEnd={p.colorEnd}
//                 dotColor="#ffffff"
//                 showTicks
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="sheet-footer">
//         <button className="submit-btn" onClick={onSubmit}>
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FortnightlyPerformanceSheet;

import React, { useMemo } from "react";
import RangeInput from "../../../../components/controls/range/RangeInput";
import "./fortnightlyPerformanceSheetStyles.scss";
import InputControl from "../../../../components/controls/input/InputControl";
import BackNavigation from "../../../common/navigation/BackNavigation";

const getRatingText = (value, max = 10) => {
  const percentage = (value / max) * 100;
  if (percentage > 70) return "Above Average";
  if (percentage >= 50) return "Average";
  return "Below Average";
};

const FIELD_MAP = {
  physical_training: "physicalTraining",
  performance_in_Games_Sports: "gamesPerformance",
  motivation_level: "motivationLevel",
  military_bearing: "militaryBearing",
  situational_awareness: "situationalAwareness",
  class_performance: "classPerformance",
  morale: "morale",
  decision_making: "decisionMaking",
  resilience: "resilience",
  integrity: "integrity",
};

const formatLabel = (label) => {
  let formatted = label.replace(/_/g, " ");
  formatted = formatted.replace(/\b\w/g, (l) => l.toUpperCase());
  const rules = [
    {
      match: "Performance In Games Sports",
      replace: "Performance in Games/Sports",
    },
    { match: "Decision Making", replace: "Decision Making / Sound Judgement" },
    { match: "Resilience", replace: "Resilience / Mental Toughness (Grit)" },
  ];
  for (const r of rules) {
    if (formatted === r.match) return r.replace;
  }
  return formatted;
};

const DEFAULT_FIELDS = Object.keys(FIELD_MAP).map((id) => ({
  id,
  apiKey: FIELD_MAP[id],
  min: 0,
  max: 10,
  step: 1,
  label: formatLabel(id),
  colorStart: "#9b4cff",
  colorEnd: "#2ad0ff",
}));

const FortnightlyPerformanceSheet = ({
  performance,
  updateField,
  onSubmit,
}) => {
  const merged = useMemo(() => {
    return DEFAULT_FIELDS.map((f) => {
      const existing = performance?.[f.apiKey];
      const score = existing?.score ?? 0; // Default to 0 if no score
      const remarkFromExisting = existing?.remark;

      // Always derive remark from current score (even if untouched)
      const remark = remarkFromExisting || getRatingText(score).toLowerCase();

      return {
        ...f,
        value: score,
        remark,
      };
    });
  }, [performance]);

  const left = merged.slice(0, Math.ceil(merged.length / 2));
  const right = merged.slice(Math.ceil(merged.length / 2));

  const handleChange = (id, val) => {
    const apiKey = FIELD_MAP[id];
    const numericVal = Number(val);
    updateField(apiKey, {
      score: numericVal,
      remark: getRatingText(numericVal).toLowerCase(),
    });
  };

  return (
    <div className="fortnightly-sheet">
      <div className="fps-header">
        <BackNavigation />
      </div>
      <div className="fps-header-wrapper">
        <h2>Fortnightly Performance Sheet</h2>
        <InputControl
          value={performance?.sequence || "0"}
          className="fortnight-input"
          styles="fortnight-input"
          innerInputStyles="fortnight-input-custom-styles"
          placeholder=""
          disabled={true}
        />
      </div>
      <div className="sheet-body">
        <div className="sheet-column">
          {left.map((p) => (
            <div className="sheet-row" key={p.id}>
              <div className="row-control">
                <div className="row-label">{p.label}</div>
                <div className="value-label">
                  {p.value}/{p.max} (
                  <span className="rating-text">{getRatingText(p.value)}</span>)
                </div>
              </div>
              <RangeInput
                min={p.min}
                max={p.max}
                step={p.step}
                value={p.value}
                onChange={(val) => handleChange(p.id, val)}
                fillColorStart={p.colorStart}
                fillColorEnd={p.colorEnd}
                dotColor="#ffffff"
                showTicks
              />
            </div>
          ))}
        </div>
        <div className="sheet-column">
          {right.map((p) => (
            <div className="sheet-row" key={p.id}>
              <div className="row-control">
                <div className="row-label">{p.label}</div>
                <div className="value-label">
                  {p.value}/{p.max} (
                  <span className="rating-text">{getRatingText(p.value)}</span>)
                </div>
              </div>
              <RangeInput
                min={p.min}
                max={p.max}
                step={p.step}
                value={p.value}
                onChange={(val) => handleChange(p.id, val)}
                fillColorStart={p.colorStart}
                fillColorEnd={p.colorEnd}
                dotColor="#ffffff"
                showTicks
              />
            </div>
          ))}
        </div>
      </div>
      <div className="sheet-footer">
        <button className="submit-btn" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default FortnightlyPerformanceSheet;
