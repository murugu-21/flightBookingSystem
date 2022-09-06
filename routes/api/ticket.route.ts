import { Router } from "express";
import { param } from "express-validator";
import { getTickets, postTicket } from "../../controllers/ticket.controller";
import { isAuthorised } from "../../middleware/auth.middleware";
import checkObjectIdMiddleware from "../../middleware/checkObjectId.middleware";
import { isFlightInFututre } from "../../middleware/ticket.middleware";
import wrapAsync from "../../utils/wrapAsync";

const ticketRouter = Router()

ticketRouter.post(
    '/:flightId',
    isAuthorised('Customer'),
    param('flightId', 'flight id required').notEmpty,
    param('seats', 'seats should be greater than zero').notEmpty().isInt({min: 0}),
    checkObjectIdMiddleware('flightId'),
    wrapAsync(isFlightInFututre),
    wrapAsync(postTicket)
)

ticketRouter.get(
    '/',
    isAuthorised('Customer'),
    wrapAsync(getTickets)
)

export default ticketRouter