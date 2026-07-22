const XLSX = require("xlsx");
const ExcelJS = require("exceljs");
const path = require("path");
const {
  getTemplatePath,
  getTradeCodeFromName,
  COLUMN_MAP,
  PRACTICAL_COLUMNS,
  FORTNIGHTLY_FIELDS,
} = require("./tradeTemplateMap");

const c = COLUMN_MAP.common;
const bpet = COLUMN_MAP.bpet;
const ppt = COLUMN_MAP.ppt;
const theoretical = COLUMN_MAP.theoretical;

// BPET/PPT rating mappings: 4=Excellent, 3=Good, 2=Satisfactory, 1=Fail; Pass/Fail: 4=Pass, 1=Fail
const RATING_TO_TEXT = { 4: "Excellent", 3: "Good", 2: "Satisfactory", 1: "Fail" };
const PASS_FAIL_TO_TEXT = { 4: "Pass", 1: "Fail" };
const TEXT_TO_RATING = { excellent: 4, good: 3, satisfactory: 2, fail: 1 };
const TEXT_TO_PASS_FAIL = { pass: 4, fail: 1 };

function numberToRatingText(num) {
  if (num == null || num === "") return "";
  const n = Number(num);
  return RATING_TO_TEXT[n] ?? "";
}

function numberToPassFailText(num) {
  if (num == null || num === "") return "";
  const n = Number(num);
  return PASS_FAIL_TO_TEXT[n] ?? "";
}

function parseRatingOrPassFail(val, isPassFail = false) {
  if (val == null || val === "") return null;
  const s = String(val).trim().toLowerCase();
  const num = Number(val);
  if (!isNaN(num) && [1, 2, 3, 4].includes(num)) return num;
  return isPassFail ? (TEXT_TO_PASS_FAIL[s] ?? null) : (TEXT_TO_RATING[s] ?? null);
}

/**
 * Export Agniveers to Excel Buffer using trade-specific template
 * @param {Array} agniveers - Array of agniveer documents (populated)
 * @param {Array} trades - Array of trade documents
 * @param {Array} courses - Array of course documents
 * @param {string} tradeCode - DVR | GUN | OFC | OPR
 * @param {Object} options - { course, physicalMap, techPhaseMap }
 *   - course: Course document for metadata (TRADE, COURSE BATCH NO, FROM, TO)
 *   - physicalMap: Map of "agniveerId_courseId" -> PhyscialProficiency doc
 *   - techPhaseMap: Map of "agniveerId_courseId" -> TechPhase doc
 * @returns {Promise<Buffer>} Excel file buffer
 */
