import React from "react";
import PropTypes from "prop-types";
import "./rangeInputStyles.scss";

const RangeInput = ({
  min = 0,
  max = 10,
  step = 1,
  value = 0,
  onChange = () => {},
  className = "",
}) => {
  const pct = ((Number(value) - Number(min)) / (Number(max) - Number(min))) * 100;

  const styleVars = {
    "--range-pct": `${pct}%`,
  };

  return (
    <div className={`range-input-wrapper ${className}`} style={styleVars}>
      <input
        type="range"
        className="range-input"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="range-ticks">
        <span className="tick-left">{min}</span>
        <span className="tick-right">{max}</span>
      </div>
    </div>
  );
};

RangeInput.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default RangeInput;
