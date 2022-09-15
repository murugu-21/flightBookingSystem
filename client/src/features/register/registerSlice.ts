import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { RootState } from '../../app/store'
import { fetchUser } from '../login/authSlice'
import { registerUserApi } from './registerAPI'
import { registerBody } from './registrationInterface'

const initialState: registerBody = {
    name: '',
    email: '',
    password: '',
    type: 'Customer',
}

export const registerUser = createAsyncThunk<
    undefined | Error[],
    undefined,
    { state: RootState }
>('auth/registerUser', async (_, { dispatch, getState, rejectWithValue }) => {
    try {
        const { registerForm: register } = getState()
        const token = await registerUserApi(register)
        dispatch(fetchUser(token))
    } catch (err: unknown) {
        if (!(err instanceof AxiosError) || !err.response) {
            throw err
        }
        return rejectWithValue(err.response.data.errors)
    }
})

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        setType: (state, action: PayloadAction<string>) => {
            state.type = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled, () => {
            return initialState
        })
    },
})

export const { setEmail, setName, setPassword, setType } = registerSlice.actions

export const selectRegister = (state: RootState) => state.registerForm

export default registerSlice.reducer
