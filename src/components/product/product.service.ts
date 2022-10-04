import {sucessResponse} from '../../libs/succesResponse'
import boom from '@hapi/boom'
import ProductModel from './product.models'
import {Request,Response, NextFunction} from 'express'
import {comprobarCategory} from '../../libs/ValidarExistenciaClaveSecundaria'
import {is_active_products_ENUM} from '../../libs/Enums'

export const getOneProduct = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {id} = req.params
        const product = await ProductModel.findById(id)
        if(!product){
            throw boom.notFound('Producto no encontrado')
        }
        sucessResponse(req, res, product,'Producto encontrado', 200)
    }catch(error){
        next(error)
    }
}

export const getAllProduct = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        let filter = {};
        if(req.query.category){
            filter['id_category'] = req.query.category
        }
        if (req.query.is_active){
            if(req.query.is_active === is_active_products_ENUM.TRUE){
                filter['is_active'] = true
            }
            if(req.query.is_active === is_active_products_ENUM.FALSE){
                filter['is_active'] = false
            }
        }

        if(req.query.id_category){
            filter['id_category'] = req.query.id_category
        }

        const products = await ProductModel.find(filter).populate('id_category', 'name description _id')

        if(!products){
            throw boom.notFound('No hay productos')
        }
        sucessResponse(req, res, products,'Lista de  producto encontrado', 200)
    }catch(error){
        next(error)
    }
}

export const createProduct = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        await comprobarCategory(req.body.id_category)
        const product = req.body;
        const newProduct = new ProductModel(product)
        const productSaved = await newProduct.save()
        if(!productSaved){
            throw boom.badRequest('Error al crear el producto')
        }
        sucessResponse(req, res, productSaved, 'Producto creado',201)
    }catch(error){
        next(error)
    }
}

export const deleteProduct = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {id} = req.params
        const productDeleted = await ProductModel.findById(id)
        if(!productDeleted){
            throw boom.notFound('Producto no encontrado')
        }
        const productDeleted2 = await ProductModel.findByIdAndDelete(id)
        if(!productDeleted2){
            throw boom.badRequest('Error al eliminar el producto')
        }
        sucessResponse(req, res, productDeleted,'Producto eliminado', 200)
    }catch(error){
        next(error)
    }
}

export const updateProduct = async(req: Request, res: Response, next: NextFunction)=>{
    try{
        const {id} = req.params
        const {name, description, price, image, is_active, img_url} = req.body;
        const productUdated = await ProductModel.findById(id)
        if(!productUdated){
            throw boom.notFound('Producto no encontrado')
        }
        const productUdated2 = await ProductModel.findByIdAndUpdate(id,{
            name: name,
            description: description,
            price: price,
            image: image,
            is_active: is_active,
            img_url: img_url
        },{new: true})
        if(!productUdated2){
            throw boom.badRequest('Error al actualizar el producto')
        }
        sucessResponse(req, res, productUdated2,'Producto actualizado', 200)
    }catch(error){
        next(error)
    }
}
