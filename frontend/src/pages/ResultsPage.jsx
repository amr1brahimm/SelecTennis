const demoResults = {
  profile: {
    headSize: "98 sq in",
    stringPattern: "16 × 19",
    stiffness: "61–63 RA",
    balance: "7 pts HL",
    unstrungWeight: "305 g",
    swingweight: "324",
    priorities: ["Control", "Spin", "Maneuverability", "Comfort"],
  },

  recommendations: [
    {
      rank: 1,
      racketId: 1,
      brand: "Wilson",
      name: "Blade 98 v9",
    imageUrl:"https://img.tennis-warehouse.com/watermark/rs.php?path=WB9810-1.jpg&nw=455",
      description:
        "Control-oriented performance frame designed for precision, feel, and confident ball striking.",

      overallMatch: 95,
      technicalSuitability: 9.6,
      playingCharacteristics: 9.3,

      specs: {
        headSize: "98 sq in",
        stringPattern: "16 × 19",
        stiffness: "62 RA",
        balance: "7 pts HL",
        unstrungWeight: "305 g",
        swingweight: "326",
      },

      characteristics: {
        power: 7.6,
        control: 9.6,
        spin: 8.8,
        forgiveness: 7.9,
        maneuverability: 8.9,
        stability: 9.1,
        feelTouch: 9.7,
        comfort: 9.2,
      },

      reasons: [
        "Its swingweight closely matches your calculated target, providing stability while maintaining maneuverability.",
        "Its flexible setup aligns well with the comfort requirements identified in your profile.",
        "Its control-oriented response aligns with your preference for precise ball placement.",
        "Its strong Feel / Touch rating complements your preference for variety and touch.",
      ],
    },

    {
      rank: 2,
      racketId: 2,
      brand: "Yonex",
      name: "EZONE 98",
      imageUrl: "https://img.tennis-warehouse.com/watermark/rs.php?path=EZ98BB-1.jpg&nw=455",
      description:
        "A responsive performance frame combining accessible power with precision.",

      overallMatch: 91,
      technicalSuitability: 9.2,
      playingCharacteristics: 9.0,

      specs: {
        headSize: "98 sq in",
        stringPattern: "16 × 19",
        stiffness: "65 RA",
        balance: "6 pts HL",
        unstrungWeight: "305 g",
        swingweight: "318",
      },

      characteristics: {
        power: 8.6,
        control: 8.8,
        spin: 8.6,
        forgiveness: 8.5,
        maneuverability: 9.2,
        stability: 8.4,
        feelTouch: 8.6,
        comfort: 8.4,
      },

      reasons: [
        "Its balance and swingweight provide a maneuverable response that fits your playing profile.",
        "Its combination of power and control aligns well with your calculated characteristic targets.",
        "Its forgiving response provides additional support on less-than-perfect contact.",
      ],
    },

    {
      rank: 3,
      racketId: 3,
      brand: "Babolat",
      name: "Pure Aero 98",
      imageUrl: "https://img.tennis-warehouse.com/watermark/rs.php?path=BPA98R-1.jpg&nw=455",
      description:
        "A spin-focused performance frame offering strong control and stability.",

      overallMatch: 88,
      technicalSuitability: 8.7,
      playingCharacteristics: 9.0,

      specs: {
        headSize: "98 sq in",
        stringPattern: "16 × 20",
        stiffness: "69 RA",
        balance: "6 pts HL",
        unstrungWeight: "305 g",
        swingweight: "327",
      },

      characteristics: {
        power: 8.8,
        control: 8.4,
        spin: 9.8,
        forgiveness: 8.0,
        maneuverability: 8.5,
        stability: 8.8,
        feelTouch: 8.1,
        comfort: 7.8,
      },

      reasons: [
        "Its strong spin characteristics align closely with your spin priorities.",
        "Its stability supports confident ball striking from the baseline.",
        "Its 16 × 20 pattern provides a strong blend of spin potential and directional control.",
      ],
    },
  ],
};
function ProfileMetric({ label, value }) {
  return (
    <div className="bg-[#e6f8ed] px-3 py-4 rounded-lg flex flex-col justify-between min-h-[105px]">
      <span className="text-[10px] uppercase tracking-wider font-bold text-[#414844] whitespace-nowrap">
        {label}
      </span>

      <span className="text-xl font-bold text-[#002217] mt-2 whitespace-nowrap">
  {value}
</span>
    </div>
  );
}
function FeaturedRecommendation({ racket }) {
  const characteristics = [
    ["Power", racket.characteristics.power],
    ["Control", racket.characteristics.control],
    ["Spin", racket.characteristics.spin],
    ["Forgiveness", racket.characteristics.forgiveness],
    ["Maneuverability", racket.characteristics.maneuverability],
    ["Stability", racket.characteristics.stability],
    ["Feel / Touch", racket.characteristics.feelTouch],
    ["Comfort", racket.characteristics.comfort],
  ];

  const specs = [
    ["Head Size", racket.specs.headSize],
    ["Pattern", racket.specs.stringPattern],
    ["Stiffness", racket.specs.stiffness],
    ["Balance", racket.specs.balance],
    ["Unstrung Weight", racket.specs.unstrungWeight],
    ["Swingweight", racket.specs.swingweight],
  ];

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* TOP BANNER */}
      <div className="bg-[#0f382a] text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#cff143] text-[#002217] text-xs font-bold">
            {racket.rank}
          </span>

          <span className="text-xs uppercase tracking-widest text-[#cff143] font-bold">
            Best Match Recommendation
          </span>
        </div>

        <span className="hidden sm:block text-xs uppercase tracking-wider text-[#a5d0bc]">
          Top Match
        </span>
      </div>

      <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT SIDE */}
        <div className="lg:col-span-4 flex flex-col items-center text-center gap-6">

          <div className="w-full aspect-square max-w-[280px] rounded-xl bg-[#e6f8ed] flex items-center justify-center p-5">
            {racket.imageUrl ? (
              <img
                src={racket.imageUrl}
                alt={`${racket.brand} ${racket.name}`}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-[#717974] text-sm">
                Racket image
              </span>
            )}
          </div>

          {/* SCORES */}
          <div className="w-full bg-[#e6f8ed] p-5 rounded-xl">
            <div className="text-4xl font-bold text-[#002217]">
              {racket.overallMatch}%
            </div>

            <div className="text-xs uppercase tracking-wider text-[#414844] mt-1">
              Overall Match
            </div>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#414844] block">
                  Technical Suitability
                </span>

                <span className="text-xl font-bold text-[#002217]">
                  {racket.technicalSuitability}
                </span>

                <span className="text-xs text-[#414844]"> / 10</span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#414844] block">
                  Playing Characteristics
                </span>

                <span className="text-xl font-bold text-[#002217]">
                  {racket.playingCharacteristics}
                </span>

                <span className="text-xs text-[#414844]"> / 10</span>
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="w-full flex flex-col gap-2">
            <button
              type="button"
              className="w-full py-3.5 px-6 rounded-lg bg-[#cff143] text-[#002217] font-bold hover:brightness-95 transition"
            >
              Book a Demo
            </button>

            <button
              type="button"
              className="w-full py-3 px-6 rounded-lg bg-[#ecfef3] text-[#002217] font-semibold hover:bg-[#e1f2e8] transition"
            >
              View Racket Details
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-8 space-y-6">

          <div>
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="text-3xl font-bold text-[#002217]">
                {racket.brand} {racket.name}
              </h3>

              <span className="text-lg text-[#414844]">
                ({racket.specs.stringPattern})
              </span>
            </div>

            <p className="text-sm text-[#414844] mt-2">
              {racket.description}
            </p>
          </div>

          {/* SPECS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-lg bg-[#e6f8ed]">
            {specs.map(([label, value]) => (
              <div key={label}>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#414844]">
                  {label}
                </span>

                <p className="font-semibold text-[#002217]">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* CHARACTERISTICS */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#414844] font-bold">
              Playing Characteristics
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {characteristics.map(([label, value]) => (
                <div key={label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{label}</span>
                    <span className="font-bold text-[#002217]">
                      {value}
                    </span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-[#dbece2] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#0f382a]"
                      style={{ width: `${value * 10}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WHY IT MATCHES */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs uppercase tracking-wider text-[#002217] font-bold">
              Why It Matches You
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {racket.reasons.map((reason, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-[#e6f8ed] text-sm text-[#414844]"
                >
                  {reason}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </article>
  );
}
function SecondaryRecommendation({ racket }) {
  const specs = [
    ["Head Size", racket.specs.headSize],
    ["Pattern", racket.specs.stringPattern],
    ["Stiffness", racket.specs.stiffness],
    ["Balance", racket.specs.balance],
    ["Unstrung Weight", racket.specs.unstrungWeight],
    ["Swingweight", racket.specs.swingweight],
  ];

  return (
    <article className="bg-white rounded-xl shadow-sm p-6 sm:p-7 flex flex-col justify-between gap-6">
      <div className="space-y-5">

        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex shrink-0 items-center justify-center w-7 h-7 rounded-full bg-[#e1f2e8] text-[#002217] text-xs font-bold">
              {racket.rank}
            </span>

            <div>
              <h3 className="text-xl font-bold text-[#002217]">
                {racket.brand} {racket.name}
              </h3>

              <span className="text-xs text-[#414844]">
                {racket.specs.stringPattern}
              </span>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e1f2e8]">
            <span className="text-[10px] uppercase font-semibold text-[#414844]">
              Match
            </span>

            <span className="font-bold text-[#002217]">
              {racket.overallMatch}%
            </span>
          </div>
        </div>

        {/* IMAGE + SCORES */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">

          <div className="sm:col-span-5 aspect-square max-h-[190px] mx-auto rounded-lg bg-[#e6f8ed] p-3 flex items-center justify-center">
            {racket.imageUrl ? (
              <img
                src={racket.imageUrl}
                alt={`${racket.brand} ${racket.name}`}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="text-sm text-[#717974]">
                Racket image
              </span>
            )}
          </div>

          <div className="sm:col-span-7 space-y-3">

            <div className="flex justify-between border-b border-[#e1f2e8] pb-2">
              <span className="text-sm text-[#414844]">
                Overall Match
              </span>

              <span className="font-bold text-[#002217]">
                {racket.overallMatch}%
              </span>
            </div>

            <div className="flex justify-between border-b border-[#e1f2e8] pb-2">
              <span className="text-sm text-[#414844]">
                Technical Suitability
              </span>

              <span className="font-bold text-[#002217]">
                {racket.technicalSuitability} / 10
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-sm text-[#414844]">
                Playing Characteristics
              </span>

              <span className="font-bold text-[#002217]">
                {racket.playingCharacteristics} / 10
              </span>
            </div>

          </div>
        </div>

        {/* SPECS */}
        <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-[#e6f8ed]">
          {specs.map(([label, value]) => (
            <div key={label} className="text-center">
              <span className="text-[9px] uppercase tracking-wider font-bold text-[#414844]">
                {label}
              </span>

              <p className="text-sm font-semibold text-[#002217] mt-1">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* WHY IT MATCHES */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-wider font-bold text-[#002217]">
            Why It Matches You
          </h4>

          <ul className="space-y-2">
            {racket.reasons.slice(0, 3).map((reason, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-[#414844]"
              >
                <span className="text-[#546500] font-bold">✓</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* BUTTONS */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="py-2.5 px-4 rounded-lg bg-[#dbece2] hover:bg-[#cff143] text-[#002217] font-bold transition"
        >
          Book a Demo
        </button>

        <button
          type="button"
          className="py-2.5 px-4 rounded-lg bg-[#ecfef3] hover:bg-[#e1f2e8] text-[#002217] font-semibold transition"
        >
          View Racket Details
        </button>
      </div>
    </article>
  );
}
function ComparisonTable({ rackets }) {
  const [first, second, third] = rackets;

  const rows = [
    {
      label: "Overall Match",
      values: rackets.map((racket) => `${racket.overallMatch}% Match`),
      important: true,
    },
    {
      label: "Technical Suitability",
      values: rackets.map(
        (racket) => `${racket.technicalSuitability} / 10`
      ),
    },
    {
      label: "Playing Characteristics",
      values: rackets.map(
        (racket) => `${racket.playingCharacteristics} / 10`
      ),
    },

    { section: "Physical Specifications" },

    {
      label: "Head Size",
      values: rackets.map((racket) => racket.specs.headSize),
    },
    {
      label: "String Pattern",
      values: rackets.map((racket) => racket.specs.stringPattern),
    },
    {
      label: "Stiffness",
      values: rackets.map((racket) => racket.specs.stiffness),
    },
    {
      label: "Balance",
      values: rackets.map((racket) => racket.specs.balance),
    },
    {
      label: "Unstrung Weight",
      values: rackets.map((racket) => racket.specs.unstrungWeight),
    },
    {
      label: "Swingweight",
      values: rackets.map((racket) => racket.specs.swingweight),
    },

    { section: "Playing Characteristics" },

    {
      label: "Power",
      values: rackets.map((racket) => racket.characteristics.power),
    },
    {
      label: "Control",
      values: rackets.map((racket) => racket.characteristics.control),
    },
    {
      label: "Spin",
      values: rackets.map((racket) => racket.characteristics.spin),
    },
    {
      label: "Forgiveness",
      values: rackets.map((racket) => racket.characteristics.forgiveness),
    },
    {
      label: "Maneuverability",
      values: rackets.map(
        (racket) => racket.characteristics.maneuverability
      ),
    },
    {
      label: "Stability",
      values: rackets.map((racket) => racket.characteristics.stability),
    },
    {
      label: "Feel / Touch",
      values: rackets.map((racket) => racket.characteristics.feelTouch),
    },
    {
      label: "Comfort",
      values: rackets.map((racket) => racket.characteristics.comfort),
    },
  ];

  return (
    <section className="bg-white rounded-xl shadow-sm p-6 sm:p-8 space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-xl font-bold text-[#002217]">
          Compare Your Matches
        </h2>

        <p className="text-sm text-[#414844] mt-1">
          Side-by-side comparison of your recommended rackets
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-[850px] w-full text-left text-sm">
          <thead>
            <tr className="bg-[#e6f8ed] text-[#002217]">
              <th className="py-3 px-4 rounded-l-lg text-xs uppercase tracking-wider">
                Specification • Metric
              </th>

              {[first, second, third].map((racket) => (
                <th
                  key={racket.racketId}
                  className="py-3 px-4 text-xs uppercase tracking-wider"
                >
                  #{racket.rank} {racket.brand} {racket.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#e1f2e8]">
            {rows.map((row, index) => {
              if (row.section) {
                return (
                  <tr key={row.section}>
                    <td
                      colSpan="4"
                      className="py-2 px-4 bg-[#dbece2]/60 text-[#002217] text-xs uppercase tracking-wider font-bold"
                    >
                      {row.section}
                    </td>
                  </tr>
                );
              }

              return (
                <tr
                  key={`${row.label}-${index}`}
                  className="hover:bg-[#e6f8ed]/50 transition"
                >
                  <td className="py-3 px-4 text-[#414844] font-medium">
                    {row.label}
                  </td>

                  {row.values.map((value, valueIndex) => (
                    <td
                      key={valueIndex}
                      className={`py-3 px-4 ${
                        valueIndex === 0
                          ? "font-semibold text-[#002217]"
                          : "text-[#101e18]"
                      }`}
                    >
                      {row.important && valueIndex === 0 ? (
                        <span className="inline-block px-2.5 py-1 rounded bg-[#cff143] text-[#002217] font-bold">
                          {value}
                        </span>
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function formatBalance(points) {
  const n = Number(points);
  if (!Number.isFinite(n) || n === 0) return "Even";
  return `${Math.abs(n).toFixed(1).replace(/\.0$/, "")} pts ${n < 0 ? "HL" : "HH"}`;
}

function normalizeApiResults(api) {
  if (!api?.matches) return demoResults;

  const t = api.targets?.technical || {};
  const c = api.targets?.characteristics || {};

  const characteristicLabels = {
    power: "Power",
    control: "Control",
    spin: "Spin",
    forgiveness: "Forgiveness",
    maneuverability: "Maneuverability",
    stability: "Stability",
    feel_touch: "Feel / Touch",
    comfort: "Comfort",
  };

  const technicalLabels = {
    head_size: "head size",
    string_pattern: "string pattern",
    stiffness: "stiffness",
    balance: "balance",
    unstrung_weight: "unstrung weight",
    swingweight: "swingweight",
  };

  const priorities = Object.entries(c)
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .slice(0, 4)
    .map(([key]) => characteristicLabels[key] || key);

  function buildReasons(match) {
    const technical = match.technical_compatibility || {};
    const characteristics = match.characteristic_compatibility || {};

    const reasons = [];

    // 1. Strongest characteristic matches
    const characteristicMatches = Object.entries(characteristics)
      .filter(([, score]) => Number(score) >= 8)
      .sort((a, b) => Number(b[1]) - Number(a[1]));

    if (characteristicMatches.length >= 2) {
      const first = characteristicLabels[characteristicMatches[0][0]];
      const second = characteristicLabels[characteristicMatches[1][0]];

      reasons.push(
        `Strong ${first.toLowerCase()} and ${second.toLowerCase()} characteristics match the playing profile you described.`
      );
    } else if (characteristicMatches.length === 1) {
      const label = characteristicLabels[characteristicMatches[0][0]];

      reasons.push(
        `Its ${label.toLowerCase()} characteristics closely match the playing profile you described.`
      );
    }

    // 2. Strongest technical matches
    const technicalMatches = Object.entries(technical)
      .filter(([, score]) => Number(score) >= 8)
      .sort((a, b) => Number(b[1]) - Number(a[1]));

    if (technicalMatches.length >= 2) {
      const first = technicalLabels[technicalMatches[0][0]];
      const second = technicalLabels[technicalMatches[1][0]];

      reasons.push(
        `Its ${first} and ${second} closely match the technical specifications calculated for you.`
      );
    } else if (technicalMatches.length === 1) {
      const label = technicalLabels[technicalMatches[0][0]];

      reasons.push(
        `Its ${label} closely matches the technical profile calculated for you.`
      );
    }

    // 3. Add another personalized characteristic reason
    if (characteristicMatches.length >= 3) {
      const label = characteristicLabels[characteristicMatches[2][0]];

      reasons.push(
        `It also scores highly for ${label.toLowerCase()}, another strong match for your racket profile.`
      );
    }

    // Fallbacks so we always have useful explanations
    if (reasons.length < 3 && technicalMatches.length >= 3) {
      const label = technicalLabels[technicalMatches[2][0]];

      reasons.push(
        `Its ${label} is also well aligned with your calculated technical target.`
      );
    }

    if (reasons.length < 3) {
      reasons.push(
        `Overall, its combination of specifications and playing characteristics makes it one of your strongest matches.`
      );
    }

    return reasons.slice(0, 3);
  }

  return {
    profile: {
      headSize: `${Number(t.head_size)
        .toFixed(1)
        .replace(/\.0$/, "")} sq in`,

      stringPattern: (api.targets?.string_pattern?.target || "—").replace(
        "x",
        " × "
      ),

      stiffness: `${Number(t.stiffness)
        .toFixed(1)
        .replace(/\.0$/, "")} RA`,

      balance: formatBalance(t.balance),

      unstrungWeight: `${Number(t.unstrung_weight).toFixed(0)} g`,

      swingweight: Number(t.swingweight)
        .toFixed(1)
        .replace(/\.0$/, ""),

      priorities,
    },

    recommendations: api.matches.map((m) => {
      const r = m.racket;

      return {
        rank: m.rank,
        racketId: r.racket_id,
        brand: r.brand_name,
        name: r.name,
        imageUrl: r.image_url,
        description: r.description,

        overallMatch: Math.round(Number(m.final_match_score) * 10),

        technicalSuitability: Number(
          m.technical_suitability_score
        ).toFixed(1),

        playingCharacteristics: Number(
          m.characteristics_score
        ).toFixed(1),

        specs: {
          headSize: `${r.head_size} sq in`,
          stringPattern: String(r.string_pattern).replace("x", " × "),
          stiffness: `${r.stiffness_ra} RA`,
          balance: `${r.balance_cm} cm`,
          unstrungWeight: `${r.unstrung_weight_g} g`,
          swingweight: r.swingweight,
        },

        characteristics: {
          power: Number(r.power_score),
          control: Number(r.control_score),
          spin: Number(r.spin_score),
          forgiveness: Number(r.forgiveness_score),
          maneuverability: Number(r.maneuverability_score),
          stability: Number(r.stability_score),
          feelTouch: Number(r.feel_touch_score),
          comfort: Number(r.comfort_score),
        },

        reasons: buildReasons(m),
      };
    }),
  };
}

export default function ResultsPage({ apiResults }) {
  const results = normalizeApiResults(apiResults);
  const [first, second, third] = results.recommendations;

  return (
  <main className="min-h-screen w-full bg-[#ecfef3]">
  <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-10">
        

      {/* PAGE INTRO */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0f382a] text-[#cff143]">
            <span className="w-2 h-2 rounded-full bg-[#cff143]" />
            <span className="text-xs uppercase tracking-wider font-semibold">
              Questionnaire Complete
            </span>
          </div>

          <span className="text-sm text-[#414844]">
            Saved to your profile
          </span>
        </div>

        <div className="max-w-3xl space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-[#002217] tracking-tight">
            Your Racket Recommendations
          </h1>

          <p className="text-base text-[#414844]">
            Based on your playing profile, preferences, physical suitability,
            and current equipment feedback, we found the rackets that match you
            best.
          </p>
           {/* CALCULATED RACKET PROFILE */}
      <section className="w-full bg-white rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-6">

          <div>
            <h2 className="text-sm uppercase tracking-wider text-[#002217] font-bold">
              Your Calculated Racket Profile
            </h2>

            <p className="text-sm text-[#414844] mt-1">
              Your personalized technical targets based on your questionnaire.
            </p>
          </div>

          {/* SIX TECHNICAL TARGETS */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">

            <ProfileMetric
              label="Head Size"
              value={results.profile.headSize}
            />

            <ProfileMetric
              label="String Pattern"
              value={results.profile.stringPattern}
            />

            <ProfileMetric
              label="Stiffness"
              value={results.profile.stiffness}
            />

            <ProfileMetric
              label="Balance"
              value={results.profile.balance}
            />

            <ProfileMetric
              label="Unstrung Weight"
              value={results.profile.unstrungWeight}
            />

            <ProfileMetric
              label="Swingweight"
              value={results.profile.swingweight}
            />

          </div>

          {/* PLAYING PRIORITIES */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#414844] whitespace-nowrap">
              Your Playing Priorities:
            </span>

            <div className="flex flex-wrap gap-2">
              {results.profile.priorities.map((priority) => (
                <span
                  key={priority}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0f382a] text-white text-sm font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#cff143]" />
                  {priority}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

          {/* RECOMMENDATIONS */}
<section className="space-y-8">
  <div>
    <h2 className="text-2xl font-bold text-[#002217]">
      Recommended Frames
    </h2>

    <p className="text-sm text-[#414844] mt-1">
      Ranked from your questionnaire responses
    </p>
  </div>

  {first && <FeaturedRecommendation racket={first} />}
</section>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  {second && <SecondaryRecommendation racket={second} />}
  {third && <SecondaryRecommendation racket={third} />}
</div>

        </div>
      </section>
      <ComparisonTable rackets={results.recommendations} />
      {/* BOTTOM CTA */}
<section className="bg-[#0f382a] text-white rounded-xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
  {/* DECORATIVE BACKGROUND */}
  <div className="absolute -right-16 -bottom-16 w-96 h-96 border-4 border-white/5 rounded-full pointer-events-none" />
  <div className="absolute top-0 right-1/4 w-px h-full bg-white/5 pointer-events-none" />

  <div className="relative z-10 max-w-3xl space-y-6">

    <div className="space-y-3">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
        Ready to try your matches on court?
      </h2>

      <p className="text-base text-[#c1ecd7] leading-relaxed">
        Test your recommended rackets on court and see which one feels right
        for your game. You can select up to three rackets for your demo session.
      </p>
    </div>

    {/* MAIN ACTIONS */}
    <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-4">

      <button
        type="button"
        className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#cff143] hover:brightness-95 text-[#002217] font-bold shadow-md transition"
      >
        Book a Racket Demo
      </button>

      <button
        type="button"
        className="w-full sm:w-auto px-6 py-4 rounded-lg bg-[#273244] hover:bg-[#121d2e] text-white font-medium transition"
      >
        Browse Full Racket Database
      </button>

    </div>

    {/* SECONDARY ACTIONS */}
    <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-[#c1ecd7]">

      <button
        type="button"
        className="text-left hover:text-white transition"
      >
        View Questionnaire History
      </button>

      <button
        type="button"
        className="text-left sm:text-right underline hover:text-[#cff143] transition"
      >
        Retake Questionnaire
      </button>

    </div>

  </div>
</section>
    </div>
  </main>
);
}