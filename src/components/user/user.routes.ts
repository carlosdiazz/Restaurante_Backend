import {Router} from 'express'
import * as userService from './user.service'
import {schemaValidation} from '../../libs/validarSchemas'
import {createUserSchema, updateUserSchema, getUserSchema, deleteUserSchema} from './user.schemas'

const userRouters = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *      description: se crea solo el Id
 *     first_name:
 *      type: string
 *      description: first_name prueba
 *     last_name:
 *      type: string
 *      description: last_name prueba
 *     nickname:
 *      type: string
 *      description: nickname prueba
 *     email:
 *      type: string
 *      description: email prueba
 *     password:
 *      type: string
 *      description: password prueba
 *     phone:
 *      type: number
 *      description: phone prueba
 *    required:
 *     - first_name
 *     - last_name
 *     - nickname
 *     - email
 *     - password
 *    example:
 *      first_name: Carlos
 *      last_name:  Diaz
 *      nickname:   carlos0008
 *      password:   12345678
 *      email:      carlos@mail.com
*/


/**
* @swagger
* /api/v1/users:
*   get:
*     tags:
*       - Users
*     name: Get Users
*     summary: Get all users
*     responses:
*      200:
*       description: "Lista de usuarios con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/User'
*/

userRouters.get(
    '/',
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    userService.getAlleUser
)
/**
* @swagger
* /api/v1/users/{id}:
*   get:
*     tags:
*       - Users
*     name: Get Users
*     summary: Get all users
*     parameters:
*      - in: path
*        name: id
*        schema:
*         type: string
*        required: true
*        description: id del usuario
*     responses:
*      200:
*       description: "Lista de usuarios con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/User'
*/
userRouters.get(
    '/:id',
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(getUserSchema),
    userService.getOneUser
)
/**
* @swagger
* /api/v1/users/{id}:
*   put:
*     tags:
*       - Users
*     name: Put Users
*     summary: Put all users
*     responses:
*      200:
*       description: "Lista de usuarios con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/User'
*/
userRouters.put(
    '/:id',
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(updateUserSchema),
    userService.updateUser
)
/**
* @swagger
* /api/v1/users/{id}:
*   delete:
*     tags:
*       - Users
*     name: delete Users
*     summary: Delte all users
*     responses:
*      200:
*       description: "Lista de usuarios con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/User'
*/
userRouters.delete(
    '/:id',
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(deleteUserSchema),
    userService.deleteUser
)
/**
* @swagger
* /api/v1/users:
*   post:
*     tags:
*       - Users
*     name: Post Users
*     summary: Post all users
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*      200:
*       description: "Crear usuario"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/User'
*/
userRouters.post(
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    //! AGREGAR VALIDACION DE PARAMETROS
    '/',
    schemaValidation(createUserSchema),
    userService.createUser
)

export default userRouters;