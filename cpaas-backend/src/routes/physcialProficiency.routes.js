const { Router } = require("express");
const router = Router();
const { verifyAuthToken } = require("../middlewares/auth.middleware");
const physcialProficiencyController = require("../controllers/physcialProficiency.controller");

router.post(
  "/createPhyscialProficiency",
  verifyAuthToken,
  physcialProficiencyController.createPhyscialProficiency
);
// router.get("/getCourses", verifyAuthToken, courseController.getAllCoursesWithPagination);
router.get(
  "/getPhyscialProficiency",
  verifyAuthToken,
  physcialProficiencyController.getPhyscialProficiencyById
);
router.post(
  "/updatePhyscialProficiency",
  verifyAuthToken,
  physcialProficiencyController.updatePhyscialProficiency
);
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
