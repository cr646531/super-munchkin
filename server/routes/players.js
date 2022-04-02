// router
const router = require('express').Router();

// models
const { Card, Player } = require('../db').models;

// middleware
router.use(require('body-parser').json());

/* ---------- ROUTES ---------- */

router.get('/', (req, res, next) => {
    Player.findAll()
        .then((players) => res.send(players))
        .catch(next);
});

router.put('/carry', async (req, res, next) => {
    try {
        const player = await Player.findOne({ where: { id: req.body.player.id } });
        const card = await Card.findOne({ where: { id: req.body.card.id } });

        if (card.category === 'race' || card.category === 'class') {
            card.status = 'used';
            await card.save();
            if (card.category === 'race') player.race = card.name;
            if (card.category === 'class') player.class = card.name;
            await player.save();
        }

        if (card.type === 'treasure') {
            card.status = 'active';
            await card.save();
        }

        res.send(player);
    } catch (err) {
        next(err);
    }
});

router.put('/update', (req, res, next) => {
    Player.findOne({ where: { id: req.body.player.id } })
        .then((player) => player.set(req.body.player).save())
        .then((player) => res.send(player))
        .catch(next);
});

module.exports = router;
