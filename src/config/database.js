const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? {
            require: true,
            rejectUnauthorized: false
        } : false
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Test database connection
sequelize.authenticate().then(() => {
  console.log('Connected to PostgreSQL database');
}).catch((err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = sequelize; 