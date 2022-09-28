import {Router} from 'express'
import userRouters from './user.routes'
import productRouters from './product.routes'
import categoriesRouters from './categories.routes'
import tablesRouters from './tables.routes'
import AuthRouters from './auth.routes'
import boom from '@hapi/boom'
import {Application, Request, Response} from 'express'


const routerAPI = (app: Application) => {
    const routerV1 = Router()

    app.use('/api/v1', routerV1)
        routerV1.use('/auth', AuthRouters)
        routerV1.use('/users', userRouters)
        routerV1.use('/products', productRouters)
        routerV1.use('/categories', categoriesRouters)
        routerV1.use('/tables',tablesRouters )



    app.all('*', (_req: Request, _res: Response ,next) =>{
        next(boom.notFound("La ruta no existe"))
    })

}

export default routerAPI;