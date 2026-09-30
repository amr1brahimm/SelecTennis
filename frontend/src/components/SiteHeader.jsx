import { useMemo, useState } from "react";

export default function SiteHeader({ active, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const storedUser = useMemo(() => { try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; } }, []);
  const fullName = [storedUser?.first_name || storedUser?.firstName, storedUser?.last_name || storedUser?.lastName].filter(Boolean).join(" ") || "Player";
  const go = (page) => { setMenuOpen(false); onNavigate?.(page); };
  return <header className="sticky top-0 z-50 border-b border-surface-container bg-surface/95 backdrop-blur-xl">
    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <button onClick={() => go("home")} className="flex items-center gap-3 text-left">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-secondary-container"><span className="material-symbols-outlined">sports_tennis</span></div>
        <div><div className="text-lg font-bold text-primary">SelecTennis</div></div>
      </button>
      <nav className="hidden items-center gap-1 rounded-full bg-surface-container-low p-1.5 md:flex">
        {["home","services","explore","learn"].map(p => <button key={p} onClick={() => go(p)} className={`rounded-full px-5 py-2 text-sm font-semibold capitalize ${active === p ? "bg-primary text-white" : "hover:bg-surface-container-high"}`}>{p}</button>)}
      </nav>
      <div className="flex items-center gap-3">
        <button onClick={() => go("account")} className="hidden text-right sm:block"><div className="text-sm font-bold text-primary">{fullName}</div><div className="text-[10px] font-bold uppercase tracking-wider text-secondary">My Account</div></button>
        <button onClick={() => go("account")} aria-label="Account" className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white"><span className="material-symbols-outlined">person</span></button>
        <button onClick={() => setMenuOpen(!menuOpen)} className="grid h-11 w-11 place-items-center rounded-xl bg-surface-container md:hidden"><span className="material-symbols-outlined">menu</span></button>
      </div>
    </div>
    {menuOpen && <div className="border-t border-surface-container bg-white px-4 py-4 md:hidden"><div className="mx-auto flex max-w-7xl flex-col gap-2">{["home","services","explore","learn","account"].map(p => <button key={p} onClick={() => go(p)} className={`rounded-xl px-4 py-3 text-left font-semibold capitalize ${active === p ? "bg-primary text-white" : "hover:bg-surface-container"}`}>{p}</button>)}</div></div>}
  </header>;
}
