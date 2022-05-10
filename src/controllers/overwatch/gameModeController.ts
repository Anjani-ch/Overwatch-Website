import { Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'

import asyncHandler from '../../middleware/asyncHandler'

import IGameMode from '../../interfaces/overwatch/IGameMode'

const endpoint: string = `${process.env.API_URL}/maps/gamemodes`

const getAllGameModes = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const axiosRes: AxiosResponse = await axios.get(endpoint)

    const data: IGameMode[] = axiosRes.data

    if(!data || !data.length) {
        throw new Error('No data to display');
    }

    res.json(data)
});

export {
    getAllGameModes
};