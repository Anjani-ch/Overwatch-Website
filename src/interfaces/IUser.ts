import { Document } from 'mongoose'
import { GeneratedSecret } from 'speakeasy'

interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    twoFactorTemp?: GeneratedSecret,
    twoFactor?: GeneratedSecret
}

export default IUser