const pool = require("../config/database");

async function loadAlgorithmConfig() {
  // Get active algorithm version
  const versionResult = await pool.query(`
    SELECT *
    FROM algorithm_versions
    WHERE is_active = TRUE
    ORDER BY algorithm_version_id DESC
    LIMIT 1
  `);

  if (versionResult.rows.length === 0) {
    throw new Error("No active recommendation algorithm found.");
  }

  const algorithmVersion = versionResult.rows[0];
  const versionId = algorithmVersion.algorithm_version_id;

  // Load everything belonging to this algorithm version
  const [
    parametersResult,
    rulesResult,
    influencesResult,
    compatibilityResult,
  ] = await Promise.all([
    pool.query(
      `
        SELECT *
        FROM algorithm_parameters
        WHERE algorithm_version_id = $1
        ORDER BY parameter_id
      `,
      [versionId]
    ),

    pool.query(
      `
        SELECT *
        FROM algorithm_rules
        WHERE algorithm_version_id = $1
          AND is_active = TRUE
        ORDER BY priority, rule_id
      `,
      [versionId]
    ),

    pool.query(
      `
        SELECT *
        FROM answer_influences
        WHERE algorithm_version_id = $1
        ORDER BY influence_id
      `,
      [versionId]
    ),

    pool.query(
      `
        SELECT *
        FROM compatibility_bands
        WHERE algorithm_version_id = $1
        ORDER BY target_key, min_difference
      `,
      [versionId]
    ),
  ]);
  const parameterMap = {};

for (const parameter of parametersResult.rows) {
  let value = null;

  if (
    parameter.json_value !== null &&
    parameter.json_value !== undefined
  ) {
    value = parameter.json_value;
  } else if (
    parameter.numeric_value !== null &&
    parameter.numeric_value !== undefined
  ) {
    value = Number(parameter.numeric_value);
  } else if (
    parameter.text_value !== null &&
    parameter.text_value !== undefined
  ) {
    value = parameter.text_value;
  }

  parameterMap[parameter.parameter_key] = value;
}

 return {
  version: algorithmVersion,
  parameters: parametersResult.rows,
  parameterMap,
  rules: rulesResult.rows,
  answerInfluences: influencesResult.rows,
  compatibilityBands: compatibilityResult.rows,
};
}
function calculateCharacteristicTargets(
  config,
  selectedAnswers,
  gameProfileRoles = {}
) {
  const characteristicsConfig =
    config.parameterMap.characteristics_score_config;

  const roleMultipliers =
    config.parameterMap.game_profile_role_multipliers;

  const characteristicKeys = characteristicsConfig.components;

  // Every characteristic begins at the neutral target (5).
  const targets = {};

  for (const key of characteristicKeys) {
    targets[key] = Number(characteristicsConfig.neutral_target);
  }

  // Convert selected answers to numbers for reliable comparison.
  const selectedIds = new Set(
    selectedAnswers.map((id) => Number(id))
  );

  for (const influence of config.answerInfluences) {
    const answerOptionId = Number(influence.answer_option_id);

    if (!selectedIds.has(answerOptionId)) {
      continue;
    }

    // Ignore technical influences here.
    if (!characteristicKeys.includes(influence.target_key)) {
      continue;
    }

    let multiplier = 1;

    // If this answer belongs to the Game Profile,
    // apply the primary/secondary weighting.
    const role = gameProfileRoles[answerOptionId];

    if (role === "primary") {
      multiplier = Number(roleMultipliers.primary);
    } else if (role === "secondary") {
      multiplier = Number(roleMultipliers.secondary);
    }

    const influenceValue = Number(influence.influence_value);

    targets[influence.target_key] +=
      influenceValue * multiplier;
  }

  // Clamp every final characteristic target to 1–10.
  const minimum = Number(characteristicsConfig.minimum_target);
  const maximum = Number(characteristicsConfig.maximum_target);

  for (const key of characteristicKeys) {
    targets[key] = Math.max(
      minimum,
      Math.min(maximum, targets[key])
    );
  }

  return targets;
}
async function loadRecommendationInput(attemptId, userId) {
  const attemptResult = await pool.query(
    `
    SELECT *
    FROM questionnaire_attempts
    WHERE attempt_id = $1
      AND user_id = $2
    `,
    [attemptId, userId]
  );

  if (attemptResult.rows.length === 0) {
    throw new Error("Questionnaire attempt not found.");
  }

  const attempt = attemptResult.rows[0];

  const [
    userResult,
    optionResult,
    numericResult,
    textResult,
    currentRacketResult,
    healthClassificationResult,
  ] = await Promise.all([
    pool.query(
      `
      SELECT
        user_id,
        date_of_birth,
        gender
      FROM users
      WHERE user_id = $1
      `,
      [userId]
    ),

    pool.query(
      `
      SELECT
        question_id,
        answer_option_id,
        selection_role
      FROM user_answer_options
      WHERE attempt_id = $1
      ORDER BY question_id
      `,
      [attemptId]
    ),

    pool.query(
      `
      SELECT
        question_id,
        numeric_value,
        unit
      FROM user_numeric_answers
      WHERE attempt_id = $1
      ORDER BY question_id
      `,
      [attemptId]
    ),

    pool.query(
      `
      SELECT
        question_id,
        text_value
      FROM user_text_answers
      WHERE attempt_id = $1
      ORDER BY question_id
      `,
      [attemptId]
    ),

    pool.query(
      `
      SELECT
        acr.racket_id,
        r.name,
        rs.head_size,
        rs.string_pattern,
        rs.stiffness_ra,
        rs.balance_cm,
        rs.unstrung_weight_g,
        rs.swingweight
      FROM attempt_current_rackets acr
      JOIN rackets r
        ON r.racket_id = acr.racket_id
      JOIN racket_specifications rs
        ON rs.racket_id = acr.racket_id
      WHERE acr.attempt_id = $1
      `,
      [attemptId]
    ),

    pool.query(
      `
      SELECT question_id, area_code, classification
      FROM user_health_classifications
      WHERE attempt_id = $1
      ORDER BY area_code
      `,
      [attemptId]
    ),
  ]);

  if (userResult.rows.length === 0) {
    throw new Error("User not found.");
  }

  const user = userResult.rows[0];

  let age = null;

  if (user.date_of_birth) {
    const today = new Date();
    const birthDate = new Date(user.date_of_birth);

    age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference =
      today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
  }

  return {
    attempt,

    profile: {
      user_id: user.user_id,
      age,
      gender: user.gender,
    },

    optionAnswers: optionResult.rows.map((row) => ({
      question_id: Number(row.question_id),
      answer_option_id: Number(row.answer_option_id),
      selection_role: row.selection_role,
    })),

    numericAnswers: numericResult.rows.map((row) => ({
      question_id: Number(row.question_id),
      numeric_value: Number(row.numeric_value),
      unit: row.unit,
    })),

    textAnswers: textResult.rows.map((row) => ({
      question_id: Number(row.question_id),
      text_value: row.text_value,
    })),

    currentRacket:
      currentRacketResult.rows.length > 0
        ? currentRacketResult.rows[0]
        : null,

    healthClassifications: healthClassificationResult.rows.map((row) => ({
      question_id: Number(row.question_id),
      area_code: row.area_code,
      classification: row.classification,
    })),
  };
}
function createNeutralTechnicalTargets(config) {
  const parameters = config.parameterMap;

  return {
    head_size: Number(parameters.neutral_head_size),
    stiffness: Number(parameters.neutral_stiffness),
    balance: -Number(parameters.neutral_balance_points_hl),
    unstrung_weight: Number(parameters.neutral_static_weight_g),
    swingweight: Number(parameters.neutral_swingweight),
  };
}
function collectTechnicalInfluences(
  config,
  selectedAnswers,
  gameProfileRoles = {}
) {
  const technicalKeys = [
    "head_size",
    "stiffness",
    "balance",
    "unstrung_weight",
    "swingweight",
  ];

  const influences = {};

  for (const key of technicalKeys) {
    influences[key] = [];
  }

  const selectedIds = new Set(
    selectedAnswers.map((id) => Number(id))
  );

  const roleMultipliers =
    config.parameterMap.game_profile_role_multipliers;

  for (const influence of config.answerInfluences) {
    const answerOptionId = Number(influence.answer_option_id);

    if (!selectedIds.has(answerOptionId)) continue;
    if (!technicalKeys.includes(influence.target_key)) continue;

    let multiplier = 1;

    const role = gameProfileRoles[answerOptionId];

    if (role === "primary") {
      multiplier = Number(roleMultipliers.primary);
    } else if (role === "secondary") {
      multiplier = Number(roleMultipliers.secondary);
    }

    influences[influence.target_key].push(
      Number(influence.influence_value) * multiplier
    );
  }

  return influences;
}
function getSaturationPercentage(influences) {
  if (!influences || influences.length === 0) {
    return {
      direction: 0,
      percentage: 0,
    };
  }

  const totalInfluence = influences.reduce(
    (sum, value) => sum + Number(value),
    0
  );

  if (totalInfluence === 0) {
    return {
      direction: 0,
      percentage: 0,
    };
  }

  const direction = Math.sign(totalInfluence);
  const magnitude = Math.abs(totalInfluence);

  let percentage;

  if (magnitude <= 2) percentage = 0.15;
  else if (magnitude <= 4) percentage = 0.30;
  else if (magnitude <= 7) percentage = 0.50;
  else if (magnitude <= 10) percentage = 0.65;
  else if (magnitude <= 14) percentage = 0.78;
  else if (magnitude <= 18) percentage = 0.88;
  else percentage = 0.95;

  return {
    direction,
    percentage,
  };
}
function calculateNormalTechnicalTargets(
  config,
  neutralTargets,
  technicalInfluences
) {
  const ranges = {
    head_size: {
      min: 97,
      max: 103,
    },
    stiffness: {
      min: 60,
      max: 70,
    },
    balance: {
      min: -5,
      max: 5,
    },
    unstrung_weight: {
      min: 270,
      max: 320,
    },
    swingweight: {
      min: 315,
      max: 350,
    },
  };

  const targets = {};

  for (const key of Object.keys(neutralTargets)) {
    const neutral = Number(neutralTargets[key]);
    const range = ranges[key];

    if (key === "head_size") {
      const total = (technicalInfluences[key] || []).reduce(
        (sum, value) => sum + Number(value),
        0
      );
      targets[key] = Math.max(range.min, Math.min(range.max, neutral + total));
      continue;
    }

    const { direction, percentage } =
      getSaturationPercentage(technicalInfluences[key]);

    if (direction === 0) {
      targets[key] = neutral;
      continue;
    }

    if (direction > 0) {
      targets[key] =
        neutral +
        (range.max - neutral) * percentage;
    } else {
      targets[key] =
        neutral -
        (neutral - range.min) * percentage;
    }
  }

  return targets;
}
function calculateStringPatternTarget(
  config,
  selectedAnswers,
  gameProfileRoles = {}
) {
  const selectedIds = new Set(
    selectedAnswers.map((id) => Number(id))
  );

  const roleMultipliers =
    config.parameterMap.game_profile_role_multipliers;

  const values = [];

  for (const influence of config.answerInfluences) {
    const answerOptionId = Number(influence.answer_option_id);

    if (!selectedIds.has(answerOptionId)) continue;
    if (influence.target_key !== "string_pattern") continue;

    let multiplier = 1;

    const role = gameProfileRoles[answerOptionId];

    if (role === "primary") {
      multiplier = Number(roleMultipliers.primary);
    } else if (role === "secondary") {
      multiplier = Number(roleMultipliers.secondary);
    }

    values.push(
      Number(influence.influence_value) * multiplier
    );
  }

  // No pattern influence = neutral 16x20.
  if (values.length === 0) {
    return {
      average: 0,
      target: "16x20",
    };
  }

  const average =
    values.reduce((sum, value) => sum + value, 0) /
    values.length;

  let target;

  if (average <= -1.5) {
    target = "16x18";
  } else if (average < -0.5) {
    target = "16x19";
  } else if (average < 0.5) {
    target = "16x20";
  } else if (average < 1.5) {
    target = "18x19";
  } else {
    target = "18x20";
  }

  return {
    average,
    target,
  };
}
function applyUtrInfluence(technicalInfluences, numericAnswers = []) {
  const next = Object.fromEntries(
    Object.entries(technicalInfluences).map(([key, values]) => [key, [...values]])
  );
  const utrAnswer = numericAnswers.find((answer) => Number(answer.question_id) === 6);
  if (!utrAnswer || !Number.isFinite(Number(utrAnswer.numeric_value))) return next;

  const utr = Number(utrAnswer.numeric_value);
  if (utr >= 1 && utr < 5) {
    next.head_size.push(1);
    next.unstrung_weight.push(-1);
    next.swingweight.push(-1);
  } else if (utr >= 11) {
    next.head_size.push(-1);
    next.unstrung_weight.push(1);
    next.swingweight.push(1);
  }
  return next;
}

