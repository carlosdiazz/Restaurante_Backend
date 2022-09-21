import {prop, getModelForClass} from '@typegoose/typegoose'

class Categorie {
    @prop({required: true})
    name: string

    @prop({required: true})
    description: string

    @prop({required: true})
    imgUrl: string
}

const CategorieModel = getModelForClass(Categorie)
export default CategorieModel