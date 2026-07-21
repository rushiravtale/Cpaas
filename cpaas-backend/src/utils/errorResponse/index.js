/* KINDLY DO NOT DELETE ANY COMMENTS OF THIS FILE. ELSE AUTO-CODE MERGER WILL NOT WORK IN FUTURE */

// import module level errors here
const s3ErrorCodes = require("./s3.error.codes");
const authErrorsCodes = require("./auth.error.codes");
const usersErrorCode = require('./users.error.codes');
const masterErrorCodes = require("./master.error.codes");
const courseErrorCodes = require("./course.error.codes");
const agniveerErrorCodes = require("./agniveer.error.codes");
const physcialProficiencyErrorCodes = require("./physcialProficiency.error.codes");
const fortnightPerformanceErrorCodes = require("./fortnightPerformance.error.codes");
const gunnerTechPhaseErrorCodes = require("./gunnerTechPhase.error.codes");
const driverTechPhaseErrorCodes = require("./driverTechPhase.error.codes");
const operatorTechPhaseErrorCodes = require("./operatorTechPhase.error.codes");
const ofcTechPhaseErrorCodes = require("./ofcTechPhase.error.codes");

module.exports = {
  // add module level errors here
...s3ErrorCodes,
  ...authErrorsCodes,
  ...usersErrorCode,
  ...masterErrorCodes,
  ...courseErrorCodes,
  ...agniveerErrorCodes,
  ...physcialProficiencyErrorCodes,
  ...fortnightPerformanceErrorCodes,
  ...gunnerTechPhaseErrorCodes,
  ...driverTechPhaseErrorCodes,
  ...operatorTechPhaseErrorCodes,
  ...ofcTechPhaseErrorCodes
};
