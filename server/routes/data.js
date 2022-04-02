const conn = require('../db').conn;

// router
const router = require('express').Router();

// models
const { Card, Player } = require('../db').models;

// middleware
router.use(require('body-parser').json());

/* ---------- ROUTES ---------- */

router.get('/', async (req, res, next) => {
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
        next(err);
    }
});

router.put('/hand', (req, res, next) => {
    const { player } = req.body;
    Card.findAll({ where: { PlayerId: player.id, status: 'inactive' } })
        .then((cards) => res.send(cards))
        .catch(next);
});

module.exports = router;
