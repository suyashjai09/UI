import { TextField, IconButton, InputAdornment, Box, Button, Typography, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSignUpManagement } from '@/utils/context/SignUpMangement';
import { colors } from '@/utils/theme';

const UserPassword = () => {
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<Boolean>(false);
    const [loading,setLoading]=useState<Boolean>(false);

    const {registerUser, setState } = useSignUpManagement();

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async(values) => {
            setLoading(true);
            setState(prevState => ({
                ...prevState,
                password: values?.password,
                confirmPassword: values?.confirmPassword
            }));
            await registerUser(values?.password,values?.confirmPassword);
            setLoading(false);
        },
    });

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
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexDirection: 'column' }}>
             <Typography variant="h1" component="h1">Create a password</Typography>
            <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
                <TextField
                    sx={{
                        '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input':{
                            width: '400px',
                            height: '42px'
                          }
                    }}
                    label=""
                    name="password"
                    placeholder='Enter password'
                    type={showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
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
                     sx={{
                        '& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input':{
                            width: '400px',
                            height: '42px'
                          }
                    }}
                    type={showConfirmPassword ? 'text' : 'password'}
                    label=""
                    name="confirmPassword"
                    placeholder='Confirm password'
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button type="submit" sx={{
                    width: '156px',
                    height: '60px',                 
                    border: 'none',
                    textTransform: 'none',                  
                    fontSize: '24px',
                    fontWeight: '700',                  
                }}>{loading?<CircularProgress/>:"Next"}</Button>
            </form>
        </Box>
    );
};

export default UserPassword;
