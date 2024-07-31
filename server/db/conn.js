const { Sequelize } = require('@sequelize/core');

const conn = new Sequelize(
    'postgres://cr646531:SourPatchKids@munchkin.chcwuuy02b8e.us-east-2.rds.amazonaws.com:5432/munchkin',
    {
        logging: true,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false, // Allow self-signed certificates
            },
        },
    }
);

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
