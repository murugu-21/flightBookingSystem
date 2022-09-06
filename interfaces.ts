import { Types } from "mongoose"

export interface User {
    name: string
    email: string
    password: string
    joiningDate: Date
    type: string
}

export interface ReqUser {
    _id: string
    type: string
}

export interface Ticket {
    userId: Types.ObjectId
    seats: number
}

export interface Flight {
    operatorId: Types.ObjectId
    flightNo: string
    from: string
    to: string
    startDateTime: Date
    endDateTime: Date
    price: number
    totalSeats: number
    availableSeats: number
    tickets: Ticket[]
    creationDate: Date
}

export interface ReqFlight {
    flightNo: string
    from: string
    to: string
    startDateTime: string
    endDateTime: string
    totalSeats: number
    price: number
}