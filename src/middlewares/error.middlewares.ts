// Aqui pasaremos los middlewares que voy a usar para controlar los errorres
import { Request, Response, NextFunction } from 'express';
import {} from '@typegoose/typegoose'
import { MongooseError } from 'mongoose';

export const boomErrorHandler = (err, _req: Request, res: Response, next: NextFunction) => {

    if(err.isBoom){
        res.status(err.output.statusCode).json({
            data:{},
            message: err.output.payload.message,
            statusCode: err.output.statusCode,
            error: err.output.payload.error,

        })
    }else{
        next(err);
    }
}

//!Arregalr el envio de errores de Mongo
export const mongoErrorHandler = (err:MongooseError, _req: Request, res: Response, next: NextFunction) => {
    if(err.name==='MongoServerError' || err.name === 'ValidationError' || err.name === 'CastError'){
        res.status(409).json({
            data:err.name,
            message: err.message,
            statusCode: 409,
            error: true,

        })
    }else{
        next(err);
    }
}

export const jsonErrorHandler = (err, _req: Request, res: Response, next: NextFunction) => {
    if(err.message.startsWith('Unexpected token') || err.message.startsWith('Unexpected end of JSON input') || err.message.startsWith('invalid signature')){
        res.status(400).json({
            data:err.name,
            message: err.message,
            statusCode: 409,
            error: true,

        })
    }else{
        next(err);
    }
}

export const logErrors = (err,_req: Request,_res: Response,next: NextFunction) => {

    //console.log(err.message);
    next(err);
  }


export const errorHandler = (err, _req: Request, res: Response, _next: NextFunction) => {
    res.status(500).json({
            data: {},
            message: err.message,
            statusCode: 500,
            error: err.name
        })

  }