function applyCurrentRacketCalibration(targets, currentRacket, selectedAnswers = []) {
  if (!currentRacket) return { ...targets };
  const ids = new Set(selectedAnswers.map(Number));
  const next = { ...targets };

  if (ids.has(33)) {
    next.unstrung_weight = Number(currentRacket.unstrung_weight_g) - 10;
    next.swingweight = Number(currentRacket.swingweight) - 5;
  } else if (ids.has(34)) {
    next.unstrung_weight = Number(currentRacket.unstrung_weight_g) + 10;
    next.swingweight = Number(currentRacket.swingweight) + 5;
  }
  return next;
}

function applyHealthComfortToCharacteristics(targets, healthState, config) {
  const next = { ...targets };
  const characteristicsConfig = config.parameterMap.characteristics_score_config;
  const min = Number(characteristicsConfig.minimum_target);
  const max = Number(characteristicsConfig.maximum_target);
  next.comfort = Math.max(min, Math.min(max, Number(next.comfort) + calculateHealthComfortInfluence(healthState)));
  return next;
}

function buildHealthState(selectedAnswers = [], healthClassifications = []) {
  const selectedIds = new Set(selectedAnswers.map(Number));

  let issueType = "none";
  if (selectedIds.has(85)) issueType = "previous_injury";
  else if (selectedIds.has(86)) issueType = "physical_discomfort";
  else if (selectedIds.has(87)) issueType = "both";

  const areaByOptionId = {
    89: "wrist",
    90: "elbow",
    91: "forearm",
    92: "shoulder",
    93: "back",
    94: "other",
  };

  const affectedAreas = Object.entries(areaByOptionId)
    .filter(([id]) => selectedIds.has(Number(id)))
    .map(([, area]) => area);

  const explicit = new Map(
    healthClassifications.map((item) => [
      item.area_code,
      item.classification,
    ])
  );

  const classifications = affectedAreas.map((area) => ({
    area_code: area,
    classification:
      explicit.get(area) || (issueType === "both" ? "both" : issueType),
  }));

  return { issueType, affectedAreas, classifications };
}

