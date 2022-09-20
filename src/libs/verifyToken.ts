import {Request, Response, NextFunction} from 'express'
import boom from '@hapi/boom'
import {SECRET_JWT_TOKEN} from '../config/config'
import jwt from 'jsonwebtoken'
import UserModel from '../database/models/user.models'

interface IToken {
    id: string
    iat: number
}

export const verifyToken = async(req: Request, _res: Response, next: NextFunction) => {
    try{
        const token = req.headers['auth-token'] as string
        if(!token){
            throw boom.unauthorized('No token provided')
        }
        const decoded = jwt.verify(token, SECRET_JWT_TOKEN) as IToken
        if(!decoded){
            throw boom.unauthorized('Unauthorized')
        }
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