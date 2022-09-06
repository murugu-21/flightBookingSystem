import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { jwtSecret } from '../config'
import { FORBIDDEN_REQUEST, INVALID_TOKEN } from '../statusCodes'
import { errorWrapper, tokenError } from '../errorResponse'
export const isAuthorised =
    (role: string | null = null) =>
        (req: Request, res: Response, next: NextFunction) => {
            const token = req.header('x-auth-token')
            if (!token) {
                return res
                    .status(INVALID_TOKEN)
                    .send(errorWrapper(tokenError.notFound))
            }
            jwt.verify(token, jwtSecret, (error, decoded) => {
                if (error) {
                    return res
                        .status(INVALID_TOKEN)
                        .send(errorWrapper(tokenError.invalid))
                }
                if (role && (decoded as JwtPayload).user.type !== role) {
                    return res
                        .status(FORBIDDEN_REQUEST)
                        .send(errorWrapper(tokenError.notAuthorised))
                }
                req.user = (decoded as JwtPayload).user
                next()
            })
        }
