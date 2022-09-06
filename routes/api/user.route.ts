import { Router } from 'express'
import { body } from 'express-validator'
import { registerUser } from '../../controllers/user.controller'
import wrapAsync from '../../utils/wrapAsync'

const userRouter = Router()

/**
@route    POST api/user
@desc     Register user
@access   Public
*/
userRouter.post(
    '/',
    body('name', 'Name is required').notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body(
        'password',
        'Please enter a password with 8 or more characters'
    ).isLength({ min: 8 }),
    body(
        'password',
        'Please enter a password with atleast one lower case character'
    ).matches(/^(?=.*[a-z])[0-9a-zA-Z!@#$&()\\-`.+,/]{1,}$/),
    body(
        'password',
        'Please enter a password with atleast one upper case character'
    ).matches(/^(?=.*[A-Z])[0-9a-zA-Z!@#$&()\\-`.+,/]{1,}$/),
    body('password', 'Please enter a password with atleast one number').matches(
        /^(?=.*\d)[0-9a-zA-Z!@#$&()\\-`.+,/]{1,}$/
    ),
    body('type').custom((value) => {
        if (!['Customer', 'Admin'].includes(value))
            return Promise.reject('Please enter type as Customer or Operator')
        return Promise.resolve()
    }),
    wrapAsync(registerUser)
)

export default userRouter
