import React from 'react'
import { Error } from './alertInterface'
import Alert from '@mui/material/Alert'
import { Stack } from '@mui/material'

export default function Alerts({ errors }: { errors: Error[] | null }) {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            {errors?.map((error, idx) => (
                <Alert severity="error" key={idx}>
                    {error.msg}
                </Alert>
            ))}
        </Stack>
    )
}
