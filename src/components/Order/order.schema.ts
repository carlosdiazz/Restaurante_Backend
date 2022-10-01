import {z} from 'zod'
import {Status_Order} from '../../libs/Enums'

const id            = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);
const id_table      = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);
//const id_product    = z.array(id).min(1)
const id_product    = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);
const status        = z.nativeEnum(Status_Order) //PENDING or DELIVERED //Falta esto
const close         = z.boolean()

export const createOrderSchema = z.object({
    body: z.object({
        id_table: id_table,
        id_product: id_product,
        status: status,
        close: close
    })
})

export const updateOrderSchema = z.object({
    body:z.object({
        status: status.optional(),
        close: close.optional()
    })
})

export const deleteOrderSchema = z.object({
    params: z.object({
        id: id
    })
})

export const getOrderSchema = z.object({
    params: z.object({
        id: id
    })
})

export const getAllSchema = z.object({
    query: z.object({
        id_table: id_table.optional(),
        status: status.optional(),
        //close: close.optional()
    })
})

// aqui hago un type para que me deje usar el metodo .map() de zod
export type createOrderType = z.infer<typeof createOrderSchema>['body']