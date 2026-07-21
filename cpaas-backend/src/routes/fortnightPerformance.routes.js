const { Router } = require("express");
const router = Router();
const { verifyAuthToken } = require("../middlewares/auth.middleware");
const fortnightPerformanceController = require("../controllers/fortnight.controller");

router.post("/createFortnightPerformance", verifyAuthToken, fortnightPerformanceController.createFortnightPerformanceController);
 router.get("/getFortnightPerformance", verifyAuthToken, fortnightPerformanceController.getFortnightPerformance);
// router.get("/getCourse", verifyAuthToken, courseController.getAllCourses);
// router.post("/updateCourse", verifyAuthToken, courseController.updateCourse);
// router.get(
//   "/getCourseById/:id",
//   verifyAuthToken,
//   courseController.getCourseById
// );
// router.delete(
//   "/deleteCourse/:id",
//   verifyAuthToken,
//   courseController.deleteCourse
// );


module.exports = router;
