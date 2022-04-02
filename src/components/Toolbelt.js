import React, { Component } from 'react';
import { Button, Drawer, Typography } from '@mui/material';
import { Card, Icon } from '@components';
import { connect } from 'react-redux';
import { getDataHand, getDataEquipment, playerCarry } from '@src/store';

const modals = {
    HAND: 'HAND',
    EQUIPMENT: 'EQUIPMENT',
};

const styles = {
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
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
        const { equipment, getDataHand, getDataEquipment, hand, player, playerCarry } = this.props;
        const { modalOpen } = this.state;

        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            overflowX: 'scroll',
                            border: `1px solid black`,
                            padding: 4,
                        }}
                        onClick={() => this.setState({ modalOpen: modals.HAND })}
                    >
                        {hand.map((card, index) => (
                            <div key={index} style={{ marginRight: 8 }}>
                                <Card card={card} small />
                            </div>
                        ))}
                    </div>
                    <div style={{ width: 40 }} />
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            overflowX: 'scroll',
                            border: `1px solid black`,
                            padding: 4,
                        }}
                        // onClick={() => this.setState({ modalOpen: modals.EQUIPMENT })}
                    >
                        {equipment.map((card, index) => (
                            <div key={index}>
                                <Card card={card} small />
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 32 }}>
                    <Card card={player && player.race ? player.race : { name: 'Race' }} small />
                    <div style={{ marginRight: 8 }} />
                    <Card card={player && player.class ? player.class : { name: 'Class' }} small />
                    <div style={{ marginRight: 8 }} />
                    <Card card={player && player.headgear ? player.headgear : { name: 'Headgear' }} small />
                    <div style={{ marginRight: 8 }} />
                    <Card card={player && player.armor ? player.armor : { name: 'Armor' }} small />
                    <div style={{ marginRight: 8 }} />
                    <Card card={player && player.footgear ? player.footgear : { name: 'Footgear' }} small />
                    <div style={{ marginRight: 8 }} />
                    <Card card={player && player.leftHand ? player.leftHand : { name: 'Hand' }} small />
                    <div style={{ marginRight: 8 }} />
                    <Card card={player && player.rightHand ? player.rightHand : { name: 'Hand' }} small />
                </div>
                {/* {player && (
                    <div>
                        <Typography variant='h3'>Player</Typography>
                        <div style={{ height: 16 }} />
                        <Typography variant='h4'>{`name: ${player.name}`}</Typography>
                        <Typography variant='h4'>{`phase: ${player.phase}`}</Typography>
                        <Typography variant='h4'>{`speed: ${player.speed}`}</Typography>
                        <Typography variant='h4'>{`race: ${player.race}`}</Typography>
                        <Typography variant='h4'>{`class: ${player.class}`}</Typography>
                    </div>
                )} */}

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
                                        playerCarry({ card, player });
                                        setTimeout(() => getDataHand({ player }), 100);
                                    } else if (card.type === 'treasure') {
                                        playerCarry({ card, player });
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
                                        playerCarry({ card, player });
                                        setTimeout(() => getDataHand({ player }), 100);
                                    } else if (card.type === 'treasure') {
                                        playerCarry({ card, player });
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

export default connect(mapStateToProps, { getDataHand, getDataEquipment, playerCarry })(Toolbelt);
