# AGENTS.md — PEDAL2PATCH

PEDAL2PATCH transforme une chaîne de pédales guitare en préparation de patch console, signal flow, traitements, effets et fiche régie/FOH.

## À lire avant modification
1. `README.md`
2. le code et les workflows réellement présents
3. les Skills sous `.agents/skills/` correspondant à la tâche

## Règles produit
- préserver l'approche PWA offline-first ;
- ne jamais annoncer l'envoi réel OSC/UDP ou la reconnaissance IA comme fonctionnels avant implémentation et test réels ;
- conserver les modes Fidèle / Live / Simple ;
- privilégier les données et calculs déterministes pour les fonctions plateau ;
- toute intégration console doit être documentée et isolée par cible/protocole ;
- une correction web n'est pas une livraison Android tant que l'APK/AAB n'a pas été reconstruit ;
- ne jamais committer de keystore, mot de passe, compte de service ou secret Play.

## Monétisation
Le modèle prévu est gratuit avec publicité et achat unique à vie pour supprimer la publicité.
Utiliser la Skill `monetizing-ads-lifetime-unlock` pour toute modification liée aux annonces, au billing, à l'entitlement ou à la restauration d'achat.

## Livraison
- utiliser `shipping-app-release` pour une release ;
- utiliser `publishing-google-play` pour Android/Play ;
- utiliser `auditing-mobile-pwa` pour l'UX mobile/PWA ;
- utiliser `testing-live-show-readiness` avant une version destinée au plateau.

Ne déclarer une mission terminée qu'avec preuves de build/test et état de publication réel.