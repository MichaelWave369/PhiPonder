import React,{useEffect,useMemo,useState} from "react";
import {ArrowRight,ArrowUpRight,Bookmark,BookMarked,BookOpen,Check,Download,ExternalLink,FileText,Headphones,Image as Picture,LibraryBig,NotebookPen,Search,SlidersHorizontal,Volume2} from "lucide-react";
import {thinkers,colors} from "./data.js";
import {works,workGroups,workKinds,isHistoricalSource} from "./works.js";
import "./reading-room.css";

const mindOf=id=>thinkers.find(m=>m.id===id);
const sourceTypes={Book:BookOpen,Lecture:Headphones,Artwork:Picture,Article:FileText,Archive:LibraryBig};
const labels={"queued":"To explore","reading":"Exploring","completed":"Finished"};
const restore=()=>{try{const value=JSON.parse(localStorage.getItem("phiponder:reading-shelf"));return value&&typeof value==="object"&&!Array.isArray(value)?value:{}}catch{return {}}};
function downloadShelf(shelf){const entries=works.filter(w=>shelf[w.id]).map(w=>({title:w.title,thinker:mindOf(w.mindId)?.name||w.mindId,url:w.url,status:shelf[w.id]}));const url=URL.createObjectURL(new Blob([JSON.stringify({app:"PhiPonder",exportedAt:new Date().toISOString(),readingShelf:entries},null,2)],{type:"application/json"}));const a=document.createElement("a");a.href=url;a.download="phiponder-reading-shelf.json";a.click();setTimeout(()=>URL.revokeObjectURL(url),1200);}
export default function ReadingRoom({focusMind="",onOpenMind,onTakeNotes}){
 const [search,setSearch]=useState(""),[kind,setKind]=useState("All formats"),[group,setGroup]=useState("All sources"),[person,setPerson]=useState(focusMind||"all"),[view,setView]=useState("collection");
 const [shelf,setShelf]=useState(restore);
 useEffect(()=>{setPerson(focusMind||"all");setSearch("");setView("collection")},[focusMind]);
 useEffect(()=>{try{localStorage.setItem("phiponder:reading-shelf",JSON.stringify(shelf))}catch{}},[shelf]);
 const saved=works.filter(w=>!!shelf[w.id]);
 const featured=useMemo(()=>works.filter(w=>{
  if(view==="shelf"&&!shelf[w.id])return false;
  if(kind!=="All formats"&&kind!==w.kind)return false;
  if(group==="Original / historical"&&!isHistoricalSource(w))return false;
  if(group==="Archives & context"&&isHistoricalSource(w))return false;
  if(person!=="all"&&person!==w.mindId)return false;
  const text=[w.title,mindOf(w.mindId)?.name,w.host,w.kind,w.summary,w.question,w.relation].join(" ").toLowerCase();
  return text.includes(search.toLowerCase().trim());
 }),[view,shelf,kind,group,person,search]);
 const changeStatus=(id,status)=>setShelf(old=>{const next={...old};if(status==="none")delete next[id];else next[id]=status;return next});
 const personOptions=thinkers.filter(m=>works.some(w=>w.mindId===m.id)).sort((a,b)=>a.name.localeCompare(b.name));
 const reset=()=>{setSearch("");setKind("All formats");setGroup("All sources");setPerson("all");setView("collection")};
 return <section className="wrap reading-page">
 <div className="reading-hero"><div><span className="kicker">05 / THE READING ROOM</span><h1>Go to the <em>source.</em></h1><p>Beyond biographies: actual books, talks, scholarly records, artworks, and archives. Follow original voices, examine the context, and keep a trail of your own questions.</p><div className="reading-stats"><span><strong>{works.length}</strong> curated sources</span><span><strong>{new Set(works.map(w=>w.mindId)).size}</strong> featured minds</span><span><strong>{saved.length}</strong> on your shelf</span></div></div><div className="reading-ornament" aria-hidden="true"><span>Φ</span><BookOpen size={88} strokeWidth={0.75}/></div></div>
 <div className="source-notice"><span className="source-notice-symbol">✳</span><p><strong>A library of links, not a piracy machine.</strong> Public-domain editions link to Project Gutenberg. Modern lectures, art, and archives remain on their owners' sites, sometimes with paywalls, accounts, or reuse restrictions. Descriptions here are editorial summaries, not quotations.</p></div>
 <div className="reading-top"><div className="reading-tabs" role="group" aria-label="Reading room view"><button className={view==="collection"?"active":""} aria-pressed={view==="collection"} onClick={()=>setView("collection")}><LibraryBig size={17}/> All sources <span>{works.length}</span></button><button className={view==="shelf"?"active":""} aria-pressed={view==="shelf"} onClick={()=>setView("shelf")}><Bookmark size={17}/> My reading shelf <span>{saved.length}</span></button></div>{saved.length>0&&<button className="reading-export" onClick={()=>downloadShelf(shelf)}><Download size={15}/> Export shelf</button>}</div>
 <div className="reading-filters"><label className="reading-search"><Search size={18}/><input value={search} onChange={e=>setSearch(e.target.value)} aria-label="Search sources" placeholder="Search books, ideas, archives..."/></label><select value={person} aria-label="Filter by thinker" onChange={e=>setPerson(e.target.value)}><option value="all">All thinkers</option>{personOptions.map(m=><option key={m.id} value={m.id}>{m.name}</option>)}</select><select value={kind} aria-label="Filter by format" onChange={e=>setKind(e.target.value)}>{workKinds.map(k=><option key={k}>{k}</option>)}</select></div>
 <div className="reading-group-filter" role="group" aria-label="Filter by source relationship">{workGroups.map(g=><button key={g} className={group===g?"active":""} aria-pressed={group===g} onClick={()=>setGroup(g)}>{g}</button>)}<span>{featured.length} matching sources</span></div>
 <div className="reading-grid">{featured.map(w=>{const m=mindOf(w.mindId),Icon=sourceTypes[w.kind]||BookOpen;return <article className="resource-card" style={{"--resource-color":colors[m.field]}} key={w.id}><div className="resource-top"><span className="resource-format"><Icon size={15}/>{w.kind}</span><span className="resource-relation">{w.relation}</span></div><div className="resource-person"><span className="person-dot"/>{m.name}<span className="person-field">{m.field}</span></div><h2>{w.title}</h2><p className="resource-description">{w.summary}</p><div className="resource-ref"><span>HOST</span><strong>{w.host}</strong><span>ACCESS</span><strong>{w.access}</strong></div><div className="resource-prompt"><span>READ WITH A QUESTION</span><p>{w.question}</p></div><p className="resource-note">{w.note}</p><div className="resource-actions"><a href={w.url} className="resource-open" target="_blank" rel="noopener noreferrer">Visit source <ExternalLink size={15}/></a><select aria-label={"Reading status for "+w.title} title="Save reading progress" value={shelf[w.id]||"none"} onChange={e=>changeStatus(w.id,e.target.value)}><option value="none">+ Shelf</option><option value="queued">To explore</option><option value="reading">Exploring</option><option value="completed">Finished</option></select></div><div className="resource-bottom"><button onClick={()=>onOpenMind(m.id)}>Thinker profile <ArrowUpRight size={13}/></button><button onClick={()=>onTakeNotes(m.id)}>Field notes <NotebookPen size={13}/></button></div></article>})}</div>
 {featured.length===0&&<div className="reading-empty"><BookMarked size={29}/><h2>{view==="shelf"&&!saved.length?"Your shelf is still empty.":"No sources match those filters."}</h2><p>{view==="shelf"&&!saved.length?"Browse the collection, then use + Shelf to mark something for later.":"Explore another thinker, format, or search term."}</p><button className="secondary" onClick={reset}>Browse all sources <ArrowRight size={15}/></button></div>}
 <div className="reading-endnote"><div><span className="kicker">BE CURIOUS, NOT CREDULOUS</span><h2>Primary materials are not automatically true.</h2><p>A first-hand book is evidence of what its author argued, not evidence that the argument is correct. Compare sources, editions, translations, and later scholarship. We deliberately mark archives and museum commentary separately from original works.</p></div><span aria-hidden="true">✦</span></div>
 </section>;
}
