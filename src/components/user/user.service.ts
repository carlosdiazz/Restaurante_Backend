import {sucessResponse} from '../../libs/succesResponse'
import boom from '@hapi/boom'
import userModel from './user.models'
import { Request, Response, NextFunction } from 'express'
import {encryptPasswoird} from '../../libs/encryptedPassword'
//import { createUserType } from './user.schemas'
//import {encryptPasswoird} from '../../libs/encryptedPassword'

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

//!Se hace por el componentes auth
//export const createUser = async(
//    req: Request <unknown, unknown, createUserType>,
//    res: Response,
//    next: NextFunction)=>{
//    try{
//        const {first_name, last_name, nickname, email, password, birth_date, role, is_staff, phone} = req.body;
//        const passwordEncrypted = await encryptPasswoird(password)
//
//        const newUser = new userModel({
//            first_name: first_name,
//            last_name: last_name,
//            nickname: nickname,
//            email: email,
//            password: passwordEncrypted,
//            birth_date: birth_date,
//            role: role,
//            is_staff: is_staff,
//            phone: phone
//        })
//        const userSaved = await (await newUser.save()).populate('role', 'name -_id')
//        if(!userSaved){
//            throw boom.badRequest('Error al crear el usuario')
//        }
//        newUser.password = ''
//        sucessResponse(req, res, userSaved, 'Usuario creado',201)
//
//    }catch(error){
//        next(error)
//    }
//}

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

        const {first_name, last_name, nickname, email, is_staff, is_active, password} = req.body

        const userUpdated = await userModel.findById(id)
        if(!userUpdated){
            throw boom.notFound('Usuario no encontrado')
        }

        let userUpdated2;
        if (password) {
            const passwordEncrypted = await encryptPasswoird(password)
            userUpdated2 = await userModel.findByIdAndUpdate(id, {
                first_name: first_name,
                last_name: last_name,
                nickname: nickname,
                email: email,
                is_staff: is_staff,
                is_active: is_active,
                password: passwordEncrypted,
            }, { new: true })
        } else {
            userUpdated2 = await userModel.findByIdAndUpdate(id, {
                first_name: first_name,
                last_name: last_name,
                nickname: nickname,
                email: email,
                is_staff: is_staff,
                is_active: is_active,
                //password: passwordEncrypted,
            }, { new: true })
        }

        if(!userUpdated){
            throw boom.notFound('Usuario no encontrado')
        }

        sucessResponse(req, res, userUpdated2, 'Usuario actualizado',200)

    }catch(error){
        next(error)
    }
}