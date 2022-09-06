import { Types } from "mongoose"
import { ReqFlight } from "../interfaces"
import { FlightModel } from "../models/flight.model"
import { dayFrame } from "../utils/date"

export const createFlight = async (flightDetails: ReqFlight) => {
    const flight = new FlightModel({
        ...flightDetails,
        availableSeats: flightDetails.totalSeats
    })
    flight.save()
    return flight._id.toString()
}

export const removeFlight = async (_id: string) => {
    await FlightModel.findByIdAndDelete(_id)
}

export const getFlight = async (_id: string, operatorId: string) => {
    return await FlightModel.findOne({
        _id: new Types.ObjectId(_id),
        operatorId: new Types.ObjectId(operatorId)
    })
}

export const getFlightInFuture = async (_id: string) => {
    return await FlightModel.findOne({
        _id: new Types.ObjectId(_id),
        startDateTime: {$gte: (new Date()).toISOString()}
    })
}

export const getBookingsFromFlight = async (
    flightNo: string,
    date: string,
    operatorId: string
) => {
    const { startDateTime, endDateTime } = dayFrame(date)
    return await FlightModel.findOne({
        flightNo,
        startDateTime: {
            $gte: startDateTime,
            $lte: endDateTime,
        },
        operatorId: new Types.ObjectId(operatorId)
    }).select('-seatsBooked')
}

export const searchFlight = async(
    startDateTime: string,
    endDateTime: string,
) => {
    return await FlightModel.find({
        startDateTime: {
            $gte: startDateTime,
            $lte: endDateTime,
        },
    }).select('-tickets')
}