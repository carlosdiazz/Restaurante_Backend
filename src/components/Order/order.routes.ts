import {Router} from 'express'
import {schemaValidation} from '../../libs/validarSchemas'
import * as orderService from './order.service'
import { createOrderSchema, deleteOrderSchema, getOrderSchema, updateOrderSchema } from './order.schema'
//!import {verifyToken} from '../libs/verifyToken'
//!import passport from 'passport'

const orderRouters = Router()


/**
 * @swagger
 * components:
 *  schemas:
 *   order:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *      description: Id del order
 *     status:
 *      type: string
 *      description: status de la orden
 *     close:
 *      type: string
 *      description: status de la orden
 *    required:
 *     - status
 *     - close
 *    example:
 *      status: Order 1
 *      close:  Descriopcion de la mesa 1
*/


/**
* @swagger
* /api/v1/order:
*   get:
*     tags:
*       - Order
*     name: Get Order
*     summary: Get all Order
*     responses:
*      200:
*       description: "Lista de la ordenes con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/order'
*/

orderRouters.get(
    '/',
    //!passport.authenticate('jwt', {session: false}),
    orderService.getAllOrder
)
/**
* @swagger
* /api/v1/order/{id}:
*   get:
*     tags:
*       - Order
*     name: Get One Order
*     summary: Get One Order
*     responses:
*      200:
*       description: "Table con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/order'
*/
orderRouters.get(
    '/:id',
    schemaValidation(getOrderSchema),
    orderService.getOneOrder
)
/**
* @swagger
* /api/v1/order/{:id}:
*   put:
*     tags:
*       - Order
*     name: Update order
*     summary: Update one order
*     responses:
*      200:
*       description: "Update order con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/order'
*/
orderRouters.put(
    '/:id',
    //!verifyToken,
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(updateOrderSchema),
    orderService.updateOrder
)
/**
* @swagger
* /api/v1/order/{:id}:
*   delete:
*     tags:
*       - Order
*     name: Delete Order
*     summary: Delete one order
*     responses:
*      200:
*       description: "Delete de Order con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/order'
*/
orderRouters.delete(
    '/:id',
    //!verifyToken,
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(deleteOrderSchema),
    orderService.deleteOrder
)
/**
* @swagger
* /api/v1/order:
*   post:
*     tags:
*       - Order
*     name: Create Order
*     summary: Create all Order
*     responses:
*      200:
*       description: "Lista de Orders con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/order'
*/
orderRouters.post(
    '/',
    //!verifyToken,
    //!isAdmin,
    schemaValidation(createOrderSchema),
    orderService.createOrder
)

export default orderRouters;
