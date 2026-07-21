// import React from "react";
// import "./courseStyles.scss";
// import SelectControl from "../../../controls/select/SelectControl";
// import InputControl from "../../../controls/input/InputControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { Link } from "react-router-dom";

// const CourseSummaryView = ({
//   trade,
//   selectedCourse,
//   selectedCourseId,
//   armyNumber,
//   tradeId,
//   summaryData,
//   courseOptions,
//   onChange,
//   onSubmit,
// }) => {
//   const tradeFormatted =
//     trade.charAt(0).toUpperCase() + trade.slice(1).toLowerCase();

//   const baseRoute = `/${trade.toLowerCase()}/${trade.toLowerCase()}s`;

//   const cardConfig = [
//     { key: "gradeA", title: "Grade A" },
//     { key: "gradeB", title: "Grade B" },
//     { key: "gradeC", title: "Grade C" },
//     {
//       key: "improvement",
//       title: "Improvement Required",
//       span: 3,
//       countClass: "red",
//     },
//   ];

//   const cardData = cardConfig.map((c) => {
//     const params = new URLSearchParams();

//     if (selectedCourseId) params.set("course", selectedCourseId);
//     if (armyNumber) params.set("armyNo", armyNumber);
//     if (tradeId) params.set("tradeId", tradeId);

//     const search = params.toString();
//     const fullPath = search
//       ? `${baseRoute}/${c.key}?${search}`
//       : `${baseRoute}/${c.key}`;

//     return {
//       ...c,
//       count: summaryData[c.key]?.count || 0,
//       percentage: summaryData[c.key]?.percentage
//         ? `(${summaryData[c.key].percentage}%)`
//         : "(0%)",
//       to: fullPath,
//     };
//   });

//   return (
//     <div className="course-summary-wrapper">
//       <div className="cs-filter-box">
//         <div className="cs-filter-row">
//           <div className="cs-field">
//             <label>Select Course:</label>
//             <SelectControl
//               value={selectedCourse}
//               options={courseOptions}
//               onChange={(val) => onChange("selectedCourse", val)}
//               styles="cs-filter-select-input"
//               isClearable={true}
//             />
//           </div>

//           <div className="cs-or-text">
//             <span>|</span>
//             <span className="cs-or-text-span">OR</span>
//             <span>|</span>
//           </div>

//           <div className="cs-field-sqaud-number">
//             <label>Squad Number:</label>
//             <InputControl
//               placeholder="123456"
//               value={armyNumber}
//               onChange={(e) => onChange("armyNumber", e.target.value)}
//             />
//           </div>

//           <div className="cs-button">
//             <ButtonControl
//               text="Submit"
//               styles={"filterbuttonstyles"}
//               onClick={onSubmit}
//               wrapperStyles={"cs-button-wrapper"}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="cs-summary-section">
//         <h3 className="cs-title">Course Summary</h3>
//         <p className="cs-subtitle">Total number of {tradeFormatted}s:</p>

//         <div className="cs-summary-cards">
//           {cardData.map((card) => (
//             <div
//               key={card.key}
//               className={`cs-card ${card.key}`}
//               style={card.span ? { gridColumn: `span ${card.span}` } : {}}
//             >
//               <div className="cs-card-details-wrapper">
//                 <div className="cs-card-title">
//                   {card.key === "improvement" ? (
//                     <>
//                       Number of {tradeFormatted}s <br />
//                       <strong>where improvement is required</strong>
//                     </>
//                   ) : (
//                     <>
//                       {tradeFormatted} in <br /> <strong>{card.title}</strong>
//                     </>
//                   )}
//                 </div>

//                 <Link to={card.to} className="cs-view-btn">
//                   View <FaArrowRightLong />
//                 </Link>
//               </div>

//               <div className={`cs-count ${card.countClass || ""}`}>
//                 {card.count}
//                 <div className="cs-count-percentage">{card.percentage}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseSummaryView;

// import React from "react";
// import "./courseStyles.scss";
// import SelectControl from "../../../controls/select/SelectControl";
// import InputControl from "../../../controls/input/InputControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { Link } from "react-router-dom";

// const CourseSummaryView = ({
//   trade,
//   selectedCourse,
//   selectedCourseId,
//   armyNumber,
//   tradeId,
//   summaryData,
//   courseOptions,
//   onChange,
//   onSubmit,
// }) => {
//  const tradeFormatted = trade.toLowerCase() === "ofc" ? "OFC" : trade;

//   const baseRoute = `/${trade.toLowerCase()}/${trade.toLowerCase()}s`;

//   const cardConfig = [
//     { key: "gradeA", title: "Grade A" },
//     { key: "gradeB", title: "Grade B" },
//     { key: "gradeC", title: "Grade C" },
//     {
//       key: "improvement",
//       title: "Improvement Required",
//       span: 3,
//       countClass: "red",
//     },
//   ];

//   const cardData = cardConfig.map((c) => {
//     const params = new URLSearchParams();

//     if (selectedCourseId) params.set("course", selectedCourseId);
//     if (armyNumber) params.set("armyNo", armyNumber);
//     if (tradeId) params.set("tradeId", tradeId);

//     const search = params.toString();
//     const fullPath = search
//       ? `${baseRoute}/${c.key}?${search}`
//       : `${baseRoute}/${c.key}`;

//     return {
//       ...c,
//       count: summaryData[c.key]?.count || 0,
//       percentage: summaryData[c.key]?.percentage
//         ? `(${summaryData[c.key].percentage}%)`
//         : "(0%)",
//       to: fullPath,
//     };
//   });

//   const noDataAvailable =
//     selectedCourseId && cardData.every((c) => Number(c.count) === 0);

