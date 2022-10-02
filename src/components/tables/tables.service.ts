import {sucessResponse} from '../../libs/succesResponse'
import TablesModel from './tables.models'
import boom from '@hapi/boom'
import {Request,Response, NextFunction} from 'express'
import orderModel from '../Order/order.model'

export const getOneTable = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {id} = req.params
        const tableSaved = await TablesModel.findById(id)

        if(!tableSaved){
            throw boom.notFound('No se encontro la Mesa')
        }

        sucessResponse(req, res, tableSaved,'Mesa encontrada', 200)
    }catch(error){
        next(error)
    }
}

export const getAllTable = async(req: Request, res: Response, next: NextFunction)=>{
    try{

        const tables = await TablesModel.find()
        if(!tables){
            throw boom.notFound('Error al Buscar la lista de  Mesa')
        }
        sucessResponse(req, res, tables,'Lista de mesas encontradas', 200)
    }catch(error){
        next(error)
    }
}

export const createTable = async(req: Request, res: Response, next: NextFunction)=>{
    try{

        const {name, number, imgUrl} = req.body

        const newTable = new TablesModel({
            name : name,
            number : number,
            imgUrl : imgUrl
        })

        const tableSaved = await newTable.save()

        if(!tableSaved){
            throw boom.badRequest('Error al crear la Mesa')
        }

        sucessResponse(req, res, tableSaved, 'Mesa creada',201)
    }catch(error){
        next(error)
    }
}

export const deletetable = async(req: Request, res: Response, next: NextFunction)=>{
    try{

        const {id} = req.params
        const table = await TablesModel.findById(id)
        if(!table){
            throw boom.notFound('Esta mesa no existe')
        }

        const comprobarUso = await orderModel.find({id_table:id})
        if(comprobarUso.length >=1){
            throw boom.badRequest('Error al eliminar la Table tienes pedidos pendientes')
        }


        const tableDelete = await TablesModel.findByIdAndDelete(id)
        if(!tableDelete){
            throw boom.badRequest('Error al borrar esta mesa')
        }

        sucessResponse(req, res, table,'Mesa eliminada', 200)
    }catch(error){
        next(error)
    }
}

export const updateTable = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {id} = req.params
        const {name, number, imgUrl} = req.body
        const table = await TablesModel.findById(id)
        if(!table){
            throw boom.notFound('Esta mesa no existe')
        }
        const tableUpdate = await TablesModel.findByIdAndUpdate(id, {
            name: name,
            number: number,
            imgUrl: imgUrl
        },{new: true})
        if(!tableUpdate){
            throw boom.badData('No se pudo actualizar la mesa')
        }

        sucessResponse(req, res, tableUpdate,'Mesa actualizado', 200)
    }catch(error){
        next(error)
    }
}
