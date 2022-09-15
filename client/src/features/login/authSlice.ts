import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { RootState } from '../../app/store'
import { getUserApi } from './authAPI'
import { AuthState } from './authInterface'
import { Error } from '../../components/alert/alertInterface'
import api from '../../utils/api'
import { loginUser } from './loginSlice'
import { registerUser } from '../register/registerSlice'

const initialState: AuthState = {
    user: null,
    isLoading: false,
    errors: null,
}

export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async (token: string, { rejectWithValue }) => {
        try {
            api.defaults.headers.common['x-auth-token'] = token
            sessionStorage.setItem('token', token)
            const user = await getUserApi()
            return user
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
            if (sessionStorage.getItem('token'))
                sessionStorage.removeItem('token')
            if (localStorage.getItem('token')) localStorage.removeItem('token')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
            })
            .addMatcher(
                isAnyOf(
                    loginUser.pending,
                    registerUser.pending,
                    fetchUser.pending
                ),
                () => {
                    return { ...initialState, isLoading: true }
                }
            )
            .addMatcher(
                isAnyOf(
                    loginUser.rejected,
                    registerUser.rejected,
                    fetchUser.rejected
                ),
                (state, action) => {
                    state.isLoading = false
                    state.errors = action.payload as Error[]
                }
            )
    },
})

export const { logout } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
