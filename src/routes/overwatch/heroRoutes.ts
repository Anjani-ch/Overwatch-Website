import { Router } from 'express'

import { getAllHeroes, getHeroByKey } from '../../controllers/overwatch/heroController'

import checkIfAuthenticated from '../../middleware/checkIfAuthenticated'

const router: Router = Router()

router.get('/', checkIfAuthenticated, getAllHeroes)

router.get('/:key', checkIfAuthenticated, getHeroByKey)

export default router