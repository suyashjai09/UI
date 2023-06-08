import { TextField ,Button, Typography, Stack} from '@mui/material';
import { useState ,useCallback} from 'react';
import Box from '@mui/material/Box';
import validateEmail from '@/utils/validateEmail';
import { useSignUpManagement } from '@/utils/context/SignUpMangement';
const SignUp =()=>{
   
    const {verifyEmail,setState,...state} = useSignUpManagement();

    const handleEmailChange = useCallback((username: string) => {
        setState(prevState => ({
            ...prevState,
            userName: username,
            emailValidationMessage: validateEmail(username)
          }));
    }, [])


      return (
        <Box sx={{ width: '100%', display:'flex',alignItems:'center',justifyContent:'center',gap:'24px'}}>
          <Stack>
          <TextField id="outlined-basic" label="Email" variant="outlined" name="Email" onChange={(e)=>handleEmailChange(e.target.value)}/>
          {/* <TextField id="outlined-basic" label="Email" variant="outlined" name="Email" onChange={(e)=>handleUserInfoChange('Email',e.target.value)}/> */}
          {state?.emailValidationMessage && <Typography sx={{color:'red'}}>{state?.emailValidationMessage}</Typography>}
          </Stack>
          <Button onClick={verifyEmail}>Continue</Button>
        </Box>
      );
}
export default SignUp;