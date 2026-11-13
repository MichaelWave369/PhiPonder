import {test} from "node:test";
import assert from "node:assert/strict";
import {thinkers,connections,disciplines} from "./data.js";
test("A substantial and unique atlas",()=>{assert.ok(thinkers.length>=40);assert.equal(new Set(thinkers.map(t=>t.id)).size,thinkers.length)});
test("Complete thinker profiles",()=>{for(const t of thinkers){assert.ok(t.name&&t.summary&&t.question&&t.moniker);assert.ok(t.ideas.length>=3);assert.ok(t.source.startsWith("https://"));assert.ok(disciplines.includes(t.field))}});
test("Every connection refers to existing people",()=>{const ids=new Set(thinkers.map(t=>t.id));for(const c of connections){assert.ok(ids.has(c.a),c.a);assert.ok(ids.has(c.b),c.b);assert.ok(c.theme&&c.shared&&c.difference&&c.question)}});
