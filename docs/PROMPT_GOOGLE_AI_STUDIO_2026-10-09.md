# PEDAL2PATCH — PROMPT MAÎTRE GOOGLE AI STUDIO (9 octobre 2026)
## À utiliser dans Google AI Studio > Build > Application Web, après « Import from GitHub » : cdriccarboni/pedal2patch

Tu es une équipe senior complète : développement web et Android/Capacitor, DSP et acoustique, ingénierie FOH, régie de spectacle vivant, UX mobile, tests et sécurité. **Exécute** cette mission, écris le code, montre une prévisualisation fonctionnelle et réalise les vérifications. Ne te limite pas à un plan, une maquette ou des écrans factices.

### A. IDENTITÉ ET SOURCE DE VÉRITÉ
Produit : **PEDAL2PATCH — Guitar to Console Professional Engine**, © Cédric Carboni 2026.
Dépôt préexistant et source de vérité : https://github.com/cdriccarboni/pedal2patch ; application Web PWA offline-first, Capacitor 7 Android ; package Android **fr.cedriccarboni.pedal2patch**. L'application transforme **une chaîne de pédales de guitare** en **préparation argumentée d'un patch sur console de mixage** avec chaîne de signal, traitements, effets, fiche régie/FOH et aides de plateau. Il ne s'agit PAS d'un simulateur générique de pédales ni d'un contrôleur de pédalier MIDI.

Lis **avant toute modification** : README.md, AGENTS.md, RELEASE_CHECKLIST.md, app.js, index.html, styles.css, manifest.webmanifest, sw.js, capacitor.config.ts, docs/PRIVACY.md, tests, workflows GitHub Actions et les skills dans .agents/skills/. Identifie le comportement réellement codé. Préserve TOUS les écrans, bibliothèques, outils, presets, données locales, chemins d'export et workflows. Ne réinitialise pas les données utilisateurs. Conserve l'historique Git ; n'écrase pas main ; travaille sur une branche dédiée `feat/google-ai-studio-pedal2patch` ou livre un diff/PR contrôlable. Ne renomme pas l'app, le bundle Android ou la licence propriétaire. Si AI Studio ne peut pas importer le dépôt, demande le ZIP du dépôt, mais ne recrée pas arbitrairement une application divergente.

### B. OBJECTIF IMMÉDIAT
Livrer une version **réellement utilisable immédiatement en prévisualisation**, sur téléphone et ordinateur, pour préparer un patch guitare destiné à une console. Réaliser le parcours complet :
(1) choisir sa console, sa chaîne audio, son instrument et les pédales ;
(2) comprendre l'intention sonore et le contexte live ;
(3) obtenir des conseils techniques crédibles, des réglages de départ conditionnels, une chaîne de signal, un patch manuel et une fiche régie ;
(4) ajuster, sauvegarder, retrouver et exporter son travail ;
(5) essayer le mode Live en situation de plateau, sans Internet.
Tous les boutons de l'interface doivent répondre. Pas de "coming soon" déguisé en fonction ni de résultat inventé. Après la première génération, montre l'application, pas seulement le code.

### C. CONSOLES ET MODES À PRÉSERVER
Cibles : Behringer X18/XR18, Midas MR18, Behringer X32/Midas M32, Soundcraft Ui24R et Allen & Heath CQ18T.
Trois modes :
- **Fidèle** : préserver autant que possible la personnalité et la dynamique du son d'origine ;
- **Live** : lisibilité et stabilité dans un mix de spectacle ;
- **Simple** : correction minimale, workflow rapide.
Chaque console possède son **profil de capacité documenté** (type de canal, EQ, filtres, dynamique, envois FX, types de routing, éventuelles limitations). Ne suppose jamais que tous les modèles partagent les mêmes commandes, nombres de bus ou plages de paramètres. Une console sélectionnée oriente la recommandation et la fiche ; n'annonce pas qu'elle est connectée tant que la connexion n'est pas prouvée.

