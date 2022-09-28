import {sucessResponse} from '../libs/succesResponse'
//import boom from '@hapi/boom'
import {Request,Response, NextFunction} from 'express'


export const getOneTable = async(req: Request, res: Response, next: NextFunction)=>{
    try{

        sucessResponse(req, res, {},'One Table encontrada', 200)
    }catch(error){
        next(error)
    }
}

export const getAllTable = async(req: Request, res: Response, next: NextFunction)=>{
    try{

        sucessResponse(req, res, {},'Lista de Table encontradas', 200)
    }catch(error){
        next(error)
    }
}

export const createTable = async(req: Request, res: Response, next: NextFunction)=>{
    try{

        sucessResponse(req, res, {}, 'Table creada',201)
    }catch(error){
        next(error)
    }
}

export const deletetable = async(req: Request, res: Response, next: NextFunction)=>{
    try{

        sucessResponse(req, res, {},'Table eliminada', 200)
    }catch(error){
        next(error)
    }
}

export const updateTable = async(req: Request, res: Response, next: NextFunction)=>{
    try{

        sucessResponse(req, res, {},'Table actualizado', 200)
    }catch(error){
        next(error)
    }
}
