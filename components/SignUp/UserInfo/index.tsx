import { TextField, Button, Box, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useSignUpManagement } from '@/utils/context/SignUpMangement';
const UserInfo = () => {
    const {handleUserNameSubmit, setState, ...state } = useSignUpManagement();
    
    const handleUserNameChange = useCallback((value: string) => {
        setState(prevState => ({
            ...prevState,
            name: value,
            nameValidationMessage: value.trim() === '' ? 'Name is required' : ''

        }));
    }, [])
    return (
        <>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexDirection: 'column' }}>
                <Typography variant="h3" component="h3">Enter your name</Typography>
                {/* <TextField id="outlined-basic" label="Name" name="Name" variant="outlined"  onChange={(e)=>handleUserInfoChange('Name',e.target.value)}/> */}
                <TextField id="outlined-basic" label="Name" name="Name" variant="outlined" onChange={(e) => handleUserNameChange(e.target.value)} />
                {state?.nameValidationMessage && <Typography sx={{ color: 'red' }}>{state?.nameValidationMessage}</Typography>}
                <Button onClick={handleUserNameSubmit}>Next</Button>
            </Box>
        </>
    )
}
export default UserInfo;