//   return (
//     <div className="course-summary-wrapper">
//       <div className="cs-filter-box">
//         <div className="cs-filter-row">
//           <div className="cs-field">
//             <label>Select Course:</label>
//             <SelectControl
//               value={selectedCourse}
//               options={courseOptions}
//               onChange={(val) => onChange("selectedCourse", val)}
//               styles="cs-filter-select-input"
//               isClearable={true}
//             />
//           </div>

//           <div className="cs-or-text">
//             <span>|</span>
//             <span className="cs-or-text-span">OR</span>
//             <span>|</span>
//           </div>

//           <div className="cs-field-sqaud-number">
//             <label>Squad Number:</label>
//             <InputControl
//               placeholder="123456"
//               value={armyNumber}
//               onChange={(e) => onChange("armyNumber", e.target.value)}
//             />
//           </div>

//           <div className="cs-button">
//             <ButtonControl
//               text="Submit"
//               styles={"filterbuttonstyles"}
//               onClick={onSubmit}
//               wrapperStyles={"cs-button-wrapper"}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="cs-summary-section">
//         <h3 className="cs-title">Course Summary</h3>
//         <p className="cs-subtitle">Total number of {tradeFormatted}s:</p>

//         {noDataAvailable && (
//           <div className="cs-no-data-card">
//             <div className="cs-no-data-title">
//               No Data Available for this Course
//             </div>

//             <Link
//               to={`${baseRoute}/allAgniveers`}
//               className="cs-view-all-link"
//             >
//               View all Agniveers <FaArrowRightLong />
//             </Link>
//           </div>
//         )}

//         {!noDataAvailable && (
//           <div className="cs-summary-cards">
//             {cardData.map((card) => (
//               <div
//                 key={card.key}
//                 className={`cs-card ${card.key}`}
//                 style={card.span ? { gridColumn: `span ${card.span}` } : {}}
//               >
//                 <div className="cs-card-details-wrapper">
//                   <div className="cs-card-title">
//                     {card.key === "improvement" ? (
//                       <>
//                         Number of {tradeFormatted}s <br />
//                         <strong>where improvement is required</strong>
//                       </>
//                     ) : (
//                       <>
//                         {tradeFormatted} in <br /> <strong>{card.title}</strong>
//                       </>
//                     )}
//                   </div>

//                   <Link to={card.to} className="cs-view-btn">
//                     View <FaArrowRightLong />
//                   </Link>
//                 </div>

//                 <div className={`cs-count ${card.countClass || ""}`}>
//                   {card.count}
//                   <div className="cs-count-percentage">{card.percentage}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CourseSummaryView;

// import React from "react";
// import "./courseStyles.scss";
// import SelectControl from "../../../controls/select/SelectControl";
// import InputControl from "../../../controls/input/InputControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { Link } from "react-router-dom";

// const CourseSummaryView = ({
//   trade,
//   selectedCourse,
//   selectedCourseId,
//   armyNumber,
//   tradeId,
//   summaryData,
//   courseOptions,
//   onChange,
//   onSubmit,
// }) => {
//   const tradeFormatted = trade.toLowerCase() === "ofc" ? "OFC" : trade;

//   const baseRoute = `/${trade.toLowerCase()}/${trade.toLowerCase()}s`;

//   const params = new URLSearchParams();
//   if (selectedCourseId) params.set("course", selectedCourseId);
//   if (armyNumber) params.set("armyNo", armyNumber);
//   if (tradeId) params.set("tradeId", tradeId);

//   const search = params.toString();
//   const queryString = search ? `?${search}` : "";

//   const cardConfig = [
//     { key: "gradeA", title: "Grade A" },
//     { key: "gradeB", title: "Grade B" },
//     { key: "gradeC", title: "Grade C" },
//     {
//       key: "improvement",
//       title: "Improvement Required",
//       span: 3,
//       countClass: "red",
//     },
//   ];

//   const cardData = cardConfig.map((c) => {
//     const cardPath = `${baseRoute}/${c.key}${queryString}`;

//     return {
//       ...c,
//       count: summaryData[c.key]?.count || 0,
//       percentage: summaryData[c.key]?.percentage
//         ? `(${summaryData[c.key].percentage}%)`
//         : "(0%)",
//       to: cardPath,
//     };
//   });

//   const noDataAvailable =
//     selectedCourseId && cardData.every((c) => Number(c.count) === 0);

//   return (
//     <div className="course-summary-wrapper">
//       <div className="cs-filter-box">
//         <div className="cs-filter-row">
//           <div className="cs-field">
//             <label>Select Course:</label>
//             <SelectControl
//               value={selectedCourse}
//               options={courseOptions}
//               onChange={(val) => onChange("selectedCourse", val)}
//               styles="cs-filter-select-input"
//               isClearable={true}
//             />
//           </div>

//           <div className="cs-or-text">
//             <span>|</span>
//             <span className="cs-or-text-span">OR</span>
//             <span>|</span>
//           </div>

//           <div className="cs-field-sqaud-number">
//             <label>Squad Number:</label>
//             <InputControl
//               placeholder=""
//               value={armyNumber}
//               onChange={(e) => onChange("armyNumber", e.target.value)}
//             />
//           </div>

//           <div className="cs-button">
//             <ButtonControl
//               text="Submit"
//               styles={"filterbuttonstyles"}
//               onClick={onSubmit}
//               wrapperStyles={"cs-button-wrapper"}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="cs-summary-section">
//         <h3 className="cs-title">Course Summary</h3>
//         <p className="cs-subtitle">Total number of {tradeFormatted}s:</p>

//         {noDataAvailable && (
//           <div className="cs-no-data-card">
//             <div className="cs-no-data-title">
//               No course summary data avilable till now
//             </div>

//             <Link
//               to={`${baseRoute}/allAgniveers${queryString}`}
//               className="cs-view-all-link"
//             >
//               View Agniveers <FaArrowRightLong />
//             </Link>
//           </div>
//         )}

