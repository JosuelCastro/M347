import {NavLink, Route, Routes} from "react-router-dom";
import LoginPage from "../components/pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";
import HomePage from "../components/pages/HomePage";
import UserTable from "../components/pages/UserPage/UserTable";
import UserPage from "../components/pages/UserPage/UserPage";
import UserProfileTable from "../components/pages/UserProfilePage/UserProfileTable";
import UserProfilePage from "../components/pages/UserProfilePage/UserProfilePage";
import HomePageLoggedInUser from "../components/pages/HomePageLoggedInUser";
import authorities from "../config/Authorities";
import HomePageLoggedInAdmin from "../components/pages/HomePageLoggedInAdmin";
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
    useTheme
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

/**
 * Router component renders a route switch with all available pages
 */

const drawerWidth = 320;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    })
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open"
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
}));

const Router = () => {

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
                    }
                }
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        boxShadow: "none",
                        borderRadius: "10px",
                        transition: ".3s",
                    }
                }
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        boxShadow: "none",
                        borderRadius: "10px",
                        transition: ".3s",
                    }
                }
            },
        }
    });

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
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
            <Box sx={{ display: "flex" }}>
                <AppBar position="fixed" open={open} sx={{backgroundColor: "  #F3F6FB", color: "#071C33", boxShadow: "none"}}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: "none" }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{fontWeight: 600}}>
                            OurSpace
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box"
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === "ltr" ? (
                                <ChevronLeftIcon />
                            ) : (
                                <ChevronRightIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <Button
                        className={"userButton blueButton"}
                        color='info'
                        variant='contained'
                        sx={{
                            mx: .5,
                            mt: 1,
                        }}
                        size={"large"}
                        startIcon={<HomeIcon/>}
                    >
                        <NavLink to={"/"} className={"userButtonText"}>
                            <Typography
                                variant="body2"
                                fontWeight={"bold"}
                                className={"userButtonText"}
                            >
                                Home
                            </Typography>
                        </NavLink>
                    </Button>
                    <Button
                        className={"userButton secondaryButton"}
                        color='info'
                        variant='contained'
                        sx={{
                            mx: .5,
                            mt: 1,
                        }}
                        size={"large"}
                        startIcon={<PeopleAltIcon/>}
                    >
                        <NavLink to={"/authHomeAdmin"} className={"userButtonText"}>
                            <Typography
                                variant="body2"
                                fontWeight={"bold"}
                                className={"userButtonText"}
                            >
                                User Profiles
                            </Typography>
                        </NavLink>
                    </Button>
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                    <Routes>
                        <Route path={"/"} element={<HomePage/>}/>
                        <Route path={"/login"} element={<LoginPage/>}/>
                        <Route path={"/authHomeUser"} element={<PrivateRoute authorities={[{
                            id: "",
                            name: authorities.DEFAULT
                        }]} element={<HomePageLoggedInUser/>}/>}/>
                        <Route path={"/authHomeAdmin"} element={<PrivateRoute authorities={[{
                            id: "",
                            name: authorities.USER_MODIFY
                        }]} element={<HomePageLoggedInAdmin/>}/>}
                        />

                        <Route
                            path={"/users"}
                            element={<PrivateRoute authorities={[{
                                id: "",
                                name: authorities.DEFAULT
                            }]} element={<UserTable/>}/>}
                        />
                        <Route
                            path="/useredit"
                            element={
                                <PrivateRoute authorities={[]} element={<PrivateRoute authorities={[{
                                    id: "",
                                    name: authorities.DEFAULT
                                }]} element={<UserPage/>}/>}/>
                            }
                        />
                        <Route
                            path="/useredit/:userId"
                            element={<PrivateRoute authorities={[{
                                id: "",
                                name: authorities.DEFAULT
                            }]} element={<UserPage/>}/>}
                        />

                        <Route
                            path={"/userprofile"}
                            element={<PrivateRoute authorities={[{
                                id: "",
                                name: authorities.USER_MODIFY
                            }]} element={<UserProfileTable/>}/>}
                        />
                        <Route
                            path="/userprofileedit"
                            element={<PrivateRoute authorities={[{
                                id: "",
                                name: authorities.DEFAULT
                            }]} element={<UserProfilePage/>}/>}
                        />
                        <Route
                            path="/userprofileedit/:userProfileId"
                            element={<PrivateRoute authorities={[{
                                id: "",
                                name: authorities.DEFAULT
                            }]} element={<UserProfilePage/>}/>}
                        />

                        <Route
                            path="/unauthorized"
                            element={
                                <PrivateRoute authorities={[]} element={<Unauthorized/>}></PrivateRoute>
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
