import { ReqUser } from './interface'

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string
            MONGO_URI: string
            JWT_SECRET: string
        }
    }
    namespace Express {
        export interface Request {
            user?: ReqUser
        }
    }
}

export { }
