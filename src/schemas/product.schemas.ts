import {z} from 'zod'

const name = z.string().min(1).max(50)
const description = z.string().min(1).max(50)
const price = z.number().min(1)
const stock = z.number().min(1)
const id = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);
const imgUrl = z.string().url()

export const createProductSchema = z.object({
    body: z.object({
        name: name,
        description: description,
        price: price,
        stock: stock.optional(),
        imgUrl: imgUrl
    })
})

export const updateProductSchema = z.object({
    body: z.object({
        name: name.optional(),
        description: description.optional(),
        price: price.optional(),
        stock: stock.optional(),
        imgUrl: imgUrl.optional()
    }),
})

export const deleteProductSchema = z.object({
    params: z.object({
        id: id
    })
})

export const getProductSchema = z.object({
    params: z.object({
        id: id
    })
})