const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Interest = sequelize.define('Interest', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'customers',
            key: 'id'
        }
    },
    businessId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'businesses',
            key: 'id'
        }
    },
    boxSize: {
        type: DataTypes.ENUM('small', 'medium', 'large'),
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'interests',
    timestamps: false
});

module.exports = Interest; 