//         {!noDataAvailable && (
//           <div className="cs-summary-cards">
//             {cardData.map((card) => (
//               <div
//                 key={card.key}
//                 className={`cs-card ${card.key}`}
//                 style={card.span ? { gridColumn: `span ${card.span}` } : {}}
//               >
//                 <div className="cs-card-details-wrapper">
//                   <div className="cs-card-title">
//                     {card.key === "improvement" ? (
//                       <>
//                         Number of {tradeFormatted}s <br />
//                         <strong>where improvement is required</strong>
//                       </>
//                     ) : (
//                       <>
//                         {tradeFormatted} in <br /> <strong>{card.title}</strong>
//                       </>
//                     )}
//                   </div>

//                   <Link to={card.to} className="cs-view-btn">
//                     View <FaArrowRightLong />
//                   </Link>
//                 </div>

//                 <div className={`cs-count ${card.countClass || ""}`}>
//                   {card.count}
//                   <div className="cs-count-percentage">{card.percentage}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CourseSummaryView;

// import React from "react";
// import "./courseStyles.scss";
// import SelectControl from "../../../controls/select/SelectControl";
// import InputControl from "../../../controls/input/InputControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { Link, useLocation } from "react-router-dom";

// const CourseSummaryView = ({
//   trade,
//   selectedCourse,
//   selectedCourseId,
//   armyNumber,
//   tradeId,
//   summaryData,
//   courseOptions,
//   onChange,
//   onSubmit,
//   dashboardSummaryData = {},
//   customStyles,
//   dashboardNavigation,
// }) => {

//   console.log("course options",courseOptions)
//   const location = useLocation();
//   const isDashboard = location.pathname === "/dashboard";

//   const tradeFormatted = trade.toLowerCase() === "ofc" ? "OFC" : trade;

//   const baseRoute = `${dashboardNavigation?"/dashboard":""}/${trade.toLowerCase()}/${trade.toLowerCase()}s`;

//  const params = new URLSearchParams(location.search);

//  console.log("search params ",params)

// if (selectedCourseId) params.set("course", selectedCourseId);
// if (armyNumber) params.set("armyNo", armyNumber);
// if (tradeId) params.set("tradeId", tradeId);

//   const search = params.toString();
//   const queryString = search ? `?${search}` : "";

//   const cardConfig = [
//     { key: "gradeA", title: "Grade A" },
//     { key: "gradeB", title: "Grade B" },
//     { key: "gradeC", title: "Grade C" },
//     {
//       key: "improvement",
//       title: "Improvement Required",
//       span: 3,
//       countClass: "red",
//     },
//   ];

//   const cardData = cardConfig.map((c) => {
//     const cardPath = `${baseRoute}/${c.key}${queryString}`;

//     return {
//       ...c,
//       count: summaryData[c.key]?.count || 0,
//       percentage: summaryData[c.key]?.percentage
//         ? `(${summaryData[c.key].percentage}%)`
//         : "(0%)",
//       to: cardPath,
//     };
//   });

//   const noDataAvailable =
//     selectedCourseId && cardData.every((c) => Number(c.count) === 0);

//   return (
//     <div className={`course-summary-wrapper ${customStyles}`}>

//       {isDashboard && (
//         <div className="dcs-summary-cards" style={{ marginBottom: "20px" }}>
//           <div className="dcs-card gradeA">
//             <div className="dcs-card-details-wrapper">
//               <div className="dcs-card-title">
//                 Total Gunner <br />
//                 <strong>Courses</strong>
//               </div>
//             </div>
//             <div className="dcs-count">
//               {dashboardSummaryData.totalCourses || 0}
//             </div>
//           </div>

//           <div className="dcs-card gradeB">
//             <div className="dcs-card-details-wrapper">
//               <div className="dcs-card-title">
//                 Gunners <br />
//                 <strong>Trained</strong>
//               </div>
//             </div>
//             <div className="ds-count">
//               {dashboardSummaryData.trained || 0}
//             </div>
//           </div>

//           <div className="dcs-card gradeC">
//             <div className="dcs-card-details-wrapper">
//               <div className="dcs-card-title">
//                 Gunners <br />
//                 <strong>Passed</strong>
//               </div>
//             </div>
//             <div className="dcs-count">
//               {dashboardSummaryData.passed || 0}
//             </div>
//           </div>

//           <div className="dcs-card improvement" >
//             <div className="dcs-card-details-wrapper">
//               <div className="dcs-card-title ">
//                 Gunners <br />
//                 <strong>Failed</strong>
//               </div>
//             </div>
//             <div className="dcs-count red">
//               {dashboardSummaryData.failed || 0}
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="cs-filter-box">
//         <div className="cs-filter-row">
//           <div className="cs-field">
//             <label>Select Course:</label>
//             <SelectControl
//               value={selectedCourse}
//               options={courseOptions}
//               onChange={(val) => onChange("selectedCourse", val)}
//               styles="cs-filter-select-input"
//               isClearable={true}
//             />
//           </div>

//           <div className="cs-or-text">
//             <span>|</span>
//             <span className="cs-or-text-span">OR</span>
//             <span>|</span>
//           </div>

//           <div className="cs-field-sqaud-number">
//             <label>Squad Number:</label>
//             <InputControl
//               placeholder=""
//               value={armyNumber}
//               onChange={(e) => onChange("armyNumber", e.target.value)}
//             />
//           </div>

//           <div className="cs-button">
//             <ButtonControl
//               text="Submit"
//               styles={"filterbuttonstyles"}
//               onClick={onSubmit}
//               wrapperStyles={"cs-button-wrapper"}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="cs-summary-section">
//         <h3 className="cs-title">Course Summary</h3>
//         <p className="cs-subtitle">Total number of {tradeFormatted}s:</p>

//         {noDataAvailable && (
//           <div className="cs-no-data-card">
//             <div className="cs-no-data-title">
//               No course summary data avilable till now
//             </div>

