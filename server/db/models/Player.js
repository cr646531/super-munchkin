const { DataTypes } = require('@sequelize/core');
const conn = require('../conn');

const Player = conn.define('Player', {
    name: {
        type: DataTypes.STRING,
    },
});

module.exports = Player;
