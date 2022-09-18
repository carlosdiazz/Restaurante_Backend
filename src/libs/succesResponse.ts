import {Request, Response} from 'express';

export const sucessResponse = (_req: Request<unknown,unknown, unknown>, res: Response, data , message : String, status: number) => {
    res.status(status || 200).json({
        data: data || {},
        message: message || 'Succes',
        statusCode: status || 200,
        error: false

    });

}