//             <Link
//               to={`${baseRoute}/all${queryString}`}
//               className="cs-view-all-link"
//             >
//               View Agniveers <FaArrowRightLong />
//             </Link>
//           </div>
//         )}

//         {!noDataAvailable && (
//           <div className="cs-summary-cards">
//             {cardData.map((card) => (
//               <div
//                 key={card.key}
//                 className={`cs-card ${card.key}`}
//                 style={card.span ? { gridColumn: `span ${card.span}` } : {}}
//               >
//                 <div className="cs-card-details-wrapper">
//                   <div className="cs-card-title">
//                     {card.key === "improvement" ? (
//                       <>
//                         Number of {tradeFormatted}s <br />
//                         <strong>where improvement is required</strong>
//                       </>
//                     ) : (
//                       <>
//                         {tradeFormatted} in <br /> <strong>{card.title}</strong>
//                       </>
//                     )}
//                   </div>

//                   <Link to={card.to} className="cs-view-btn">
//                     View <FaArrowRightLong />
//                   </Link>
//                 </div>

//                 <div className={`cs-count ${card.countClass || ""}`}>
//                   {card.count}
//                   <div className="cs-count-percentage">{card.percentage}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CourseSummaryView;

// import React from "react";
// import "./courseStyles.scss";
// import SelectControl from "../../../controls/select/SelectControl";
// import InputControl from "../../../controls/input/InputControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { Link, useLocation } from "react-router-dom";

// const CourseSummaryView = ({
//   trade,
//   selectedCourse,
//   selectedCourseId,
//   armyNumber,
//   tradeId,
//   summaryData,
//   courseOptions,
//   onChange,
//   onSubmit,
//   dashboardSummaryData = {},
//   customStyles,
//   dashboardNavigation,
// }) => {
//   const location = useLocation();
//   const isDashboard = location.pathname === "/dashboard";
//   const tradeFormatted = trade?.toLowerCase() === "ofc" ? "OFC" : trade || "";
//   const baseRoute = `${dashboardNavigation ? "/dashboard" : ""}/${tradeFormatted.toLowerCase()}/${tradeFormatted.toLowerCase()}s`;
//   const params = new URLSearchParams(location.search);

//   if (selectedCourseId) params.set("course", selectedCourseId);
//   if (armyNumber) params.set("armyNo", armyNumber);
//   if (tradeId) params.set("tradeId", tradeId);

//   const search = params.toString();
//   const queryString = search ? `?${search}` : "";

//   const cardConfig = [
//     { key: "gradeA", title: "Grade A" },
//     { key: "gradeB", title: "Grade B" },
//     { key: "gradeC", title: "Grade C" },
//     { key: "improvement", title: "Improvement Required", span: 3, countClass: "red" },
//   ];

//   const cardData = cardConfig.map((c) => {
//     const cardPath = `${baseRoute}/${c.key}${queryString}`;
//     return {
//       ...c,
//       count: summaryData[c.key]?.count || 0,
//       percentage: summaryData[c.key]?.percentage ? `(${summaryData[c.key].percentage}%)` : "(0%)",
//       to: cardPath,
//     };
//   });

//   const noDataAvailable = selectedCourseId && cardData.every((c) => Number(c.count) === 0);

//   return (
//     <div className={`course-summary-wrapper ${customStyles || ""}`}>
//       {isDashboard && (
//         <div className="dcs-summary-cards" style={{ marginBottom: "20px" }}>
//           <div className="dcs-card gradeA">
//             <div className="dcs-card-details-wrapper">
//               <div className="dcs-card-title">
//                 Total {tradeFormatted}s <br />
//                 <strong>Courses</strong>
//               </div>
//             </div>
//             <div className="dcs-count">{dashboardSummaryData.totalCourses || 0}</div>
//           </div>
//           <div className="dcs-card gradeB">
//             <div className="dcs-card-details-wrapper">
//               <div className="dcs-card-title">
//                 {tradeFormatted}s <br />
//                 <strong>Trained</strong>
//               </div>
//             </div>
//             <div className="ds-count">{dashboardSummaryData.trained || 0}</div>
//           </div>
//           <div className="dcs-card gradeC">
//             <div className="dcs-card-details-wrapper">
//               <div className="dcs-card-title">
//                 {tradeFormatted}s <br />
//                 <strong>Passed</strong>
//               </div>
//             </div>
//             <div className="dcs-count">{dashboardSummaryData.passed || 0}</div>
//           </div>
//           <div className="dcs-card improvement">
//             <div className="dcs-card-details-wrapper">
//               <div className="dcs-card-title ">
//                 {tradeFormatted}s <br />
//                 <strong>Failed</strong>
//               </div>
//             </div>
//             <div className="dcs-count red">{dashboardSummaryData.failed || 0}</div>
//           </div>
//         </div>
//       )}

//       <div className="cs-filter-box">
//         <div className="cs-filter-row">
//           <div className="cs-field">
//             <label>Select Course:</label>
//             <SelectControl
//               value={selectedCourse}
//               options={courseOptions}
//               onChange={(val) => onChange("selectedCourse", val)}
//               styles="cs-filter-select-input"
//               isClearable={true}
//             />
//           </div>

//           <div className="cs-or-text">
//             <span>|</span>
//             <span className="cs-or-text-span">OR</span>
//             <span>|</span>
//           </div>

//           <div className="cs-field-sqaud-number">
//             <label>Squad Number:</label>
//             <InputControl placeholder="" value={armyNumber} onChange={(e) => onChange("armyNumber", e.target.value)} />
//           </div>

//           <div className="cs-button">
//             <ButtonControl text="Submit" styles={"filterbuttonstyles"} onClick={onSubmit} wrapperStyles={"cs-button-wrapper"} />
//           </div>
//         </div>
//       </div>

