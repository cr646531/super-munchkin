const conn = require('./conn');
const Player = require('./models/Player');

const syncAndSeed = () => {
    console.log('database syncing and seeding');
    return conn.sync({ force: true }).then(() => {
        return Promise.all([Player.create({ name: 'Charlie' })]);
    });
};

module.exports = {
    models: {
        Player,
    },
    syncAndSeed,
};
