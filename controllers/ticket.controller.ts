import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { errorWrapper, ticketError, tokenError } from '../errorResponse'
import { createTicket, getBookingsOfUser } from '../services/ticket.service'
import { BAD_REQUEST, CREATION_SUCCESSFULL, OK } from '../statusCodes'

export const postTicket = async (req: Request, res: Response) => {
    validationResult(req).throw()
    const { flightId, seats } = req.body
    const userId = req.user?._id
    if(!userId) throw new Error(tokenError.notFound);
    const ticketId = await createTicket(flightId, seats, userId)
    if (!ticketId)
        return res.status(BAD_REQUEST).send(errorWrapper(ticketError.booked))
    res.status(CREATION_SUCCESSFULL).send(ticketId)
}

export const getTickets = async (req: Request, res: Response) => {
    validationResult(req).throw()
    const userId = req.user?._id
    if (!userId) throw new Error(tokenError.notFound)
    const tickets = await getBookingsOfUser(userId)
    if (tickets.length === 0)
        return res.status(BAD_REQUEST).send(ticketError.empty)
    res.status(OK).send(tickets)
}