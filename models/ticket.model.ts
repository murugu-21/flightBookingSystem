import { model, Schema } from 'mongoose'
import { Ticket } from '../interfaces'
import { UserModel } from './user.model'

export const ticketSchema = new Schema<Ticket>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: UserModel,
    },
    seats: {
        type: Number,
        required: true,
        validate: {
            validator: (seats: number) => seats !== 0,
            message: 'seats must not be zero',
        },
    },
})

export const TicketModel = model<Ticket>('Ticket', ticketSchema)
