import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectAuth } from './login/authSlice'
import NavBar from './navbar/Navbar'

export const ProtectedRoute: React.FC = () => {
    const location = useLocation()
    const { user, isLoading } = useAppSelector(selectAuth)
    if (!user && !isLoading) {
        return <Navigate to="/signin" replace state={location.pathname} />
    }
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}
