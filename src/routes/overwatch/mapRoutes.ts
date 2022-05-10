import express, { Router } from 'express'

import { getAllMaps } from '../../controllers/overwatch/mapController'

const router: Router = express.Router()

router.get('/', getAllMaps)

export default router