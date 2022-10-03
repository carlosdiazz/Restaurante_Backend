import {z} from 'zod'

const id = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);
const name = z.string().min(1).max(50);
const number = z.number().min(1).max(1000000)
const imgUrl = z.string().url()
const numberQuery = z.string()

export const createTablesSchema = z.object({
    body: z.object({
        name: name,
        number: number,
        imgUrl: imgUrl.optional()
    })
})

export const updateTableschema = z.object({
    body: z.object({
        name: name.optional(),
        number: number.optional(),
        imgUrl: imgUrl.optional()
    }),
})

export const deleteTablesSchema = z.object({
    params: z.object({
        id: id
    })
})

export const getTablesSchema = z.object({
    params: z.object({
        id: id
    })
})

//!Arregalr aqui validar antes de pasar si es un numero oh no
export const getAllTablesShema = z.object({
    query: z.object({
        number: numberQuery.optional()
    })
})

