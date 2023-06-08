import { TextField, Button, Typography, Stack, Box } from '@mui/material';
import { useSignUpManagement } from '@/utils/context/SignUpMangement';
import { useCallback, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const ClaimUxHandle = () => {
    const { setState, submitUxHandleInfo, ...state } = useSignUpManagement();

    const [uxHandleExist, setUxHandleExist] = useState(false);

    const validationSchema = Yup.object({
        uxHandle: Yup.string()
            .required('Ux handle is required'),
    });

    const formik = useFormik({
        initialValues: {
            uxHandle: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setState(prevState => ({
                ...prevState,
                uxHandle: values?.uxHandle
            }));
           if(!await submitUxHandleInfo(values?.uxHandle))
           setUxHandleExist(true);
           else 
           setUxHandleExist(false);
        },
    });

    return (
        <>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexDirection: 'column' }}>
                <Typography variant='h2'>Claim your UX Handle</Typography>
                <Typography>A UX Handle is the Username you'll use when chatting in the UX Community.</Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        type='text'
                        variant="outlined"
                        label="Enter a unique ux handle" name="uxHandle"
                        value={formik.values.uxHandle}
                        onChange={formik.handleChange}
                        error={formik.touched.uxHandle && Boolean(formik.errors.uxHandle)}
                        helperText={formik.touched.uxHandle && formik.errors.uxHandle}
                    />
                    <Typography>Tip: If your name is John Doe, try a UX Handle like @John, @JohnD or @JohnDoe.  First names are going fast, so grab yours before it's gone.</Typography>
                    {/* <TextField id="outlined-basic" label="Email" variant="outlined" name="Email" onChange={(e)=>handleUserInfoChange('Email',e.target.value)}/> */}
                    {uxHandleExist && <Typography sx={{ color: 'red' }}>This handle has been taken - please try another one</Typography>}
                    <Button type="submit">Continue</Button>
                </form>
            </Box>
        </>
    )
}
export default ClaimUxHandle;