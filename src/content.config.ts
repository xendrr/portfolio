import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const competence = z.enum(['C1', 'C2', 'C3', 'C4', 'C5', 'C6']);

const realisations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/realisations' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    periode: z.string(),
    type: z.enum(['tp', 'projet', 'stage', 'perso']),
    statut: z.enum(['termine', 'en-cours']),
    competences: z.array(competence),
    technologies: z.array(z.string()),
    resume: z.string(),
    draft: z.boolean().default(false),
  }),
});

const veille = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/veille' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    theme: z.string(),
    source: z.string().url(),
    sourceDate: z.date(),
    competences: z.array(competence),
    draft: z.boolean().default(false),
  }),
});

const galerie = defineCollection({
  loader: file('src/content/galerie.yaml'),
  schema: ({ image }) =>
    z.object({
      image: image(),
      alt: z.string(),
      legende: z.string().optional(),
      date: z.date(),
      categorie: z.enum(['stage', 'lab', 'materiel']),
      realisation: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

const stage = defineCollection({
  loader: glob({ pattern: 'stage.md', base: './src/content' }),
  schema: z.object({
    entreprise: z.string(),
    ville: z.string(),
    periode: z.string(),
    tuteur: z.string(),
    service: z.string(),
  }),
});

const competences = defineCollection({
  loader: file('src/data/competences.yaml'),
  // Deux formes : une catégorie technique a un niveau chiffré et des details,
  // une langue a un niveau en toutes lettres (« Natif », « C1–C2 »).
  schema: z.discriminatedUnion('groupe', [
    z.object({
      groupe: z.literal('competence'),
      categorie: z.string(),
      niveau: z.number().int().min(0).max(100),
      details: z.array(z.string()).default([]),
    }),
    z.object({
      groupe: z.literal('langue'),
      categorie: z.string(),
      niveau: z.string(),
    }),
  ]),
});

export const collections = { realisations, veille, galerie, competences, stage };
