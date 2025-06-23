import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const products = defineCollection({
    loader: file("src/content/productos.json"),
    schema: z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        price: z.number(),
        image: z.string().optional(),
        rating: z.object({rate: z.number(), count: z.number()}).optional(),
        category: z.string(),
    }),
});

export const collections = {
    products,
}