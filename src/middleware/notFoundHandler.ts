import { Request, Response } from 'express';

const notFoundHandler = (req: Request, res: Response): void => {
    const status: number = 404;

    res.status(status).json({
        msg: 'Route Not Found',
        status
    });
};

export default notFoundHandler;