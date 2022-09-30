import boom from '@hapi/boom'
import {Request, Response, NextFunction} from 'express'
import {sucessResponse} from '../../libs/succesResponse'
import orderModel from './order.model'
import {comprobarClaveProducto, comprobarClaveTable} from '../../libs/ValidarExistenciaClaveSecundaria'

export const getOneOrder = async(req:Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params
        const order = await orderModel.findById(id).populate('id_table', 'name number -_id').populate('id_product', 'name price -_id')
        if(!order){
            throw boom.notFound("Order no encontrada")
        }

        //!Veriifcar enviar tambien el objecto de categoria


        sucessResponse(req, res, order,'Order encontrada', 200)
    }catch(error){
        next(error)
    }
}

export const getAllOrder = async(req:Request, res: Response, next: NextFunction) => {
    try{

        let filter = {}

        if(req.query.id_table) {
            filter['id_table'] = req.query.id_table
        }
        if(req.query.close){
            if(req.query.close === 'true'){
                filter['close'] =  true
            }
            if(req.query.close === 'false'){
                filter['close'] =  false
            }
        }
        if(req.query.status){
            filter['status'] =  req.query.status
        }

        const orders = await orderModel.find(filter).populate('id_table', 'name number -_id').populate('id_product', 'name price -_id')
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
        await comprobarClaveProducto(id_product) //Aqui compruebo la llave secundaria de producto
        await comprobarClaveTable(id_table)
        const order = {
            id_table,
            id_product,
            status,
            close
        }

        const newOrder = new orderModel(order)
        const orderSaved =  await (await (await newOrder.save()).populate('id_product' )).populate('id_table')

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
        const {id} = req.params
        const {status, close} = req.body

        const order = await orderModel.findById(id)
        if(!order){
            throw boom.notFound("Esta orden no existe")
        }

        const orderUdpdate = await orderModel.findByIdAndUpdate(id, {
            status: status,
            close: close
        },{new: true}).populate('id_table', 'name number -_id').populate('id_product', 'name price -_id')

        if(!orderUdpdate){
            throw boom.badData("No se pudo actualizar la Orden")
        }

        sucessResponse(req, res, orderUdpdate,'Order Actualizada', 200)
    }catch(error){
        next(error)
    }
}

export const deleteOrder = async(req:Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params
        const order = await orderModel.findById(id).populate('id_table', 'name number -_id').populate('id_product', 'name price -_id')
        if(!order){
            throw boom.notFound("Esta orden no existe")
        }
        const orderDelete = await orderModel.findByIdAndRemove(id)
        console.log(orderDelete)
        if(!orderDelete){
            throw boom.badData("No se pudo elimianr la orden")
        }

        sucessResponse(req, res, order,'Order Eliminada', 200)
    }catch(error){
        next(error)
    }
}