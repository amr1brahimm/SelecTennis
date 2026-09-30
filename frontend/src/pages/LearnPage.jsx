import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const articles = [
  {
    id: "string-pattern",
    image: "/images/learn/string-pattern.png",
    category: "STRINGS",
    icon: "grid_view",
    title: "16 × 19 vs 18 × 20: String Pattern Explained",
    description:
      "Learn how open and dense string patterns influence spin, launch angle, control, and the overall response of a racket.",
  },
  {
    id: "swingweight",
    image: "/images/learn/swingweight.png",
    category: "RACKETS",
    icon: "speed",
    title: "Understanding Swingweight",
    description:
      "Discover why two rackets with similar weights can feel completely different when you swing them.",
  },
  {
    id: "ra-stiffness",
    image: "/images/learn/ra-stiffness.png",
    category: "TECHNOLOGY",
    icon: "straighten",
    title: "What Does RA Stiffness Mean?",
    description:
      "Understand what a racket's RA rating measures and how frame stiffness can influence feel, comfort, and energy return.",
  },
  {
    id: "head-size",
    category: "RACKETS",
    icon: "sports_tennis",
    title: "Head Size Explained",
    description:
      "See how racket head size affects the hitting area, forgiveness, power, and precision.",
  },
  {
    id: "balance",
    category: "TECHNOLOGY",
    icon: "balance",
    title: "Head-Light vs Head-Heavy Balance",
    description:
      "Learn how the distribution of weight through a racket changes maneuverability, stability, and handling.",
  },
  {
    id: "power-control-spin",
    category: "GAME STYLE",
    icon: "bolt",
    title: "Understanding Power, Control, and Spin",
    description:
      "Explore three important playing characteristics and how different racket designs can emphasize each one.",
  },
];

const specs = [
  {
    icon: "aspect_ratio",
    title: "Head Size",
    description:
      "Larger heads generally provide a larger hitting area and more forgiveness, while smaller heads generally emphasize precision.",
  },
  {
    icon: "grid_view",
    title: "String Pattern",
    description:
      "More open patterns can encourage spin and a higher launch, while denser patterns generally provide a more controlled response.",
  },
  {
    icon: "straighten",
    title: "RA Stiffness",
    description:
      "Higher RA values indicate a stiffer frame, while lower values indicate more flexibility, influencing feel, comfort, and energy return.",
  },
  {
    icon: "balance",
    title: "Balance",
    description:
      "Head-light, even, and head-heavy balance describe how weight is distributed and influence maneuverability and stability.",
  },
  {
    icon: "fitness_center",
    title: "Unstrung Weight",
    description:
      "Heavier rackets generally provide greater stability, while lighter rackets are generally easier to maneuver.",
  },
  {
    icon: "speed",
    title: "Swingweight",
    description:
      "Swingweight represents how heavy a racket feels while being swung and has a major influence on stability and maneuverability.",
  },
];

const guides = [
  {
    id: "racket-anatomy",
    number: "01",
    title: "The Modern Racket Anatomy",
    description:
      "Understand the racket head, beam, strings, grip, and the other main components that make up a tennis racket.",
  },
  {
    id: "strings-tension",
    number: "02",
    title: "Understanding Strings & Tension",
    description:
      "Learn how string type and tension can influence comfort, power, control, spin, and the overall response of your racket.",
  },
  {
    id: "customizing-balance",
    number: "03",
    title: "Customizing Balance & Feel",
    description:
      "Explore how equipment adjustments can change racket feel, balance, stability, and handling.",
  },
];

