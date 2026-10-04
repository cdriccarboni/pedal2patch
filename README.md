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
- Capacitor Android scaffold
- GitHub Actions de contrôle et build APK debug

## Limites actuelles
La version actuelle ne prétend pas faire de reconnaissance IA de pédales ni d'envoi réel UDP/OSC vers une console : ces intégrations doivent être implémentées et testées avant d'être présentées comme fonctionnelles.

Le Mac de développement n'étant pas connecté à l'outil d'exécution au moment de l'amorçage, le build Gradle local et la signature Play n'ont pas été déclarés comme vérifiés.

## Publication Google Play
Identifiant Android préparé : fr.cedriccarboni.pedal2patch.

Pour un AAB de production, il faut fournir au dépôt de secrets du dépôt GitHub :
- ANDROID_KEYSTORE_BASE64
- ANDROID_KEYSTORE_PASSWORD
- ANDROID_KEY_ALIAS
- ANDROID_KEY_PASSWORD
- GOOGLE_PLAY_SERVICE_ACCOUNT_JSON

Ces secrets ne doivent jamais être commités dans Git.

La création de la fiche application Play Console et l'autorisation de publication nécessitent le compte Google Play du propriétaire. Aucune identité, clé ou projet n'est inventé ici.

## Monétisation prévue
Modèle gratuit avec publicité et déblocage payant de la version sans publicité, à implémenter après QA et conformité Play.

## Licence
Code et assets propriétaires, sauf mention contraire.
