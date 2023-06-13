import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useSignUpManagement } from '@/utils/context/SignUpMangement';
import { useTheme } from '@emotion/react';
import { colors } from '@/utils/theme';
import { CircularProgress, Typography } from '@mui/material';


const SignUp = () => {

  const { verifyEmail, setState, ...state } = useSignUpManagement();
  const [loading,setLoading]=useState<Boolean>(false);
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
      setLoading(true);
      setState(prevState => ({
        ...prevState,
        userName: values?.email
      }));
      await verifyEmail(values?.email);
      setLoading(false);
    },
  });

  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'24px',alignItems:'center'}}>
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
          backgroundColor: colors.primaryButton,
          border: 'none',
          textTransform: 'none',
          color: colors.primaryButtonText,
          marginTop: '7px',
          fontSize: '24px',
          fontWeight: '700',
          '&:hover': {
            backgroundColor: colors.primaryButton,
          },
        }} >{loading?<CircularProgress/>:"Continue"}</Button>
      </form>
      <Box sx={{display:'flex',justifyContent:'flex-start'}}>
        <Typography>Privacy is paramount . SignUp process is encripted</Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
