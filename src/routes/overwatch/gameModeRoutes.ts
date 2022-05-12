import { Router } from 'express'

import { getAllGameModes } from '../../controllers/overwatch/gameModeController'

import checkIfAuthenticated from '../../middleware/checkIfAuthenticated'

const router: Router = Router()

router.get('/', checkIfAuthenticated, getAllGameModes)

export default router