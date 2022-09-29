import {Router} from 'express'
import { createTablesSchema, deleteTablesSchema, getTablesSchema, updateTableschema } from './tables.schemas'
import {schemaValidation} from '../../libs/validarSchemas'
import * as tableServices from './tables.service'
//!import {verifyToken} from '../libs/verifyToken'
//!import passport from 'passport'

const categoriesRouters = Router()


/**
 * @swagger
 * components:
 *  schemas:
 *   tables:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *      description: Id del producto
 *     name:
 *      type: string
 *      description: Nombre del producto
 *     image:
 *      type: string
 *      description: Url de la imagen del producto
 *    required:
 *     - name
 *     - description
 *     - image
 *    example:
 *      name: Mesa 1
 *      description:  Descriopcion de la mesa 1
 *      price:   1000
 *      image:   http://localhost:3000/public/imagen.jpg
*/


/**
* @swagger
* /api/v1/tables:
*   get:
*     tags:
*       - Tables
*     name: Get Tables
*     summary: Get all Tables
*     responses:
*      200:
*       description: "Lista de la mesas con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/tables'
*/

categoriesRouters.get(
    '/',
    //!passport.authenticate('jwt', {session: false}),
    tableServices.getAllTable
)
/**
* @swagger
* /api/v1/tables/{id}:
*   get:
*     tags:
*       - Tables
*     name: Get One Table
*     summary: Get One Table
*     responses:
*      200:
*       description: "Table con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/tables'
*/
categoriesRouters.get(
    '/:id',
    schemaValidation(getTablesSchema),
    tableServices.getOneTable
)
/**
* @swagger
* /api/v1/tables/{:id}:
*   put:
*     tags:
*       - Tables
*     name: Update Table
*     summary: Update one Table
*     responses:
*      200:
*       description: "Update de table con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/tables'
*/
categoriesRouters.put(
    '/:id',
    //!verifyToken,
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(updateTableschema),
    tableServices.updateTable
)
/**
* @swagger
* /api/v1/tables/{:id}:
*   delete:
*     tags:
*       - Tables
*     name: Delete Table
*     summary: Delete one Table
*     responses:
*      200:
*       description: "Delete de Table con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/tables'
*/
categoriesRouters.delete(
    '/:id',
    //!verifyToken,
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(deleteTablesSchema),
    tableServices.deletetable
)
/**
* @swagger
* /api/v1/tables:
*   post:
*     tags:
*       - Tables
*     name: Create Table
*     summary: Create all tables
*     responses:
*      200:
*       description: "Lista de Table con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/tables'
*/
categoriesRouters.post(
    '/',
    //!verifyToken,
    //!isAdmin,
    schemaValidation(createTablesSchema),
    tableServices.createTable
)

export default categoriesRouters;