//       <div className="cs-summary-section">
//         <h3 className="cs-title">Course Summary</h3>
//         <p className="cs-subtitle">Total number of {tradeFormatted}s: {"207"}</p>

//         {noDataAvailable && (
//           <div className="cs-no-data-card">
//             <div className="cs-no-data-title">No course summary data avilable till now</div>
//             <Link to={`${baseRoute}/all${queryString}`} className="cs-view-all-link">
//               View Agniveers <FaArrowRightLong />
//             </Link>
//           </div>
//         )}

//         {!noDataAvailable && (
//           <div className="cs-summary-cards">
//             {cardData.map((card) => (
//               <div key={card.key} className={`cs-card ${card.key}`} style={card.span ? { gridColumn: `span ${card.span}` } : {}}>
//                 <div className="cs-card-details-wrapper">
//                   <div className="cs-card-title">
//                     {card.key === "improvement" ? (
//                       <>
//                         Number of {tradeFormatted}s <br />
//                         <strong>where improvement is required</strong>
//                       </>
//                     ) : (
//                       <>
//                         {tradeFormatted} in <br /> <strong>{card.title}</strong>
//                       </>
//                     )}
//                   </div>
//                   <Link to={card.to} className="cs-view-btn">
//                     View <FaArrowRightLong />
//                   </Link>
//                 </div>
//                 <div className={`cs-count ${card.countClass || ""}`}>
//                   {card.count}
//                   <div className="cs-count-percentage">{card.percentage}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CourseSummaryView;

// import React from "react";
// import "./courseStyles.scss";
// import SelectControl from "../../../controls/select/SelectControl";
// import InputControl from "../../../controls/input/InputControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { Link, useLocation, useHistory } from "react-router-dom";

// const CourseSummaryView = ({
//   trade,
//   selectedCourse,
//   selectedCourseId,
//   armyNumber,
//   tradeId,
//   summaryData,
//   courseOptions,
//   onChange,
//   onSubmit,
//   dashboardSummaryData = {},
//   customStyles,
//   dashboardNavigation,
// }) => {
//   const location = useLocation();
//   const history = useHistory();

//   console.log("summaryData",summaryData)

//   const handleSubmit = () => {
//     if (armyNumber && tradeId) {
//       const tradeFormatted = trade?.toLowerCase() === "ofc" ? "OFC" : trade || "";
//       const baseRoute = `${dashboardNavigation ? "/dashboard" : ""}/${tradeFormatted.toLowerCase()}/${tradeFormatted.toLowerCase()}s`;
//       const target = `${baseRoute}/all?armyNo=${armyNumber}&tradeId=${tradeId}`;
//       history.push(target);
//       return;
//     }
//     onSubmit();
//   };

//   const isDashboard = location.pathname === "/dashboard";
//   const tradeFormatted = trade?.toLowerCase() === "ofc" ? "OFC" : trade || "";
//   const baseRoute = `${dashboardNavigation ? "/dashboard" : ""}/${tradeFormatted.toLowerCase()}/${tradeFormatted.toLowerCase()}s`;
//   const params = new URLSearchParams(location.search);

//   if (selectedCourseId) params.set("course", selectedCourseId);
//   if (armyNumber) params.set("armyNo", armyNumber);
//   if (tradeId) params.set("tradeId", tradeId);

//   const search = params.toString();
//   const queryString = search ? `?${search}` : "";

//   const cardConfig = [
//     { key: "gradeA", title: "Grade A" },
//     { key: "gradeB", title: "Grade B" },
//     { key: "gradeC", title: "Grade C" },
//     { key: "improvement", title: "Improvement Required", span: 3, countClass: "red" },
//   ];

//   const cardData = cardConfig.map((c) => {
//     const cardPath = `${baseRoute}/${c.key}${queryString}`;
//     return {
//       ...c,
//       count: summaryData[c.key]?.count || 0,
//       percentage: summaryData[c.key]?.percentage ? `(${summaryData[c.key].percentage}%)` : "(0%)",
//       to: cardPath,
//     };
//   });

//   const noDataAvailable = selectedCourseId && cardData.every((c) => Number(c.count) === 0);

//   return (
//     <div className={`course-summary-wrapper ${customStyles || ""}`}>
//       {isDashboard && (
//         <div className="dcs-summary-cards" style={{ marginBottom: "20px" }}>
//           <div className="dcs-card gradeA">
//             <div className="dcs-card-details-wrapper">
//               <div className="dcs-card-title">
//                 Total {tradeFormatted}s <br />
//                 <strong>Courses</strong>
//               </div>
//             </div>
//             <div className="dcs-count">{dashboardSummaryData.totalCourses || 0}</div>
//           </div>
//           <div className="dcs-card gradeB">
//             <div className="dcs-card-details-wrapper">
//               <div className="dcs-card-title">
//                 {tradeFormatted}s <br />
//                 <strong>Trained</strong>
//               </div>
//             </div>
//             <div className="ds-count">{dashboardSummaryData.trained || 0}</div>
//           </div>
//           <div className="dcs-card gradeC">
//             <div className="dcs-card-details-wrapper">
//               <div className="dcs-card-title">
//                 {tradeFormatted}s <br />
//                 <strong>Passed</strong>
//               </div>
//             </div>
//             <div className="dcs-count">{dashboardSummaryData.passed || 0}</div>
//           </div>
//           <div className="dcs-card improvement">
//             <div className="dcs-card-details-wrapper">
//               <div className="dcs-card-title ">
//                 {tradeFormatted}s <br />
//                 <strong>Failed</strong>
//               </div>
//             </div>
//             <div className="dcs-count red">{dashboardSummaryData.failed || 0}</div>
//           </div>
//         </div>
//       )}

