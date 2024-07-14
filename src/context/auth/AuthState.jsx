import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) =>{
    const [user, setUser] = userState({
        username: '',
        email: ''
    });

    useEffect(()=>{
        const storedUser = localStorage.getItem('user');

        if(storedUser !== 'undefined'){
            setUser(JSON.parse(storedUser));
        }
    },[]);

    const login = (userData) =>{
        setUser(setData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () =>{
        setUser({
            username: '',
            email: ''
        });
        localStorage.removeItem('user');
    };

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState