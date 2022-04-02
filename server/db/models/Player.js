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
    phase: {
        type: DataTypes.STRING,
        defaultValue: 'kick',
    },
    race: {
        type: DataTypes.STRING,
        defaultValue: 'Human',
    },
    class: {
        type: DataTypes.STRING,
        defaultValue: null,
    },
});

module.exports = Player;
