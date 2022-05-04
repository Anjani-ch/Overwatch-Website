import { Request, Response } from 'express';

import APIRequestError from '../interfaces/overwatch/APIRequestErrorInterface';

const asyncHandler = (callback: Function): any => {
    const handler = async (req: Request, res: Response): Promise<void> => {
        try {
            await callback(req, res);
        } catch (err: any) {
            if(err.response) {     
                const { status, statusText:msg }: APIRequestError = err.response;

                res.status(status).json({
                    msg,
                    status
                });
            } else {
                const status = 404;

                res.status(status).json({
                    msg: err.message,
                    status
                });
            }
        }
    };

    return handler;
};

export default asyncHandler;