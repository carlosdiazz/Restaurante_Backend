import {prop, getModelForClass, Ref} from '@typegoose/typegoose'
import {Categorie} from '../category/categorie.models'

export class Product {
    @prop({required: true})
    name: string

    @prop({required: true})
    description: string

    @prop({required: true})
    price: number

    @prop({required: true})
    img_url: string

    @prop({required: true})
    stock: number

    @prop({required: true})
    is_active: boolean

    @prop({required: true, ref: () => Categorie})
    id_category: Ref<Categorie>

    _id

}

const ProductModel = getModelForClass(Product)
export default ProductModel