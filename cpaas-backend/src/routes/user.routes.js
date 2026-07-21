const { Router } = require("express");
const router = Router();
const userController = require("../controllers/user.controller");
const {
  verifyAuthToken,
  verifyRefreshToken,
} = require("../middlewares/auth.middleware");

router.post("/updateUser",verifyAuthToken, userController.updateUser);
router.delete("/deleteUser/:id",verifyAuthToken, userController.deleteUser);
router.get("/getUserById/:id",verifyAuthToken, userController.getUserById);
module.exports = router;