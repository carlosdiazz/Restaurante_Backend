import {prop, getModelForClass, Ref, modelOptions} from '@typegoose/typegoose'
import {Tables} from '../tables/tables.models'

@modelOptions({schemaOptions: {timestamps: true}})
export class Payment {

    @prop({required: true})
    total_Payment: number

    @prop({required: true})
    payment_Type: string

    @prop({required: true})
    status_Payment: string

    @prop({required: true, ref: () => Tables})
    id_table: Ref<Tables> //si coloco esto al final hago => Relacion de uno a mucho

    _id: string

}

const paymentModel = getModelForClass(Payment)
export default paymentModel
