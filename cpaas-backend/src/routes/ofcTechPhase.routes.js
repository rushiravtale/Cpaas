const { Router } = require("express");
const router = Router();
const { verifyAuthToken } = require("../middlewares/auth.middleware");
const OfcTechPhaseController = require("../controllers/ofcTechPhase.controller");

router.post("/createOfcTechPhase", verifyAuthToken, OfcTechPhaseController.createOfcTechPhase);
router.get("/getOfcTechPhase", verifyAuthToken, OfcTechPhaseController.getOfcTechPhase);



module.exports = router;
