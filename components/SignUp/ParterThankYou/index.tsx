import { TextField, Button, Typography, Stack } from '@mui/material';
import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';

const PartnerThankYou = () => {
    return (
        <>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexDirection: 'column' }}>
                <Typography variant='h1'>Okay! We’ll be in touch</Typography>
                <Typography variant='h3'>Awesome. Our UX.com.au team have your details.
                    We will be in touch shorty. Thanks.</Typography>
                <Typography>Where to next</Typography>
                <Button sx={{
                    width: '156px',
                    height: '60px',
                    backgroundColor: 'grey',
                    border: 'none',
                    textTransform: 'none',
                    color: '#000',
                    fontSize: '24px',
                    fontWeight: '700',
                    '&:hover': {
                        backgroundColor: 'grey',
                    },
                }}>UI/UX Home</Button>
            </Box>
        </>
    )
}
export default PartnerThankYou;