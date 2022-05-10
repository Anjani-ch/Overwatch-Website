import { Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'

import asyncHandler from '../../middleware/asyncHandler'

import Hero from '../../interfaces/overwatch/HeroInterface'

const endpoint: string = `${process.env.API_URL}/heroes`

const getAllHeroes = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const axiosRes: AxiosResponse = await axios.get(endpoint)

    const data: Hero[] = axiosRes.data

    if(!data || !data.length) {
        throw new Error('No data to display');
    }

    res.json(data);
});

const getHeroByID = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const axiosRes: AxiosResponse = await axios.get(`${endpoint}/${req.params.key}`)

    const data: Hero[] = axiosRes.data

    if(!data) {
        throw new Error(`No data to display`)
    }

    res.json(data)
});

export {
    getAllHeroes,
    getHeroByID
};