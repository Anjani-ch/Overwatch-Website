import mongoose, { Schema } from 'mongoose'

import IUser from '../interfaces/IUser'

const schema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Pleas add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    twoFactorTemp: {
        type: Object,
    },
    twoFactor: {
        type: Object,
    }
},
{
    timestamps: true
})

const model = mongoose.model<IUser>('User', schema)

export default model