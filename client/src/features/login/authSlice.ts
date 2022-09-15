import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { RootState } from '../../app/store'
import { registerUserApi } from '../register/registerAPI'
import { getUserApi, loginUserApi } from './authAPI'
import { AuthState, loginBody } from './authInterface'
import { Error } from '../alert/alertInterface'
import { registerBody } from '../register/registrationInterface'
import api from '../../utils/api'

const initialState: AuthState = {
    user: null,
    isLoading: false,
    errors: null,
}

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (body: loginBody, { rejectWithValue }) => {
        try {
            const { user } = await loginUserApi(body)
            return { user, isSave: body.isSave }
        } catch (err: unknown) {
            if (!(err instanceof AxiosError) || !err.response) {
                throw err
            }
            return rejectWithValue(err.response.data.errors)
        }
    }
)

export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async (token: string, { rejectWithValue }) => {
        try {
            api.defaults.headers.common['x-auth-token'] = token
            const user = await getUserApi()
            return { user, token }
        } catch (err: unknown) {
            if (!(err instanceof AxiosError) || !err.response) {
                throw err
            }
            return rejectWithValue(err.response.data.errors)
        }
    }
)

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (body: registerBody, { rejectWithValue }) => {
        try {
            const { user } = await registerUserApi(body)
            return { user }
        } catch (err: unknown) {
            if (!(err instanceof AxiosError) || !err.response) {
                throw err
            }
            return rejectWithValue(err.response.data.errors)
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            delete api.defaults.headers.common['x-auth-token']
            if (localStorage.getItem('token')) localStorage.removeItem('token')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                return { ...initialState, isLoading: true }
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.errors = action.payload as Error[]
            })
            .addCase(fetchUser.pending, (state) => {
                return { ...initialState, isLoading: true }
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.isLoading = false
                state.errors = action.payload as Error[]
            })
            .addCase(registerUser.pending, (state) => {
                return { ...initialState, isLoading: true }
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload.user
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.errors = action.payload as Error[]
            })
    },
})

export const { logout } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
