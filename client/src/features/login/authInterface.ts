import { Error } from '../../components/alert/alertInterface'

export interface User {
    _id: string
    name: string
    email: string
    type: string
}

export interface AuthState {
    user: User | null
    isLoading: boolean
    errors: Error[] | null
}

export interface loginBody {
    email: FormDataEntryValue
    password: FormDataEntryValue
    isSave: boolean
}

export interface AuthPayload {
    user?: User | null
    token?: string | null
    errors?: Error[]
}
