import {prop, getModelForClass, Ref, modelOptions} from '@typegoose/typegoose'
import {Tables} from '../tables/tables.models'
import {Product} from '../product/product.models'

@modelOptions({schemaOptions: {timestamps: true}})
export class Order {

    @prop({required: true})
    status: string

    @prop({required: true})
    close: boolean

    @prop({required: true, ref: () => Tables})
    id_table: Ref<Tables> //Relacion de uno a uno

    @prop({required: true, ref: () => Product})
    id_product: Ref<Product>[] //Relacion de uno a mucho

    _id: string

}

const orderModel = getModelForClass(Order)
export default orderModel