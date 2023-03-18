import { useState, createContext } from "react";

export const NeovetContext = createContext();

const NeovetContextProvider = ({children}) => {

    /*const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        const initialValue = JSON.parse(savedUser);
        return initialValue || null;
    })*/

    const [jwt, setJwt ] = useState(() => {
        const savedJwt = localStorage.getItem("token");
        return savedJwt || null;
    });

    const logout = () => {
        setUser(null);
        setJwt(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    const login = ( resToken) => {
        //setUser(resUser);
        setJwt(resToken);
        //localStorage.setItem("user", JSON.stringify(resUser))
        localStorage.setItem("token", resToken)
    }

    return <NeovetContext.Provider value={{ jwt, logout, login, setJwt}}>
        {children}
    </NeovetContext.Provider>

}

export default NeovetContextProvider;