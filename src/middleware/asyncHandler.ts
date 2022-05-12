import { Request, Response } from 'express'
import { AxiosError } from 'axios'

import IAPIRequestError from '../interfaces/overwatch/IAPIRequestError'

const asyncHandler = (callback: Function): any => {
    const handler = async (req: Request, res: Response): Promise<void> => {
        try {
            await callback(req, res)
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
                console.log(err);
            }
        }
    };
    
    return handler
};

export default asyncHandler