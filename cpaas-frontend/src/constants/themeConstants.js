import theoreticalIcon from "/assets/icons/form_17532505 1.png";
import overallIcon from "/assets/icons/infantry_6141850 1.png";
import practicalIcon from "/assets/icons/military_11808894 1.png";
import physicalIcon from "/assets/icons/running_18831653 1.png";

export const iconMap = {
  physicalFitness: physicalIcon,
  theoretical: theoreticalIcon,
  practical: practicalIcon,
  overall: overallIcon,
};

export const cardStyleMap = {
  physicalFitness: {
    bg: "#D4EDDA",
    border: "#28A745",
  },
  theoretical: {
    bg: "#D4F8FF",
    border: "#A3D7E1",
  },
  practical: {
    bg: "#FFF3CD",
    border: "#C5BA9A",
  },
  overall: {
    bg: "#F9EEF7",
    border: "#D9C4D5",
  },
};

export const chartCardStyleMap = {
  physicalperformance: {
    bg: "#4682F933",
    border: "#4682F980",
  },
  written: {
    bg: "#00BB8C4D",
    border: "#00BB8C80",
  },
practicalchart: {
  bg: "#E0A3004D",
  border: "#E0A30080",
},

};

export const progressGradients = [
  "linear-gradient(90deg, #0182D1 0%, #0BEED6 100%)",
  "linear-gradient(90deg, #FE771E 0%, #FE9F1D 100%)",
  "linear-gradient(90deg, #C725F4 0%, #14E5FE 100%)",
  "linear-gradient(90deg, #4E11C2 0%, #F70B8D 100%)",
  "linear-gradient(90deg, #0182D1 0%, #0BEED6 100%)",
];

export const progressGradientFail =
  "linear-gradient(90deg, #c62828 0%, #e53935 100%)";