import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const auth = localStorage.getItem("currentUser");
        if(auth) setUser(JSON.parse(auth));
    }, [])

    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;

