import React, { Component } from 'react';
import { Button, Drawer, Typography } from '@mui/material';
import { Card } from '@components';
import { drawDoor, drawTreasure } from '../store';
import { connect } from 'react-redux';

class Arena extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { doors, treasures } = this.props;

        return (
            <div
                style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {doors.length ? <Card type='door' face='down' small onClick={() => this.props.drawDoor()} /> : <div />}
                <div style={{ width: 16 }} />
                {treasures.length ? (
                    <Card type='treasure' face='down' small onClick={() => this.props.drawTreasure()} />
                ) : (
                    <div />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        doors: state.doors,
        treasures: state.treasures,
    };
};

export default connect(mapStateToProps, { drawDoor, drawTreasure })(Arena);
