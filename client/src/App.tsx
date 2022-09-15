import React, { useLayoutEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignUp from './features/register/SignUp'
import SignIn from './features/login/SignIn'
import { useAppDispatch } from './app/hooks'
import { fetchUser } from './features/login/authSlice'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    const dispatch = useAppDispatch()
    useLayoutEffect(() => {
        const token =
            localStorage.getItem('token') || sessionStorage.getItem('token')
        if (token) dispatch(fetchUser(token))
    }, [dispatch])
    return (
        <div className="App">
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route element={<ProtectedRoute />}>
                    <Route index element={<div>To do</div>} />
                </Route>
                <Route path="*" element={<h1>404 NOT FOUND</h1>} />
            </Routes>
        </div>
    )
}

export default App
