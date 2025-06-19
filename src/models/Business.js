const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Business = sequelize.define('Business', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    telegramId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    smallPrice: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    mediumPrice: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    largePrice: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    },
    salesTime: {
        type: DataTypes.TIME,
        defaultValue: '18:00:00'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    language: {
        type: DataTypes.ENUM('en', 'ru', 'kk'),
        defaultValue: 'en'
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'businesses',
    timestamps: true
});

module.exports = Business; 