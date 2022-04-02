const path = require('path');
const express = require('express');
const app = express();

// routers
const { players } = require('./routers');
const { cards } = require('./routers');
const { phase } = require('./routers');

const db = require('./db');
const { Card, Player } = db.models;
const conn = db.conn;

const indexFile = path.join(__dirname, '..', 'public', 'index.html');

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use(express.static('public'));
app.use(require('body-parser').json());

// routers
app.use('/players', players);
app.use('/cards', cards);
app.use('/phase', phase);

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

module.exports = app;
