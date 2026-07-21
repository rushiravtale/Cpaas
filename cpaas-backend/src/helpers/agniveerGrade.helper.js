const {
  getOrdinalRank,
  capitalizeFirstLetter,
} = require("./commonFunction.helper");

// Bands: A >70%; B 60–70%; C 50–60%; E 40–50%; Fail (D) <40%
const calculateGrade = (finalScore, maxTotalScore) => {
  console.log("calculateGrade", finalScore, maxTotalScore);
  const percentage = (finalScore / maxTotalScore) * 100;
  if (percentage > 70 && percentage <= 100) {
    return "A";
  }
  if (percentage >= 60 && percentage <= 70) {
    return "B";
  }
  if (percentage >= 50 && percentage < 60) {
    return "C";
  }
  if (percentage >= 40 && percentage < 50) {
    return "E";
  }
  if (percentage >= 0 && percentage < 40) {
    return "D";
  }
  return "Invalid Percentage";
};

const getRatingText = (value, max) => {
  if (!max || value == null) return "N/A";

  const percentage = (value / max) * 100;

  if (percentage >= 70) return "Above Average";
  if (percentage >= 50) return "Average";
  if (percentage >= 40) return "Below Average";
  return "Fail";
};

const percentage = (obtained, total) =>
  Number(((obtained / total) * 100).toFixed(1));

/** 1=Fail, 2=Satisfactory, 3=Good, 4=Excellent. Used for "take the lower one" physical proficiency grading. */
const numericToRating = (n) => {
  if (n == null || n === undefined) return "N/A";
  const num = Number(n);
  if (num === 1) return "Fail";
  if (num === 2) return "Satisfactory";
  if (num === 3) return "Good";
  if (num === 4) return "Excellent";
  return "N/A";
};

const calculatePhyscialProficinecyGrade = (
  bpet = {},
  ppt = {},
  maxTotalPhyscialPerformance,
  maxTotalBpetPerformance,
  maxTotalPptPerformance,
) => {
  const {
    fiveKmRun,
    sixtyMeterSprint,
    horizontalRope,
    verticalRope,
    nineFeetDitch,
  } = bpet || {};
  const {
    twoPointFourKm,
    chinUps,
    toeTouch,
    sitUps,
    sprint100m,
    fiveMeterShuttle,
  } = ppt || {};

  // Sum-based totals (kept for "X/Y" display and percentage)
  const totalBpet =
    (fiveKmRun ?? 0) +
    (sixtyMeterSprint ?? 0) +
    (horizontalRope ?? 0) +
    (verticalRope ?? 0) +
    (nineFeetDitch ?? 0);
  const totalPpt =
    (twoPointFourKm ?? 0) +
    (chinUps ?? 0) +
    (toeTouch ?? 0) +
    (sitUps ?? 0) +
    (sprint100m ?? 0) +
    (fiveMeterShuttle ?? 0);
  const total = totalBpet + totalPpt;
  // Calculate max scores dynamically to prevent > 100% issues
  const calcMaxBpet = 20; // 5 items * 4
  const calcMaxPpt = 24; // 6 items * 4
  const calcMaxTotal = calcMaxBpet + calcMaxPpt; // 44

  const overallPercentage = (total / calcMaxTotal) * 100;

  // Min-based ratings: "take the lower one"
  const bpetValues = [
    fiveKmRun,
    sixtyMeterSprint,
    horizontalRope,
    verticalRope,
    nineFeetDitch,
  ].filter((v) => v != null && v !== undefined);
  const pptValues = [
    twoPointFourKm,
    chinUps,
    toeTouch,
    sitUps,
    sprint100m,
    fiveMeterShuttle,
  ].filter((v) => v != null && v !== undefined);

  const bpetMin = bpetValues.length > 0 ? Math.min(...bpetValues) : null;
  const pptMin = pptValues.length > 0 ? Math.min(...pptValues) : null;
  const bpetRating = numericToRating(bpetMin);
  const pptRating = numericToRating(pptMin);

  const overallMin =
    bpetMin != null && pptMin != null
      ? Math.min(bpetMin, pptMin)
      : (bpetMin ?? pptMin);
  const overallRating = numericToRating(overallMin);

  const result = {
    categories: [
      {
        type: "BPET",
        total: totalBpet,
        maxTotal: calcMaxBpet,
        rating: bpetRating,
      },
      {
        type: "PPT",
        total: totalPpt,
        maxTotal: calcMaxPpt,
        rating: pptRating,
      },
    ],
    overall: {
      total,
      maxTotal: calcMaxTotal,
      percentage: overallPercentage,
      rating: overallRating,
    },
  };

  return result;
};

