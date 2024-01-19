import { useEffect, useState } from "react";
import { useMainContext } from "../../components/MainContext";

import classes from "./style.module.scss";
import LoginComponent from "./component/Login";
import RegisterComponent from "./component/Register";


export default function Login() {
    const [isLoginPage, setIsLoginPage] = useState(true);

    const { setPage } = useMainContext();

    function changePage() {
        setIsLoginPage(prevVal => !prevVal);
    }

    useEffect(() => {
        setPage("Login");
    }, []);

    return (
        <div className={classes.mainContainer}>
            {isLoginPage ?
                <LoginComponent changePage={changePage} />
                :
                <RegisterComponent changePage={changePage} />
            }
        </div>
    );
}