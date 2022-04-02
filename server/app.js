const path = require('path');
const express = require('express');
const app = express();

// routers
const { players } = require('./routers');

const db = require('./db');
const { Card, Player } = db.models;
const conn = db.conn;

const indexFile = path.join(__dirname, '..', 'public', 'index.html');

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use(express.static('public'));
app.use(require('body-parser').json());
app.use('/players', players);

// ROUTES
app.get('/', (req, res, next) => res.sendFile(indexFile));

app.get('/data/init', async (req, res, next) => {
    try {
        let player = await Player.findOne({ where: { status: 'active' } });
        let players = await Player.findAll({ order: conn.random() });

        // game start - set the turn order
        if (!player) {
            for (let i = 0; i < players.length; i++) {
                if (i === 0) {
                    players[0].status = 'active';
                    await players[0].save();
                }
                if (i === players.length - 1) {
                    players[i].setPlayer(players[0]);
                    await players[i].save();
                } else {
                    players[i].setPlayer(players[i + 1]);
                    await players[i].save();
                }
            }

            player = await Player.findOne({ where: { status: 'active' } });
            players = await Player.findAll();
        }

        const hand = await Card.findAll({ where: { PlayerId: player.id, status: 'inactive' } });
        const doors = await Card.findAll({ where: { type: 'door', status: 'inactive', PlayerId: null } });
        const treasures = await Card.findAll({ where: { type: 'treasure', status: 'inactive' } });
        const active = await Card.findOne({ where: { status: 'active' }, order: conn.random(), limit: 1 });
        res.send({ player, players, hand, doors, treasures, active });
    } catch (err) {
        console.log('err: ', err);
        next(err);
    }
});

app.put('/data/hand', (req, res, next) => {
    const { player } = req.body;
    Card.findAll({ where: { PlayerId: player.id, status: 'inactive' } })
        .then((cards) => res.send(cards))
        .catch(next);
});

app.get('/data/doors/active', (req, res, next) => {
    Card.findOne({ where: { status: 'active' } })
        .then((activeCard) => res.send(activeCard))
        .catch(next);
});

app.put('/card/update', async (req, res, next) => {
    const { card } = req.body;

    try {
        const cardToUpdate = await Card.findOne({ where: { id: req.body.card.id } });
        cardToUpdate.set(card);
        await cardToUpdate.save();

        res.send(cardToUpdate);
    } catch (err) {
        next(err);
    }
});

app.get('/data/players', (req, res, next) => {
    Player.findAll()
        .then((players) => res.send(players))
        .catch(next);
});

app.get('/data/doors', (req, res, next) => {
    Card.findAll({ where: { type: 'door' } })
        .then((doors) => res.send(doors))
        .catch(next);
});

app.get('/data/treasures', (req, res, next) => {
    Card.findAll({ where: { type: 'treasure' } })
        .then((treasures) => res.send(treasures))
        .catch(next);
});

app.get('/phase/loot', async (req, res, next) => {
    try {
        // get current player
        const currPlayer = await Player.findOne({ where: { status: 'active' } });

        // put the top card into the current player's hand
        const topCard = await Card.findOne({
            where: { type: 'door', PlayerId: null },
            order: conn.random(),
            limit: 1,
        });
        topCard.setPlayer(currPlayer);
        await topCard.save();

        // end player's turn
        currPlayer.status = 'inactive';
        currPlayer.phase = 'kick';
        await currPlayer.save();

        // set next player's turn
        const nextPlayer = await Player.findOne({ where: { id: currPlayer.PlayerId } });
        nextPlayer.status = 'active';
        await nextPlayer.save();

        res.send(nextPlayer);
    } catch (err) {
        console.log('err: ', err);
        next(err);
    }
});

app.get('/phase/kick', async (req, res, next) => {
    try {
        // kick in the door
        const topCard = await Card.findOne({
            where: { type: 'door', PlayerId: null },
            order: conn.random(),
            limit: 1,
        });
        topCard.status = 'active';
        await topCard.save();

        res.send(topCard);
    } catch (err) {
        console.log('err: ', err);
        next(err);
    }
});

module.exports = app;
