import {sucessResponse} from '../../libs/succesResponse'
import boom from '@hapi/boom'
import CategorieModel from './categorie.models'
import {Request,Response, NextFunction} from 'express'
import ProductModel from '../product/product.models'

export const getOneCategorie = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {id} = req.params
        const categorie = await CategorieModel.findById(id)
        if(!categorie){
            throw boom.notFound('Categoria no encontrada')
        }
        sucessResponse(req, res, categorie,'Categoria encontrada', 200)
    }catch(error){
        next(error)
    }
}

export const getAllCategories = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const categories = await CategorieModel.find()
        if(!categories){
            throw boom.notFound('No hay categoria no encontrada')
        }

        sucessResponse(req, res, categories,'Lista de Categoria encontradas', 200)
    }catch(error){
        next(error)
    }
}

export const createCategorie = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {name, description, imgUrl} = req.body;

        const newCatgeorie = new CategorieModel({
            name: name,
            description: description,
            imgUrl: imgUrl
        })

        const categorieSaved = await newCatgeorie.save()
        if(!categorieSaved){
            throw boom.badRequest('Error al crear la categoria')
        }

        sucessResponse(req, res, categorieSaved, 'Categoria creada',201)
    }catch(error){
        next(error)
    }
}

export const deleteCategorie = async(req: Request, res: Response, next: NextFunction)=>{
    try{

        const {id} = req.params;
        const deleteCategorie = await CategorieModel.findById(id)
        if(!deleteCategorie){
            throw boom.notFound('No se encontro esta categoria')
        }
        const comprobarUso = await ProductModel.find({id_category:id})
        if(comprobarUso.length >=1){
            throw boom.badRequest('Error al eliminar la categoria esta vinculada a otros porductos')
        }

        const deleteCa = await CategorieModel.findByIdAndRemove(id)
        if(!deleteCa){
            throw boom.badRequest('Error al eliminar la categoria')
        }

        sucessResponse(req, res, deleteCategorie,'Categoria eliminada', 200)
    }catch(error){
        next(error)
    }
}

export const updateCategorie = async(req: Request, res: Response, next: NextFunction)=>{
    try{

        const {id} = req.params
        const {name, description, price, imgUrl} = req.body;
        const categorieUpdated = await CategorieModel.findById(id)
        if(!categorieUpdated){
            throw boom.notFound('Categoria no encontrado')
        }
        const categorieUdated2 = await CategorieModel.findByIdAndUpdate(id,{
            name: name,
            description: description,
            price: price,
            imgUrl: imgUrl
        },{new: true})
        if(!categorieUdated2){
            throw boom.badRequest('Error al actualizar la Categoria')
        }

        sucessResponse(req, res, categorieUdated2,'Cartegoria actualizado', 200)
    }catch(error){
        next(error)
    }
}