exports.exportAgniveersToExcelByTrade = async (
  agniveers,
  trades,
  courses,
  tradeCode,
  options = {},
) => {
  const { course, physicalMap = new Map(), techPhaseMap = new Map(), fortnightlyMap = new Map() } = options;
  const templatePath = getTemplatePath(tradeCode);
  const pracCols = PRACTICAL_COLUMNS[tradeCode];
  if (!pracCols) {
    throw new Error(`Unknown trade code: ${tradeCode}`);
  }

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);
  const worksheet = workbook.worksheets[0];
  const dataStartRow = pracCols.dataStartRow + 1; // 1-based for ExcelJS

  const tradeMap = new Map();
  trades.forEach((t) => tradeMap.set(t._id.toString(), t.name || t.label));
  const courseMap = new Map();
  courses.forEach((crs) => courseMap.set(crs._id.toString(), crs));

  // Resolve course for metadata
  let metaCourse = course;
  if (!metaCourse && agniveers.length > 0) {
    const firstCourseId =
      agniveers[0].courseName?.[0]?._id || agniveers[0].courseName?.[0];
    if (firstCourseId) {
      metaCourse = courseMap.get(firstCourseId.toString()) || courses.find(
        (cr) => cr._id.toString() === firstCourseId.toString(),
      );
    }
  }

  // Determine trade name from tradeCode (not from course's tradeId array)
  // Since courses are shared across trades, we use the tradeCode to find the correct trade
  let tradeName = tradeCode;
  
  // Find the trade whose code matches the tradeCode
  const selectedTrade = trades.find((t) => {
    const tradeCodeFromTrade = getTradeCodeFromName(t.name || t.label);
    return tradeCodeFromTrade === tradeCode;
  });
  
  if (selectedTrade) {
    tradeName = selectedTrade.name || selectedTrade.label || tradeCode;
  }
  // Fallback: if still not found, use tradeCode as-is

  // Row 1: labels only (actual data goes in each data row)
  worksheet.getCell(1, 1).value = "TRADE";
  worksheet.getCell(1, 2).value = "COURSE BATCH NO";
  worksheet.getCell(1, 3).value = "FROM";
  worksheet.getCell(1, 4).value = "TO";

  // Clear placeholder dot under TRADE column (row just before first data row)
  const placeholderRow = dataStartRow - 1;
  if (placeholderRow >= 1) {
    const cell = worksheet.getCell(placeholderRow, 1);
    if (cell.value === "." || cell.value === "．") {
      cell.value = "";
    }
  }

  // Write Fortnightly Performance column headers — merged exactly like PRACTICAL section
  if (pracCols.fortnightlyStart != null) {
    const fnStartCol = pracCols.fortnightlyStart + 1; // ExcelJS 1-based
    const fnEndCol = fnStartCol + FORTNIGHTLY_FIELDS.length - 1;
    const lastHeaderRow = dataStartRow - 1; // row 5 for all trades
    const sectionEndRow = lastHeaderRow - 2; // row 3 — same depth as PRACTICAL merge
    const subGroupRow = lastHeaderRow - 1;  // row 4 — where PKT PH / EQPT PH live

    const sectionStyle = {
      font: { size: 11, color: { theme: 1 }, name: "Calibri", family: 2, scheme: "minor" },
      border: { left: { style: "thin" }, right: { style: "thin" }, top: { style: "thin" }, bottom: { style: "thin" } },
      fill: { type: "pattern", pattern: "none" },
      alignment: { horizontal: "center", vertical: "middle", wrapText: true },
    };
    const labelStyle = {
      font: { size: 8, color: { argb: "FF000000" }, name: "Poppins" },
      border: { left: { style: "thin" }, right: { style: "thin" }, top: { style: "thin" }, bottom: { style: "thin" } },
      fill: { type: "pattern", pattern: "none" },
      alignment: { horizontal: "center", vertical: "middle", wrapText: true },
    };

    // Rows 1-3: merge across all FN cols (mirrors PRACTICAL section header)
    try { worksheet.mergeCells(1, fnStartCol, sectionEndRow, fnEndCol); } catch (_) {}
    const sectionCell = worksheet.getCell(1, fnStartCol);
    sectionCell.value = "FORTNIGHTLY PERFORMANCE";
    sectionCell.style = sectionStyle;

    // Row 4: merge across all FN cols — empty (no sub-groups for fortnightly)
    try { worksheet.mergeCells(subGroupRow, fnStartCol, subGroupRow, fnEndCol); } catch (_) {}
    const subGroupCell = worksheet.getCell(subGroupRow, fnStartCol);
    subGroupCell.value = "";
    subGroupCell.style = sectionStyle;

    // Row 5 (lastHeaderRow): individual column labels
    FORTNIGHTLY_FIELDS.forEach((field, i) => {
      const cell = worksheet.getCell(lastHeaderRow, fnStartCol + i);
      cell.value = field.label;
      cell.style = labelStyle;
    });
  }

  let rowIndex = dataStartRow;
  for (const agniveer of agniveers) {
    const courseIds = Array.isArray(agniveer.courseName)
      ? agniveer.courseName.map((c) => c?._id || c)
      : [];
    const courseId = courseIds[0] || (metaCourse && metaCourse._id);
    const key = `${agniveer._id}_${courseId}`;
    const physical = physicalMap.get(key);
    const techPhase = techPhaseMap.get(key);

    const row = worksheet.getRow(rowIndex);

    // TRADE, COURSE BATCH NO, FROM, TO (actual data per row)
    row.getCell(c.TRADE + 1).value = tradeName || "";
    row.getCell(c.COURSE_BATCH_NO + 1).value = metaCourse?.courseName ?? "";
    row.getCell(c.FROM + 1).value = metaCourse?.startDate
      ? formatDate(metaCourse.startDate)
      : "";
    row.getCell(c.TO + 1).value = metaCourse?.endDate
      ? formatDate(metaCourse.endDate)
      : "";

    // Personal details
    row.getCell(c.ARMY_NO + 1).value = agniveer.armyNumber || "";
    row.getCell(c.RANK + 1).value = agniveer.rank || "";
    row.getCell(c.NAME + 1).value = agniveer.name || "";
    row.getCell(c.UNIT + 1).value = agniveer.unit || "";
    row.getCell(c.SQUAD_NUMBER + 1).value = agniveer.squadNumber ?? "";
    row.getCell(c.CIVIL_EDUCATION + 1).value = agniveer.civilEdn || "";
    row.getCell(c.ANY_OTHER_QUALIFICATION + 1).value =
      agniveer.anyOtherQualification || "";
    row.getCell(c.FATHER_NAME + 1).value = agniveer.fatherName || "";
    row.getCell(c.CONTACT_NO + 1).value = agniveer.contactNumber || "";
    row.getCell(c.ADDRESS + 1).value = agniveer.address || "";

    // BPET - rating (Excellent/Good/Satisfactory/Fail) for first two, Pass/Fail for rope/ditch
    if (physical?.bpet) {
      row.getCell(bpet.fiveKmRun + 1).value =
        numberToRatingText(physical.bpet.fiveKmRun);
      row.getCell(bpet.sixtyMeterSprint + 1).value =
        numberToRatingText(physical.bpet.sixtyMeterSprint);
      row.getCell(bpet.horizontalRope + 1).value =
        numberToPassFailText(physical.bpet.horizontalRope);
      row.getCell(bpet.verticalRope + 1).value =
        numberToPassFailText(physical.bpet.verticalRope);
      row.getCell(bpet.nineFeetDitch + 1).value =
        numberToPassFailText(physical.bpet.nineFeetDitch);
    }

    // PPT - all use rating (Excellent/Good/Satisfactory/Fail)
    if (physical?.ppt) {
      row.getCell(ppt.twoPointFourKm + 1).value =
        numberToRatingText(physical.ppt.twoPointFourKm);
      row.getCell(ppt.chinUps + 1).value =
        numberToRatingText(physical.ppt.chinUps);
      row.getCell(ppt.toeTouch + 1).value =
        numberToRatingText(physical.ppt.toeTouch);
      row.getCell(ppt.fiveMeterShuttle + 1).value =
        numberToRatingText(physical.ppt.fiveMeterShuttle);
      row.getCell(ppt.sitUps + 1).value =
        numberToRatingText(physical.ppt.sitUps);
      row.getCell(ppt.sprint100m + 1).value =
        numberToRatingText(physical.ppt.sprint100m);
    }

    // Theoretical
    if (techPhase?.theoretical) {
      row.getCell(theoretical.writtenScore + 1).value =
        techPhase.theoretical.writtenScore ?? "";
      row.getCell(theoretical.quizScore + 1).value =
        techPhase.theoretical.quizScore ?? "";
    }

    // Practical - trade-specific
    fillPracticalCells(row, techPhase, tradeCode, pracCols);

    // Fortnightly Performance
    if (pracCols.fortnightlyStart != null) {
      const fortnightly = fortnightlyMap.get(key);
      if (fortnightly) {
        const fnStartCol = pracCols.fortnightlyStart + 1; // ExcelJS 1-based
        FORTNIGHTLY_FIELDS.forEach((field, i) => {
          let val = "";
          if (field.key === "total") {
            val = fortnightly.totalFortnightPerformance ?? "";
          } else {
            val = fortnightly[field.key]?.score ?? "";
          }
          row.getCell(fnStartCol + i).value = val;
        });
      }
    }

    rowIndex++;
  }

  const dataEndRow = rowIndex - 1;
  const maxColCount = getMaxColumnCount(tradeCode);

  // Apply bolder vertical borders and left alignment to data region (when we have data)
  if (agniveers.length > 0) {
    applyDataRegionBorders(worksheet, dataStartRow, dataEndRow, maxColCount);
    setDataRegionAlignmentLeft(worksheet, dataStartRow, dataEndRow, maxColCount);
  }
  // Auto-fit column widths based on content (headers + data)
  autoFitColumnWidths(worksheet, maxColCount);

  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
};

