import { NextFunction, Request, Response } from 'express'

export default (
    fn: (arg0: Request, arg1: Response, arg2: NextFunction) => Promise<any>
) =>
    function (req: Request, res: Response, next: NextFunction) {
        fn(req, res, next).catch(next)
    }