function applyHealthRules(normalTargets, healthState, profile = {}, config = {}) {
  const targets = { ...normalTargets };
  const armAreas = new Set(["wrist", "elbow", "forearm"]);
  const strength = {
    physical_discomfort: 1,
    previous_injury: 2,
    both: 3,
  };

  let weightShift = 0;
  let swingweightShift = 0;
  let balanceShift = 0;
  let stiffnessShift = 0;
  let hasPreviousInjury = false;
  let hasBoth = false;

  for (const item of healthState.classifications || []) {
    const amount = strength[item.classification] || 0;
    if (!amount) continue;

    weightShift -= amount;
    swingweightShift -= amount;

    if (armAreas.has(item.area_code)) {
      balanceShift -= amount;
      stiffnessShift -= amount;
    }

    if (item.classification === "previous_injury") hasPreviousInjury = true;
    if (item.classification === "both") hasBoth = true;
  }

  // Health influences are applied after normal saturation. One influence step
  // moves 15% of the remaining normal-range distance in the protective direction.
  const move = (value, limit, steps) => {
    if (!steps) return value;
    const pct = Math.min(Math.abs(steps) * 0.15, 0.95);
    return value + (limit - value) * pct;
  };

  if (weightShift) targets.unstrung_weight = move(targets.unstrung_weight, 250, weightShift);
  if (swingweightShift) targets.swingweight = move(targets.swingweight, 305, swingweightShift);
  if (balanceShift) targets.balance = move(targets.balance, -9, balanceShift);
  if (stiffnessShift) targets.stiffness = move(targets.stiffness, 54, stiffnessShift);

  const p = config.parameterMap || {};
  const caps = {};

  if (hasPreviousInjury || hasBoth) {
    caps.unstrung_weight = Number(p.injury_static_weight_cap_g ?? 300);
    caps.swingweight = hasBoth ? 320 : 325;
  }

  if (String(profile.gender || "").toLowerCase() === "female") {
    const femaleWeightCap = Number(p.female_static_weight_cap_g ?? 300);
    const femaleSwingCap = Number(p.female_swingweight_cap ?? 320);
    caps.unstrung_weight = Math.min(caps.unstrung_weight ?? Infinity, femaleWeightCap);
    caps.swingweight = Math.min(caps.swingweight ?? Infinity, femaleSwingCap);
  }

  if (profile.age != null && profile.age >= 12 && profile.age <= 18) {
    caps.stiffness = 64;
  }

  if (Number.isFinite(caps.unstrung_weight)) targets.unstrung_weight = Math.min(targets.unstrung_weight, caps.unstrung_weight);
  if (Number.isFinite(caps.swingweight)) targets.swingweight = Math.min(targets.swingweight, caps.swingweight);
  if (Number.isFinite(caps.stiffness)) targets.stiffness = Math.min(targets.stiffness, caps.stiffness);

  // Absolute specification bounds.
  targets.head_size = Math.max(95, Math.min(107, targets.head_size));
  targets.stiffness = Math.max(54, Math.min(74, targets.stiffness));
  targets.balance = Math.max(-9, Math.min(9, targets.balance));
  targets.unstrung_weight = Math.max(250, Math.min(340, targets.unstrung_weight));
  targets.swingweight = Math.max(305, Math.min(370, targets.swingweight));

  return { targets, caps, healthInfluences: { weightShift, swingweightShift, balanceShift, stiffnessShift } };
}

