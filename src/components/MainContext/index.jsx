import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const MainProvider = createContext();

function MainContext({children}) {
    const [mainData, setMainData] = useState(null);
    const [page, setPage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const localUserData = localStorage.getItem("user");

        if(localUserData) {
            setMainData(JSON.parse(localUserData));
        } else {
            navigate("/login");
        }
    }, []);

    return(
        <MainProvider.Provider value={{mainData, setMainData, page, setPage}}>
            {children}
        </MainProvider.Provider>
    );
}

function useMainContext() {
    const context = useContext(MainProvider);

    if(!context) {
        throw new Error("The context is not in MainContext Element");
    }

    return context;
}

export {MainContext, useMainContext};