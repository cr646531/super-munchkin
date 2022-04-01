const { DataTypes } = require('@sequelize/core');
const conn = require('../conn');

const Player = conn.define('Player', {
    name: {
        type: DataTypes.STRING,
    },
    level: {
        type: DataTypes.INTEGER,
    },
    speed: {
        type: DataTypes.INTEGER,
    },
});

module.exports = Player;
