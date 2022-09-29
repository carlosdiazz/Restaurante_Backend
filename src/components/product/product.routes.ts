import {Router} from 'express'
import * as productService from './product.service'
import {getProductSchema, createProductSchema, updateProductSchema, deleteProductSchema} from './product.schemas'
import {schemaValidation} from '../../libs/validarSchemas'
//import {isAdmin, verifyToken} from '../libs/verifyToken'
//import passport from 'passport'

const productRouters = Router()


/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *      description: Id del producto
 *     name:
 *      type: string
 *      description: Nombre del producto
 *     description:
 *      type: string
 *      description: Descripion del producto
 *     image:
 *      type: string
 *      description: Url de la imagen del producto
 *    required:
 *     - name
 *     - description
 *     - image
 *    example:
 *      name: Producto 1
 *      description:  Descriopcion del producto 1
 *      price:   1000
 *      image:   http://localhost:3000/public/imagen.jpg
*/


/**
* @swagger
* /api/v1/products:
*   get:
*     tags:
*       - Products
*     name: Get Products
*     summary: Get all Products
*     responses:
*      200:
*       description: "Lista de Productos con exito"
*       content:
*        application/json: 
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/Product'
*/

// /api/v1/products?category=6333b175c6aae4c92ff0a935&active=false
productRouters.get(
    '/',
    //!passport.authenticate('jwt', {session: false}),
    productService.getAllProduct
)
/**
* @swagger
* /api/v1/products/{id}:
*   get:
*     tags:
*       - Products
*     name: Get One Products
*     summary: Get One Products
*     responses:
*      200:
*       description: "Lista de Productos con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/Product'
*/
productRouters.get(
    '/:id',
    schemaValidation(getProductSchema),
    productService.getOneProduct
)
/**
* @swagger
* /api/v1/products/{id}:
*   put:
*     tags:
*       - Products
*     name: Update Products
*     summary: Update all Products
*     responses:
*      200:
*       description: "Lista de Productos con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/Product'
*/
productRouters.put(
    '/:id',
    //verifyToken,
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(updateProductSchema),
    productService.updateProduct
)
/**
* @swagger
* /api/v1/products/{id}:
*   delete:
*     tags:
*       - Products
*     name: Delete Products
*     summary: Delete all Products
*     responses:
*      200:
*       description: "Lista de Productos con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/Product'
*/
productRouters.delete(
    '/:id',
    //verifyToken,
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(deleteProductSchema),
    productService.deleteProduct
)
/**
* @swagger
* /api/v1/products:
*   post:
*     tags:
*       - Products
*     name: Create Products
*     summary: Create all Products
*     responses:
*      200:
*       description: "Lista de Productos con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/Product'
*/
productRouters.post(
    '/',
    //verifyToken,
    //isAdmin,
    schemaValidation(createProductSchema),
    productService.createProduct
)

export default productRouters;