/** Get max column count (1-based) for each trade — includes 11 fortnightly cols */
function getMaxColumnCount(tradeCode) {
  const counts = { DVR: 51, GUN: 52, OFC: 54, OPR: 54 };
  return counts[tradeCode] || 54;
}

/** Apply bolder vertical borders to the data region (column separators) */
function applyDataRegionBorders(worksheet, startRow, endRow, colCount) {
  for (let r = startRow; r <= endRow; r++) {
    for (let col = 1; col <= colCount; col++) {
      const cell = worksheet.getCell(r, col);
      const existing = cell.border || {};
      cell.border = {
        left: col === 1 ? { style: "medium" } : existing.left || { style: "thin" },
        right: { style: "medium" },
        top: existing.top || { style: "thin" },
        bottom: existing.bottom || { style: "thin" },
      };
    }
  }
}

/** Set horizontal alignment to left for all cells in the data region */
function setDataRegionAlignmentLeft(worksheet, startRow, endRow, colCount) {
  for (let r = startRow; r <= endRow; r++) {
    for (let col = 1; col <= colCount; col++) {
      const cell = worksheet.getCell(r, col);
      cell.alignment = {
        horizontal: "left",
        vertical: "middle",
        wrapText: cell.alignment?.wrapText ?? false,
      };
    }
  }
}

/** Auto-fit column widths based on content */
function autoFitColumnWidths(worksheet, colCount) {
  const MIN_WIDTH = 8;
  const MAX_WIDTH = 50;
  const PADDING = 2;

  for (let col = 1; col <= colCount; col++) {
    let maxLength = MIN_WIDTH;
    const column = worksheet.getColumn(col);
    column.eachCell({ includeEmpty: true }, (cell) => {
      let len = 0;
      const val = cell.value;
      if (val != null && val !== "") {
        const str = String(val);
        len = Math.min(str.length, MAX_WIDTH);
      }
      if (len > maxLength) maxLength = len;
    });
    column.width = Math.min(Math.max(maxLength + PADDING, MIN_WIDTH), MAX_WIDTH);
  }
}

function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().slice(0, 10);
}

