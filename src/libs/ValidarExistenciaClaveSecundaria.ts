import CategorieModel from '../database/models/categorie.models'
import boom from '@hapi/boom'

export const comprobarCategory = async(id:string) => {

    const comprobar = await CategorieModel.findById(id)
    if(!comprobar){
        throw boom.badRequest('Este id no tiene una categoria asignada')
    }
}