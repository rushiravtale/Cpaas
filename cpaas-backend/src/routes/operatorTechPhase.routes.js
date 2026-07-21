const { Router } = require("express");
const router = Router();
const { verifyAuthToken } = require("../middlewares/auth.middleware");
const OperatorTechPhaseController = require("../controllers/operatorTechPhase.controller");

router.post("/createOperatorTechPhase", verifyAuthToken, OperatorTechPhaseController.createOperatorTechPhase);
router.get("/getOperatorTechPhase", verifyAuthToken, OperatorTechPhaseController.getOperatorTechPhase);



module.exports = router;
