/* KINDLY DO NOT DELETE ANY COMMENTS OF THIS FILE. ELSE AUTO-CODE MERGER WILL NOT WORK IN FUTURE */

// import module level success codes here
const s3SuccessCodes = require("./s3.success.codes");
const authSuccessCodes = require("./auth.success.codes");
const usersSuccessCodes = require("./users.success.codes");
const masterSuccessCodes = require("./master.success.codes");
const courseSuccessCodes = require("./course.success.codes");
const agniveerSuccessCodes = require("./agniveer.success.codes");
const physcialProficiencySuccessCodes = require("./physcialProficiency.success.codes");
const fortnightPerformanceSuccessCodes = require("./fortnightPerformance.success.codes");
const gunnerTechPhaseSuccessCodes = require("./gunnerTechPhase.success.codes");
const driverTechPhaseSuccessCodes = require("./driverTechPhase.success.codes");
const operatorTechPhaseSuccessCodes = require("./operatorTechPhase.success.codes");
const ofcTechPhaseSuccessCodes = require("./ofcTechPhase.success.codes");


module.exports = {
  // add module level success codes here
...s3SuccessCodes,
  ...authSuccessCodes,
  ...usersSuccessCodes,
...masterSuccessCodes,
...courseSuccessCodes,
...agniveerSuccessCodes,
...physcialProficiencySuccessCodes,
...fortnightPerformanceSuccessCodes,
...gunnerTechPhaseSuccessCodes,
...driverTechPhaseSuccessCodes,
...operatorTechPhaseSuccessCodes,
...ofcTechPhaseSuccessCodes
};
