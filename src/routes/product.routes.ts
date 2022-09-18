import {Router} from 'express'
import * as productService from '../services/product.service'

const productRouters = Router()

productRouters.get(
    '/',
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    //! AGREGAR VALIDACION DE PARAMETROS
    productService.getAllProduct
)

productRouters.get(
    '/:id',
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    //! AGREGAR VALIDACION DE PARAMETROS
    productService.getOneProduct
)

productRouters.put(
    '/:id',
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    //! AGREGAR VALIDACION DE PARAMETROS
    productService.updateProduct
)

productRouters.delete(
    '/:id',
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    //! AGREGAR VALIDACION DE PARAMETROS
    productService.deleteProduct
)

productRouters.post(
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    //! AGREGAR VALIDACION DE PARAMETROS
    '/',
    productService.createProduct
)

export default productRouters;
