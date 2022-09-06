import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { errorWrapper, tokenError, userError } from '../errorResponse'
import {
    comparePassword,
    createToken,
    createUser,
    getUserOfMail,
} from '../services/user.service'
import { BAD_REQUEST, CREATION_SUCCESSFULL, OK } from '../statusCodes'

export const registerUser = async (req: Request, res: Response) => {
    validationResult(req).throw()
    const { name, email, password, type } = req.body
    if (await getUserOfMail(email)) {
        return res.status(BAD_REQUEST).send(errorWrapper(userError.exists))
    }
    const user = await createUser(email, name, password, type)
    res.status(CREATION_SUCCESSFULL).send(
        createToken({
            _id: user._id.toString(),
            type: user.type,
        })
    )
}

export const loginUser = async (req: Request, res: Response) => {
    validationResult(req).throw()
    const { email, password } = req.body
    const user = await getUserOfMail(email)
    if (!user) {
        return res.status(BAD_REQUEST).send(errorWrapper(userError.invalid))
    }
    const isMatch = await comparePassword(password, user)
    if (!isMatch) {
        return res.status(BAD_REQUEST).send(errorWrapper(userError.invalid))
    }
    res.status(CREATION_SUCCESSFULL).send(
        createToken({
            _id: user._id.toString(),
            type: user.type,
        })
    )
}

export const getUser = async (req: Request, res: Response) => {
    validationResult(req).throw()
    if (!req.user)
        res.status(BAD_REQUEST).send(tokenError.invalid)
    res.status(OK).send(req.user)
}