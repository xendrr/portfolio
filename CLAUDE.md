# CLAUDE.md — Portfolio BTS SIO SISR

Ce fichier donne le contexte du projet à Claude Code. Le lire entièrement avant toute modification.

## 1. Contexte

- Auteur : {{ALEXANDRE BAHAR}}, étudiant en 2e année de BTS SIO, option SISR (session 2027).
- But : portfolio professionnel servant de support à l'épreuve **E5 — Support et mise à disposition de services informatiques** (oral de 40 min, coefficient 4).
- Public : jury BTS, professeurs, recruteurs.
- Domaine final : `https://{{alexandrebahar.com}}`
- Le site doit être **complété au fur et à mesure** : ajouter une réalisation ou une veille = ajouter un fichier Markdown, sans toucher au code.

## 2. Exigences de l'école (prioritaires)

Le portfolio doit démontrer les six compétences du Bloc 1 :

| Code | Compétence |
|---|---|
| C1 | Gérer le patrimoine informatique |
| C2 | Répondre aux incidents et aux demandes d'assistance et d'évolution |
| C3 | Développer la présence en ligne de l'organisation |
| C4 | Travailler en mode projet |
| C5 | Mettre à disposition des utilisateurs un service informatique |
| C6 | Organiser son développement professionnel |

Rubriques obligatoires : Accueil (nom, formation, option, objectif), Profil, Compétences (tableau de couverture), Réalisations (fiches + preuves), Veille (fiches analysées), Stage, Projets, Documentation, Projet professionnel. Plus : CV, lien GitHub, contact.

Chaque fiche de réalisation suit exactement la trame de l'école (voir §5).

## 3. Stack et contraintes techniques

- **Astro** (dernière version stable), sortie **100 % statique** (`output: 'static'`). Pas d'adaptateur serveur, pas de SSR.
- **Content Collections** avec schéma Zod dans `src/content.config.ts` pour `realisations` et `veille`.
- CSS maison dans un seul fichier de tokens + styles de composants (`src/styles/`). Pas de Tailwind, pas de framework UI, pas de JavaScript client sauf besoin réel.
- Polices auto-hébergées via `@fontsource` (aucune requête vers Google Fonts).
- Intégration `@astrojs/sitemap`.
- Déploiement : **Cloudflare Workers (static assets)** connecté au repo GitHub. Fichier `wrangler.jsonc` à la racine :

```jsonc
{
  "name": "portfolio",
  "compatibility_date": "2026-09-01",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "404-page"
  }
}
```

- Commandes : `npm run dev`, `npm run build` (doit passer sans erreur ni warning), `npx wrangler deploy`.
- `.gitignore` : `node_modules/`, `dist/`, `.astro/`, `.wrangler/`, `.env*`.
- **Jamais** de mot de passe, token, clé API ou clé privée dans le repo.

## 4. Arborescence des pages

```
/                       Accueil
/profil                 Présentation (10–15 lignes), technos maîtrisées / en cours, 3 technos visées, parcours
/competences            Tableau de couverture généré automatiquement depuis les fiches
/realisations           Liste des réalisations (filtrable par type : TP, projet, stage, perso)
/realisations/[slug]    Fiche détaillée
/projets                Réalisations de type "projet" uniquement
/veille                 Liste des fiches de veille
/veille/[slug]          Fiche de veille
/stage                  Contexte, entreprise, missions, bilan (contenu "À compléter" au départ)
/documentation          Procédures et ressources produites (liens vers les fiches ou fichiers)
/projet-professionnel   Objectif après le BTS + plan de progression
/cv                     Résumé + lien de téléchargement de /cv.pdf
/contact                Adresse e-mail (mailto), GitHub, LinkedIn. Pas de formulaire.
/mentions-legales       Éditeur (nom, contact) + hébergeur (Cloudflare, Inc.)
/404                    Page d'erreur utile (liens vers accueil et réalisations)
```

Navigation principale : Réalisations, Compétences, Veille, Stage, Profil. Le reste (Projets, Documentation, Projet professionnel, CV, Contact, Mentions légales) dans le pied de page et via des liens contextuels.

## 5. Modèle de contenu

### Réalisations — `src/content/realisations/*.md`

Frontmatter :

```yaml
title: "Déploiement d'un Active Directory sous Windows Server"
date: 2025-03-15          # date de fin ou de dernière mise à jour
periode: "Mars 2025"
type: tp                  # tp | projet | stage | perso
statut: termine           # termine | en-cours
competences: [C1, C5]
technologies: ["Windows Server 2022", "AD DS", "DNS", "VirtualBox"]
resume: "Une phrase qui dit ce qui a été fait."
draft: false
```

