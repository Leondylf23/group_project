
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { createContext, useContext, useState } from "react";

import classes from "./style.module.scss";

const MessageProvider = createContext();

function AlertPopup({children}) {
    const [isShow, setIsShow] = useState(false);
    const [alertComp, setAlertComp] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);

    function* animateAlert(msg, type) {
        setAlertComp(<Alert severity={type} variant="filled" sx={{zIndex: 100}} className={classes.btm}>{msg}</Alert>);

        yield;

        setIsShow(true);

        yield;

        setIsShow(false);

        yield;

        setAlertComp(null);
    }

    function showMessage(msg, type) {
        if(timeoutId) {
            clearTimeout(timeoutId);
        }

        const animAlrt = animateAlert(msg, type);

        animAlrt.next();
        setTimeout(() => animAlrt.next(), 50);
        setTimeoutId(setTimeout(() => {
            animAlrt.next();
            setTimeout(() => animAlrt.next(), 50);
        }, 5000 ));
    }

    return (
        <MessageProvider.Provider value={{showMessage}}>
            <div className={classes.alertPoup + " " + (isShow ? classes.alertPopupShow : "")}>
                {alertComp}
            </div>
            {children}
        </MessageProvider.Provider>
    )
}

function useMessage() {
    const context = useContext(MessageProvider);

    if(!context) throw new Error("Context is required!");

    return context;
}

export { AlertPopup, useMessage }