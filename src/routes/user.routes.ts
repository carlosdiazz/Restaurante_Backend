import {Router} from 'express'
import * as userService from '../services/user.service'
import {schemaValidation} from '../libs/validarSchemas'
import {createUserSchema, updateUserSchema, getUserSchema, deleteUserSchema} from '../schemas/user.schemas'

const userRouters = Router()


userRouters.get(
    '/',
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    userService.getAlleUser
)

userRouters.get(
    '/:id',
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(getUserSchema),
    userService.getOneUser
)

userRouters.put(
    '/:id',
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(updateUserSchema),
    userService.updateUser
)

userRouters.delete(
    '/:id',
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(deleteUserSchema),
    userService.deleteUser
)

userRouters.post(
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    //! AGREGAR VALIDACION DE PARAMETROS
    '/',
    schemaValidation(createUserSchema),
    userService.createUser
)

export default userRouters;