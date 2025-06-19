const fs = require('fs');
const path = require('path');

console.log('🔍 Deployment Checklist for Mystery Box Bot\n');

// Check required files
const requiredFiles = [
    'package.json',
    'src/index.js',
    'render.yaml',
    'src/config/database.js',
    'src/database/schema.sql',
    'scripts/render-setup.js'
];

console.log('📁 Checking required files:');
let filesOk = true;
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`  ✅ ${file}`);
    } else {
        console.log(`  ❌ ${file} - MISSING`);
        filesOk = false;
    }
});

// Check package.json
console.log('\n📦 Checking package.json:');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Check required dependencies
    const requiredDeps = ['telegraf', 'sequelize', 'pg', 'dotenv'];
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    requiredDeps.forEach(dep => {
        if (deps[dep]) {
            console.log(`  ✅ ${dep}: ${deps[dep]}`);
        } else {
            console.log(`  ❌ ${dep} - MISSING`);
            filesOk = false;
        }
    });
    
    // Check scripts
    const requiredScripts = ['start', 'dev', 'setup'];
    requiredScripts.forEach(script => {
        if (packageJson.scripts[script]) {
            console.log(`  ✅ script: ${script}`);
        } else {
            console.log(`  ❌ script: ${script} - MISSING`);
            filesOk = false;
        }
    });
    
} catch (error) {
    console.log(`  ❌ Error reading package.json: ${error.message}`);
    filesOk = false;
}

// Check render.yaml
console.log('\n⚙️ Checking render.yaml:');
try {
    const renderYaml = fs.readFileSync('render.yaml', 'utf8');
    
    const requiredConfigs = [
        'BOT_TOKEN',
        'ADMIN_IDS', 
        'DATABASE_URL',
        'NODE_ENV'
    ];
    
    requiredConfigs.forEach(config => {
        if (renderYaml.includes(config)) {
            console.log(`  ✅ ${config} configured`);
        } else {
            console.log(`  ❌ ${config} - MISSING`);
            filesOk = false;
        }
    });
    
} catch (error) {
    console.log(`  ❌ Error reading render.yaml: ${error.message}`);
    filesOk = false;
}

// Check environment file
console.log('\n🔐 Checking environment setup:');
if (fs.existsSync('.env')) {
    console.log('  ✅ .env file exists');
} else if (fs.existsSync('env.example')) {
    console.log('  ⚠️  .env file missing, but env.example exists');
    console.log('  💡 Copy env.example to .env and configure variables');
} else {
    console.log('  ❌ No environment files found');
    filesOk = false;
}

// Deployment checklist
console.log('\n🚀 Deployment Checklist:');
console.log('  □ Push code to GitHub repository');
console.log('  □ Create Render account');
console.log('  □ Get Telegram bot token from @BotFather');
console.log('  □ Get your Telegram user ID from @userinfobot');
console.log('  □ Create PostgreSQL database on Render');
console.log('  □ Deploy web service on Render');
console.log('  □ Configure environment variables:');
console.log('    - BOT_TOKEN');
console.log('    - DATABASE_URL');
console.log('    - ADMIN_IDS');
console.log('    - NODE_ENV=production');
console.log('  □ Set Telegram webhook');
console.log('  □ Generate initial business codes');
console.log('  □ Test bot functionality');

// Summary
console.log('\n📊 Summary:');
if (filesOk) {
    console.log('  ✅ All required files and configurations are present');
    console.log('  🚀 Ready for deployment!');
} else {
    console.log('  ❌ Some required files or configurations are missing');
    console.log('  🔧 Please fix the issues above before deploying');
}

console.log('\n📚 Next steps:');
console.log('  1. Follow the deployment guide in RENDER_DEPLOYMENT.md');
console.log('  2. Set up your environment variables');
console.log('  3. Deploy to Render');
console.log('  4. Test your bot functionality');

console.log('\n💡 Tips:');
console.log('  - Keep your bot token and admin IDs secure');
console.log('  - Test locally first with npm run dev');
console.log('  - Monitor Render logs for any errors');
console.log('  - Use the admin panel to generate business codes'); 