const calculateGunnerTechPhase = (data, tradeData) => {
  console.log("calculateGunnerTechPhase", data);

  let writtenRatingText = getRatingText(
    data?.theoretical?.writtenScore,
    data?.theoretical?.maxWrittenScore,
  );
  let QuizRatingText = getRatingText(
    data?.theoretical?.quizScore,
    data?.theoretical?.maxQuizScore,
  );

  let totalTheoriticalRating = getRatingText(
    data?.totalTheoreticalScore,
    data?.maxTheoraticalScore,
  );
  let totalPracticalRating = getRatingText(
    data?.totalPracticalScore,
    data?.maxPracticalScore,
  );
  let overallRating = getRatingText(
    data?.totalTheoreticalScore + data?.totalPracticalScore,
    data?.maxTheoraticalScore + data?.maxPracticalScore,
  );
  const result = {
    theoretical: [
      {
        type: "Written Examination",
        total: data?.theoretical?.writtenScore,
        maxTotal: data?.theoretical?.maxWrittenScore,
        percentage: percentage(
          data?.theoretical?.writtenScore,
          data?.theoretical?.maxWrittenScore,
        ),
        rating: writtenRatingText,
      },
      {
        type: "Quiz Assessment",
        total: data?.theoretical?.quizScore,
        maxTotal: data?.theoretical?.maxQuizScore,
        percentage: percentage(
          data?.theoretical?.quizScore,
          data?.theoretical?.maxQuizScore,
        ),
        rating: QuizRatingText,
      },
    ],

    practical: [
      {
        type: "PKT",
        total:
          data?.practical?.pkt?.saScore +
          data?.practical?.pkt?.idenOfPartsScore,
        maxTotal:
          data?.practical?.pkt?.maxsaScore +
          data?.practical?.pkt?.maxIdenOfPartsScore,
        // percentage:
        //   (data?.theoretical?.writtenScore /
        //     data?.theoretical?.maxWrittenScore) *
        //   100,
        // rating: writtenRatingText,
      },
      {
        type: "EQPT PH",
        total:
          (data?.practical?.eqptph?.opStabSys || 0) +
          (data?.practical?.eqptph?.opGnrSi || 0) +
          (data?.practical?.eqptph?.opSmkSys || 0) +
          (data?.practical?.eqptph?.idenOfPartsScore || 0),
        maxTotal:
          (data?.practical?.eqptph?.maxOpStabSys ||
            data?.practical?.eqptph?.defaultMaxOpStabSys ||
            5) +
          (data?.practical?.eqptph?.maxOpGnrSi ||
            data?.practical?.eqptph?.defaultMaxOpGnrSi ||
            6) +
          (data?.practical?.eqptph?.maxOpSmkSys ||
            data?.practical?.eqptph?.defaultMaxOpSmkSys ||
            5) +
          (data?.practical?.eqptph?.maxIdenOfPartsScore ||
            data?.practical?.eqptph?.defaultMaxIdenOfPartsScore ||
            4),
      },
      {
        type: "GUN PH",
        total:
          data?.practical?.gunph?.sa + data?.practical?.gunph?.idenOfPartsScore,
        maxTotal:
          (data?.practical?.gunph?.maxSa ||
            data?.practical?.gunph?.defaultMaxSa ||
            5) +
          (data?.practical?.gunph?.maxIdenOfPartsScore ||
            data?.practical?.gunph?.defaultMaxIdenOfPartsScore ||
            10),
        // percentage:
        //   (data?.theoretical?.writtenScore /
        //     data?.theoretical?.maxWrittenScore) *
        //   100,
        // rating: writtenRatingText,
      },
      {
        type: "MSL PH",
        total:
          (data?.practical?.mslph?.msl || 0) +
          (data?.practical?.mslph?.idenOfPartsScore || 0),
        maxTotal:
          (data?.practical?.mslph?.maxMsl ||
            data?.practical?.mslph?.defaultMaxMsl ||
            5) +
          (data?.practical?.mslph?.maxIdenOfPartsScore ||
            data?.practical?.mslph?.defaultMaxIdenOfPartsScore ||
            10),
      },
      {
        type: "IMS",
        total: data?.practical?.ims?.atgm,
        maxTotal: data?.practical?.ims?.maxAtgm,
        // percentage:
        //   (data?.theoretical?.writtenScore /
        //     data?.theoretical?.maxWrittenScore) *
        //   100,
        // rating: writtenRatingText,
      },
      {
        type: "FD FIRING",
        total:
          data?.practical?.fdfiring?.gun +
          data?.practical?.fdfiring?.pkt +
          data?.practical?.fdfiring?.msl,
        maxTotal:
          (data?.practical?.fdfiring?.maxGun ||
            data?.practical?.fdfiring?.defaultMaxGun ||
            15) +
          (data?.practical?.fdfiring?.maxPkt ||
            data?.practical?.fdfiring?.defaultMaxPkt ||
            10) +
          (data?.practical?.fdfiring?.maxMsl ||
            data?.practical?.fdfiring?.defaultMaxMsl ||
            15),
        // percentage:
        //   (data?.theoretical?.writtenScore /
        //     data?.theoretical?.maxWrittenScore) *
        //   100,
        // rating: writtenRatingText,
      },
    ],
    overallPractical: {
      total: data?.totalPracticalScore,
      maxTotal: data?.maxPracticalScore,
      percentage: data?.practical?.practicalPercentage,
      position: data?.practical?.practicalRank,
      rating: totalPracticalRating,
      // position: 7,
      practicalLabel: `${tradeData} practical`,
    },
    overallTheoretical: {
      total: data?.totalTheoreticalScore,
      maxTotal: data?.maxTheoraticalScore,
      percentage: data?.theoretical?.theoreticalPercentage,
      position: data?.theoretical?.theoreticalRank,
      rating: totalTheoriticalRating,
      // position: 8,
    },

    overall: {
      total: data?.totalTheoreticalScore + data?.totalPracticalScore,
      maxTotal: data?.maxTheoraticalScore + data?.maxPracticalScore,
      percentage: data?.overallPercentage,
      position: data?.overallRank,
      rating: overallRating,
      // position: 10,
    },
  };
  console.log("result", result);

  return result;
};

