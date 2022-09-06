import { UserModel } from '../models/user.model'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { jwtSecret } from '../config'
import { ReqUser, User } from '../interfaces'

export const getUserOfMail = async (email: string) => {
    return await UserModel.findOne({ email })
}

export const createUser = async (
    email: string,
    name: string,
    password: string,
    type: string
) => {
    const user = new UserModel({
        name,
        email,
        type,
    })
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)
    await user.save()
    return user
}

export const createToken = (user: ReqUser) => {
    const payload = {
        user,
    }
    return jwt.sign(payload, jwtSecret, { expiresIn: '5 days' })
}

export const comparePassword = async (password: string, user: User) => {
    return await bcrypt.compare(password, user.password)
}
