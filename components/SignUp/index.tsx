import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useSignUpManagement } from '@/utils/context/SignUpMangement';

const SignUp = () => {

  const { verifyEmail, setState, ...state } = useSignUpManagement();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Enter valid email')
      .required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      setState(prevState => ({
        ...prevState,
        userName: values?.email
      }));
      await verifyEmail(values?.email);
    },
  });

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          type="email"
          label="Email"
          name="email"
          placeholder="jackson@boxyhq.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button type="submit">Continue</Button>
      </form>
    </Box>
  );
};

export default SignUp;
