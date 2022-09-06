import { Router } from 'express'
import { body } from 'express-validator'
import { loginUser } from '../../controllers/user.controller'
import wrapAsync from '../../utils/wrapAsync'

const loginRouter = Router()

/**
@route    POST api/auth
@desc     Authenticate user & get token
@access   Public
*/
loginRouter.post(
    '/',
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists(),
    wrapAsync(loginUser)
)

export default loginRouter