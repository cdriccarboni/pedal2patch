import { cp, mkdir, rm } from "node:fs/promises";
import { build } from "esbuild";

const files = [
  "index.html",
  "app.js",
  "styles.css",
  "manifest.webmanifest",
  "sw.js",
  "icon-192.svg",
  "icon-512.svg",
  "monetization.js"
];

await rm("www", { recursive: true, force: true });
await mkdir("www", { recursive: true });
for (const file of files) await cp(file, `www/${file}`);

const bannerId = process.env.ADMOB_BANNER_ID || "ca-app-pub-3940256099942544/6300978111";

await build({
  entryPoints: ["src/monetization-native.js"],
  bundle: true,
  format: "iife",
  platform: "browser",
  target: ["chrome100"],
  outfile: "www/monetization.js",
  define: {
    __ADMOB_BANNER_ID__: JSON.stringify(bannerId)
  }
});
