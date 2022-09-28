import {Request, Response, NextFunction} from 'express'
import boom from '@hapi/boom'
import {SECRET_JWT_TOKEN} from '../config/config'
import jwt from 'jsonwebtoken'
import UserModel from '../database/models/user.models'
import RoleModel from '../database/models/role.models'
interface IToken {
    id: string
    iat: number
}

export const verifyToken = async(req: Request, _res: Response, next: NextFunction) => {
    try{
        //Verifico si existe el token
        const token = req.headers['token'] as string
        if(!token){
            throw boom.unauthorized('No se proporciono un token')
        }
        //Verifico si el token es valido
        const decoded = jwt.verify(token, SECRET_JWT_TOKEN) as IToken
        if(!decoded){
            throw boom.unauthorized('Unauthorized')
        }
        //Verifico si el usuario existe
        const user = await UserModel.findById(decoded.id, {password: 0})
        if(!user){
            throw boom.unauthorized('Unauthorized')
        }
        req.body.userId = decoded.id
        next()
    }catch(error){
        next(error)
    }
};

export const isAdmin = async(req: Request, _res: Response, next : NextFunction) => {
    try{
        const user = await UserModel.findById(req.body.userId, {password: 0});
        const roles = await RoleModel.find({_id: {$in: user?.role}});

        for(let i = 0; i < roles.length; i++){
            if(roles[i].name === 'admin'){
                next();
                return;
            }
        }
        throw boom.unauthorized('No tiene el Rol de Administrador');

    }catch(err){
        next(err);
    }
}