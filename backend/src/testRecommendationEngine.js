require("dotenv").config();

const {
  loadAlgorithmConfig,
  loadRecommendationInput,
  createNeutralTechnicalTargets,
  collectTechnicalInfluences,
  calculateNormalTechnicalTargets,
} = require("./services/recommendationEngine");

async function test() {
  try {
    const config = await loadAlgorithmConfig();
    console.log("PARAMETER MAP:");
    console.log(config.parameterMap);

    console.log("Algorithm:", config.version.version);

    const input = await loadRecommendationInput(1, 4);
    const neutralTargets =
  createNeutralTechnicalTargets(config);

const selectedAnswers =
  input.optionAnswers.map(
    (answer) => answer.answer_option_id
  );

const gameProfileRoles = {};

for (const answer of input.optionAnswers) {
  if (
    answer.selection_role === "primary" ||
    answer.selection_role === "secondary"
  ) {
    gameProfileRoles[answer.answer_option_id] =
      answer.selection_role;
  }
}

    const technicalInfluences =
    collectTechnicalInfluences(
        config,
        selectedAnswers,
        gameProfileRoles
    );

    const normalTargets =
    calculateNormalTechnicalTargets(
        config,
        neutralTargets,
        technicalInfluences
    );

    console.log("Neutral Technical Targets:");
    console.log(neutralTargets);

    console.log("Technical Influences:");
    console.log(technicalInfluences);

    console.log("Normal Technical Targets:");
    console.log(normalTargets);

    console.log("Profile:");
    console.log(input.profile);

    console.log("Option Answers:");
    console.log(input.optionAnswers);

    console.log("Numeric Answers:");
    console.log(input.numericAnswers);

    console.log("Text Answers:");
    console.log(input.textAnswers);

    console.log("Current Racket:");
    console.log(input.currentRacket);
  } catch (error) {
    console.error(error);
  }

  process.exit();
}

test();