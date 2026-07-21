import React from "react";
import "./RadioControl.scss";

export default function RadioControl({
  label,
  options,
  value,
  onChange,
  styles,
  error,
  disabled,
}) {
  return (
    <div className={`radio-control-wrapper ${styles}`}>
      {label && <label className="radio-label">{label}</label>}

      <div className="radio-options">
        {options?.map((opt) => {
          const selected = value?.value === opt.value;

          return (
            <label key={opt.value} className="radio-option">
              <input
                type="radio"
                name={label}
                value={opt.value}
                checked={selected}
                disabled={disabled}
                onChange={() => onChange(opt)}
              />

              {/* Outer circle + inner dot */}
              <span className="radio-outer">
                <span
                  className={`radio-inner ${selected ? "show" : ""}`}
                ></span>
              </span>

              <span className="radio-text">{opt.label}</span>
            </label>
          );
        })}
      </div>

      {error && <div className="radio-error">{error}</div>}
    </div>
  );
}
