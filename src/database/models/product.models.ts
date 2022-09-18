import {prop, getModelForClass} from '@typegoose/typegoose'

class Product {
    @prop({required: true})
    name: string

    @prop({required: true})
    description: string

    @prop({required: true})
    price: number

    @prop()
    image: string
}

const ProductModel = getModelForClass(Product)
export default ProductModel