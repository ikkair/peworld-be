// Import express and router
const express = require("express")
const router = express.Router()

// Import controller functions
const portfolioController = require("../controller/portfolioController")

// Import upload
const upload = require("../middleware/upload.js");

// Import auth
const authMiddleware = require("../middleware/auth");

// Routes
router.get("/", portfolioController.getAllPortfolios)
router.get("/:id", portfolioController.getDetailPortfolio)
router.post("/", authMiddleware.protect, upload.single("photo"), portfolioController.addPortfolio)
router.put("/:id", upload.single("photo"), portfolioController.editPortfolio)
router.delete("/:id", portfolioController.deletePortfolio)

// Export
module.exports = router
