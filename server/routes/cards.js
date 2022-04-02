// router
const router = require('express').Router();

// models
const { Card } = require('../db').models;

// middleware
router.use(require('body-parser').json());

/* ---------- ROUTES ---------- */

// router.get('/', (req, res, next) => {
//     Card.findAll()
//         .then((cards) => res.send(cards))
//         .catch(next);
// });

router.put('/', (req, res, next) => {
    Card.findAll({ where: req.body })
        .then((cards) => res.send(cards))
        .catch(next);
});

router.put('/update', (req, res, next) => {
    Card.findOne({ where: { id: req.body.card.id } })
        .then((card) => card.set(req.body.card).save())
        .then((card) => res.send(card))
        .catch(next);
});

module.exports = router;
