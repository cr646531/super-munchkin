// router
const router = require('express').Router();

// models
const { Card } = require('../db').models;

// middleware
router.use(require('body-parser').json());

// routes
router.get('/', (req, res, next) => {
    Card.findAll()
        .then((cards) => res.send(cards))
        .catch(next);
});

router.put('/', (req, res, next) => {
    console.log('here');
    Card.findAll({ where: req.body })
        .then((cards) => res.send(cards))
        .catch(next);
});

router.put('/doors', async (req, res, next) => {
    Card.findAll({ where: { ...req, body, type: 'door' } })
        .then((doors) => res.send(doors))
        .catch(next);
});

router.put('/update', (req, res, next) => {
    Card.findOne({ where: { id: req.body.card.id } })
        .then((card) => card.set(req.body.card).save())
        .then((card) => res.send(card))
        .catch(next);
});

// router.put('/update', async (req, res, next) => {
//     console.log(req.body.card.id);
//     try {
//         res.send(
//             await Card.findOne({ where: { id: req.body.card.id } })
//                 .set(req.body.card)
//                 .save()
//         );
//     } catch (err) {
//         next(err);
//     }
// });

module.exports = router;
