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
        const card = await Card.findOne({ where: { id: req.body.card.id } });

        if (card.type === 'treasure') {
            card.status = 'active';
            await card.save();
        }
    } catch (err) {
        next(err);
    }
});

router.put('/equip', async (req, res, next) => {
    try {
        const card = await Card.findOne({ where: { id: req.body.card.id } });
        const cardToUnequip = await Card.findOne({
            where: { PlayerId: req.body.card.PlayerId, category: req.body.card.category, equipped: true },
        });

        if (card.category === 'race' || card.category === 'class') {
            if (cardToUnequip) {
                cardToUnequip.status = 'dead';
                cardToUnequip.equipped = false;
                await cardToUnequip.save();
            }

            card.status = 'used';
            card.equipped = true;
            await card.save();
        }

        if (card.type === 'treasure') {
            if (cardToUnequip) {
                cardToUnequip.equipped = false;
                await cardToUnequip.save();
            }

            card.equipped = true;
            await card.save();
        }
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
