// Import express and router
const express = require("express")
const router = express.Router()

// Import controller functions
const experienceController = require("../controller/experienceController")

// Import upload
const upload = require("../middleware/upload.js");

// Import auth
const authMiddleware = require("../middleware/auth");

// Routes
router.get("/", experienceController.getAllExperience)
router.get("/:id", experienceController.getDetailExperience)
router.post("/", authMiddleware.protect, upload.single("photo"), experienceController.addExperience)
router.put("/:id", upload.single("photo"), experienceController.editExperience)
router.delete("/:id", experienceController.deleteExperience)

// Export
module.exports = router
