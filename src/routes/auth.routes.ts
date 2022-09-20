import {Router} from 'express'
import {signin, signup, profile} from '../services/auth.service'
import {schemaValidation} from '../libs/validarSchemas'
import {createUserSchema, loginUserSchema} from '../schemas/user.schemas'
import {verifyToken} from '../libs/verifyToken'

const AuthRouters = Router()

//Register
AuthRouters.post(
    '/signup',
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(createUserSchema),
    signup
    //productService.createProduct
)

//Login
AuthRouters.post(
    '/signin',
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(loginUserSchema),
    signin
    //productService.createProduct
)

AuthRouters.get(
    '/profile',
    verifyToken,
    profile
    //productService.createProduct
)

export default AuthRouters;
