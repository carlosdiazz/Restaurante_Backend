import {sucessResponse} from '../libs/succesResponse'
import boom from '@hapi/boom'
import userModel from '../database/models/user.models'
//import roleModel from '../database/models/role.models'

export const getOneUser = async(req, res, next)=>{
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

export const getAlleUser = async(req, res, next)=>{
    try{
        const users = await userModel.find().populate('role', 'name -_id')
        if(!users){
            next(boom.notFound('No hay usuarios'))
        }
        sucessResponse(req, res, users, 'Lista de usuarios',200)

    }catch(error){
        next(error)
    }
}

export const createUser = async(req, res, next)=>{
    try{
        const {first_name, last_name, nickname, email, password, birth_date, role} = req.body;

        const newUser = new userModel({
            first_name: first_name,
            last_name: last_name,
            nickname: nickname,
            email: email,
            password: password,
            birth_date: birth_date,
            role: role
        })
        const userSaved = await (await newUser.save()).populate('role', 'name -_id')
        if(!userSaved){
            throw boom.badRequest('Error al crear el usuario')
        }
        sucessResponse(req, res, userSaved, 'Usuario creado',201)

    }catch(error){
        next(error)
    }
}

export const deleteUser = async(req, res, next)=>{
    try{
        const {id} = req.params
        const userDeleted = await userModel.findByIdAndDelete(id)
        if(!userDeleted){
            throw boom.notFound('Usuario no encontrado')
        }
        sucessResponse(req, res, userDeleted, 'Usuario eliminado',200)

    }catch(error){
        next(error)
    }
}

export const updateUser = async(req, res, next)=>{
    try{
        const {id} = req.params
        const {first_name, last_name, nickname, email, password} = req.body

        const userUpdated = await userModel.findById(id)
        if(!userUpdated){
            throw boom.notFound('Usuario no encontrado')
        }

        const userUpdated2 = await userModel.findByIdAndUpdate(id, {
            first_name: first_name,
            last_name: last_name,
            nickname: nickname,
            email: email,
            password: password,
        }, {new: true})
        if(!userUpdated){
            throw boom.notFound('Usuario no encontrado')
        }
        sucessResponse(req, res, userUpdated2, 'Usuario actualizado',200)

    }catch(error){
        next(error)
    }
}