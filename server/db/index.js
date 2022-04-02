const conn = require('./conn');
const models = require('./models');
const { Card, Player, Remote } = models;

Card.belongsTo(Player);
Player.hasMany(Card);
Remote.belongsTo(Player);
Player.belongsTo(Player);

const syncAndSeed = () => {
    console.log('database syncing and seeding');
    return conn.sync({ force: true }).then(() => {
        return Promise.all([
            // players
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

            // creatures
            Card.create({
                type: 'door',
                name: 'Ape',
                category: 'creature',
            }),
            Card.create({
                type: 'door',
                name: 'Bear',
                category: 'creature',
            }),
            Card.create({
                type: 'door',
                name: 'Cobra',
                category: 'creature',
            }),
            Card.create({
                type: 'door',
                name: 'Dragon',
                category: 'creature',
            }),
            Card.create({
                type: 'door',
                name: 'Eagle',
                category: 'creature',
            }),

            // races
            Card.create({
                type: 'door',
                name: 'Elf',
                category: 'race',
            }),
            Card.create({
                type: 'door',
                name: 'Dwarf',
                category: 'race',
            }),
            Card.create({
                type: 'door',
                name: 'Halfling',
                category: 'race',
            }),
            Card.create({
                type: 'door',
                name: 'Orc',
                category: 'race',
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