function fillPracticalCells(row, techPhase, tradeCode, pracCols) {
  if (!techPhase?.practical) return;

  const p = techPhase.practical;

  switch (tradeCode) {
    case "DVR":
      row.getCell(pracCols.idenOfParts + 1).value =
        p.practTest1?.idenOfPartsScore ?? "";
      row.getCell(pracCols.sysTraceOut + 1).value =
        p.practTest1?.sysTraceOut ?? "";
      row.getCell(pracCols.viva + 1).value = p.practTest1?.viva ?? "";
      row.getCell(pracCols.trackWithObst + 1).value =
        p.smlTest?.trackWithObst ?? "";
      row.getCell(pracCols.tatraLoading + 1).value =
        p.smlTest?.tatraLoading ?? "";
      row.getCell(pracCols.blt + 1).value = p.smlTest?.blt ?? "";
      row.getCell(pracCols.rollingStock + 1).value =
        p.smlTest?.rollingStock ?? "";
      row.getCell(pracCols.flotation + 1).value = p.smlTest?.flotation ?? "";
      row.getCell(pracCols.fillingChecking + 1).value =
        p.practTest2?.fillingChecking ?? "";
      row.getCell(pracCols.greasing + 1).value = p.practTest2?.greasing ?? "";
      row.getCell(pracCols.tote + 1).value = p.practTest2?.tote ?? "";
      row.getCell(pracCols.xCountry + 1).value =
        p.drivingTest?.xCountry ?? "";
      row.getCell(pracCols.obst + 1).value = p.drivingTest?.obst ?? "";
      break;
    case "GUN":
      row.getCell(pracCols.pktSa + 1).value = p.pkt?.saScore ?? "";
      row.getCell(pracCols.pktIdenOfParts + 1).value =
        p.pkt?.idenOfPartsScore ?? "";
      row.getCell(pracCols.opStabSys + 1).value = p.eqptph?.opStabSys ?? "";
      row.getCell(pracCols.opGnrSi + 1).value = p.eqptph?.opGnrSi ?? "";
      row.getCell(pracCols.opSmkSys + 1).value = p.eqptph?.opSmkSys ?? "";
      row.getCell(pracCols.eqptphIdenOfParts + 1).value =
        p.eqptph?.idenOfPartsScore ?? "";
      row.getCell(pracCols.gunphSa + 1).value = p.gunph?.sa ?? "";
      row.getCell(pracCols.gunphIdenOfParts + 1).value =
        p.gunph?.idenOfPartsScore ?? "";
      row.getCell(pracCols.mslFiringCct + 1).value = p.mslph?.msl ?? "";
      row.getCell(pracCols.mslphIdenOfParts + 1).value =
        p.mslph?.idenOfPartsScore ?? "";
      row.getCell(pracCols.atgm + 1).value = p.ims?.atgm ?? "";
      row.getCell(pracCols.gun + 1).value = p.fdfiring?.gun ?? "";
      row.getCell(pracCols.pkt + 1).value = p.fdfiring?.pkt ?? "";
      row.getCell(pracCols.msl + 1).value = p.fdfiring?.msl ?? "";
      break;
    case "OFC":
      row.getCell(pracCols.clrMode + 1).value = p.rscnr900m?.clrMode ?? "";
      row.getCell(pracCols.secMode + 1).value = p.rscnr900m?.secMode ?? "";
      row.getCell(pracCols.ajMode + 1).value = p.rscnr900m?.ajMode ?? "";
      row.getCell(pracCols.clrComn + 1).value = p.rsStarsVMk2?.clrComn ?? "";
      row.getCell(pracCols.secComn + 1).value = p.rsStarsVMk2?.secComn ?? "";
      row.getCell(pracCols.fh2Comm + 1).value = p.rsStarsVMk2?.fh2Comm ?? "";
      row.getCell(pracCols.idSelection + 1).value = p.dch?.idSelection ?? "";
      row.getCell(pracCols.byt + 1).value = p.misc?.byt ?? "";
      row.getCell(pracCols.sigStrReportSheet + 1).value =
        p.rtProc?.sigStrReportSheet ?? "";
      row.getCell(pracCols.useOfCode + 1).value = p.rtProc?.useOfCode ?? "";
      row.getCell(pracCols.installation + 1).value =
        p.bfsr?.installation ?? "";
      row.getCell(pracCols.initialisation + 1).value =
        p.bfsr?.initialisation ?? "";
      row.getCell(pracCols.orientation + 1).value = p.bfsr?.orientation ?? "";
      row.getCell(pracCols.drawMap + 1).value = p.bfsr?.drawMap ?? "";
      row.getCell(pracCols.idenOfParts + 1).value = p.misc?.idenOfParts ?? "";
      row.getCell(pracCols.outDoorEx + 1).value = p.misc?.outDoorEx ?? "";
      break;
    case "OPR":
      row.getCell(pracCols.clrMode + 1).value = p.rscnr100?.clrMode ?? "";
      row.getCell(pracCols.secMode + 1).value = p.rscnr100?.secMode ?? "";
      row.getCell(pracCols.ajMode + 1).value = p.rscnr100?.ajMode ?? "";
      row.getCell(pracCols.clrComn + 1).value = p.rsStarsVMk?.clrComn ?? "";
      row.getCell(pracCols.secComn + 1).value = p.rsStarsVMk?.secComn ?? "";
      row.getCell(pracCols.fh2Comm + 1).value = p.rsStarsVMk?.fh2Comm ?? "";
      row.getCell(pracCols.idsel + 1).value = p.dch?.idsel ?? "";
      row.getCell(pracCols.srComn + 1).value = p.dch?.srComn ?? "";
      row.getCell(pracCols.tele + 1).value = p.dch?.tele ?? "";
      row.getCell(pracCols.sigStrReportSheet + 1).value =
        p.rtProc?.sigStrReportSheet ?? "";
      row.getCell(pracCols.useOfCode + 1).value = p.rtProc?.useOfCode ?? "";
      row.getCell(pracCols.viva + 1).value = p.rtProc?.viva ?? "";
      row.getCell(pracCols.dualFreq + 1).value = p.rsVrc?.dualFreq ?? "";
      row.getCell(pracCols.seriesParallel + 1).value =
        p.byt?.seriesParallel ?? "";
      row.getCell(pracCols.idenOfParts + 1).value = p.misc?.idenOfParts ?? "";
      row.getCell(pracCols.outDoorEx + 1).value = p.misc?.outDoorEx ?? "";
      break;
    default:
      break;
  }
}

