import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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

export const collections = { realisations, veille };
