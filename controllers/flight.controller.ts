import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { errorWrapper, flightError, tokenError, userError } from '../errorResponse'
import { createFlight, removeFlight, getBookingsFromFlight, searchFlights } from '../services/flight.service'
import { BAD_REQUEST, CREATION_SUCCESSFULL, NOT_FOUND, NO_CONTENT, OK } from '../statusCodes'
export const postFlight = async (req: Request, res: Response) => {
    validationResult(req).throw()
    const {
        flightNo,
        from,
        to,
        startDateTime,
        endDateTime,
        price,
    } = req.body
    let totalSeats = req.body.totalSeats
    if (!totalSeats) totalSeats = 60
    const operatorId = req.user?._id
    if(!operatorId) throw new Error(userError.notDefined)
    const flightId = await createFlight({
        operatorId,
        flightNo,
        from,
        to,
        startDateTime,
        endDateTime,
        totalSeats,
        price
    })
    res.status(CREATION_SUCCESSFULL).send(flightId)
}

export const deleteFlight = async (req: Request, res: Response) => {
    validationResult(req).throw()
    const { _id } = req.params
    const deletedFlight = await removeFlight(_id)
    if (!deletedFlight)
        return res.status(BAD_REQUEST).send(flightError.booked)
    res.status(NO_CONTENT).send()
}

export const getBookings = async (req: Request, res: Response) => {
    validationResult(req).throw()
    const { flightNo, date } = req.query
    const operatorId = req.user?._id
    if(!operatorId) throw new Error(tokenError.notFound);
    const flight = await getBookingsFromFlight(flightNo as string, date as string, operatorId)
    if (!flight)
        return res.status(NOT_FOUND).send(flightError.notFound)
    res.status(OK).send(flight)
}

export const searchFlightFromDate = async (req: Request, res: Response) => {
    validationResult(req).throw()
    const { startDateTime, endDateTime } = req.query
    const flights = await searchFlights(startDateTime as string, endDateTime as string)
    if (flights.length === 0)
        return res.status(NOT_FOUND).send(errorWrapper(flightError.empty))
    res.status(OK).send(flights)
}