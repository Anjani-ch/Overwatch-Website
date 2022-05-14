import express, { Router } from 'express'

import { verifyTwoFactorToken, validateTwoFactorToken } from '../../controllers/authController'

const router: Router = express.Router()

router.post('/verify', verifyTwoFactorToken)
router.post('/validate', validateTwoFactorToken)

export default router