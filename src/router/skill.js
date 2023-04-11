// Import express and router
const express = require("express")
const router = express.Router()

// Import controller functions
const skillController = require("../controller/skillController")

// Routes
router.get("/", skillController.getAllSkills)
router.get("/:id", skillController.getDetailSkill)
router.post("/", skillController.addSkill)
router.put("/:id",  skillController.editSkill)
router.delete("/:id", skillController.deleteSkill)

// Export
module.exports = router