### D. STUDIO DE PEDALBOARD
Créer une représentation claire et éditable du chemin `guitare → pédales en ordre → ampli/simulateur/DI → micro ou liaison ligne → canal console → sorties/monitoring`.
- Ajouter, éditer, dupliquer, supprimer et **réordonner par glisser-déposer ET boutons accessibles** les pédales ; familles : tuner, buffer, compresseur, boost, overdrive/distorsion/fuzz, pitch, wah/filter, modulation, delay, reverb, looper, amp sim, DI, custom.
- Enregistrer marque, modèle, nom court, type, état on/off, presets, réglages connus (si saisis), alimentation V/mA, polarité, sorties mono/stéréo, niveau instrument/ligne quand pertinent.
- Choisir guitare/pickups (single coil, humbucker, piezo, autre), ampli réel vs simulateur, micro (SM57, e906, R-121, autre), DI, nombre de canaux, contexte de jeu, intention sonore par texte libre.
- Enregistrer plusieurs projets et plusieurs sons pour un même spectacle ; dupliquer et versionner un preset, favoris, recherche, import/export JSON avec version de schéma et migration de l'existant.
- Photos : fichier/appareil photo, recadrage, aperçu et ajout à un projet. Proposer une **assistance à l'identification IA uniquement si techniquement implémentée** avec consentement explicite et traitement documenté ; afficher incertitude et demander à l'utilisateur de confirmer chaque pédale et surtout l'ordre, les entrées/sorties et câbles cachés. Prévoir parcours 100% manuel hors ligne. Ne jamais prétendre « photo analysée » après simple import.

### E. MOTEUR DE TRADUCTION ACOUSTIQUE : FIN DU PATCH GÉNÉRIQUE
Le code actuel montre des HPF 65/75/90 Hz, un +18 dB de trim et 48V OFF quasi systématiques : CE SONT DES EXEMPLES PÉDAGOGIQUES, PAS DES VALEURS SÛRES POUR TOUTE INSTALLATION. Remplacer la prescription fixe par un moteur explicite à règles et garde-fous :
- Déterminer l'origine audio : micro dynamique, micro ruban, condensateur, DI passive/active, sortie ligne du simulateur, ampli repris au micro. **Ne jamais imposer une alimentation fantôme universelle** : poser les questions nécessaires, montrer "à confirmer" si inconnu et expliquer la précaution correspondante.
- Ne pas inventer de niveau de gain, de puissance, d'alimentation électrique, de headroom ni de réglage garanti. Proposer une procédure de gain staging à mesurer avec la console, avec indicateurs pédagogiques et ajustements conditionnels.
- Suggérer HPF/LPF, bandes d'EQ et dynamiques comme **points de départ** liés au type de captation, au son visé, au risque de feedback et à la place dans le mix. Préciser les hypothèses et rendre les valeurs éditables. Expliquer fréquence, Q, gain, seuil, ratio, attack, release, pre/post-fader si concerné.
- Modéliser l'influence possible des pédales par **descriptions transparentes** et non par prétendue analyse audio mesurée. Tenir compte de l'ordre, distorsion/compression, ambiance temps, stéréo/mono, chaîne parallèle éventuelle.
- Inclure un assistant pédagogique : "Pourquoi ce filtre ?", "Si le son est trop boueux ?", "Si je veux garder le grain ?", "Que transmettre au FOH ?" en termes clairs et professionnels.
- Ne faire aucune promesse de retrouver exactement le grain d'un pedalboard réel sans captation/mesure/audio.

### F. MODES PATCH MANUEL, FICHE RÉGIE/FOH ET LIVE
**Patch manuel :** vue de tous les paramètres avec édition individuelle, explications, retour à la proposition, historique annuler/rétablir, modèles console et comparaison "proposé vs corrigé". Afficher séparément les paramètres **simulés**, **préparés** et **effectivement envoyés**.
**Fiche régie/FOH :** projet, scène/date (optionnelle), entrée/patch list, micro/DI, phantom conditionnel, canal et nom, stage plot simplifié, chaînes de pédales, alimentation, notes de monitoring/IEM, chaîne du signal, filtres/EQ/dynamique proposés, FX, commentaires du musicien et du technicien. Export texte copiable, JSON versionné, et PDF A4 propre. Si PDF n'est pas réalisable d'emblée, utiliser l'impression navigateur A4 en attendant ; ne pas afficher « PDF exporté » si rien n'a été généré.
**Mode Live :** fond sombre très lisible, informations essentielles visibles sans défilement excessif, gros contrôles tactiles, verrouillage optionnel anti-modification accidentelle, rappel console et patch, fonctionnement sans réseau, résilience rechargement/perte Wi-Fi. Éviter toute commande destructrice en un clic.