/**
 * Legacy export - kept for backward compatibility, now delegates to trade-specific
 * when tradeCode can be determined
 */
exports.exportAgniveersToExcel = (agniveers, trades, courses) => {
  const workbook = XLSX.utils.book_new();
  const tradeMap = new Map();
  trades.forEach((t) => tradeMap.set(t._id.toString(), t.name || t.label));
  const courseMap = new Map();
  courses.forEach((crs) => courseMap.set(crs._id.toString(), crs.courseName));

  const excelData = agniveers.map((agniveer) => {
    const tradeNames =
      Array.isArray(agniveer.tradeId) && agniveer.tradeId.length > 0
        ? agniveer.tradeId
            .map((tid) => {
              const id = tid._id?.toString() || tid.toString();
              return tradeMap.get(id) || "";
            })
            .filter(Boolean)
            .join(", ")
        : "";
    const courseNames =
      Array.isArray(agniveer.courseName) && agniveer.courseName.length > 0
        ? agniveer.courseName
            .map((cid) => {
              const id = cid._id?.toString() || cid.toString();
              return courseMap.get(id) || "";
            })
            .filter(Boolean)
            .join(", ")
        : "";

    return {
      Name: agniveer.name || "",
      "Army Number": agniveer.armyNumber || "",
      Rank: agniveer.rank || "",
      Trade: tradeNames,
      "Squad Number": agniveer.squadNumber || "",
      "Civil Education": agniveer.civilEdn || "",
      "Any Other Qualification": agniveer.anyOtherQualification || "",
      "Father Name": agniveer.fatherName || "",
      "Contact Number": agniveer.contactNumber || "",
      Address: agniveer.address || "",
      "Course Name": courseNames,
      Grade: agniveer.grade || "",
    };
  });

  const headers = [
    "Name", "Army Number", "Rank", "Trade", "Squad Number", "Civil Education",
    "Any Other Qualification", "Father Name", "Contact Number", "Address",
    "Course Name", "Grade",
  ];
  const worksheet =
    excelData.length === 0
      ? XLSX.utils.aoa_to_sheet([headers])
      : XLSX.utils.json_to_sheet(excelData);
  worksheet["!cols"] = [
    { wch: 20 }, { wch: 15 }, { wch: 10 }, { wch: 15 }, { wch: 12 },
    { wch: 20 }, { wch: 25 }, { wch: 20 }, { wch: 15 }, { wch: 30 },
    { wch: 20 }, { wch: 10 },
  ];
  XLSX.utils.book_append_sheet(workbook, worksheet, "Agniveers");
  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
};

/**
 * Parse Excel file (trade-specific format) and return row data with column map
 * @param {Buffer} fileBuffer - Excel file buffer
 * @param {string} tradeCode - DVR | GUN | OFC | OPR
 * @returns {Array} Array of row objects (arrays) and column metadata
 */
exports.parseExcelFileByTrade = (fileBuffer, tradeCode) => {
  try {
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const aoa = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
      raw: false,
    });

    const pracCols = PRACTICAL_COLUMNS[tradeCode];
    if (!pracCols) throw new Error(`Unknown trade code: ${tradeCode}`);

    const dataStartRow = pracCols.dataStartRow;
    const rows = [];
    for (let r = dataStartRow; r < aoa.length; r++) {
      const row = aoa[r];
      if (!Array.isArray(row)) continue;
      const hasContent = row.some(
        (cell) => cell !== null && cell !== undefined && cell.toString().trim() !== ""
      );
      if (!hasContent) continue;
      rows.push({ rowIndex: r + 1, data: row });
    }
    return { rows, headers: aoa.slice(0, dataStartRow) };
  } catch (error) {
    throw new Error("Invalid Excel file format");
  }
};

/**
 * Validate a single row (trade-specific format)
 */
