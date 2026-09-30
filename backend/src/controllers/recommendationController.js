const { generateRecommendation } = require("../services/recommendationEngine");

const generateRecommendations = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { attempt_id } = req.body;

    if (!attempt_id) {
      return res.status(400).json({ message: "attempt_id is required." });
    }

    const result = await generateRecommendation(attempt_id, userId);

    // Do not expose the full internal ranking through the public API.
    const { ranking, ...publicResult } = result;
    return res.json(publicResult);
  } catch (error) {
    console.error("Generate recommendations error:", error);
    if (error.message === "Questionnaire attempt not found.") {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Failed to generate recommendations." });
  }
};

module.exports = { generateRecommendations };
