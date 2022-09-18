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
    } catch (error) {
        if(error instanceof ZodError){
            next(boom.badRequest(error.issues.map(issue => `${issue.path[0]}: ${issue.message} => ${issue.code}`).join(', ')));
        }
        next(boom.badRequest())
    }
};
