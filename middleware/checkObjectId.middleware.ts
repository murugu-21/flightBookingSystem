import { NextFunction, Request, Response } from 'express'
import { Types } from 'mongoose'
import { errorWrapper, idError } from '../errorResponse'
import { BAD_REQUEST } from '../statusCodes'
export default (idToCheck: string) =>
    (req: Request, res: Response, next: NextFunction) => {
        const id = (req.params[idToCheck] ||
            req.query[idToCheck] ||
            req.body[idToCheck]) as string
        if (!Types.ObjectId.isValid(id))
            return res.status(BAD_REQUEST).send(errorWrapper(idError))
        next()
    }