exports.validateAgniveerRowByTrade = (rowData, rowNum, tradeCode) => {
  const errors = [];
  const v = (col) => (rowData[col] ?? "").toString().trim();

  if (!v(c.ARMY_NO)) {
    errors.push({ row: rowNum, field: "ARMY NO", message: "Army Number is required", data: rowData });
  }
  if (!v(c.NAME)) {
    errors.push({ row: rowNum, field: "NAME", message: "Name is required", data: rowData });
  }
  if (!v(c.RANK)) {
    errors.push({ row: rowNum, field: "RANK", message: "Rank is required", data: rowData });
  }
  const squad = rowData[c.SQUAD_NUMBER];
  if (squad === undefined || squad === null || squad === "") {
    errors.push({ row: rowNum, field: "SQUAD NUMBER", message: "Squad Number is required", data: rowData });
  } else if (isNaN(Number(squad))) {
    errors.push({ row: rowNum, field: "SQUAD NUMBER", message: "Squad Number must be a number", data: rowData });
  }
  const contact = v(c.CONTACT_NO);
  if (!contact) {
    errors.push({ row: rowNum, field: "CONTACT NO", message: "Contact Number is required", data: rowData });
  } else if (!/^[0-9]{10}$/.test(contact)) {
    errors.push({ row: rowNum, field: "CONTACT NO", message: "Contact Number must be exactly 10 digits", data: rowData });
  }
  if (!v(c.ADDRESS)) {
    errors.push({ row: rowNum, field: "ADDRESS", message: "Address is required", data: rowData });
  }

  return errors;
};

/**
 * Convert Excel row (array) to Agniveer + PhysicalProficiency + TechPhase
 */
exports.convertRowToAgniveerAndRelated = (rowData, tradeCode, tradeId, courseId) => {
  const v = (col) => {
    const val = rowData[col];
    if (val === undefined || val === null || val === "") return null;
    const s = String(val).trim();
    return s || null;
  };
  const n = (col) => {
    const val = rowData[col];
    if (val === undefined || val === null || val === "") return null;
    const num = Number(val);
    return isNaN(num) ? null : num;
  };

  const agniveer = {
    name: v(c.NAME) || "",
    armyNumber: v(c.ARMY_NO) || "",
    rank: v(c.RANK) || "",
    tradeId: tradeId ? [tradeId] : [],
    unit: v(c.UNIT) || "",
    squadNumber: Number(rowData[c.SQUAD_NUMBER]) || 0,
    civilEdn: v(c.CIVIL_EDUCATION) || "",
    anyOtherQualification: v(c.ANY_OTHER_QUALIFICATION) || "",
    fatherName: v(c.FATHER_NAME) || "",
    contactNumber: v(c.CONTACT_NO) || "",
    address: v(c.ADDRESS) || "",
    courseName: courseId ? [courseId] : [],
  };

  // Parse BPET/PPT - accept numbers or text (Excellent/Good/Satisfactory/Fail, Pass/Fail)
  const rating = (col) => parseRatingOrPassFail(rowData[col], false) ?? 1;
  const passFail = (col) => parseRatingOrPassFail(rowData[col], true) ?? 1;

  const physical = {
    bpet: {
      fiveKmRun: rating(bpet.fiveKmRun),
      sixtyMeterSprint: rating(bpet.sixtyMeterSprint),
      horizontalRope: passFail(bpet.horizontalRope),
      verticalRope: passFail(bpet.verticalRope),
      nineFeetDitch: passFail(bpet.nineFeetDitch),
    },
    ppt: {
      twoPointFourKm: rating(ppt.twoPointFourKm),
      chinUps: rating(ppt.chinUps),
      toeTouch: rating(ppt.toeTouch),
      fiveMeterShuttle: rating(ppt.fiveMeterShuttle),
      sitUps: rating(ppt.sitUps),
      sprint100m: rating(ppt.sprint100m),
    },
  };

  const techPhase = {
    theoretical: {
      writtenScore: n(theoretical.writtenScore),
      quizScore: n(theoretical.quizScore),
    },
    practical: buildPracticalFromRow(rowData, tradeCode),
  };

  return { agniveer, physical, techPhase, fortnightly: buildFortnightlyFromRow(rowData, tradeCode) };
};

