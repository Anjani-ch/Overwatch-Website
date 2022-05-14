interface IUser {
    _id?: string,
    username: string,
    email: string,
    token: string,
    twoFactor: object | null
}

export default IUser