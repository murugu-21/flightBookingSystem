import { NextFunction, Request, Response } from 'express'
import { Result, ValidationError } from 'express-validator'
import { errorWrapper } from '../errorResponse'
import { BAD_REQUEST, DB_ERROR, INTERNAL_SERVER_ERROR } from '../statusCodes'

export function handleValidationError(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof Error && 'array' in error)
        return res
            .status(BAD_REQUEST)
            .send({ errors: (error as Result<ValidationError>).array() })
    next(error)
}

export function handleMongooseError(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof Error && error.name === 'MongooseError') {
        console.error(error)
        return res.status(DB_ERROR).send(errorWrapper(error.message))
    }
    next(error)
}

export function handleDatabaseError(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof Error && error.name === 'MongoServerError') {
        console.error(error)
        return res.status(DB_ERROR).send(errorWrapper(error.message))
    }
    next(error)
}

export function handleDefaultError(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof Error) {
        console.error(error)
        return res
            .status(INTERNAL_SERVER_ERROR)
            .send(errorWrapper(error.message))
    }
    next(error)
}
