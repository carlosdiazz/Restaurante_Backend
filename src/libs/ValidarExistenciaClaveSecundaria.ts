import boom from '@hapi/boom'
import CategorieModel from '../components/category/categorie.models'
import roleModel from '../database/models/role.models'
import ProductModel from '../components/product/product.models'
import TablesModel from '../components/tables/tables.models'

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
}

export const comprobarClaveProductoIndividual = async (id: string) => {
    const comprobar = await ProductModel.findById(id)
    if(!comprobar){
        throw boom.badData("Este Id no esta asociado a un producto")
    }
}

export const comprobarClaveProducto = async(arr:Array<string>) =>{
    const arrProduct = await ProductModel.find()
    if(!arrProduct){
        throw boom.badData("No hay productos creados")
    }
    for (let i = 0; i < arr.length; i++){
        await comprobarClaveProductoIndividual(arr[i])
    }

}



export const comprobarClaveTable = async(id: string) => {
    const comprobar = await TablesModel.findById(id)
    if(!comprobar){
        throw boom.badData("Este Id no esta asociado a una mesa")
    }
}

export const buscarCategory = async (id: string) => {
    const comprobar = await CategorieModel.findById(id)
    if(!comprobar){
        throw boom.badData("Error buscando al categoria")
    }
    return comprobar
}