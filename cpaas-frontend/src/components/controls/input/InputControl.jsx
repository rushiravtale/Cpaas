// import React, { useState, useRef } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import "./InputControl.scss";

// export default function InputControl({ label, type = "text", value: controlledValue, onChange, styles, name, placeholder, error })
//  {
//   const [realValue, setRealValue] = useState(
//     type === "password" ? controlledValue || "" : controlledValue || ""
//   );
//   const [showPassword, setShowPassword] = useState(false);
//   const inputRef = useRef(null);

//   const emitChange = (newVal) => {
//     setRealValue(newVal);
//     if (typeof onChange === "function") {
//       onChange({ target: { name, value: newVal } });
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (type !== "password") return;
//     const { key, ctrlKey, metaKey, altKey } = e;
//     if (ctrlKey || metaKey || altKey) {
//       return;
//     }
//     if (key === "Backspace") {
//       e.preventDefault();
//       emitChange(realValue.slice(0, -1));
//       return;
//     }
//     if (key === "Delete") {
//       e.preventDefault();
//       return;
//     }
//     if (
//       key === "Enter" ||
//       key === "Tab" ||
//       key.startsWith("Arrow") ||
//       key === "Home" ||
//       key === "End"
//     ) {
//       return;
//     }
//     if (key.length === 1) {
//       e.preventDefault();
//       emitChange(realValue + key);
//       return;
//     }
//   };

//   const handlePaste = (e) => {
//     if (type !== "password") return;
//     e.preventDefault();
//     const paste = e.clipboardData?.getData("text") || "";
//     if (paste.length > 0) {
//       emitChange(realValue + paste);
//     }
//   };

//   const masked = type === "password" ? "*".repeat(realValue.length) : realValue;

//   const handleNormalChange = (e) => {
//     const newVal = e.target.value;
//     if (type === "password") {
//       emitChange(newVal);
//     } else {
//       if (typeof onChange === "function") onChange(e);
//     }
//   };

//   return (
//     <div className={`input-control-wrapper ${styles || ""}`}>
//       {label && <label className="input-label">{label}</label>}
//       <div style={{ position: "relative" }}>
//         {type === "password" ? (
//           <input
//             ref={inputRef}
//             name={name}
//             type="text"
//             className="input-box"
//             value={showPassword ? realValue : masked}
//             placeholder={placeholder}
//             onKeyDown={handleKeyDown}
//             onPaste={handlePaste}
//             onChange={handleNormalChange}
//             autoComplete="new-password"
//             aria-label={label || name || "password"}
//             inputMode="text"
//             style={{ paddingRight: "40px" }}
//           />
//         ) : (
//           <input
//             name={name}
//             type={type}
//             className="input-box"
//             value={controlledValue !== undefined ? controlledValue : realValue}
//             onChange={handleNormalChange}
//             placeholder={placeholder}
//           />
//         )}

//         {type === "password" && (
//           <span
//             className="password-toggle-icon"
//             onClick={() => setShowPassword(!showPassword)}
//             style={{
//               cursor: "pointer",
//               userSelect: "none",
//               right: "12px",
//               top: "50%",
//               transform: "translateY(-50%)",
//             }}
//           >
//             {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
//           </span>
//         )}
//       </div>
//       {error && <div className="input-error">{error}</div>}

//     </div>
//   );
// }

import React, { useState, useRef, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./InputControl.scss";

export default function InputControl({
  label,
  type = "text",
  value: controlledValue,
  onChange,
  styles,
  innerInputStyles,
  name,
  placeholder,
  error,
  disabled = false,
  maxLength,
  inputMode,
}) {
  const [internalValue, setInternalValue] = useState(controlledValue || "");
  const [showPassword, setShowPassword] = useState(false);

  const inputRef = useRef(null);

  const isPasswordType = type === "password";

  const inputType = isPasswordType && showPassword ? "text" : type;

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  const handleChange = (e) => {
    if (disabled) return;
    const newVal = e.target.value;
    setInternalValue(newVal);
    if (typeof onChange === "function") {
      onChange(e);
    }
  };

  return (
    <div
      className={`input-control-wrapper ${styles || ""} ${disabled ? "disabled" : ""}`}
    >
      {label && <label className="input-label">{label}</label>}

      <div style={{ position: "relative" }}>
        <input
          ref={inputRef}
          name={name}
          type={inputType}
          className={`input-box ${innerInputStyles || ""}`}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          inputMode={inputMode}
          autoComplete={isPasswordType ? "off" : undefined}
          style={isPasswordType ? { paddingRight: "40px" } : undefined}
        />

        {isPasswordType && (
          <span
            className="password-toggle-icon"
            onClick={() => !disabled && setShowPassword(!showPassword)}
            style={{
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.4 : 1,
              userSelect: "none",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
          </span>
        )}
      </div>

      {error && <div className="input-error">{error}</div>}
    </div>
  );
}
