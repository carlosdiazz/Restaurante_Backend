import {sucessResponse} from '../../libs/succesResponse'
import boom from '@hapi/boom'
import userModel from './user.models'
import {encryptPasswoird} from '../../libs/encryptedPassword'
import {Request,Response, NextFunction} from 'express'
import { createUserType } from './user.schemas'


export const getOneUser = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {id} = req.params
        const user = await userModel.findById(id, {password:0}).populate('role', 'name -_id')
        if(!user){
            throw boom.notFound('Usuario no encontrado')
        }
        //user.password = ''
        sucessResponse(req, res, user,'Usuario encontrado', 200)

    }catch(error){
        next(error)
    }
}

export const getAlleUser = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const users = await userModel.find({attributes: {exclude: ['password']}}).populate('role', 'name -_id')
        if(!users){
            next(boom.notFound('No hay usuarios'))
        }
        users.map(user => user.password = '')
        sucessResponse(req, res, users, 'Lista de usuarios',200)

    }catch(error){
        next(error)
    }
}

export const createUser = async(
    req: Request <unknown, unknown, createUserType>,
    res: Response,
    next: NextFunction)=>{
    try{
        const {first_name, last_name, nickname, email, password, birth_date, role, is_staff, phone} = req.body;
        const passwordEncrypted = await encryptPasswoird(password)

        const newUser = new userModel({
            first_name: first_name,
            last_name: last_name,
            nickname: nickname,
            email: email,
            password: passwordEncrypted,
            birth_date: birth_date,
            role: role,
            is_staff: is_staff,
            phone: phone
        })
        const userSaved = await (await newUser.save()).populate('role', 'name -_id')
        if(!userSaved){
            throw boom.badRequest('Error al crear el usuario')
        }
        newUser.password = ''
        sucessResponse(req, res, userSaved, 'Usuario creado',201)

    }catch(error){
        next(error)
    }
}

export const deleteUser = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {id} = req.params
        const userDeleted = await userModel.findByIdAndDelete(id).populate('role', 'name -_id')
        if(!userDeleted){
            throw boom.notFound('Usuario no encontrado')
        }
        userDeleted.password = ''
        sucessResponse(req, res, userDeleted, 'Usuario eliminado',200)

    }catch(error){
        next(error)
    }
}

export const updateUser = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {id} = req.params
        //! No se puede actualizar la contraseña
        const {first_name, last_name, nickname, email, is_staff, is_active} = req.body

        const userUpdated = await userModel.findById(id)
        if(!userUpdated){
            throw boom.notFound('Usuario no encontrado')
        }

        //! Arreglar el cambio de contrasena
        const userUpdated2 = await userModel.findByIdAndUpdate(id, {
            first_name: first_name,
            last_name: last_name,
            nickname: nickname,
            email: email,
            is_staff: is_staff,
            is_active: is_active,
            //password: password,
        }, {new: true})
        if(!userUpdated){
            throw boom.notFound('Usuario no encontrado')
        }

        sucessResponse(req, res, userUpdated2, 'Usuario actualizado',200)

    }catch(error){
        next(error)
    }
}