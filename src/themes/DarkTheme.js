import { createTheme } from "@mui/material";

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#121212',
            paper: '#1d1d1d'
        },
        text: {
            primary: '#ffffff',
            secondary: '#aaaaaa'
        }
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    }
});