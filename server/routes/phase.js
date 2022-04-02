const conn = require('../db').conn;

// router
const router = require('express').Router();

// models
const { Card, Player } = require('../db').models;

// middleware
router.use(require('body-parser').json());

/* ---------- ROUTES ---------- */

router.get('/', (req, res, next) => {
    res.send(400);
});

router.put('/kick', async (req, res, next) => {
    try {
        const player = await Player.findOne({ where: { id: req.body.player.id } });
        player.phase = 'resolve';
        await player.save();

        const card = await Card.findOne({ where: { type: 'door', PlayerId: null } });
        card.status = 'active';
        await card.save();

        res.send({ card, player });
    } catch (err) {
        next(err);
    }
});

router.get('/loot', async (req, res, next) => {
    try {
        // end the players turn
        const currPlayer = await Player.findOne({ where: { status: 'active' } });
        currPlayer.set({ status: 'inactive', phase: 'kick' });
        await currPlayer.save();

        // put the top card into the current player's hand
        const topCard = await Card.findOne({
            where: { type: 'door', PlayerId: null },
            order: conn.random(),
            limit: 1,
        });
        topCard.setPlayer(currPlayer);
        await topCard.save();

        // set next player's turn
        const nextPlayer = await Player.findOne({ where: { id: currPlayer.PlayerId } });
        nextPlayer.status = 'active';
        await nextPlayer.save();

        res.send(nextPlayer);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
