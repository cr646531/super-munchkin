const { DataTypes } = require('@sequelize/core');
const conn = require('../conn');

const State = conn.define('State', {
    phase: {
        type: DataTypes.STRING,
    },
});

module.exports = State;
