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


interface AuthState {
    signIn: (email:string,password:string) => Promise<any>
    // signOut: () => void
    signOut: () => Promise<any>
    authFetch: (...arg: any)=>Promise<any>
    authToken : null | string  ,
    getFireBaseToken : (token:string) => Promise<any>
}


const initialState: AuthState = {
    signIn: (email:string,password:string) => Promise.resolve(null),
    // signOut: () => {},
    signOut: () => Promise.resolve(null),
    authFetch: (...arg: any)=>Promise.resolve(null),
    authToken: null,
    getFireBaseToken : (token:string) => Promise.resolve(null),
}


const AuthContext = createContext<AuthState>(initialState);

const reducer = (state: any, payload: any) => ({ ...state, ...payload });

const AuthContextProvider = ({ children }: any) => {

    const router = useRouter();

    const [state, setState] = useReducer(reducer, initialState);

    useEffect(() => {
        switch (state.authToken) {
            case "loading":
                return;
            case null:
                if (!(router.pathname === "/signin" ||router.pathname === "/signup" )) {
                    router.replace("/signup");
                }
                break;
            default:
                if (
                    router.pathname === "/signin" ||
                    router.pathname === "/signup" || router.pathname === "/"
                ) {
                    router.replace("/dashboard");
                }
                break;
        }
    }, [router.pathname, state.authToken]);

    const getFireBaseToken = useCallback(async(token:string)=>{
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
                return true;
            }
            else {
               return false
            }
        }
        catch (e) {
            return false;
        }
    },[])

    const signIn = useCallback(async(email:string,password:string)=>{
        try {
            const response = await fetch(`${BaseUrl}/auth/login`, {
                method: "POST",
                body: JSON.stringify({
                    email:email,
                    password:password,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const res = await response.json();
                if(await getFireBaseToken(res?.data?.customToken)) 
                router.push('/dashboard');
            }
            else {
              
            }
        }
        catch (e) {
            console.log(e,"error while loggin")
        }
    },[])
    
    const value = useMemo(
        () => ({
            ...state, 
            signIn,
            getFireBaseToken,        
        }),
        [
            state,
            signIn,
            getFireBaseToken,      
        ]
    );

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    )

}
export { AuthContext, AuthContextProvider };

export const useAuth = () => useContext(AuthContext);