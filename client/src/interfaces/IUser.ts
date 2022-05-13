interface IUser {
    username: string,
    email: string,
    password?: string,
    _id?: string,
    token: string
}

export default IUser