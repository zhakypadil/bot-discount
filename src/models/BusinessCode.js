const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BusinessCode = sequelize.define('BusinessCode', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    isUsed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    usedBy: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'business_codes',
    timestamps: false
});

module.exports = BusinessCode; 