import * as types from "./weeklyPerformaceActionTypes";


export const loadWeeklyPerformance = () => {
  const dummy = [
    { id: "physical_training", label: "Physical Training", value: 9, min: 0, max: 10, step: 1, colorStart: "#9b4cff", colorEnd: "#2ad0ff" },
    { id: "motivation_level", label: "Motivation Level", value: 9, min: 0, max: 10, step: 1, colorStart: "#9b4cff", colorEnd: "#2ad0ff" },
    { id: "military_bearing", label: "Military Bearing", value: 6, min: 0, max: 10, step: 1, colorStart: "#9b4cff", colorEnd: "#2ad0ff" },
    { id: "situational_awareness", label: "Situational Awareness", value: 5, min: 0, max: 10, step: 1, colorStart: "#9b4cff", colorEnd: "#2ad0ff" },
    { id: "problem_solving", label: "Problem Solving / Mental Agility", value: 9, min: 0, max: 10, step: 1, colorStart: "#9b4cff", colorEnd: "#2ad0ff" },

    { id: "class_performance", label: "Class performance", value: 6, min: 0, max: 10, step: 1, colorStart: "#9b4cff", colorEnd: "#2ad0ff" },
    { id: "morale", label: "Morale", value: 9, min: 0, max: 10, step: 1, colorStart: "#9b4cff", colorEnd: "#2ad0ff" },
    { id: "decision_making", label: "Decision Making / Sound Judgement", value: 7, min: 0, max: 10, step: 1, colorStart: "#9b4cff", colorEnd: "#2ad0ff" },
    { id: "resilience", label: "Resilience / Mental Toughness (Grit)", value: 10, min: 0, max: 10, step: 1, colorStart: "#9b4cff", colorEnd: "#2ad0ff" },
    { id: "integrity", label: "Integrity", value: 5, min: 0, max: 10, step: 1, colorStart: "#9b4cff", colorEnd: "#2ad0ff" },

  ];

  return {
    type: types.LOAD_WEEKLY_PERFORMANCE,
    payload: dummy,
  };
};

export const setWeeklyPerformance = ({ id, value }) => {
  return {
    type: types.SET_WEEKLY_PERFORMANCE,
    payload: { id, value },
  };
};

export const saveWeeklyPerformance = (data) => {
  return {
    type: types.SAVE_WEEKLY_PERFORMANCE,
    payload: data,
  };
};
