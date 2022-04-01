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

app.get('/data/doors/kick', (req, res, next) => {
    Card.findOne({
        where: { type: 'door' },
        order: conn.random(),
        limit: 1,
    })
        .then((card) => res.send(card))
        .catch(next);
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
