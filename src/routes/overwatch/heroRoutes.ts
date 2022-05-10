import { Router } from 'express'

import { getAllHeroes, getHeroByID } from '../../controllers/overwatch/heroController'

const router: Router = Router()

router.get('/', getAllHeroes)

router.get('/:key', getHeroByID)

export default router