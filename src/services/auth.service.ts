import {sucessResponse, sucessResponseHeader} from '../libs/succesResponse'
import boom from '@hapi/boom'
import {encryptPasswoird, comparePassword} from '../libs/encryptedPassword'
import {Request,Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import {SECRET_JWT_TOKEN} from '../config/config'
import userModel from '../database/models/user.models'
//import RoleModel from '../database/models/role.models'
import { createUserType } from '../schemas/user.schemas'
import {comprobarRol} from '../libs/ValidarExistenciaClaveSecundaria'


//Register
export const signup = async(
    req: Request <unknown, unknown, createUserType>,
    res: Response,
    next: NextFunction)=>{
    try{
        const {first_name, last_name, nickname, email, password, birth_date, role, is_staff, phone} = req.body;
        await comprobarRol(role)
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

        const token = jwt.sign({id: newUser._id}, SECRET_JWT_TOKEN)

        const user = await (await newUser.save()).populate('role', 'name -_id')
        if(!user){
            throw boom.badRequest('Error al crear el usuario')
        }
        //!sucessResponseHeader(req, res, {token, user}, 'Usuario logeado',{'Token':token}, 200)
        sucessResponseHeader(req, res, {token}, 'Usuario Registrado',{'Token':token}, 200)

    }catch(error){
        next(error)
    }
}


//Login
export const signin = async(
    req: Request <unknown, unknown, createUserType>,
    res: Response,
    next: NextFunction) => {
    try{

        const {email, password} = req.body;
        const user = await userModel.findOne({email: email}).populate('role', 'name -_id')
        if(!user){
            throw boom.unauthorized('Usuario o contraseña incorrectos')
        }
        const matchPassword = await comparePassword(password, user.password)
        if(!matchPassword){
            throw boom.unauthorized('Usuario o contraseña incorrectos')
        }
        const token = jwt.sign({id: user._id}, SECRET_JWT_TOKEN)
        //sucessResponse(req, res, {token, user}, 'Usuario logeado', 200)
        sucessResponseHeader(req, res, {token, user}, 'Usuario logeado',{'Token':token}, 200)

    }catch(error){
        next(error)
    }
}

export const profile = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        sucessResponse(req, res, req.user,'Auth/me', 200)

    }catch(error){
        next(error)
    }
}
