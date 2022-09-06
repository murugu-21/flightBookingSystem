import mongoose from 'mongoose'
import { mongoURI } from '.'

export const connectDB = async () => {
    await mongoose.connect(mongoURI)
    console.log('MongoDB Connected...')
}