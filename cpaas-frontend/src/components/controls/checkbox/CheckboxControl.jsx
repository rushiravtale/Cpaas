// import React from "react";
// import "./CheckboxControl.scss";
// import CheckMark from "/assets/svg/checkmark.svg";

// export default function CheckboxControl({
//   label,
//   options = [],
//   value,
//   onChange,
//   isDisabled = false,      // existing prop
//   disableAll = false,      // NEW prop
//   error
// }) {
//   const handleSelect = (option) => {
//     if (!isDisabled && !disableAll) {
//       onChange(option.value);
//     }
//   };


//   return (
//     <div className="checkbox-control-wrapper">
//       {label && <label className="checkbox-label">{label}</label>}

//       <div className={`checkbox-options ${disableAll ? "disabled-group" : ""}`}>
//         {options.map((option) => {
//           const isSelected = value === option.value;

//           return (
//             <div
//               key={option.value}
//               className={`
//                 checkbox-item 
//                 ${isSelected ? "selected" : ""} 
//                 ${(isDisabled || disableAll) ? "disabled" : ""}
//               `}
//               onClick={() => handleSelect(option)}
//             >
//               <div className="checkbox-box">
//                 {isSelected && (
//                   <div className="checkbox-tick">
//                     <img
//                       src={CheckMark}
//                       alt="checkMark"
//                       className="checkmark-icon"
//                     />
//                   </div>
//                 )}
//               </div>

//               <span className="checkbox-text">{option.label}</span>
//             </div>
//           );
//         })}
//       </div>

//       {error && <div className="checkbox-error">{error}</div>}
//     </div>
//   );
// }


import React from "react";
import "./CheckboxControl.scss";
import CheckMark from "/assets/svg/checkmark.svg";

export default function CheckboxControl({
  label,
  options = [],
  value, // expected: string like "excellent" or null/undefined
  onChange,
  isDisabled = false,
  disableAll = false,
  error,
}) {
  const handleSelect = (optionValue) => {
    if (isDisabled || disableAll) return;

    // Toggle behavior: if already selected, deselect (optional), else select
    const newValue = value === optionValue ? null : optionValue;
    onChange(newValue);
  };

  const normalizedValue = value || null; // ensure consistent comparison

  return (
    <div className="checkbox-control-wrapper">
      {label && <label className="checkbox-label">{label}</label>}
      <div className={`checkbox-options ${disableAll ? "disabled-group" : ""}`}>
        {options.map((option) => {
          const isSelected = normalizedValue === option.value;

          return (
            <div
              key={option.value}
              className={`
                checkbox-item
                ${isSelected ? "selected" : ""}
                ${(isDisabled || disableAll) ? "disabled" : ""}
              `}
              onClick={() => handleSelect(option.value)}
              role="radio"
              aria-checked={isSelected}
            >
              <div className="checkbox-box">
                {isSelected && (
                  <div className="checkbox-tick">
                    <img
                      src={CheckMark}
                      alt="Selected"
                      className="checkmark-icon"
                    />
                  </div>
                )}
              </div>
              <span className="checkbox-text">{option.label}</span>
            </div>
          );
        })}
      </div>
      {error && <div className="checkbox-error">{error}</div>}
    </div>
  );
}