//       <div className="cs-filter-box">
//         <div className="cs-filter-row">
//           <div className="cs-field">
//             <label>Select Course:</label>
//             <SelectControl
//               value={selectedCourse}
//               options={courseOptions}
//               onChange={(val) => onChange("selectedCourse", val)}
//               styles="cs-filter-select-input"
//               isClearable={true}
//             />
//           </div>

//           <div className="cs-or-text">
//             <span>|</span>
//             <span className="cs-or-text-span">OR</span>
//             <span>|</span>
//           </div>

//           <div className="cs-field-sqaud-number">
//             <label>Squad Number:</label>
//             <InputControl placeholder="" value={armyNumber} onChange={(e) => onChange("armyNumber", e.target.value)} />
//           </div>

//           <div className="cs-button">
//             <ButtonControl text="Submit" styles={"filterbuttonstyles"} onClick={handleSubmit} wrapperStyles={"cs-button-wrapper"} />
//           </div>
//         </div>
//       </div>

//       <div className="cs-summary-section">
//         <h3 className="cs-title">Course Summary</h3>
//         <p className="cs-subtitle">Total number of {tradeFormatted}s: {summaryData?.totalCount}</p>

//         {noDataAvailable &&  (
//           <div className="cs-no-data-card">
//             <div className="cs-no-data-title">No course summary data avilable till now</div>
//             <Link to={`${baseRoute}/all${queryString}`} className="cs-view-all-link">
//               View Agniveers <FaArrowRightLong />
//             </Link>
//           </div>
//         )}

//         {!noDataAvailable && (
//           <div className="cs-summary-cards">
//             {cardData.map((card) => (
//               <div key={card.key} className={`cs-card ${card.key}`} style={card.span ? { gridColumn: `span ${card.span}` } : {}}>
//                 <div className="cs-card-details-wrapper">
//                   <div className="cs-card-title">
//                     {card.key === "improvement" ? (
//                       <>
//                         Number of {tradeFormatted}s <br />
//                         <strong>where improvement is required</strong>
//                       </>
//                     ) : (
//                       <>
//                         {tradeFormatted} in <br /> <strong>{card.title}</strong>
//                       </>
//                     )}
//                   </div>
//                   <Link to={card.to} className="cs-view-btn">
//                     View <FaArrowRightLong />
//                   </Link>
//                 </div>
//                 <div className={`cs-count ${card.countClass || ""}`}>
//                   {card.count}
//                   <div className="cs-count-percentage">{card.percentage}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CourseSummaryView;

// import React from "react";
// import "./courseStyles.scss";
// import SelectControl from "../../../controls/select/SelectControl";
// import InputControl from "../../../controls/input/InputControl";
// import ButtonControl from "../../../controls/button/ButtonControl";
// import { FaArrowRightLong } from "react-icons/fa6";
// import { Link, useLocation, useHistory } from "react-router-dom";

// const CourseSummaryView = ({
//   trade,
//   selectedCourse,
//   selectedCourseId,
//   armyNumber,
//   tradeId,
//   summaryData,
//   courseOptions,
//   onChange,
//   onSubmit,
//   dashboardSummaryData = {},
//   customStyles,
//   dashboardNavigation,
// }) => {
//   const location = useLocation();
//   const history = useHistory();

//   console.log("summaryData", summaryData);

//   const handleSubmit = () => {
//     if (armyNumber && tradeId) {
//       const tradeFormatted =
//         trade?.toLowerCase() === "ofc" ? "OFC" : trade || "";
//       const baseRoute = `${
//         dashboardNavigation ? "/dashboard" : ""
//       }/${tradeFormatted.toLowerCase()}/${tradeFormatted.toLowerCase()}s`;
//       const target = `${baseRoute}/all?armyNo=${armyNumber}&tradeId=${tradeId}`;
//       history.push(target);
//       return;
//     }
//     onSubmit();
//   };

//   const isDashboard = location.pathname === "/dashboard";
//   const tradeFormatted =
//     trade?.toLowerCase() === "ofc" ? "OFC" : trade || "";
//   const baseRoute = `${
//     dashboardNavigation ? "/dashboard" : ""
//   }/${tradeFormatted.toLowerCase()}/${tradeFormatted.toLowerCase()}s`;
//   const params = new URLSearchParams(location.search);

//   if (selectedCourseId) params.set("course", selectedCourseId);
//   if (armyNumber) params.set("armyNo", armyNumber);
//   if (tradeId) params.set("tradeId", tradeId);

//   const search = params.toString();
//   const queryString = search ? `?${search}` : "";

//   const cardConfig = [
//     { key: "gradeA", title: "Grade A" },
//     { key: "gradeB", title: "Grade B" },
//     { key: "gradeC", title: "Grade C" },
//     {
//       key: "improvement",
//       title: "Improvement Required",
//       span: 3,
//       countClass: "red",
//     },
//   ];

//   const cardData = cardConfig.map((c) => {
//     const cardPath = `${baseRoute}/${c.key}${queryString}`;
//     return {
//       ...c,
//       count: summaryData?.[c.key]?.count || 0,
//       percentage: summaryData?.[c.key]?.percentage
//         ? `(${summaryData[c.key].percentage}%)`
//         : "(0%)",
//       to: cardPath,
//     };
//   });

//   // -----------------------------
//   // UPDATED: "No Data Available" condition
//   // -----------------------------
//   const noDataAvailable =
//     !summaryData || // summaryData is null/undefined
//     cardData.every((c) => Number(c.count) === 0); // all grades = zero

