import { Types } from "mongoose"
import { FlightModel } from "../models/flight.model"
import { TicketModel } from "../models/ticket.model"

export const createTicket = async (
    flightId: string,
    seats: number,
    userId: string 
) => {
    const ticket = new TicketModel(
        {
            userId: new Types.ObjectId(userId),
            seats
        }
    )
    console.log({...ticket})
    const updatedFlight = await FlightModel.findOneAndUpdate({
        _id: new Types.ObjectId(flightId),
        availableSeats: {$gte: seats}
    }, {
        $push: {
            tickets: ticket
        }, 
        $inc: {availableSeats: -seats}
    })
    if (!updatedFlight) return false
    return ticket._id.toString()
}

export const getBookingsOfUser = async (userId: string) => {
    return await FlightModel.aggregate([
        { $match: { 'tickets.userId': new Types.ObjectId(userId) } },
        { $unwind: '$tickets' },
        { $match: { 'tickets.userId': new Types.ObjectId(userId) } },
        {
            $project: {
                _id: '$tickets._id',
                flightId: '$_id',
                from: 1,
                to: 1,
                startDateTime: 1,
                endDateTime: 1,
                seats: '$tickets.seats',
            },
        },
    ])
}