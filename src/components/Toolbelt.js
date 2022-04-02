import React, { Component } from 'react';
import { Button, Drawer, Typography } from '@mui/material';
import { Card, Icon } from '@components';
import { connect } from 'react-redux';
import { getData, getDataHand, getDataEquipment, playerCarry, playerEquip } from '@src/store';

const modals = {
    HAND: 'HAND',
    EQUIPMENT: 'EQUIPMENT',
};

const styles = {
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        overflowX: 'scroll',
        border: `1px solid black`,
        padding: 4,
    },
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
        const {
            armor,
            classname,
            equipment,
            footgear,
            getData,
            getDataHand,
            getDataEquipment,
            hand,
            headgear,
            player,
            playerCarry,
            playerEquip,
            race,
        } = this.props;
        const { modalOpen } = this.state;

        return (
            <div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={styles.root} onClick={() => this.setState({ modalOpen: modals.HAND })}>
                        {hand.map((card, index) => (
                            <div key={index} style={{ marginRight: 8 }}>
                                <Card card={card} small />
                            </div>
                        ))}
                    </div>
                    <div style={{ width: 40 }} />
                    <div style={styles.root}>
                        {equipment.map((card, index) => (
                            <div>
                                {!card.equipped && (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            playerEquip({ card });
                                            setTimeout(() => getData({ player }), 200);
                                        }}
                                    >
                                        <Card card={card} small />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 32 }}>
                    <Card card={race ? race : { name: 'Race' }} small />
                    <div style={{ marginRight: 8 }} />
                    <Card card={classname ? classname : { name: 'Class' }} small />
                    <div style={{ marginRight: 8 }} />
                    <Card card={headgear ? headgear : { name: 'Headgear' }} small />
                    <div style={{ marginRight: 8 }} />
                    <Card card={armor ? armor : { name: 'Armor' }} small />
                    <div style={{ marginRight: 8 }} />
                    <Card card={footgear ? footgear : { name: 'Footgear' }} small />
                    <div style={{ marginRight: 8 }} />

                    {/* <div style={{ marginRight: 8 }} />
                    <Card card={leftHand ? leftHand : { name: 'Hand' }} small />
                    <div style={{ marginRight: 8 }} />
                    <Card card={rightHand ? rightHand : { name: 'Hand' }} small /> */}
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
                                        playerEquip({ card });
                                        setTimeout(() => getData({ player }), 100);
                                    } else if (card.type === 'treasure') {
                                        playerCarry({ card });
                                        setTimeout(() => getData({ player }), 100);
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
                            <div key={index} style={{ margin: 24 }}>
                                <Card
                                    key={index}
                                    card={card}
                                    onClick={() => {
                                        playerEquip({ card });
                                        setTimeout(() => getData({ player }), 200);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </Drawer>
            </div>
        );
    }
}

const mapStateToProps = ({ armor, headgear, footgear, equipment, hand, player, race, classname }) => {
    return { armor, headgear, footgear, equipment, hand, player, race, classname };
};

export default connect(mapStateToProps, { getData, getDataHand, getDataEquipment, playerCarry, playerEquip })(Toolbelt);
