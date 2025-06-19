const pool = require('../config/database');

class CustomerService {
    // Create or get customer
    async getOrCreateCustomer(customerData) {
        // First try to get existing customer
        const existingQuery = `
            SELECT * FROM customers 
            WHERE telegram_id = $1
        `;
        let result = await pool.query(existingQuery, [customerData.telegramId]);
        
        if (result.rows.length > 0) {
            return result.rows[0];
        }

        // Create new customer if doesn't exist
        const createQuery = `
            INSERT INTO customers (telegram_id, username, first_name, last_name)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        result = await pool.query(createQuery, [
            customerData.telegramId,
            customerData.username,
            customerData.firstName,
            customerData.lastName
        ]);
        return result.rows[0];
    }

    // Record customer interest in a box
    async recordInterest(customerId, businessId, size) {
        const query = `
            INSERT INTO interests (customer_id, business_id, size)
            VALUES ($1, $2, $3)
            ON CONFLICT (customer_id, business_id, size) DO NOTHING
            RETURNING *
        `;
        const result = await pool.query(query, [customerId, businessId, size]);
        return result.rows[0];
    }

    // Submit feedback
    async submitFeedback(customerId, businessId, message) {
        const query = `
            INSERT INTO feedback (customer_id, business_id, message)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const result = await pool.query(query, [customerId, businessId, message]);
        return result.rows[0];
    }

    // Get customer by telegram ID
    async getCustomerByTelegramId(telegramId) {
        const query = `
            SELECT * FROM customers 
            WHERE telegram_id = $1
        `;
        const result = await pool.query(query, [telegramId]);
        return result.rows[0];
    }

    // Check if customer already has interest in a business
    async hasInterest(customerId, businessId) {
        const query = `
            SELECT * FROM interests 
            WHERE customer_id = $1 AND business_id = $2
        `;
        const result = await pool.query(query, [customerId, businessId]);
        return result.rows.length > 0;
    }

    // Get customer's interests
    async getCustomerInterests(customerId) {
        const query = `
            SELECT i.*, b.name as business_name, b.address
            FROM interests i
            JOIN businesses b ON i.business_id = b.id
            WHERE i.customer_id = $1
            ORDER BY i.created_at DESC
        `;
        const result = await pool.query(query, [customerId]);
        return result.rows;
    }
}

module.exports = new CustomerService(); 