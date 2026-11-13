import {test} from "node:test";
import assert from "node:assert/strict";
import {works,workKinds,workGroups,isHistoricalSource} from "./works.js";
import {thinkers} from "./data.js";

test("Reading Room is curated, distinct and anchored to real thinker profiles",()=>{
 const ids=new Set(thinkers.map(t=>t.id));
 assert.ok(works.length>=25);
 assert.equal(new Set(works.map(w=>w.id)).size,works.length);
 assert.equal(new Set(works.map(w=>w.url)).size,works.length);
 for(const w of works){
   assert.ok(ids.has(w.mindId),"Missing thinker: "+w.mindId);
   assert.ok(w.title&&w.summary&&w.question&&w.access&&w.host&&w.note,"Incomplete source: "+w.id);
   assert.ok(workKinds.includes(w.kind),"Unexpected kind "+w.kind);
   assert.ok(w.relation&&w.relation.length>2);
   assert.ok(w.url.startsWith("https://"),"Insecure or malformed link: "+w.url);
   assert.ok(new URL(w.url).hostname.length>3);
 }
});

test("Classic sources are distinguished from external archives and commentary",()=>{
 const original=works.find(w=>w.title==="The Republic");
 const museum=works.find(w=>w.title.includes("Persistence of Memory"));
 const contemporary=works.find(w=>w.mindId==="terence-mckenna");
 assert.equal(isHistoricalSource(original),true);
 assert.equal(isHistoricalSource(museum),false);
 assert.equal(isHistoricalSource(contemporary),false);
 assert.ok(workGroups.includes("Original / historical"));
 assert.ok(works.some(w=>w.access==="Free full text"));
 assert.ok(works.some(w=>w.access.includes("paid")));
});

test("There are cross-disciplinary sources, including some original and a museum collection",()=>{
 const fields=new Set(works.map(w=>thinkers.find(t=>t.id===w.mindId).field));
 assert.ok(fields.size>=5);
 assert.ok(works.some(w=>w.kind==="Artwork"&&w.host==="Museum of Modern Art"));
 assert.ok(works.some(w=>w.host==="Project Gutenberg"));
});
