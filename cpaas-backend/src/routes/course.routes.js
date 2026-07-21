const { Router } = require("express");
const router = Router();
const { verifyAuthToken } = require("../middlewares/auth.middleware");
const courseController = require("../controllers/course.controller");

router.post("/createCourse", verifyAuthToken, courseController.createCourse);
router.get("/getCourses", verifyAuthToken, courseController.getAllCoursesWithPagination);
router.get("/getCourse", verifyAuthToken, courseController.getAllCourses);
router.post("/updateCourse", verifyAuthToken, courseController.updateCourse);
router.get(
  "/getCourseById/:id",
  verifyAuthToken,
  courseController.getCourseById
);
router.delete(
  "/deleteCourse/:id",
  verifyAuthToken,
  courseController.deleteCourse
);


module.exports = router;
