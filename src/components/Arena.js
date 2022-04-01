import React, { Component } from 'react';
import { Button, Drawer, Typography } from '@mui/material';
import { Card, Grid } from '@components';
import { drawDoor, drawTreasure, kickOpenDoor } from '../store';
import { connect } from 'react-redux';

const styles = {
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flex: 1,
        marginTop: 16,
        marginBottom: 16,
    },
    col: {
        display: 'flex',
        flexDirection: 'column',
    },
};

class Arena extends Component {
    render() {
        const { active, doors, treasures } = this.props;

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
                <div>
                    <Card small onClick={() => console.log('graveyard')} style={{ marginBottom: 16 }} />
                    {doors.length ? <Card type='door' face='down' small onClick={this.props.kickOpenDoor} /> : <div />}
                </div>
                <div style={{ width: 48 }} />
                <div>
                    <Card small onClick={() => console.log('graveyard')} style={{ marginBottom: 16 }} />
                    {treasures.length ? (
                        <Card type='treasure' face='down' small onClick={() => this.props.drawTreasure()} />
                    ) : (
                        <div />
                    )}
                </div>

                {active ? (
                    <Card type={active.type} name={active.name} medium style={{ marginLeft: 160 }} />
                ) : (
                    <Card small style={{ marginLeft: 160 }} />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        doors: state.doors,
        treasures: state.treasures,
        active: state.active,
    };
};

export default connect(mapStateToProps, { drawDoor, drawTreasure, kickOpenDoor })(Arena);
