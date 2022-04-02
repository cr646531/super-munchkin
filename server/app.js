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
        const player = await Player.findOne({ where: { name: 'Buckets' } });
        const hand = await Card.findAll({ where: { PlayerId: player.id } });
        const doors = await Card.findAll({ where: { type: 'door', status: 'inactive', PlayerId: null } });
        const treasures = await Card.findAll({ where: { type: 'treasure', status: 'inactive' } });
        const active = await Card.findOne({ where: { status: 'active' }, order: conn.random(), limit: 1 });
        res.send({ player, hand, doors, treasures, active });
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
        const cardToUpdate = await Card.findOne({ where: { id: req.body.card.id }, order: conn.random(), limit: 1 });
        cardToUpdate.set(card);
        console.log('cardToUpdate: ', cardToUpdate);
        await cardToUpdate.save();

        res.send(card);
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

app.get('/data/doors/kick', async (req, res, next) => {
    try {
        const topCard = await Card.findOne({ where: { type: 'door', PlayerId: null }, order: conn.random(), limit: 1 });
        const player = await Player.findOne({ where: { name: 'Buckets' } });

        topCard.status = 'active';
        await topCard.save();

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
