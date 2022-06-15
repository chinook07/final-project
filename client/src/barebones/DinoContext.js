import { createContext, useState, useEffect } from "react";

export const DinoContext = createContext();

const DinoContextProvider = ({ children }) => {

    // Create the states needed.

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [assets, setAssets] = useState([]);
    const [ready, setReady] = useState(false);
    const [update, setUpdate] = useState(0);

    // Get the info about all animals, and update it everytime the update state changes.

    useEffect(() => {
        fetch("/api/get-exhibits")
            .then(res => res.json())
            .then(data => setAssets(data.assets))
            .then(() => setReady(true))
        .catch(err => console.log(err))
    }, [update])

    return (
        <DinoContext.Provider
            value={{
                user,
                setUser,
                assets,
                setAssets,
                ready,
                setReady,
                update,
                setUpdate
            }}
        >
            {children}
        </DinoContext.Provider>
    )
}

export default DinoContextProvider;