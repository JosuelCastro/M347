import {Route, Routes, useNavigate} from "react-router-dom";
import LoginPage from "../components/pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../components/pages/HomePage";
import UserTable from "../components/pages/UserPage/UserTable";
import UserPage from "../components/pages/UserPage/UserPage";
import ItemTable from "../components/pages/ItemPage/ItemTable";
import ItemPage from "../components/pages/ItemPage/ItemPage";
import authorities from "../config/Authorities";
import ProfilePage from "../components/pages/ProfilePage";
import Unauthorized from "../components/pages/Unauthorized";
import {
    Box,
    createTheme,
    Divider,
    Drawer,
    IconButton,
    styled,
    ThemeProvider,
    Toolbar,
    Typography,
} from "@mui/material";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ActiveUserContext from "../Contexts/ActiveUserContext";
import ItemTableUser from "../components/pages/ItemPage/ItemTableUser";

/**
 * Router component renders a route switch with all available pages
 */

const drawerWidth = 320;

const Main = styled("main", {shouldForwardProp: (prop) => prop !== "open"})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({theme}) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

const Router = () => {
    const navigate = useNavigate();
    const context = React.useContext(ActiveUserContext);
    const theme = createTheme({
        typography: {
            fontFamily: "Product Sans",
            fontWeightRegular: 500,
        },
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundColor: "#F3F6FB",
                        color: "#071C33",
                        boxShadow: "none",
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        boxShadow: "none",
                        borderRadius: "10px",
                        transition: ".3s",
                    },
                },
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        boxShadow: "none",
                        borderRadius: "10px",
                        transition: ".3s",
                    },
                },
            },
        },
    });

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box sx={{display: "flex"}}>
                    <AppBar
                        position="fixed"
                        open={open}
                        sx={{
                            backgroundColor: "  #F3F6FB",
                            color: "#071C33",
                            boxShadow: "none",
                        }}
                    >
                        <Toolbar sx={{flexGrow: 1, justifyContent: "space-between"}}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{float: "left", mr: 2, ...(open && {display: "none"})}}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" sx={{fontWeight: 600}}>
                                Senior Tech 2
                            </Typography>

                            <Button
                                className={"userButton"}
                                color='info'
                                variant='contained'
                                sx={{my: 1, marginLeft: "auto", mr: 1}}
                                onClick={
                                    () => {
                                        navigate("/profile")
                                    }
                                }
                            >
                                <Typography
                                    variant="body2"
                                    fontWeight={"bold"}
                                    className={"userButtonText"}
                                >
                                    Profile
                                </Typography>
                            </Button>
                            <Button
                                className={"userButton"}
                                color='error'
                                variant='contained'
                                sx={{my: 1, float: "right"}}
                                onClick={context.logout}
                            >
                                <Typography
                                    variant="body2"
                                    fontWeight={"bold"}
                                    className={"userButtonText"}
                                >
                                    Logout
                                </Typography>
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        sx={{
                            width: drawerWidth,
                            flexShrink: 0,
                            "& .MuiDrawer-paper": {
                                width: drawerWidth,
                                boxSizing: "border-box",
                            },
                        }}
                        variant="persistent"
                        anchor="left"
                        open={open}
                    >
                        <DrawerHeader>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === "ltr" ? (
                                    <ChevronLeftIcon/>
                                ) : (
                                    <ChevronRightIcon/>
                                )}
                            </IconButton>
                        </DrawerHeader>
                        <Divider/>
                        <Button
                            className={"userButton blueButton"}
                            color="info"
                            variant="contained"
                            sx={{
                                mx: 0.5,
                                mt: 1,
                            }}
                            size={"large"}
                            startIcon={<HomeIcon/>}
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            <Typography
                                variant="body2"
                                fontWeight={"bold"}
                                className={"userButtonText"}
                            >
                                Home
                            </Typography>
                        </Button>

                        <Button
                            className={"userButton secondaryButton"}
                            color="info"
                            variant="contained"
                            sx={{
                                mx: 0.5,
                                mt: 1,
                            }}
                            size={"large"}
                            startIcon={<PeopleAltIcon/>}
                            onClick={() => {
                                if (
                                    // @ts-ignore because the role of the user could be null but we catch that with the else here
                                    context.user?.roles
                                        .map((element) => element.name)
                                        // @ts-ignore
                                        .includes(authorities.USER_DELETE) ||
                                    // @ts-ignore because the role of the user could be null but we catch that with the else here
                                    context.user?.roles
                                        .map((element) => element.name)
                                        // @ts-ignore
                                        .includes(authorities.USER_MODIFY)
                                ) {
                                    navigate("/item");
                                } else {
                                    navigate("/itemuser");
                                }
                            }}
                        >
                            <Typography
                                variant="body2"
                                fontWeight={"bold"}
                                className={"userButtonText"}
                            >
                                Articles
                            </Typography>
                        </Button>
                    </Drawer>
                    <Main open={open}>
                        <DrawerHeader/>
                        <Routes>
                            <Route path={"/"} element={<HomePage/>}/>
                            <Route path={"/login"} element={<LoginPage/>}/>
                            <Route
                                path={"/profile"}
                                element={
                                    <PrivateRoute
                                        authorities={[
                                            {
                                                id: "",
                                                name: authorities.DEFAULT,
                                            },
                                        ]}
                                        element={<ProfilePage/>}
                                    />
                                }
                            />

                            <Route
                                path={"/users"}
                                element={
                                    <PrivateRoute
                                        authorities={[
                                            {
                                                id: "",
                                                name: authorities.DEFAULT,
                                            },
                                        ]}
                                        element={<UserTable/>}
                                    />
                                }
                            />
                            <Route
                                path="/useredit"
                                element={
                                    <PrivateRoute
                                        authorities={[]}
                                        element={
                                            <PrivateRoute
                                                authorities={[
                                                    {
                                                        id: "",
                                                        name: authorities.DEFAULT,
                                                    },
                                                ]}
                                                element={<UserPage/>}
                                            />
                                        }
                                    />
                                }
                            />
                            <Route
                                path="/useredit/:userId"
                                element={
                                    <PrivateRoute
                                        authorities={[
                                            {
                                                id: "",
                                                name: authorities.DEFAULT,
                                            },
                                        ]}
                                        element={<UserPage/>}
                                    />
                                }
                            />

                            <Route
                                path={"/item"}
                                element={
                                    <PrivateRoute
                                        authorities={[
                                            {
                                                id: "",
                                                name: authorities.USER_MODIFY,
                                            },
                                        ]}
                                        element={<ItemTable/>}
                                    />
                                }
                            />
                            <Route
                                path={"/itemuser"}
                                element={
                                    <PrivateRoute
                                        authorities={[
                                            {
                                                id: "",
                                                name: authorities.DEFAULT,
                                            },
                                        ]}
                                        element={<ItemTableUser/>}
                                    />
                                }
                            />
                            <Route
                                path="/itemedit"
                                element={
                                    <PrivateRoute
                                        authorities={[
                                            {
                                                id: "",
                                                name: authorities.DEFAULT,
                                            },
                                        ]}
                                        element={<ItemPage/>}
                                    />
                                }
                            />
                            <Route
                                path="/itemedit/:ItemId"
                                element={
                                    <PrivateRoute
                                        authorities={[
                                            {
                                                id: "",
                                                name: authorities.DEFAULT,
                                            },
                                        ]}
                                        element={<ItemPage/>}
                                    />
                                }
                            />

                            <Route
                                path="/unauthorized"
                                element={
                                    <PrivateRoute
                                        authorities={[]}
                                        element={<Unauthorized/>}
                                    ></PrivateRoute>
                                }
                            />

                            <Route path="*" element={<div>Not Found</div>}/>
                        </Routes>
                    </Main>
                </Box>
            </ThemeProvider>
        </>
    );
};

export default Router;
