import {Router} from 'express'
import * as categoriesServices from './categories.service'
import {createCategoriesSchema, updateCategorieschema, deleteCategoriesSchema, getCategoriesSchema} from './categories.schemas'
import {schemaValidation} from '../../libs/validarSchemas'
//!import {verifyToken} from '../libs/verifyToken'
//!import passport from 'passport'

const categoriesRouters = Router()


/**
 * @swagger
 * components:
 *  schemas:
 *   categorie:
 *    type: object
 *    properties:
 *     id:
 *      type: string
 *      description: Id del producto
 *     name:
 *      type: string
 *      description: Nombre del producto
 *     description:
 *      type: string
 *      description: Descripion del producto
 *     image:
 *      type: string
 *      description: Url de la imagen del producto
 *    required:
 *     - name
 *     - description
 *     - image
 *    example:
 *      name: Categoria 1
 *      description:  Descriopcion del categoria 1
 *      price:   1000
 *      image:   http://localhost:3000/public/imagen.jpg
*/


/**
* @swagger
* /api/v1/categories:
*   get:
*     tags:
*       - Categories
*     name: Get Categories
*     summary: Get all Categories
*     responses:
*      200:
*       description: "Lista de Categories con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/categorie'
*/

categoriesRouters.get(
    '/',
    //!passport.authenticate('jwt', {session: false}),
    categoriesServices.getAllCategories
)
/**
* @swagger
* /api/v1/categories/{id}:
*   get:
*     tags:
*       - Categories
*     name: Get One Categories
*     summary: Get One Categories
*     responses:
*      200:
*       description: "Categories con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/categorie'
*/
categoriesRouters.get(
    '/:id',
    schemaValidation(getCategoriesSchema),
    categoriesServices.getOneCategorie
)
/**
* @swagger
* /api/v1/categories/{:id}:
*   put:
*     tags:
*       - Categories
*     name: Update Categorie
*     summary: Update one categories
*     responses:
*      200:
*       description: "Update de Categoria con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/categorie'
*/
categoriesRouters.put(
    '/:id',
    //!verifyToken,
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(updateCategorieschema),
    categoriesServices.updateCategorie
)
/**
* @swagger
* /api/v1/categories/{:id}:
*   delete:
*     tags:
*       - Categories
*     name: Delete Categorie
*     summary: Delete one categories
*     responses:
*      200:
*       description: "Delete de Categoria con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/categorie'
*/
categoriesRouters.delete(
    '/:id',
    //!verifyToken,
    //! AGREGAR VALIDACION DE PERMISOS
    schemaValidation(deleteCategoriesSchema),
    categoriesServices.deleteCategorie
)
/**
* @swagger
* /api/v1/categories:
*   post:
*     tags:
*       - Categories
*     name: Create Categorie
*     summary: Create all categories
*     responses:
*      200:
*       description: "Lista de Categoria con exito"
*       content:
*        application/json:
*         schema:
*           type: array
*           items:
*               $ref: '#/components/schemas/categorie'
*/
categoriesRouters.post(
    '/',
    //!verifyToken,
    //!isAdmin,
    schemaValidation(createCategoriesSchema),
    categoriesServices.createCategorie
)

export default categoriesRouters;
