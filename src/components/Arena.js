import React, { Component } from 'react';
import { Button, Drawer, Typography } from '@mui/material';
import { Card, Grid } from '@components';
import { drawDoor, drawTreasure, getActiveCard, init, kickOpenDoor, updateCard, updatePlayer } from '../store';
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

const Arena = ({
    init,
    active,
    doors,
    drawTreasure,
    kickOpenDoor,
    player,
    treasures,
    updateCard,
    getActiveCard,
    updatePlayer,
}) => {
    const _updateCard = (card) => updateCard(card);
    const _getActiveCard = () => getActiveCard();

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
                {doors.length ? <Card type='door' face='down' small onClick={kickOpenDoor} /> : <div />}
            </div>
            <div style={{ width: 48 }} />
            <div>
                <Card small onClick={() => console.log('graveyard')} style={{ marginBottom: 16 }} />
                {treasures.length ? <Card type='treasure' face='down' small onClick={drawTreasure} /> : <div />}
            </div>

            {active ? (
                <Card
                    type={active.type}
                    name={active.name}
                    medium
                    onClick={() => {
                        switch (active.category) {
                            case 'race':
                                // put the card into the players hand
                                active.status = 'inactive';
                                active.PlayerId = player.id;
                                updateCard(active);

                                // progress to 'Loot the Room' stage
                                player.phase = 'loot';
                                updatePlayer(player);
                                setTimeout(() => {
                                    init();
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
    drawDoor,
    drawTreasure,
    getActiveCard,
    init,
    kickOpenDoor,
    updateCard,
    updatePlayer,
})(Arena);
