import {Router} from 'express'
import userRouters from './user.routes'
import productRouters from './product.routes'
import boom from '@hapi/boom'

const routerAPI = (app) => {
    const routerV1 = Router()

    app.use('/api/v1', routerV1)
        routerV1.use('/users', userRouters)
        routerV1.use('/products', productRouters)


    app.all('*', (_req,_res,next) =>{
        next(boom.notFound("La ruta no existe"))
    })

}

export default routerAPI;