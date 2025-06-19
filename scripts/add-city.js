const { cities } = require('../src/config/languages');

// Function to add a new city
function addCity(cityKey, cityNames) {
    // Validate input
    if (!cityKey || typeof cityKey !== 'string') {
        console.error('❌ City key must be a string');
        return false;
    }
    
    if (!cityNames || typeof cityNames !== 'object') {
        console.error('❌ City names must be an object with language keys');
        return false;
    }
    
    const requiredLanguages = ['en', 'ru', 'kk'];
    for (const lang of requiredLanguages) {
        if (!cityNames[lang]) {
            console.error(`❌ Missing translation for language: ${lang}`);
            return false;
        }
    }
    
    // Check if city already exists
    if (cities[cityKey]) {
        console.error(`❌ City '${cityKey}' already exists`);
        return false;
    }
    
    // Add the city
    cities[cityKey] = cityNames;
    
    console.log(`✅ City '${cityKey}' added successfully!`);
    console.log('City names:');
    Object.entries(cityNames).forEach(([lang, name]) => {
        console.log(`  ${lang}: ${name}`);
    });
    
    console.log('\n📝 To make this permanent, update the cities object in src/config/languages.js:');
    console.log(`'${cityKey}': {`);
    Object.entries(cityNames).forEach(([lang, name]) => {
        console.log(`    ${lang}: '${name}',`);
    });
    console.log('}');
    
    return true;
}

// Example usage
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length < 4) {
        console.log('Usage: node add-city.js <cityKey> <englishName> <russianName> <kazakhName>');
        console.log('Example: node add-city.js shymkent "Shymkent" "Шымкент" "Шымкент"');
        process.exit(1);
    }
    
    const [cityKey, englishName, russianName, kazakhName] = args;
    
    const cityNames = {
        en: englishName,
        ru: russianName,
        kk: kazakhName
    };
    
    addCity(cityKey, cityNames);
}

module.exports = { addCity }; 