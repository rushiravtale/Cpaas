import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useHistory } from "react-router-dom";
import "./backNavigation.scss";

export default function BackNavigation({ label = "Back" }) {
  const history = useHistory();

  return (
    <div className="back-navigation" onClick={() => history.goBack()}>
      <IoIosArrowBack className="back-icon" />
      <span className="back-text">{label}</span>
    </div>
  );
}
