import React from "react";
import "./miniBarsStyles.scss";
import { defaultizeMargin } from "@mui/x-charts/internals";

const MiniBars = ({ title, bars = [], grade, barColor, barWidth }) => {
  const visibleHeight = 65;
  const maxPercent = 100;

  return (
    <div className="mini-bar-card">
      <div className="mini-bars-wrapper">
        {bars.map((bar, idx) => {
          const raw = bar.value ?? 0;

          // FIXED: allow decimal percentages
          const numericValue = parseFloat(
            raw.toString().replace("%", "").trim()
          ) || 0;

          const height = (numericValue / maxPercent) * visibleHeight;

          return (
            <div key={idx} className="mini-bar-item">
              <div className="mini-bar-container">
                <div
                  className="mini-bar-fill"
                  style={{
                    height: `${height}px`,
                    background: barColor,
                    width: `${barWidth ? barWidth : "25px"}`,
                  }}
                ></div>
              </div>
              <span className="mini-bar-label">{bar.label}</span>
              <span className="mini-bar-value">{numericValue}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default MiniBars;