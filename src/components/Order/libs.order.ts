import CategorieModel from '../category/categorie.models'
import boom from '@hapi/boom'

export const saber_objecto_category = async (id:string) => {
    const category = await CategorieModel.findById(id)
    if(!category) {
        throw boom.notFound("Esta Id no se encunetra asociado a una categoria")
    }
    return category
}
