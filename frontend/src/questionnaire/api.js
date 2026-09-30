import { apiUrl } from "../config/api.js";

const OPTION_MAP = {
  1: { small_slight: 1, medium: 2, medium_built: 3, large_heavy: 4, large_built: 5 },
  2: { less_than_1: 6, "1_3": 7, "4_6": 8, "7_10": 9, "10_plus": 10 },
  3: { "1_2": 11, "3_4": 12, "5_plus": 13 },
  4: { "1_2": 14, "3_4": 15, "5_plus": 16 },
  5: { none: 17, national: 18, regional: 19, international: 20 },
  7: { very_inactive: 21, occasionally_active: 22, moderately_active: 23, very_active: 24, extremely_active: 25 },
  issue_type: { injury: 85, discomfort: 86, both: 87, none: 88 },
  8: { wrist: 89, elbow: 90, forearm: 91, shoulder: 92, back: 93, other: 94 },
  10: { too_heavy: 33, too_light: 34, difficult_to_maneuver: 35, not_enough_power: 36, too_much_power: 37, difficult_to_control: 38, not_enough_spin: 39, unstable: 40, uncomfortable: 41, too_stiff: 42, nothing: 43 },
  12: { hit_through: 44, heavy_topspin: 45, place_precisely: 46, variety_touch: 47 },
  13: { pace: 48, spin_margin: 49, placement_consistency: 50, slice_touch_variation: 51 },
  14: { deeper: 52, baseline: 53, inside_baseline: 54, forward_net: 55 },
  15: { take_early: 56, absorb_redirect: 57, move_back_spin: 58, change_pace: 59 },
  16: { stay_back: 60, approach_net: 61 },
  17: { more_power: 62, balanced: 63, more_control: 64 },
  18: { 1: 65, 2: 69, 3: 73, 4: 77, 5: 81 },
  19: { 1: 66, 2: 70, 3: 74, 4: 78, 5: 82 },
  20: { 1: 67, 2: 71, 3: 75, 4: 79, 5: 83 },
  21: { 1: 68, 2: 72, 3: 76, 4: 80, 5: 84 },
};

const DB_QUESTION_ID = { issue_type: 8, 8: 22, issue_classification: 23, current_racket: 9 };
const reverse = new Map();
for (const [questionId, options] of Object.entries(OPTION_MAP)) {
  for (const [value, id] of Object.entries(options)) reverse.set(Number(id), { questionId, value });
}

export function dbQuestionId(question) { return Number(DB_QUESTION_ID[question.id] ?? question.id); }
export function optionId(questionId, value) { return OPTION_MAP[questionId]?.[value] ?? null; }

async function request(path, options = {}) {
  const token = localStorage.getItem("token");
  const response = await fetch(apiUrl(path), {
    ...options,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `Request failed (${response.status})`);
  return data;
}

export const startQuestionnaire = () => request("/questionnaire/start", { method: "POST" });
export const getActiveQuestionnaire = () => request("/questionnaire/active");
export const completeQuestionnaire = (attempt_id) => request("/questionnaire/complete", { method: "POST", body: JSON.stringify({ attempt_id }) });
export const generateRecommendations = (attempt_id) => request("/recommendations/generate", { method: "POST", body: JSON.stringify({ attempt_id }) });

export async function saveQuestionAnswer(attemptId, question, answer) {
  const question_id = dbQuestionId(question);
  if (question.type === "numeric") {
    if (answer === undefined || answer === null || answer === "") return;
    return request("/questionnaire/answer/numeric", { method: "POST", body: JSON.stringify({ attempt_id: attemptId, question_id, numeric_value: Number(answer), unit: question.unit || null }) });
  }
  if (question.type === "racketSelector") {
    return request("/questionnaire/answer/current-racket", { method: "POST", body: JSON.stringify({ attempt_id: attemptId, racket_id: Number(answer) }) });
  }
  if (question.type === "issueClassification") {
    const classifications = Object.entries(answer || {}).map(([area_code, classification]) => ({
      area_code,
      classification: classification === "injury" ? "previous_injury" : classification === "discomfort" ? "physical_discomfort" : classification,
    }));
    return request("/questionnaire/answer/health-classification", { method: "POST", body: JSON.stringify({ attempt_id: attemptId, question_id, classifications }) });
  }

  let selections = [];
  if (question.type === "multiSelect") selections = (answer?.selected || []).map((value) => ({ value, role: "standard" }));
  else if (question.type === "primarySecondary") {
    if (answer?.primary) selections.push({ value: answer.primary, role: "primary" });
    if (answer?.secondary) selections.push({ value: answer.secondary, role: "secondary" });
  } else selections = [{ value: answer, role: "standard" }];

  const answers = selections.map(({ value, role }) => ({ answer_option_id: optionId(question.id, value), selection_role: role })).filter((item) => item.answer_option_id);
  await request("/questionnaire/answer/option", { method: "POST", body: JSON.stringify({ attempt_id: attemptId, question_id, answers }) });

  if (question.type === "multiSelect" && answer?.details?.trim()) {
    await request("/questionnaire/answer/text", { method: "POST", body: JSON.stringify({ attempt_id: attemptId, question_id, text_value: answer.details.trim() }) });
  }
}

export function hydrateAnswers(payload) {
  const answers = {};
  const grouped = {};
  for (const row of payload.optionAnswers || []) {
    const info = reverse.get(Number(row.answer_option_id));
    if (!info) continue;
    const key = info.questionId;
    grouped[key] ||= [];
    grouped[key].push({ value: info.value, role: row.selection_role });
  }
  for (const [key, rows] of Object.entries(grouped)) {
    if (["8", "10"].includes(key)) answers[Number(key)] = { selected: rows.map((r) => r.value), details: "" };
    else if (["12", "13", "14", "15", "16"].includes(key)) answers[Number(key)] = { primary: rows.find((r) => r.role === "primary")?.value || "", secondary: rows.find((r) => r.role === "secondary")?.value || "" };
    else if (["18", "19", "20", "21"].includes(key)) answers[Number(key)] = Number(rows[0]?.value);
    else answers[key === "issue_type" ? key : Number(key)] = rows[0]?.value;
  }
  for (const row of payload.numericAnswers || []) answers[Number(row.question_id)] = Number(row.numeric_value);
  for (const row of payload.textAnswers || []) {
    const frontendId = Number(row.question_id) === 22 ? 8 : Number(row.question_id);
    if (answers[frontendId] && typeof answers[frontendId] === "object") answers[frontendId].details = row.text_value;
  }
  if (payload.currentRacket?.racket_id) answers.current_racket = Number(payload.currentRacket.racket_id);
  if ((payload.healthClassifications || []).length) {
    answers.issue_classification = Object.fromEntries(payload.healthClassifications.map((r) => [r.area_code, r.classification === "previous_injury" ? "injury" : r.classification === "physical_discomfort" ? "discomfort" : r.classification]));
  }
  return answers;
}
