import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "fr.cedriccarboni.pedal2patch",
  appName: "Pedal2Patch",
  webDir: "www",
  server: { androidScheme: "https" }
};

export default config;