function buildPracticalFromRow(rowData, tradeCode) {
  const n = (col) => {
    const val = rowData[col];
    if (val === undefined || val === null || val === "") return null;
    const num = Number(val);
    return isNaN(num) ? null : num;
  };
  const p = PRACTICAL_COLUMNS[tradeCode];
  if (!p) return {};

  switch (tradeCode) {
    case "DVR":
      return {
        practTest1: {
          idenOfPartsScore: n(p.idenOfParts),
          sysTraceOut: n(p.sysTraceOut),
          viva: n(p.viva),
        },
        smlTest: {
          trackWithObst: n(p.trackWithObst),
          tatraLoading: n(p.tatraLoading),
          blt: n(p.blt),
          rollingStock: n(p.rollingStock),
          flotation: n(p.flotation),
        },
        practTest2: {
          fillingChecking: n(p.fillingChecking),
          greasing: n(p.greasing),
          tote: n(p.tote),
        },
        drivingTest: {
          xCountry: n(p.xCountry),
          obst: n(p.obst),
        },
      };
    case "GUN":
      return {
        pkt: { saScore: n(p.pktSa), idenOfPartsScore: n(p.pktIdenOfParts) },
        eqptph: {
          opStabSys: n(p.opStabSys),
          opGnrSi: n(p.opGnrSi),
          opSmkSys: n(p.opSmkSys),
          idenOfPartsScore: n(p.eqptphIdenOfParts),
        },
        gunph: { sa: n(p.gunphSa), idenOfPartsScore: n(p.gunphIdenOfParts) },
        mslph: {
          msl: n(p.mslFiringCct),
          idenOfPartsScore: n(p.mslphIdenOfParts),
        },
        ims: { atgm: n(p.atgm) },
        fdfiring: {
          gun: n(p.gun),
          pkt: n(p.pkt),
          msl: n(p.msl),
        },
      };
    case "OFC":
      return {
        rscnr900m: {
          clrMode: n(p.clrMode),
          secMode: n(p.secMode),
          ajMode: n(p.ajMode),
        },
        rsStarsVMk2: {
          clrComn: n(p.clrComn),
          secComn: n(p.secComn),
          fh2Comm: n(p.fh2Comm),
        },
        dch: { idSelection: n(p.idSelection) },
        misc: { byt: n(p.byt), idenOfParts: n(p.idenOfParts), outDoorEx: n(p.outDoorEx) },
        rtProc: {
          sigStrReportSheet: n(p.sigStrReportSheet),
          useOfCode: n(p.useOfCode),
        },
        bfsr: {
          installation: n(p.installation),
          initialisation: n(p.initialisation),
          orientation: n(p.orientation),
          drawMap: n(p.drawMap),
        },
      };
    case "OPR":
      return {
        rscnr100: {
          clrMode: n(p.clrMode),
          secMode: n(p.secMode),
          ajMode: n(p.ajMode),
        },
        rsStarsVMk: {
          clrComn: n(p.clrComn),
          secComn: n(p.secComn),
          fh2Comm: n(p.fh2Comm),
        },
        dch: {
          idsel: n(p.idsel),
          srComn: n(p.srComn),
          tele: n(p.tele),
        },
        rtProc: {
          sigStrReportSheet: n(p.sigStrReportSheet),
          useOfCode: n(p.useOfCode),
          viva: n(p.viva),
        },
        rsVrc: { dualFreq: n(p.dualFreq) },
        byt: { seriesParallel: n(p.seriesParallel) },
        misc: { idenOfParts: n(p.idenOfParts), outDoorEx: n(p.outDoorEx) },
      };
    default:
      return {};
  }
}

function buildFortnightlyFromRow(rowData, tradeCode) {
  const pracCols = PRACTICAL_COLUMNS[tradeCode];
  if (!pracCols || pracCols.fortnightlyStart == null) return null;
  const n = (col) => {
    const val = rowData[col];
    if (val === undefined || val === null || val === "") return null;
    const num = Number(val);
    return isNaN(num) ? null : num;
  };
  const fs = pracCols.fortnightlyStart;
  const scores = {
    physicalTraining: n(fs),
    gamesPerformance: n(fs + 1),
    motivationLevel: n(fs + 2),
    militaryBearing: n(fs + 3),
    situationalAwareness: n(fs + 4),
    classPerformance: n(fs + 5),
    morale: n(fs + 6),
    decisionMaking: n(fs + 7),
    resilience: n(fs + 8),
    integrity: n(fs + 9),
  };
  const total = n(fs + 10);
  if (Object.values(scores).every((s) => s === null)) return null;
  const computedTotal = total ?? Object.values(scores).reduce((a, b) => a + (b || 0), 0);
  return {
    physicalTraining: { score: scores.physicalTraining },
    gamesPerformance: { score: scores.gamesPerformance },
    motivationLevel: { score: scores.motivationLevel },
    militaryBearing: { score: scores.militaryBearing },
    situationalAwareness: { score: scores.situationalAwareness },
    classPerformance: { score: scores.classPerformance },
    morale: { score: scores.morale },
    decisionMaking: { score: scores.decisionMaking },
    resilience: { score: scores.resilience },
    integrity: { score: scores.integrity },
    totalFortnightPerformance: computedTotal,
  };
}

/**
 * Resolve course from COURSE BATCH NO in Excel (from first data row or header)
 * @param {Object} parseResult - { rows, headers } from parseExcelFileByTrade
 * @param {Array} courses - Course documents
 * @param {string} tradeId - Trade ObjectId for validation
 * @returns {Object|null} Course document or null
 */
