import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro:schema';

// repo 루트의 content/ax-guide/*.md 를 글 컬렉션으로 로드.
// README.md(홈 문서) · backlog.md(메타)는 글이 아니므로 제외.
const guide = defineCollection({
  loader: glob({ pattern: ['*.md', '!README.md', '!backlog.md'], base: './content/ax-guide' }),
  schema: z.object({
    title: z.string(),
    category: z.string().default('개념'),
    categoryEn: z.string().default('Concept'),
    stage: z.string().default('탐색 중'),
    updated: z.string().optional(),
    lead: z.string().optional(),
    related: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    slides: z
      .array(
        z.object({
          kick: z.string().optional(),
          title: z.string(),
          body: z.string().optional(),
          bullets: z.array(z.string()).optional(),
          cover: z.boolean().optional().default(false),
        }),
      )
      .default([]),
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

export const collections = { guide };
