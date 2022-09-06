import { NextFunction, Request, Response } from 'express'
import { errorWrapper, flightError, tokenError } from '../errorResponse'
import { getFlight } from '../services/flight.service'
import { BAD_REQUEST, NOT_FOUND } from '../statusCodes'
import { isDateInFuture } from '../utils/date'
export const canDeleteFlight = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { _id } = req.params
    const operatorId = req.user?._id
    if(!operatorId) throw new Error(tokenError.notFound);
    const flight = await getFlight(_id, operatorId)
    if (!flight)
        return res.status(NOT_FOUND).send(errorWrapper(flightError.notFound))
    if (!isDateInFuture(flight.startDateTime.toISOString()))
        return res.status(BAD_REQUEST).send(errorWrapper(flightError.inPast))
    next()
}