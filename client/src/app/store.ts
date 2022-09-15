import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from '../features/login/authSlice'
import loginSlice from '../features/login/loginSlice'
import registerSlice from '../features/register/registerSlice'

export const store = configureStore({
  reducer: {
    registerForm: registerSlice,
    loginForm: loginSlice,
    auth: authReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
