import { z, defineCollection, reference } from 'astro:content';


const author = defineCollection({
    type: 'data',
    schema: z.object({
        name: z.string(),
        image: z.string().url(),
    })
})



const crossword = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        author: reference('author'),
        image: z.string().url(),
        description: z.string().optional(),
        categories: z.array(z.string()),
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


export const collections = {
    author, crossword
}







