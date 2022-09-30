import {Router} from 'express'
import userRouters from '../components/user/user.routes'
import productRouters from '../components/product/product.routes'
import categoriesRouters from '../components/category/categories.routes'
import tablesRouters from '../components/tables/tables.routes'
import AuthRouters from '../components/auth/auth.routes'
import orderRouters from '../components/Order/order.routes'
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
        routerV1.use('/order', orderRouters )

    app.all('*', (_req: Request, _res: Response ,next) =>{
        next(boom.notFound("La ruta no existe"))
    })
}

export default routerAPI;