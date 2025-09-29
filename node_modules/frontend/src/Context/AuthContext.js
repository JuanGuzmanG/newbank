import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Propiedad derivada para indicar si hay usuario autenticado
    const isAuthenticated = !!user;

    const login = async (email, password) => {
        const res = await fetch("http://localhost:3001/api/auth/ingreso",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password}),
        });
        const data = await res.json();
        if(res.ok){
            setUser(data.user);
            setToken(data.token);
        } else {
            throw new Error(data.error || "Login failed");
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, setUser, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}
