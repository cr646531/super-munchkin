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
    status: {
        type: DataTypes.STRING,
        defaultValue: 'inactive',
    },
});

module.exports = Player;
