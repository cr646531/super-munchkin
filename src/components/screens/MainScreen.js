import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlayers } from '../../store';

import { Arena, Toolbelt } from '@components';

// import { Card, Player } from '.';

const styles = {
    arena: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '50vh',
        width: '100vw',
        backgroundColor: '#C9C9C9',
    },
    toolbelt: {
        position: 'fixed',
        top: '50vh',
        left: 0,
        height: '50vh',
        width: '100vw',
        backgroundColor: 'pink',
        padding: 16,
    },
};

class MainScreen extends Component {
    componentDidMount() {
        this.props.getPlayers();
    }

    render() {
        console.log(this.props.players);
        return (
            <div>
                <div style={styles.arena}>
                    <Arena />
                </div>
                <div style={styles.toolbelt}>
                    <Toolbelt />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ players }) => {
    return {
        players: players,
    };
};

export default connect(mapStateToProps, { getPlayers })(MainScreen);