function calculateHealthComfortInfluence(healthState) {
  if (!healthState || healthState.issueType === "none") return 0;
  if (healthState.issueType === "physical_discomfort") return 1;
  return 2;
}

function balanceCmToPoints(balanceCm) {
  const midpoint = 34.3;
  const points = (Number(balanceCm) - midpoint) / 0.3;
  return Math.abs(points) < 0.000001 ? 0 : points;
}

function scoreStringPattern(targetPattern, racketPattern) {
  const order = ["16x18", "16x19", "16x20", "18x19", "18x20"];
  const normalize = (v) => String(v || "").toLowerCase().replace(/[×*]/g, "x").replace(/\s+/g, "");
  const a = order.indexOf(normalize(targetPattern));
  const b = order.indexOf(normalize(racketPattern));
  if (a < 0 || b < 0) return 0;
  return [10, 8, 5, 2, 0][Math.abs(a - b)] ?? 0;
}

function scoreTechnicalDifference(key, target, racketValue) {
  const diff = Math.abs(Number(target) - Number(racketValue));
  if (!Number.isFinite(diff)) return 0;

  if (key === "head_size") return Math.max(0, 10 - 2 * diff);
  if (key === "stiffness") return diff <= 1 ? 10 : Math.max(0, 11 - Math.ceil(diff));
  if (key === "unstrung_weight") return diff <= 5 ? 10 : Math.max(0, 11 - Math.ceil(diff / 5));
  if (key === "swingweight") return diff <= 3 ? 10 : Math.max(0, 11 - Math.ceil(diff / 3));

  if (key === "balance") {
    const t = Number(target);
    const r = Number(racketValue);
    if (t !== 0 && r !== 0 && Math.sign(t) !== Math.sign(r)) return 0;
    const d = Math.abs(t - r);
    return d === 0 ? 10 : d <= 1 ? 8 : d <= 2 ? 6 : d <= 3 ? 4 : d <= 4 ? 2 : 0;
  }

  return 0;
}

