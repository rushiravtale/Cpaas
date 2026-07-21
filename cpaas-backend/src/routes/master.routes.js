const { Router } = require("express");
const router = Router();
const masterRoleController = require("../controllers/master.controller");
const { verifyAuthToken } = require("../middlewares/auth.middleware");


router.get("/getRoles", masterRoleController.getRoles);
router.get("/getTrades",verifyAuthToken, masterRoleController.getAllTrades);
router.get("/getPermission", masterRoleController.getAllPermission);



module.exports = router;