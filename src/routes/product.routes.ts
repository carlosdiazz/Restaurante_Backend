import {Router} from 'express'
import * as productService from '../services/product.service'
import {getProductSchema, createProductSchema, updateProductSchema, deleteProductSchema} from '../schemas/product.schemas'
import {schemaValidation} from '../libs/validarSchemas'


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
    schemaValidation(getProductSchema),
    productService.getOneProduct
)

productRouters.put(
    '/:id',
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(updateProductSchema),
    productService.updateProduct
)

productRouters.delete(
    '/:id',
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(deleteProductSchema),
    productService.deleteProduct
)

productRouters.post(
    '/',
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(createProductSchema),
    productService.createProduct
)

export default productRouters;
