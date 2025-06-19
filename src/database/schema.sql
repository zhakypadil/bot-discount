-- Create database tables for the bot-discount application

-- Business codes table for registration
CREATE TABLE IF NOT EXISTS business_codes (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) UNIQUE NOT NULL,
    is_used BOOLEAN DEFAULT false,
    used_by INTEGER REFERENCES businesses(id),
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Businesses table
CREATE TABLE IF NOT EXISTS businesses (
    id SERIAL PRIMARY KEY,
    telegram_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(50) NOT NULL,
    small_price DECIMAL(10,2) DEFAULT 0.00,
    medium_price DECIMAL(10,2) DEFAULT 0.00,
    large_price DECIMAL(10,2) DEFAULT 0.00,
    sales_time TIME DEFAULT '18:00:00',
    is_active BOOLEAN DEFAULT false,
    language VARCHAR(2) DEFAULT 'en' CHECK (language IN ('en', 'ru', 'kk')),
    city VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customers table (for tracking unique customers)
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    telegram_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    language VARCHAR(2) DEFAULT 'en' CHECK (language IN ('en', 'ru', 'ru', 'kk')),
    city VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Interest table for customer interest in boxes
CREATE TABLE IF NOT EXISTS interests (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
    business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
    box_size VARCHAR(10) NOT NULL CHECK (box_size IN ('small', 'medium', 'large')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(customer_id, business_id, box_size)
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
    business_id INTEGER REFERENCES businesses(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_businesses_telegram_id ON businesses(telegram_id);
CREATE INDEX IF NOT EXISTS idx_businesses_city ON businesses(city);
CREATE INDEX IF NOT EXISTS idx_businesses_active ON businesses(is_active);
CREATE INDEX IF NOT EXISTS idx_customers_telegram_id ON customers(telegram_id);
CREATE INDEX IF NOT EXISTS idx_customers_city ON customers(city);
CREATE INDEX IF NOT EXISTS idx_interests_customer_id ON interests(customer_id);
CREATE INDEX IF NOT EXISTS idx_interests_business_id ON interests(business_id);
CREATE INDEX IF NOT EXISTS idx_feedback_customer_id ON feedback(customer_id);
CREATE INDEX IF NOT EXISTS idx_feedback_business_id ON feedback(business_id);

-- Insert some sample business codes
INSERT INTO business_codes (code, expires_at) VALUES 
    ('BAKERY001', NOW() + INTERVAL '1 year'),
    ('CAFE002', NOW() + INTERVAL '1 year'),
    ('REST003', NOW() + INTERVAL '1 year')
ON CONFLICT (code) DO NOTHING; 