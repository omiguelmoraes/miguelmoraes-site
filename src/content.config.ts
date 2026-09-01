import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      category: z.string(),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

const links = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/links' }),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    category: z.enum(['tool', 'reference', 'content', 'article', 'course']),
    tags: z.array(z.string()).default([]),
    description: z.string().default(''),
    thumb: z.string().optional(),
    added: z.coerce.date().optional(),
    origin: z.string().optional(),
  }),
});

export const collections = { blog, links };