exports.resolveCourseFromExcel = (parseResult, courses, tradeId) => {
  const tradeIdStr = tradeId?.toString();
  const { rows, headers } = parseResult;
  let courseName = null;
  if (headers?.[0]?.[c.COURSE_BATCH_NO]) {
    const v = String(headers[0][c.COURSE_BATCH_NO]).trim();
    if (v && v !== "COURSE BATCH NO") courseName = v;
  }
  if (!courseName && rows.length > 0 && rows[0].data) {
    courseName = String(rows[0].data[c.COURSE_BATCH_NO] ?? "").trim();
  }
  if (!courseName) return null;

  const course = courses.find((cr) => {
    const nameMatch =
      (cr.courseName || "").toLowerCase() === courseName.toLowerCase();
    const tradeMatch =
      cr.tradeId &&
      cr.tradeId.some((tid) => (tid._id || tid).toString() === tradeIdStr);
    return nameMatch && tradeMatch;
  });
  return course || null;
};

// --- Legacy exports (for old flat format import if still used) ---

exports.parseExcelFile = (fileBuffer) => {
  try {
    const workbook = XLSX.read(fileBuffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet, { raw: false });
  } catch (error) {
    throw new Error("Invalid Excel file format");
  }
};

exports.validateAgniveerRow = (row, rowIndex) => {
  const errors = [];
  const rowNum = rowIndex + 1;
  if (!row["Name"]?.toString().trim()) {
    errors.push({ row: rowNum, field: "Name", message: "Name is required", data: row });
  }
  if (!row["Army Number"]?.toString().trim()) {
    errors.push({ row: rowNum, field: "Army Number", message: "Army Number is required", data: row });
  }
  if (!row["Rank"]?.toString().trim()) {
    errors.push({ row: rowNum, field: "Rank", message: "Rank is required", data: row });
  }
  if (!row["Trade"]?.toString().trim()) {
    errors.push({ row: rowNum, field: "Trade", message: "Trade is required", data: row });
  }
  if (row["Squad Number"] === undefined || row["Squad Number"] === null || row["Squad Number"] === "") {
    errors.push({ row: rowNum, field: "Squad Number", message: "Squad Number is required", data: row });
  } else if (isNaN(Number(row["Squad Number"]))) {
    errors.push({ row: rowNum, field: "Squad Number", message: "Squad Number must be a number", data: row });
  }
  const contact = row["Contact Number"]?.toString().trim();
  if (!contact) {
    errors.push({ row: rowNum, field: "Contact Number", message: "Contact Number is required", data: row });
  } else if (!/^[0-9]{10}$/.test(contact)) {
    errors.push({ row: rowNum, field: "Contact Number", message: "Contact Number must be exactly 10 digits", data: row });
  }
  if (!row["Address"]?.toString().trim()) {
    errors.push({ row: rowNum, field: "Address", message: "Address is required", data: row });
  }
  if (!row["Course Name"]?.toString().trim()) {
    errors.push({ row: rowNum, field: "Course Name", message: "Course Name is required", data: row });
  }
  return errors;
};

exports.resolveRelationships = (rows, trades, courses) => {
  const resolvedRows = [];
  const errors = [];
  const tradeMap = new Map();
  trades.forEach((t) => {
    const name = t.name || t.label || "";
    if (name) tradeMap.set(name.toLowerCase(), t._id);
  });
  const courseMap = new Map();
  courses.forEach((c) => {
    const name = c.courseName || "";
    if (name) courseMap.set(name.toLowerCase(), c._id);
  });

  rows.forEach((row, index) => {
    const resolvedRow = { ...row };
    const rowErrors = [];
    if (row["Trade"]) {
      const tradeId = tradeMap.get(row["Trade"].toString().trim().toLowerCase());
      if (!tradeId) {
        rowErrors.push({
          row: index + 2,
          field: "Trade",
          message: `Trade "${row["Trade"]}" not found`,
          data: row,
        });
      } else {
        resolvedRow.tradeId = [tradeId];
      }
    }
    if (row["Course Name"]) {
      const courseId = courseMap.get(row["Course Name"].toString().trim().toLowerCase());
      if (!courseId) {
        rowErrors.push({
          row: index + 2,
          field: "Course Name",
          message: `Course "${row["Course Name"]}" not found`,
          data: row,
        });
      } else {
        resolvedRow.courseName = [courseId];
      }
    }
    if (rowErrors.length > 0) errors.push(...rowErrors);
    else resolvedRows.push(resolvedRow);
  });
  return { resolvedRows, errors };
};

exports.convertRowToAgniveer = (row) => ({
  name: row["Name"]?.toString().trim() || "",
  armyNumber: row["Army Number"]?.toString().trim() || "",
  rank: row["Rank"]?.toString().trim() || "",
  tradeId: row.tradeId || [],
  squadNumber: Number(row["Squad Number"]) || 0,
  civilEdn: row["Civil Education"]?.toString().trim() || "",
  anyOtherQualification: row["Any Other Qualification"]?.toString().trim() || "",
  fatherName: row["Father Name"]?.toString().trim() || "",
  contactNumber: row["Contact Number"]?.toString().trim() || "",
  address: row["Address"]?.toString().trim() || "",
  courseName: row.courseName || [],
  grade: row["Grade"]?.toString().trim() || null,
});
