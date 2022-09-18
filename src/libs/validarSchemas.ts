import {ZodError} from 'zod'
import boom from '@hapi/boom'


export const validateSchema = (schema, data) => {
    try{
        schema.parse(data)
    }catch(error){
        if(error instanceof ZodError){
            throw boom.badRequest(error.issues.map(issue => `${issue.path[0]}: ${issue.message} => ${issue.code}`).join(', '));
        }
        throw boom.badRequest('Error al validar el schema')
    }
}