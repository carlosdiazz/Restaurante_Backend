import {Router} from 'express'
import {getAllInventorySchema, deleteInventorySchema} from './inventory.schema'
import {schemaValidation} from '../../libs/validarSchemas'
import * as inventoryService from './inventory.service'
//import {isAdmin, verifyToken} from '../libs/verifyToken'
//import passport from 'passport'

const inventorytRouters = Router()


/**
 * @swagger
 * components:
 *  schemas:
 *   Inventory:
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
* /api/v1/inventory:
*   get:
*     tags:
*       - Inventory
*     name: Get Inventory
*     summary: Get all Inventory
*     responses:
*      200:
*       description: "Lista de Inventory con exito"
*       content:
*        application/json: 
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/Product'
*/

// /api/v1/products?category=6333b175c6aae4c92ff0a935&active=false
inventorytRouters.get(
    '/',
    //!passport.authenticate('jwt', {session: false}),
    schemaValidation(getAllInventorySchema),
    inventoryService.getAllInventory
)

inventorytRouters.delete(
    '/:id',
    schemaValidation(deleteInventorySchema),
    inventoryService.deleteInvetory

)

export default inventorytRouters;
