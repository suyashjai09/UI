import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import SignUp from './SignUp';
import { SignUpManagementProvider } from '@/utils/context/SignUpMangement';
import SignUp from '../SignUp';
const LandingPage =()=>{
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
      };
    
      return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Signup" value="1" />
                <Tab label="Login" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1"><SignUp/></TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
          </TabContext>
        </Box>
      );
}

export default LandingPage;