import {Router} from 'express'
import {schemaValidation} from '../../libs/validarSchemas'
import * as paymentService from './payment.service'
import { createPayment, updatePayment, deletePayment, getOnePayment} from './payment.schema'
//!import {verifyToken} from '../libs/verifyToken'
//!import passport from 'passport'

const paymentRouters = Router()


/**
 * @swagger
 * components:
 *  schemas:
 *   payment:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *      description: Id del Payment
 *     status:
 *      type: string
 *      description: status de la payment
 *     close:
 *      type: string
 *      description: status de la payment
 *    required:
 *     - status
 *     - close
 *    example:
 *      status: Order 1
 *      close:  Descriopcion de la mesa 1
*/


/**
* @swagger
* /api/v1/payment:
*   get:
*     tags:
*       - Payment
*     name: Get Payment
*     summary: Get all Payment
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

//? Tambien se puede ordenar las ordenes ya sea descendtes o ascedentes... asc y desc
paymentRouters.get(
    '/',
    //!passport.authenticate('jwt', {session: false}),
    //schemaValidation(getA),
    paymentService.getAllPayment
)
/**
* @swagger
* /api/v1/payment/{id}:
*   get:
*     tags:
*       - Payment
*     name: Get One Payment
*     summary: Get One Payment
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
paymentRouters.get(
    '/:id',
    schemaValidation(getOnePayment),
    paymentService.getOnePayment
)
/**
* @swagger
* /api/v1/payment/{:id}:
*   put:
*     tags:
*       - Payment
*     name: Update Payment
*     summary: Update one Payment
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
paymentRouters.put(
    '/:id',
    //!verifyToken,
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(updatePayment),
    paymentService.updatePayment
)
/**
* @swagger
* /api/v1/payment/{:id}:
*   delete:
*     tags:
*       - Payment
*     name: Delete Payment
*     summary: Delete one Payment
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
paymentRouters.delete(
    '/:id',
    //!verifyToken,
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(deletePayment),
    paymentService.deletePayment
)
/**
* @swagger
* /api/v1/payment:
*   post:
*     tags:
*       - Payment
*     name: Create Payment
*     summary: Create all Payment
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
paymentRouters.post(
    '/',
    //!verifyToken,
    //!isAdmin,
    schemaValidation(createPayment),
    paymentService.createPayment
)

export default paymentRouters;
