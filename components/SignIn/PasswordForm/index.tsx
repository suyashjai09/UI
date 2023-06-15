import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, IconButton, InputAdornment, Box, Button, Typography, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '@/utils/context/AuthContext';
import { colors } from '@/utils/theme';
interface Props {
    email: string,
}

const PasswordForm = ({ email }: Props) => {

    const [showPassword, setShowPassword] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
    });
    const { signIn, loading } = useAuth();
    const validationSchema = Yup.object({
        password: Yup.string()
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (!await signIn(email, values?.password)) {
                setSnackbar({
                    open: true,
                    message: 'Wrong username or password',
                })
            }
        },
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: any) => {
        event.preventDefault();
    };

    return (
        <Box>
            <form onSubmit={formik.handleSubmit} style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '24px' }}>
                <TextField
                    sx={{
                        '&  .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
                            width: '400px',
                            height: '42px'
                        }
                    }}
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    label=""
                    name="password"
                    placeholder="Enter Password"
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
                <Button type="submit"   variant="contained" color="primary" sx={{
                    width: '156px',
                    height: '60px',
                    // backgroundColor: colors.primaryButton,
                    border: 'none',
                    textTransform: 'none',
                    // color: colors.primaryButtonText,
                    fontSize: '24px',
                    fontWeight: '700',
                    marginTop: '7px',
                    // '&:hover': {
                    //     backgroundColor: colors.primaryButton,
                    // },
                }}>{loading ? <CircularProgress /> : "Next"}</Button>
            </form>
            <Snackbar open={snackbar?.open} onClose={() => setSnackbar({
                open: false,
                message: ''
            })} autoHideDuration={6000} >
                <Alert severity="error" sx={{ width: '100%' }}>
                    {snackbar?.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default PasswordForm;
