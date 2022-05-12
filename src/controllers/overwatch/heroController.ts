import { Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'

import asyncHandler from '../../middleware/asyncHandler'

import Hero from '../../interfaces/overwatch/HeroInterface'

const endpoint: string = `${process.env.API_URL}/heroes`

// @desc   Get All Heroes
// @route  GET /api/overwatch/heroes
// @access Private
const getAllHeroes = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const axiosRes: AxiosResponse = await axios.get(endpoint)

    const data: Hero[] = axiosRes.data

    if(!data || !data.length) {
        throw new Error('No data to display');
    }

    res.json(data);
});

// @desc   Get Hero By Key
// @route  GET /api/overwatch/:key
// @access Private
const getHeroByKey = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const axiosRes: AxiosResponse = await axios.get(`${endpoint}/${req.params.key}`)

    const data: Hero[] = axiosRes.data

    if(!data) {
        throw new Error(`No data to display`)
    }

    res.json(data)
});

export {
    getAllHeroes,
    getHeroByKey
};