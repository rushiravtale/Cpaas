import React from "react";
import "./footerStyles.scss";
import { RiCopyrightLine } from "react-icons/ri";

const Footer = ({styles}) => {
  return (
    <div className={`footer-container ${styles}`}>
      <RiCopyrightLine className="footer-icon" />
      <span>Powered By AVatara Defence</span>
    </div>
  );
};

export default Footer;
