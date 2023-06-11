import SignUp from "@/components/SignUp";
import UserInfo from "@/components/SignUp/UserInfo";
import { BaseUrl } from "@/constant";
import React, {
    createContext,
    useState,
    useContext,
    useMemo,
    useCallback,
    useReducer,
    useEffect,
} from "react";
import { Snackbar } from "@mui/material";
import validateEmail from "@/utils/validateEmail";
import UserCategories from "@/components/SignUp/UserCategories";
import ClaimUxHandle from "@/components/SignUp/ClaimUxHandle";
import UserPassword from "@/components/SignUp/UserPassword";
import UserContactInfo from "@/components/SignUp/UserContactInfo";
import UxThankYou from "@/components/SignUp/UxThankYou";
import PartnerThankYou from "@/components/SignUp/ParterThankYou";
import LandingPage from "@/components/LandingPage";
import { useAuth } from "../AuthContext";


interface AuthState {
    verifyEmail: (email: string) => Promise<any>
    userName: string,
    name: string,
    handleUserNameSubmit: (name: string) => void;
    emailValidationMessage: string,
    nameValidationMessage: string,
    uxHandleValidationMessage: string,
    categoriesId: Array<string>,
    isUserTypeExist: Boolean,
    userType: string,
    activePage: number,
    uxHandle: string,
    password: string,
    confirmPassword: string,
    submitUxHandleInfo: (uxHandle: string) => Promise<any>
    registerUser: (password: string, confirmPassword: string) => Promise<any>,
    passwordValidationMessage: string,
    locationId: string,
}

interface AuthActions {
    setState: React.Dispatch<React.SetStateAction<AuthState>>;
}


const initialState: AuthState = {
    verifyEmail: (email: string) => Promise.resolve(null),
    userName: '',
    name: '',
    handleUserNameSubmit: (name: string) => { },
    emailValidationMessage: '',
    nameValidationMessage: '',
    uxHandleValidationMessage: '',
    categoriesId: [],
    isUserTypeExist: false,
    userType: '',
    activePage: 1,
    uxHandle: '',
    password: '',
    confirmPassword: '',
    submitUxHandleInfo: (uxHandle: string) => Promise.resolve(null),
    registerUser: () => Promise.resolve(null),
    passwordValidationMessage: '',
    locationId: '',
}

const initialActions: AuthActions = {
    setState: () => { },
};

const SignUpManagementContext = createContext<AuthState & AuthActions>({
    ...initialState,
    ...initialActions,
});

type AuthReducerAction = Partial<AuthState> | ((prevState: AuthState) => AuthState);

const reducer = (state: AuthState, action: AuthReducerAction) => {
    if (typeof action === 'function') {
        return action(state);
    }

    return {
        ...state,
        ...action,
    };
};

const SignUpManagementProvider = ({ children }: any) => {

    const { getFireBaseToken } = useAuth();
    const [state, setState] = useReducer(reducer, initialState);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: ''
    });

    const verifyEmail = useCallback(async (email: string) => {
        try {
            setState(prevState => ({
                ...prevState,
                userName: email
            }));
            const response = await fetch(`${BaseUrl}/auth/verify_email_exists`, {
                method: "POST",
                body: JSON.stringify({ email: email }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const res = await response.json();
                if (res?.data?.doesEmailExists) {
                    setSnackbar({
                        open: true,
                        message: 'Email alredy exist'
                    })
                }
                else {
                    setState(prevState => ({
                        ...prevState,
                        activePage: 2,
                    }));
                    // setActivePage(2);
                }
            }
        }
        catch (e) {
            setSnackbar({
                open: true,
                message: 'error occoured'
            })
        }
    }, []);

    const handleUserNameSubmit = useCallback((name: string) => {

        setState(prevState => ({
            ...prevState,
            name: name,
            activePage: 3,
        }));

    }, [])

    const submitUxHandleInfo = useCallback(async (uxHandle: string) => {
        try {
            setState(prevState => ({
                ...prevState,
                uxHandle: uxHandle,
            }));
            const response = await fetch(`${BaseUrl}/auth/verify_ux_handle_exists`, {
                method: "POST",
                body: JSON.stringify({ uxHandle: uxHandle }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const res = await response.json();
                if (res?.data?.doesUxHandleExists) {
                    return false;
                }
                else {

                    setState(prevState => ({
                        ...prevState,
                        activePage: 6,
                    }));
                    return true;
                    // setActivePage(2);
                }
            }
        }
        catch (e) {
            setSnackbar({
                open: true,
                message: 'error occoured'
            })
        }
    }, []);

    const registerUser = useCallback(async (password: string, confirmPassword: string) => {
        try {
            // console.log(state, "ru")
            // const data = registerUserPayload();
            const data = state?.isUserTypeExist ? {
                name: state?.name,
                email: state?.userName,
                password: password,
                uxHandle: state?.uxHandle,
                profileImageId: "",
                userType: state?.userType,
                isUserTypeExist: state?.isUserTypeExist,
                locationId: state?.locationId
            } : {
                name: state?.name,
                email: state?.userName,
                password: password,
                uxHandle: state?.uxHandle,
                profileImageId: "",
                isUserTypeExist: false,
                CategoriesIds: state?.categoriesId,
                locationId: state?.locationId
            }
            const response = await fetch(`${BaseUrl}/auth/register`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const res = await response.json();
                await signInWithCustomToken(res?.data?.customToken)
            }
            else {
                setSnackbar({
                    open: true,
                    message: 'error occoured'
                })
            }
        }
        catch (e) {
            setSnackbar({
                open: true,
                message: 'error occoured'
            })
        }
    }, [state])

    const signInWithCustomToken = useCallback(async (token: string) => {
        const response = await getFireBaseToken(token);
        if (response) {
            setState(prevState => ({
                ...prevState,
                activePage: 7,
            }));
        }
        else {
            setSnackbar({
                open: true,
                message: 'error occoured'
            })
        }
    }, [])

    // console.log(state, "testtt")

    const value = useMemo(
        () => ({
            ...state,
            verifyEmail,
            handleUserNameSubmit,
            setState,
            submitUxHandleInfo,
            registerUser,
        }),
        [
            state,
            verifyEmail,
            handleUserNameSubmit,
            setState,
            submitUxHandleInfo,
            registerUser,
        ]
    );

    return (
        <>
            <SignUpManagementContext.Provider value={value}>
                {children}
                {state?.activePage === 1 && <LandingPage />}
                {state?.activePage === 2 && <UserInfo />}
                {state?.activePage === 3 && <UserContactInfo />}
                {state?.activePage === 4 && <UserCategories />}
                {state?.activePage === 5 && <ClaimUxHandle />}
                {state?.activePage === 6 && <UserPassword />}
                {state?.activePage === 7 && state?.isUserTypeExist && <PartnerThankYou />}
                {state?.activePage === 7 && !state?.isUserTypeExist && <UxThankYou />}
                <Snackbar
                    open={snackbar?.open}
                    autoHideDuration={6000}
                    onClose={() => setSnackbar({
                        open: false,
                        message: ''
                    })}
                    message={snackbar?.message}
                // action={action}
                />
            </SignUpManagementContext.Provider>
        </>
    )

}
export { SignUpManagementContext, SignUpManagementProvider };

export const useSignUpManagement = () => useContext(SignUpManagementContext);