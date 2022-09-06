import { NextFunction, Request, Response } from 'express'
import { errorWrapper, flightError } from '../errorResponse'
import { getFlightInFuture } from '../services/flight.service'
import { BAD_REQUEST } from '../statusCodes'
export const isFlightInFututre = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { flightId } = req.params
    const flight = await getFlightInFuture(flightId)
    if (!flight)
        return res.status(BAD_REQUEST).send(errorWrapper(flightError.inPast))
    next()
}