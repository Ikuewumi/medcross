import { z, defineCollection, reference } from 'astro:content';

const author = defineCollection({
    type: 'data',
    schema: z.object({
        name: z.string(),
        image: z.string().url(),
    })
})

const category = defineCollection({
    type: 'data',
    schema: z.object({
        name: z.string(),
        description: z.string()
    })
})


const crossword = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        author: reference('author'),
        image: z.string().url(),
        description: z.string().optional(),
        category: reference('category'),
        date: z.date(),
        size: z.number(),
        words: z.array(z.object({
            word: z.string(),
            start: z.number().array().length(2),
            end: z.number().array().length(2),
            meaning: z.string()
        }))
    })
})


const series = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        author: reference('author'),
        description: z.string().optional(),
        category: reference('category'),
        date: z.date(),
        crosswords: z.array(reference('crossword'))
    })
})


const featured = defineCollection({
    type: "content",
    schema: z.object({
        featured: z.array(reference("crossword")).min(4)
    })
})


export const collections = {
    author, crossword, category, series, featured
}