//   return (
//     <div className={`course-summary-wrapper ${customStyles || ""}`}>
//       {isDashboard && (
//         <div className="dcs-summary-cards" style={{ marginBottom: "20px" }}>
//           <div className="dcs-card gradeA">
//             <div className="dcs-card-details-wrapper">
//               <div className="dcs-card-title">
//                 Total {tradeFormatted}s <br />
//                 <strong>Courses</strong>
//               </div>
//             </div>
//             <div className="dcs-count">{dashboardSummaryData.totalCourses || 0}</div>
//           </div>
//           <div className="dcs-card gradeB">
//             <div className="dcs-card-details-wrapper">
//               <div className="dcs-card-title">
//                 {tradeFormatted}s <br />
//                 <strong>Trained</strong>
//               </div>
//             </div>
//             <div className="ds-count">{dashboardSummaryData.trained || 0}</div>
//           </div>
//           <div className="dcs-card gradeC">
//             <div className="dcs-card-details-wrapper">
//               <div className="dcs-card-title">
//                 {tradeFormatted}s <br />
//                 <strong>Passed</strong>
//               </div>
//             </div>
//             <div className="dcs-count">{dashboardSummaryData.passed || 0}</div>
//           </div>
//           <div className="dcs-card improvement">
//             <div className="dcs-card-details-wrapper">
//               <div className="dcs-card-title">
//                 {tradeFormatted}s <br />
//                 <strong>Failed</strong>
//               </div>
//             </div>
//             <div className="dcs-count red">{dashboardSummaryData.failed || 0}</div>
//           </div>
//         </div>
//       )}

//       <div className="cs-filter-box">
//         <div className="cs-filter-row">
//           <div className="cs-field">
//             <label>Select Course:</label>
//             <SelectControl
//               value={selectedCourse}
//               options={courseOptions}
//               onChange={(val) => onChange("selectedCourse", val)}
//               styles="cs-filter-select-input"
//               isClearable={true}
//             />
//           </div>

//           <div className="cs-or-text">
//             <span>|</span>
//             <span className="cs-or-text-span">OR</span>
//             <span>|</span>
//           </div>

//           <div className="cs-field-sqaud-number">
//             <label>Squad Number:</label>
//             <InputControl
//               placeholder=""
//               value={armyNumber}
//               onChange={(e) => onChange("armyNumber", e.target.value)}
//             />
//           </div>

//           <div className="cs-button">
//             <ButtonControl
//               text="Submit"
//               styles={"filterbuttonstyles"}
//               onClick={handleSubmit}
//               wrapperStyles={"cs-button-wrapper"}
//             />
//           </div>
//         </div>
//       </div>

//       <div className="cs-summary-section">
//         <h3 className="cs-title">Course Summary</h3>
//         <p className="cs-subtitle">
//           Total number of {tradeFormatted}s: {summaryData?.totalCount || 0}
//         </p>

//         {noDataAvailable && (
//           <div className="cs-no-data-card">
//             <div className="cs-no-data-title">
//               No course summary data available till now
//             </div>
//             <Link
//               to={`${baseRoute}/all${queryString}`}
//               className="cs-view-all-link"
//             >
//               View Agniveers <FaArrowRightLong />
//             </Link>
//           </div>
//         )}

//         {!noDataAvailable && (
//           <div className="cs-summary-cards">
//             {cardData.map((card) => (
//               <div
//                 key={card.key}
//                 className={`cs-card ${card.key}`}
//                 style={card.span ? { gridColumn: `span ${card.span}` } : {}}
//               >
//                 <div className="cs-card-details-wrapper">
//                   <div className="cs-card-title">
//                     {card.key === "improvement" ? (
//                       <>
//                         Number of {tradeFormatted}s <br />
//                         <strong>where improvement is required</strong>
//                       </>
//                     ) : (
//                       <>
//                         {tradeFormatted} in <br /> <strong>{card.title}</strong>
//                       </>
//                     )}
//                   </div>
//                   <Link to={card.to} className="cs-view-btn">
//                     View <FaArrowRightLong />
//                   </Link>
//                 </div>
//                 <div className={`cs-count ${card.countClass || ""}`}>
//                   {card.count}
//                   <div className="cs-count-percentage">{card.percentage}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CourseSummaryView;

import React from "react";
import "./courseStyles.scss";
import SelectControl from "../../../controls/select/SelectControl";
import InputControl from "../../../controls/input/InputControl";
import ButtonControl from "../../../controls/button/ButtonControl";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useLocation, useHistory } from "react-router-dom";

