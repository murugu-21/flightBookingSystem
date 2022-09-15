import { Error } from '../alert/alertInterface'

export interface UserState {
    _id: string
    name: string
    email: string
    type: string
}

export interface AuthState {
    user: UserState | null
    isLoading: boolean
    errors: Error[] | null
}

export interface loginBody {
    email: FormDataEntryValue | null
    password: FormDataEntryValue | null
    isSave: FormDataEntryValue | null
}

export interface AuthPayload {
    user?: UserState | null
    token?: string | null
    errors?: Error[]
}