const calculateDriverTechPhase = (data, tradeData) => {
  console.log("calculateDriverTechPhase", data);
  let writtenRatingText = getRatingText(
    data?.theoretical?.writtenScore,
    data?.theoretical?.maxWrittenScore,
  );
  let QuizRatingText = getRatingText(
    data?.theoretical?.quizScore,
    data?.theoretical?.maxQuizScore,
  );

  let totalTheoriticalRating = getRatingText(
    data?.totalTheoreticalScore,
    data?.maxTheoraticalScore,
  );
  let overallRating = getRatingText(
    data?.totalTheoreticalScore + data?.totalPracticalScore,
    data?.maxTheoraticalScore + data?.maxPracticalScore,
  );

  const result = {
    theoretical: [
      {
        type: "Written Examination",
        total: data?.theoretical?.writtenScore,
        maxTotal: data?.theoretical?.maxWrittenScore,
        percentage: percentage(
          data?.theoretical?.writtenScore,
          data?.theoretical?.maxWrittenScore,
        ),
        rating: writtenRatingText,
      },
      {
        type: "Quiz Assessment",
        total: data?.theoretical?.quizScore,
        maxTotal: data?.theoretical?.maxQuizScore,
        percentage: percentage(
          data?.theoretical?.quizScore,
          data?.theoretical?.maxQuizScore,
        ),
        rating: QuizRatingText,
      },
    ],

    practical: [
      {
        type: "PRAC TEST-I",
        total:
          data?.practical?.practTest1?.idenOfPartsScore +
          data?.practical?.practTest1?.sysTraceOut +
          data?.practical?.practTest1?.viva,
        maxTotal:
          data?.practical?.practTest1?.maxIdenOfPartsScore +
          data?.practical?.practTest1?.maxSysTraceOut +
          data?.practical?.practTest1?.maxViva,
        // percentage:
        //   (data?.theoretical?.writtenScore /
        //     data?.theoretical?.maxWrittenScore) *
        //   100,
        // rating: writtenRatingText,
      },
      {
        type: "SML TEST",
        total:
          data?.practical?.smlTest?.trackWithObst +
          data?.practical?.smlTest?.blt +
          data?.practical?.smlTest?.tatraLoading +
          data?.practical?.smlTest?.rollingStock +
          data?.practical?.smlTest?.flotation,
        maxTotal:
          data?.practical?.smlTest?.maxTrackWithObst +
          data?.practical?.smlTest?.maxTatraLoading +
          data?.practical?.smlTest?.maxBlt +
          data?.practical?.smlTest?.maxRollingStock +
          data?.practical?.smlTest?.maxFlotation,
        // percentage:
        //   (data?.theoretical?.writtenScore /
        //     data?.theoretical?.maxWrittenScore) *
        //   100,
        // rating: writtenRatingText,
      },
      {
        type: "PRAC TEST-II",
        total:
          data?.practical?.practTest2?.tote +
          data?.practical?.practTest2?.fillingChecking +
          data?.practical?.practTest2?.greasing,
        maxTotal:
          data?.practical?.practTest2?.maxTote +
          data?.practical?.practTest2?.maxFillingChecking +
          data?.practical?.practTest2?.maxGreasing,
        // percentage:
        //   (data?.theoretical?.writtenScore /
        //     data?.theoretical?.maxWrittenScore) *
        //   100,
        // rating: writtenRatingText,
      },
      {
        type: "DRIVING TEST",
        total:
          data?.practical?.drivingTest?.xCountry +
          data?.practical?.drivingTest?.obst,
        maxTotal:
          data?.practical?.drivingTest?.maxXCountry +
          data?.practical?.drivingTest?.maxObst,
        // percentage:
        //   (data?.theoretical?.writtenScore /
        //     data?.theoretical?.maxWrittenScore) *
        //   100,
        // rating: writtenRatingText,
      },
    ],

    overallTheoretical: {
      total: data?.totalTheoreticalScore,
      maxTotal: data?.maxTheoraticalScore,
      percentage: data?.theoretical?.theoreticalPercentage,
      position: data?.theoretical?.theoreticalRank,
      rating: totalTheoriticalRating,
      // position: 8,
    },
    overallPractical: {
      total: data?.totalPracticalScore,
      maxTotal: data?.maxPracticalScore,
      percentage: data?.practical?.practicalPercentage,
      position: data?.practical?.practicalRank,
      rating: getRatingText(data?.totalPracticalScore, data?.maxPracticalScore),
      // position: 7,
      practicalLabel: `${tradeData} practical`,
    },

    overall: {
      total: data?.totalTheoreticalScore + data?.totalPracticalScore,
      maxTotal: data?.maxTheoraticalScore + data?.maxPracticalScore,
      percentage: data?.overallPercentage,
      position: data?.overallRank,
      rating: overallRating,
      // position: 10,
    },
  };

  return result;
};

