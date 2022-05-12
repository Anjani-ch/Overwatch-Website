import { ObjectId } from 'mongoose'

interface IUser {
    _id: ObjectId,
    username: string,
    email: string,
    password: string,
    token: string
}

export default IUser