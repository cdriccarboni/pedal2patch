import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("Pedal2Patch PWA core files exist",()=>{
  for(const file of ["index.html","app.js","styles.css","manifest.webmanifest","sw.js"]) assert.equal(fs.existsSync(file),true,file+" missing");
});

test("supported consoles are represented",()=>{
  const html=fs.readFileSync("index.html","utf8");
  for(const name of ["X18 / XR18","MR18","X32 / M32","Ui24R","CQ18T"]) assert.equal(html.includes(name),true,name+" missing");
});
