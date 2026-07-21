//* KINDLY DO NOT DELETE ANY COMMENTS OF THIS FILE. ELSE AUTO-CODE MERGER WILL NOT WORK IN FUTURE */

// import module level routers here
const s3Routes = require("./s3.routes");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const masterRoutes = require("./master.routes");
const courseRoutes = require("./course.routes");
const agniveerRoutes = require("./agniveer.routes");
const physcialProficiencyRoutes = require("./physcialProficiency.routes");
const fortnightPerformanceRoutes = require("./fortnightPerformance.routes");
const gunnerTechPhaseRoutes = require("./GunnerTechPhase.routes");
const driverTechPhaseRoutes = require("./driverTechPhase.routes");
const operatorTechPhaseRoutes = require("./operatorTechPhase.routes");

const ofcTechPhaseRoutes = require("./ofcTechPhase.routes");

function addRoutersInApp(app) {
  // add module level routers here
  app.use("/api/s3", s3Routes);
  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/master", masterRoutes);
  app.use("/api/course", courseRoutes);
  app.use("/api/agniveer", agniveerRoutes);
  app.use("/api/physcialProficiency", physcialProficiencyRoutes);
  app.use("/api/fortnightPerformance", fortnightPerformanceRoutes);
  app.use("/api/gunnerTechPhase", gunnerTechPhaseRoutes);

  app.use("/api/driverTechPhase", driverTechPhaseRoutes);
  app.use("/api/operatorTechPhase", operatorTechPhaseRoutes);

  app.use("/api/ofcTechPhase", ofcTechPhaseRoutes);
}

module.exports = {
  addRoutersInApp,
};
