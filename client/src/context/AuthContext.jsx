import { createContext, useCallback, useEffect, useState } from 'react';
import { baseUrl, postRegister } from '../../utils/services';
import getTokenFromLocalStorage from '../../utils/getToken';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setISRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setISLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });
    console.log("USers",user)
    useEffect(() => {
        const user = localStorage.getItem("User");
        setUser(JSON.parse(user));
    },[])
    
    const updateRegisterInfo = useCallback((info) => {  
        setRegisterInfo(info)
    },[])
    const updateLoginInfo = useCallback((info) => {  
        setLoginInfo(info)
    },[])
    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setISRegisterLoading(true);
        setRegisterError(null);
        const response = await postRegister(`${baseUrl}/users/register`,JSON.stringify(registerInfo));
        setISRegisterLoading(false);
        if(response.error){
            return setRegisterError(response);
        }
        localStorage.setItem("User",JSON.stringify(response));
        setUser(response);

    },[registerInfo])
    const loginUser = useCallback(async (e) => {
        e.preventDefault();
        setISLoginLoading(true);
        setLoginError(null);
        const response = await postRegister(`${baseUrl}/users/login`,JSON.stringify(loginInfo));
        setISLoginLoading(false);
        if(response.error){
            return setLoginError(response);
        }
        localStorage.setItem("User",JSON.stringify(response));
        setUser(response);
    },[loginInfo])
    const logoutUser = useCallback(() => {
        localStorage.removeItem("User");
        setUser(null);
    },[])
    return (
        <AuthContext.Provider 
        value={{
            user,
            registerInfo,
            updateRegisterInfo,
            registerUser,
            loginInfo,
            updateLoginInfo,
            loginUser,
            registerError,
            loginError,
            logoutUser,
        }}>
        {children}
    </AuthContext.Provider>
);
}
