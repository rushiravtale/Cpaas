const path = require("path");

/**
 * Trade code to template filename mapping
 * Trade names in DB: Driver, Gunner, Officer, Operator (or OFC)
 */
const TRADE_CODE_MAP = {
  Driver: "DVR",
  Gunner: "GUN",
  Officer: "OFC",
  OFC: "OFC",
  Ofc: "OFC",
  Operator: "OPR",
};

/**
 * Get template path for a trade
 * @param {string} tradeCode - DVR | GUN | OFC | OPR
 * @returns {string} Absolute path to template file
 */
function getTemplatePath(tradeCode) {
  const templatesDir = path.join(__dirname, "..", "..", "templates", "excel");
  const filename = `CPAAS_${tradeCode}_template.xlsx`;
  return path.join(templatesDir, filename);
}

/**
 * Get trade code from trade name or ID (requires trade lookup)
 * @param {string} tradeName - Driver | Gunner | Officer | OFC | Operator
 * @returns {string} DVR | GUN | OFC | OPR
 */
function getTradeCodeFromName(tradeName) {
  if (!tradeName) return null;
  const name = String(tradeName).trim();
  return TRADE_CODE_MAP[name] || null;
}

/**
 * Column indices for each trade (0-based).
 * Row 3 has main headers, Row 4 has sub-headers for BPET/PPT/Practical.
 * Data starts at row 5 (DVR/OFC/OPR) or row 6 (GUN - has extra row).
 */
const COLUMN_MAP = {
  // Common across all trades (cols 0-13)
  common: {
    TRADE: 0,
    COURSE_BATCH_NO: 1,
    FROM: 2,
    TO: 3,
    ARMY_NO: 4,
    RANK: 5,
    NAME: 6,
    UNIT: 7,
    SQUAD_NUMBER: 8,
    CIVIL_EDUCATION: 9,
    ANY_OTHER_QUALIFICATION: 10,
    FATHER_NAME: 11,
    CONTACT_NO: 12,
    ADDRESS: 13,
  },
  // BPET (cols 14-18) - same for all
  bpet: {
    fiveKmRun: 14,
    sixtyMeterSprint: 15,
    horizontalRope: 16,
    verticalRope: 17,
    nineFeetDitch: 18,
  },
  // PPT (cols 19-24) - same for all
  ppt: {
    twoPointFourKm: 19,
    chinUps: 20,
    toeTouch: 21,
    fiveMeterShuttle: 22,
    sitUps: 23,
    sprint100m: 24,
  },
  // Theoretical (cols 25-26) - same for all
  theoretical: {
    writtenScore: 25,
    quizScore: 26,
  },
};

/**
 * Trade-specific practical column mappings (export: col -> schemaPath, import: schemaPath -> col)
 */
const PRACTICAL_COLUMNS = {
  DVR: {
    dataStartRow: 5,
    // practTest1, smlTest, practTest2, drivingTest
    idenOfParts: 27, // practTest1
    sysTraceOut: 28,
    viva: 29,
    trackWithObst: 30, // smlTest
    tatraLoading: 31,
    blt: 32,
    rollingStock: 33,
    flotation: 34,
    fillingChecking: 35, // practTest2
    greasing: 36,
    tote: 37,
    xCountry: 38, // drivingTest
    obst: 39,
  },
  GUN: {
    dataStartRow: 5, // GUN has 6 header rows
    // pkt, eqptph, gunph, mslph, ims, fdfiring
    pktSa: 27,
    pktIdenOfParts: 28,
    opStabSys: 29,
    opGnrSi: 30,
    opSmkSys: 31,
    eqptphIdenOfParts: 32,
    gunphSa: 33,
    gunphIdenOfParts: 34,
    mslFiringCct: 35,
    mslphIdenOfParts: 36,
    atgm: 37,
    gun: 38,
    pkt: 39,
    msl: 40,
  },
  OFC: {
    dataStartRow: 5,
    // rscnr900m, rsStarsVMk2, dch, rtProc, bfsr, misc
    clrMode: 27,
    secMode: 28,
    ajMode: 29,
    clrComn: 30,
    secComn: 31,
    fh2Comm: 32,
    idSelection: 33,
    byt: 34,
    sigStrReportSheet: 35,
    useOfCode: 36,
    installation: 37,
    initialisation: 38,
    orientation: 39,
    drawMap: 40,
    idenOfParts: 41,
    outDoorEx: 42,
  },
  OPR: {
    dataStartRow: 5,
    // rscnr100, rsStarsVMk, dch, rtProc, rsVrc, byt, misc
    clrMode: 27,
    secMode: 28,
    ajMode: 29,
    clrComn: 30,
    secComn: 31,
    fh2Comm: 32,
    idsel: 33,
    srComn: 34,
    tele: 35,
    sigStrReportSheet: 36,
    useOfCode: 37,
    viva: 38,
    dualFreq: 39,
    seriesParallel: 40,
    idenOfParts: 41,
    outDoorEx: 42,
  },
};

/**
 * Tech phase model name per trade
 */
const TECH_PHASE_MODEL = {
  DVR: "driverTechPhase",
  GUN: "gunnerTechPhase",
  OFC: "ofcTechPhase",
  OPR: "operatorTechPhase",
};

module.exports = {
  TRADE_CODE_MAP,
  getTemplatePath,
  getTradeCodeFromName,
  COLUMN_MAP,
  PRACTICAL_COLUMNS,
  TECH_PHASE_MODEL,
};
