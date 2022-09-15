import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'
import { NavLink, Navigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectAuth } from '../login/authSlice'
import Alerts from '../../components/alert/Alerts'
import { Copyright } from '../login/SignIn'
import {
    registerUser,
    selectRegister,
    setEmail,
    setName,
    setPassword,
    setType,
} from './registerSlice'
import Password from '../../components/Password'

const theme = createTheme()

export default function SignUp() {
    const location = useLocation()
    const { user, errors, isLoading } = useAppSelector(selectAuth)
    const dispatch = useAppDispatch()
    const { name, email, password, type } = useAppSelector(selectRegister)
    const changeName = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => dispatch(setName(e.target.value))
    const changeEmail = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => dispatch(setEmail(e.target.value))
    const changePassword = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => dispatch(setPassword(e.target.value))
    const changeType = (e: SelectChangeEvent<string | File | null>) =>
        dispatch(setType(e.target.value as string))
    if (user) return <Navigate to={location.state || '/'} replace />
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(registerUser())
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
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="given-name"
                                    value={name}
                                    onChange={changeName}
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    value={email}
                                    onChange={changeEmail}
                                    label="Email Address"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Password
                                    password={password}
                                    changePassword={changePassword}
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="type-select-label">
                                        Type
                                    </InputLabel>
                                    <Select
                                        labelId="type-select-label"
                                        id="type"
                                        name="type"
                                        label="Type"
                                        value={type}
                                        onChange={(e) => changeType(e)}
                                    >
                                        <MenuItem value={'Customer'}>
                                            Customer
                                        </MenuItem>
                                        <MenuItem value={'Operator'}>
                                            Operator
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        {isLoading ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                        )}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink to="/signin">
                                    Already have an account? Sign in
                                </NavLink>
                            </Grid>
                        </Grid>
                        <Alerts errors={errors} />
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    )
}