const calculateOperatorTechPhase = (data, tradeData) => {
  console.log("calculateOperatorTechPhase", data);

  let writtenRatingText = getRatingText(
    data?.theoretical?.writtenScore,
    data?.theoretical?.maxWrittenScore,
  );
  let QuizRatingText = getRatingText(
    data?.theoretical?.quizScore,
    data?.theoretical?.maxQuizScore,
  );

  let totalTheoriticalRating = getRatingText(
    data?.totalTheoreticalScore,
    data?.maxTheoraticalScore,
  );
  let overallRating = getRatingText(
    data?.totalTheoreticalScore + data?.totalPracticalScore,
    data?.maxTheoraticalScore + data?.maxPracticalScore,
  );

  const result = {
    theoretical: [
      {
        type: "Written Examination",
        total: data?.theoretical?.writtenScore,
        maxTotal: data?.theoretical?.maxWrittenScore,
        percentage: percentage(
          data?.theoretical?.writtenScore,
          data?.theoretical?.maxWrittenScore,
        ),
        rating: writtenRatingText,
      },
      {
        type: "Quiz Assessment",
        total: data?.theoretical?.quizScore,
        maxTotal: data?.theoretical?.maxQuizScore,
        percentage: percentage(
          data?.theoretical?.quizScore,
          data?.theoretical?.maxQuizScore,
        ),
        rating: QuizRatingText,
      },
    ],
    practical: [
      {
        type: "RS CNR 900M",
        total:
          (data?.practical?.rscnr100?.clrMode ?? 0) +
          (data?.practical?.rscnr100?.secMode ?? 0) +
          (data?.practical?.rscnr100?.ajMode ?? 0),
        maxTotal:
          (data?.practical?.rscnr100?.maxClrMode ?? 5) +
          (data?.practical?.rscnr100?.maxSecMode ?? 10) +
          (data?.practical?.rscnr100?.maxAjMode ?? 10),
        // percentage:
        //   (data?.theoretical?.writtenScore /
        //     data?.theoretical?.maxWrittenScore) *
        //   100,
        // rating: writtenRatingText,
      },
      {
        type: "RS STAR V MK-II",
        total:
          (data?.practical?.rsStarsVMk?.clrComn ?? 0) +
          (data?.practical?.rsStarsVMk?.secComn ?? 0) +
          (data?.practical?.rsStarsVMk?.fh2Comm ?? 0),
        maxTotal:
          (data?.practical?.rsStarsVMk?.maxClrComn ?? 5) +
          (data?.practical?.rsStarsVMk?.maxSecComn ?? 10) +
          (data?.practical?.rsStarsVMk?.maxFh2Comm ?? 10),
        // percentage:
        //   (data?.theoretical?.writtenScore /
        //     data?.theoretical?.maxWrittenScore) *
        //   100,
        // rating: writtenRatingText,
      },
      {
        type: "DCH",
        total:
          (data?.practical?.dch?.idsel ?? 0) +
          (data?.practical?.dch?.srComn ?? 0) +
          (data?.practical?.dch?.tele ?? 0),
        maxTotal:
          (data?.practical?.dch?.maxIdsel ?? 5) +
          (data?.practical?.dch?.maxSrComn ?? 5) +
          (data?.practical?.dch?.maxTele ?? 10),
        // percentage:
        //   (data?.theoretical?.writtenScore /
        //     data?.theoretical?.maxWrittenScore) *
        //   100,
        // rating: writtenRatingText,
      },
      {
        type: "RT PROC",
        total:
          (data?.practical?.rtProc?.sigStrReportSheet ?? 0) +
          (data?.practical?.rtProc?.useOfCode ?? 0) +
          (data?.practical?.rtProc?.viva ?? 0),
        maxTotal:
          (data?.practical?.rtProc?.maxSigStrReportSheet ?? 5) +
          (data?.practical?.rtProc?.maxUseOfCode ?? 10) +
          (data?.practical?.rtProc?.maxViva ?? 5),
        // percentage:
        //   (data?.theoretical?.writtenScore /
        //     data?.theoretical?.maxWrittenScore) *
        //   100,
        // rating: writtenRatingText,
      },
      {
        type: "RS VRC",
        total: data?.practical?.rsVrc?.dualFreq ?? 0,
        maxTotal: data?.practical?.rsVrc?.maxDualFreq ?? 5,
        // percentage:
        //   (data?.theoretical?.writtenScore /
        //     data?.theoretical?.maxWrittenScore) *
        //   100,
        // rating: writtenRatingText,
      },
      {
        type: "BTY",
        total:
          data?.practical?.byt?.seriesParallel ??
          (data?.practical?.byt?.series != null ||
          data?.practical?.byt?.parallel != null
            ? (data?.practical?.byt?.series ?? 0) +
              (data?.practical?.byt?.parallel ?? 0)
            : 0),
        maxTotal:
          data?.practical?.byt?.maxSeriesParallel ??
          data?.practical?.byt?.defaultMaxSeriesParallel ??
          5,
      },
      {
        type: "MISC",
        total:
          (data?.practical?.misc?.idenOfParts ?? 0) +
          (data?.practical?.misc?.outDoorEx ?? 0),
        maxTotal:
          (data?.practical?.misc?.maxIdenOfParts ?? 10) +
          (data?.practical?.misc?.MaxOutDoorEx ?? 10),
        // percentage:
        //   (data?.theoretical?.writtenScore /
        //     data?.theoretical?.maxWrittenScore) *
        //   100,
        // rating: writtenRatingText,
      },
    ],

    overallTheoretical: {
      total: data?.totalTheoreticalScore,
      maxTotal: data?.maxTheoraticalScore,
      percentage: data?.theoretical?.theoreticalPercentage,
      position: data?.theoretical?.theoreticalRank,
      rating: totalTheoriticalRating,
      // position: 8,
    },

    overallPractical: {
      total: data?.totalPracticalScore,
      maxTotal: data?.maxPracticalScore,
      percentage: data?.practical?.practicalPercentage,
      position: data?.practical?.practicalRank,
      rating: getRatingText(data?.totalPracticalScore, data?.maxPracticalScore),
      // position: 8,
      practicalLabel: `${tradeData} practical`,
    },

    overall: {
      total: data?.totalTheoreticalScore + data?.totalPracticalScore,
      maxTotal: data?.maxTheoraticalScore + data?.maxPracticalScore,
      percentage: data?.overallPercentage,
      position: data?.overallRank,
      rating: overallRating,
      // position: 10,
    },
  };

  return result;
};

