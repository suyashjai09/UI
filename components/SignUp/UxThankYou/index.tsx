import { TextField, Button, Typography, Stack } from '@mui/material';
import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import { colors } from '@/utils/theme';
import { useRouter } from 'next/router';
import { useSignUpManagement } from '@/utils/context/SignUpMangement';
import { useAuth } from '@/utils/context/AuthContext';

const UxThankYou = () => {
    const {...state} = useSignUpManagement();
    const {getFireBaseToken} = useAuth();
    const signInWithCustomToken = useCallback(async () => {
        const response = await getFireBaseToken(state.customToken);
    }, [getFireBaseToken,state.customToken])

    return (
        <>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexDirection: 'column' }}>
                <Typography variant='h1'>Thank You</Typography>
                <Typography variant='h2' sx={{ width: '52%' }}>Awesome! You&apos;re all signed up for UX.com.au    You can now go and create an awesome UX Profile.</Typography>
                <Typography variant='h2'>Where to next</Typography>
                <Button sx={{
                    width: '200px',
                    height: '60px',
                    backgroundColor: colors.primaryButton,
                    border: 'none',
                    textTransform: 'none',
                    color: colors.primaryButtonText,
                    marginTop: '7px',
                    fontSize: '24px',
                    fontWeight: '700',
                    '&:hover': {
                        backgroundColor: colors.primaryButton,
                    },
                }} onClick={signInWithCustomToken}>Create Profile</Button>
            </Box>
        </>
    )
}
export default UxThankYou;