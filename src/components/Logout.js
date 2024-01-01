import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthAPI } from "../requests/AuthApi";

const Logout = () => {
    
    const [loggedOut, setLoggedOut] = useState(null);
    
    const location = useLocation();

    useEffect(() => {
        AuthAPI.logout(localStorage.getItem('token'), (response) => {
            setLoggedOut(response);
        });
    }, []);

    if(loggedOut !== null) {
        if(loggedOut) {
            localStorage.removeItem('token');
            localStorage.removeItem('admin');
            localStorage.removeItem('username');
        
            return <Navigate to="/login" replace state={{ from: location }} />;
        } else {
            console.log('Logout failed!');
            return <Navigate to="/projects" replace state={{ from: location }} />;
        }
    }
}

export default Logout;