const calculateOfcTechPhase = (data, tradeData) => {
  console.log("calculateOfcTechPhase", data);

  let writtenRatingText = getRatingText(
    data?.theoretical?.writtenScore,
    data?.theoretical?.maxWrittenScore,
  );
  let QuizRatingText = getRatingText(
    data?.theoretical?.quizScore,
    data?.theoretical?.maxQuizScore,
  );

  let totalTheoriticalRating = getRatingText(
    data?.totalTheoreticalScore,
    data?.maxTheoraticalScore,
  );
  let overallRating = getRatingText(
    data?.totalTheoreticalScore + data?.totalPracticalScore,
    data?.maxTheoraticalScore + data?.maxPracticalScore,
  );

  const result = {
    theoretical: [
      {
        type: "Written Examination",
        total: data?.theoretical?.writtenScore,
        maxTotal: data?.theoretical?.maxWrittenScore,
        percentage: percentage(
          data?.theoretical?.writtenScore,
          data?.theoretical?.maxWrittenScore,
        ),
        rating: writtenRatingText,
      },
      {
        type: "Quiz Assessment",
        total: data?.theoretical?.quizScore,
        maxTotal: data?.theoretical?.maxQuizScore,
        percentage: percentage(
          data?.theoretical?.quizScore,
          data?.theoretical?.maxQuizScore,
        ),
        rating: QuizRatingText,
      },
    ],
    practical: [
      {
        type: "RS CNR 900M",
        total:
          (data?.practical?.rscnr900m?.clrMode ?? 0) +
          (data?.practical?.rscnr900m?.secMode ?? 0) +
          (data?.practical?.rscnr900m?.ajMode ?? 0),
        maxTotal:
          (data?.practical?.rscnr900m?.maxClrMode ?? 5) +
          (data?.practical?.rscnr900m?.maxSecMode ?? 5) +
          (data?.practical?.rscnr900m?.maxAjMode ?? 10),
        // percentage:
        //   (data?.theoretical?.writtenScore /
        //     data?.theoretical?.maxWrittenScore) *
        //   100,
        // rating: writtenRatingText,
      },
      {
        type: "RS STARS V MK-II",
        total:
          (data?.practical?.rsStarsVMk2?.clrComn ?? 0) +
          (data?.practical?.rsStarsVMk2?.secComn ?? 0) +
          (data?.practical?.rsStarsVMk2?.fh2Comm ?? 0),
        maxTotal:
          (data?.practical?.rsStarsVMk2?.maxClrComn ?? 5) +
          (data?.practical?.rsStarsVMk2?.maxSecComn ?? 5) +
          (data?.practical?.rsStarsVMk2?.maxFh2Comm ?? 10),
        // percentage:
        //   (data?.theoretical?.writtenScore /
        //     data?.theoretical?.maxWrittenScore) *
        //   100,
        // rating: writtenRatingText,
      },
      {
        type: "RT PROC",
        total:
          (data?.practical?.rtProc?.sigStrReportSheet ?? 0) +
          (data?.practical?.rtProc?.useOfCode ?? 0),
        maxTotal:
          (data?.practical?.rtProc?.maxSigStrReportSheet ?? 5) +
          (data?.practical?.rtProc?.maxUseOfCode ?? 5),
        // percentage:
        //   (data?.theoretical?.writtenScore /
        //     data?.theoretical?.maxWrittenScore) *
        //   100,
        // rating: writtenRatingText,
      },
      {
        type: "BFSR (SF)/(MR)",
        total:
          (data?.practical?.bfsr?.installation ?? 0) +
          (data?.practical?.bfsr?.initialisation ?? 0) +
          (data?.practical?.bfsr?.orientation ?? 0) +
          (data?.practical?.bfsr?.drawMap ?? 0),
        maxTotal:
          (data?.practical?.bfsr?.maxInstallation ?? 10) +
          (data?.practical?.bfsr?.maxInitialisation ?? 10) +
          (data?.practical?.bfsr?.maxOrientation ?? 10) +
          (data?.practical?.bfsr?.maxDrawMap ?? 10),
        // percentage:
        //   (data?.theoretical?.writtenScore /
        //     data?.theoretical?.maxWrittenScore) *
        //   100,
        // rating: writtenRatingText,
      },

      {
        type: "MISC",
        total:
          (data?.practical?.misc?.idenOfParts ?? 0) +
          (data?.practical?.misc?.outDoorEx ?? 0) +
          (data?.practical?.misc?.byt ?? 0),
        maxTotal:
          (data?.practical?.misc?.maxIdenOfParts ?? 10) +
          (data?.practical?.misc?.MaxOutDoorEx ?? 10) +
          (data?.practical?.misc?.maxByt ?? 5),
        // percentage:
        //   (data?.theoretical?.writtenScore /
        //     data?.theoretical?.maxWrittenScore) *
        //   100,
        // rating: writtenRatingText,
      },
      {
        type: "DCH",
        total: data?.practical?.dch?.idSelection || 0,
        maxTotal: data?.practical?.dch?.maxIdSelection || 5,
      },
    ],
    overallTheoretical: {
      total: data?.totalTheoreticalScore,
      maxTotal: data?.maxTheoraticalScore,
      percentage: data?.theoretical?.theoreticalPercentage,
      position: data?.theoretical?.theoreticalRank,
      rating: totalTheoriticalRating,
      // position: 8,
    },

    overallPractical: {
      total: data?.totalPracticalScore,
      maxTotal: data?.maxPracticalScore,
      percentage: data?.practical?.practicalPercentage,
      position: data?.practical?.practicalRank,
      rating: getRatingText(data?.totalPracticalScore, data?.maxPracticalScore),
      // position: 8,
      practicalLabel: `${tradeData} practical`,
    },

    overall: {
      total: data?.totalTheoreticalScore + data?.totalPracticalScore,
      maxTotal: data?.maxTheoraticalScore + data?.maxPracticalScore,
      percentage: data?.overallPercentage,
      position: data?.overallRank,
      rating: overallRating,
      // position: 10,
    },
  };

  return result;
};
const calculateTechPhaseForIndividualSummary = (data, tradeData) => {
  console.log("calculateTechPhaseForIndividualSummary", data, tradeData);
  let techPhaseData;
  if (tradeData == "Gunner") {
    techPhaseData = calculateGunnerTechPhase(data, tradeData);
  } else if (tradeData == "Driver") {
    techPhaseData = calculateDriverTechPhase(data, tradeData);
  } else if (tradeData == "Operator") {
    techPhaseData = calculateOperatorTechPhase(data, tradeData);
  } else {
    techPhaseData = calculateOfcTechPhase(data, tradeData);
  }
  console.log("techPhaseData", techPhaseData);
  return techPhaseData;
};

