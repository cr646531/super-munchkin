const { DataTypes } = require('@sequelize/core');
const conn = require('../conn');

const Card = conn.define('Card', {
    type: {
        type: DataTypes.STRING, // door, item
    },
    name: {
        type: DataTypes.STRING,
    },
});

module.exports = Card;
