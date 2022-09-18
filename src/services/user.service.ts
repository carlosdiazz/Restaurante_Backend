import {sucessResponse} from '../libs/succesResponse'
import boom from '@hapi/boom'
import userModel from '../database/models/user.models'
import {encryptPasswoird} from '../libs/encryptedPassword'
//import roleModel from '../database/models/role.models'
import {Request,Response, NextFunction} from 'express'
import { createUserType } from '../schemas/user.schemas'


export const getOneUser = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {id} = req.params
        const user = await userModel.findById(id).populate('role', 'name -_id')
        if(!user){
            throw boom.notFound('Usuario no encontrado')
        }
        user.password = ''
        sucessResponse(req, res, user,'Usuario encontrado', 200)

    }catch(error){
        next(error)
    }
}

export const getAlleUser = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const users = await userModel.find().populate('role', 'name -_id')
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
        const {first_name, last_name, nickname, email, password, birth_date, role} = req.body;

        const passwordEncrypted = await encryptPasswoird(password)

        const newUser = new userModel({
            first_name: first_name,
            last_name: last_name,
            nickname: nickname,
            email: email,
            password: passwordEncrypted,
            birth_date: birth_date,
            role: role
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
        console.log('AQUI')
        //! No se puede actualizar la contraseña
        const {first_name, last_name, nickname, email} = req.body

        const userUpdated = await userModel.findById(id)
        if(!userUpdated){
            throw boom.notFound('Usuario no encontrado')
        }

        const userUpdated2 = await userModel.findByIdAndUpdate(id, {
            first_name: first_name,
            last_name: last_name,
            nickname: nickname,
            email: email,
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