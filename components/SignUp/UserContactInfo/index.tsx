import { Box, InputLabel, MenuItem, FormControl, Select, TextField, Button, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { BaseUrl } from "@/constant";
import { useState } from "react";
import { useSignUpManagement } from "@/utils/context/SignUpMangement";
interface UserLocation {
    id: string;
    location: string;
}

const UserContactInfo = () => {

    const {setState,...state} = useSignUpManagement();
    const [userLocationList,setUserLocationList] = useState<UserLocation[]>([]);
    const [errorMessage,setErrorMessage] = useState('');

    const getUserLocation = useCallback(async () => {
        try {
            const response = await fetch(`${BaseUrl}/location`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const res = await response.json();
            if (response.ok) {
                setUserLocationList(res?.data);
                console.log(res?.data,"api-hit")
            }
        }
        catch (e) {
           console.log(e)
        }

    }, []);

    const handleChange = useCallback((e:any)=>{
        setState(prevState => ({
            ...prevState,
            locationId: e.target.value
          }));
          setErrorMessage('');
    },[])

    useEffect(()=>{
     getUserLocation();
    },[]);

    const handleFormSubmit=useCallback(()=>{
       if(state?.locationId === ''){
        setErrorMessage('Location field is required')
       }
       else {
        setState(prevState => ({
            ...prevState,
            activePage: 4,
          }));
       }
    },[state?.locationId])
    

    return (
        <Box sx={{display:'flex',gap:'32px',flexDirection:'column'}}>
            <Box sx={{display:'flex',gap:'16px'}}>
            <FormControl>
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={"+61"}
                    label="+61"
                    // onChange={handleChange}
                >
                    <MenuItem value={"+61"}>+61</MenuItem>
                    {/* <MenuItem value={+91}>+91</MenuItem> */}
                    {/* <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
            </FormControl>
            <TextField id="outlined-basic" label="Phone number is optional " variant="outlined"/>
            </Box>
            <Box>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Country</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state?.locationId}
                    label="Select Country"
                    onChange={handleChange}
                >
                    {userLocationList?.map((data) => {
                            return (
                                <MenuItem value={data?.id} key={data?.id} >{data?.location}</MenuItem>
                            )
                        })}
                </Select>
            </FormControl>
            <Button onClick={handleFormSubmit}>Next</Button>
            </Box>
            {errorMessage && <Typography sx={{color:'red',width:'100%',alignItems:'center'}}>{errorMessage}</Typography>}
        </Box>
    )
}

export default UserContactInfo;