function calculateCharacteristicCompatibility(playerTarget, racketScore) {
  return Math.max(0, 10 - Math.abs(Number(playerTarget) - Number(racketScore)));
}

function scoreRacket(racket, technicalTargets, stringPatternTarget, characteristicTargets, caps = {}) {
  const racketBalance = balanceCmToPoints(racket.balance_cm);
  const hardFailures = [];
  if (Number.isFinite(caps.unstrung_weight) && Number(racket.unstrung_weight_g) > caps.unstrung_weight) hardFailures.push("unstrung_weight_cap");
  if (Number.isFinite(caps.swingweight) && Number(racket.swingweight) > caps.swingweight) hardFailures.push("swingweight_cap");
  if (Number.isFinite(caps.stiffness) && Number(racket.stiffness_ra) > caps.stiffness) hardFailures.push("stiffness_cap");

  if (hardFailures.length) return { eligible: false, hardFailures };

  const technical = {
    head_size: scoreTechnicalDifference("head_size", technicalTargets.head_size, racket.head_size),
    string_pattern: scoreStringPattern(stringPatternTarget, racket.string_pattern),
    stiffness: scoreTechnicalDifference("stiffness", technicalTargets.stiffness, racket.stiffness_ra),
    balance: scoreTechnicalDifference("balance", technicalTargets.balance, racketBalance),
    unstrung_weight: scoreTechnicalDifference("unstrung_weight", technicalTargets.unstrung_weight, racket.unstrung_weight_g),
    swingweight: scoreTechnicalDifference("swingweight", technicalTargets.swingweight, racket.swingweight),
  };
  const technicalScore = Object.values(technical).reduce((a, b) => a + b, 0) / 6;

  const fieldMap = {
    power: "power_score", control: "control_score", spin: "spin_score",
    forgiveness: "forgiveness_score", maneuverability: "maneuverability_score",
    stability: "stability_score", feel_touch: "feel_touch_score", comfort: "comfort_score",
  };
  const characteristics = {};
  for (const [key, field] of Object.entries(fieldMap)) {
    characteristics[key] = calculateCharacteristicCompatibility(characteristicTargets[key], racket[field]);
  }
  const characteristicScore = Object.values(characteristics).reduce((a, b) => a + b, 0) / 8;
  const finalScore = technicalScore * 0.6 + characteristicScore * 0.4;

  const normalizedDeviation =
    Math.abs(Number(technicalTargets.head_size) - Number(racket.head_size)) / 12 +
    Math.abs(Number(technicalTargets.stiffness) - Number(racket.stiffness_ra)) / 20 +
    Math.abs(Number(technicalTargets.balance) - racketBalance) / 18 +
    Math.abs(Number(technicalTargets.unstrung_weight) - Number(racket.unstrung_weight_g)) / 90 +
    Math.abs(Number(technicalTargets.swingweight) - Number(racket.swingweight)) / 65;

  return { eligible: true, technical, characteristics, technicalScore, characteristicScore, finalScore, normalizedDeviation };
}

