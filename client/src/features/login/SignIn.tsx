import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Navigate, NavLink, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectAuth } from './authSlice'
import Alerts from '../../components/alert/Alerts'
import CircularProgress from '@mui/material/CircularProgress'
import {
    loginUser,
    selectLogin,
    setLoginEmail,
    setLoginIsSave,
    setLoginPassword,
} from './loginSlice'
import Password from '../../components/Password'

export function Copyright(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            <Link color="inherit" href="https://red-bus-clone.com/">
                red-bus-clone
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

const theme = createTheme()

export default function SignIn() {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const { user, errors, isLoading } = useAppSelector(selectAuth)
    const { email, password, isSave } = useAppSelector(selectLogin)
    const changeEmail = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => dispatch(setLoginEmail(e.target.value))
    const changePassword = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => dispatch(setLoginPassword(e.target.value))
    const changeIsSave = (e: React.ChangeEvent<HTMLInputElement>) =>
        dispatch(setLoginIsSave(e.target.checked))
    if (user) return <Navigate to={location.state || '/'} replace />
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(loginUser())
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            value={email}
                            onChange={changeEmail}
                            required
                            fullWidth
                            label="Email Address"
                            autoComplete="email"
                            autoFocus
                        />
                        <Password
                            password={password}
                            changePassword={changePassword}
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isSave}
                                    color="primary"
                                    onChange={changeIsSave}
                                />
                            }
                            label="Remember me"
                        />
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        )}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink to="/signup">
                                    {"Don't have an account? Sign Up"}
                                </NavLink>
                            </Grid>
                        </Grid>
                        <Alerts errors={errors} />
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}
