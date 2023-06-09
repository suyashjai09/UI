import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
interface Props {
  setShowEmailForm: (isLoading: boolean) => void,
  setEmail: (email: string) => void,
}

const EmailForm = ({setShowEmailForm,setEmail}:Props) => {

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
    onSubmit: (values) => {
        setShowEmailForm(false);
        setEmail(values?.email);
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
        <TextField
          variant="outlined"
          type="email"
          label="Email"
          name="email"
          placeholder="Username or email"
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

export default EmailForm;