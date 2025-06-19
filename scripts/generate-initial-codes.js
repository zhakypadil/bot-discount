const BusinessCode = require('../src/models/BusinessCode');
require('../src/config/database');

async function generateInitialCodes() {
    try {
        console.log('🔑 Generating initial business codes...');
        
        // Generate 20 codes for initial setup
        const codes = await BusinessCode.generateMultipleCodes(20);
        
        console.log(`✅ Successfully generated ${codes.length} business codes:`);
        console.log('');
        
        codes.forEach((code, index) => {
            console.log(`${index + 1}. ${code.code}`);
        });
        
        console.log('');
        console.log(`📅 All codes expire on: ${new Date(codes[0].expiresAt).toLocaleDateString()}`);
        console.log('');
        console.log('💡 Share these codes with businesses that want to register.');
        console.log('🔧 Use the admin panel (/admin) to generate more codes as needed.');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error generating codes:', error);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    generateInitialCodes();
}

module.exports = generateInitialCodes; 