const { DataTypes } = require('@sequelize/core');
const conn = require('../conn');

const Remote = conn.define('Remote', {
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
});

module.exports = Remote;
