import React from 'react';

// constants
import { GlobalStyles } from '@constants';

// components
import { Button, Typography } from '@mui/material';

const styles = {
    ...GlobalStyles,
    root: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default class WelcomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
        };
    }
    render() {
        return (
            <div style={styles.root}>
                <Typography variant='h1' style={styles.marginBottom16}>
                    {this.state.counter}
                </Typography>
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => this.setState({ counter: this.state.counter + 1 })}
                >
                    Here
                </Button>
            </div>
        );
    }
}
