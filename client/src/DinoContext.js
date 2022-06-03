import { createContext, useState } from "react";

export const DinoContext = createContext();

const DinoContextProvider = ({ children }) => {

    const [user, setUser] = useState();

    return (
        <DinoContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </DinoContext.Provider>
    )
}

export default DinoContextProvider;