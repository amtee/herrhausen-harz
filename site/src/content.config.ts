import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    path: z.string().startsWith('/'),
    summary: z.string(),
    navLabel: z.string().optional(),
    order: z.number().default(99),
    showInNav: z.boolean().default(false),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    draft: z.boolean().default(false),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    location: z.string().optional(),
    summary: z.string(),
    draft: z.boolean().default(false),
  }),
});

const documents = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/documents' }),
  schema: z.object({
    title: z.string(),
    file: z.string(),
    category: z.enum(['ortsrat', 'satzung', 'sonstiges']),
    date: z.coerce.date().optional(),
    available: z.boolean().default(true),
  }),
});

const organisations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/organisations' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['verein', 'einrichtung', 'gruppe']),
    summary: z.string(),
    contact: z.string().optional(),
    website: z.string().optional(),
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

export const collections = { pages, news, events, documents, organisations };