function rankRackets(scoredRackets, healthRelevant = false) {
  return scoredRackets
    .filter((item) => item.score.eligible)
    .sort((a, b) => {
      const sa = a.score, sb = b.score;
      if (sb.finalScore !== sa.finalScore) return sb.finalScore - sa.finalScore;
      if (sb.technicalScore !== sa.technicalScore) return sb.technicalScore - sa.technicalScore;
      if (sb.characteristicScore !== sa.characteristicScore) return sb.characteristicScore - sa.characteristicScore;
      if (healthRelevant && sb.characteristics.comfort !== sa.characteristics.comfort) return sb.characteristics.comfort - sa.characteristics.comfort;
      if (sa.normalizedDeviation !== sb.normalizedDeviation) return sa.normalizedDeviation - sb.normalizedDeviation;
      return Number(a.racket.racket_id) - Number(b.racket.racket_id);
    });
}


async function loadEligibleRackets() {
  const result = await pool.query(`
    SELECT
      r.racket_id,
      r.name,
      r.image_url,
      r.description,
      b.name AS brand_name,
      rs.head_size,
      rs.string_pattern,
      rs.stiffness_ra,
      rs.balance_cm,
      rs.unstrung_weight_g,
      rs.swingweight,
      rc.power_score,
      rc.control_score,
      rc.spin_score,
      rc.forgiveness_score,
      rc.maneuverability_score,
      rc.stability_score,
      rc.feel_touch_score,
      rc.comfort_score
    FROM rackets r
    JOIN brands b ON b.brand_id = r.brand_id
    JOIN racket_specifications rs ON rs.racket_id = r.racket_id
    JOIN racket_characteristics rc ON rc.racket_id = r.racket_id
    WHERE r.is_active = TRUE
    ORDER BY r.racket_id
  `);
  return result.rows;
}