const calculateFortNightPerformance = (data) => {
  console.log("calculateFortNightPerformance", data);

  const result = {
    fortNightPerformance: [
      {
        type: "PHYSICAL TRAINING",
        ...data?.physicalTraining,
      },
      {
        type: "CLASS PERFORMANCE",
        ...data?.classPerformance,
      },
      {
        type: "PERFORMANCE IN GAMES/SPORTS",
        ...data?.gamesPerformance,
      },

      {
        type: "MORALE",
        ...data?.morale,
      },

      {
        type: "MOTIVATION LEVEL",
        ...data?.motivationLevel,
      },

      {
        type: "DECISION MAKING/SOUND JUDGEMENT",
        ...data?.decisionMaking,
      },

      {
        type: "MILITARY BEARING",
        ...data?.militaryBearing,
      },

      {
        type: "RESILIENCE/MENTAL TOUGHNESS(Grit)",
        ...data?.resilience,
      },

      {
        type: "SITUATIONAL AWARENESS",
        ...data?.situationalAwareness,
      },

      {
        type: "INTEGRITY",
        ...data?.integrity,
      },
    ],
    overall: {
      total: data?.totalFortnightPerformance,
      maxTotal: data?.maxTotalFortnightPerformance,
      percentage: percentage(
        data?.totalFortnightPerformance,
        data?.maxTotalFortnightPerformance,
      ),
      rating: getRatingText(
        data?.totalFortnightPerformance,
        data?.maxTotalFortnightPerformance,
      ),
      // position: 8,
    },
  };

  console.log("result", result);
  return result;
};

const calculateOverAll = (techPhase, physicalFitness, fortNightly) => {
  console.log("techPhase", techPhase);
  console.log("physicalFitness", physicalFitness);
  console.log("fortNightly", fortNightly);
  let totalMarks =
    techPhase?.overallPractical?.total +
    techPhase?.overallTheoretical?.total +
    physicalFitness?.overall?.total +
    fortNightly?.overall?.total;
  let maxTotalMarks =
    techPhase?.overallPractical?.maxTotal +
    techPhase?.overallTheoretical?.maxTotal +
    physicalFitness?.overall?.maxTotal +
    fortNightly?.overall?.maxTotal;

  let overallPosition = 8;

  let overAllRating = getRatingText(totalMarks, maxTotalMarks);
  let overAllPercentage = percentage(totalMarks, maxTotalMarks);

  let overAllPerformance = {
    overAllRating,
    overAllPercentage,
    // overallPosition,
    totalMarks,
    maxTotalMarks,
  };
  console.log("overAllPerformance", overAllPerformance);
  return overAllPerformance;
};

