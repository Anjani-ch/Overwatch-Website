import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

import asyncHandler from '../middleware/asyncHandler';

import Hero from '../interfaces/overwatch/HeroInterface';
import Weapon from '../interfaces/overwatch/WeaponInterface';

const heroesEndpoint: string = `${process.env.API_URL}/heroes`;

const getAllWeapons = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const heroesAxiosRes: AxiosResponse = await axios.get(heroesEndpoint);

    const heroes: Hero[] = heroesAxiosRes.data;
    const data: any[] = [1, 2, 3];
    const promises = [];

    heroes.forEach(async hero => {
        const heroEndpoint = `${process.env.API_URL}/heroes/${hero.key.toLowerCase()}`;

        await setTimeout(() => {
            promises.push(axios.get(heroEndpoint));
        }, 1000);
    });

    if(!data || !data.length) {
        throw new Error('No data to display');
    }

    res.json(data);
});

export {
    getAllWeapons
};