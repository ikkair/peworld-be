// Import express and router
const express = require("express")
const router = express.Router()

// Import controller functions
const talentController = require("../controller/talentController")

// Import upload
const upload = require("../middleware/upload.js");

// Import auth
const authMiddleware = require("../middleware/auth");

// Routes
router.get("/", talentController.getAllTalents)
router.get("/:id", talentController.getDetailTalent)
router.post("/login", talentController.loginTalent)
router.post("/register", talentController.registerTalent)
router.put("/:id", authMiddleware.protect, upload.single("photo"), talentController.editTalent)
router.delete("/:id", talentController.deleteTalent)

// Export
module.exports = router