const penPicture = (data, trade, resAgniveer, techPhaseDataCount) => {
  console.log("techPhaseDataCount", techPhaseDataCount);

  const { techPhase, physicalFitness, fortNightly, calculateOverAllData } =
    data;

  // --- TECH ---
  const { overallPractical, overallTheoretical, overall } = techPhase;

  // --- PHYSICAL ---
  const { overall: physicalOverall } = physicalFitness;

  const {
    percentage: physicalPercentage,
    rating: physicalRating,
    position: physicalPosition,
  } = physicalOverall;

  // --- FORTNIGHT ---
  const { fortNightPerformance, overall: fortNightOverall } = fortNightly;
  console.log("overallPractical", fortNightPerformance);

  const physcialAspect = fortNightPerformance.find(
    (i) => i.type === "PHYSICAL TRAINING",
  )?.remark;

  const motivation = fortNightPerformance.find(
    (i) => i.type === "MOTIVATION LEVEL",
  )?.remark;

  const awareness = fortNightPerformance.find(
    (i) => i.type === "SITUATIONAL AWARENESS",
  )?.remark;

  const decision = fortNightPerformance.find(
    (i) => i.type === "DECISION MAKING/SOUND JUDGEMENT",
  )?.remark;

  const resilience = fortNightPerformance.find(
    (i) => i.type === "RESILIENCE/MENTAL TOUGHNESS(Grit)",
  )?.remark;

  console.log("resilience", resilience);
  console.log("decision", decision);
  console.log("awareness", awareness);
  console.log("motivation", motivation);
  console.log("physcialAspect", physcialAspect);

  // --- FINAL OVERALL ---
  const {
    overAllRating,
    overAllPercentage,
    overallPosition,
    totalMarks,
    maxTotalMarks,
  } = calculateOverAllData;

  // --- DETERMINE PERFORMANCE CATEGORY ---
  let performanceCategory;
  let bgColor;
  let headerBgColor;

  if (overAllPercentage >= 70) {
    performanceCategory = "excellent";
    bgColor = "#e6eeff"; // Light blue background
    headerBgColor = "#0049D0"; // Blue header
  } else if (overAllPercentage >= 50) {
    performanceCategory = "average";
    bgColor = "#fdf8e6"; // Light gold/yellow background
    headerBgColor = "#c69c2b"; // Gold header
  } else if (overAllPercentage >= 40) {
    performanceCategory = "belowAverage";
    bgColor = "#fff3e6"; // Light orange background
    headerBgColor = "#FF8C00"; // Orange header
  } else {
    performanceCategory = "fail";
    bgColor = "#ffe6e6"; // Light red background
    headerBgColor = "#e53935"; // Red header
  }

  // --- GENERATE PERFORMANCE-SPECIFIC CONTENT ---
  // --- GENERATE PERFORMANCE-SPECIFIC CONTENT ---
  let html;

  // Common styles are now handled by CSS class .pen-card and .pen-picture-header
  // Removing inline styles and sub-headers as requested.

  // --- GENERATE PHYSICAL DESCRIPTION DYNAMICALLY ---
  let physicalDescription = "";
  const pRating = String(physicalRating).toLowerCase();

  if (pRating === "excellent") {
    physicalDescription =
      "displayed <b><u>Excellent</u></b> standards in physical aspects";
  } else if (pRating === "fail") {
    physicalDescription = "<b><u>Failed</u></b> in physical aspects.";
  } else {
    physicalDescription = `demonstrated <b><u>${formatRating(physicalRating)}</u></b> performance in physical aspects`;
  }

  if (performanceCategory === "excellent") {
    // EXCELLENT TEMPLATE
    html = `
 <div class="pen-card pen-${performanceCategory}">
  <h2>PEN PICTURE</h2>
  
  <p style="text-align: justify;">
    Agniveer <b>${resAgniveer.armyNumber}</b> has ${physicalDescription}. His level of motivation is <b><u>${formatRating(motivation)}</u></b> with
    his situational awareness assessed as <b><u>${formatRating(awareness)}</u></b>. The individuals
    decision-making ability is <b><u>${formatRating(decision)}</u></b>
    complemented by <b><u>${formatRating(resilience)}</u></b> resilience and the ability to perform
    effectively under demanding conditions.
  </p>

  <p style="text-align: justify;">
    The individual has performed <b><u>${formatRating(overallTheoretical?.rating)}</u></b> in the theoretical phase and
    stood <b><u>${getOrdinalRank(overallTheoretical?.position)}</u></b> out of ${techPhaseDataCount} Agniveers. He
    has performed <b><u>${formatRating(overallPractical?.rating)}</u></b> in the
    practical phase and secured <b><u>${getOrdinalRank(overallPractical?.position)}</u></b>
    position out of ${techPhaseDataCount} Agniveers.
  </p>

  <p style="text-align: justify;">
    Overall, the individual stood <b><u>${getOrdinalRank(overall?.position)}</u></b> out of
    ${techPhaseDataCount} Agniveers. He exhibits strong
    professional potential and has the
    ability to become a proficient <b>${trade.toUpperCase()}</b>.
  </p>
</div>
    `;
  } else if (performanceCategory === "average") {
    // AVERAGE TEMPLATE
    html = `
 <div class="pen-card pen-${performanceCategory}">
  <h2>PEN PICTURE</h2>

  <p style="text-align: justify;">
    Agniveer <b>${resAgniveer.armyNumber}</b> has ${physicalDescription}. The individual exhibits an <b><u>${formatRating(motivation)}</u></b> level of motivation along with
    <b><u>${formatRating(awareness)}</u></b> degree of situational
    awareness. His decision making
    capability is assessed as <b><u>${formatRating(decision)}</u></b>,
    supported by <b><u>${formatRating(resilience)}</u></b> resilience
    under varying conditions.
  </p>

  <p style="text-align: justify;">
    The individual has performed <b><u>${formatRating(overallTheoretical?.rating)}</u></b> in the theoretical phase and
    stood <b><u>${getOrdinalRank(overallTheoretical?.position)}</u></b> out of ${techPhaseDataCount} Agniveers. He has
    performed <b><u>${formatRating(overallPractical?.rating)}</u></b> in the
    practical phase and stood <b><u>${getOrdinalRank(overallPractical?.position)}</u></b> out of
    ${techPhaseDataCount} Agniveers.
  </p>

  <p style="text-align: justify;">
    Agniveer <b>${resAgniveer.armyNumber}</b> stood <b><u>${getOrdinalRank(overall?.position)}</u></b> out of ${techPhaseDataCount}
    Agniveers and has an ability to become
    a proficient <b>${trade.toUpperCase()}</b> with additional
    training and guidance.
  </p>
</div>
    `;
  } else if (performanceCategory === "belowAverage") {
    // BELOW AVERAGE TEMPLATE
    html = `
 <div class="pen-card pen-${performanceCategory}">
  <h2>PEN PICTURE</h2>

  <p style="text-align: justify;">
    Agniveer <b>${resAgniveer.armyNumber}</b> has ${physicalDescription}. His motivation is assessed as <b><u>${formatRating(motivation)}</u></b> whereas his situational
    awareness remains <b><u>${formatRating(awareness)}</u></b>. The
    individual possesses <b><u>${formatRating(decision)}</u></b>
    level of decision making with <b><u>${formatRating(resilience)}</u></b>
    resilience observed during training
    activities.
  </p>

  <p style="text-align: justify;">
    The individual has performed <b><u>${formatRating(overallTheoretical?.rating)}</u></b> in the theoretical phase and
    stood <b><u>${getOrdinalRank(overallTheoretical?.position)}</u></b> out of ${techPhaseDataCount} Agniveers. He
    has performed <b><u>${formatRating(overallPractical?.rating)}</u></b> in the
    practical phase and stood <b><u>${getOrdinalRank(overallPractical?.position)}</u></b> out of
    ${techPhaseDataCount} Agniveers indicating a consistent
    requirement for improvement in both
    academic understanding and practical
    application.
  </p>

  <p style="text-align: justify;">
    Overall, the individual stood <b><u>${getOrdinalRank(overall?.position)}</u></b>
    overall out of ${techPhaseDataCount} Agniveers. With
    focused remedial training, enhanced
    motivation, and close supervision, the
    individual has an ability to become a
    proficient <b>${trade.toUpperCase()}</b>.
  </p>
</div>
    `;
  } else {
    // FAIL TEMPLATE
    html = `
 <div class="pen-card pen-${performanceCategory}">
  <h2>PEN PICTURE</h2>

  <p style="text-align: justify;">
    Agniveer <b>${resAgniveer.armyNumber}</b> has ${physicalDescription}. His motivation is assessed as <b><u>${formatRating(motivation)}</u></b> and his situational
    awareness is <b><u>${formatRating(awareness)}</u></b>. The
    individual's decision making ability is <b><u>${formatRating(decision)}</u></b>
    with <b><u>${formatRating(resilience)}</u></b>
    resilience requiring focused development.
  </p>

  <p style="text-align: justify;">
    The individual has performed <b><u>${formatRating(overallTheoretical?.rating)}</u></b> in the theoretical phase and
    stood <b><u>${getOrdinalRank(overallTheoretical?.position)}</u></b> out of ${techPhaseDataCount} Agniveers. He
    has performed <b><u>${formatRating(overallPractical?.rating)}</u></b> in the
    practical phase and stood <b><u>${getOrdinalRank(overallPractical?.position)}</u></b> out of
    ${techPhaseDataCount} Agniveers requiring intensive
    remedial training in both theoretical and
    practical domains.
  </p>

  <p style="text-align: justify;">
    Overall, the individual stood <b><u>${getOrdinalRank(overall?.position)}</u></b>
    out of ${techPhaseDataCount} Agniveers. With
    intensive remedial training, close mentoring,
    and dedicated supervision, the individual
    may develop the ability to become a
    proficient <b>${trade.toUpperCase()}</b>.
  </p>
</div>
    `;
  }

  return {
    html,
    performanceCategory,
    overAllPercentage,
  };
};

