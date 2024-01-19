import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, SwipeableDrawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

import { useMainContext } from "../MainContext";

import classes from "./style.module.scss";

export default function NavBar() {
    const [anchorEl, setAnchorEl] = useState(false);

    const { page, mainData, setMainData } = useMainContext();
    const navigate = useNavigate();

    function changePage(path) {
        setAnchorEl(false);
        navigate(`${path}`);
    }
    function checkPage() {
        return (page != "Login");
    }
    function logout() {
        localStorage.removeItem("user");
        setMainData(null);
        navigate("/login");
    }

    useEffect(() => {
        if (mainData?.id) {
            navigate("/");
        }
    }, [page]);

    return (
        checkPage() && <AppBar position="fixed">
            <Toolbar className={classes.navBar}>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => setAnchorEl(prevVal => !prevVal)}
                >
                    <Menu />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {mainData?.name}
                </Typography>
            </Toolbar>
            <SwipeableDrawer
                anchor={"left"}
                open={anchorEl}
                onClose={() => setAnchorEl(false)}
                onOpen={() => setAnchorEl(true)}
            >
                <List className={classes.swipeMenu}>
                    <ListItem disablePadding className={classes.swipeMenuChildren + " " + ((page === "Home") ? classes.swipeMenuChildrenActive : "")}>
                        <ListItemButton className={classes.swipeMenuButton} onClick={() => changePage("/")}>
                            <ListItemIcon>
                                <div className={classes.icon}>
                                    <HomeIcon />
                                </div>
                            </ListItemIcon>
                            <ListItemText primary={"Home"} className={classes.text} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding className={classes.swipeMenuChildren + " " + ((page === "Home") ? classes.swipeMenuChildrenActive : "")}>
                        <ListItemButton className={classes.swipeMenuButton} onClick={() => logout()}>
                            <ListItemIcon>
                                <div className={classes.icon}>
                                    <LogoutIcon />
                                </div>
                            </ListItemIcon>
                            <ListItemText primary={"Logout"} className={classes.text} />
                        </ListItemButton>

                    </ListItem>
                </List>
            </SwipeableDrawer>
        </AppBar>
    )
}