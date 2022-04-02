import React, { Component } from 'react';
import { Button, Drawer, Typography } from '@mui/material';
import { Card } from '@components';
import { connect } from 'react-redux';
import { getDataHand, getDataEquipment, playerEquip } from '@src/store';

const modals = {
    HAND: 'HAND',
    EQUIPMENT: 'EQUIPMENT',
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
        const { equipment, getDataHand, getDataEquipment, hand, player, playerEquip } = this.props;
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

                {equipment.length ? (
                    <div
                        style={{ display: 'flex', flexDirection: 'row', overflowX: 'scroll', maxWidth: 400 }}
                        onClick={() => this.setState({ modalOpen: modals.EQUIPMENT })}
                    >
                        {equipment.map((card, index) => (
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
                    <div style={styles.scrollableRow}>
                        {hand.map((card, index) => (
                            <div
                                key={index}
                                style={{ margin: 24 }}
                                onClick={() => {
                                    if (card.category === 'race' || card.category === 'class') {
                                        playerEquip({ card, player });
                                        setTimeout(() => getDataHand({ player }), 100);
                                    } else if (card.type === 'treasure') {
                                        playerEquip({ card, player });
                                        setTimeout(() => getDataEquipment({ player }), 100);
                                        setTimeout(() => getDataHand({ player }), 200);
                                    }
                                }}
                            >
                                <Card key={index} card={card} />
                            </div>
                        ))}
                    </div>
                </Drawer>
                <Drawer
                    anchor='bottom'
                    open={modalOpen === modals.EQUIPMENT}
                    onClose={() => this.setState({ modalOpen: null })}
                >
                    <div style={styles.scrollableRow}>
                        {equipment.map((card, index) => (
                            <div
                                key={index}
                                style={{ margin: 24 }}
                                onClick={() => {
                                    if (card.category === 'race' || card.category === 'class') {
                                        playerEquip({ card, player });
                                        setTimeout(() => getDataHand({ player }), 100);
                                    } else if (card.type === 'treasure') {
                                        playerEquip({ card, player });
                                        setTimeout(() => getDataEquipment({ player }), 100);
                                        setTimeout(() => getDataHand({ player }), 200);
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

const mapStateToProps = ({ equipment, hand, player }) => {
    return { equipment, hand, player };
};

export default connect(mapStateToProps, { getDataHand, getDataEquipment, playerEquip })(Toolbelt);
