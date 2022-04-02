import React, { Component } from 'react';
import { Button, Drawer, Typography } from '@mui/material';
import { Card, Grid } from '@components';
import { getData, kickOpenDoor, lootTheRoom, cardUpdate, playerUpdate } from '../store';
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

const Arena = ({ getData, active, doors, kickOpenDoor, lootTheRoom, player, treasures, cardUpdate, playerUpdate }) => {
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
                {doors.length ? (
                    <Card
                        card={{
                            type: 'door',
                        }}
                        face='down'
                        small
                        onClick={() => {
                            if (player.phase === 'kick') {
                                kickOpenDoor();
                            } else if (player.phase === 'loot') {
                                lootTheRoom();
                                setTimeout(() => {
                                    getData();
                                }, 1000);
                            }
                        }}
                    />
                ) : (
                    <div />
                )}
            </div>
            <div style={{ width: 48 }} />
            <div>
                <Card small onClick={() => console.log('graveyard')} style={{ marginBottom: 16 }} />
                {treasures.length ? <Card card={{ type: 'treasure' }} face='down' small /> : <div />}
            </div>

            {active ? (
                <Card
                    card={active}
                    medium
                    onClick={() => {
                        switch (active.category) {
                            case 'race':
                                // put the card into the players hand
                                active.status = 'inactive';
                                active.PlayerId = player.id;
                                cardUpdate(active);

                                // progress to 'Loot the Room' stage
                                player.phase = 'loot';
                                playerUpdate(player);
                                setTimeout(() => {
                                    getData();
                                }, 300);
                            case 'class':
                                // put the card into the players hand
                                active.status = 'inactive';
                                active.PlayerId = player.id;
                                cardUpdate(active);

                                // progress to 'Loot the Room' stage
                                player.phase = 'loot';
                                playerUpdate(player);
                                setTimeout(() => {
                                    getData();
                                }, 300);
                        }
                    }}
                    style={{ marginLeft: 160 }}
                />
            ) : (
                <Card small style={{ marginLeft: 160 }} />
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        doors: state.doors,
        treasures: state.treasures,
        active: state.active,
        player: state.player,
        updatedCard: state.updatedCard,
    };
};

export default connect(mapStateToProps, {
    getData,
    kickOpenDoor,
    lootTheRoom,
    cardUpdate,
    playerUpdate,
})(Arena);
