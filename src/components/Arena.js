import React, { useState } from 'react';
import { Card, CombatPopover } from '@components';
import { getData, kickOpenDoor, lootTheRoom, cardUpdate, playerUpdate } from '../store';
import { connect } from 'react-redux';

const styles = {
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

const modals = {
    COMBAT: 'COMBAT',
};

const Arena = ({ getData, active, doors, kickOpenDoor, lootTheRoom, player, treasures, cardUpdate, playerUpdate }) => {
    const [modalOpen, setModalOpen] = useState(null);

    const onClickDeck = () => {
        if (player.phase === 'kick') {
            kickOpenDoor(player);
        } else if (player.phase === 'loot') {
            lootTheRoom();
            setTimeout(() => {
                getData();
            }, 1000);
        }
    };

    const onClickActive = () => {
        switch (active.category) {
            case 'race' || 'class':
                // put the card into the players hand
                active.status = 'inactive';
                active.PlayerId = player.id;
                cardUpdate(active);

                // progress to 'Loot the Room' stage
                player.phase = 'loot';
                playerUpdate(player);
                setTimeout(() => getData(), 300);
            case 'monster':
                setModalOpen(modals.COMBAT);
        }
    };

    return (
        <div style={styles.root}>
            {/* <CombatPopover /> */}
            <div style={{ marginRight: 48 }}>
                <Card small style={{ marginBottom: 16 }} />
                {doors.length ? <Card card={{ type: 'door' }} face='down' small onClick={onClickDeck} /> : <div />}
            </div>
            <div>
                <Card small onClick={() => console.log('graveyard')} style={{ marginBottom: 16 }} />
                {treasures.length ? <Card card={{ type: 'treasure' }} face='down' small /> : <div />}
            </div>
            <div style={{ width: 160 }} />

            {active ? <Card card={active} medium onClick={onClickActive} /> : <Card small />}
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
