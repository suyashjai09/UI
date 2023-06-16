import { TextField, Button, Box, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useSignUpManagement } from '@/utils/context/SignUpMangement';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { colors } from '@/utils/theme';
const UserInfo = () => {
    const { handleUserNameSubmit, setState, ...state } = useSignUpManagement();

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Name is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setState(prevState => ({
                ...prevState,
                name: values?.name
            }));
            await handleUserNameSubmit(values?.name);
        },
    });

    return (
        <>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexDirection: 'column' }}>
                <Typography variant="h1">What’s your name?</Typography>
                <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
                    <TextField
                        type='text'
                        variant="outlined"
                        label="" name="name"
                        placeholder="Enter your name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <Button  variant="contained" color="primary" sx={{
                        width: '156px',
                        height: '60px',                     
                        border: 'none',
                        textTransform: 'none',                       
                        fontSize: '24px',
                        fontWeight: '700',
                    }} type="submit">Continue</Button>
                </form>
            </Box>
        </>
    )
}
export default UserInfo;