import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlayers } from '../../store';

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
    componentDidMount() {
        this.props.getPlayers();
    }

    render() {
        console.log(this.props.players);
        return (
            <div>
                <div style={styles.arena}></div>
                <div style={styles.toolbelt}></div>
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
