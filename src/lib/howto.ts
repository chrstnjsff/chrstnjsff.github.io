import { getCollection, type CollectionEntry } from "astro:content";

export interface Step {
  entry: CollectionEntry<"steps">;
  order: number;
  /** Deep-link id, taken from the file name after the NN- prefix. */
  anchor: string;
}

export interface Guide {
  entry: CollectionEntry<"guides">;
  slug: string;
  steps: Step[];
}

/** All guides in display order, each with its steps in order. */
export async function getGuides(): Promise<Guide[]> {
  const [guides, steps] = await Promise.all([getCollection("guides"), getCollection("steps")]);
  const bySlug = new Map<string, Step[]>(guides.map((g) => [g.id, []]));

  for (const entry of steps) {
    const [slug, file] = entry.id.split("/");
    const list = bySlug.get(slug);
    if (!list) throw new Error(`Step "${entry.id}" has no guide: add src/content/howto/${slug}/index.md`);
    list.push({ entry, order: Number(file.slice(0, 2)), anchor: file.slice(3) });
  }

  return guides
    .toSorted((a, b) => a.data.order - b.data.order)
    .map((entry) => {
      const list = bySlug.get(entry.id)!.toSorted((a, b) => a.order - b.order);
      const anchors = new Set<string>();
      for (const step of list) {
        if (anchors.has(step.anchor)) throw new Error(`Duplicate step anchor "${step.anchor}" in guide "${entry.id}"`);
        anchors.add(step.anchor);
      }
      return { entry, slug: entry.id, steps: list };
    });
}

export const guideHref = (slug: string) => `/how-to/${slug}/`;
