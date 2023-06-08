import { TextField, Button, Box, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useSignUpManagement } from '@/utils/context/SignUpMangement';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' ,flexDirection: 'column'}}>
            <Typography variant="h3" component="h3">Enter your name</Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        type='text'
                        variant="outlined"
                        label="Name" name="name" 
                        placeholder="Enter your name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <Button type="submit">Continue</Button>
                </form>
            </Box>
        </>
    )
}
export default UserInfo;