import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useAppDispatch } from '../app/hooks'
import { logout } from '../features/login/authSlice'
import { useNavigate } from 'react-router-dom'

export default function NavBar() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button
                        color="inherit"
                        onClick={() => navigate('/bookings')}
                    >
                        My Bookings
                    </Button>
                    <Typography sx={{ flexGrow: 1 }}>
                        <Button color="inherit" onClick={() => navigate('/')}>
                            Flight Booking System
                        </Button>
                    </Typography>
                    <Button color="inherit" onClick={(e) => dispatch(logout())}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
