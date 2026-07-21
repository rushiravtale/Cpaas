// import React from "react";
// import { Link } from "react-router-dom";
// import "./ButtonControl.scss";

// export default function ButtonControl({ text, icon, to, onClick, styles,wrapperStyles }) {
//   return (
//     <div className={`button-wrapper ${wrapperStyles}`}>
//       {to ? (
//         <Link to={to} className={`btn-control ${styles}`}>
//           {icon && <span className="btn-icon">{icon}</span>}
//           <span className="btn-text">{text}</span>
//         </Link>
//       ) : (
//         <button
//           className={`btn-control ${styles}`}
//           onClick={onClick}
//           type="button"
//         >
//           {icon && <span className="btn-icon">{icon}</span>}
//           <span className="btn-text">{text}</span>
//         </button>
//       )}
//     </div>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
import "./ButtonControl.scss";

export default function ButtonControl({
  text,
  icon,
  to,
  onClick,
  styles,
  wrapperStyles,
  disabled,
}) {
  return (
    <div className={`button-wrapper ${wrapperStyles}`}>
      {to ? (
        <Link
          to={to}
          className={`btn-control ${styles} ${disabled ? "btn-disabled" : ""}`}
          onClick={(e) => disabled && e.preventDefault()}
        >
          {icon && <span className="btn-icon">{icon}</span>}
          <span className="btn-text">{text}</span>
        </Link>
      ) : (
        <button
          className={`btn-control ${styles}`}
          onClick={onClick}
          type="button"
          disabled={disabled}
        >
          {icon && <span className="btn-icon">{icon}</span>}
          <span className="btn-text">{text}</span>
        </button>
      )}
    </div>
  );
}

