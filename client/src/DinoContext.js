import { createContext, useState, useEffect } from "react";
import Spinner from "./littleComponents/Spinner";

export const DinoContext = createContext();

const DinoContextProvider = ({ children }) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [assets, setAssets] = useState([]);
    const [ready, setReady] = useState(false);
    const [update, setUpdate] = useState(0);

    useEffect(() => {
        fetch("/api/get-exhibits")
            .then(res => res.json())
            .then(data => setAssets(data.assets))
            .then(() => setReady(true))
        .catch(err => console.log(err))
    }, [update])

    // if (ready) {
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
     // else {
    //     return (
    //         <Spinner/>
    //     )
        
    // }

}

export default DinoContextProvider;