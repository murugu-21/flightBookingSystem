import { Schema, model } from 'mongoose'
import { Flight } from '../interfaces'
import { ticketSchema } from './ticket.model'
import { UserModel } from './user.model'

const flightSchema = new Schema<Flight>({
    operatorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: UserModel
    },
    flightNo: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    startDateTime: {
        type: Date,
        required: true,
    },
    endDateTime: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    totalSeats: {
        type: Number,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true,
    },
    tickets: {
        type: [ticketSchema],
        required: true,
    },
    creationDate: {
        type: Date,
        default: Date.now(),
    },
})

export const FlightModel = model<Flight>('Trip', flightSchema)
