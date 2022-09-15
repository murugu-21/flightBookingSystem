import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'

export default function Password({
    password,
    changePassword,
    autoComplete,
}: {
    password: FormDataEntryValue
    changePassword: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
    autoComplete: string
}) {
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword(!showPassword)
    const handleMouseDownPassword = () => setShowPassword(!showPassword)
    return (
      <TextField
        margin="normal"
        value={password}
        onChange={changePassword}
        required
        fullWidth
        label="Password"
        type={showPassword ? 'text' : 'password'}
        autoComplete={autoComplete}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" >
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
}
