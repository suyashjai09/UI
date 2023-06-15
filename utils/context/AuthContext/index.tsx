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
import { Router, useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { useSignUpManagement } from "../SignUpMangement";
import { useSearchParams } from 'next/navigation'


interface AuthState {
    signIn: (email: string, password: string) => Promise<any>
    signOut: () => void
    authFetch: (...arg: any) => Promise<any>
    authToken: null | string,
    getFireBaseToken: (token: string) => Promise<any>,
    loading: Boolean,
}


const initialState: AuthState = {
    signIn: (email: string, password: string) => Promise.resolve(null),
    signOut: () => { },
    authFetch: (...arg: any) => Promise.resolve(null),
    authToken: 'loading',
    getFireBaseToken: (token: string) => Promise.resolve(null),
    loading: false,
}


const AuthContext = createContext<AuthState>(initialState);

const reducer = (state: AuthState, action: Partial<AuthState> | ((prevState: AuthState) => AuthState)) => {

    return {
        ...state,
        ...action,
    };
};

// const reducer = (state: <AuthState>, payload: any) => ({ ...state, ...payload });

const AuthContextProvider = ({ children }: any) => {

    const router = useRouter();

    const [authState, setAuthState] = useReducer(reducer, initialState);

    const [loading, setLoading] = useState<Boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        try {
            if (token) {
                // setAuthState(prev => ({
                //     ...prev,
                //     authToken: token
                // }))
                setAuthState({
                    ...authState,
                    authToken: token
                })
            }
            else {
                // setAuthState(prev => ({
                //     ...prev,
                //     authToken: null
                // }))
                setAuthState({
                    ...authState,
                    authToken: null
                })
            }
        }
        catch (e) {
            setAuthState({
                ...authState,
                authToken: null
            })
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [routingDecided, setRouting] = useState(false)

    useEffect(() => {
        if (authState.authToken === 'loading') {
            return
        }
        switch (authState.authToken) {
            case null:
                if (!(router.pathname === "/signin" || router.pathname === "/signup")) {
                    router.push("/signup");
                }
                break;
            default:       
                if (
                    router.pathname === "/signin" ||
                    router.pathname === "/signup" || router.pathname === "/"
                ) {
                    router.push("/dashboard");
                }
                break;
        }
        setRouting(true)
    }, [router, authState.authToken]);

    const getFireBaseToken = useCallback(async (token: string) => {
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
                localStorage.setItem("authToken", res?.idToken);
                setAuthState({
                    ...authState,
                    authToken: res?.idToken
                })
                return true;
            }
            else {
                return false
            }
        }
        catch (e) {
            return false;
        }
    }, [authState])

    const signIn = useCallback(async (email: string, password: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${BaseUrl}/auth/login`, {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const res = await response.json();
                await getFireBaseToken(res?.data?.customToken)
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
        finally {
            setLoading(false);
        }
    }, [getFireBaseToken])

    const signOut = useCallback(() => {
        setLoading(true);
        localStorage.removeItem("authToken");
        setAuthState({
            ...authState,
            authToken: null
        })
        setLoading(false);
    }, [authState])

    

    const value = useMemo(
        () => ({
            ...authState,
            signIn,
            signOut,
            getFireBaseToken,
            loading,
        }),
        [
            authState,
            signIn,
            signOut,
            getFireBaseToken,
            loading
        ]
    );

    return (
        <>
            <AuthContext.Provider value={value}>
                <ProtectedRoutesRenderer token={authState.authToken}>
                    {(authState.authToken === 'loading' || !routingDecided) ? <CircularProgress /> : children}
                </ProtectedRoutesRenderer>
            </AuthContext.Provider>
        </>
    )

}
export { AuthContext, AuthContextProvider };

export const useAuth = () => useContext(AuthContext);


const protectedRoutes = [
    '/dashboard'
]
function ProtectedRoutesRenderer({ children, token }: any) {
    const router = useRouter()
    if (protectedRoutes.includes(router.pathname) && token === null) {
        return <CircularProgress />
    }
    return (
        <>
            {children}
        </>
    )
}