import {sucessResponse} from '../../libs/succesResponse'
import orderModel from './order.model'
import boom from '@hapi/boom'
import {Request, Response, NextFunction} from 'express'


export const getOneOrder = async(req:Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params
        const order = await orderModel.findById(id)
        if(!order){
            throw boom.notFound("Order no encontrada")
        }

        sucessResponse(req, res, order,'Order encontrada', 200)
    }catch(error){
        next(error)
    }
}

export const getAllOrder = async(req:Request, res: Response, next: NextFunction) => {
    try{

        const orders = await orderModel.find()
        if(!orders){
            throw boom.notFound("Ordenes no encontrada")
        }

        sucessResponse(req, res, orders,'Lista de Order encontrada', 200)
    }catch(error){
        next(error)
    }
}

export const createOrder = async(req:Request, res: Response, next: NextFunction) => {
    try{

        const {id_table, id_product, status, close} = req.body

        const order = {
            id_table,
            id_product,
            status,
            close
        }

        const newOrder = new orderModel(order)
        const orderSaved = await newOrder.save()

        if(!orderSaved){
            throw boom.badData("Error al crear la orden")
        }

        sucessResponse(req, res, orderSaved,'Order Creada', 200)
    }catch(error){
        next(error)
    }
}
//!Qude Aquio

export const updateOrder = async(req:Request, res: Response, next: NextFunction) => {
    try{
        sucessResponse(req, res, {},'Order Actualizada', 200)
    }catch(error){
        next(error)
    }
}

export const deleteOrder = async(req:Request, res: Response, next: NextFunction) => {
    try{
        sucessResponse(req, res, {},'Order Eliminada', 200)
    }catch(error){
        next(error)
    }
}