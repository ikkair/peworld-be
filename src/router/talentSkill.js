// Import express and router
const express = require("express")
const router = express.Router()

// Import controller functions
const talentSkillController = require("../controller/talentSkillController")

// Import auth
const authMiddleware = require("../middleware/auth");

// Routes
router.get("/", talentSkillController.getAllTalentSkills)
router.get("/:id", talentSkillController.getDetailTalentSkill)
router.post("/", authMiddleware.protect, talentSkillController.addTalentSkill)
router.put("/:id", talentSkillController.editTalentSkill)
router.delete("/:id", talentSkillController.deleteTalentSkill)

// Export
module.exports = router
