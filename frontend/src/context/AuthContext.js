import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);  
                setCurrentUser(decoded);
            } catch (error) {
                console.error("Failed to decode JWT:", error);
            }
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('userToken');
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        setCurrentUser,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
