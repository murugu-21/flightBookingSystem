import express, { Express, json } from 'express'
import path from 'path'
import {
    handleDatabaseError,
    handleDefaultError,
    handleMongooseError,
    handleValidationError,
} from './middleware/errorHandler.middleware'
import loginRouter from './routes/api/auth.route'
import flightRouter from './routes/api/flight.route'
import ticketRouter from './routes/api/ticket.route'
import userRouter from './routes/api/user.route'
const app: Express = express()

// init middleware for express validator to be able to intercept request
app.use(json())

// Define Routes
app.use('/api/user', userRouter)
app.use('/api/auth', loginRouter)
app.use('/api/flight', flightRouter)
app.use('/api/ticket', ticketRouter)

// error handlers
app.use(handleValidationError)
app.use(handleMongooseError)
app.use(handleDatabaseError)
app.use(handleDefaultError)

// serve build of frontend in express
app.use('/', express.static(path.join(__dirname, '../client/public')))

export default app
