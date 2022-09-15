import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { loginUserApi } from './loginAPI'
import { loginBody } from './authInterface'
import { fetchUser } from './authSlice'
import { RootState } from '../../app/store'

const initialState: loginBody = {
    email: '',
    password: '',
    isSave: false,
}

export const loginUser = createAsyncThunk<
    undefined | Error[],
    undefined,
    { state: RootState }
>('auth/loginUser', async (_, { getState, dispatch, rejectWithValue }) => {
    try {
        const { loginForm } = getState()
        const token = await loginUserApi(loginForm)
        if (loginForm.isSave) localStorage.setItem('token', token)
        dispatch(fetchUser(token))
    } catch (err: unknown) {
        if (!(err instanceof AxiosError) || !err.response) {
            throw err
        }
        return rejectWithValue(err.response.data.errors)
    }
})

export const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoginEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        setLoginPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        setLoginIsSave: (state, action: PayloadAction<boolean>) => {
            state.isSave = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, () => {
            return initialState
        })
    },
})

export const { setLoginEmail, setLoginPassword, setLoginIsSave } =
    loginSlice.actions

export const selectLogin = (state: RootState) => state.loginForm

export default loginSlice.reducer
