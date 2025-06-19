const pool = require('../src/config/database');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}

async function showMenu() {
    console.log('\n🔧 Admin Panel');
    console.log('1. List all business codes');
    console.log('2. Add new business code');
    console.log('3. View business statistics');
    console.log('4. View customer statistics');
    console.log('5. Exit');
    
    const choice = await question('\nSelect an option (1-5): ');
    return choice;
}

async function listBusinessCodes() {
    console.log('\n📋 Business Codes:');
    console.log('Code\t\tUsed\tExpires\t\t\tCreated');
    console.log('-'.repeat(70));
    
    const result = await pool.query(`
        SELECT code, used, expires_at, created_at 
        FROM business_codes 
        ORDER BY created_at DESC
    `);
    
    result.rows.forEach(row => {
        const status = row.used ? '✅' : '❌';
        console.log(`${row.code}\t\t${status}\t${row.expires_at.toISOString().split('T')[0]}\t${row.created_at.toISOString().split('T')[0]}`);
    });
}

async function addBusinessCode() {
    const code = await question('Enter business code: ');
    const days = await question('Enter expiration days (default 365): ') || '365';
    
    try {
        await pool.query(`
            INSERT INTO business_codes (code, expires_at) 
            VALUES ($1, NOW() + INTERVAL '$2 days')
        `, [code.toUpperCase(), parseInt(days)]);
        
        console.log('✅ Business code added successfully!');
    } catch (error) {
        console.error('❌ Error adding business code:', error.message);
    }
}

async function showBusinessStats() {
    console.log('\n📊 Business Statistics:');
    
    const stats = await pool.query(`
        SELECT 
            COUNT(*) as total_businesses,
            COUNT(CASE WHEN available_today = TRUE THEN 1 END) as active_today,
            AVG(small_box_price) as avg_small_price,
            AVG(medium_box_price) as avg_medium_price,
            AVG(large_box_price) as avg_large_price
        FROM businesses
    `);
    
    const row = stats.rows[0];
    console.log(`Total Businesses: ${row.total_businesses}`);
    console.log(`Active Today: ${row.active_today}`);
    console.log(`Average Small Box Price: $${row.avg_small_price ? row.avg_small_price.toFixed(2) : '0.00'}`);
    console.log(`Average Medium Box Price: $${row.avg_medium_price ? row.avg_medium_price.toFixed(2) : '0.00'}`);
    console.log(`Average Large Box Price: $${row.avg_large_price ? row.avg_large_price.toFixed(2) : '0.00'}`);
    
    // Top businesses by interest
    const topBusinesses = await pool.query(`
        SELECT b.name, COUNT(i.id) as interest_count
        FROM businesses b
        LEFT JOIN interests i ON b.id = i.business_id
        GROUP BY b.id, b.name
        ORDER BY interest_count DESC
        LIMIT 5
    `);
    
    console.log('\n🏆 Top Businesses by Customer Interest:');
    topBusinesses.rows.forEach((business, index) => {
        console.log(`${index + 1}. ${business.name}: ${business.interest_count} interests`);
    });
}

async function showCustomerStats() {
    console.log('\n👥 Customer Statistics:');
    
    const stats = await pool.query(`
        SELECT 
            COUNT(*) as total_customers,
            COUNT(DISTINCT customer_id) as customers_with_interests,
            COUNT(*) as total_interests
        FROM customers c
        LEFT JOIN interests i ON c.id = i.customer_id
    `);
    
    const row = stats.rows[0];
    console.log(`Total Customers: ${row.total_customers}`);
    console.log(`Customers with Interests: ${row.customers_with_interests}`);
    console.log(`Total Interests Expressed: ${row.total_interests}`);
    
    // Interest breakdown by size
    const sizeStats = await pool.query(`
        SELECT size, COUNT(*) as count
        FROM interests
        GROUP BY size
        ORDER BY count DESC
    `);
    
    console.log('\n📦 Interest by Box Size:');
    sizeStats.rows.forEach(row => {
        console.log(`${row.size.charAt(0).toUpperCase() + row.size.slice(1)}: ${row.count} interests`);
    });
    
    // Recent feedback
    const recentFeedback = await pool.query(`
        SELECT f.message, b.name as business_name, f.created_at
        FROM feedback f
        JOIN businesses b ON f.business_id = b.id
        ORDER BY f.created_at DESC
        LIMIT 3
    `);
    
    console.log('\n💬 Recent Feedback:');
    recentFeedback.rows.forEach(feedback => {
        console.log(`\nBusiness: ${feedback.business_name}`);
        console.log(`Date: ${feedback.created_at.toISOString().split('T')[0]}`);
        console.log(`Message: ${feedback.message.substring(0, 100)}${feedback.message.length > 100 ? '...' : ''}`);
    });
}

async function main() {
    console.log('🔐 Admin Panel - Mystery Box Bot');
    
    try {
        // Test database connection
        await pool.query('SELECT NOW()');
        console.log('✅ Database connected');
        
        while (true) {
            const choice = await showMenu();
            
            switch (choice) {
                case '1':
                    await listBusinessCodes();
                    break;
                case '2':
                    await addBusinessCode();
                    break;
                case '3':
                    await showBusinessStats();
                    break;
                case '4':
                    await showCustomerStats();
                    break;
                case '5':
                    console.log('👋 Goodbye!');
                    process.exit(0);
                default:
                    console.log('❌ Invalid option');
            }
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    } finally {
        rl.close();
        await pool.end();
    }
}

if (require.main === module) {
    main();
} 