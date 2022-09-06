import { Schema, model } from 'mongoose'
import { User } from '../interfaces'

const userSchema = new Schema<User>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    joiningDate: {
        type: Date,
        default: Date.now,
    },
    type: {
        type: String,
        enum: ['Customer', 'Admin'],
    },
})

export const UserModel = model<User>('User', userSchema)
