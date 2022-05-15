import express, { Router } from 'express'

import { signupUser, loginUser, getUserData, deleteUser } from '../controllers/userController'

import checkIfAuthenticated from '../middleware/checkIfAuthenticated'

const router: Router = express.Router()

router.post('/signup', signupUser)
router.post('/login', loginUser)

router.get('/me', checkIfAuthenticated, getUserData)

router.delete('/:id', checkIfAuthenticated, deleteUser)

export default router