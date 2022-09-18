
// Aqui pasaremos los middlewares que voy a usar para controlar los errorres

export const logErrors = (err,_req,_res,next) => {
    //console.log(err);
    next(err);
  }

export const boomErrorHandler = (err, _req, res, next) => {

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

export const errorHandler = (err, _req, res, _next) => {

    res.status(500).json({
            data: {},
            message: err.message,
            statusCode: 500,
            error: err.stack
        })

  }

