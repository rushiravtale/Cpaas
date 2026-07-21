const { Router } = require("express");
const router = Router();
//MIDDLEWARE
const {
  verifyAuthToken,
  verifyRefreshToken,
} = require("../middlewares/auth.middleware");

const controller = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

router.post("/signin", controller.signin);
router.post("/createUser",verifyAuthToken, userController.createUser);
router.post("/password/forgot", [], controller.forgotPassword);
router.post("/password/reset", [], controller.resetPassword);
router.get("/getUsers",verifyAuthToken, userController.getAllUsers);


router.post("/password/change", verifyAuthToken, controller.changePassword);
router.post("/otp/generate", controller.generateOtp);
router.post("/otp/resend", controller.generateOtp);
router.post("/otp/verify", controller.verifyOtp);
router.post("/token/refresh", verifyRefreshToken, controller.refreshAuthToken);
router.post("/logout", verifyAuthToken, controller.logout);

module.exports = router;
