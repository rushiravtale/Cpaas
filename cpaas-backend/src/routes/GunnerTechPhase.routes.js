const { Router } = require("express");
const router = Router();
const { verifyAuthToken } = require("../middlewares/auth.middleware");
const GunnerTechPhaseController = require("../controllers/gunnerTechPhase.controller");

router.post("/createGunnerTechPhase", verifyAuthToken, GunnerTechPhaseController.createGunnerTechPhase);
router.get("/getGunnerTechPhase", verifyAuthToken, GunnerTechPhaseController.getGunnerTechPhase);



module.exports = router;
