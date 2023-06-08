import { TextField, Button, Typography, Stack, Box } from '@mui/material';
import { useSignUpManagement } from '@/utils/context/SignUpMangement';
import { useCallback, useState } from 'react';
const ClaimUxHandle = () => {
    const { setState,submitUxHandleInfo,...state } = useSignUpManagement();

    const [uxHandleExist,setUxHandleExist] = useState(false);

    const handleUxHandleChange = useCallback((uxHandle: string) => {
        setState(prevState => ({
            ...prevState,
            uxHandle: uxHandle
          }));
    }, [])



    return (
        <>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
                <Stack>
                    <Typography variant='h2'>Claim your UX Handle</Typography>
                    <Typography>A UX Handle is the Username you'll use when chatting in the UX Community.</Typography>
                    <Stack>
                        <TextField id="outlined-basic" label="Enter a unique ux handle" variant="outlined" name="Email" onChange={(e) => handleUxHandleChange(e.target.value)} />
                    </Stack>
                    <Typography>Tip: If your name is John Doe, try a UX Handle like @John, @JohnD or @JohnDoe.  First names are going fast, so grab yours before it's gone.</Typography>
                    {/* <TextField id="outlined-basic" label="Email" variant="outlined" name="Email" onChange={(e)=>handleUserInfoChange('Email',e.target.value)}/> */}
                    {uxHandleExist && <Typography sx={{color:'red'}}>This handle has been taken - please try another one</Typography>}
                    {state?.uxHandleValidationMessage && <Typography sx={{color:'red'}}>{state?.uxHandleValidationMessage}</Typography>}
                </Stack>
                <Button onClick={submitUxHandleInfo}>Next</Button>
            </Box>
        </>
    )
}
export default ClaimUxHandle;