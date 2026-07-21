import React from "react";
import Select from "react-select";
import "./SelectControl.scss";

export default function SelectControl({
  label,
  value,
  options,
  onChange,
  styles,
  isDisabled,
  error
}) {
  return (
    <div className={`select-control-wrapper ${styles}`}>
      {label && <label className="select-label">{label}</label>}

      <Select
        value={value}
        onChange={onChange}
        options={options}
        menuPlacement="auto"
        classNamePrefix="react-select"
        isDisabled={isDisabled}
        menuPortalTarget={document.body} 
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }), 
        }}
      />
      {error && <div className="select-error">{error}</div>}

    </div>
  );
}
