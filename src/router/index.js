// Import express and router
const express = require("express");
const router = express.Router();

// Import route
const skillRouter = require("./skill");
const talentRouter = require("./talent");
const recruiterRouter = require("./recruiter");
const talentSkillRouter = require("./talentSkill");
const portfolioRouter = require("./portfolio");
const experienceRouter = require("./experience");
const hireRouter = require("./hire");

// Use route
router.use("/skills", skillRouter);
router.use("/talents", talentRouter);
router.use("/recruiters", recruiterRouter);
router.use("/talentSkills", talentSkillRouter);
router.use("/portfolios", portfolioRouter);
router.use("/experiences", experienceRouter);
router.use("/hires", hireRouter);

// Export router
module.exports = router;