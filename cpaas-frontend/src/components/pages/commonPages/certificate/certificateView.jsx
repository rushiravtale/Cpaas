import React, { useRef, useMemo, useState } from "react";
import "./certificateStyles.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import MiniBars from "../../../common/BarChart/MiniBars";
import CustomGauge from "../../../common/GaugeChart/CustomGauge";
import rightside_certificate_logo from "../../../../../public/assets/svg/certificate_right_logo.svg";
import leftside_certificate_logo from "../../../../../public/assets/svg/certificate_left_logo.svg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import BackNavigation from "../../../common/navigation/BackNavigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

const getPerformanceColor = (value) => {
  if (value >= 70) return "#0049D0"; // Above Average (blue)
  if (value >= 50) return "#c69c2b"; // Average (gold)
  if (value >= 40) return "#FF8C00"; // Below Average (orange)
  return "#e53935"; // Fail (red)
};

const PRACTICAL_COLOR_MAP = {
  fail: "#e53935",
  belowAverage: "#FF8C00",
  average: "#c69c2b",
  aboveAverage: "#0049D0",
};

const getPracticalPerformanceColor = (value) => {
  if (value >= 70) return PRACTICAL_COLOR_MAP.aboveAverage;
  if (value >= 50) return PRACTICAL_COLOR_MAP.average;
  if (value >= 40) return PRACTICAL_COLOR_MAP.belowAverage;
  return PRACTICAL_COLOR_MAP.fail;
};

const getPracticalGradeLabel = (value) => {
  if (value >= 70) return "Above Average";
  if (value >= 50) return "Average";
  if (value >= 40) return "Below Average";
  return "Fail";
};

const toCapitalCase = (str = "") =>
  str
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const parsePercent = (raw) => {
  if (raw === null || raw === undefined) return 0;

  const s = raw.toString().trim();

  // Handle "x/y" case
  if (s.includes("/")) {
    const parts = s
      .split("/")
      .map((p) => parseFloat(p.replace(/[^0-9.-]/g, "")));

    if (parts.length === 2 && parts[1] !== 0) {
      const value = (parts[0] / parts[1]) * 100;
      return parseFloat(value.toFixed(1)); // limit to 1 decimals
    }
  }

  // Handle direct percentages like "54.8%" or "  54.8 "
  const num = parseFloat(s.replace("%", ""));

  if (Number.isNaN(num)) return 0;

  return parseFloat(num.toFixed(2)); // limit to 2 decimals
};

const transformFortnightly = (obj = {}) =>
  Object.entries(obj).map(([k, v]) => {
    const raw = v?.value || v;
    const parts = raw?.toString()?.split("/") || [];
    const score =
      parts.length === 2 ? parseInt(parts[0], 10) : parseInt(raw, 10) || 0;
    const total = parts.length === 2 ? parseInt(parts[1], 10) : 10;
    return {
      key: k,
      label: toCapitalCase(v?.label || k),
      score,
      total,
      percent: total ? Math.round((score / total) * 100) : 0,
    };
  });

