import { useState } from "react";
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import classes from "./style.module.scss";
import { callApiLocal } from "../../../domain/api";
import { useMessage } from "../../../components/AlertPopup";
import { emailRegex } from "../../../constants";

const defaultFormData = {
    email: "",
    password: "",
    name: ""
}

export default function RegisterComponent({ changePage }) {
    const [formData, setFormData] = useState(defaultFormData);
    const [isSendData, setIsSendData] = useState(false);

    const { showMessage } = useMessage();

    async function registUrs() {
        if (formData.email === "" || formData.password === "" || formData.name === "") {
            showMessage("Please enter all valid email, password, and name!", "warning");
            return;
        } else if (!emailRegex.test(formData.email)) {
            showMessage("Please enter a valid email!", "warning");
            return;
        } else if (formData.password.length < 6) {
            showMessage("Password must be 6 characters minimum!", "warning");
            return;
        } else if (formData.name.length < 5) {
            showMessage("Name must be 5 characters minimum!", "warning");
            return;
        }

        setIsSendData(true);
        try {
            await callApiLocal("/users", "POST", {}, {}, { email: formData.email, password: formData.password, name: formData.name });
            showMessage("Registered! Please login.", "success");
            changePage();
            
        } catch (error) {
            showMessage(error.message, "error");
        }
        setIsSendData(false);
    }

    return (
        <FormControl className={classes.innerContainer}>
            <FormLabel className={classes.title}>Register</FormLabel>
            <FormHelperText>Please input your information</FormHelperText>
            <div className={classes.formFields}>
                <TextField
                    id="name"
                    label="Full Name"
                    value={formData.name}
                    type="text"
                    onChange={(e) => setFormData(prevVal => ({...prevVal, name: e.target.value}))}
                    fullWidth
                    className={classes.fields}
                />
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
                <a onClick={changePage} className={classes.link}>Already registered? Login here.</a>
                <Button variant="contained" className={classes.button} onClick={registUrs} disabled={isSendData}>
                    Register
                </Button>
            </div>
        </FormControl>
    );
}