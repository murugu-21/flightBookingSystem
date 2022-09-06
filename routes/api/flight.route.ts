import { Router } from 'express'
import { body, param, query } from 'express-validator'
import { deleteFlight, getBookings, postFlight, searchFlightFromDate } from '../../controllers/flight.controller'
import { isAuthorised } from '../../middleware/auth.middleware'
import checkObjectIdMiddleware from '../../middleware/checkObjectId.middleware'
import { canDeleteFlight } from '../../middleware/flight.middleware'
import { isDateInFuture, checkEndAfterStart, isDate } from '../../utils/date'
import wrapAsync from '../../utils/wrapAsync'

const flightRouter = Router()

flightRouter.post(
    '/',
    isAuthorised('Admin'),
    body('flightNo', 'flight number is required').notEmpty(),
    body('from', 'from city is required').notEmpty(),
    body('to', 'to city is required').notEmpty(),
    body('startDateTime').custom(isDateInFuture),
    body('endDateTime').custom(checkEndAfterStart),
    body('price', 'price of seat should be numeric').notEmpty().isNumeric(),
    wrapAsync(postFlight)
)

flightRouter.delete(
    '/:_id',
    isAuthorised('Admin'),
    param('_id', 'id should be specified in url params').notEmpty(),
    checkObjectIdMiddleware('_id'),
    wrapAsync(canDeleteFlight),
    wrapAsync(deleteFlight)
)

flightRouter.get(
    '/',
    isAuthorised('Customer'),
    query('flightNo', 'flight number should be defined').notEmpty(),
    query('date').custom(isDate),
    wrapAsync(getBookings)
)

flightRouter.get(
    '/search',
    isAuthorised('Customer'),
    query('startDateTime').custom(isDateInFuture),
    query('endDateTime').custom(isDateInFuture),
    query('endDateTime').custom(checkEndAfterStart),
    wrapAsync(searchFlightFromDate)
)

export default flightRouter
