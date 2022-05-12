import { NextFunction, Request, Response } from 'express'
import { AxiosError } from 'axios'

import BadRequestError from '../errors/BadRequestError';
import UnauthorizedError from '../errors/UnauthorizedError';

import IAPIRequestError from '../interfaces/overwatch/IAPIRequestError'

const asyncHandler = (callback: Function): any => {
    const handler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await callback(req, res, next)
        } catch (err: any) {
            if(err instanceof AxiosError) {
                let errResult: IAPIRequestError

                if(err.response) {
                    const { status, statusText }: IAPIRequestError = err.response
                    
                    errResult = {
                        status,
                        statusText
                    };
                } else {
                    errResult = {
                        status: 404,
                        statusText: err.message
                    };
                }
                res.status(errResult.status).json(errResult.statusText)
            } else {
                const { message, stack }: Error = err

                if(err instanceof BadRequestError) {
                    const { message, stack } = err
    
                    res.status(400).json({
                        message,
                        stack
                    })
                } else if(err instanceof UnauthorizedError) {
                    const { message, stack } = err
    
                    res.status(401).json({
                        message,
                        stack
                    })
                }
            }
        }
    };
    
    return handler
};

export default asyncHandler