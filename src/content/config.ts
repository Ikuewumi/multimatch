// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define a `type` and `schema` for each collection
const gameDataCollection = defineCollection({
	type: 'data',
	schema: z.object({
		title: z.string(),
		date: z.string(),
		author: z.string(),
		description: z.string(),
		data: z.record(z.array(z.string())),
		published: z.boolean().default(true).optional()
	})
});
// 3. Export a single `collections` object to register your collection(s)
export const collections = {
	'game': gameDataCollection,
};
