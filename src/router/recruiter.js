// Import express and router
const express = require("express")
const router = express.Router()

// Import controller functions
const recruiterController = require("../controller/recruiterController")

// Import upload
const upload = require("../middleware/upload.js");

// Routes
router.get("/", recruiterController.getAllRecruiters)
router.get("/:id", recruiterController.getDetailRecruiter)
router.post("/login", recruiterController.loginRecruiter)
router.post("/register", recruiterController.registerRecruiter)
router.put("/:id", upload.single("photo"), recruiterController.editRecruiter)
router.delete("/:id", recruiterController.deleteRecruiter)

// Export
module.exports = router
