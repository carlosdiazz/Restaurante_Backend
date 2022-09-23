import CategorieModel from '../database/models/categorie.models'
import roleModel from '../database/models/role.models'
import boom from '@hapi/boom'

export const comprobarCategory = async(id:string) => {
    const comprobar = await CategorieModel.findById(id)
    if(!comprobar){
        throw boom.badRequest('Este id no tiene una categoria asignada')
    }
}

export const comprobarRolIndividual = async(id:string) => {
    const comprobar = await roleModel.findById(id)
    if(!comprobar){
        throw boom.badRequest('Este rol no existe')
    }
}

export const comprobarRol = async (arr:Array<string>) => {

    const arrRole = await roleModel.find()
    if(!arrRole){
        throw boom.badRequest('No hay roles creados')
    }

    for (let i = 0; i < arr.length; i++){
        await comprobarRolIndividual(arr[i])
    }
    console.log(arr)
}