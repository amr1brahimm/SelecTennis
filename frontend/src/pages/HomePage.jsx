import { useEffect, useMemo, useState } from "react";
import heroImage from "../assets/home-hero.png";
const API_BASE = "http://localhost:5000/api";


const learnCards = [
  {
    id: "head-size",
    category: "Racket Technology",
    title: "Understanding Racket Head Size",
    description:
      "Learn how head size affects power, control, forgiveness, and confidence on contact.",
    time: "5 min read",
    icon: "sports_tennis",
  },
  {
    id: "swingweight",
    category: "Specifications",
    title: "What Does Swingweight Actually Mean?",
    description:
      "A practical guide to how a racket feels through the swing and why the number matters.",
    time: "6 min read",
    icon: "speed",
  },
  {
    id: "string-pattern",
    category: "Strings",
    title: "16×19 vs 18×20 String Patterns",
    description:
      "Understand how string-pattern density can influence spin, launch angle, feel, and control.",
    time: "5 min read",
    icon: "grid_4x4",
  },
];

function HomePage({
  onRecommendation,
  onNavigate,
  onStartBooking,
  onOpenRacket,
  onOpenArticle,
}) {
  const [rackets, setRackets] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const storedUser = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  }, []);
  const firstName = storedUser?.first_name || storedUser?.firstName || "Player";
  const fullName = [storedUser?.first_name || storedUser?.firstName, storedUser?.last_name || storedUser?.lastName].filter(Boolean).join(" ") || firstName;

  useEffect(() => {
  fetch(`${API_BASE}/rackets`)
    .then((r) => (r.ok ? r.json() : Promise.reject()))
    .then((data) => {
      const allRackets = Array.isArray(data)
        ? data
        : Array.isArray(data.rackets)
          ? data.rackets
          : [];

      const brands = ["Babolat", "Head", "Wilson", "Yonex"];

      const featuredRackets = brands
        .map((brand) =>
          allRackets.find(
            (racket) =>
              String(racket.brand_name || racket.brand || "")
                .toLowerCase() === brand.toLowerCase()
          )
        )
        .filter(Boolean);

      setRackets(featuredRackets);
    })
    .catch((error) => {
      console.error("Failed to load featured rackets:", error);
      setRackets([]);
    });
}, []);

  const go = (page) => { setMenuOpen(false); onNavigate?.(page); };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md">
      <header className="sticky top-0 z-50 border-b border-surface-container bg-surface/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button onClick={() => go("home")} className="flex items-center gap-3 text-left">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-secondary-container"><span className="material-symbols-outlined">sports_tennis</span></div>
            <div><div className="font-headline-sm text-lg font-bold text-primary">SelecTennis</div></div>
          </button>
          <nav className="hidden items-center gap-1 rounded-full bg-surface-container-low p-1.5 md:flex">
            <button className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white">Home</button>
            <button onClick={() => go("services")} className="rounded-full px-5 py-2 text-sm font-semibold hover:bg-surface-container-high">Services</button>
            <button onClick={() => go("explore")} className="rounded-full px-5 py-2 text-sm font-semibold hover:bg-surface-container-high">Explore</button>
            <button onClick={() => go("learn")} className="rounded-full px-5 py-2 text-sm font-semibold hover:bg-surface-container-high">Learn</button>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => go("account")} className="hidden text-right sm:block"><div className="text-sm font-bold text-primary">{fullName}</div><div className="text-[10px] font-bold uppercase tracking-wider text-secondary">My Account</div></button>
            <button onClick={() => go("account")} aria-label="Account" className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white"><span className="material-symbols-outlined">person</span></button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-11 w-11 place-items-center rounded-xl bg-surface-container md:hidden"><span className="material-symbols-outlined">menu</span></button>
          </div>
        </div>
        {menuOpen && <div className="border-t border-surface-container bg-white px-4 py-4 md:hidden"><div className="mx-auto flex max-w-7xl flex-col gap-2">{["home","services","explore","learn","account"].map(p => <button key={p} onClick={() => go(p)} className={`rounded-xl px-4 py-3 text-left font-semibold capitalize ${p === "home" ? "bg-primary text-white" : "hover:bg-surface-container"}`}>{p}</button>)}</div></div>}
      </header>

      <main>
        <section className="relative overflow-hidden py-16 lg:py-24">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-secondary-container/20 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-7">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-[#9bc5b2]"><span className="h-2 w-2 rounded-full bg-secondary-container"/>Personalized Racket Matching</div>
              <h1 className="max-w-3xl font-headline-md text-5xl font-bold leading-[1.06] tracking-[-.04em] text-primary sm:text-6xl">Find the Right Racket for Your Game</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-on-surface-variant">Answer a few questions about your playing style, experience, preferences, and equipment needs. SelecTennis will analyze your profile and find the rackets that suit you best.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={onRecommendation} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-secondary-container px-8 py-4 font-bold text-primary shadow-lg transition hover:-translate-y-0.5">Get My Recommendation <span className="material-symbols-outlined text-lg">arrow_forward</span></button>
                <button onClick={() => go("explore")} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-8 py-4 font-bold text-primary"><span className="material-symbols-outlined text-lg">tune</span>Explore Rackets</button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-primary shadow-2xl">
                <img src={heroImage} alt="Tennis racket on court" className="h-full w-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent"/>
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                    Example Recommendation
                  </div>

                  <div className="mt-1 flex items-center justify-between gap-4">
                    <div className="text-lg font-bold text-primary">Your Top Racket Match</div>
                    <div className="rounded-full bg-secondary-container px-3 py-1 text-sm font-bold text-primary">
                      94% Match
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 border-t border-surface-container pt-3 text-center text-xs">
                    <div>
                      <span className="block text-on-surface-variant">Technical Fit</span>
                      <b>9.2 / 10</b>
                    </div>
                    <div>
                      <span className="block text-on-surface-variant">Playing Characteristics</span>
                      <b>9.4 / 10</b>
                    </div>
                  </div>

              
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center"><h2 className="font-headline-md text-3xl font-bold text-primary sm:text-4xl">How SelecTennis Works</h2><p className="mt-3 text-on-surface-variant">From your playing profile to the court, we make finding the right racket simple.</p></div>
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {[["01","person_search","Tell Us About Your Game","Share your experience, playing style, preferences, current equipment, and what you want from your next racket."],["02","recommend","Get Your Recommendations","Our recommendation system compares your profile with real racket specifications and playing characteristics."],["03","sports_tennis","Test Your Rackets","Book a demo session for your recommended rackets and experience them on court before making your decision."]].map(([n,i,t,d]) => <div key={n} className="relative rounded-3xl bg-surface-container-low p-8"><div className="mb-5 flex items-center justify-between"><span className="text-sm font-bold text-secondary">{n}</span><span className="material-symbols-outlined text-3xl text-primary">{i}</span></div><h3 className="text-xl font-bold text-primary">{t}</h3><p className="mt-3 leading-7 text-on-surface-variant">{d}</p></div>)}
            </div>
          </div>
        </section>

        <section className="py-20" id="featured-rackets">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="font-headline-md text-3xl font-bold text-primary sm:text-4xl">Featured Rackets</h2><p className="mt-3 text-on-surface-variant">Explore some of the rackets available in SelecTennis.</p></div><button onClick={() => go("explore")} className="font-bold text-primary">Explore Rackets →</button></div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {(rackets.length ? rackets : Array.from({length:4})).map((r, idx) => <article key={r?.racket_id || idx} className="overflow-hidden rounded-3xl border border-surface-container bg-white shadow-sm">
                <div className="grid aspect-[4/3] place-items-center bg-surface-container-low p-5">{r?.image_url ? <img src={r.image_url} alt={r.name} className="h-full w-full object-contain"/> : <span className="material-symbols-outlined text-6xl text-primary/25">sports_tennis</span>}</div>
                <div className="p-5"><div className="text-[10px] font-bold uppercase tracking-wider text-secondary">{r?.brand_name || "SelecTennis"}</div><h3 className="mt-1 min-h-12 text-lg font-bold text-primary">{r?.name || "Racket loading…"}</h3><div className="mt-4 flex flex-wrap gap-1.5 text-[10px] font-semibold text-on-surface-variant">{r?.head_size && <span className="rounded-full bg-surface-container px-2.5 py-1">{r.head_size} sq in</span>}{r?.unstrung_weight_g && <span className="rounded-full bg-surface-container px-2.5 py-1">{r.unstrung_weight_g} g</span>}{r?.string_pattern && <span className="rounded-full bg-surface-container px-2.5 py-1">{r.string_pattern}</span>}</div><button
  onClick={() => onOpenRacket?.(r.racket_id)}
  className="mt-5 font-bold text-primary"
>
  View Racket →
</button></div>
              </article>)}
            </div>
          </div>
        </section>

        <section className="bg-primary py-20" id="services">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="text-center"><h2 className="font-headline-md text-3xl font-bold text-white sm:text-4xl">Explore SelecTennis</h2><p className="mt-3 text-[#b9d3c7]">From finding your racket to testing it on court, discover the services built around your game.</p></div>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["target","Personalized Recommendation","Get racket recommendations based on your playing profile, preferences, and equipment needs.","Get My Recommendation →",onRecommendation,true],
                ["sports_tennis","Racket Demo Sessions","Choose up to three rackets and experience them on court before making your decision.","Book a Demo →",() => onStartBooking?.("demo")],
                ["groups","Hitting Partner","Book a court session with a hitting partner when you need someone to practice or play with.","Book a Session →",() => onStartBooking?.("hitting-partner")],
                ["support_agent","Professional Consultation","Get one-on-one guidance to better understand your equipment options and racket recommendations.","Book a Consultation →",() => onStartBooking?.("consultation")]
              ].map(([i,t,d,a,fn,featured]) => <article key={t} className={`rounded-3xl p-7 ${featured ? "bg-secondary-container text-primary" : "bg-white/10 text-white"}`}><span className="material-symbols-outlined text-4xl">{i}</span><h3 className="mt-5 text-xl font-bold">{t}</h3><p className={`mt-3 min-h-28 leading-7 ${featured ? "text-primary/80" : "text-[#c8ddd3]"}`}>{d}</p><button onClick={fn} className="mt-5 font-bold">{a}</button></article>)}
            </div>
          </div>
        </section>

        <section className="py-20" id="learn">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><h2 className="font-headline-md text-3xl font-bold text-primary sm:text-4xl">Learn More About Your Game</h2><p className="mt-3 text-on-surface-variant">Clear, practical guides to help you understand tennis equipment and make better-informed choices.</p></div><button onClick={() => go("learn")} className="font-bold text-primary">Explore Learn →</button></div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">{learnCards.map(a => <article key={a.title} className="rounded-3xl bg-white p-7 shadow-sm"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-surface-container text-primary"><span className="material-symbols-outlined text-3xl">{a.icon}</span></div><div className="mt-6 text-[10px] font-bold uppercase tracking-wider text-secondary">{a.category}</div><h3 className="mt-2 text-xl font-bold text-primary">{a.title}</h3><p className="mt-3 leading-7 text-on-surface-variant">{a.description}</p><div className="mt-6 flex items-center justify-between"><span className="text-xs text-on-surface-variant">{a.time}</span><button
  onClick={() => onOpenArticle?.(a.id)}
  className="font-bold text-primary"
>
  Read Article →
</button></div>
</article>)}</div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0a2a20] py-12 text-white"><div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-3 lg:px-8"><div><div className="text-xl font-bold">SelecTennis</div><p className="mt-3 max-w-sm text-sm leading-6 text-[#b7cec4]">Personalized racket matching, real equipment data, and on-court services built around your game.</p></div><div><div className="mb-3 font-bold">Navigation</div><div className="flex flex-col gap-2 text-sm text-[#b7cec4]">{["Home","Services","Explore","Learn","Account"].map(x=><button key={x} onClick={()=>go(x.toLowerCase())} className="text-left hover:text-white">{x}</button>)}</div></div><div><div className="mb-3 font-bold">Services</div><div className="flex flex-col gap-2 text-sm text-[#b7cec4]"><span>Personalized Recommendation</span><span>Racket Demo Sessions</span><span>Hitting Partner</span><span>Professional Consultation</span></div></div></div><div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-4 pt-6 text-xs text-[#8fac9f] sm:px-6 lg:px-8">© 2026 SelecTennis</div></footer>
    </div>
  );
}

export default HomePage;
