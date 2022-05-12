import express, { Router } from 'express'

import { getAllMaps } from '../../controllers/overwatch/mapController'

import checkIfAuthenticated from '../../middleware/checkIfAuthenticated'

const router: Router = express.Router()

router.get('/', checkIfAuthenticated, getAllMaps)

export default router