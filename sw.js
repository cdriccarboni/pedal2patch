const CACHE="pedal2patch-v1";
const ASSETS=["./","./index.html","./app.js","./styles.css","./manifest.webmanifest"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x))))));
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{const q=r.clone();caches.open(CACHE).then(x=>x.put(e.request,q));return r}).catch(()=>caches.match("./index.html"))))});
