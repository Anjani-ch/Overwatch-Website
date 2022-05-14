import { Request, Response } from 'express'
import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken'
import { genSalt, hash, compare } from 'bcrypt'

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

export {
    hashPassword,
    compareHashedPasswords,
    generateJWT,
    verifyJWT
}