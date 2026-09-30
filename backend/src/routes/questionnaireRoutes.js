const express = require("express");
const router = express.Router();
const {
  startQuestionnaire,
  saveOptionAnswer,
  saveNumericAnswer,
  saveTextAnswer,
  getActiveQuestionnaire,
  completeQuestionnaire,
  saveHealthClassification,
  saveCurrentRacket,
} = require("../controllers/questionnaireController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/start", authMiddleware, startQuestionnaire);

router.get(
  "/active",
  authMiddleware,
  getActiveQuestionnaire
);

router.post(
  "/complete",
  authMiddleware,
  completeQuestionnaire
);

router.post(
  "/answer/option",
  authMiddleware,
  saveOptionAnswer
);
router.post(
  "/answer/numeric",
  authMiddleware,
  saveNumericAnswer
);
router.post(
  "/answer/text",
  authMiddleware,
  saveTextAnswer
);
router.post(
  "/answer/health-classification",
  authMiddleware,
  saveHealthClassification
);

router.post("/answer/current-racket", authMiddleware, saveCurrentRacket);

module.exports = router;