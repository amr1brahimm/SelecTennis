const questions = [
  // =========================================================
  // SUITABILITY PROFILE — 11 QUESTIONS
  // =========================================================

  {
    id: 1,
    type: "singleChoice",
    section: "Suitability Profile",
    title: "Which best describes your build?",
    description:
      "Choose the option that most closely describes your overall physical build.",
    options: [
      {
        value: "small_slight",
        label: "Small / Slight",
        description:
          "Leaner frame, prioritizes maneuverability and swift acceleration",
      },
      {
        value: "medium",
        label: "Medium",
        description:
          "Average athletic build, balanced strength and racket head speed",
      },
      {
        value: "medium_built",
        label: "Medium / Built",
        description:
          "Toned athletic strength, capable of driving through heavier mass",
      },
      {
        value: "large_heavy",
        label: "Large / Heavy",
        description:
          "Substantial mass and momentum, absorbs impact naturally",
      },
      {
        value: "large_built",
        label: "Large / Built",
        description:
          "High muscle mass and power, benefits from control-oriented mass and stability",
      },
    ],
  },

  {
    id: 2,
    type: "singleChoice",
    section: "Suitability Profile",
    title: "How many years have you been playing tennis?",
    description:
      "Choose the option that best represents your total playing experience.",
    options: [
      { value: "less_than_1", label: "Less than a year" },
      { value: "1_3", label: "1–3 years" },
      { value: "4_6", label: "4–6 years" },
      { value: "7_10", label: "7–10 years" },
      { value: "10_plus", label: "10+ years" },
    ],
  },

  {
    id: 3,
    type: "singleChoice",
    section: "Suitability Profile",
    title: "At your peak, how often did you play tennis?",
    description:
      "Choose the frequency that best represents your most active period.",
    options: [
      { value: "1_2", label: "1–2 days per week" },
      { value: "3_4", label: "3–4 days per week" },
      { value: "5_plus", label: "5+ days per week" },
    ],
  },

  {
    id: 4,
    type: "singleChoice",
    section: "Suitability Profile",
    title: "How often do you currently play tennis?",
    description:
      "Choose the option that best represents your current playing frequency.",
    options: [
      { value: "1_2", label: "1–2 days per week" },
      { value: "3_4", label: "3–4 days per week" },
      { value: "5_plus", label: "5+ days per week" },
    ],
  },

  {
    id: 5,
    type: "singleChoice",
    section: "Suitability Profile",
    title: "What is the highest level at which you have competed?",
    description:
      "Choose the option that best represents your competitive experience.",
    options: [
      { value: "none", label: "Haven’t competed" },
      { value: "national", label: "National level" },
      { value: "regional", label: "Regional level" },
      { value: "international", label: "International level" },
    ],
  },

  {
    id: 6,
    type: "numeric",
    section: "Suitability Profile",
    title: "What is your current UTR?",
    description:
      "If you know your Universal Tennis Rating, enter it below. You can skip this question if you don't know it.",
    optional: true,
    min: 1,
    max: 16.5,
    step: 0.01,
    unit: "UTR",
  },

  {
    id: 7,
    type: "singleChoice",
    section: "Suitability Profile",
    title: "How would you describe your overall activity level?",
    description:
      "Consider your general activity level both on and off the tennis court.",
    options: [
      { value: "very_inactive", label: "Very inactive" },
      { value: "occasionally_active", label: "Occasionally active" },
      { value: "moderately_active", label: "Moderately active" },
      { value: "very_active", label: "Very active" },
      { value: "extremely_active", label: "Extremely active" },
    ],
  },
{
  id: "issue_type",
  section: "Suitability Profile",
  type: "singleChoice",
  title:
    "Do you have any current or previous injuries, or physical discomfort, that could affect your tennis?",
  supportingText:
    "This includes previous injuries that may still influence your comfort or racket choice.",
  options: [
    {
      value: "injury",
      label: "Injury",
      description:
        "I have a current or previous injury that may affect my racket choice.",
    },
    {
      value: "discomfort",
      label: "Discomfort",
      description:
        "I experience pain, soreness, or irritation without an injury.",
    },
    {
      value: "both",
      label: "Both",
      description:
        "I have an injury history and also experience physical discomfort.",
    },
    {
      value: "none",
      label: "None",
      description: "None of these apply to me.",
    },
  ],
},
 {
  id: 8,
  type: "multiSelect",
  section: "Suitability Profile",
  title: "Which areas are affected?",
  description: "Select all that apply.",
  options: [
    { value: "wrist", label: "Wrist", icon: "front_hand" },
    { value: "elbow", label: "Elbow", icon: "hardware" },
    { value: "forearm", label: "Forearm", icon: "accessibility" },
    { value: "shoulder", label: "Shoulder", icon: "sports" },
    {
      value: "back",
      label: "Back",
      icon: "airline_seat_recline_extra",
    },
    { value: "other", label: "Other", icon: "healing" },
  ],
  allowDetails: true,
  detailsOptional: true,
},
{
  id: "issue_classification",
  section: "Suitability Profile",
  type: "issueClassification",
  title: "Tell us a little more about what you're experiencing.",
  supportingText:
    "This helps us distinguish between injuries and discomfort in each affected area.",
},
  {
    id: "current_racket",
    type: "racketSelector",
    section: "Suitability Profile",
    title: "What racket are you currently using?",
    description:
      "Search the racket database and select your current racket.",
    optional: false,
  },

  {
    id: 10,
    type: "multiSelect",
    section: "Suitability Profile",
    title: "How do you feel about your current racket?",
    description: "Select all that apply.",
    options: [
      { value: "too_heavy", label: "Too heavy" },
      { value: "too_light", label: "Too light" },
      {
        value: "difficult_to_maneuver",
        label: "Difficult to maneuver",
      },
      { value: "not_enough_power", label: "Not enough power" },
      { value: "too_much_power", label: "Too much power" },
      {
        value: "difficult_to_control",
        label: "Difficult to control",
      },
      { value: "not_enough_spin", label: "Not enough spin" },
      { value: "unstable", label: "Feels unstable" },
      { value: "uncomfortable", label: "Uncomfortable" },
      { value: "too_stiff", label: "Too stiff" },
      {
        value: "nothing",
        label: "Nothing / No major dislikes",
        exclusive: true,
      },
    ],
    allowDetails: true,
    detailsOptional: true,
  },

 

  // =========================================================
  // GAME PROFILE — 5 QUESTIONS
  // =========================================================

  {
    id: 12,
    type: "primarySecondary",
    section: "Game Profile",
    title: "What is your natural instinct on a comfortable rally ball?",
    description:
      "Choose your primary instinct. You may also select one secondary instinct.",
    options: [
      {
        value: "hit_through",
        label: "Hit through aggressively",
      },
      {
        value: "heavy_topspin",
        label: "Heavy topspin",
      },
      {
        value: "place_precisely",
        label: "Place precisely",
      },
      {
        value: "variety_touch",
        label: "Variety / touch",
      },
    ],
  },

  {
    id: 13,
    type: "primarySecondary",
    section: "Game Profile",
    title: "When you're under pressure, what is your natural response?",
    description:
      "Choose your primary response. You may also select one secondary response.",
    options: [
      {
        value: "pace",
        label: "Hit back with pace",
      },
      {
        value: "spin_margin",
        label: "Spin for margin",
      },
      {
        value: "placement_consistency",
        label: "Placement / consistency",
      },
      {
        value: "slice_touch_variation",
        label: "Slice / touch / variation",
      },
    ],
  },

  {
    id: 14,
    type: "primarySecondary",
    section: "Game Profile",
    title: "Where do you naturally prefer to position yourself during rallies?",
    description:
      "Choose your primary court position. You may also select one secondary position.",
    options: [
      {
        value: "deeper",
        label: "Deeper behind the baseline",
      },
      {
        value: "baseline",
        label: "Around the baseline",
      },
      {
        value: "inside_baseline",
        label: "Inside the baseline",
      },
      {
        value: "forward_net",
        label: "Move forward / net",
      },
    ],
  },

  {
    id: 15,
    type: "primarySecondary",
    section: "Game Profile",
    title: "How do you naturally handle incoming pace?",
    description:
      "Choose your primary response. You may also select one secondary response.",
    options: [
      {
        value: "take_early",
        label: "Take early / redirect aggressively",
      },
      {
        value: "absorb_redirect",
        label: "Absorb / redirect",
      },
      {
        value: "move_back_spin",
        label: "Move back / spin reset",
      },
      {
        value: "change_pace",
        label: "Change pace / variation",
      },
    ],
  },

  {
    id: 16,
    type: "primarySecondary",
    section: "Game Profile",
    title: "When you have an opportunity to move forward, what do you prefer to do?",
    description:
      "Choose your primary instinct. You may also select the other option as a secondary instinct.",
    options: [
      {
        value: "stay_back",
        label: "Stay back",
      },
      {
        value: "approach_net",
        label: "Approach the net / finish",
      },
    ],
  },

  // =========================================================
  // PREFERENCE PROFILE — 5 QUESTIONS
  // =========================================================

  {
    id: 17,
    type: "singleChoice",
    section: "Preference Profile",
    title: "What balance of power and control do you prefer?",
    description:
      "Choose the option that best reflects what you want from your racket.",
    options: [
      {
        value: "more_power",
        label: "More easy pace / depth",
      },
      {
        value: "balanced",
        label: "Balanced",
      },
      {
        value: "more_control",
        label: "More precision / control",
      },
    ],
  },

  {
    id: 18,
    type: "preferenceScale",
    section: "Preference Profile",
    title: "How important is spin to you?",
    description:
      "Choose the level of importance that best matches your preference.",
    characteristic: "spin",
  },

  {
    id: 19,
    type: "preferenceScale",
    section: "Preference Profile",
    title: "How important is maneuverability to you?",
    description:
      "Choose the level of importance that best matches your preference.",
    characteristic: "maneuverability",
  },

  {
    id: 20,
    type: "preferenceScale",
    section: "Preference Profile",
    title: "How important is feel and touch to you?",
    description:
      "Choose the level of importance that best matches your preference.",
    characteristic: "feel_touch",
  },

  {
    id: 21,
    type: "preferenceScale",
    section: "Preference Profile",
    title: "How important is forgiveness to you?",
    description:
      "Choose the level of importance that best matches your preference.",
    characteristic: "forgiveness",
  },
];

export const preferenceScaleOptions = [
  {
    value: 1,
    label: "Not important",
  },
  {
    value: 2,
    label: "Slightly important",
  },
  {
    value: 3,
    label: "Moderately important",
  },
  {
    value: 4,
    label: "Very important",
  },
  {
    value: 5,
    label: "Extremely important",
  },
];

export default questions;