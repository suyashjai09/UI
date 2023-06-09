import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useSignUpManagement } from '@/utils/context/SignUpMangement';
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';

const SignIn = () => {

  const [showEmailForm,setShowEmailForm] = useState(true);
  const [email,setEmail] = useState('');

  return (
    <Box>
      {showEmailForm?( <EmailForm setShowEmailForm={setShowEmailForm} setEmail={setEmail}/>):( <PasswordForm email={email}/>)}
    </Box>
  );
};

export default SignIn;
