import { Request, Response } from 'express';
import APIRequestError from '../interfaces/APIRequestErrorInterface';

const asyncHandler = (callback: Function): any => {
    const handler = async (req: Request, res: Response): Promise<void> => {
        try {
            await callback(req, res);
        } catch (err: any) {
            const { status, statusText:msg }: APIRequestError = err.response;

            res.status(status).json({
                msg,
                status
            });
        }
    };

    return handler;
};

export default asyncHandler;