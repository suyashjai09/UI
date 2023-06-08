import { TextField, IconButton, InputAdornment, Box, Button ,Typography} from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSignUpManagement } from '@/utils/context/SignUpMangement';
const UserPassword = () => {
    const {registerUser,setState,...state} = useSignUpManagement();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (event: any) => {
        setState(prevState => ({
            ...prevState,
            password: event.target.value,
        }));
        // setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: any) => {
        // setConfirmPassword(event.target.value);
        setState(prevState => ({
            ...prevState,
            confirmPassword: event.target.value,
        }));
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    return (
        <Box sx={{display:'flex',justifyContent:'space-between',flexDirection:'column',gap:'16px',width:'60%'}}>
            <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={state?.password}
                onChange={handlePasswordChange}
                required
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                type={showConfirmPassword ? 'text' : 'password'}
                label="Confirm Password"
                value={state?.confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword }
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button onClick={registerUser}>Next</Button>
            {state?.passwordValidationMessage && <Typography sx={{color:'red'}}>{state?.passwordValidationMessage}</Typography>}
        </Box>
    );
};
export default UserPassword;