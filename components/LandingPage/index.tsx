import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect, useMemo } from 'react';
// import SignUp from './SignUp';
import { SignUpManagementProvider } from '@/utils/context/SignUpMangement';
import SignUp from '../SignUp';
import { Container, Tabs } from '@mui/material';
import { Router, useRouter } from 'next/router';
import SignIn from '../SignIn';
const LandingPage = () => {
  const [value, setValue] = React.useState("1");
  const router = useRouter();


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
      if (newValue === "1") {
          router.replace('/signup')
      } else {
          router.replace('/signin')
      }  
  };

  useEffect(() => {
    if (!router.isReady) return;
    if (router.pathname === '/signin') {
      setValue("2");
    }
    else {
      setValue("1");
    }
  }, [value,router])

//   useEffect(() => {
//     const urlPath = router.asPath
//     const pathArray = urlPath.split('/')
//     const path = pathArray[pathArray.length - 1]
//     path === 'signup' && setValue("1")
//     path === 'signin' && setValue("2")
// }, [])

  return (
    <Container disableGutters maxWidth={false}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          {/* <Tabs
            TabIndicatorProps={{
              sx: { backgroundColor: "#000" }
            }}
            sx={{
              '& .MuiButtonBase-root': {
                textTransform: 'capitalize',
                fontSize: '16px',
                color: 'black',
                fontWeight: 500,
                minHeight: '48px',
                justifyContent: 'flex-start',
              },
            }}
            textColor="inherit"
            indicatorColor="primary"
            variant="fullWidth"
            onChange={handleChange}
            value={value}
          >
            <Tab sx={{ width: '100%',borderBottom:value == "1"?'3px solid #000':'0' }} label="Signup" value="1" />
            <Tab sx={{ width: '100%' , borderBottom:value == "2"?'3px solid #000':'0' }} label="Login" value="2" />
          </Tabs> */}
          <TabList sx={
            {
              '& .css-heg063-MuiTabs-flexContainer': {
                justifyContent: 'center'
              }
            }} onChange={handleChange} aria-label="lab API tabs example">
            <Tab sx={{ width: '100%' }} label="Signup" value="1" />
            <Tab sx={{ width: '100%' }} label="Login" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"><SignUp /></TabPanel>
        <TabPanel value="2"><SignIn /></TabPanel>
      </TabContext>
    </Container>
  );
}

export default LandingPage;