import {prop, getModelForClass, Ref, modelOptions} from '@typegoose/typegoose'
import {Product} from '../product/product.models'

@modelOptions({schemaOptions: {timestamps: true}})
export class Inventory {

    @prop({required: true, ref: () => Product})
    id_product: Ref<Product>

    @prop({required: true})
    movimiento: number

    @prop({required: true})
    tipo_movimiento: string

    _id

}

const InventoryModel = getModelForClass(Inventory)
export default InventoryModel