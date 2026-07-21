import React from "react";
import RangeInput from "../../../../components/controls/range/RangeInput";
import "./gunnerWeeklyPerformaceSheetStyles.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useHistory } from "react-router-dom";
import InputControl from "../../../controls/input/InputControl";

const getRatingText = (value, max = 10) => {
  const percentage = (value / max) * 100;
  if (percentage > 70) return "Above Average";
  if (percentage >= 50) return "Average";
  return "Below Average";
};

const PERFORMANCE_FIELDS = [
  {
    id: "physical_training",
    label: "Physical Training",
    value: 9,
    min: 0,
    max: 10,
    step: 1,
  },
  {
    id: "motivation_level",
    label: "Motivation Level",
    value: 9,
    min: 0,
    max: 10,
    step: 1,
  },
  {
    id: "military_bearing",
    label: "Military Bearing",
    value: 6,
    min: 0,
    max: 10,
    step: 1,
  },
  {
    id: "situational_awareness",
    label: "Situational Awareness",
    value: 5,
    min: 0,
    max: 10,
    step: 1,
  },
  {
    id: "problem_solving",
    label: "Problem Solving / Mental Agility",
    value: 9,
    min: 0,
    max: 10,
    step: 1,
  },
  {
    id: "class_performance",
    label: "Class performance",
    value: 6,
    min: 0,
    max: 10,
    step: 1,
  },
  { id: "morale", label: "Morale", value: 9, min: 0, max: 10, step: 1 },
  {
    id: "decision_making",
    label: "Decision Making / Sound Judgement",
    value: 7,
    min: 0,
    max: 10,
    step: 1,
  },
  {
    id: "resilience",
    label: "Resilience / Mental Toughness (Grit)",
    value: 10,
    min: 0,
    max: 10,
    step: 1,
  },
  { id: "integrity", label: "Integrity", value: 5, min: 0, max: 10, step: 1 },
].map((field) => ({
  ...field,
  colorStart: "#9b4cff",
  colorEnd: "#2ad0ff",
}));

const gunnerWeeklyPerformaceSheet = ({
  performance = PERFORMANCE_FIELDS,
  actions,
}) => {
  const history = useHistory();

  const mergedPerformance = PERFORMANCE_FIELDS.map((defaultField) => {
    const current = performance.find((p) => p.id === defaultField.id);
    return current ? { ...defaultField, ...current } : defaultField;
  });

  const left = mergedPerformance.slice(
    0,
    Math.ceil(mergedPerformance.length / 2),
  );
  const right = mergedPerformance.slice(
    Math.ceil(mergedPerformance.length / 2),
  );

  const handleChange = (id, newValue) => {
    actions.setWeeklyPerformance({ id, value: newValue });
  };

  return (
    <div className="gunner-weekly-sheet">
      <div className="gwp-header-wrapper">
        <div className="gwp-header">
          <IoIosArrowBack
            className="gwp-back-icon"
            onClick={() => history.goBack()}
          />
          <h2>Fortnightly Performance Sheet</h2>
        </div>

        <InputControl
          value={"1"}
          onChange={(e) => onFieldChange("frotnightly_fill", e.target.value)}
          styles="frotnightly-input"
        />
      </div>
      <div className="sheet-body">
        <div className="sheet-column">
          {left.map((p) => (
            <div className="sheet-row" key={p.id}>
              <div className="row-control">
                <div className="row-label">{p.label}</div>
                <div className="value-label">
                  {p.value}/{p.max}{" "}
                  <span className="rating-text">
                    ({getRatingText(p.value, p.max)})
                  </span>
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
                showTicks={true}
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
                  {p.value}/{p.max}{" "}
                  <span className="rating-text">
                    ({getRatingText(p.value, p.max)})
                  </span>
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
                showTicks={true}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="sheet-footer">
        <button
          className="submit-btn"
          onClick={() => actions.saveWeeklyPerformance(mergedPerformance)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default gunnerWeeklyPerformaceSheet;
