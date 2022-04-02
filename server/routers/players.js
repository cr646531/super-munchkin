// router
const router = require('express').Router();

// models
const { Card, Player } = require('../db').models;

// middleware
router.use(require('body-parser').json());

// routes
router.get('/', (req, res, next) => {
    Player.findAll()
        .then((players) => res.send(players))
        .catch(next);
});

router.put('/equip', async (req, res, next) => {
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

        res.send(player);
    } catch (err) {
        next(err);
    }
});

router.put('/update', async (req, res, next) => {
    try {
        res.send(
            await Player.findOne({ where: { id: req.body.player.id } })
                .set(player)
                .save()
        );
    } catch (err) {
        next(err);
    }
});

module.exports = router;
