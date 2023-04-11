// Import express and router
const express = require("express")
const router = express.Router()

// Import controller functions
const hireController = require("../controller/hireController")

// Routes
router.get("/", hireController.getAllHires)
router.get("/:id", hireController.getDetailHire)
router.post("/", hireController.addHire)
router.put("/:id",  hireController.editHire)
router.delete("/:id", hireController.deleteHire)

// Export
module.exports = router
