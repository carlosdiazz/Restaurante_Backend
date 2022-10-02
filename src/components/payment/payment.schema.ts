import {z} from 'zod'
import {Pay_Payment_ENUM, Status_Payment_ENUM} from '../../libs/Enums'

const id                = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);
const total_Payment     = z.number().min(1)
const payment_Type      = z.nativeEnum(Pay_Payment_ENUM)
const status_Payment    = z.nativeEnum(Status_Payment_ENUM)


export const createPayment = z.object({
    body: z.object({
        total_Payment:total_Payment,
        payment_Type: payment_Type,
        status_Payment: status_Payment,
        id_table : id,
    }
)})

export const updatePayment = z.object({
    body: z.object({
        id_table : id.optional(),
        total_Payment:total_Payment.optional(),
        payment_Type: payment_Type.optional(),
        status_Payment: status_Payment.optional()
    })
})

export const deletePayment = z.object({
    params: z.object({
        id: id
    })
})

export const getOnePayment = z.object({
    params: z.object({
        id: id
    })
})

export const getAllPayment = z.object({
    query: z.object({
        id_table: id.optional(),
        status_Payment: status_Payment.optional(),
    })
})



// aqui hago un type para que me deje usar el metodo .map() de zod
export type createPaymentType = z.infer<typeof createPayment>['body']