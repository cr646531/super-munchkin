const conn = require('../db').conn;
const { Op } = require('@sequelize/core');

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

        /*
            start game
                - set player order
                - deal cards
        */
        if (!player) {
            for (let i = 0; i < players.length; i++) {
                let doors = await Card.findAll({
                    where: { type: 'door', PlayerId: null },
                    order: conn.random(),
                    limit: 4,
                });
                let treasures = await Card.findAll({
                    where: { type: 'treasure', PlayerId: null },
                    order: conn.random(),
                    limit: 4,
                });

                for (let j = 0; j < doors.length; j++) {
                    await doors[j].setPlayer(players[i]);
                    doors[j].status = 'in-hand';
                    await doors[j].save();
                }

                for (let k = 0; k < treasures.length; k++) {
                    await treasures[k].setPlayer(players[i]);
                    treasures[k].status = 'in-hand';
                    await treasures[k].save();
                }

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

        const hand = await Card.findAll({ where: { PlayerId: player.id, status: 'in-hand' } });
        const equipment = await Card.findAll({
            where: { PlayerId: player.id, status: 'active', type: 'treasure' },
        });
        const doors = await Card.findAll({ where: { type: 'door', status: 'inactive', PlayerId: null } });
        const treasures = await Card.findAll({ where: { type: 'treasure', status: 'inactive' } });
        const active = await Card.findOne({ where: { type: 'door', status: 'in-play' } });
        const race = await Card.findOne({ where: { PlayerId: player.id, category: 'race', equipped: true } });
        const classname = await Card.findOne({ where: { PlayerId: player.id, category: 'class', equipped: true } });
        const headgear = await Card.findOne({ where: { PlayerId: player.id, category: 'headgear', equipped: true } });
        const armor = await Card.findOne({ where: { PlayerId: player.id, category: 'armor', equipped: true } });
        const footgear = await Card.findOne({ where: { PlayerId: player.id, category: 'footgear', equipped: true } });
        const equipped = await Card.findAll({
            where: {
                PlayerId: player.id,
                equipped: true,
                category: { [Op.notIn]: ['race', 'class', 'headgear', 'footgear', 'armor'] },
            },
        });
        const monstersInCombat = await Card.findAll({ where: { status: 'combat' } });

        res.send({
            player,
            players,
            hand,
            doors,
            treasures,
            active,
            equipment,
            race,
            classname,
            armor,
            headgear,
            footgear,
            equipped,
            monstersInCombat,
        });
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

router.put('/equipment', (req, res, next) => {
    const { player } = req.body;
    Card.findAll({ where: { PlayerId: player.id, type: 'treasure', status: 'active' } })
        .then((cards) => res.send(cards))
        .catch(next);
});

module.exports = router;
