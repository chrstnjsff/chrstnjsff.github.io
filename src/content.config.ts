import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const source = z.object({ label: z.string(), url: z.url() });

// One folder per guide under src/content/howto/<guide>/:
//   index.md       guide metadata and intro prose
//   NN-<anchor>.md one collapsible step; NN orders it, <anchor> is its
//                  deep-link id (/how-to/<guide>/#<anchor>), so keep it stable.
const HOWTO = "./src/content/howto";

const guides = defineCollection({
  loader: glob({
    pattern: "*/index.md",
    base: HOWTO,
    generateId: ({ entry }) => entry.split("/")[0],
  }),
  schema: z.object({
    title: z.string(),
    /** One sentence for cards and the meta description. */
    summary: z.string(),
    order: z.number().int(),
    platform: z.string(),
    duration: z.string(),
    verifiedOn: z.coerce.date(),
    verifiedWith: z.array(z.string()),
    prerequisites: z.array(z.string()).default([]),
    sources: z.array(source).default([]),
  }),
});

const steps = defineCollection({
  loader: glob({
    pattern: "*/[0-9][0-9]-*.md",
    base: HOWTO,
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    /** Short sidebar label when the title is long. */
    nav: z.string().optional(),
    summary: z.string(),
    optional: z.boolean().default(false),
    sources: z.array(source).default([]),
  }),
});

export const collections = { guides, steps };
