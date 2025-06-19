const pool = require('../config/database');

class BusinessService {
    // Verify business code
    async verifyBusinessCode(code) {
        const query = `
            SELECT * FROM business_codes 
            WHERE code = $1 AND used = FALSE AND expires_at > NOW()
        `;
        const result = await pool.query(query, [code]);
        return result.rows[0];
    }

    // Mark business code as used
    async markCodeAsUsed(code) {
        const query = `
            UPDATE business_codes 
            SET used = TRUE 
            WHERE code = $1
        `;
        await pool.query(query, [code]);
    }

    // Create new business
    async createBusiness(businessData) {
        const query = `
            INSERT INTO businesses (telegram_id, name, address, phone)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const result = await pool.query(query, [
            businessData.telegramId,
            businessData.name,
            businessData.address,
            businessData.phone
        ]);
        return result.rows[0];
    }

    // Get business by telegram ID
    async getBusinessByTelegramId(telegramId) {
        const query = `
            SELECT * FROM businesses 
            WHERE telegram_id = $1
        `;
        const result = await pool.query(query, [telegramId]);
        return result.rows[0];
    }

    // Update business prices
    async updatePrices(telegramId, prices) {
        const query = `
            UPDATE businesses 
            SET small_box_price = $1, medium_box_price = $2, large_box_price = $3, updated_at = NOW()
            WHERE telegram_id = $4
            RETURNING *
        `;
        const result = await pool.query(query, [
            prices.small,
            prices.medium,
            prices.large,
            telegramId
        ]);
        return result.rows[0];
    }

    // Update sales start time
    async updateSalesStartTime(telegramId, time) {
        const query = `
            UPDATE businesses 
            SET sales_start_time = $1, updated_at = NOW()
            WHERE telegram_id = $2
            RETURNING *
        `;
        const result = await pool.query(query, [time, telegramId]);
        return result.rows[0];
    }

    // Toggle availability for today
    async toggleAvailability(telegramId, available) {
        const query = `
            UPDATE businesses 
            SET available_today = $1, updated_at = NOW()
            WHERE telegram_id = $2
            RETURNING *
        `;
        const result = await pool.query(query, [available, telegramId]);
        return result.rows[0];
    }

    // Get customer interest count by size
    async getInterestCount(telegramId) {
        const query = `
            SELECT i.size, COUNT(*) as count
            FROM interests i
            JOIN businesses b ON i.business_id = b.id
            WHERE b.telegram_id = $1
            GROUP BY i.size
            ORDER BY i.size
        `;
        const result = await pool.query(query, [telegramId]);
        return result.rows;
    }

    // Get all active businesses
    async getActiveBusinesses() {
        const query = `
            SELECT * FROM businesses 
            WHERE available_today = TRUE
            ORDER BY name
        `;
        const result = await pool.query(query);
        return result.rows;
    }

    // Get business by ID
    async getBusinessById(id) {
        const query = `
            SELECT * FROM businesses 
            WHERE id = $1
        `;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
}

module.exports = new BusinessService(); 