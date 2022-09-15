import { NextFunction, Request, Response } from 'express'
import { errorWrapper, flightError, tokenError } from '../errorResponse'
import { getFlight, getFlightInInterval } from '../services/flight.service'
import { BAD_REQUEST, NOT_FOUND } from '../statusCodes'

export const isFlightInInterval = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { flightNo, startDateTime, endDateTime } = req.body
    if (await getFlightInInterval(flightNo, startDateTime, endDateTime))
        return res.status(BAD_REQUEST).send(errorWrapper(flightError.interval))
    next()
}

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
    const now = new Date()
    console.log(flight.startDateTime.toISOString())
    if (flight.startDateTime < now)
        return res.status(BAD_REQUEST).send(errorWrapper(flightError.inPast))
    next()
}