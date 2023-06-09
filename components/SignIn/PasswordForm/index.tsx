import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, IconButton, InputAdornment, Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '@/utils/context/AuthContext';
interface Props {
    email: string,
}

const PasswordForm = ({ email }: Props) => {

    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = useAuth();
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
            await signIn(email, values?.password)
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
            <form onSubmit={formik.handleSubmit} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
                <TextField
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    label="Password"
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
                <Button type="submit">Next</Button>
            </form>
        </Box>
    );
};

export default PasswordForm;