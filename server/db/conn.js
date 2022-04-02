const { Sequelize } = require('@sequelize/core');

const conn = new Sequelize('postgres://hq:passord@localhost:5432/munchkin', { logging: false });

const test = () => {
    console.log('Testing database connection');
    conn.authenticate()
        .then(() => {
            console.info('INFO - Database connected.');
        })
        .catch((err) => {
            console.error('ERROR - Unable to connect to the database:', err);
        });
};

test();

module.exports = conn;
