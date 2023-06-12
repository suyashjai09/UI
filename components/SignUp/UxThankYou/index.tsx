import { TextField, Button, Typography, Stack } from '@mui/material';
import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';

const UxThankYou = () => {
    
    return (
        <>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' ,flexDirection:'column'}}>
                <Typography variant='h1'>Awesome! You're all signed up for UX.com.au You can now go and create an awesome UX Profile.</Typography>
                <Typography variant='h2'>Where to next</Typography>
                <Button>Create Profile</Button>
            </Box>
        </>
    )
}
export default UxThankYou;