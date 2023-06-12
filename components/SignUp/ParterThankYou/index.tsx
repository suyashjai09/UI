import { TextField, Button, Typography, Stack } from '@mui/material';
import { useState, useCallback } from 'react';
import { colors } from '@/utils/theme';
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
                    width: '210px',
                    height: '60px',
                    backgroundColor: colors.primaryButton,
                    border: 'none',
                    textTransform: 'none',
                    color: colors.primaryButtonText,
                    fontSize: '24px',
                    fontWeight: '700',
                    '&:hover': {
                        backgroundColor: colors.primaryButton,
                    },
                }}>UI/UX Home</Button>
            </Box>
        </>
    )
}
export default PartnerThankYou;