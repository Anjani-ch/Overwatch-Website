import { NextFunction, Response } from 'express'
import jwt, { Secret } from 'jsonwebtoken'

import asyncHandler from './asyncHandler'

import UnauthorizedError from '../errors/UnauthorizedError'

import User from '../models/User'

import IAuthReq from '../interfaces/auth/IAuthReq'
import IUser from '../interfaces/IUser'

const checkIfAuthenticated = asyncHandler(async (req: IAuthReq, res: Response, next: NextFunction): Promise<void> => {
    const headerAuthorization: string | undefined = req.headers.authorization

    let token: string | undefined

    if(headerAuthorization && headerAuthorization.startsWith('Bearer')) {
        try {
            // Get Token From Header
            token = headerAuthorization.split(' ')[1]

            // Verify Token
            const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as IUser

            // Get User
            req.user = await User.findById(decoded._id).select('-password') as IUser

            next()
        } catch (error) {
            throw new UnauthorizedError('Not authorized to access this resource')
        }
    }

    if(!token) {
        throw new UnauthorizedError('Not authorized, no token provided')
    }
})

export default checkIfAuthenticated