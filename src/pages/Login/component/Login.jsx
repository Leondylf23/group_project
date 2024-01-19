import { useState } from "react";
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate } from "react-router-dom";

import { useMessage } from "../../../components/AlertPopup";
import { callApiLocal } from "../../../domain/api";
import { useMainContext } from "../../../components/MainContext";

import classes from "./style.module.scss";

const defaultFormData = {
    email: "",
    password: ""
}


export default function LoginComponent({changePage}) {
    const [formData, setFormData] = useState(defaultFormData);
    const [isSendingData, setIsSendingData] = useState(false);

    const {showMessage} = useMessage();
    const {setMainData} = useMainContext();
    const navigate = useNavigate();
    
    async function loginUsr() {
        if(formData.email === "" || formData.password === "") {
            showMessage("Please enter valid email and password!", "warning");
            return;
        }
        setIsSendingData(true);
        try {
            const userData = await callApiLocal("/users", "GET", {}, {email: formData.email, password: formData.password});
            if(userData?.length > 0) {
                setMainData(userData[0]);
                localStorage.setItem("user", JSON.stringify({name: userData[0].name, id: userData[0].id}));
                navigate("/");
            } else {
                throw new Error("Email or Password is not match!")
            }
        } catch (error) {
            showMessage(error.message, "error");
        }
        setIsSendingData(false);
    }

    return (
        <FormControl className={classes.innerContainer}>
            <FormLabel className={classes.title}>Login</FormLabel>
            <FormHelperText>Please input your login credential</FormHelperText>
            <div className={classes.formFields}>
                <TextField
                    id="email"
                    label="Email"
                    value={formData.email}
                    type="email"
                    variant="outlined"
                    onChange={(e) => setFormData(prevVal => ({...prevVal, email: e.target.value}))}
                    fullWidth
                    className={classes.fields}
                />
                <TextField
                    id="pass"
                    label="Password"
                    value={formData.password}
                    type="password"
                    onChange={(e) => setFormData(prevVal => ({...prevVal, password: e.target.value}))}
                    fullWidth
                    className={classes.fields}
                />
                <a onClick={changePage} className={classes.link}>Not registered? Register here.</a>
                <Button variant="contained" className={classes.button} onClick={loginUsr} disabled={isSendingData}>
                    Login
                </Button>
            </div>
        </FormControl>
    );
}