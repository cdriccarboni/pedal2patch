import { appendFile, readFile, writeFile } from "node:fs/promises";

const gradlePath = "android/app/build.gradle";
const manifestPath = "android/app/src/main/AndroidManifest.xml";

const versionCode = Number(process.env.ANDROID_VERSION_CODE || "1");
const versionName = process.env.ANDROID_VERSION_NAME || "1.0.0";
const admobAppId = process.env.ADMOB_APP_ID || "ca-app-pub-3940256099942544~3347511713";

if (!Number.isInteger(versionCode) || versionCode < 1) {
  throw new Error("ANDROID_VERSION_CODE doit être un entier positif");
}

let gradle = await readFile(gradlePath, "utf8");
const marker = "// PEDAL2PATCH_PLAY_CONFIG";
if (!gradle.includes(marker)) {
  gradle += `

${marker}
android {
    defaultConfig {
        versionCode ${versionCode}
        versionName "${versionName.replaceAll('"', '\\"')}"
    }

    signingConfigs {
        release {
            def ks = System.getenv("ANDROID_KEYSTORE_PATH")
            if (ks != null && !ks.isBlank()) {
                storeFile file(ks)
                storePassword System.getenv("ANDROID_KEYSTORE_PASSWORD")
                keyAlias System.getenv("ANDROID_KEY_ALIAS")
                keyPassword System.getenv("ANDROID_KEY_PASSWORD")
            }
        }
    }

    buildTypes {
        release {
            if (System.getenv("ANDROID_KEYSTORE_PATH") != null) {
                signingConfig signingConfigs.release
            }
        }
    }
}
`;
  await writeFile(gradlePath, gradle);
}

let manifest = await readFile(manifestPath, "utf8");
if (!manifest.includes("com.google.android.gms.ads.APPLICATION_ID")) {
  manifest = manifest.replace(
    "</application>",
    `        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="${admobAppId}" />
    </application>`
  );
  await writeFile(manifestPath, manifest);
}