export default function LearnPage({ onNavigate, onOpenArticle }) {
  const openArticle = (articleId) => {
    onOpenArticle?.(articleId);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <SiteHeader active="learn" onNavigate={onNavigate} />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 lg:px-8 lg:pt-24">
          <div className="max-w-4xl">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
              SelecTennis Knowledge
            </div>

           <h1 className="mt-5 text-5xl font-bold tracking-tight text-primary sm:text-6xl lg:text-7xl">
            Learn More About Your Game
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-on-surface-variant">
              Understand your equipment, your options, and the technology
              behind the rackets you play with.
            </p>
          </div>
        </section>

        {/* Featured guide */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => openArticle("choose-right-racket")}
            className="group grid w-full overflow-hidden rounded-[2rem] bg-primary text-left shadow-lg lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-secondary-container">
                Featured Guide
              </div>

              <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
                How to Choose the Right Tennis Racket
              </h2>

              <p className="mt-5 max-w-xl leading-7 text-white/70">
                Understand the key racket specifications and how they affect
                power, control, spin, comfort, and maneuverability.
              </p>

              <div className="mt-8 flex w-fit items-center gap-2 rounded-full bg-secondary-container px-6 py-3 font-bold text-primary">
                Read Guide
                <span className="material-symbols-outlined text-lg transition group-hover:translate-x-1">
                    arrow_forward
                </span>
                </div>

              
            </div>

            <div className="min-h-[280px] overflow-hidden">
  <img
    src="/images/learn/choose-right-racket.png"
    alt="How to choose the right tennis racket"
    className="h-full w-full object-cover"
  />
</div>
          </button>
        </section>

        {/* Articles */}
        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <button
                key={article.id}
                type="button"
                onClick={() => openArticle(article.id)}
                className="group flex min-h-[300px] flex-col rounded-3xl bg-white p-7 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-surface-container-low text-primary">
                  <span className="material-symbols-outlined">
                    {article.icon}
                  </span>
                </div>

                <div className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
                  {article.category}
                </div>

                <h3 className="mt-3 text-xl font-bold leading-snug text-primary">
                  {article.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-on-surface-variant">
                  {article.description}
                </p>

                <div className="mt-6 flex items-center gap-1 font-bold text-primary">
                  Read Article
                  <span className="material-symbols-outlined text-lg transition group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Specifications */}
        <section className="bg-surface-container-low py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">
                Understanding Racket Specifications
              </h2>

              <p className="mt-3 text-on-surface-variant">
                Learn how the main racket specifications affect the way a
                racket plays.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {specs.map((spec) => (
                <div
                  key={spec.title}
                  className="rounded-3xl bg-white p-7 shadow-sm"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary-container text-primary">
                    <span className="material-symbols-outlined">
                      {spec.icon}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-primary">
                    {spec.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-on-surface-variant">
                    {spec.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Guides */}
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">
                Popular Guides
              </h2>

              <p className="mt-3 text-on-surface-variant">
                Go deeper into racket construction, strings, and customization.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {guides.map((guide) => (
              <button
                key={guide.id}
                type="button"
                onClick={() => openArticle(guide.id)}
                className="group rounded-3xl bg-primary p-7 text-left text-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-5xl font-bold text-secondary-container/30">
                  {guide.number}
                </div>

                <h3 className="mt-8 text-xl font-bold">
                  {guide.title}
                </h3>

                <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/65">
                  {guide.description}
                </p>

                <div className="mt-7 flex items-center gap-2 font-bold text-secondary-container">
                  Read Guide
                  <span className="material-symbols-outlined transition group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] bg-primary px-6 py-16 text-center sm:px-10">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Know What You Need, But Not Which Racket?
                </h2>

                <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">
                Use your knowledge to take the next step and get a personalized
                recommendation for your game.
                </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onNavigate?.("intro")}
                className="rounded-full bg-[#C8FF2E] px-8 py-4 font-bold text-primary shadow-md transition hover:scale-[1.02]"
              >
                Get My Recommendation
              </button>

              <button
                type="button"
                onClick={() => onNavigate?.("explore")}
                className="rounded-full bg-white px-7 py-4 font-bold text-primary shadow-sm"
              >
                Explore Rackets
              </button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}