import { TextField, Button, Typography, Stack } from '@mui/material';
import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';

const PartnerThankYou = () => {
    return (
        <>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px',flexDirection:'column' }}>
                <Typography>Okay! We’ll be in touch</Typography>
                <Typography>Awesome. Our UX.com.au team have your details.
                    We will be in touch shorty. Thanks.</Typography>
                <Typography>Where to next</Typography>
                <Button>UI/UX Home</Button>
            </Box>
        </>
    )
}
export default PartnerThankYou;