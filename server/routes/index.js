const rootRouter = require('express').Router();

const cards = require('./cards');
const players = require('./players');
const phase = require('./phase');
const data = require('./data');

rootRouter.use('/cards', cards);
rootRouter.use('/players', players);
rootRouter.use('/phase', phase);
rootRouter.use('/data', data);

module.exports = rootRouter;
