export const errorWrapper = (msg: string) => ({ errors: [{ msg }] })

export const idError = 'Invalid Id'

export const userError = {
    exists: 'User already exists',
    invalid: 'Invalid Credentials',
    notDefined: 'User not defined',
}

export const tokenError = {
    notFound: 'No token, authorization denied',
    invalid: 'Token is not valid',
    notAuthorised: "you don't have previleges to perform operation",
}

export const flightError = {
    notFound: 'flight not found',
    empty: 'no flights found',
    inPast: 'flight in past and cannot be deleted',
    interval: 'flight is booked in interval',
    booked: 'flight has tickets booked and cannot be deleted'
}

export const ticketError = {
    booked: 'requested no of seats booked',
    empty: 'no bookings by you'
}