async function generateRecommendation(attemptId, userId) {
  const [config, input, rackets] = await Promise.all([
    loadAlgorithmConfig(),
    loadRecommendationInput(attemptId, userId),
    loadEligibleRackets(),
  ]);

  const selectedAnswers = input.optionAnswers.map((answer) => Number(answer.answer_option_id));
  const gameProfileRoles = {};
  for (const answer of input.optionAnswers) {
    if (answer.selection_role === "primary" || answer.selection_role === "secondary") {
      gameProfileRoles[Number(answer.answer_option_id)] = answer.selection_role;
    }
  }

  const healthState = buildHealthState(selectedAnswers, input.healthClassifications);
  const neutralTargets = createNeutralTechnicalTargets(config);
  let technicalInfluences = collectTechnicalInfluences(config, selectedAnswers, gameProfileRoles);
  technicalInfluences = applyUtrInfluence(technicalInfluences, input.numericAnswers);

  let technicalTargets = calculateNormalTechnicalTargets(config, neutralTargets, technicalInfluences);
  // Current-racket calibration is a reference target; health protection is applied afterwards
  // so health always has priority over an equipment complaint.
  technicalTargets = applyCurrentRacketCalibration(technicalTargets, input.currentRacket, selectedAnswers);
  const healthResult = applyHealthRules(technicalTargets, healthState, input.profile, config);
  technicalTargets = healthResult.targets;

  const stringPattern = calculateStringPatternTarget(config, selectedAnswers, gameProfileRoles);
  let characteristicTargets = calculateCharacteristicTargets(config, selectedAnswers, gameProfileRoles);
  characteristicTargets = applyHealthComfortToCharacteristics(characteristicTargets, healthState, config);

  const scoredRackets = rackets.map((racket) => ({
    racket,
    score: scoreRacket(
      racket,
      technicalTargets,
      stringPattern.target,
      characteristicTargets,
      healthResult.caps
    ),
  }));

  const ranked = rankRackets(scoredRackets, healthState.issueType !== "none");
  const topMatches = ranked.slice(0, 3).map((item, index) => ({
    rank: index + 1,
    racket: item.racket,
    final_match_score: item.score.finalScore,
    technical_suitability_score: item.score.technicalScore,
    characteristics_score: item.score.characteristicScore,
    technical_compatibility: item.score.technical,
    characteristic_compatibility: item.score.characteristics,
    normalized_technical_deviation: item.score.normalizedDeviation,
  }));

  return {
    algorithm: {
      algorithm_version_id: config.version.algorithm_version_id,
      version: config.version.version,
    },
    attempt_id: Number(attemptId),
    targets: {
      technical: technicalTargets,
      string_pattern: stringPattern,
      characteristics: characteristicTargets,
    },
    health: {
      state: healthState,
      caps: healthResult.caps,
    },
    summary: {
      total_rackets_scored: scoredRackets.length,
      eligible_rackets: ranked.length,
      excluded_rackets: scoredRackets.length - ranked.length,
      matches_returned: topMatches.length,
    },
    matches: topMatches,
    ranking: ranked,
  };
}

module.exports = {
  loadAlgorithmConfig,
  calculateCharacteristicTargets,
  loadRecommendationInput,
  createNeutralTechnicalTargets,
  collectTechnicalInfluences,
  getSaturationPercentage,
  calculateNormalTechnicalTargets,
  calculateStringPatternTarget,
  applyUtrInfluence,
  applyCurrentRacketCalibration,
  applyHealthComfortToCharacteristics,
  buildHealthState,
  applyHealthRules,
  calculateHealthComfortInfluence,
  balanceCmToPoints,
  scoreStringPattern,
  scoreTechnicalDifference,
  calculateCharacteristicCompatibility,
  scoreRacket,
  rankRackets,
  loadEligibleRackets,
  generateRecommendation,
};