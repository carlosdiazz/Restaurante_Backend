// Aqui pasaremos los middlewares que voy a usar para controlar los errorres
import { Request, Response, NextFunction } from 'express';

export const logErrors = (err,_req: Request,_res: Response,next: NextFunction) => {
    //console.log(err);
    next(err);
  }

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

export const errorHandler = (err, _req: Request, res: Response, _next: NextFunction) => {
    //!Tengo que validar los errores de mongose
    res.status(500).json({
            data: {},
            message: err.message,
            statusCode: 500,
            error: err.stack
        })

  }