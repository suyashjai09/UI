import SignUp from "@/components/LandingPage/SignUp";
import UserInfo from "@/components/LandingPage/SignUp/UserInfo";
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
import UserCategories from "@/components/LandingPage/SignUp/UserCategories";


interface AuthState {
    verifyEmail: () => Promise<any>
    userName: String,
    name: String,
    // handleEmailChange: (name: string) => Promise<any>,
    // handleUserInfoChange: (name: string,value:string) => Promise<any>,
    handleUserNameSubmit: () => void;
    emailValidationMessage: String,
    nameValidationMessage: String,
    categoriesId : Array<String>,
    isUserTypeExist: Boolean,
    userType: String,
}

interface AuthActions {
    setState: React.Dispatch<React.SetStateAction<AuthState>>;
  }

const initialState: AuthState = {
    verifyEmail: () => Promise.resolve(null),
    userName: '',
    name: '',
    // handleEmailChange: (name) => Promise.resolve(null),
    // handleUserInfoChange: (name,value) => Promise.resolve(null),
    handleUserNameSubmit: () => {},
    emailValidationMessage: '',
    nameValidationMessage: '',
    categoriesId : [],
    isUserTypeExist: false,
    userType: '',
}

const initialActions: AuthActions = {
    setState: () => {},
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

// const reducer = (state: AuthState, action: Partial<AuthState>): AuthState => ({
//     ...state,
//     ...action,
//   });


//   const reducer = (state: AuthState, action: Partial<AuthState>) => ({
//     ...state,
//     ...action,
//   });
// const SignUpManagementContext = createContext<AuthState>(initialState);
// const simpleReducer = (state: any, payload: any) => ({ ...state, ...payload });
const SignUpManagementProvider = ({ children }: any) => {

    // const [state, setState] = useReducer(simpleReducer, initialState);
    // const [state, dispatch] = useReducer(reducer, initialState);
    const [state, setState] = useReducer(reducer, initialState);
    const [activePage, setActivePage] = useState(4);
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
                        setActivePage(2);
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

    const handleUserNameSubmit = useCallback(()=>{
        if (!state?.name) {
            setState({
                nameValidationMessage: state?.name.trim() ===''?'Name is required':''
            })
        }
        else {
            setActivePage(4);
        }
    },[state?.name])

    

    

    // const handleEmailChange = useCallback((username: String) => {
    //     setState({
    //         userName: username,
    //         emailValidationMessage: validateEmail(username)
    //     })
    // }, [])

    // const handleUserInfoChange = useCallback((name: String,value: String) => {
    //     switch(name){
    //         case 'Email':
    //             setState({
    //                 userName: value,
    //                 emailValidationMessage: validateEmail(value)
    //             })
    //             break;
    //         case 'Name':
    //             setState({
    //                 name: value,
    //                 nameValidationMessage: value.trim() ===''?'Name is required':''
    //             })
    //             break;
    //         case 'Categories':
    //             setState({
    //                 categoriesId : [],
    //                 isPartner : false,
    //             })
    //             break;
    //     }
    // }, [])

    // console.log(state, "testtt",activePage)
    const value = useMemo(
        () => ({
            ...state,
            verifyEmail,
            // handleEmailChange,
            // handleUserInfoChange,
            handleUserNameSubmit,
            setState,
        }),
        [
            state,
            verifyEmail,
            // handleEmailChange,
            // handleUserInfoChange,
            handleUserNameSubmit,
            setState,
        ]
    );

    //console.log(state,"testttt")
    return (
        <>
            <SignUpManagementContext.Provider value={value}>
                {children}
                {activePage === 1 && <SignUp />}
                {activePage === 2 && <UserInfo />}
                {activePage === 4  && <UserCategories/>}
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