import { defineCollection, z } from "astro:content";

const projects = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        period: z.string(),
        role: z.string(),
        achievements: z.string().optional(),
        features: z.string().optional(),
        github: z.string().optional(),
        demo: z.string().optional(),
        order: z.number(),
        featured: z.boolean().optional(),
        technologies: z.array(z.string()),
    }),
});

const blog = defineCollection({
    type: "content",
    // Blog schema can be defined here if needed, or left inferred for now
    // schema: z.object({ ... })
});

export const collections = { projects, blog };
