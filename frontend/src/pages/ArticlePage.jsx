import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const articleData = {
  "choose-right-racket": {
    category: "RACKETS",
    title: "How to Choose the Right Tennis Racket",
    intro:
      "Learn how the main racket specifications work together and what to consider when choosing equipment for your game.",
    icon: "sports_tennis",
    image: "/images/learn/choose-right-racket.png",
    sections: [
      {
        heading: "Start With the Player, Not the Racket",
        paragraphs: [
          "There is no single racket that is ideal for every player. Your experience, physical comfort, swing style, and preferences all influence which specifications may suit you.",
          "Rather than focusing on one number, it is more useful to understand how head size, unstrung weight, swingweight, balance, stiffness, and string pattern work together.",
        ],
      },
      {
        heading: "Head Size and Forgiveness",
        paragraphs: [
          "Larger racket heads generally provide a larger hitting area and more forgiveness on off-center contact. Smaller heads generally place more emphasis on precision.",
          "Head size should therefore be considered alongside the rest of the racket rather than treated as a measure of quality.",
        ],
      },
      {
        heading: "Weight, Balance, and Swingweight",
        paragraphs: [
          "Unstrung weight tells you how much the racket weighs before strings are installed, while balance describes how that weight is distributed.",
          "Swingweight describes how heavy the racket feels during the swing. Two rackets with similar unstrung weights can therefore feel noticeably different in motion.",
        ],
      },
      {
        heading: "Stiffness and String Pattern",
        paragraphs: [
          "RA stiffness describes frame flexibility. Higher values indicate a stiffer frame, while lower values indicate a more flexible frame.",
          "String pattern also changes racket response. More open patterns can encourage spin and a higher launch, while denser patterns generally provide a more controlled response.",
        ],
      },
      {
        heading: "Put the Specifications Together",
        paragraphs: [
          "The best approach is to consider the complete racket profile and how its characteristics match what you need from your equipment.",
          "Whenever possible, testing rackets on court can help you compare how those specifications translate into actual feel and performance.",
        ],
      },
    ],
    takeaway:
      "Choose a racket by considering the complete specification profile and how it fits your game, rather than choosing based on one specification alone.",
    related: ["head-size", "swingweight", "balance"],
  },

  "string-pattern": {
    category: "STRINGS",
    title: "16 × 19 vs 18 × 20: String Pattern Explained",
    intro:
      "Understand how the number and arrangement of strings can influence spin, launch, control, and racket response.",
    icon: "grid_view",
    image: "/images/learn/string-pattern.png",
    sections: [
      {
        heading: "What Is a String Pattern?",
        paragraphs: [
          "A string pattern describes the number of main strings running vertically and cross strings running horizontally across the racket head.",
          "For example, a 16 × 19 racket has 16 mains and 19 crosses, while an 18 × 20 pattern uses 18 mains and 20 crosses.",
        ],
      },
      {
        heading: "Open String Patterns",
        paragraphs: [
          "Patterns such as 16 × 19 generally leave more space between the strings. This can allow greater string movement and can encourage spin and a higher launch angle.",
          "Open patterns are common across many modern rackets and can suit players who want easier access to spin.",
        ],
      },
      {
        heading: "Dense String Patterns",
        paragraphs: [
          "An 18 × 20 pattern places more strings across the racket face, creating a denser string bed.",
          "This generally produces a more controlled and predictable response with a lower launch angle compared with a more open pattern.",
        ],
      },
      {
        heading: "Which Is Better?",
        paragraphs: [
          "Neither pattern is automatically better. String pattern is only one part of a racket's design and should be considered alongside head size, stiffness, weight, and other specifications.",
          "Your preferred trajectory, spin production, and response can help determine which type feels more natural.",
        ],
      },
    ],
    takeaway:
      "Open patterns generally encourage easier spin and higher launch, while denser patterns generally emphasize a more controlled response.",
    related: ["power-control-spin", "ra-stiffness", "strings-tension"],
  },

  swingweight: {
    category: "RACKETS",
    title: "Understanding Swingweight",
    intro:
      "Learn what swingweight means, why it can make two similarly weighted rackets feel completely different, and how it influences maneuverability and stability.",
    icon: "speed",
    image: "/images/learn/swingweight.png",
    sections: [
      {
        heading: "What Is Swingweight?",
        paragraphs: [
          "While unstrung weight measures how heavy a racket is on a scale, swingweight describes how heavy the racket feels when it is moving through a tennis stroke.",
          "Because weight distribution matters, two rackets with the same unstrung weight can have noticeably different swingweights.",
        ],
      },
      {
        heading: "Why Swingweight Matters on Court",
        paragraphs: [
          "Swingweight influences how easily a racket accelerates and how stable it feels when contacting the ball.",
          "A higher swingweight generally increases stability and resistance to twisting, while also requiring more effort to accelerate.",
        ],
      },
      {
        heading: "Maneuverability vs. Stability",
        paragraphs: [
          "Lower swingweights generally make a racket easier to maneuver, which can help with rapid preparation and quick changes in racket position.",
          "Higher swingweights generally provide greater stability and plow-through through contact. The appropriate balance depends on the player.",
        ],
      },
      {
        heading: "How Swingweight Differs From Unstrung Weight",
        paragraphs: [
          "Unstrung weight tells you the racket's mass before strings are installed. Swingweight also accounts for where that mass is positioned relative to the handle.",
          "This is why rackets with similar weights can feel very different during actual strokes.",
        ],
      },
      {
        heading: "Finding the Right Swingweight for Your Game",
        paragraphs: [
          "A useful swingweight should provide enough stability without making the racket difficult for you to accelerate consistently.",
          "Testing different rackets can help you identify the level of maneuverability and stability that feels comfortable for your strokes.",
        ],
      },
    ],
    takeaway:
      "Swingweight describes how heavy a racket feels while it is being swung. Higher swingweight generally provides greater stability, while lower swingweight generally makes the racket easier to maneuver.",
    related: ["balance", "head-size", "choose-right-racket"],
  },

  "ra-stiffness": {
    category: "TECHNOLOGY",
    title: "What Does RA Stiffness Mean?",
    intro:
      "Learn what a racket's RA rating represents and how frame stiffness can influence response, feel, and comfort.",
    icon: "straighten",
    image: "/images/learn/ra-stiffness.png",
    sections: [
      {
        heading: "What Is RA Stiffness?",
        paragraphs: [
          "RA is a measurement used to describe how much a racket frame flexes under load. A higher RA value indicates a stiffer frame, while a lower value indicates greater flexibility.",
          "It provides a useful way to compare frame stiffness, although it does not describe every aspect of how a racket will feel.",
        ],
      },
      {
        heading: "Stiffer Frames",
        paragraphs: [
          "A stiffer frame bends less during impact and generally returns more of the incoming energy rather than flexing as much.",
          "Players may perceive this as a more direct or powerful response, although overall feel also depends on strings, construction, and other racket specifications.",
        ],
      },
      {
        heading: "More Flexible Frames",
        paragraphs: [
          "Lower-RA frames flex more during impact and can provide a softer sensation at contact.",
          "Flexibility alone does not determine comfort, but it is one important part of the racket's overall response.",
        ],
      },
      {
        heading: "RA Is Only One Specification",
        paragraphs: [
          "Two rackets with similar RA ratings can still feel different because of their weight, balance, beam design, strings, and construction.",
          "RA should therefore be evaluated as part of the complete racket rather than in isolation.",
        ],
      },
    ],
    takeaway:
      "Higher RA values indicate a stiffer frame and lower values indicate a more flexible frame, but stiffness should always be considered alongside the racket's other specifications.",
    related: ["string-pattern", "strings-tension", "choose-right-racket"],
  },

  "head-size": {
    category: "RACKETS",
    title: "Head Size Explained",
    intro:
      "Understand how the size of a racket head can influence forgiveness, hitting area, power, and precision.",
    icon: "sports_tennis",
    sections: [
      {
        heading: "What Is Head Size?",
        paragraphs: [
          "Head size is the surface area of the racket head and is commonly expressed in square inches.",
          "It influences the size of the string bed and is one of the most immediately visible differences between racket models.",
        ],
      },
      {
        heading: "Larger Head Sizes",
        paragraphs: [
          "Larger heads generally provide a larger effective hitting area and more forgiveness when contact is made away from the center.",
          "They can also provide easier depth and power depending on the rest of the racket design.",
        ],
      },
      {
        heading: "Smaller Head Sizes",
        paragraphs: [
          "Smaller heads generally emphasize precision and provide a more compact hitting area.",
          "They are often found in rackets designed for players who consistently produce clean contact and prefer a controlled response.",
        ],
      },
      {
        heading: "Finding the Right Size",
        paragraphs: [
          "Head size should be considered alongside your experience, consistency, and preferred racket characteristics.",
          "Weight, swingweight, stiffness, and string pattern can significantly change how two rackets of the same head size perform.",
        ],
      },
    ],
    takeaway:
      "Larger heads generally increase forgiveness and hitting area, while smaller heads generally emphasize precision.",
    related: ["choose-right-racket", "string-pattern", "power-control-spin"],
  },

  balance: {
    category: "TECHNOLOGY",
    title: "Head-Light vs Head-Heavy Balance",
    intro:
      "Learn how weight distribution changes the way a racket handles even when its total weight remains the same.",
    icon: "balance",
    sections: [
      {
        heading: "What Is Racket Balance?",
        paragraphs: [
          "Balance describes where a racket's mass is distributed relative to its midpoint.",
          "A racket may be head-light, evenly balanced, or head-heavy.",
        ],
      },
      {
        heading: "Head-Light Balance",
        paragraphs: [
          "Head-light rackets place more of their mass toward the handle.",
          "This generally makes the racket head easier to maneuver and can help players prepare the racket quickly.",
        ],
      },
      {
        heading: "Head-Heavy Balance",
        paragraphs: [
          "Head-heavy rackets position more mass toward the racket head.",
          "This can increase stability and momentum through the ball, although the racket may feel less maneuverable.",
        ],
      },
      {
        heading: "Balance and Total Weight",
        paragraphs: [
          "Balance should never be considered without total weight and swingweight. A heavier head-light racket can still feel substantial, while a lighter head-heavy racket may behave very differently.",
          "Together, these specifications provide a much clearer picture of how the racket will handle.",
        ],
      },
    ],
    takeaway:
      "Balance describes where a racket's weight is distributed: head-light setups generally favor maneuverability, while more head-heavy setups can increase stability and momentum.",
    related: ["swingweight", "customizing-balance", "choose-right-racket"],
  },

  "power-control-spin": {
    category: "GAME STYLE",
    title: "Understanding Power, Control, and Spin",
    intro:
      "Explore three major playing characteristics and how racket design can influence the balance between them.",
    icon: "bolt",
    sections: [
      {
        heading: "Understanding Power",
        paragraphs: [
          "Power describes how easily a racket can help produce pace and depth.",
          "Head size, stiffness, weight distribution, strings, and swing mechanics can all influence the amount of power a player experiences.",
        ],
      },
      {
        heading: "Understanding Control",
        paragraphs: [
          "Control refers to the player's ability to produce a predictable response and place the ball accurately.",
          "A controlled racket does not create accuracy by itself; it provides characteristics that may complement a player's ability to direct the ball.",
        ],
      },
      {
        heading: "Understanding Spin",
        paragraphs: [
          "Spin production depends heavily on racket-head speed and stroke technique, but equipment can influence how easily the strings interact with the ball.",
          "String pattern, head design, and maneuverability can all contribute to spin potential.",
        ],
      },
      {
        heading: "Finding Your Balance",
        paragraphs: [
          "Rackets rarely maximize every characteristic simultaneously. Equipment design involves trade-offs between power, control, spin, stability, maneuverability, comfort, and feel.",
          "The goal is to find a combination that complements how you actually play.",
        ],
      },
    ],
    takeaway:
      "Power, control, and spin are interconnected characteristics. The right balance depends on your technique, preferences, and playing style.",
    related: ["string-pattern", "head-size", "choose-right-racket"],
  },

  "racket-anatomy": {
    category: "GUIDE",
    title: "The Modern Racket Anatomy",
    intro:
      "Learn the major parts of a tennis racket and how they work together as one piece of equipment.",
    icon: "sports_tennis",
    image: "/images/learn/racket-anatomy.png",
    sections: [
      {
        heading: "The Head",
        paragraphs: [
          "The racket head surrounds the string bed and defines the racket's head size.",
          "Its shape and dimensions influence the available hitting area and interact with the string pattern and frame construction.",
        ],
      },
      {
        heading: "The Beam and Throat",
        paragraphs: [
          "The beam is the structural frame surrounding the racket head. Its dimensions and construction contribute to stiffness, stability, and overall response.",
          "The throat connects the head to the handle and is an important structural part of the frame.",
        ],
      },
      {
        heading: "The String Bed",
        paragraphs: [
          "The mains and crosses form the hitting surface of the racket.",
          "String type, pattern, gauge, and tension can all change the response of the string bed.",
        ],
      },
      {
        heading: "Handle, Grip, and Butt Cap",
        paragraphs: [
          "The handle provides the player's connection to the racket. Grip size and grip material affect how the racket sits in the hand.",
          "The butt cap finishes the bottom of the handle and helps prevent the racket from slipping during the swing.",
        ],
      },
    ],
    takeaway:
      "A tennis racket is a complete system: the head, beam, strings, throat, handle, and grip all contribute to how the racket performs and feels.",
    related: ["choose-right-racket", "strings-tension", "customizing-balance"],
  },

  "strings-tension": {
    category: "GUIDE",
    title: "Understanding Strings & Tension",
    intro:
      "Understand how string material and tension can change the response and feel of your racket.",
    icon: "grid_view",
    sections: [
      {
        heading: "Why Strings Matter",
        paragraphs: [
          "Strings are the part of the racket that directly contacts the ball, making them an important part of equipment setup.",
          "Changing the string can make the same racket feel and respond differently.",
        ],
      },
      {
        heading: "Different String Materials",
        paragraphs: [
          "Common string families include polyester, multifilament, synthetic gut, and natural gut. Each has different characteristics involving response, comfort, durability, and tension maintenance.",
          "There is no universally best material because player needs and preferences vary.",
        ],
      },
      {
        heading: "Understanding Tension",
        paragraphs: [
          "String tension affects how the string bed responds at impact. Lower and higher tensions can produce noticeably different launch, feel, and response.",
          "Players should stay within the racket manufacturer's recommended tension range unless they have a specific reason and appropriate guidance to do otherwise.",
        ],
      },
      {
        heading: "Hybrid Setups",
        paragraphs: [
          "A hybrid combines different strings in the mains and crosses.",
          "This allows players to combine characteristics from two string types rather than using the same material throughout the string bed.",
        ],
      },
    ],
    takeaway:
      "Strings and tension are a major part of racket setup, and changing them can noticeably alter comfort, response, spin, and control.",
    related: ["string-pattern", "ra-stiffness", "racket-anatomy"],
  },

  "customizing-balance": {
    category: "GUIDE",
    title: "Customizing Balance & Feel",
    intro:
      "Learn how common equipment adjustments can influence racket balance, handling, and feel.",
    icon: "tune",
    image: "/images/learn/customizing-balance.png",
    sections: [
      {
        heading: "Why Players Customize Rackets",
        paragraphs: [
          "Customization can be used to fine-tune how a racket feels rather than replacing it entirely.",
          "Even relatively small changes in mass or grip setup can affect balance and handling.",
        ],
      },
      {
        heading: "Changing Grip Setup",
        paragraphs: [
          "Overgrips and replacement grips can change handle feel, grip size, and add a small amount of mass.",
          "Because that mass is located near the hand, it can also slightly change the racket's overall balance.",
        ],
      },
      {
        heading: "Adding Weight",
        paragraphs: [
          "Adding mass at different locations can change stability, balance, and swingweight.",
          "Weight added toward the racket head has a greater effect on swingweight than the same amount placed close to the handle.",
        ],
      },
      {
        heading: "Make Changes Carefully",
        paragraphs: [
          "Customization involves trade-offs. Increasing stability may reduce maneuverability, and changing balance can alter timing.",
          "Small, measured changes are easier to evaluate than making several major adjustments at once.",
        ],
      },
    ],
    takeaway:
      "Where weight is added matters as much as how much is added. Small changes can alter balance, swingweight, stability, and maneuverability.",
    related: ["balance", "swingweight", "racket-anatomy"],
  },
};