Corps : titres `##` dans cet ordre (trame de l'école) :
Contexte · Besoin / problématique · Objectif · Environnement technique · Travail réalisé · Difficulté et diagnostic · Solution mise en œuvre · Tests et résultats · Documentation produite · Compétences mobilisées · Bilan.

Les preuves (captures, schémas) vont dans `src/assets/realisations/<slug>/` et sont affichées avec le composant `<Image>` d'Astro (alt obligatoire).

### Veille — `src/content/veille/*.md`

```yaml
title: "..."
date: 2026-10-01
theme: "Virtualisation"   # thème SISR
source: "https://..."
sourceDate: 2026-09-20
competences: [C6]
draft: false
```

Corps : Pourquoi ce sujet · Résumé · Points techniques · Avantages / limites · Impact pour une entreprise · Impact sur mon métier · Expérimentation · Analyse personnelle · Sources complémentaires.

### Tableau de couverture

La page `/competences` lit toutes les réalisations non-draft et construit le tableau réalisations × C1–C6. Chaque ligne renvoie vers la fiche. Une ligne de synthèse indique les compétences non couvertes.

## 6. Contenu de départ

Créer ces fiches avec la trame complète. Remplir ce qui est connu, mettre `À compléter` partout ailleurs. **Ne jamais inventer** de détails techniques, dates, résultats ou entreprises.

1. `active-directory` — AD DS dans une VM Windows Server (TP, terminé). Compétences proposées : C1, C5.
2. `serveur-web-apache` — Apache2 dans une VM Ubuntu Server (TP, terminé). Compétences proposées : C5, C3.
3. `vpn` — Mise en place d'un VPN (projet, en cours). Compétences à définir.
4. `portfolio` — Ce site : domaine, DNS Cloudflare, déploiement continu GitHub → Cloudflare, SEO, Search Console (projet, en cours). Compétences : C3, C4, C5, C6.

Aucune fiche de veille au départ : la page Veille affiche un état vide propre.
Placeholders visibles pour : CV (`public/cv.pdf`), photo (optionnelle), stage, projet professionnel.

## 7. Direction visuelle

Idée directrice : **un dossier d'exploitation bien tenu**. Le site ressemble à la documentation d'une infrastructure propre (schémas, tableaux lisibles, états clairs), pas à un site de développeur ni à une landing page.

Tokens :

| Rôle | Valeur |
|---|---|
| Fond | `#F6F7F9` |
| Surface (tableaux, schéma) | `#FFFFFF` |
| Texte / encre | `#1A2433` |
| Texte secondaire | `#566273` |
| Traits et bordures | `#D3D9E1` |
| Accent (liens, focus) | `#1F5FA8` |
| État "terminé" | `#2F7A55` |
| État "en cours" | `#A36A12` |

Mode sombre via `prefers-color-scheme` avec des équivalents sobres (fond `#131A24`, texte `#E4E8EE`, accent `#7FB0E8`).

Typographie : **IBM Plex Sans** pour tout le texte, **IBM Plex Mono** réservée au contenu réellement technique (commandes, adresses IP, noms de services, blocs de code). Échelle typographique modérée, lignes ≤ 75 caractères, texte aligné à gauche.

L'élément marquant (un seul) : sur l'accueil, un **schéma SVG du lab** dessiné à la main dans le code (hyperviseur → VM Windows Server AD, VM Ubuntu Apache, VPN "en cours"), sobre, avec des traits fins. Chaque nœud du schéma est un lien vers la fiche correspondante. Tout le reste reste calme.

À éviter : esthétique "hacker" (fond noir, vert terminal, effet Matrix), gradients, cartes identiques avec ombres, animations d'apparition, labels en majuscules espacées au-dessus des titres, numérotation décorative 01/02/03, flèches "→" dans les boutons, texte marketing.

Qualité minimale : responsive jusqu'à 360 px, focus clavier visible, contrastes WCAG AA, `prefers-reduced-motion` respecté, HTML sémantique (`header`, `nav`, `main`, `article`, `footer`), `lang="fr"`.

## 8. Rédaction

Français, ton sobre et factuel, première personne. Pas de superlatifs ("passionné", "expert"). Dire ce qui a été fait, avec quoi, et le résultat. Crédible pour un étudiant de 2e année.

## 9. SEO (partie code)

- `site: 'https://{{DOMAINE}}'` dans `astro.config.mjs`.
- Composant `<SEO>` dans le layout : `<title>` unique par page ("Titre — Prénom Nom"), meta description, URL canonique, Open Graph + Twitter Card, image OG par défaut (`public/og.png`, 1200×630).
- Favicon SVG + PNG (`public/`).
- `public/robots.txt` autorisant tout et pointant vers `/sitemap-index.xml`.
- JSON-LD `Person` sur l'accueil (nom, formation, URL, `sameAs` GitHub/LinkedIn).
- URLs en minuscules, sans accents, avec tirets.
- Objectif Lighthouse ≥ 95 sur les quatre axes.

## 10. Méthode de travail

- Petites étapes, un commit par étape, messages de commit en français clairs.
- Après chaque étape : `npm run build` doit passer.
- Demander avant d'ajouter une dépendance non listée ici.
- Ne rien publier de confidentiel : pas d'attestation de stage, pas de capture montrant des IP publiques, identifiants ou données d'entreprise.
