const conn = require('./conn');
const models = require('./models');
const { Card, Player } = models;

Card.belongsTo(Player);
Player.hasMany(Card);

const syncAndSeed = () => {
    console.log('database syncing and seeding');
    return conn.sync({ force: true }).then(() => {
        return Promise.all([
            // players
            Player.create({
                name: 'Graveyard',
            }),
            Player.create({
                name: 'Buckets',
                level: 1,
                speed: 2,
                hand: [],
            }),
            Player.create({
                name: 'Pockets',
                level: 1,
                speed: 2,
                hand: [],
            }),
            Player.create({
                name: 'Tonics',
                level: 1,
                speed: 2,
                hand: [],
            }),

            // doors
            Card.create({
                type: 'door',
                name: 'Ape',
            }),
            Card.create({
                type: 'door',
                name: 'Bear',
            }),
            Card.create({
                type: 'door',
                name: 'Cobra',
            }),
            Card.create({
                type: 'door',
                name: 'Dragon',
            }),
            Card.create({
                type: 'door',
                name: 'Eagle',
            }),

            // treasures
            Card.create({
                type: 'treasure',
                name: 'Sword',
            }),
            Card.create({
                type: 'treasure',
                name: 'Shield',
            }),
            Card.create({
                type: 'treasure',
                name: 'Helmet',
            }),
            Card.create({
                type: 'treasure',
                name: 'Armor',
            }),
            Card.create({
                type: 'treasure',
                name: 'Footgear',
            }),
        ]);
    });
};

module.exports = {
    models,
    syncAndSeed,
    conn,
};
