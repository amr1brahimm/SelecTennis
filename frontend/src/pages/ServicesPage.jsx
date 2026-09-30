import { useEffect, useMemo, useState } from "react";

const API_BASE = "http://localhost:5000/api";

function ServicesPage({
  onRecommendation,
  onNavigate,
  onStartBooking,
})  {
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoRackets, setDemoRackets] = useState([]);
  const storedUser = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  }, []);
  const fullName = [storedUser?.first_name || storedUser?.firstName, storedUser?.last_name || storedUser?.lastName].filter(Boolean).join(" ") || "Player";

  useEffect(() => {
    fetch(`${API_BASE}/rackets`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const all = Array.isArray(data) ? data : Array.isArray(data.rackets) ? data.rackets : [];
        const brands = ["Babolat", "Wilson", "Yonex"];
        setDemoRackets(brands.map((brand) => all.find((r) => String(r.brand_name || r.brand || "").toLowerCase() === brand.toLowerCase())).filter(Boolean));
      })
      .catch(() => setDemoRackets([]));
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
            <button onClick={() => go("home")} className="rounded-full px-5 py-2 text-sm font-semibold hover:bg-surface-container-high">Home</button>
            <button className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white">Services</button>
            <button onClick={() => go("explore")} className="rounded-full px-5 py-2 text-sm font-semibold hover:bg-surface-container-high">Explore</button>
            <button onClick={() => go("learn")} className="rounded-full px-5 py-2 text-sm font-semibold hover:bg-surface-container-high">Learn</button>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => go("account")} className="hidden text-right sm:block"><div className="text-sm font-bold text-primary">{fullName}</div><div className="text-[10px] font-bold uppercase tracking-wider text-secondary">My Account</div></button>
            <button onClick={() => go("account")} aria-label="Account" className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white"><span className="material-symbols-outlined">person</span></button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-11 w-11 place-items-center rounded-xl bg-surface-container md:hidden"><span className="material-symbols-outlined">menu</span></button>
          </div>
        </div>
        {menuOpen && <div className="border-t border-surface-container bg-white px-4 py-4 md:hidden"><div className="mx-auto flex max-w-7xl flex-col gap-2">{["home","services","explore","learn","account"].map(p => <button key={p} onClick={() => go(p)} className={`rounded-xl px-4 py-3 text-left font-semibold capitalize ${p === "services" ? "bg-primary text-white" : "hover:bg-surface-container"}`}>{p}</button>)}</div></div>}
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-surface-container/60 py-16 lg:py-20">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-secondary-container/20 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#9bc5b2]"><span className="h-2 w-2 rounded-full bg-secondary-container"/>SelecTennis Services</div>
            <h1 className="mx-auto mt-6 max-w-3xl font-headline-md text-4xl font-bold leading-tight tracking-[-.035em] text-primary sm:text-5xl">Choose How You Want to<br className="hidden sm:block"/> Find Your Racket</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-on-surface-variant">From personalized recommendations to on-court testing and expert guidance, SelecTennis gives you the tools to make a more informed racket decision.</p>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24" id="recommendation">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-white shadow-2xl sm:p-10 lg:p-14">
              <div className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-secondary-container/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-secondary-container"><span className="material-symbols-outlined text-base">psychology</span>Service 01 · Core Highlight</div>
                  <h2 className="mt-6 text-3xl font-bold sm:text-4xl">Personalized Racket Recommendation</h2>
                  <p className="mt-4 max-w-xl leading-7 text-[#c8ddd3]">Tell us about your game through our questionnaire and receive your top racket matches based on your playing profile, preferences, and equipment needs.</p>
                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    {[["01","quiz","Answer the Questionnaire","Questions about your experience, playing style, preferences, current equipment, and equipment needs."],["02","tune","Our System Analyzes","Your profile is compared with real racket specifications and playing characteristics."],["03","military_tech","Get Your Top Matches","Receive up to three personalized racket recommendations with match information explaining how they suit your profile."]].map(([n,i,t,d]) => <div key={n} className="rounded-xl border border-white/10 bg-white/10 p-4"><div className="flex justify-between text-secondary-container"><span className="text-[10px] font-bold">STEP {n}</span><span className="material-symbols-outlined text-lg">{i}</span></div><h3 className="mt-2 font-bold">{t}</h3><p className="mt-2 text-xs leading-5 text-[#c8ddd3]">{d}</p></div>)}
                  </div>
                  <button onClick={onRecommendation} className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-secondary-container px-8 py-4 font-bold text-primary shadow-lg">Get My Recommendation <span className="material-symbols-outlined text-lg">arrow_forward</span></button>
                </div>
                <div className="lg:col-span-5">
                  <div className="rounded-2xl bg-white p-6 text-on-surface shadow-2xl">
                    <div className="flex items-center justify-between gap-3 border-b border-surface-container pb-4"><span className="text-[10px] font-bold uppercase tracking-wider text-primary">Example Recommendation</span><span className="rounded-full bg-secondary-container/40 px-2.5 py-1 text-[9px] font-bold uppercase text-primary">Illustrative</span></div>
                    <div className="mt-5 flex items-center justify-between gap-4"><div><div className="text-[10px] font-bold uppercase tracking-wider text-secondary">Example Top Match</div><div className="mt-1 text-xl font-bold text-primary">Your Top Racket Match</div></div><div className="rounded-xl bg-secondary-container px-3 py-2 text-center text-primary"><div className="text-xl font-bold">96%</div><div className="text-[9px] font-bold uppercase">Match</div></div></div>
                    <div className="mt-5 grid grid-cols-2 border-t border-surface-container pt-4 text-center text-sm"><div><span className="block text-xs text-on-surface-variant">Technical Fit</span><b>9.4 / 10</b></div><div><span className="block text-xs text-on-surface-variant">Playing Characteristics</span><b>9.6 / 10</b></div></div>
                    <p className="mt-5 border-t border-surface-container pt-4 text-xs leading-5 text-on-surface-variant">Illustrative preview — complete your questionnaire to view your personalized racket matches.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24" id="racket-demo">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-surface-container px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary"><span className="material-symbols-outlined text-base">package_2</span>Service 02</div>
              <h2 className="mt-6 text-4xl font-bold text-primary">Racket Demo</h2>
              <p className="mt-4 text-lg leading-8 text-on-surface-variant">Test up to three rackets on court and compare how they feel during real play before making your decision.</p>
              <div className="mt-7 space-y-4">{[[1,"Choose Your Rackets","Browse Explore and select up to three rackets you want to test."],[2,"Choose Your Session","Select your preferred demo date, time, and available session options."],[3,"Test On Court","Compare your selected rackets during your demo session under real playing conditions."]].map(([n,t,d]) => <div key={n} className="flex gap-4 rounded-xl border border-surface-container bg-white p-4 shadow-sm"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-xs font-bold text-secondary-container">{n}</span><div><h3 className="font-bold text-primary">{t}</h3><p className="mt-1 text-sm text-on-surface-variant">{d}</p></div></div>)}</div>
              <button
                  onClick={() => onStartBooking?.("demo")}
                  className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-8 py-4 font-bold text-white"
                >
              Book a Demo
              <span className="material-symbols-outlined text-lg">
                calendar_today
              </span>
            </button>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-surface-container bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider text-secondary">Demo Staging Rack</span><span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-secondary-container">3 Rackets Included</span></div>
                <div className="grid grid-cols-3 gap-3">{(demoRackets.length ? demoRackets : Array.from({length:3})).map((r,i) => <div key={r?.racket_id || i} className="rounded-xl border border-surface-container bg-surface p-3 text-center"><div className="grid h-32 place-items-center overflow-hidden">{r?.image_url ? <img src={r.image_url} alt={r.name} className="h-full w-full object-contain"/> : <span className="material-symbols-outlined text-5xl text-primary/20">sports_tennis</span>}</div><div className="mt-2 text-xs font-bold text-primary">{r?.name || "Demo Racket"}</div><div className="mt-1 text-[10px] text-on-surface-variant">{r?.unstrung_weight_g ? `${r.unstrung_weight_g}g` : "—"}{r?.string_pattern ? ` · ${r.string_pattern}` : ""}</div></div>)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24" id="add-ons">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center"><div className="text-[10px] font-bold uppercase tracking-widest text-secondary">Elevate Your Testing</div><h2 className="mt-2 text-3xl font-bold text-primary sm:text-4xl">Optional Services & Guidance</h2><p className="mt-4 text-on-surface-variant">Add extra support to your demo session or get personalized guidance when you need it.</p></div>
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              <article className="flex flex-col rounded-3xl border border-surface-container bg-surface p-8 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-wider text-secondary">Service 03</div><h3 className="mt-5 text-2xl font-bold text-primary">Hitting Partner</h3><p className="mt-3 leading-7 text-on-surface-variant">Book an on-court session with a hitting partner for practice, match play, or racket testing.</p>
                <div className="mt-6 h-52 overflow-hidden rounded-2xl">
                  <img
                    src="/images/services/hitting-partner.png"
                    alt="Tennis players practicing together on court"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-6 space-y-3 text-sm text-on-surface-variant">{["Book as a standalone session or alongside other services","Practice with a consistent hitting partner","Use your session for rallies, point play, or racket testing"].map(x=><div key={x} className="flex gap-2"><span className="material-symbols-outlined text-base text-secondary">check_circle</span><span>{x}</span></div>)}</div>
                <div className="mt-auto pt-8">
                  <button
                    onClick={() => onStartBooking?.("hitting-partner")}
                    className="min-h-12 w-full rounded-xl bg-primary px-6 py-3 font-bold text-white"
                  >
                    Book a Session →
                  </button>
                </div>
              </article>
              <article className="flex flex-col rounded-3xl border border-surface-container bg-surface p-8 shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-wider text-secondary">Service 04</div><h3 className="mt-5 text-2xl font-bold text-primary">Professional Consultation</h3><p className="mt-3 leading-7 text-on-surface-variant">Get one-on-one guidance to better understand your racket options, equipment preferences, and recommendation results.</p>
                <div className="mt-6 h-52 overflow-hidden rounded-2xl">
                  <img
                    src="/images/services/consultation.png"
                    alt="Tennis player receiving professional racket guidance"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2"><div className="rounded-xl border border-surface-container bg-white p-4"><div className="text-[10px] font-bold uppercase text-secondary">Format 1</div><h4 className="mt-2 font-bold text-primary">Online Consultation</h4><p className="mt-2 text-xs leading-5 text-on-surface-variant">Remote one-on-one guidance and racket discussion.</p></div><div className="rounded-xl border border-secondary-container bg-white p-4"><div className="text-[10px] font-bold uppercase text-secondary">Format 2</div><h4 className="mt-2 font-bold text-primary">On-Court Consultation</h4><p className="mt-2 text-xs leading-5 text-on-surface-variant">In-person guidance during an on-court session.</p></div></div>
                <div className="mt-auto pt-8">
                  <button
                    onClick={() => onStartBooking?.("consultation")}
                    className="min-h-12 w-full rounded-xl bg-primary px-6 py-3 font-bold text-white"
                  >
                    Book a Consultation →
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0a2a20] py-12 text-white"><div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-3 lg:px-8"><div><div className="text-xl font-bold">SelecTennis</div><p className="mt-3 max-w-sm text-sm leading-6 text-[#b7cec4]">Personalized racket matching, real equipment data, and on-court services built around your game.</p></div><div><div className="mb-3 font-bold">Navigation</div><div className="flex flex-col gap-2 text-sm text-[#b7cec4]">{["Home","Services","Explore","Learn","Account"].map(x=><button key={x} onClick={()=>go(x.toLowerCase())} className="text-left hover:text-white">{x}</button>)}</div></div><div><div className="mb-3 font-bold">Services</div><div className="flex flex-col gap-2 text-sm text-[#b7cec4]"><span>Personalized Recommendation</span><span>Racket Demo Sessions</span><span>Hitting Partner</span><span>Professional Consultation</span></div></div></div><div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-4 pt-6 text-xs text-[#8fac9f] sm:px-6 lg:px-8">© 2026 SelecTennis</div></footer>
    </div>
  );
}

export default ServicesPage;
