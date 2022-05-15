import { Request, Response } from 'express'
import emailValidator from 'email-validator'

import asyncHandler from '../middleware/asyncHandler'

import BadRequestError from '../errors/BadRequestError'
import UnauthorizedError from '../errors/UnauthorizedError'

import User from '../models/User'

import {
    hashPassword,
    compareHashedPasswords,
    generateJWT,
    generateTwoFactorSecret
} from './authController'

import ISignupData from '../interfaces/auth/ISignupData'
import ILoginData from '../interfaces/auth/ILoginData'
import IUser from '../interfaces/IUser'
import IAuthReq from '../interfaces/auth/IAuthReq'

// @desc   Signup User
// @route  POST /api/users/signup
// @access Public
const signupUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const {
        username,
        email,
        password,
        confirmPassword,
        twoFactor
    }: ISignupData = req.body

    const passwordMinChars: number = 6

    let user: IUser | null

    // Check For Empty Fields
    if(!username || !email || !password || !confirmPassword) {
        throw new BadRequestError('Please fill in all fields')
    }

    // Email Validation
    if(!emailValidator.validate(email)) {
        throw new BadRequestError('Invalid Email')
    }

    // Check For Non-Matching Passwords
    if(password !== confirmPassword) {
        throw new BadRequestError('Passwords do not match')
    }

    // Password Length Validation
    if(password.length < passwordMinChars) {
        throw new BadRequestError(`Password must be minimum ${passwordMinChars} character${passwordMinChars !== 1 ? 's' : ''} long`)
    }

    // Check For Duplicate Username
    user = await User.findOne({ username })

    if(user) {
        throw new BadRequestError('User with that username already exists')
    }

    // Check For Duplicate Email
    user = await User.findOne({ email })

    if(user) {
        throw new BadRequestError('User with that email already exists')
    }

    // Validation Passed
    user = new User({
        username,
        email,
        password: await hashPassword(password, 10)
    })

    if(twoFactor === 'on') {
        user.twoFactorTemp = generateTwoFactorSecret()
    }

    await user.save()

    // Check If Valid User
    if(user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            twoFactor: user.twoFactorTemp ? user.twoFactorTemp : null
        })
    } else {
        throw new BadRequestError('Invalid user data')
    }
})

// @desc   Login User
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password }:ILoginData = req.body

    const user: IUser | null = await User.findOne({ email })

    if(!email || !password) {
        throw new BadRequestError('Please fill in all fields')
    }

    if(!user) {
        throw new BadRequestError('No user with that email')
    }

    if(user && !(await compareHashedPasswords(password, user.password))) {
        throw new BadRequestError('Incorrect password')
    }

    res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateJWT({ _id: user._id }),
        twoFactor: user.twoFactorTemp ? user.twoFactorTemp : user.twoFactor ? user.twoFactor : null,
        isFirstLogin: user.twoFactorTemp ? true : false
    })
})

// @desc   Get User
// @route  GET /api/users/me
// @access Private
const getUserData = asyncHandler(async (req: IAuthReq, res: Response): Promise<void> => {
    const user = await User.findById(req.user._id).select('-password') as IUser

    res.json(user)
})

const deleteUser = asyncHandler(async (req: IAuthReq, res: Response): Promise<void> => {
    const user = await User.findById(req.user._id).select('-password') as IUser

    await User.deleteOne({ _id: user._id })

    res.json({
        msg: 'User Deleted'
    })
})

export {
    signupUser,
    loginUser,
    getUserData,
    deleteUser
}