import { Request } from 'express'
import IUser from '../IUser'

interface IAuthReq extends Request {
    user: IUser
}

export default IAuthReq