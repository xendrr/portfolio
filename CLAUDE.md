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
- **Content Collections** avec schéma Zod dans `src/content.config.ts` pour `realisations`, `veille`, `galerie` et `competences`.
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
/competences            Niveaux par domaine et langues (src/data/competences.yaml),
                        puis tableau de couverture C1–C6 replié derrière un bouton
/realisations           Liste des réalisations (filtrable par type : TP, projet, stage, perso)
/realisations/[slug]    Fiche détaillée
/projets                Réalisations de type "projet" uniquement
/veille                 Liste des fiches de veille
/veille/[slug]          Fiche de veille
/stage                  Contexte, entreprise, missions, bilan (contenu "À compléter" au départ)
/documentation          Procédures et ressources produites (liens vers les fiches ou fichiers)
/projet-professionnel   Objectif après le BTS + plan de progression
/cv                     Titre + bouton de téléchargement de /cv.pdf, rien d'autre
/contact                Adresse e-mail (mailto), GitHub, LinkedIn. Pas de formulaire.
/mentions-legales       Éditeur (nom, contact) + hébergeur (Cloudflare, Inc.)
/404                    Page d'erreur utile (liens vers accueil et réalisations)
```

Navigation principale : Réalisations, Compétences, Veille, Stage, Profil. Le reste (Projets, Documentation, Projet professionnel, CV, Contact, Mentions légales) dans le pied de page et via des liens contextuels.

Le pied de page ne contient que des liens internes, dont **Contact**. L'adresse e-mail, LinkedIn et GitHub ne sont affichés **que** sur `/contact` : ne pas les dupliquer dans le pied de page ni sur `/cv`. Le JSON-LD `Person` de l'accueil garde `sameAs` (LinkedIn, GitHub) : c'est une donnée invisible destinée aux moteurs, elle n'est pas concernée.

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

### Compétences et langues — `src/data/competences.yaml`

Un seul fichier, modifiable sans toucher au code, chargé par la collection `competences` (loader `file()`) :

```yaml
01-administration-systeme-windows:
  groupe: competence          # competence | langue
  categorie: "Administration système Windows"
  niveau: 50                  # 0 à 100, affiché en barre et en chiffres
  details:                    # compétences précises, visibles au dépliage
    - "Active Directory : utilisateurs, groupes, unités d'organisation"
  realisations: [active-directory]   # slugs des fiches qui le prouvent

01-francais:
  groupe: langue
  categorie: "Français"
  niveau: 50
  cecrl: C2                   # A1 à C2, facultatif, langues uniquement
```

Le **numéro en tête de clé fixe l'ordre d'affichage** (les entrées sont triées par clé) : renuméroter pour réordonner. Les `details` pré-remplis portent un commentaire `# à vérifier` tant qu'ils n'ont pas été validés ; les `niveau` valent 50 par défaut, c'est une valeur provisoire à remplacer.

### Page `/competences`

Elle s'ouvre sur **« Ce que je maîtrise »** : une ligne par catégorie avec le nom, une jauge et le pourcentage en chiffres. La ligne se déplie en `<details>`/`<summary>` natif (clavier, sans JavaScript) sur la liste `details` puis « Prouvé par : » avec des liens vers les fiches. La jauge est décorative (`aria-hidden`) : c'est le pourcentage écrit qui est lu par les lecteurs d'écran. Une section **Langues** suit, sans dépliage.

Le **tableau de couverture C1–C6** vient ensuite, replié derrière un bouton. Il lit toutes les réalisations non-draft et construit le tableau réalisations × C1–C6 ; chaque ligne renvoie vers la fiche et une ligne de synthèse indique les compétences non couvertes. C'est un `<summary>` natif : son état déplié/replié est déjà exposé aux lecteurs d'écran, ne pas y ajouter d'`aria-expanded` géré à la main.

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

Tokens (mode clair) :

| Rôle | Valeur |
|---|---|
| Fond | `#F4F5F3` |
| Surface (tableaux, schéma) | `#FFFFFF` |
| Texte / encre | `#1C2327` |
| Texte secondaire | `#56626A` |
| Traits et bordures | `#D4D9D6` |
| Accent (liens, focus) | `#16706C` |
| État "terminé" | `#2F7A55` |
| État "en cours" | `#8F5C0F` |

Mode sombre (fond `#151B1F`, surface `#1C2429`, texte `#E3E8E6`, texte secondaire `#9AA7A6`, traits `#2E3A40`, accent `#5BBFB8`, état "terminé" `#4FAE7C`, état "en cours" `#D08A2E`). Le site suit `prefers-color-scheme` par défaut ; un bouton dans le header permet de forcer un thème, mémorisé côté client (`data-theme` sur `<html>` + `localStorage`).

Typographie : **Red Hat Display** pour les titres (`h1`–`h4`), **Red Hat Text** pour le reste du texte, **Red Hat Mono** réservée au contenu réellement technique (commandes, adresses IP, noms de services, blocs de code). Échelle typographique modérée, lignes ≤ 75 caractères, texte aligné à gauche.

L'élément marquant (un seul) : sur l'accueil, un **schéma SVG du lab** dessiné à la main dans le code (hyperviseur → VM Windows Server AD, VM Ubuntu Apache, VPN "en cours"), sobre, avec des traits fins. Chaque nœud du schéma est un lien vers la fiche correspondante. Tout le reste reste calme.

Détail de caractère (un seul, en plus du schéma) : l'état d'une réalisation (terminé / en cours) s'affiche avec un petit voyant rond plein (façon LED de port réseau) à côté du texte, sans animation.

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
