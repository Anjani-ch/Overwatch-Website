import mongoose, { ConnectOptions } from 'mongoose'

const connectToDB: Function = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        
        console.log('CONNECTED TO DB...')
    } catch (err) {
        console.log(err)
    }
}

export default connectToDB