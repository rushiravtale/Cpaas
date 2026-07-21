import React, { useState } from "react";
import "./summaryStyles.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useHistory } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import MiniBars from "../../../common/BarChart/MiniBars";
import CustomGauge from "../../../common/GaugeChart/CustomGauge";
import "react-circular-progressbar/dist/styles.css";
import ProgressBarComponent from "../../../common/progressBar/progressBar";
import {
  iconMap,
  cardStyleMap,
  chartCardStyleMap,
  progressGradients,
  progressGradientFail,
} from "../../../../constants/themeConstants";
import SelectControl from "../../../controls/select/SelectControl";
import BackNavigation from "../../../common/navigation/BackNavigation";
import { getTradeName } from "../../../../helpers/masterLookup";

const weekOptions = [
  { value: "week1", label: "Week 1" },
  { value: "week2", label: "Week 2" },
  { value: "week3", label: "Week 3" },
];

const GunnerSummaryView = ({
  trade,
  summary,
  loading,
  error,
  editAgniveer,
}) => {
  if (!summary && !loading) {
    return (
      <>
        <BackNavigation />

        <div
          style={{
            border: "1px solid #ccc",
            padding: "16px 0px ",
            borderRadius: "6px",
            margin: "20px 0px",
            height: "80%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            background: "#fafafa",
            fontSize: "16px",
            whiteSpace: "pre-wrap",
          }}
        >
          {error}
        </div>
      </>
    );
  }

  // const camelToTitle = (str = "") => {
  //   const s = str.toString();
  //   if (s === s.toUpperCase()) return s;
  //   return s
  //     .replace(/([A-Z])/g, " $1")
  //     .replace(/[_-]/g, " ")
  //     .trim();
  // };

  const getLabel = (maybeObj, keyFallback) => {
    const camelToTitleInner = (str = "") => {
      if (/^[A-Z]+$/.test(str) || /^[a-z]+$/.test(str)) return str;
      return str
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[_-]/g, " ")
        .trim();
    };
    let label = "";
    if (!maybeObj) label = camelToTitleInner(keyFallback);
    else if (typeof maybeObj === "string") label = maybeObj;
    else if (maybeObj.label) label = maybeObj.label;
    else if (maybeObj.name) label = maybeObj.name;
    else label = camelToTitleInner(keyFallback);
    return label.charAt(0).toUpperCase() + label.slice(1);
  };

  const getValue = (maybeObj) => {
    if (maybeObj == null) return "";
    if (typeof maybeObj === "string" || typeof maybeObj === "number")
      return maybeObj;
    if (typeof maybeObj === "object")
      return (
        maybeObj.value ??
        maybeObj.score ??
        maybeObj.written ??
        maybeObj.quiz ??
        maybeObj.remark ??
        ""
      );
    return "";
  };

  const parsePercent = (raw) => {
    if (raw == null) return 0;

    const s = (typeof raw === "object" ? getValue(raw) : raw).toString();

    // Case 1: "25/30"
    if (s.includes("/")) {
      const parts = s
        .split("/")
        .map((p) => parseFloat(p.replace(/[^0-9.]/g, ""))); // allow decimals

      if (
        parts.length === 2 &&
        !isNaN(parts[0]) &&
        !isNaN(parts[1]) &&
        parts[1] !== 0
      ) {
        const value = (parts[0] / parts[1]) * 100;
        return parseFloat(value.toFixed(2)); // keep decimals, max 2 places
      }
    }

    // Case 2: "83.3%" or "83.3"
    const num = parseFloat(s.replace("%", "").replace(/[^0-9.]/g, ""));

    return isNaN(num) ? 0 : parseFloat(num.toFixed(2)); // keep decimals
  };

  const toTitleCase = (str = "") =>
    str
      .toLowerCase()
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .replace(/\s*\/\s*/g, " / ");

  return (
    <div className="gs-wrapper">
      {/* Header */}
      <div className="gs-header-wrapper">
        <div className="gs-header">
          <BackNavigation />
          <h4>Individual Soldier Performance Report</h4>
        </div>
      </div>

      {/* Row One */}
      <div className="gs-row-one">
        <div className="gs-info-grid">
          {[
            { key: "army Number", value: editAgniveer?.armyNumber },
            { key: "squad Number", value: editAgniveer?.squadNumber },
            { key: "rank", value: editAgniveer?.rank },
            { key: "name", value: editAgniveer?.name },
            {
              key: "trade",
              value: editAgniveer?.tradeId?.[0]?._id
                ? (
                    getTradeName(editAgniveer.tradeId[0]._id) || ""
                  ).toUpperCase()
                : undefined,
            },
            { key: "course", value: editAgniveer?.courseName[0]?.courseName },
            { key: "unit", value: editAgniveer?.unit },
          ].map(({ key, value }, idx) => (
            <div key={idx} className="gs-info-card">
              <h4>{getLabel({ label: key }, key)}</h4>
              <p>{value || "-"}</p>
            </div>
          ))}
        </div>

        {/* Performance Cards */}
        <div className="gs-performance-section">
          <div className="gs-performance-cards">
            {summary?.performance &&
              Object.entries(summary?.performance).map(([key, val]) => {
                const style = cardStyleMap[key] || {
                  bg: "#f5f5f5",
                  border: "#999",
                };
                const cardTitle = getLabel(val, key);
                return (
                  <div
                    key={key}
                    className="gs-perf-card"
                    style={{
                      backgroundColor: style.bg,
                      border: `1px solid ${style.border}`,
                    }}
                  >
                    <div className="gs-perf-icon">
                      <img src={iconMap[key]} alt={key} />
                    </div>
                    <div className="gs-perf-content">
                      <h5>{cardTitle}</h5>

                      {typeof val === "object" ? (
                        <div>
                          {Object.entries(val)
                            .filter(
                              ([subKey]) =>
                                subKey !== "label" && subKey !== "id",
                            )
                            .map(([subKey, subVal]) => {
                              const subLabel = getLabel(
                                typeof subVal === "object" && subVal.label
                                  ? subVal
                                  : null,
                                subKey,
                              );
                              const subValue =
                                typeof subVal === "object" &&
                                subVal.value != null
                                  ? subVal.value
                                  : subVal;
                              return (
                                <p key={subKey}>
                                  {cardTitle.toLowerCase() !== "practical" && (
                                    <span>{subLabel}: </span>
                                  )}

                                  {cardTitle.toLowerCase() === "practical" ? (
                                    <span className="gs-normal-text">
                                      {subValue}
                                    </span>
                                  ) : (
                                    <strong
                                      style={{
                                        color:
                                          cardTitle.toLowerCase() ===
                                            "physical fitness" &&
                                          String(subValue).toLowerCase() ===
                                            "fail"
                                            ? "red"
                                            : "inherit",
                                      }}
                                    >
                                      {subValue}
                                    </strong>
                                  )}
                                </p>
                              );
                            })}
                        </div>
                      ) : (
                        <p className="gs-big-score">{val}</p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Row Two */}
      <div className="gs-row-two">
        <div className="gs-second-wrapper">
          {/* Charts */}
          <div className="gs-chart-performance">
            <div className="gs-chart-cards">
              {summary?.chartPerformance &&
                Object.entries(summary?.chartPerformance).map(
                  ([title, data], idx) => {
                    const normalized = (data.id || title)
                      .toString()
                      .toLowerCase()
                      .replace(/\s/g, "");
                    const isPhysical = normalized === "physicalperformance";
                    const isWritten = normalized === "written";
                    const isPractical =
                      normalized === "practical" ||
                      normalized === "practicalchart";

                    const rawScore = getValue(
                      data?.score ?? data?.written ?? data?.quiz ?? "0",
                    );

                    const score = parsePercent(rawScore);

                    const chartStyle = chartCardStyleMap[normalized] || {
                      bg: "#f5f5f5",
                      border: "#999",
                    };
                    const displayTitle = getLabel(data, title);

                    return (
                      <div
                        key={idx}
                        className="gs-chart-card"
                        style={{
                          backgroundColor: chartStyle.bg,
                          border: `1px solid ${chartStyle.border}`,
                        }}
                      >
                        {isPhysical ? (
                          <>
                            <h5 className="gs-phys-title">{displayTitle}</h5>
                            <div className="gs-circular-wrapper">
                              <CircularProgressbar
                                value={score}
                                text={`${score}%`}
                                strokeWidth={5}
                                styles={buildStyles({
                                  textSize: "12px",
                                  pathColor: "#0044CA",
                                  trailColor: "#D9D9D9",
                                  textColor: "#000",
                                  strokeLinecap: "round",
                                })}
                              />
                              <div className="gs-circle-subtext">Score</div>
                            </div>
                            <div className="gs-phys-grade">{data.grade}</div>
                          </>
                        ) : isWritten ? (
                          <>
                            <h5 className="gs-written-title">{displayTitle}</h5>
                            <MiniBars
                              title={displayTitle}
                              grade={data.grade}
                              bars={[
                                {
                                  label: getLabel(null, "Quiz"),
                                  value: parsePercent(
                                    data.quiz || data.score || "0",
                                  ),
                                },
                                {
                                  label: getLabel(null, "Written"),
                                  value: parsePercent(
                                    data.written || data.score || "0",
                                  ),
                                },
                              ]}
                            />
                            <div className="gs-written-grade">{data.grade}</div>
                          </>
                        ) : isPractical ? (
                          <>
                            <h5 className="gs-gauge-title">{displayTitle}</h5>
                            <CustomGauge value={score} id={`gauge-${idx}`} />
                            <div className="gs-gauge-grade">{data.grade}</div>
                          </>
                        ) : (
                          <>
                            <h5>{displayTitle}</h5>
                            <p className="gs-big-score">
                              {getValue(data.score) ||
                                getValue(data.written) ||
                                getValue(data.quiz) ||
                                "N/A"}
                            </p>
                            <span>{data.grade}</span>
                          </>
                        )}
                      </div>
                    );
                  },
                )}
            </div>
          </div>

          {/*Overall Assessment */}
          <div className="gs-marks-wrapper">
            <div className="gs-marks-gs-phys-wrapper">
              {/* Marks */}
              <div className="gs-marks-section">
                <h3>Overall Assessment</h3>
                {summary?.marks &&
                  summary?.marks.map((item, index) => (
                    <div key={index} className="gs-mark-item">
                      <div className="gs-mark-header">
                        <h4>{item.title}</h4>
                        <span>
                          Total: {item.scored}/{item.total} ({item.percent}%)
                        </span>
                      </div>

                      {item.progressBars && (
                        <div className="gs-sub-progress">
                          {Object.entries(item.progressBars).map(
                            ([subTitle, val], subIdx) => {
                              const label = getLabel(val, subTitle);
                              const value = getValue(val);
                              return (
                                <ProgressBarComponent
                                  key={subTitle}
                                  value={value}
                                  label={label}
                                  gradient={
                                    progressGradients[
                                      subIdx % progressGradients.length
                                    ]
                                  }
                                />
                              );
                            },
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              </div>

              {/* Physical Test */}
              {summary?.physicalTest && (
                <div className="gs-physical-test">
                  <div className="gs-physical-test-header">
                    <h3>{summary?.physicalTest.title}</h3>
                    <p>Physical Grade: {summary?.physicalTest.totalGrade}</p>
                  </div>

                  {summary?.physicalTest.subTests ? (
                    summary?.physicalTest.subTests.map((test, idx) => (
                      <div key={idx} className="gs-physical-subtest">
                        <h4>{test.title}</h4>
                        <div className="gs-physical-detail-grid">
                          {Object.entries(test.progressBars || {}).map(
                            ([key, val], subIdx) => {
                              const label = getLabel(val, key);
                              const value = getValue(val);
                              const grade =
                                typeof val === "object" ? val.grade : undefined;

                              return (
                                <ProgressBarComponent
                                  key={key}
                                  value={value}
                                  grade={grade}
                                  label={label}
                                  gradient={
                                    progressGradients[
                                      subIdx % progressGradients.length
                                    ]
                                  }
                                />
                              );
                            },
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="gs-physical-detail-grid">
                      {summary?.physicalTest.progressBars &&
                        Object.entries(summary?.physicalTest.progressBars).map(
                          ([key, val], subIdx) => {
                            const label = getLabel(val, key);
                            const value = getValue(val);
                            const grade =
                              typeof val === "object" ? val.grade : undefined;
                            const isFail =
                              String(grade || "").toLowerCase() === "fail";

                            return (
                              <ProgressBarComponent
                                key={key}
                                value={value}
                                grade={grade}
                                label={label}
                                gradient={
                                  isFail
                                    ? progressGradientFail
                                    : progressGradients[
                                        subIdx % progressGradients.length
                                      ]
                                }
                              />
                            );
                          },
                        )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Practical Assessment */}
            {summary?.practicalAssessment && (
              <div className="gs-practical-assessment">
                <h3>Practical Assessment</h3>
                <div className="gs-practical-detail-grid">
                  {summary?.practicalAssessment.progressBars &&
                    Object.entries(
                      summary?.practicalAssessment.progressBars,
                    ).map(([key, val], subIdx) => {
                      const label = getLabel(val, key);
                      const value = getValue(val);
                      return (
                        <ProgressBarComponent
                          key={key}
                          value={value}
                          label={label}
                          gradient={
                            progressGradients[subIdx % progressGradients.length]
                          }
                        />
                      );
                    })}
                </div>
              </div>
            )}

            {/* ⭐ Fortnightly Performance Rating (UPDATED ONLY HERE) */}
            {summary?.FortnightlyPerformanceRating ? (
              <div className="gs-daily-performance">
                <h3>Fortnightly Performance Rating</h3>
                <div className="gs-daily-list">
                  {Object.entries(summary?.FortnightlyPerformanceRating).map(
                    ([key, val], subIdx) => {
                      const rawLabel = getLabel(val, key);
                      const label = toTitleCase(rawLabel); // ⭐ Applied here only
                      const value = getValue(val);

                      const grade = typeof val === "object" ? val.remark : "";

                      console.log(
                        " frotnigtly grade is",
                        summary?.FortnightlyPerformanceRating,
                      );

                      return (
                        <ProgressBarComponent
                          key={key}
                          value={value}
                          label={label}
                          grade={grade}
                          showGradeAndValue={true}
                          gradient={
                            progressGradients[subIdx % progressGradients.length]
                          }
                        />
                      );
                    },
                  )}
                </div>
              </div>
            ) : summary?.DailyPerformance ? (
              <div className="gs-daily-performance">
                <h3>Daily Performance</h3>
                <div className="gs-daily-list">
                  {Object.entries(summary?.DailyPerformance).map(
                    ([key, val], subIdx) => {
                      const label = getLabel(val, key);
                      const value = getValue(val);
                      const grade = typeof val === "object" ? val.remark : "";

                      return (
                        <ProgressBarComponent
                          key={key}
                          value={value}
                          label={label}
                          grade={grade}
                          gradient={
                            progressGradients[subIdx % progressGradients.length]
                          }
                        />
                      );
                    },
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Pen Picture */}
        {summary?.penPicture && (
          <div className="gs-pen-picture">
            <div
              className="gs-pen-picture-renderer"
              dangerouslySetInnerHTML={{
                __html: summary?.penPicture?.html || summary?.penPicture,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GunnerSummaryView;
