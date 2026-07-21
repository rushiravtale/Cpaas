// import React from "react";
// import {
//   GaugeContainer,
//   GaugeReferenceArc,
//   GaugeValueArc,
//   useGaugeState,
//   gaugeClasses,
// } from "@mui/x-charts/Gauge";
// import "./customGauge.scss";

// function GaugePointer({ pointerWidth, pointerColor }) {
//   const { valueAngle, outerRadius, cx, cy } = useGaugeState();

//   if (valueAngle === null) return null;

//   const needleLength = outerRadius * 0.88;

//   const target = {
//     x: cx + needleLength * Math.sin(valueAngle),
//     y: cy - needleLength * Math.cos(valueAngle),
//   };

//   return (
//     <g>
//       <circle cx={cx} cy={cy + 10} r={2} fill={pointerColor} />
//       <line
//         x1={cx}
//         y1={cy + 10}
//         x2={target.x}
//         y2={target.y}
//         stroke={pointerColor}
//         strokeWidth={pointerWidth}
//         strokeLinecap="round"
//       />
//     </g>
//   );
// }

// const CustomGauge = ({ value = 0 ,fillColor,outerCradius, pointerWidth = 5,pointerColor = "#000"}) => {
//   const clamped = Math.max(0, Math.min(100, Number(value || 0)));

//   return (
//     <div className="custom-gauge-wrapper">
//       <GaugeContainer
//         className="tst"
//         width={120}
//         height={110} // Increased height for labels
//         startAngle={-110}
//         endAngle={110}
//         value={clamped}
//         valueMax={100}
//         cornerRadius="50%"
//         outerRadius={` ${outerCradius?outerCradius:"90%"}`}
//         sx={{
//           [`& .${gaugeClasses.valueArc}`]: {
//             fill: `${fillColor?fillColor:"#715306"}`,
//           },
//           [`& .${gaugeClasses.referenceArc}`]: {
//             fill: "#D9D9D9",
//           },
//         }}
//       >
//         <GaugeReferenceArc className="test" />
//         <GaugeValueArc />
// <GaugePointer pointerWidth={pointerWidth} pointerColor={pointerColor} />

//       </GaugeContainer>

//       <div className="gauge-center-value">
//         <div className="gauge-value-text">{clamped}%</div>
//       </div>

//       <div className="gauge-labels">
//         <span className="label-low">Low</span>
//         <span className="label-average">Average</span>
//         <span className="label-excellent">Excellent</span>
//       </div>
//     </div>
//   );
// };

// export default CustomGauge;

import React from "react";
import {
  GaugeContainer,
  GaugeReferenceArc,
  GaugeValueArc,
  useGaugeState,
  gaugeClasses,
} from "@mui/x-charts/Gauge";
import "./customGauge.scss";

function GaugePointer({ pointerWidth, pointerColor }) {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) return null;

  const needleLength = outerRadius * 0.9;

  const target = {
    x: cx + needleLength * Math.sin(valueAngle),
    y: cy - needleLength * Math.cos(valueAngle),
  };

  return (
    <g>
      <circle cx={cx} cy={cy + 10} r={2} fill={pointerColor} />
      <line
        x1={cx}
        y1={cy + 10}
        x2={target.x}
        y2={target.y}
        stroke={pointerColor}
        strokeWidth={pointerWidth}
        strokeLinecap="round"
      />
    </g>
  );
}

const CustomGauge = ({
  value = 0,
  fillColor,
  outerCradius,
  pointerWidth = 5,
  pointerColor = "#000",
  labels,
}) => {
  const clamped = Math.max(0, Math.min(100, Number(value || 0)));

  return (
    <div className="custom-gauge-wrapper">
      <GaugeContainer
        className="tst"
        width={120}
        height={110}
        startAngle={-110}
        endAngle={110}
        value={clamped}
        cornerRadius={10}
        valueMax={100}
        outerRadius={` ${outerCradius ? outerCradius : "90%"}`}
        sx={{
          [`& .${gaugeClasses.valueArc}`]: {
            fill: `${fillColor ? fillColor : "#715306"}`,
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: "#D9D9D9",
          },
        }}
      >
        <GaugeReferenceArc />
        <GaugeValueArc />
        <GaugePointer pointerWidth={pointerWidth} pointerColor={pointerColor} />
      </GaugeContainer>

      <div className="gauge-center-value">
        <div className="gauge-value-text">{clamped}%</div>
      </div>

      {/* Correctly aligned bottom labels */}
      <div className="gauge-labels">
        {labels && labels.length > 0 ? (
          labels.map((label, idx) => (
            <span
              key={idx}
              style={{
                fontSize: labels.length > 3 ? "9px" : "11px",
                textAlign: "center",
                width: "100%",
              }}
            >
              {label}
            </span>
          ))
        ) : (
          <>
            <span className="label-left">Fail</span>
            <span className="label-center">Average</span>
            <span className="label-right">Above Avg</span>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomGauge;
