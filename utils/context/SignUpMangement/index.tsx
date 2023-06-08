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
import { verify } from "crypto";
import UserContactInfo from "@/components/SignUp/UserContactInfo";
import UxThankYou from "@/components/SignUp/UxThankYou";
import PartnerThankYou from "@/components/SignUp/ParterThankYou";


interface AuthState {
    verifyEmail: () => Promise<any>
    userName: string,
    name: string,
    handleUserNameSubmit: () => void;
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
    submitUxHandleInfo: () => Promise<any>
    registerUser: () => Promise<any>,
    passwordValidationMessage: string,
    locationId : string,
}

interface AuthActions {
    setState: React.Dispatch<React.SetStateAction<AuthState>>;
}

const initialState: AuthState = {
    verifyEmail: () => Promise.resolve(null),
    userName: '',
    name: '',
    handleUserNameSubmit: () => { },
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
    submitUxHandleInfo: () => Promise.resolve(null),
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

    const [state, setState] = useReducer(reducer, initialState);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: ''
    });

    const verifyEmail = useCallback(async () => {
        if (!state?.userName) {
            setState({
                emailValidationMessage: validateEmail(state?.userName)
            })
        }
        else {
            try {
                const response = await fetch(`${BaseUrl}/auth/verify_email_exists`, {
                    method: "POST",
                    body: JSON.stringify({ email: state?.userName }),
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
        }
    }, [state?.userName]);

    const handleUserNameSubmit = useCallback(() => {
        if (!state?.name) {
            setState(prevState => ({
                ...prevState,
                nameValidationMessage: state?.name.trim() === '' ? 'Name is required' : ''
            }));
        }
        else {
            setState(prevState => ({
                ...prevState,
                activePage: 3,
            }));
        }
    }, [state?.name])

    const submitUxHandleInfo = useCallback(async () => {
        if (!state?.uxHandle) {
            setState(prevState => ({
                ...prevState,
                uxHandleValidationMessage: state?.uxHandle.trim() === '' ? 'Ux handle  is required' : '',
            }));
        }
        else {
            try {
                const response = await fetch(`${BaseUrl}/auth/verify_ux_handle_exists`, {
                    method: "POST",
                    body: JSON.stringify({ uxHandle: state?.uxHandle }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    const res = await response.json();
                    if (res?.data?.doesUxHandleExists) {
                        setSnackbar({
                            open: true,
                            message: 'Email alredy exist'
                        })
                    }
                    else {
                        setState(prevState => ({
                            ...prevState,
                            activePage: 6,
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
        }
    }, [state?.uxHandle]);

    const validatePassword = useCallback(() => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{6}$/;
        const isValid = regex.test(state?.password);
        return isValid;
    }, [state?.password])

    const registerUser = useCallback(async () => {
        const isPasswordValid = validatePassword();
        debugger;
        if (isPasswordValid) {
            if (state?.password != state?.confirmPassword) {
                setState(prevState => ({
                    ...prevState,
                    passwordValidationMessage: 'Password and Confirm password do not match',
                }));
            }
            else if (isPasswordValid && state?.password === state?.confirmPassword) {
                setState(prevState => ({
                    ...prevState,
                    passwordValidationMessage: '',
                }));
                try {
                    const data = registerUserPayload();
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
            }
        }
        else if (!isPasswordValid) {
            setState(prevState => ({
                ...prevState,
                passwordValidationMessage: 'Enter a 6 character password with capital letters, numbers and symbols.',
            }));
        }
    }, [state?.password,state?.confirmPassword])

    const signInWithCustomToken = useCallback(async(token:string)=>{
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAMCnjXuFQFC9_aKco_RusdDR-CVE4byNg`, {
                method: "POST",
                body: JSON.stringify({
                    returnSecureToken: true,
                    token: token,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const res = await response.json();
                localStorage.setItem('authToken',res?.idToken);
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
        }
        catch (e) {
            setSnackbar({
                open: true,
                message: 'error occoured'
            })
        }
    },[])


    const registerUserPayload = useCallback(() => {
        const payload = state?.isUserTypeExist ? {
            name: state?.name,
            email: state?.userName,
            password: state?.password,
            uxHandle: state?.uxHandle,
            profileImageId: "",
            userType: state?.userType,
            isUserTypeExist: state?.isUserTypeExist,
            locationId: state?.locationId
        } : {
            name: state?.name,
            email: state?.userName,
            password: state?.password,
            uxHandle: state?.uxHandle,
            profileImageId: "",
            isUserTypeExist: false,
            CategoriesIds: state?.categoriesId,
            locationId: state?.locationId
        }
        return payload;
    }, [state])
   
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

    console.log(state,"testttt")
    return (
        <>
            <SignUpManagementContext.Provider value={value}>
                {children}
                {state?.activePage === 1 && <SignUp />}
                {state?.activePage === 2 && <UserInfo />}
                {state?.activePage === 3 && <UserContactInfo />}
                {state?.activePage === 4 && <UserCategories />}
                {state?.activePage === 5 && <ClaimUxHandle />}
                {state?.activePage === 6 && <UserPassword />}
                {state?.activePage === 7 && state?.isUserTypeExist && <PartnerThankYou/>}
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