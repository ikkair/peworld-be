// Import express and router
const express = require("express")
const router = express.Router()

// Import controller functions
const talentSkillController = require("../controller/talentSkillController")

// Routes
router.get("/", talentSkillController.getAllTalentSkills)
router.get("/:id", talentSkillController.getDetailTalentSkill)
router.post("/", talentSkillController.addTalentSkill)
router.put("/:id",  talentSkillController.editTalentSkill)
router.delete("/:id", talentSkillController.deleteTalentSkill)

// Export
module.exports = router