### G. OUTILS DE PLATEAU
- Tap tempo robustifié : moyenne/médiane de plusieurs frappes, reset, BPM, division rythmique, valeur liée à un preset ; calculs unitaires exacts et tests.
- Calculateur d'alimentation pédales : tension, mA, marge de courant, polarité, distinction sorties isolées/non isolées, indication explicite des incertitudes et impossibilités de compatibilité. Ne pas dire qu'une alimentation est sûre sans caractéristiques confirmées.
- Accordage : afficher A4=440 Hz comme référence et, si vrai détecteur audio implémenté, proposer choix fréquence de référence, autorisation micro, traitement local et indicateur d'accordage testé. Sinon nommer "référence 440 Hz", pas "accordeur".
- Lexique et mini-guides FOH (gain, phantom, HPF, Q, compression, send/return, stéréo, DI).
- Toutes les données métiers saisies persistent après fermeture/réouverture ; stockage local fiable (IndexedDB pour les collections/photos, migrations pour l'ancien localStorage).

### H. CONNEXION RÉELLE À UNE CONSOLE : PHASE DISTINCTE
Architecturer des adaptateurs séparés par modèle et protocole, avec découverte/identification du modèle si possible, configuration manuelle IP/port, journal de connexions, autorisations, timeout, déconnexion, export/import de scènes compatibles **uniquement si spécification vérifiée**. Pour OSC/UDP ou contrôle réseau, comprendre les limites du navigateur/PWA : un vrai transport peut nécessiter un bridge local ou une intégration native Android. Ne jamais simuler "Connecté" ni "Envoyé" si aucun accusé/résultat vérifié. Sans équipement réel, livrer un **mode simulation explicitement nommé**, des tests d'adaptateurs et une fiche des essais matériels nécessaires. Pas d'envoi réel activé par défaut, et demander confirmation avant toute écriture sur une console live. Préserver la sécurité de la sonorisation en fonctionnement.

### I. UX / DESIGN
Direction : console audio professionnelle, sobre, fond presque noir, excellent contraste, typographie claire, accent unique discret ; pas d'emoji comme icônes ni de fausses façades de matériel. Logo PEDAL2PATCH et droits © Cédric Carboni – 2026.
Écrans : Accueil, Créer un son, Patch manuel, Fiche régie & FOH, Boîte à outils, Mes sons, Mode Live, Paramètres. Sur mobile, navigation dédiée accessible au pouce, respect safe areas et du bouton Retour Android ; sur desktop, utilisation confortable en plein écran, clavier, souris et tactile. Français complet par défaut, anglais complet en option **réelle**, pas seulement un bouton FR/EN. Accessibilité WCAG AA : labels, focus, aria, tailles tactiles, zoom, défilement, contraste, lecteurs d'écran, pas de scroll horizontal. Aperçu de démo marquée comme telle et supprimable.

### J. ARCHITECTURE & DONNÉES
Conserver une application **PWA offline-first** packagée par le pipeline **Capacitor existant**. Éviter d'imposer serveur, comptes utilisateurs, Firebase ou backend pour un usage FOH hors ligne. Si une option de modèle Gemini est utile (photo ou aide), rendre l'intégration opt-in, isolée, sécurisée côté serveur et dégradant proprement vers 100% manuel hors ligne. Pas de clé API côté client, pas de stockage cloud silencieux. Ne supprime ni les données des utilisateurs ni l'ancien format localStorage avant migration validée et sauvegarde.
Découpler modèle métier, profils consoles, moteur de règles, composants UX, adaptateurs matériels, exports, persistance et tests. Tout ajout a un contrat de données et des tests. Garder scripts npm et workflows GitHub Actions existants compatibles, ne pas refaire le dépôt et ne pas créer un second projet Android concurrent.

### K. MONÉTISATION ET STORE
**Décision éditoriale la plus récente communiquée : application payante à l'achat sur Google Play.** Attention : des anciens docs du dépôt décrivent un modèle freemium avec publicité et achat à vie sans publicité. C'est une contradiction documentaire à signaler clairement ; **ne pas intégrer de SDK pub ni de fausse logique de facturation** et ne surtout pas créer/publier la fiche Play en "gratuite" à partir des anciens docs. Préparer la fiche Google Play en **payante**, tarif à déterminer par le propriétaire avant mise en vente. Ne PAS publier en production automatiquement. Le package stable doit rester `fr.cedriccarboni.pedal2patch`. Un AAB non signé n'est pas livrable au Play Store.
Pour une nouvelle soumission en octobre 2026, vérifier la conformité Android 16 / API 36 et toutes les exigences Play actuelles, signature, privacy policy, Data safety, screenshots **réels**, accès tests interne/fermé, classification, droits, app icon 512 et feature graphic si demandé. Ne pas committer clés, keystores ou identifiants de service dans Git.

### L. QUALITÉ, VERSIONS ET LIVRAISONS
1. Audite les fichiers du dépôt et produis une liste "existant / manquant / à corriger", mais **enchaîne tout de suite avec l'implémentation**, sans t'arrêter à l'audit.
2. Rétablis et teste le parcours principal complet, les sauvegardes, export et mode Live ; ensuite photo assistée, export PDF, qualité mobile, traduction.
3. Ajoute tests unitaires pour règles de traduction et garde-fous, persistance/import ancien format, tap-tempo, calculs d'alimentation, export ; tests e2e critiques, tests d'accessibilité et tests hors ligne.
4. Vérifie build / lint / tests et fournis résultats concrets, sans écrire "tests OK" si rien n'a tourné. Toute fonction hardware non testée doit être étiquetée.
5. Préserve GitHub main, réalise tes changements sur branche, propose PR, commits atomiques et changelog, version incrémentée, service worker cache indexé par version/commit sans casser les données locales.
6. Prépare l'APK Android de test et l'AAB signé pour TEST INTERNE seulement **quand la CI, les clés et la conformité Play sont effectivement disponibles**. Ne mets jamais d'AAB à télécharger sur une page Installer. Ne prétends pas que l'application est en ligne sur Play si la Play Console ne l'a pas acceptée.
7. À la fin : fournis URL de prévisualisation utilisable, instructions d'essai mobile, URL de branche/PR ou ZIP, fichiers modifiés, tests réellement effectués, captures authentiques, statut exact Android/PWA/Play et liste courte des validations matérielles restantes.

### M. SCÉNARIO D'ACCEPTATION OBLIGATOIRE
En français, sur smartphone :
- choisir XR18, guitare simple bobinage, ampli repris avec micro dynamique, chaîne Tuner → Tube Screamer → Delay → Reverb ;
- définir un son "Clair avec delay", mode Fidèle, puis mode Live, comparer les recommandations et les justifications ;
- déplacer Delay avant overdrive, constater la différence de chaîne et des explications sans prétendre à une analyse mesurée ;
- régler manuellement EQ/compresseur, sauvegarder sous "Répétition pirate", redémarrer et retrouver exactement le projet ;
- exporter JSON et fiche régie A4, réimporter JSON ;
- utiliser tap tempo et calcul d'alimentation ;
- passer hors ligne et ouvrir Mode Live ;
- importer une photo et confirmer manuellement les pédales ;
- vérifier l'absence de message trompeur "console connectée" si aucun matériel n'a été testé.
Répéter sur desktop et Android WebView si environnement disponible.

**Priorité absolue : fais marcher les fonctions existantes et livre un prototype immédiatement testable ; l'esthétique vient après la fiabilité. Exécute sans attendre une validation intermédiaire, mais ne modifie jamais main, les secrets Play ou la production sans preuve de conformité.**
