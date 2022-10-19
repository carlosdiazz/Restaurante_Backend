import {z} from 'zod'

const id            = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);
const id_product    = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);
const stock        = z.number();

export const createInventorySchema = z.object({
    body: z.object({
        id_product: id_product,
        stock: stock
    })
})


export const getInventorySchema = z.object({
    params: z.object({
        id_product: id_product
    })
})

export const getAllInventorySchema = z.object({
    query: z.object({
        id_product: id_product.optional(),
    })
})

export const deleteInventorySchema = z.object({
    params: z.object({
        id: id
    })
})