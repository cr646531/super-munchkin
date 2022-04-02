const { DataTypes } = require('@sequelize/core');
const conn = require('../conn');

const Card = conn.define('Card', {
    type: {
        type: DataTypes.STRING, // door, item
    },
    name: {
        type: DataTypes.STRING,
    },
    category: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'inactive',
    },
    icon: {
        type: DataTypes.STRING,
    },
    bonus: {
        type: DataTypes.INTEGER,
    },
    equipped: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Card;
