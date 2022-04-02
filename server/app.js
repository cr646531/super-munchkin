const path = require('path');
const express = require('express');
const app = express();

const db = require('./db');
const { Card, Player } = db.models;
const conn = db.conn;

const indexFile = path.join(__dirname, '..', 'public', 'index.html');

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use(express.static('public'));
app.use(require('body-parser').json());

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

        const hand = await Card.findAll({ where: { PlayerId: player.id } });
        const doors = await Card.findAll({ where: { type: 'door', status: 'inactive', PlayerId: null } });
        const treasures = await Card.findAll({ where: { type: 'treasure', status: 'inactive' } });
        const active = await Card.findOne({ where: { status: 'active' }, order: conn.random(), limit: 1 });
        res.send({ player, players, hand, doors, treasures, active });
    } catch (err) {
        console.log('err: ', err);
        next(err);
    }
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
        console.log('cardToUpdate: ', cardToUpdate);
        await cardToUpdate.save();

        res.send(cardToUpdate);
    } catch (err) {
        next(err);
    }
});

app.put('/player/update', async (req, res, next) => {
    const { player } = req.body;

    try {
        const playerToUpdate = await Player.findOne({ where: { id: req.body.player.id } });
        playerToUpdate.set(player);
        console.log('playerToUpdate: ', playerToUpdate);
        await playerToUpdate.save();

        res.send(playerToUpdate);
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

app.get('/phase/kick', async (req, res, next) => {
    try {
        // kick in the door
        const topCard = await Card.findOne({ where: { type: 'door', PlayerId: null }, order: conn.random(), limit: 1 });
        topCard.status = 'active';
        await topCard.save();

        // advance to next stage
        const player = await Player.findOne({ where: { status: 'active' } });
        player.phase = 'resolve';

        res.send(topCard);
    } catch (err) {
        console.log('err: ', err);
        next(err);
    }
    // Card.findOne({
    //     where: { type: 'door' },
    //     order: conn.random(),
    //     limit: 1,
    // })
    //     .then((card) => {
    //         card.set({ status: 'active' })

    //     })
    //     .catch(next);
});

// app.get('/data/rigged', (req, res, next)=> {
//   Card.findAll()
//     .then(cards => rig(cards))
//     .then(deck => res.send(deck))
//     .catch(next);
// });

// app.get('/data/rigSplit', (req, res, next)=> {
//   Card.findAll()
//     .then(cards => rigSplit(cards))
//     .then(deck => res.send(deck))
//     .catch(next);
// });

// app.post('/data/reset', (req, res, next)=> {
//   db.syncAndSeed()
//     .then(()=> res.sendStatus(204))
//     .catch(next);
// });

// app.delete('/data/card/:id', (req, res, next)=> {
//     Card.findById(req.params.id)
//       .then( card => card.destroy() )
//       .then( () => res.sendStatus(204))
//       .catch(next);
//   });

module.exports = app;