const formatRating = (value) => {
  if (!value) return "N/A";
  const v = String(value).toLowerCase().trim();
  if (v === "low") return "Below Average";
  if (v === "excellent") return "Above Average";
  // Capitalize first letter of each word for consistent display
  return String(value).replace(/\b\w/g, (c) => c.toUpperCase());
};

const calculateDenseRanksByPercentage = (list) => {
  // Step 1: Sort by percentage (High to Low)
  console.log("list", list);

  const sorted = [...list].sort(
    (a, b) =>
      b?.theoretical?.theoreticalPercentage -
      a?.theoretical?.theoreticalPercentage,
  );
  console.log("sorted", sorted);

  let rank = 1;
  let prevPercentage = null;

  for (let i = 0; i < sorted.length; i++) {
    // If percentage is different from previous, increase rank by 1
    if (sorted[i].percentage !== prevPercentage) {
      if (i !== 0) {
        rank++;
      }
    }

    sorted[i].rank = rank;
    prevPercentage = sorted[i].percentage;
  }
  console.log("sorted", sorted);

  return sorted;
};

/** Sum all numeric values from a nested object (for practical/theoretical scores) */
function sumNumericValues(obj, skipKeys = ["max", "percentage", "rank"]) {
  if (obj == null || typeof obj !== "object") return 0;
  let total = 0;
  for (const [key, val] of Object.entries(obj)) {
    const keyLower = key.toLowerCase();
    if (skipKeys.some((s) => keyLower.startsWith(s.toLowerCase()))) continue;
    if (typeof val === "number" && !isNaN(val)) {
      total += val;
    } else if (val && typeof val === "object" && !Array.isArray(val)) {
      total += sumNumericValues(val, skipKeys);
    }
  }
  return total;
}

/** Generic rank calculation for any TechPhase model (used after import) */
async function calculateAndStoreAllDenseRanksForModel(
  TechPhaseModel,
  courseId,
) {
  const docs = await TechPhaseModel.find({ courseId }).lean();

  const rankAndSave = async (label, valueGetter, updateBuilder) => {
    // 1. Filter out invalid values & Cast to Number properly
    const sorted = docs
      .map((d) => ({ doc: d, val: Number(valueGetter(d)) })) // Create tuple {doc, val}
      .filter((item) => !isNaN(item.val) && item.val !== null) // Filter bad numbers
      .sort((a, b) => b.val - a.val); // Sort DESC

    let prevValue = null;
    let rank = 0;

    for (let i = 0; i < sorted.length; i++) {
      const currValue = sorted[i].val;
      // Competition Rank: 1, 1, 3, 4 (Standard)
      if (currValue !== prevValue) {
        rank = i + 1;
      }

      await TechPhaseModel.updateOne(
        { _id: sorted[i].doc._id },
        { $set: updateBuilder(currValue, rank) },
      );
      prevValue = currValue;
    }
  };

  await rankAndSave(
    "OVERALL",
    (d) => d.overallPercentage,
    (value, rank) => ({ overallPercentage: value, overallRank: rank }),
  );
  await rankAndSave(
    "THEORETICAL",
    (d) => d?.theoretical?.theoreticalPercentage,
    (value, rank) => ({
      "theoretical.theoreticalPercentage": value,
      "theoretical.theoreticalRank": rank,
    }),
  );
  await rankAndSave(
    "PRACTICAL",
    (d) => d?.practical?.practicalPercentage,
    (value, rank) => ({
      "practical.practicalPercentage": value,
      "practical.practicalRank": rank,
    }),
  );
}

module.exports = {
  calculateGrade,
  calculatePhyscialProficinecyGrade,
  calculateTechPhaseForIndividualSummary,
  calculateFortNightPerformance,
  calculateOverAll,
  penPicture,
  calculateDenseRanksByPercentage,
  percentage,
  sumNumericValues,
  calculateAndStoreAllDenseRanksForModel,
};
