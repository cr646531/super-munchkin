import React, { Component } from 'react';
import { Button, Drawer, Typography } from '@mui/material';
import { Card } from '@components';
import { connect } from 'react-redux';

const modals = {
    HAND: 'HAND',
};

const styles = {
    scrollableRow: {
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'scroll',
    },
};

class Toolbelt extends Component {
    constructor() {
        super();
        this.state = {
            modalOpen: null,
        };
    }

    render() {
        const { hand, player } = this.props;
        const { modalOpen } = this.state;

        return (
            <div>
                {hand.length ? (
                    <div
                        style={{ display: 'flex', flexDirection: 'row', overflowX: 'scroll', maxWidth: 400 }}
                        onClick={() => this.setState({ modalOpen: modals.HAND })}
                    >
                        {hand.map((card, index) => (
                            <div key={index} style={{ marginRight: -60 }}>
                                <Card card={card} small />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div />
                )}
                {player && (
                    <div>
                        <Typography variant='h3'>Player</Typography>
                        <div style={{ height: 16 }} />
                        <Typography variant='h4'>{`name: ${player.name}`}</Typography>
                        <Typography variant='h4'>{`phase: ${player.phase}`}</Typography>
                        <Typography variant='h4'>{`speed: ${player.speed}`}</Typography>
                    </div>
                )}

                <Drawer
                    anchor='bottom'
                    open={modalOpen === modals.HAND}
                    onClose={() => this.setState({ modalOpen: null })}
                >
                    <div style={styles.scrollableRow} onClick={() => this.setState({ modalOpen: modals.HAND })}>
                        {hand.map((card, index) => (
                            <div key={index} style={{ margin: 24 }}>
                                <Card key={index} card={card} />
                            </div>
                        ))}
                    </div>
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = ({ hand, player }) => {
    return { hand, player };
};

export default connect(mapStateToProps, {})(Toolbelt);
