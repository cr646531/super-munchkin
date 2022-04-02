import React, { Component } from 'react';
import { Button, Drawer, Typography } from '@mui/material';
import { Card } from '@components';
import { connect } from 'react-redux';
import { getHand, playerEquip } from '@src/store';

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
        const { getHand, hand, player, playerEquip } = this.props;
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
                        <Typography variant='h4'>{`race: ${player.race}`}</Typography>
                        <Typography variant='h4'>{`class: ${player.class}`}</Typography>
                    </div>
                )}

                <Drawer
                    anchor='bottom'
                    open={modalOpen === modals.HAND}
                    onClose={() => this.setState({ modalOpen: null })}
                >
                    <div style={styles.scrollableRow} onClick={() => this.setState({ modalOpen: modals.HAND })}>
                        {hand.map((card, index) => (
                            <div
                                key={index}
                                style={{ margin: 24 }}
                                onClick={() => {
                                    if (card.category === 'race' || card.category === 'class') {
                                        playerEquip({ card, player });
                                        setTimeout(() => getHand({ player }), 100);
                                    }
                                }}
                            >
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

export default connect(mapStateToProps, { getHand, playerEquip })(Toolbelt);
