import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { tokenError, userError } from '../errorResponse'
import { createFlight, removeFlight, getBookingsFromFlight, searchFlight } from '../services/flight.service'
import { CREATION_SUCCESSFULL, NO_CONTENT, OK } from '../statusCodes'
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
    await removeFlight(_id)
    res.status(NO_CONTENT).send()
}

export const getBookings = async (req: Request, res: Response) => {
    validationResult(req).throw()
    const { flightNo, date } = req.query
    const operatorId = req.user?._id
    if(!operatorId) throw new Error(tokenError.notFound);
    const flight = await getBookingsFromFlight(flightNo as string, date as string, operatorId)
    res.status(NO_CONTENT).send(flight)
}

export const searchFlightFromDate = async (req: Request, res: Response) => {
    validationResult(req).throw()
    const { startDateTime, endDateTime } = req.query
    const flight = await searchFlight(startDateTime as string, endDateTime as string)
    res.status(OK).send(flight)
}