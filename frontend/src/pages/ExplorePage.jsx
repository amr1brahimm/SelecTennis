import { useEffect, useMemo, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { apiUrl } from "../config/api.js";
const patterns = ["16x18","16x19","16x20","18x19","18x20"];
const n = v => v === null || v === undefined || v === "" ? null : Number(v);
const show = v => v === null || v === undefined || v === "" ? "—" : v;

export default function ExplorePage({ onNavigate, onViewRacket, demoMode=false, demoSelection=[], onToggleDemo, onReturnToBooking }) {
  const [rackets,setRackets]=useState([]), [loading,setLoading]=useState(true), [error,setError]=useState("");
  const [search,setSearch]=useState(""), [brands,setBrands]=useState([]), [selectedBrands,setSelectedBrands]=useState([]), [selectedPatterns,setSelectedPatterns]=useState([]);
  const [sort,setSort]=useState("relevance"), [filtersOpen,setFiltersOpen]=useState(false);
  const [ranges,setRanges]=useState({headMin:"",headMax:"",stiffMin:"",stiffMax:"",weightMin:"",weightMax:"",swMin:"",swMax:""});
  useEffect(()=>{fetch(apiUrl("/rackets")).then(r=>r.ok?r.json():Promise.reject(new Error(`Request failed (${r.status})`))).then(d=>{const all=Array.isArray(d)?d:(d.rackets||[]);setRackets(all);setBrands([...new Set(all.map(r=>r.brand_name||r.brand).filter(Boolean))].sort());}).catch(e=>setError(e.message)).finally(()=>setLoading(false));},[]);
  const filtered=useMemo(()=>{
    let out=rackets.filter(r=>{const text=`${r.brand_name||r.brand||""} ${r.name||""}`.toLowerCase(); if(!text.includes(search.toLowerCase().trim())) return false; if(selectedBrands.length&&!selectedBrands.includes(r.brand_name||r.brand)) return false; if(selectedPatterns.length&&!selectedPatterns.includes(String(r.string_pattern).toLowerCase().replace("×","x"))) return false;
      const checks=[["headMin",r.head_size,">="],["headMax",r.head_size,"<="],["stiffMin",r.stiffness_ra,">="],["stiffMax",r.stiffness_ra,"<="],["weightMin",r.unstrung_weight_g,">="],["weightMax",r.unstrung_weight_g,"<="],["swMin",r.swingweight,">="],["swMax",r.swingweight,"<="]];
      return checks.every(([k,v,op])=>ranges[k]===""||v==null||(op===">="?Number(v)>=Number(ranges[k]):Number(v)<=Number(ranges[k])));
    });
    if(sort==="name") out=[...out].sort((a,b)=>String(a.name).localeCompare(String(b.name))); if(sort==="head") out=[...out].sort((a,b)=>n(a.head_size)-n(b.head_size)); if(sort==="weight") out=[...out].sort((a,b)=>n(a.unstrung_weight_g)-n(b.unstrung_weight_g)); if(sort==="swingweight") out=[...out].sort((a,b)=>n(a.swingweight)-n(b.swingweight)); return out;
  },[rackets,search,selectedBrands,selectedPatterns,ranges,sort]);
  const clear=()=>{setSearch("");setSelectedBrands([]);setSelectedPatterns([]);setRanges({headMin:"",headMax:"",stiffMin:"",stiffMax:"",weightMin:"",weightMax:"",swMin:"",swMax:""});};
  const toggle=(arr,setter,val)=>setter(arr.includes(val)?arr.filter(x=>x!==val):[...arr,val]);
  const isSelected=id=>demoSelection.some(r=>Number(r.racket_id)===Number(id));
  return <div className="min-h-screen bg-surface text-on-surface font-body-md">
    <SiteHeader active="explore" onNavigate={onNavigate}/>
{demoMode && (
  <div className="border-b border-primary/10 bg-surface-container px-4 py-3">
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
      <div>
        <b className="text-primary">Demo Selection Mode</b>
        <span className="ml-3 text-sm text-on-surface-variant">
          Select up to 3 rackets for your demo session.
        </span>
      </div>

      <div className="flex items-center gap-3">
        <b className="rounded-full bg-white px-4 py-2 text-sm">
          {demoSelection.length} / 3 selected
        </b>
      </div>
    </div>
  </div>
)}
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
  <div>
    <div className="text-xs font-bold uppercase tracking-wider text-secondary">
      Comprehensive specification catalog
    </div>

    <h1 className="mt-2 text-4xl font-bold tracking-tight text-primary md:text-5xl">
      Explore Tennis Rackets
    </h1>

    <p className="mt-3 max-w-3xl text-on-surface-variant">
      Browse detailed racket specifications and playing characteristics to
      compare rackets and find options that fit your game.
    </p>
  </div>

  <div className="flex shrink-0 rounded-full bg-white p-1.5 shadow-sm">
    <button
      type="button"
      onClick={() => onNavigate?.("explore")}
      className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
        !demoMode
          ? "bg-primary text-white"
          : "text-on-surface-variant hover:bg-surface-container"
      }`}
    >
      Explore
    </button>

    <button
      type="button"
      onClick={() => onNavigate?.("explore-demo")}
      className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
        demoMode
          ? "bg-primary text-white"
          : "text-on-surface-variant hover:bg-surface-container"
      }`}
    >
      Demo Selection
    </button>
  </div>
