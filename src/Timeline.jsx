import React,{useMemo,useState} from "react";
import {ArrowRight,ArrowUpRight,Clock3,GitCompareArrows,Search,Shuffle} from "lucide-react";
import {chronologies,eras,overlaps,sharedYears,yearLabel} from "./chronology.js";
import {colors,disciplines} from "./data.js";
import "./timeline.css";

const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
const position=(value,era)=>100*(value-era.start)/(era.end-era.start);
const get=(id)=>chronologies.find(x=>x.id===id);
function TemporalRow({mind,era,year,onOpen,onSelect,selected}){
 const left=clamp(position(mind.start,era),0,100);
 const right=clamp(position(mind.end,era),0,100);
 const width=Math.max(right-left,0);
 const isPresent=overlaps(mind,year);
 const isTraditional=mind.certainty==="traditional";
 return <div className={"temporal-row"+(isPresent?" is-present":"")+(selected?" is-selected":"")} style={{"--time-color":colors[mind.field]}}>
  <button className="temporal-person" onClick={()=>onSelect(mind.id)} aria-pressed={selected} title={"Show contemporaries of "+mind.name}>
   <span className="temporal-dot"/><span className="temporal-person-title"><b>{mind.name}</b><small>{mind.field}</small></span>
  </button>
  <button className="temporal-track" onClick={()=>onOpen(mind.id)} aria-label={"Open "+mind.name+" profile, "+mind.years}>
   <span className="temporal-grid"/>
   <span className={"temporal-bar"+(isTraditional?" uncertain":"")} style={{left:left+"%",width:Math.max(width,0.45)+"%"}} title={isTraditional?"Traditional placement; not a verified lifespan":mind.years}/>
   <span className="temporal-focus-line" style={{left:position(year,era)+"%"}}/>
  </button>
  <span className="temporal-years">{isTraditional?"traditional":mind.years}</span>
 </div>;
}
export default function Timeline({onOpen}){
 const [eraId,setEraId]=useState("modern");
 const [focusYear,setFocusYear]=useState(1915);
 const [field,setField]=useState("All minds");
 const [search,setSearch]=useState("");
 const [picked,setPicked]=useState("carl-jung");
 const era=eras.find(x=>x.id===eraId)||eras[0];
 const selected=get(picked)||chronologies[0];
 const visible=useMemo(()=>chronologies.filter(t=>t.start<=era.end&&t.end>=era.start&&(field==="All minds"||field===t.field)&&[t.name,t.field,t.moniker,t.summary,...t.ideas].join(" ").toLowerCase().includes(search.toLowerCase().trim())).sort((a,b)=>a.start-b.start||a.name.localeCompare(b.name)),[era,field,search]);
 const snapshot=visible.filter(x=>overlaps(x,focusYear));
 const peers=useMemo(()=>chronologies.filter(m=>m.id!==selected.id).map(m=>({mind:m,years:sharedYears(selected,m)})).filter(x=>x.years!==null&&x.years>0).sort((a,b)=>b.years-a.years).slice(0,5),[selected]);
 const chooseEra=id=>{const next=eras.find(x=>x.id===id);setEraId(id);setFocusYear(next.focus);const current=get(picked);if(current&&(current.start>next.end||current.end<next.start)){const candidate=chronologies.find(x=>x.start<=next.focus&&x.end>=next.focus&&x.certainty!=="traditional")||chronologies.find(x=>x.start<=next.end&&x.end>=next.start);if(candidate)setPicked(candidate.id)}};
 const quickPick=()=>{const candidates=visible.filter(x=>x.certainty!=="traditional");if(candidates.length){const person=candidates[Math.floor(Math.random()*candidates.length)];setPicked(person.id);setFocusYear(clamp(Math.round((person.start+person.end)/2),era.start,era.end))}};
 const ticks=Array.from({length:7},(_,i)=>Math.round(era.start+i*(era.end-era.start)/6));
 return <section className="wrap timeline-page">
  <div className="timeline-heading"><span className="kicker">04 / THE CHRONOLOGY OF CURIOSITY</span><div className="section-intro"><div><h1>A walk through <em>time.</em></h1><p>See which minds shared an era, when their lives overlapped, and where ideas crossed centuries. Timing alone is not evidence of meeting or influence.</p></div><div className="timeline-head-icon" aria-hidden="true"><Clock3 size={36}/></div></div></div>
  <div className="epoch-toolbar" role="group" aria-label="Select era">{eras.map(e=><button key={e.id} className={e.id===eraId?"active":""} aria-pressed={e.id===eraId} onClick={()=>chooseEra(e.id)}>{e.label}</button>)}</div>
  <div className="timeline-explainer"><div><span className="kicker">CURRENT WINDOW</span><h2>{yearLabel(era.start)} <span>to</span> {yearLabel(era.end)}</h2><p>{era.description}</p></div><div className="timeline-legend"><span><i/> Life span</span><span><i className="legend-current"/> Alive at selected year</span><span><i className="legend-uncertain"/> Traditional placement</span></div></div>
  <div className="time-scrubber"><div className="scrubber-label"><span className="kicker">MOVE THE YEAR MARKER</span><strong>{yearLabel(focusYear)}</strong></div><input type="range" min={era.start} max={era.end} step="1" value={focusYear} aria-label="Select year" onChange={e=>setFocusYear(Number(e.target.value))}/><div className="scrubber-ticks"><span>{yearLabel(era.start)}</span><span>{yearLabel(era.end)}</span></div></div>
  <div className="time-summary"><div><strong>{snapshot.length}</strong><span>featured minds alive in {yearLabel(focusYear)}</span></div><p>This is a snapshot of the curated collection, not a complete list of historical thinkers.</p></div>
  <div className="timeline-layout"><div className="timeline-main"><div className="timeline-controls"><label className="timeline-search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} aria-label="Filter timeline by name or idea" placeholder="Find a mind or idea..."/></label><select aria-label="Filter timeline by discipline" value={field} onChange={e=>setField(e.target.value)}>{disciplines.map(d=><option key={d}>{d}</option>)}</select><button onClick={quickPick} className="timeline-shuffle" title="Explore a random thinker in this era"><Shuffle size={16}/><span>Surprise</span></button></div><div className="timeline-scale"><span>THINKER / FIELD</span><div>{ticks.map((t,i)=><span key={i} style={{left:i*100/6+"%"}}>{t<0?Math.abs(t)+" BCE":t}</span>)}</div><span>DATES</span></div><div className="temporal-table">{visible.map(m=><TemporalRow key={m.id} mind={m} year={focusYear} era={era} onOpen={onOpen} onSelect={setPicked} selected={m.id===picked}/>)}</div>{visible.length===0&&<div className="timeline-empty">No thinkers appear in this selection. Try a different era, field, or search term.</div>}<p className="timeline-footnote">Bars indicate recorded or approximate lifetimes. For figures of uncertain historicity, dashed bars indicate traditional associations, not verified lifespans. Dates before the common era are labeled BCE.</p></div>
  <aside className="timeline-aside"><div className="side-card"><span className="kicker">THE TIME TRAVELER</span><h3>Who lived alongside <em>{selected.name}?</em></h3><div className="traveler"><span className="traveler-symbol" style={{color:colors[selected.field]}}>{selected.name.split(" ").map(w=>w[0]).slice(-2).join("")}</span><div><b>{selected.name}</b><small>{selected.years}</small></div></div><div className="contemporaries"><span className="kicker">LIFESPAN OVERLAP</span>{peers.length?peers.map(({mind,years})=><button key={mind.id} onClick={()=>{setPicked(mind.id);if(mind.end>=era.start&&mind.start<=era.end)setFocusYear(clamp(Math.round(Math.max(mind.start,era.start)),era.start,era.end));else{const next=eras.find(e=>mind.start<=e.end&&mind.end>=e.start&&e.id!=="all")||eras[0];setEraId(next.id);setFocusYear(clamp(Math.round(Math.max(mind.start,next.start)),next.start,next.end))}}}><span className="peer-dot" style={{background:colors[mind.field]}}/><span><b>{mind.name}</b><small>{years} overlapping {years===1?"year":"years"}</small></span><ArrowRight size={14}/></button>):<p className="no-peers">No verified lifespan overlaps in this curated collection.</p>}</div><p className="timeline-caveat">Coexistence in time does not mean these thinkers met, corresponded, or influenced one another.</p><button className="side-open" onClick={()=>onOpen(selected.id)}>Explore {selected.name} <ArrowUpRight size={15}/></button></div><div className="side-card secondary-side"><span className="kicker">ANOTHER WAY TO THINK</span><p>Some ideas form bridges across centuries. The Connections view explores thematic echoes and disagreements independently of time.</p><span className="small-asterisk">✳</span></div></aside></div>
 </section>;
}