const CourseSummaryView = ({
  trade,
  selectedCourse,
  selectedCourseId,
  armyNumber,
  unit, // NEW
  tradeId,
  summaryData,
  courseOptions,
  onChange,
  onSubmit,
  dashboardSummaryData = {},
  customStyles,
  dashboardNavigation,
}) => {
  const location = useLocation();
  const history = useHistory();

  const handleSubmit = () => {
    if ((armyNumber || unit) && tradeId) {
      const tradeFormatted =
        trade?.toLowerCase() === "ofc" ? "OFC" : trade || "";
      const baseRoute = `${dashboardNavigation ? "/dashboard" : ""}/${tradeFormatted.toLowerCase()}/${tradeFormatted.toLowerCase()}s`;

      const searchParams = new URLSearchParams();
      if (armyNumber) searchParams.set("armyNo", armyNumber);
      if (unit) searchParams.set("unit", unit);
      if (tradeId) searchParams.set("tradeId", tradeId);

      const target = `${baseRoute}/all?${searchParams.toString()}`;
      history.push(target);
      return;
    }
    onSubmit();
  };

  const isDashboard = location.pathname === "/dashboard";
  const tradeFormatted = trade?.toLowerCase() === "ofc" ? "OFC" : trade || "";
  const baseRoute = `${dashboardNavigation ? "/dashboard" : ""}/${tradeFormatted.toLowerCase()}/${tradeFormatted.toLowerCase()}s`;

  const params = new URLSearchParams(location.search);
  if (selectedCourseId) params.set("course", selectedCourseId);
  if (armyNumber) params.set("armyNo", armyNumber);
  if (unit) params.set("unit", unit); // NEW
  if (tradeId) params.set("tradeId", tradeId);
  const queryString = params.toString() ? `?${params.toString()}` : "";

  const cardConfig = [
    { key: "gradeA", title: "Grade A" },
    { key: "gradeB", title: "Grade B" },
    { key: "gradeC", title: "Grade C" },
    { key: "gradeE", title: "Grade E" },
    {
      key: "improvement",
      title: "Improvement Required",
      span: 2,
      countClass: "red",
    },
  ];

  const cardData = cardConfig.map((c) => {
    const cardPath = `${baseRoute}/${c.key}${queryString}`;
    return {
      ...c,
      count: summaryData?.[c.key]?.count || 0,
      percentage: summaryData?.[c.key]?.percentage
        ? `(${summaryData[c.key].percentage}%)`
        : "(0%)",
      to: cardPath,
    };
  });

  const hasGradeWiseData = cardData.some((card) => Number(card.count) > 0);
  const hasTotalCount = Number(summaryData?.totalCount) > 0;
  const showGradeCards = hasGradeWiseData;
  const showViewAllOnly = !hasGradeWiseData && hasTotalCount;
  const noDataAtAll = !summaryData || (!hasGradeWiseData && !hasTotalCount);

  return (
    <div className={`course-summary-wrapper ${customStyles || ""}`}>
      {/* Dashboard Cards */}
      {isDashboard && (
        <div className="dcs-summary-cards" style={{ marginBottom: "20px" }}>
          <div className="dcs-card gradeA">
            <div className="dcs-card-details-wrapper">
              <div className="dcs-card-title">
                Total {tradeFormatted}s <br />
                <strong>Courses</strong>
              </div>
            </div>
            <div className="dcs-count">
              {dashboardSummaryData.totalCourses || 0}
            </div>
          </div>
          <div className="dcs-card gradeB">
            <div className="dcs-card-details-wrapper">
              <div className="dcs-card-title">
                {tradeFormatted}s <br />
                <strong>Trained</strong>
              </div>
            </div>
            <div className="ds-count">{dashboardSummaryData.trained || 0}</div>
          </div>
          <div className="dcs-card gradeC">
            <div className="dcs-card-details-wrapper">
              <div className="dcs-card-title">
                {tradeFormatted}s <br />
                <strong>Passed</strong>
              </div>
            </div>
            <div className="dcs-count">{dashboardSummaryData.passed || 0}</div>
          </div>
          <div className="dcs-card improvement">
            <div className="dcs-card-details-wrapper">
              <div className="dcs-card-title">
                {tradeFormatted}s <br />
                <strong>Failed</strong>
              </div>
            </div>
            <div className="dcs-count red">
              {dashboardSummaryData.failed || 0}
            </div>
          </div>
        </div>
      )}

      <div className="cs-filter-box">
        <div className="cs-filter-row">
          <div className="cs-field">
            <label>Select Course:</label>
            <SelectControl
              value={selectedCourse} // This is now always the correct full object
              options={courseOptions}
              onChange={(selectedOption) =>
                onChange("selectedCourse", selectedOption)
              }
              styles="cs-filter-select-input"
              isClearable={true}
              placeholder="Select a course..."
            />
          </div>
          <div className="cs-or-text">
            <span>|</span>
            <span className="cs-or-text-span">OR</span>
            <span>|</span>
          </div>
          <div className="cs-field-sqaud-number">
            <label>Army Number:</label>
            <InputControl
              placeholder="Enter army number"
              value={armyNumber || ""}
              onChange={(e) => onChange("armyNumber", e.target.value)}
            />
          </div>
          {/* <div className="cs-field-sqaud-number">
            <label>Unit:</label>
            <InputControl
              placeholder="Enter unit"
              value={unit || ""}
              onChange={(e) => onChange("unit", e.target.value)}
            />
          </div> */}
          <div className="cs-button">
            <ButtonControl
              text="Submit"
              styles={"filterbuttonstyles"}
              onClick={handleSubmit}
              wrapperStyles={"cs-button-wrapper"}
            />
          </div>
        </div>
      </div>

      {/* Rest of your UI unchanged */}
      <div className="cs-summary-section">
        <h3 className="cs-title">Course Summary</h3>
        <p className="cs-subtitle">
          Total number of {tradeFormatted}s: {summaryData?.totalCount || 0}
        </p>

        {showGradeCards && (
          <div className="cs-summary-cards">
            {cardData.map((card) => (
              <div
                key={card.key}
                className={`cs-card ${card.key}`}
                style={card.span ? { gridColumn: `span ${card.span}` } : {}}
              >
                <div className="cs-card-details-wrapper">
                  <div className="cs-card-title">
                    {card.key === "improvement" ? (
                      <>
                        Number of {tradeFormatted}s <br />
                        <strong>where improvement is required</strong>
                      </>
                    ) : (
                      <>
                        {tradeFormatted} in <br /> <strong>{card.title}</strong>
                      </>
                    )}
                  </div>
                  <Link to={card.to} className="cs-view-btn">
                    View <FaArrowRightLong />
                  </Link>
                </div>
                <div className={`cs-count ${card.countClass || ""}`}>
                  {card.count}
                  <div className="cs-count-percentage">{card.percentage}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showViewAllOnly && (
          <div className="cs-no-data-card">
            <div className="cs-no-data-title">
              No course summary data available till now
            </div>
            <Link
              to={`${baseRoute}/all${queryString}`}
              className="cs-view-all-link"
            >
              View All Agniveers{" "}
              <span>
                <FaArrowRightLong />
              </span>
            </Link>
          </div>
        )}

        {noDataAtAll && (
          <div className="cs-no-data-card">
            <div className="cs-no-data-title">
              No course summary data available till now
            </div>
            <Link
              to={`${baseRoute}/all${queryString}`}
              className="cs-view-all-link"
            >
              View Agniveers <FaArrowRightLong />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseSummaryView;
