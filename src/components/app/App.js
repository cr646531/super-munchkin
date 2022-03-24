import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// components
import { WelcomeScreen } from '@components/main';

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#4D96FF',
        },
        secondary: {
            main: '#019267',
        },
        success: {
            main: '#6BCB77',
        },
        error: {
            main: '#FF6B6B',
        },
        warning: {
            main: '#FFD93D',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontSize: '24px',
                },
            },
        },
    },
});

export default class App extends React.Component {
    render() {
        console.log('here');
        return (
            <ThemeProvider theme={theme}>
                <h1>Test</h1>
                <WelcomeScreen />
            </ThemeProvider>
        );
    }
}
