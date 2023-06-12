import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useSignUpManagement } from '@/utils/context/SignUpMangement';
import { useTheme } from '@emotion/react';


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
    onSubmit: async (values) => {
      setState(prevState => ({
        ...prevState,
        userName: values?.email
      }));
      await verifyEmail(values?.email);
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit} style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '24px' }}>
        <TextField
          variant="outlined"
          type="email"
          label=""
          name="email"
          placeholder="Username or email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button type="submit" sx={{
          width: '156px',
          height: '60px',
          backgroundColor: 'grey',
          border: 'none',
          textTransform: 'none',
          color: '#000',
          marginTop:'7px',
          fontSize: '24px',
          fontWeight: '700',
          '&:hover': {
            backgroundColor: 'grey',
          },
        }} >Continue</Button>
      </form>
    </Box>
  );
};

export default SignUp;
