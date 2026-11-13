import {test} from "node:test";
import assert from "node:assert/strict";
import {thinkers} from "./data.js";
import {chronologies,eras,overlaps,sharedYears,yearLabel} from "./chronology.js";
test("Every thinker has an era and valid chronological span",()=>{
 assert.equal(chronologies.length,thinkers.length);
 for(const m of chronologies){assert.ok(Number.isInteger(m.start),m.id);assert.ok(Number.isInteger(m.end),m.id);assert.ok(m.start<m.end,m.id);}
});
test("Historical approximation is marked instead of fabricated",()=>{
 assert.equal(chronologies.find(x=>x.id==="laozi").certainty,"traditional");
 assert.equal(overlaps(chronologies.find(x=>x.id==="laozi"),-550),false);
 assert.equal(yearLabel(-551),"551 BCE");
});
test("Chronological overlap does not claim intellectual influence",()=>{
 const jung=chronologies.find(x=>x.id==="carl-jung"),freud=chronologies.find(x=>x.id==="sigmund-freud");
 const bach=chronologies.find(x=>x.id==="johann-sebastian-bach"),escher=chronologies.find(x=>x.id==="m-c-escher");
 assert.ok(sharedYears(jung,freud)>0);
 assert.equal(sharedYears(bach,escher),0);
 assert.ok(eras.length>=4);
});
