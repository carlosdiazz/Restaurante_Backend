import boom from '@hapi/boom'
import {Request, Response, NextFunction} from 'express'
import {sucessResponse} from '../../libs/succesResponse'
import paymentModel from './payment.model'
//import TablesModel from '../tables/tables.models'

export const getOnePayment = async(req:Request, res: Response, next: NextFunction) => {
    try{

        const {id} = req.params
        const payment = await paymentModel.findById(id).populate("id_table")
        if(!payment){
            throw boom.notFound("Payment no encontrada")
        }

        sucessResponse(req, res, payment,'Payment encontrada', 200)
    }catch(error){
        next(error)
    }
}

export const getAllPayment = async(req:Request, res: Response, next: NextFunction) => {
    try{

        const payments = await paymentModel.find().populate("id_table")
        if(!payments){
            throw boom.notFound("Payment no encontrada")
        }
        sucessResponse(req, res, payments,'Lista de Payment encontrada', 200)
    }catch(error){
        next(error)
    }
}

export const createPayment = async(req:Request, res: Response, next: NextFunction) => {
    try{

        const {total_Payment, payment_Type, status_Payment, id_table} = req.body

        const newPayment = new paymentModel({
            total_Payment: total_Payment,
            payment_Type: payment_Type,
            status_Payment: status_Payment,
            id_table: id_table
        })

        const paymentSaved = await(await newPayment.save()).populate("id_table")
        if(!paymentSaved){
            throw boom.notFound("Error al crear el pago")
        }

        sucessResponse(req, res, paymentSaved,'Payment Creada', 201)
    }catch(error){
        next(error)
    }
}


export const updatePayment = async(req:Request, res: Response, next: NextFunction) => {
    try{

        const {id} = req.params
        const {total_Payment, payment_Type, status_Payment, id_table} = req.body
        const payment = await paymentModel.findById(id)
        if(!payment){
            throw boom.notFound("Payment no encontrada")
        }

        const paymentUpdate = await paymentModel.findByIdAndUpdate(id,{
            total_Payment: total_Payment,
            payment_Type: payment_Type,
            status_Payment: status_Payment,
            id_table: id_table
        },{new: true}).populate("id_table")

        if(!paymentUpdate){
            throw boom.notFound("Error no se pudo actualizar el pago")
        }

        sucessResponse(req, res, paymentUpdate,'Payment Actualizada', 200)
    }catch(error){
        next(error)
    }
}

export const deletePayment = async(req:Request, res: Response, next: NextFunction) => {
    try{

        const {id} = req.params
        const payment = await paymentModel.findById(id)
        if(!payment){
            throw boom.notFound("Payment no encontrada")
        }

        const paymentDelete = await paymentModel.findByIdAndRemove(id)
        if(!paymentDelete){
            throw boom.notFound("Error no se pudo eliminar el pago")
        }

        sucessResponse(req, res, payment,'Payment Eliminada', 200)
    }catch(error){
        next(error)
    }
}