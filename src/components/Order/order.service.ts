import boom from '@hapi/boom'
import {Request, Response, NextFunction} from 'express'
import {sucessResponse} from '../../libs/succesResponse'
import orderModel from './order.model'
import {comprobarClaveProductoIndividual, comprobarClaveTable, comprobarPayment} from '../../libs/ValidarExistenciaClaveSecundaria'
import {Status_Order_ENUM} from '../../libs/Enums'

export const getOneOrder = async(req:Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params
        const order = await orderModel.findById(id).populate('id_table').populate('id_product').populate('id_payment')

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
        let filter_sort = {}

        if(req.query.id_payment){
            filter['id_payment'] = req.query.id_payment
        }

        //Filtro para la query
        if(req.query.id_table) {
            filter['id_table'] = req.query.id_table
        }
        if(req.query.close){
            if(req.query.close === 'true' || req.query.close === 'True'){
                filter['close'] =  true
            }
            if(req.query.close === 'false' || req.query.close === 'False'){
                filter['close'] =  false
            }
        }
        if(req.query.status){
            filter['status'] =  req.query.status
        }

        //!Filtro para el orden
        if(req.query.orderStatus==="desc"){
            filter_sort['status'] = 1
        }

        if(req.query.orderStatus==="asc"){
            filter_sort['status'] = -1
        }

        if(req.query.orderDate==="desc"){
            filter_sort['createdAt'] = 1
        }

        if(req.query.orderDate==="asc"){
            filter_sort['createdAt'] = -1
        }

        const orders = await orderModel.find(filter).populate('id_table').populate('id_product').populate('id_payment').sort(filter_sort)

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

        const {id_table, id_product, status, close, id_payment} = req.body
        if(id_payment){
            await comprobarPayment(id_payment)
        }
        await comprobarClaveProductoIndividual(id_product) //Aqui compruebo la llave secundaria de producto
        await comprobarClaveTable(id_table)
        const order = {
            id_table,
            id_product,
            status,
            close,
            id_payment : id_payment || null
        }

        const newOrder = new orderModel(order)
        const orderSaved =  await (await (await (await newOrder.save()).populate('id_product' )).populate('id_table')).populate('id_payment')

        if(!orderSaved){
            throw boom.badData("Error al crear la orden")
        }

        sucessResponse(req, res, orderSaved,'Order Creada', 201)
    }catch(error){
        next(error)
    }
}


export const updateOrder = async(req:Request, res: Response, next: NextFunction) => {
    try{
        const {id} = req.params
        const {status, close,id_payment} = req.body
        console.log(id_payment)
        if(id_payment){
            await comprobarPayment(id_payment)
        }

        const order = await orderModel.findById(id)
        if(!order){
            throw boom.notFound("Esta orden no existe")
        }

        const orderUdpdate = await orderModel.findByIdAndUpdate(id, {
            status: status,
            close: close,
            id_payment: id_payment
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

        if(order.status === Status_Order_ENUM.DELIVERED){
            throw boom.notFound("No se puede eliminar, esta orden ya fue despachada")
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