export default function ArticlePage({
  articleId,
  onNavigate,
  onBack,
  onOpenArticle,
}) {
  const article =
    articleData[articleId] || articleData["choose-right-racket"];

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <SiteHeader active="learn" onNavigate={onNavigate} />

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-primary"
        >
          ← Back to Learn
        </button>

        {/* Article header */}
        <header className="mt-10">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            {article.category}
          </div>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-primary sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-on-surface-variant">
            {article.intro}
          </p>
        </header>

        
        {/* Visual */}
        <div className="mt-10 h-[300px] overflow-hidden rounded-[2rem] bg-primary shadow-sm sm:h-[420px]">
        {article.image ? (
            <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover"
            />
        ) : (
            <div className="grid h-full w-full place-items-center">
            <span className="material-symbols-outlined text-[150px] text-secondary-container sm:text-[190px]">
                {article.icon}
            </span>
            </div>
        )}
        </div>

        {/* Article */}
        <article className="mx-auto mt-14 max-w-3xl">
          <div className="space-y-12">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold text-primary">
                  {section.heading}
                </h2>

                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="leading-8 text-on-surface-variant"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Key takeaway */}
          <div className="mt-14 rounded-3xl bg-secondary-container p-6 sm:p-8">
            <div className="flex items-center gap-2 font-bold text-primary">
              <span className="material-symbols-outlined">
                check_circle
              </span>
              Key Takeaway
            </div>

            <p className="mt-3 leading-7 text-primary/80">
              {article.takeaway}
            </p>
          </div>
        </article>

        {/* Related */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold text-primary">
            Keep Learning
          </h2>

          <p className="mt-2 text-sm text-on-surface-variant">
            Continue exploring racket specifications and equipment fundamentals.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {article.related.map((relatedId) => {
              const related = articleData[relatedId];

              if (!related) return null;

              return (
                <button
                  key={relatedId}
                  type="button"
                  onClick={() => onOpenArticle?.(relatedId)}
                  className="group rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                    {related.category}
                  </div>

                  <div className="mt-3 font-bold leading-snug text-primary">
                    {related.title}
                  </div>

                  <div className="mt-5 flex items-center gap-1 text-sm font-bold text-primary">
                    Read Article
                    <span className="material-symbols-outlined text-base transition group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Bottom navigation */}
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-outline-variant pt-8 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onBack}
            className="font-bold text-primary"
          >
            ← Back to Learn
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.("explore")}
            className="rounded-full bg-secondary-container px-7 py-4 font-bold text-primary shadow-sm"
          >
            Explore Rackets →
          </button>
        </div>
      </main>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}