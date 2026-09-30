export default function SiteFooter({ onNavigate }) {
  const go = p => onNavigate?.(p);
  return <footer className="bg-primary text-white/80"><div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
    <div><div className="flex items-center gap-2 font-bold text-white"><span className="material-symbols-outlined text-secondary-container">sports_tennis</span>SelecTennis</div><p className="mt-4 max-w-sm text-sm leading-6">Personalized racket recommendations, detailed racket data, and on-court services built around your game.</p></div>
    <div><div className="text-xs font-bold uppercase tracking-wider text-secondary-container">Navigation</div><div className="mt-4 grid gap-2 text-sm">{["home","services","explore","learn","account"].map(p => <button key={p} onClick={() => go(p)} className="w-fit capitalize hover:text-white">{p}</button>)}</div></div>
    <div><div className="text-xs font-bold uppercase tracking-wider text-secondary-container">Services</div><div className="mt-4 grid gap-2 text-sm"><span>Personalized Recommendation</span><span>Racket Demo Sessions</span><span>Hitting Partner</span><span>Professional Consultation</span></div></div>
  </div><div className="border-t border-white/10 px-6 py-6 text-center text-xs">© 2026 SelecTennis. All rights reserved.</div></footer>;
}
