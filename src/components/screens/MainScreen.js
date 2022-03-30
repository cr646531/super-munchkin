import React, { Component } from 'react';

// import { Card, Player } from '.';

const styles = {
    arena: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '50vh',
        width: '100vw',
        backgroundColor: '#C9C9C9',
        zIndex: -1,
    },
    toolbelt: {
        position: 'fixed',
        top: '50vh',
        left: 0,
        height: '50vh',
        width: '100vw',
        backgroundColor: 'pink',
        zIndex: -1,
        padding: 16,
    },
};

class MainScreen extends Component {
    render() {
        return (
            <div>
                <div style={styles.arena}></div>
                <div style={styles.toolbelt}></div>
            </div>
        );
    }
}

export default MainScreen;
