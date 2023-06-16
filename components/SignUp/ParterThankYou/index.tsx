import { TextField, Button, Typography, Stack } from '@mui/material';
import { useState, useCallback } from 'react';
import { colors } from '@/utils/theme';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { useSignUpManagement } from '@/utils/context/SignUpMangement';
import { useAuth } from '@/utils/context/AuthContext';

const PartnerThankYou = () => {
    const {...state} = useSignUpManagement();
    const {getFireBaseToken} = useAuth();
    const signInWithCustomToken = useCallback(async () => {
        const response = await getFireBaseToken(state.customToken);
        
    }, [getFireBaseToken,state.customToken])

    return (
        <>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexDirection: 'column' }}>
                <Typography variant='h1'>Okay! We’ll be in touch</Typography>
                <Typography variant='h3'>Awesome. Our UX.com.au team have your details.
                    We will be in touch shorty. Thanks.</Typography>
                <Typography>Where to next</Typography>
                <Button  variant="contained" color="primary" sx={{
                    width: '210px',
                    height: '60px',                  
                    border: 'none',
                    textTransform: 'none',                   
                    fontSize: '24px',
                    fontWeight: '700',                 
                }}
                onClick={signInWithCustomToken}
                >UI/UX Home</Button>
            </Box>
        </>
    )
}
export default PartnerThankYou;