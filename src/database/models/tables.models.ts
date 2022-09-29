import {prop, getModelForClass} from '@typegoose/typegoose'

export class Tables {
    @prop({required: true})
    name: string

    @prop({required: true, unique: true})
    number: number

    @prop({required: true})
    imgUrl: string
}

const TablesModel = getModelForClass(Tables)
export default TablesModel