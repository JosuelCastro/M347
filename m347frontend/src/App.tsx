import React from 'react';

import {ActiveUserContextProvider} from './Contexts/ActiveUserContext';
import Router from './Router/Router';
import {AppBar, createTheme, ThemeProvider, Toolbar, Typography} from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: "Product Sans",
        fontWeightRegular: 500,
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <ActiveUserContextProvider>
                <Router/>
            </ActiveUserContextProvider>
        </ThemeProvider>
    );
}

export default App;