</div>
      <div className="mb-6 flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-sm sm:flex-row"><div className="flex flex-1 items-center gap-2 rounded-xl bg-surface-container-low px-4"><span className="material-symbols-outlined">search</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by brand or model..." className="w-full bg-transparent py-3 outline-none"/></div><select value={sort} onChange={e=>setSort(e.target.value)} className="rounded-xl border border-outline-variant bg-white px-4 py-3"><option value="relevance">Relevance</option><option value="name">Name</option><option value="head">Head Size</option><option value="weight">Unstrung Weight</option><option value="swingweight">Swingweight</option></select><button onClick={()=>setFiltersOpen(!filtersOpen)} className="rounded-xl bg-primary px-4 py-3 font-bold text-white lg:hidden">Filters</button></div>
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className={`${filtersOpen?"block":"hidden"} h-fit rounded-2xl bg-white p-5 shadow-sm lg:block`}><div className="flex justify-between"><b>Filters</b><button onClick={clear} className="text-xs font-bold text-secondary">Clear All</button></div>
          <FilterGroup title="Brand">{brands.map(b=><label key={b} className="flex gap-2 text-sm"><input type="checkbox" checked={selectedBrands.includes(b)} onChange={()=>toggle(selectedBrands,setSelectedBrands,b)}/>{b}</label>)}</FilterGroup>
          <FilterGroup title="String Pattern">{patterns.map(p=><label key={p} className="flex gap-2 text-sm"><input type="checkbox" checked={selectedPatterns.includes(p)} onChange={()=>toggle(selectedPatterns,setSelectedPatterns,p)}/>{p.replace("x","×")}</label>)}</FilterGroup>
          <Range title="Head Size" minKey="headMin" maxKey="headMax" ranges={ranges} setRanges={setRanges} unit="sq in"/><Range title="Stiffness" minKey="stiffMin" maxKey="stiffMax" ranges={ranges} setRanges={setRanges} unit="RA"/><Range title="Unstrung Weight" minKey="weightMin" maxKey="weightMax" ranges={ranges} setRanges={setRanges} unit="g"/><Range title="Swingweight" minKey="swMin" maxKey="swMax" ranges={ranges} setRanges={setRanges}/>
        </aside>
        <section><div className="mb-4 flex items-center justify-between"><b>{filtered.length} {filtered.length===1?"racket":"rackets"}</b>{(selectedBrands.length||selectedPatterns.length||Object.values(ranges).some(Boolean))?<button onClick={clear} className="text-sm font-bold text-secondary">Reset filters</button>:null}</div>
          {loading?<div className="rounded-2xl bg-white p-10 text-center">Loading rackets…</div>:error?<div className="rounded-2xl bg-error-container p-6 text-error">{error}</div>:<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filtered.map(r=><RacketCard key={r.racket_id} racket={r} demoMode={demoMode} selected={isSelected(r.racket_id)} selectionFull={demoSelection.length>=3} onView={()=>onViewRacket?.(r.racket_id,demoMode)} onToggle={()=>onToggleDemo?.(r)}/>)}</div>}
          {!loading&&!error&&!filtered.length&&<div className="rounded-2xl bg-white p-10 text-center">No rackets match those filters.</div>}
        </section>
      </div>
    </main>
    {demoMode && (
  <div className="sticky bottom-0 z-40 border-t border-white/10 bg-primary px-4 py-3 text-white shadow-2xl">
    <div className="mx-auto flex max-w-7xl items-center gap-4">

      <button
        type="button"
        onClick={() => onNavigate?.("explore")}
        className="shrink-0 rounded-full border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
      >
        ← Exit Demo Selection
      </button>

      <div className="hidden flex-1 justify-center gap-2 md:flex">
        {demoSelection.map((r) => (
          <span
            key={r.racket_id}
            className="rounded-full bg-white/10 px-3 py-2 text-xs"
          >
            {r.name}{" "}
            <button onClick={() => onToggleDemo?.(r)}>×</button>
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={onReturnToBooking}
        className="ml-auto shrink-0 rounded-full bg-secondary-container px-5 py-3 font-bold text-primary"
      >
        Go to Booking ({demoSelection.length} Selected) →
      </button>

    </div>
  </div>
)}
    <SiteFooter onNavigate={onNavigate}/>
  </div>;
}
function FilterGroup({title,children}){return <div className="mt-5 border-t border-surface-container pt-4"><div className="mb-3 text-xs font-bold uppercase tracking-wider">{title}</div><div className="grid gap-2">{children}</div></div>}
function Range({ title, minKey, maxKey, ranges, setRanges, unit = "" }) {
  const updateRange = (key, value) => {
    if (value === "" || Number(value) >= 0) {
      setRanges({ ...ranges, [key]: value });
    }
  };

  return (
    <div className="mt-5 border-t border-surface-container pt-4">
      <div className="mb-2 text-xs font-bold uppercase tracking-wider">
        {title}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="number"
          min="0"
          placeholder="Min"
          value={ranges[minKey]}
          onChange={(e) => updateRange(minKey, e.target.value)}
          className="w-full rounded-lg bg-surface-container-low px-2 py-2 text-sm"
        />

        <span>–</span>

        <input
          type="number"
          min="0"
          placeholder="Max"
          value={ranges[maxKey]}
          onChange={(e) => updateRange(maxKey, e.target.value)}
          className="w-full rounded-lg bg-surface-container-low px-2 py-2 text-sm"
        />
      </div>

      {unit && (
        <div className="mt-1 text-[10px] text-on-surface-variant">
          {unit}
        </div>
      )}
    </div>
  );
}
function RacketCard({
  racket: r,
  demoMode,
  selected,
  selectionFull,
  onView,
  onToggle,
}) {
  const chars = [
    ["Power", r.power_score],
    ["Control", r.control_score],
    ["Spin", r.spin_score],
    ["Forgiveness", r.forgiveness_score],
    ["Maneuverability", r.maneuverability_score],
    ["Stability", r.stability_score],
    ["Feel & Touch", r.feel_touch_score],
    ["Comfort", r.comfort_score],
  ]
    .filter(([, value]) => value != null && !Number.isNaN(Number(value)))
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .slice(0, 3);

  return  <article className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${selected?"border-secondary-container ring-2 ring-secondary-container/60":"border-surface-container"}`}><button onClick={onView} className="block h-52 w-full bg-surface-container-low p-4"><img src={r.image_url||""} alt={r.name||"Tennis racket"} className="h-full w-full object-contain" onError={e=>{e.currentTarget.style.display="none"}}/></button><div className="p-4"><div className="text-[10px] font-bold uppercase tracking-wider text-secondary">{r.brand_name||r.brand||"SelecTennis"}</div><button onClick={onView} className="mt-1 text-left text-lg font-bold text-primary hover:underline">{r.name}</button><div className="mt-3 grid grid-cols-3 gap-2 rounded-xl bg-surface-container-low p-3 text-[10px]"><Spec label="Head" value={`${show(r.head_size)} sq in`}/><Spec label="Pattern" value={String(show(r.string_pattern)).replace("x","×")}/><Spec label="Stiffness" value={`${show(r.stiffness_ra)} RA`}/><Spec label="Weight" value={`${show(r.unstrung_weight_g)} g`}/><Spec label="Balance" value={`${show(r.balance_cm)} cm`}/><Spec label="Swingweight" value={show(r.swingweight)}/></div>{chars.length>0&&<div className="mt-4 space-y-2">{chars.map(([label,v])=><div key={label}><div className="flex justify-between text-[10px]"><span>{label}</span><b>{Number(v).toFixed(1)} / 10</b></div><div className="mt-1 h-1.5 rounded-full bg-surface-container"><div className="h-full rounded-full bg-primary" style={{width:`${Math.max(0,Math.min(10,Number(v)))*10}%`}}/></div></div>)}</div>}<button onClick={demoMode?onToggle:onView} disabled={demoMode&&!selected&&selectionFull} className={`mt-5 w-full rounded-xl px-4 py-3 text-sm font-bold ${demoMode?(selected?"bg-primary text-white":"bg-secondary-container text-primary disabled:opacity-40"):"bg-surface-container text-primary hover:bg-primary hover:text-white"}`}>{demoMode?(selected?"✓ In Demo":"+ Add to Demo"):"View Racket →"}</button></div></article>}
function Spec({label,value}){return <div><div className="uppercase text-on-surface-variant">{label}</div><b>{value}</b></div>}
