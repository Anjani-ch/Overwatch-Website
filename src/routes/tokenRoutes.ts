import express, { Router } from 'express'

import { verifyJWT } from '../controllers/authController'

const router: Router = express.Router()

router.post('/verify', verifyJWT)

export default router