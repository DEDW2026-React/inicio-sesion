import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("authToken"))

    function login(token) {
        setToken(token)
        localStorage.setItem("authToken", token)
    }

    console.log(token)

    return (
        <AuthContext.Provider value={{token, login}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
