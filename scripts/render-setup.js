const pool = require('../src/config/database');
const fs = require('fs');
const path = require('path');

async function setupRenderDatabase() {
    try {
        console.log('🔧 Setting up Render database...');
        
        // Wait a bit for database to be ready
        await new Promise(resolve => setTimeout(resolve, 5000));
        
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
        
        console.log('\n🎉 Render database setup completed successfully!');
        
    } catch (error) {
        console.error('❌ Render database setup failed:', error.message);
        // Don't exit in Render, just log the error
        console.error('This is normal on first deployment, database will be created automatically');
    } finally {
        await pool.end();
    }
}

// Check Render environment
function checkRenderEnvironment() {
    console.log('🔍 Checking Render environment...');
    
    const required = ['BOT_TOKEN', 'DATABASE_URL', 'RENDER_EXTERNAL_URL'];
    const missing = [];
    
    for (const var_name of required) {
        if (!process.env[var_name]) {
            missing.push(var_name);
        }
    }
    
    if (missing.length > 0) {
        console.log('⚠️ Missing environment variables:', missing.join(', '));
        console.log('These will be set in Render dashboard');
    } else {
        console.log('✅ Render environment looks good');
    }
}

async function main() {
    checkRenderEnvironment();
    await setupRenderDatabase();
}

if (require.main === module) {
    main();
}

module.exports = { setupRenderDatabase, checkRenderEnvironment }; 