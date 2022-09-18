import {Router} from 'express'
import * as userService from '../services/user.services'

const userRouters = Router()


userRouters.get(
    '/',
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    //! AGREGAR VALIDACION DE PARAMETROS
    userService.getAlleUser
)

userRouters.get(
    '/:id',
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    //! AGREGAR VALIDACION DE PARAMETROS
    userService.getOneUser
)

userRouters.put(
    '/:id',
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    //! AGREGAR VALIDACION DE PARAMETROS

    userService.updateUser
)

userRouters.delete(
    '/:id',
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    //! AGREGAR VALIDACION DE PARAMETROS
    userService.deleteUser
)

userRouters.post(
    //!AGREGAR VALIDACION DE TOKEN
    //! AGREGAR VALIDACION DE PERMISOS
    //! AGREGAR VALIDACION DE PARAMETROS
    '/',
    userService.createUser
)

export default userRouters;