const CertificateView = ({
  summary = {},
  editAgniveer = {},
  fortnightly = {},
  error,
  loading,
  signatureImage,
  onSignatureUpload,
  canEdit = false,
}) => {
  const certRef = useRef();
  const fileInputRef = useRef();
  const prevAgniveerIdRef = useRef(null);

  // State for pen content editing
  const [isEditingPenContent, setIsEditingPenContent] = useState(false);
  const [editedPenContent, setEditedPenContent] = useState("");
  const [appendText, setAppendText] = useState("");

  // const handlePrint = () => {
  //   if (!certRef.current) return;
  //   const content = certRef.current.innerHTML;
  //   const printWindow = window.open("", "_blank", "width=1200,height=900");
  //   if (!printWindow) {
  //     alert("Allow popups");
  //     return;
  //   }
  //   printWindow.document.write(`
  //     <html>
  //       <head><title>Certificate</title></head>
  //       <body>${content}</body>
  //     </html>
  //   `);
  //   printWindow.document.close();
  //   setTimeout(() => {
  //     printWindow.focus();
  //     printWindow.print();
  //   }, 500);
  // };

  const handleDownloadPDF = async () => {
  if (!certRef.current) return;

  try {
    const element = certRef.current;

    const canvas = await html2canvas(element, {
      scale: window.devicePixelRatio || 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      ignoreElements: (el) => el.classList.contains("no-pdf"),
    });

    const imgData = canvas.toDataURL("image/png");

    // Calculate dimensions based on actual canvas size
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Use A4 width but adjust height to match content
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = (canvasHeight * pdfWidth) / canvasWidth;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [pdfWidth, pdfHeight], // Custom height based on content
    });

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    const fileName = `Certificate_${name.replace(/\s+/g, "_")}_${armyNumber}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Failed to generate PDF. Please try again.");
  }
};

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file (PNG, JPG, JPEG)");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("File size must be less than 2MB");
        return;
      }
      onSignatureUpload(file);
    }
  };

  const perf = summary?.performance || {};
  const charts = summary?.chartPerformance || {};
  const marks = summary?.marks || [];
  const physicalTest = summary?.physicalTest || {};
  const penPicture = summary?.penPicture || "";
  const penPictureCategory = summary?.penPictureCategory || "average";

  // Get current agniveer ID
  const currentAgniveerId = editAgniveer?._id || editAgniveer?.id;

  // Track whether user has manually edited pen content (append/edit)
  const hasUserEditedRef = React.useRef(false);

  // Reset edited content when switching certificates or when penPicture changes
  React.useEffect(() => {
    // Check if we're switching to a different agniveer
    const isAgniveerChanged =
      prevAgniveerIdRef.current !== null &&
      prevAgniveerIdRef.current !== currentAgniveerId;

    // Update edited content when penPicture is available
    if (penPicture) {
      // Always reset when switching certificates (agniveer changed)
      if (isAgniveerChanged || prevAgniveerIdRef.current === null) {
        setEditedPenContent(penPicture);
        setIsEditingPenContent(false);
        setAppendText("");
        hasUserEditedRef.current = false;
      } else if (!hasUserEditedRef.current) {
        // Only sync from backend if user hasn't manually edited
        setEditedPenContent(penPicture);
      }
    }

    // Update the ref to track current agniveer
    if (currentAgniveerId) {
      prevAgniveerIdRef.current = currentAgniveerId;
    }
  }, [penPicture, currentAgniveerId]);
  const fortnightArr = transformFortnightly(
    summary?.FortnightlyPerformanceRating || fortnightly || {},
  );

  /* ---------------- BASIC INFO ---------------- */
  const name = editAgniveer?.name || "—";
  const rank = editAgniveer?.rank || "—";
  const armyNumber = editAgniveer?.armyNumber || "—";
  const trade = editAgniveer?.tradeId?.[0]?.name || editAgniveer?.trade || "—";
  const course =
    editAgniveer?.courseName?.[0]?.courseName || editAgniveer?.course || "—";

  const physicalScore = parsePercent(
    charts?.physicalPerformance?.score || perf?.physicalFitness?.overall || "0",
  );

  const physicalGrade = toCapitalCase(
    charts?.physicalPerformance?.grade ||
      perf?.physicalFitness?.overall?.rating ||
      perf?.physicalFitness?.BPET ||
      "",
  );

  const writtenRaw =
    marks?.[0]?.progressBars?.writtenExamination?.value ||
    perf?.theoretical?.Written ||
    "-";
  const writtenPercent = parsePercent(writtenRaw);

  const quizRaw =
    marks?.[0]?.progressBars?.quizAssessment?.value ||
    perf?.theoretical?.Quiz ||
    "-";
  const quizPercent = parsePercent(quizRaw);

  const writtenGrade = toCapitalCase(charts?.written?.grade || "");

  const practicalPercent = parsePercent(charts?.practical?.score);

  const practicalGrade = getPracticalGradeLabel(practicalPercent);

  const overall = summary?.performance?.overall || {};
  const totalMark = overall?.TotalMark ?? "-";
  const overallPercentage = overall?.Percentage ?? "-";
  const overallPosition = overall?.Position ?? "-";

  const bpetRaw = physicalTest?.progressBars?.BPET?.value || "0/0";
  const pptRaw = physicalTest?.progressBars?.PPT?.value || "0/0";

  const bpetGrade = toCapitalCase(
    physicalTest?.progressBars?.BPET?.grade || "—",
  );
  const pptGrade = toCapitalCase(physicalTest?.progressBars?.PPT?.grade || "—");

  const bpetPercent = parsePercent(bpetRaw);
  const pptPercent = parsePercent(pptRaw);

  const fortnightChartData = useMemo(
    () =>
      fortnightArr.map((f) => ({
        label: toCapitalCase(f.label),
        score: f.score,
        percent: f.percent,
        color: getPracticalPerformanceColor(f.percent),
      })),
    [fortnightArr],
  );

  if (!summary && !loading) {
    return (
      <>
        <BackNavigation />

        <div
          style={{
            border: "1px solid #ccc",
            padding: "16px 0px ",
            borderRadius: "6px",
            height: "80%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "20px 0px",
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

  const formatLabelLines = (text) => {
    const maxWidth = 12;
    const words = toCapitalCase(text).split(" ");

    const lines = [];
    let current = "";

    words.forEach((w) => {
      if ((current + w).length <= maxWidth) {
        current += w + " ";
      } else {
        lines.push(current.trim());
        current = w + " ";
      }
    });

    if (current) lines.push(current.trim());
    return lines;
  };

  const renderSmallBoxes = () => (
    <div className="cert-left-column">
      <div className="cert-box physical-fitness-section">
        <h4>Physical Fitness</h4>
        <div className="pf-grid">
          <div className="pf-item">
            <div className="pf-label">BPET:</div>
            <div
              className="pf-value"
              style={{
                color:
                  String(bpetGrade).toLowerCase() === "fail"
                    ? PRACTICAL_COLOR_MAP.fail
                    : getPerformanceColor(bpetPercent),
              }}
            >
              {bpetGrade}
            </div>
          </div>

          <div className="pf-item">
            <div className="pf-label">PPT:</div>
            <div
              className="pf-value"
              style={{
                color:
                  String(pptGrade).toLowerCase() === "fail"
                    ? PRACTICAL_COLOR_MAP.fail
                    : getPerformanceColor(pptPercent),
              }}
            >
              {pptGrade}
            </div>
          </div>
        </div>
      </div>

      <div className="cert-box theoretical">
        <h4>Theoretical</h4>
        <div className="theo-item-wrapper">
          <div className="theo-item">
            <div className="theo-label">Written:</div>
            <div className="theo-value">
              {writtenRaw} ({writtenPercent}%)
            </div>
          </div>
          <div className="theo-item">
            <div className="theo-label">Quiz:</div>
            <div className="theo-value">
              {quizRaw} ({quizPercent}%)
            </div>
          </div>
        </div>
      </div>

      <div className="cert-box practical-box">
        <h4>Practical</h4>
        <div className="practical-value">
          {marks?.[1]?.progressBars?.overallPractical?.value ||
            perf?.practical?.Score ||
            "-"}
        </div>
      </div>

      <div className="cert-box overall-box">
        <h4>Overall</h4>
        <div className="overall-grid">
          <div className="overall-wrapper">
            <div className="small-label">Total Mark:</div>
            <div className="small-value">{totalMark}</div>
          </div>
          <div className="overall-wrapper">
            <div className="small-label">Percentage:</div>
            <div className="small-value">{overallPercentage}</div>
          </div>
          <div className="overall-wrapper">
            <div className="small-label">Overall Position:</div>
            <div className="small-value">{overallPosition}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const RoundedBar = (props) => {
    const { x, y, width, height, fill } = props;
    const radius = 3;

    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        rx={radius}
        ry={radius}
      />
    );
  };

  if (!loading) {
    return (
      <div className="certificate-page-wrapper">
        <div className="certificate-header">
          <BackNavigation />
          <div className="cert-header-actions">
            <h2>Certificate</h2>
          </div>
        </div>
        <div ref={certRef} className="certificate-wrapper">
          <div className="certificate-inner">
            <div className="cert-header">
              <div className="cert-logo-left">
                <img src={leftside_certificate_logo} alt="left emblem" />
              </div>

              <div className="cert-title">
                <svg viewBox="0 0 900 290" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <path id="upperArc" d="M 60 230 Q 450 0 840 230" />
                  </defs>
                  <text fontSize="45" fontWeight="700" letterSpacing="2px" fontFamily="Arial, sans-serif" textTransform="uppercase">
                    <textPath
                      href="#upperArc"
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      COMPOSITE TRAINING BATTALION
                    </textPath>
                  </text>

                  <defs>
                    <path id="lowerArc" d="M 90 318 Q 490 30 820 335" />
                  </defs>
                  <text fontSize="45" fontWeight="700" letterSpacing="2px" fontFamily="Arial, sans-serif" textTransform="uppercase">
                    <textPath
                      href="#lowerArc"
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      MIC&S, AHILYANAGAR
                    </textPath>
                  </text>
                </svg>
              </div>

              <div className="cert-logo-right">
                <img src={rightside_certificate_logo} alt="right emblem" />
              </div>
            </div>

            {/* BASIC INFO */}
            <div className="cert-basic-info">
              <div className="info-left">
                <div className="info-row">
                  <span className="label">Army Number:</span>
                  <span className="value">{armyNumber}</span>
                </div>
                {/* <div className="info-row">
                  <span className="label">Name:</span>
                  <span className="value">{name}</span>
                </div> */}
                <div className="info-row">
                  <span className="label">Trade:</span>
                  <span className="value">{trade.toUpperCase()}</span>
                </div>

                {/* <div className="info-row">
                  <span className="label">Rank:</span>
                  <span className="value">{rank}</span>
                </div> */}

                <div className="info-row">
                  <span className="label">Course:</span>
                  <span className="value">{course}</span>
                </div>
              </div>

              <div className="info-right">
                <div className="info-row">
                  <span className="label">Rank:</span>
                  <span className="value">{rank}</span>
                </div>
                {/* <div className="info-row">
                  <span className="label">Army Number:</span>
                  <span className="value">{armyNumber}</span>
                </div> */}
                <div className="info-row">
                  <span className="label">Name:</span>
                  <span className="value">{name}</span>
                </div>

                {/* <div className="info-row">
                  <span className="label">Trade:</span>
                  <span className="value">{trade.toUpperCase()}</span>
                </div> */}

                <div className="info-row">
                  <span className="label">Unit:</span>
                  <span className="value">{editAgniveer?.unit || "—"}</span>
                </div>
              </div>
            </div>

            {/* TOP 3 CHARTS */}
            <div className="cert-top-charts">
              <div className="chart-card">
                <h4>Physical Performance</h4>
                <div className="chart-inner">
                  <CircularProgressbar
                    value={physicalScore}
                    text={`${physicalScore}%`}
                    strokeWidth={9}
                    styles={buildStyles({
                      textSize: "13px",
                      pathColor: getPerformanceColor(physicalScore),
                      trailColor: "#e6e6e6",
                      textColor: getPerformanceColor(physicalScore),
                    })}
                  />
                  <div className="chart-circle-subtext">Score</div>

                  <div
                    className="chart-grade"
                    style={{ color: getPerformanceColor(physicalScore) }}
                  >
                    {physicalGrade}
                  </div>
                </div>
              </div>

              <div className="chart-card">
                <h4>Theoretical</h4>
                <div className="chart-inner">
                  <MiniBars
                    title="Theoretical"
                    grade={writtenGrade}
                    barColor={getPerformanceColor(
                      (quizPercent + writtenPercent) / 2,
                    )}
                    barWidth={"20px"}
                    bars={[
                      { label: toCapitalCase("Quiz"), value: quizPercent },
                      {
                        label: toCapitalCase("Written"),
                        value: writtenPercent,
                      },
                    ]}
                  />

                  <div
                    className="chart-grade"
                    style={{
                      color: getPerformanceColor(
                        (quizPercent + writtenPercent) / 2,
                      ),
                    }}
                  >
                    {writtenGrade}
                  </div>
                </div>
              </div>

              <div className="chart-card">
                <h4>Practical</h4>
                <div className="chart-inner">
                  <CustomGauge
                    value={practicalPercent}
                    fillColor={getPracticalPerformanceColor(practicalPercent)}
                    outerCradius={"65%"}
                    pointerWidth={2}
                    id="cert-practical-gauge"
                    labels={["Fail", "Below Avg", "Average", "Above Avg"]}
                  />

                  <div
                    className="chart-grade"
                    style={{
                      color: getPracticalPerformanceColor(practicalPercent),
                    }}
                  >
                    {practicalGrade}
                  </div>
                </div>
              </div>
            </div>

            {/* FORTNIGHTLY */}
            <div className="cert-fortnightly">
              <div className="cert-fortnightly-wrapper">
                <h4 className="fort-title">Fortnightly Performance Summary</h4>
                <div>
                  <span className="legend-box fort-fail"></span> Fail
                </div>
                <div>
                  <span className="legend-box fort-below-average"></span> Below
                  Avg
                </div>
                <div>
                  <span className="legend-box fort-average"></span> Average
                </div>
                <div>
                  <span className="legend-box fort-above-average"></span> Above
                  Avg
                </div>
              </div>

              <div className="fort-chart-wrap">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart
                    data={fortnightChartData}
                    barCategoryGap={20}
                    margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#dcdcdc"
                    />

                    <YAxis
                      domain={[0, 10]}
                      ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                      tick={{ fontSize: 11, fontWeight: 600 }}
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                      interval={0}
                      label={{
                        value: "Score",
                        angle: -90,
                        position: "insideLeft",
                        style: {
                          textAnchor: "middle",
                          fontSize: 10,
                          fontWeight: 500,
                          fill: "#333",
                        },
                        dx: 12,
                      }}
                    />

                    <XAxis
                      dataKey="label"
                      interval={0}
                      height={70}
                      axisLine={false}
                      tickLine={false}
                      tick={({ x, y, payload }) => {
                        const lines = formatLabelLines(payload.value);
                        return (
                          <g transform={`translate(${x},${y + 10})`}>
                            {lines.map((line, i) => (
                              <text
                                key={i}
                                textAnchor="middle"
                                fontSize={9}
                                y={i * 12}
                                fill="#333"
                              >
                                {line}
                              </text>
                            ))}
                          </g>
                        );
                      }}
                    />

                    <Tooltip cursor={{ fill: "transparent" }} />

                    <Bar dataKey="score" barSize={28} shape={<RoundedBar />}>
                      {fortnightChartData.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* BOTTOM GRID */}
            <div className="cert-bottom-grid">
              {renderSmallBoxes()}
              <div className="cert-right-column">
                <div
                  className={`pen-picture-container pen-category-${penPictureCategory}`}
                >
                  <div
                    className="pen-content"
                    dangerouslySetInnerHTML={{
                      __html: editedPenContent || penPicture,
                    }}
                  />
                </div>
                {canEdit && (
                  <div className="commander-actions-wrapper no-pdf">
                    <div className="pen-edit-section">
                      <button
                        className="edit-pen-button"
                        onClick={() =>
                          setIsEditingPenContent(!isEditingPenContent)
                        }
                      >
                        {isEditingPenContent
                          ? "Cancel Edit"
                          : "Edit Pen Content"}
                      </button>
                    </div>
                    {isEditingPenContent && (
                      <div className="pen-append-section">
                        <label className="append-label">Append Text:</label>
                        <textarea
                          className="append-textarea"
                          value={appendText}
                          onChange={(e) => setAppendText(e.target.value)}
                          placeholder="Add additional text here..."
                          rows={4}
                        />
                        <div className="append-actions">
                          <button
                            className="append-button"
                            onClick={() => {
                              const newContent =
                                editedPenContent + "<p>" + appendText + "</p>";
                              hasUserEditedRef.current = true;
                              setEditedPenContent(newContent);
                              setAppendText("");
                              setIsEditingPenContent(false);
                            }}
                          >
                            Append Text
                          </button>
                          <button
                            className="reset-button"
                            onClick={() => {
                              setEditedPenContent(penPicture);
                              setAppendText("");
                              setIsEditingPenContent(false);
                              hasUserEditedRef.current = false;
                            }}
                          >
                            Reset to Original
                          </button>
                        </div>
                      </div>
                    )}
                    <div className="signature-upload-section">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept="image/*"
                        style={{ display: "none" }}
                      />
                      <button
                        className="upload-signature-button"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {signatureImage
                          ? "Change Signature"
                          : "Upload Signature"}
                      </button>
                    </div>
                  </div>
                )}
                {signatureImage && (
                  <div className="signature-display">
                    <img
                      src={signatureImage}
                      alt="Signature"
                      className="signature-image"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {canEdit && (
          <button className="download-pdf-button" onClick={handleDownloadPDF}>
            Download PDF
          </button>
        )}
      </div>
    );
  }
};

export default CertificateView;
