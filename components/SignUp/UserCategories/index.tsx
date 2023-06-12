import { useCallback, useEffect, useState } from "react";
import { BaseUrl } from "@/constant";
import { Box, Button, Divider, Grid, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useSignUpManagement } from "@/utils/context/SignUpMangement";
import { colors } from "@/utils/theme";
interface SomeInterface {
    id: string;
    name: string;
    shortHandle: string;
}

const UserCategories = () => {

    const [categories, setCategories] = useState<SomeInterface[]>([]);
    const [radioButtonValue, setRadioButtonValue] = useState('');
    const [selectedIndustries, setIndustries] = useState<string[]>([])
    const [errorMessage, setErrorMessage] = useState('');
    const { setState } = useSignUpManagement();

    const userType = [
        'Recruitment',
        'Corporate',
        'Partnership',
        'Authors/Creators',
    ]

    const getCategories = useCallback(async () => {
        try {
            const response = await fetch(`${BaseUrl}/categories`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const res = await response.json();
                setCategories(res?.data);
            }
        }
        catch (e) {

        }

    }, []);

    const handleIndustries = useCallback((id: string) => {
        setRadioButtonValue('');
        setErrorMessage('');
        if (selectedIndustries.includes(id)) {
            setIndustries(
                selectedIndustries.filter((itemId) => itemId !== id)
            );
        } else {
            setIndustries([...selectedIndustries, id]);
        }
    }, [selectedIndustries])

    const handleRadioButton = useCallback((e: any) => {
        setIndustries([]);
        setErrorMessage('');
        if (e.target.value === radioButtonValue) {
            setRadioButtonValue("");
        } else {
            setRadioButtonValue(e.target.value);
        }
    }, [])

    const handleUserCategoryChange = useCallback(() => {
        if (selectedIndustries.length === 0 && radioButtonValue.length === 0) {
            setErrorMessage('Select any field');
        }
        else {
            setState(prevState => ({
                ...prevState,
                categoriesId: selectedIndustries,
                isUserTypeExist: selectedIndustries.length === 0 ? true : false,
                userType: radioButtonValue,
                activePage: 5,
            }));
        }

    }, [selectedIndustries, radioButtonValue])


    useEffect(() => {
        getCategories()
    }, [])


    return (
        <Stack
            sx={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                gap: '24px',
                m: '0 auto',
                padding: '8px 0px',
                overflow: 'auto'
            }}>
            <Grid container
                justifyContent={'center'}
                width="750px"
                rowGap={2}
            >
                {categories?.map((data) => {
                    return (
                        <Grid item xs={6} key={data?.id}>
                            <FormControlLabel label={`${data?.name} (${data?.shortHandle})`}
                                control={
                                    <Checkbox
                                        checked={selectedIndustries.includes(data?.id)}
                                        onClick={() => {
                                            handleIndustries(data?.id);
                                        }}
                                    />} />
                        </Grid>
                    )
                })}
            </Grid>
            <Divider sx={{
                color: '#757575',
                width: '800px',
                borderBottomWidth: '2px',
                my: 2,
            }} />
                <RadioGroup value={radioButtonValue}
                    onChange={handleRadioButton}>
                    <Grid container
                        justifyContent={'center'}
                        width="750px"
                        rowGap={2}
                    >
                    {userType?.map((data, index) => {
                        return (
                            <Grid item xs={6} key={index}>
                                <FormControlLabel label={data}
                                    control={
                                        <Radio
                                            onClick={handleRadioButton}
                                            value={data?.toLowerCase()}
                                        />} />
                            </Grid>
                        )
                    })}
                    </Grid>
                </RadioGroup>
            <Button sx={{
                width: '156px',
                height: '60px',
                backgroundColor: colors.primaryButton,
                border: 'none',
                textTransform: 'none',
                color: colors.primaryButtonText,
                fontSize: '24px',
                fontWeight: '700',
                '&:hover': {
                    backgroundColor: colors.primaryButton,
                },
            }} onClick={handleUserCategoryChange}>Next</Button>
            {errorMessage && <Typography sx={{ color: 'red', width: '100%', alignItems: 'center' }}>{errorMessage}</Typography>}
        </Stack>
    )
}

export default UserCategories;