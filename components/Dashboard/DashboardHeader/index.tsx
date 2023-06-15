import { Box, Stack, Typography, Button, CircularProgress } from "@mui/material"
import { colors } from "@/utils/theme";
import { useAuth } from "@/utils/context/AuthContext";

const DashboardHeader = () => {
    const {signOut,loading} = useAuth();
    return (
        <Box>
            <Stack sx={{ backgroundColor: colors?.primaryBackground, height: '400px', padding: '32px' }} direction={"column"} spacing={4}>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Typography variant="h1">UX</Typography>
                    <Typography variant="h1">Join the UX community !!!</Typography>
                    <Stack>
                        <Button   variant="contained" color="primary" sx={{
                            width: '156px',
                            height: '60px',
                            // backgroundColor: colors.primaryButton,
                            border: 'none',
                            textTransform: 'none',
                            // color: colors.primaryButtonText,
                            fontSize: '24px',
                            fontWeight: '700',
                            // '&:hover': {
                            //     backgroundColor: colors.primaryButton,
                            // },
                        }}
                        onClick={signOut}
                        >{loading?<CircularProgress/>:"LogOut"}</Button>
                    </Stack>
                </Stack>
                <Stack direction="column" spacing={2} justifyContent="space-between">
                    <Stack>
                        <Typography variant="h4">My Home</Typography>
                    </Stack>
                    <Stack>
                        <Typography variant="h1">Discover what’s on UX.com.au today. All the latest UX, in one place. Catch-up on the latest posts, popular groups and new resources.</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}
export default DashboardHeader;