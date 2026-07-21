const { Router } = require("express");
const router = Router();
const multer = require("multer");
const { verifyAuthToken } = require("../middlewares/auth.middleware");
const courseController = require("../controllers/course.controller");
const agniveerController = require("../controllers/agniveer.controller");

// Configure multer for Excel file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only .xlsx and .xls files are allowed."));
    }
  },
});
router.get(
  "/getAgniveerIndiviualReport",
   verifyAuthToken,
  agniveerController.getAgniveerIndiviualReport
);
router.post("/createAgniveer", verifyAuthToken, agniveerController.createAgniveer);
router.get("/getAgniveers", verifyAuthToken, agniveerController.getAllAgniveers);
router.post("/updateAgniveer", verifyAuthToken, agniveerController.updateAgniveer);
router.get(
  "/getAgniveerById/:id",
  verifyAuthToken,
  agniveerController.getAgniveerById
);
router.get(
  "/getGradeReport",
  verifyAuthToken,
  agniveerController.getGradeReport
);

router.get(
  "/getDashboardSummary",
  verifyAuthToken,
  agniveerController.getDashboardSummary
);

router.get(
  "/getTradeDashboardSummary/:id",
  verifyAuthToken,
  agniveerController.getTradeDashboardSummary
);



router.delete(
  "/deleteAgniveer/:id",
  verifyAuthToken,
  agniveerController.deleteAgniveer
);

router.get(
  "/export",
  verifyAuthToken,
  agniveerController.exportAgniveers
);

router.post(
  "/import",
  verifyAuthToken,
  upload.single("file"),
  agniveerController.importAgniveers
);

module.exports = router;
