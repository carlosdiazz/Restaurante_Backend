import {Router} from 'express'
import {signin, signup, profile} from './auth.service'
import {schemaValidation} from '../../libs/validarSchemas'
import {createUserSchema, loginUserSchema} from '../user/user.schemas'
import passport from 'passport'

const AuthRouters = Router()

/**
* @swagger
* /api/v1/signup:
*   post:
*     tags:
*       - Auth
*     name: signup
*     summary: signup
*     responses:
*      200:
*       description: "signup"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/User'
*/
//Register
AuthRouters.post(
    '/signup',
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(createUserSchema),
    signup
)

/**
* @swagger
* /api/v1/signin:
*   post:
*     tags:
*       - Auth
*     name: Signin
*     summary: Signin
*     responses:
*      200:
*       description: "Signin"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/User'
*/

//Login
AuthRouters.post(
    '/signin',
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(loginUserSchema),
    signin
)
/**
* @swagger
* /api/v1/auth/me:
*   get:
*     tags:
*       - Auth
*     name: Info User
*     summary: Info user
*     responses:
*      200:
*       description: "Info User Logueado"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/User'
*/
AuthRouters.get(
    '/me',
    passport.authenticate('jwt', {session: false}),
    profile
)

export default AuthRouters;
