# PEDAL2PATCH

**Guitar to Console Professional Engine**  
© Cédric Carboni - 2026

Pedal2Patch transforme une chaîne de pédales guitare en point de départ de patch console : console cible, signal flow, HPF/EQ/dynamics, effets, fiche régie/FOH et outils de plateau.

## État du dépôt
- PWA offline-first
- consoles : Behringer X18/XR18, Midas MR18, Behringer X32/M32, Soundcraft Ui24R, Allen & Heath CQ18T
- modes Fidèle / Live / Simple
- chaîne de pédales éditable
- import photo avec confirmation manuelle de l'ordre
- export JSON
- fiche régie/FOH
- tap tempo, calcul mA, A4 440 Hz
- Capacitor Android 7
- GitHub Actions : APK debug sur `main`, AAB release sur `release/play`
- publication Google Play automatisable vers internal / alpha / beta / production

## Limites actuelles
La version actuelle ne prétend pas faire de reconnaissance IA de pédales ni d'envoi réel UDP/OSC vers une console : ces intégrations doivent être implémentées et testées avant d'être présentées comme fonctionnelles.

## Publication Google Play
Identifiant Android : `fr.cedriccarboni.pedal2patch`.

Branche de publication : `release/play`.

Secrets GitHub attendus :
- `ANDROID_KEYSTORE_BASE64`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`
- `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON`
- `ADMOB_APP_ID`
- `ADMOB_BANNER_ID`

Le workflow `.github/workflows/android.yml` produit toujours l'AAB signé. L'envoi Play est déclenché manuellement via `workflow_dispatch` avec le track et le statut voulus.

## Monétisation
Modèle : application gratuite avec publicité + achat unique à vie pour retirer la publicité, sans abonnement.

Produit Google Play attendu : `remove_ads_lifetime`.

- AdMob : `@capacitor-community/admob@7`
- achat unique : `@capgo/native-purchases@7`
- consentement publicitaire via le SDK UMP du plugin AdMob
- restauration d'achat incluse
- prix chargé depuis Google Play, jamais codé en dur
- la PWA web reste sans publicité
- si les IDs AdMob de production ne sont pas configurés, le build utilise les IDs de test officiels Google

## Licence
Code et assets propriétaires, sauf mention contraire.
