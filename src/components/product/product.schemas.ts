import {z} from 'zod'
import {is_active_products_ENUM} from '../../libs/Enums'

const name = z.string().min(1).max(50)
const description = z.string().min(1).max(50)
const price = z.number().min(1)
const stock = z.number()
const id = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);
const id_category = z.string({required_error: "Esta no es una categoria valida"}).regex(/^[0-9a-fA-F]{24}$/);
const img_url = z.string().url()
const is_active = z.boolean()
const is_active_query = z.nativeEnum(is_active_products_ENUM)

export const createProductSchema = z.object({
    body: z.object({
        name: name,
        description: description,
        price: price,
        img_url: img_url,
        stock: stock,
        is_active: is_active,
        id_category: id_category,
    })
})

export const updateProductSchema = z.object({
    body: z.object({
        name: name.optional(),
        description: description.optional(),
        price: price.optional(),
        stock: stock.optional(),
        img_url: img_url.optional(),
        is_active: is_active.optional(),
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

export const getAllProductSchema = z.object({
    query: z.object({
        is_active: is_active_query.optional(),
        id_category: id_category.optional()
    })
})