const { Router } = require("express");
const router = Router();
const { verifyAuthToken } = require("../middlewares/auth.middleware");
const DriverTechPhaseController = require("../controllers/driverTechPhase.controller");

router.post("/createDriverTechPhase", verifyAuthToken, DriverTechPhaseController.createDriverTechPhase);
router.get("/getDriverTechPhase", verifyAuthToken, DriverTechPhaseController.getDriverTechPhase);


module.exports = router;
