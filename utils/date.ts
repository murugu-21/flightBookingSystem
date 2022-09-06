import { Request } from 'express-validator/src/base'

export const isDate = (value: string) => {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z/.test(value))
        throw new Error('Date must be in YYYY-MM-DDTHH:MN:SSZ format')
} 

export const isDateInFuture = (value: string) => {
    isDate(value)
    const enteredDate = new Date(value)
    const todaysDate = new Date()
    if (enteredDate < todaysDate) {
        throw new Error('Date must be greater than today')
    }
    return true
}

export const dayFrame = (curDate: string) => {
    const startDateTime = new Date(curDate)
    startDateTime.setHours(0, 0, 0, 0)
    const endDateTime = new Date(startDateTime)
    endDateTime.setDate(startDateTime.getDate() + 1)
    return { startDateTime, endDateTime }
}

export const checkEndAfterStart = (
    endDateTime: string,
    { req }: { req: Request }
) => {
    isDateInFuture(endDateTime)
    const startDateTime = req.body.startDateTime || req.query?.startDateTime
    if (new Date(endDateTime) <= new Date(startDateTime))
        throw new Error('endDate must be greater than start date')
    return true
}