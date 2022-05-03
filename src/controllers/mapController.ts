import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

import asyncHandler from '../middleware/asyncHandler';

import Map from '../interfaces/MapInterface';

const endpoint: string = `${process.env.API_URL}/maps`;

const getAllMaps = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const axiosRes: AxiosResponse = await axios.get(endpoint);

    const data: Map[] = axiosRes.data;

    if(!data || !data.length) {
        throw new Error('No data to display');
    }

    res.json(data);
});

export {
    getAllMaps
};