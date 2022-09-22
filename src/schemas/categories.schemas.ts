import {z} from 'zod'

const name = z.string().min(1).max(50)
const description = z.string().min(1).max(50)
const id = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);
const imgUrl = z.string().url()

export const createCategoriesSchema = z.object({
    body: z.object({
        name: name,
        description: description.optional(),
        imgUrl: imgUrl.optional()
    })
})

export const updateCategorieschema = z.object({
    body: z.object({
        name: name.optional(),
        description: description.optional(),
        imgUrl: imgUrl.optional()
    }),
})

export const deleteCategoriesSchema = z.object({
    params: z.object({
        id: id
    })
})

export const getCategoriesSchema = z.object({
    params: z.object({
        id: id
    })
})