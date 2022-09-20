import {ZodError, AnyZodObject} from 'zod'
import boom from '@hapi/boom'
import {Request, Response, NextFunction} from 'express'

export const schemaValidation = (schema: AnyZodObject) => (req: Request, _res: Response, next: NextFunction) => {
    try {
        schema.parse(
            {
                body: req.body,
                params: req.params,
                // query: req.query,
            }
        )
        next()
    } catch (error ) {
        if(error instanceof ZodError){
            throw boom.badRequest(error.issues.map(issue => `${issue.path[1]}: ${issue.message} => ${issue.code}`).join(', '));
        }
        throw boom.badRequest()
    }
};
