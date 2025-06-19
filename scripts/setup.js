const pool = require('../src/config/database');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
    try {
        console.log('🔧 Setting up database...');
        
        // Read and execute schema
        const schemaPath = path.join(__dirname, '../src/database/schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        
        await pool.query(schema);
        console.log('✅ Database schema created successfully');
        
        // Verify tables exist
        const tables = ['business_codes', 'businesses', 'customers', 'interests', 'feedback'];
        for (const table of tables) {
            const result = await pool.query(`
                SELECT EXISTS (
                    SELECT FROM information_schema.tables 
                    WHERE table_name = $1
                );
            `, [table]);
            
            if (result.rows[0].exists) {
                console.log(`✅ Table '${table}' exists`);
            } else {
                console.log(`❌ Table '${table}' missing`);
            }
        }
        
        // Check business codes
        const codes = await pool.query('SELECT code FROM business_codes WHERE used = FALSE');
        console.log(`✅ ${codes.rows.length} business codes available`);
        
        console.log('\n🎉 Database setup completed successfully!');
        
    } catch (error) {
        console.error('❌ Database setup failed:', error.message);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

// Check environment variables
function checkEnvironment() {
    console.log('🔍 Checking environment configuration...');
    
    const required = ['BOT_TOKEN', 'DATABASE_URL', 'ADMIN_PHONE'];
    const missing = [];
    
    for (const var_name of required) {
        if (!process.env[var_name]) {
            missing.push(var_name);
        }
    }
    
    if (missing.length > 0) {
        console.error('❌ Missing environment variables:', missing.join(', '));
        console.log('Please check your .env file');
        process.exit(1);
    }
    
    console.log('✅ Environment configuration looks good');
}

async function main() {
    checkEnvironment();
    await setupDatabase();
}

if (require.main === module) {
    main();
}

module.exports = { setupDatabase, checkEnvironment }; 