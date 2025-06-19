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

// Static method to generate a unique business code
BusinessCode.generateCode = async function() {
    const generateRandomCode = () => {
        const prefix = 'BUS';
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.random().toString(36).substring(2, 5).toUpperCase();
        return `${prefix}${timestamp}${random}`;
    };

    let code;
    let attempts = 0;
    const maxAttempts = 10;

    do {
        code = generateRandomCode();
        attempts++;
        
        // Check if code already exists
        const existingCode = await this.findOne({ where: { code } });
        if (!existingCode) {
            break;
        }
    } while (attempts < maxAttempts);

    if (attempts >= maxAttempts) {
        throw new Error('Unable to generate unique business code after maximum attempts');
    }

    return code;
};

// Static method to create a new business code (for admin use)
BusinessCode.createCode = async function() {
    const code = await this.generateCode();
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1); // Expires in 1 year

    return await this.create({
        code: code,
        expiresAt: expiresAt
    });
};

// Static method to generate multiple codes at once
BusinessCode.generateMultipleCodes = async function(count = 10) {
    const codes = [];
    for (let i = 0; i < count; i++) {
        try {
            const code = await this.createCode();
            codes.push(code);
        } catch (error) {
            console.error(`Failed to generate code ${i + 1}:`, error.message);
        }
    }
    return codes;
};

// Static method to get available unused codes
BusinessCode.getAvailableCodes = async function() {
    return await this.findAll({
        where: {
            isUsed: false,
            expiresAt: { [require('sequelize').Op.gt]: new Date() }
        },
        order: [['createdAt', 'ASC']]
    });
};

// Static method to get code count statistics
BusinessCode.getCodeStats = async function() {
    const total = await this.count();
    const used = await this.count({ where: { isUsed: true } });
    const available = await this.count({ 
        where: { 
            isUsed: false,
            expiresAt: { [require('sequelize').Op.gt]: new Date() }
        }
    });
    const expired = await this.count({ 
        where: { 
            expiresAt: { [require('sequelize').Op.lte]: new Date() }
        }
    });

    return { total, used, available, expired };
};

module.exports = BusinessCode; 