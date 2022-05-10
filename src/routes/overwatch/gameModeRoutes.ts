import { Router } from 'express'

import { getAllGameModes } from '../../controllers/overwatch/gameModeController'

const router: Router = Router()

router.get('/', getAllGameModes)

export default router