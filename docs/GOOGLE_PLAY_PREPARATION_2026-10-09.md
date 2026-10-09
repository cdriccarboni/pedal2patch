# Pedal2Patch — Préparation Google Play (audit réel, 9 octobre 2026)

## Références vérifiées
- Repo: https://github.com/cdriccarboni/pedal2patch
- Branche courante de référence: main, commit 194d617efdedc7587290b13ba968a926b02b3d35 (6 octobre 2026)
- Package fixe: `fr.cedriccarboni.pedal2patch`
- PWA + wrapper Android Capacitor 7
- Version source: 1.0.1 ; `versionCode` calculé par CI: 10001
- Build Android de test réussi: https://github.com/cdriccarboni/pedal2patch/actions/runs/37444050541
- APK de TEST: https://github.com/cdriccarboni/pedal2patch/releases/tag/v1.0.1-test
- AAB de test actuel NON SIGNÉ : ne pas soumettre à Play.
- Pages: dernier run a échoué https://github.com/cdriccarboni/pedal2patch/actions/runs/37444050344 : action `configure-pages` a renvoyé "Get Pages site failed" / Not Found. Il faut activer **Settings > Pages > Build and deployment > Source: GitHub Actions**, puis relancer le job. Ne pas déclarer l'URL Pages fonctionnelle sans vérification.
- Workflow existant de publication interne: `.github/workflows/play-release.yml`, en déclenchement manuel avec `publish_to_play=false` par défaut, `track=internal` ; n'est PAS une preuve d'envoi Play.

## Contradiction commerciale à corriger AVANT la création de l'app sur Play
Consigne projet la plus récente connue : **application payante**, prix non encore fixé. Le README et AGENTS.md de ce dépôt décrivent à l'inverse un modèle gratuit avec publicité + achat définitif de suppression des publicités. Ce document prépare la fiche **payante** et ne change pas silencieusement la monétisation du code. À ne pas rater : Google ne permet pas de rendre payante une application qui a déjà été proposée gratuitement sous le même package (voir règles Play). Ne pas mettre "Gratuite" par commodité, ni intégrer des publicités dans la version payante.

## Fiche Play Store FR — brouillon prêt à adapter après tests
**Nom** : Pedal2Patch
**Catégorie suggérée** : Musique et audio (à vérifier dans la Console)
**Contact de support proposé** : acousmaticregietools@gmail.com (adresse habituelle des retours bêta, à confirmer sur cette app personnelle avant soumission)
**Description courte** : Préparez vos sons de guitare et vos patchs pour la régie.
**Description complète :**

Pedal2Patch accompagne les guitaristes, techniciens son et régisseurs dans la préparation d'une chaîne de pédales pour une console de mixage.

Choisissez votre guitare et votre chaîne de pédales, précisez votre mode de captation, puis préparez une fiche de patch lisible pour votre balance ou votre concert.

Trois approches de travail : Fidèle, Live et Simple. Retrouvez vos sons, documentez leur signal flow, préparez les informations utiles à la régie et gardez vos notes accessibles pendant les répétitions.

Le prototype actuel propose des recommandations pédagogiques à vérifier à l'écoute. La reconnaissance automatique des pédales et la connexion directe aux consoles ne doivent être annoncées sur la fiche commerciale que **quand elles sont réellement réalisées et validées sur du matériel**.

Les fonctions exactes énumérées pour la mise en vente doivent correspondre à la version compilée testée : ne pas promettre un accordeur audio, un export PDF, un contrôle réseau ni une assistance photo IA tant que ces fonctions ne sont pas implémentées.

© Cédric Carboni — 2026.

## Médias et conformité à constituer
- Icône 512×512 raster (depuis logo SVG sans altérer son identité), icône adaptative Android, splash.
- Screenshots **réels** prises sur la version finalisée, téléphone (et tablette si utile), sans maquettes mensongères.
- Bannière/feature graphic aux dimensions indiquées dans la Console.
- Politique de confidentialité publiée sur URL web HTTPS stable et à jour des SDK réellement intégrés.
- Formulaire Data safety fidèle aux données et transferts réels.
- Audience, classement, accès à l'app, déclarations de pub (aucune si version payante sans pubs), conditions et règlements actualisés.
- Signatures de publication sécurisées : secrets GitHub `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD`, `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON`. Ne pas les committer. Ne pas créer de nouvelle clé si une clé Play existe déjà.
- Niveau Android API cible : **36 ou plus depuis le 31 août 2026** pour nouvelles applis / mises à jour téléphone, sauf exemption officielle.
- Avant test fermé / public : QA Android réelle, appareils Pixel, Android retour natif, offline, sauvegarde et restauration.
- Pour compte personnel Play créé après 13 novembre 2023 : au moins 12 testeurs fermés inscrits pendant 14 jours consécutifs avant l'accès Production (si applicable au compte).
- VersionCode strictement supérieur au dernier Play accepté ; ne pas réutiliser le code 10001 si déjà soumis.
- Play Console : créer / retrouver la fiche existante avec package exact et prix **payant**, compléter déclarations, télécharger seulement l'AAB signé sur **Tests internes**, vérifier acceptation avant toute phrase "Publié sur Play".

## Plan de sortie sans collision
1. Faire travailler Google AI Studio sur la branche de développement issue du dépôt existant, sans écrire directement sur `main`.
2. Tests unitaires, e2e, offline et appareil ; respecter les chemins de compatibilité de l'ancien localStorage.
3. Examiner les diffs et ouvrir PR vers `main`.
4. Incrémenter version + versionCode ; reconstruire un APK test et AAB signé avec le workflow existant, sous clés sécurisées.
5. Publier uniquement en tests internes dans la Play Console avec compte propriétaire ; obtenir un lien de test réel.
6. Étendre aux tests fermés puis envisager la production après tous les contrôles et exigences applicables.

## Liens officiels de référence (consultés octobre 2026)
- AI Studio Build : https://ai.google.dev/gemini-api/docs/aistudio-build-mode?hl=fr
- Play target API : https://support.google.com/googleplay/android-developer/answer/11926878?hl=fr
- Prix d'application : https://support.google.com/googleplay/android-developer/answer/6334373?hl=en
- Nouveaux comptes personnels et tests : https://support.google.com/googleplay/android-developer/answer/14151465?hl=FR
