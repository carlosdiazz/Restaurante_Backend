import boom from '@hapi/boom'
import {Request, Response, NextFunction} from 'express'
import {sucessResponse} from '../../libs/succesResponse'
import InventoryModel from './inventory.models'

export const getAllInventory = async(req:Request, res: Response, next: NextFunction) => {
    try{

        const filter ={}

        const inventory = await InventoryModel.find(filter).populate('id_product', 'name img_url is_active ')

        if(!inventory){
            throw boom.notFound('No hay Inventario')
        }

        sucessResponse(req, res, inventory,'Lista de inventario encontrada', 200)
    }catch(error){
        next(error)
    }
}

export const deleteInvetory = async(req:Request, res: Response, next: NextFunction) => {
    try{

        const {id} = req.params
        const productDeleted = await InventoryModel.findById(id)
        if(!productDeleted){
            throw boom.notFound('Inventario no encontrado')
        }
        const productDeleted2 = await InventoryModel.findByIdAndDelete(id)
        if(!productDeleted2){
            throw boom.badRequest('Error al eliminar el Inventario')
        }
        sucessResponse(req, res, productDeleted,'Inventario eliminado', 200)
    }catch(error){
        next(error)
    }
}