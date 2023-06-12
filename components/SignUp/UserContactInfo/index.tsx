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

    const { setState, ...state } = useSignUpManagement();
    const [userLocationList, setUserLocationList] = useState<UserLocation[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

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
                console.log(res?.data, "api-hit")
            }
        }
        catch (e) {
            console.log(e)
        }

    }, []);

    const handleChange = useCallback((e: any) => {
        setState(prevState => ({
            ...prevState,
            locationId: e.target.value
        }));
        setErrorMessage('');
    }, [])


    // function handleFOrmValueChange(key, value){
    //     setState(prev => ({
    //         ...prev,
    //         [key]: value
    //     }))
    // }

    // handleFOrmValueChange('firstName', e.target.value)

    useEffect(() => {
        getUserLocation();
    }, []);

    const handleFormSubmit = useCallback(() => {
        if (state?.locationId === '') {
            setErrorMessage('Location field is required')
        }
        else {
            setState(prevState => ({
                ...prevState,
                activePage: 4,
            }));
        }
    }, [state?.locationId])


    return (
        <Box sx={{ display: 'flex', gap: '32px', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h1'>Your phone number and city</Typography>
            <Box sx={{ display: 'flex', gap: '16px' }}>
                <FormControl>
                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={"+61"}
                        label=""
                        placeholder="+61"
                        sx={{
                            '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select': {
                                height: '42px',
                                width: '40px',
                                display: 'flex',
                                alignItems: 'center'
                            }
                        }}
                    // onChange={handleChange}
                    >
                        <MenuItem value={"+61"}>+61</MenuItem>
                        {/* <MenuItem value={+91}>+91</MenuItem> */}
                        {/* <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                </FormControl>
                <TextField id="outlined-basic" label="" placeholder="Phone number is optional " variant="outlined" />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Select your closest city</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state?.locationId}
                        // label="Select your closest city"
                        // placeholder="Select your closest city"
                        onChange={handleChange}
                        sx={{
                            '& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                                height: '42px',
                                width: '480px',
                                display: 'flex',
                                alignItems: 'center'
                            }
                        }}
                    >
                        {userLocationList?.map((data) => {
                            return (
                                <MenuItem value={data?.id} key={data?.id} >{data?.location}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>

            </Box>
            <Button sx={{
                width: '156px',
                height: '60px',
                backgroundColor: 'grey',
                border: 'none',
                textTransform: 'none',
                color: '#000',
                fontSize: '24px',
                fontWeight: '700',
                '&:hover': {
                    backgroundColor: 'grey',
                },
            }} onClick={handleFormSubmit}>Next</Button>
            {errorMessage && <Typography sx={{ color: 'red', width: '100%', alignItems: 'center',textAlign:'center' }}>{errorMessage}</Typography>}
        </Box>
    )
}

export default UserContactInfo;