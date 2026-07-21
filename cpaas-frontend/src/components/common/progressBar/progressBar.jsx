// import React from "react";
// import ProgressBar from "react-bootstrap/ProgressBar";
// import "./progressBarStyles.scss";

// const ProgressBarComponent = ({ value, label, gradient, grade,showGradeAndValue }) => {
//   let obtained = 0;
//   let total = 1;

//   if (typeof value === "string" && value.includes("/")) {
//     const parts = value.split("/").map((v) => parseFloat(v.trim()));
//     obtained = parts[0] || 0;
//     total = parts[1] || 1;
//   } else {
//     obtained = Number(value);
//     total = Number(total) || 1;
//   }

//   const percentage = Math.round((obtained / total) * 100);

//   return (
//     <div className="custom-progressbar-container">
//       <ProgressBar animated className="custom-progressbar">
//         <div
//           className="progress-bar"
//           style={{
//             width: `${percentage}%`,
//             background: gradient,
//             height: "100%",
//           }}
//         />
//       </ProgressBar>
//       <div className="progressbar-header">
//         <span className="progress-label">{label}</span>
//         {grade ? (
//           <>
//             <span className="progress-value">{grade}</span>
//           </>
//         ) : (
//           <>
//             <span className="progress-value">
//               {obtained}/{total}
//             </span>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProgressBarComponent;



import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./progressBarStyles.scss";

const ProgressBarComponent = ({
  value,
  label,
  gradient,
  grade,
  showGradeAndValue,
}) => {
  let obtained = 0;
  let total = 1;

  if (typeof value === "string" && value.includes("/")) {
    const parts = value.split("/").map((v) => parseFloat(v.trim()));
    obtained = parts[0] || 0;
    total = parts[1] || 1;
  } else {
    obtained = Number(value);
    total = Number(total) || 1;
  }

  const percentage = Math.round((obtained / total) * 100);

  return (
    <div className="custom-progressbar-container">
      <ProgressBar animated className="custom-progressbar">
        <div
          className="progress-bar"
          style={{
            width: `${percentage}%`,
            background: gradient,
            height: "100%",
          }}
        />
      </ProgressBar>

      <div className="progressbar-header">
        <span className="progress-label">{label}</span>

        <span className="progress-value">
        {showGradeAndValue && grade
  ? `${obtained}/${total} (${grade.charAt(0).toUpperCase() + grade.slice(1)})`
  : grade
  ? grade
  : `${obtained}/${total}`}

        </span>
      </div>
    </div>
  );
};

export default ProgressBarComponent;
