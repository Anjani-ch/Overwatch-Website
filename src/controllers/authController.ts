import { Request, Response } from 'express'
import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken'
import { genSalt, hash, compare } from 'bcrypt'
import speakeasy, { GeneratedSecret } from 'speakeasy'

import asyncHandler from '../middleware/asyncHandler'

import BadRequestError from '../errors/BadRequestError'

import User from '../models/User'

import IUser from '../interfaces/IUser'

const hashPassword: Function = async (password: string, saltRounds: number): Promise<string> => {
    const salt: string = await genSalt(saltRounds ? saltRounds : 10)
    const hashedPassword: string = await hash(password, salt)

    return hashedPassword
}

const compareHashedPasswords: Function = async (plainText: string, hashed: string): Promise<boolean> => {
    const result = await compare(plainText, hashed)

    return result
}

const generateJWT: Function = (payload: JwtPayload): string => {
    const options: SignOptions = {
        expiresIn: '3h'
    }

    const result: string = jwt.sign(payload, process.env.JWT_SECRET as Secret, options)

    return result
}

const generateTwoFactorSecret: Function = (): GeneratedSecret => {
    const secret: GeneratedSecret = speakeasy.generateSecret()

    return secret
}

const verifyJWT = (req: Request, res: Response) => {
    let isValid: boolean = false

    try {
        // Verify Token
        jwt.verify(req.body.token, process.env.JWT_SECRET as Secret)

        isValid = true
    } catch (err: any) {
        isValid = false
    } finally {
        res.json({
            isValid
        })
    }
}

const verifyTwoFactorToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { token, userID } = req.body
    
    let user: IUser | null
    let secret: string
    let isVerified: boolean

    if(!token) {
        throw new BadRequestError('No token provided')
    }

    if(!userID) {
        throw new BadRequestError('No user id provided')
    }

    user = await User.findById(userID)

    if(!user) {
        throw new BadRequestError('Error finding user')
    }

    secret = user?.twoFactorTemp?.base32 as string

    isVerified = speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token
    })

    if(isVerified) {
        user.twoFactor = user.twoFactorTemp

        user.twoFactorTemp = undefined
        
        await user.save()

        res.json({
            isVerified
        })
    } else {
        res.json({
            isVerified
        })
    }
})

const validateTwoFactorToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { token, userID } = req.body
    
    let user: IUser | null
    let secret: string
    let isValid: boolean

    if(!token) {
        throw new BadRequestError('No token provided')
    }

    if(!userID) {
        throw new BadRequestError('No user id provided')
    }

    user = await User.findById(userID)

    if(!user) {
        throw new BadRequestError('Error finding user')
    }

    secret = user?.twoFactor?.base32 as string

    isValid = speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token
    })

    res.json({
        isValid
    })
})

export {
    hashPassword,
    compareHashedPasswords,
    generateJWT,
    verifyJWT,
    generateTwoFactorSecret,
    verifyTwoFactorToken,
    validateTwoFactorToken
}