import { tipo_Movimiento_inventory_ENUM} from '../../libs/Enums'
import { z } from 'zod'
import boom from '@hapi/boom'

const date = z.preprocess((arg) => {try{
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    else throw boom.badData("No es una fecha valida")
}catch(error){
    throw boom.badData("No es una fecha valida")
}}, z.date());//!Falta esto


const id            = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);
const id_product    = z.string({required_error: "Este no es un ID valido"}).regex(/^[0-9a-fA-F]{24}$/);
const stock        = z.number();

const type_movimiento   = z.nativeEnum(tipo_Movimiento_inventory_ENUM)

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
        tipo_movimiento: type_movimiento.optional(),
        date_inicial :  date.optional(),
        date_final: date.optional(),
    })
})

export const deleteInventorySchema = z.object({
    params: z.object({
        id: id
    })
})