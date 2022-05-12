import { Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'

import asyncHandler from '../../middleware/asyncHandler'

import IMap from '../../interfaces/overwatch/IMap'

const endpoint: string = `${process.env.API_URL}/maps`

// @desc   Get Overwatch Maps
// @route  GET /api/overwatch/maps
// @access Private
const getAllMaps = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const axiosRes: AxiosResponse = await axios.get(endpoint)

    const data: IMap[] = axiosRes.data

    if(!data || !data.length) {
        throw new Error('No data to display')
    }

    res.json(data)
});

export {
    getAllMaps
};