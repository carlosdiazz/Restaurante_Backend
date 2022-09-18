import {sucessResponse} from '../libs/succesResponse'
import boom from '@hapi/boom'
import ProductModel from '../database/models/product.models'

export const getOneProduct = async(req, res, next)=>{
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

export const getAllProduct = async(req, res, next)=>{
    try{
        const products = await ProductModel.find()
        if(!products){
            throw boom.notFound('No hay productos')
        }
        sucessResponse(req, res, products,'Lista de  producto encontrado', 200)
    }catch(error){
        next(error)
    }
}

export const createProduct = async(req, res, next)=>{
    try{
        const {name, description, price, image} = req.body;
        const newProduct = new ProductModel({
            name: name,
            description: description,
            price: price,
            image: image
        })
        const productSaved = await newProduct.save()
        if(!productSaved){
            throw boom.badRequest('Error al crear el producto')
        }
        sucessResponse(req, res, productSaved, 'Producto creado',201)
    }catch(error){
        next(error)
    }
}

export const deleteProduct = async(req, res, next)=>{
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

export const updateProduct = async(req, res, next)=>{
    try{
        const {id} = req.params
        const {name, description, price, image} = req.body;
        const productUdated = await ProductModel.findById(id)
        if(!productUdated){
            throw boom.notFound('Producto no encontrado')
        }
        const productUdated2 = await ProductModel.findByIdAndUpdate(id,{
            name: name,
            description: description,
            price: price,
            image: image
        },{new: true})
        if(!productUdated2){
            throw boom.badRequest('Error al actualizar el producto')
        }
        sucessResponse(req, res, productUdated2,'Producto actualizado', 200)
    }catch(error){
        next(error)
    }
}
