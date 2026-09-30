const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { generateRecommendations } = require("../controllers/recommendationController");

router.post("/generate", authMiddleware, generateRecommendations);

module.exports = router;
