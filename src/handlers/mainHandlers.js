const { Markup } = require('telegraf');
const { languages, cities } = require('../config/languages');
const Business = require('../models/Business');
const Customer = require('../models/Customer');

// Helper function to get text in user's language
function getText(lang, key, replacements = {}) {
    const text = languages[lang]?.[key] || languages['en'][key] || key;
    return Object.keys(replacements).reduce((result, key) => {
        return result.replace(`{${key}}`, replacements[key]);
    }, text);
}

// Helper function to get city name in user's language
function getCityName(cityKey, lang) {
    return cities[cityKey]?.[lang] || cityKey;
}

// Helper function to get all city names in user's language
function getCityOptions(lang) {
    return Object.keys(cities).map(cityKey => ({
        text: getCityName(cityKey, lang),
        callback_data: `city_${cityKey}`
    }));
}

// Language selection handler
async function handleLanguageSelection(ctx) {
    const keyboard = Markup.inlineKeyboard([
        [
            Markup.button.callback('🇺🇸 English', 'lang_en'),
            Markup.button.callback('🇷🇺 Русский', 'lang_ru')
        ],
        [
            Markup.button.callback('🇰🇿 Қазақша', 'lang_kk')
        ]
    ]);

    await ctx.reply(getText('en', 'welcome'), keyboard);
}

// City selection handler
async function handleCitySelection(ctx, lang) {
    const cityOptions = getCityOptions(lang);
    const keyboard = Markup.inlineKeyboard(
        cityOptions.map(city => [Markup.button.callback(city.text, city.callback_data)])
    );

    await ctx.reply(getText(lang, 'selectCity'), keyboard);
}

// Main menu handler
async function handleMainMenu(ctx, lang = 'en') {
    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback(getText(lang, 'business'), 'business')],
        [Markup.button.callback(getText(lang, 'customer'), 'customer')],
        [Markup.button.callback(getText(lang, 'help'), 'help')]
    ]);

    await ctx.reply(getText(lang, 'mainMenu'), keyboard);
}

// Start command handler
async function handleStart(ctx) {
    const telegramId = ctx.from.id.toString();
    
    // Check if user already exists
    const existingBusiness = await Business.findOne({ where: { telegramId } });
    const existingCustomer = await Customer.findOne({ where: { telegramId } });
    
    if (existingBusiness) {
        // User is a business, show business dashboard with navigation buttons
        const lang = existingBusiness.language;
        const { showBusinessDashboard } = require('./businessHandlers');
        await showBusinessDashboard(ctx, existingBusiness, lang);
        return;
    }
    
    if (existingCustomer) {
        // User is a customer, show customer menu
        const lang = existingCustomer.language;
        await handleCustomerMenu(ctx, lang);
        return;
    }
    
    // New user - start with language selection
    await handleLanguageSelection(ctx);
}

// Language selection callback
async function handleLanguageCallback(ctx) {
    const lang = ctx.callbackQuery.data.split('_')[1];
    const telegramId = ctx.from.id.toString();
    
    // Store language in session
    ctx.session = ctx.session || {};
    ctx.session.language = lang;
    
    await ctx.answerCbQuery(getText(lang, 'languageSelected'));
    await ctx.editMessageText(getText(lang, 'languageSelected'));
    
    // Proceed to city selection
    await handleCitySelection(ctx, lang);
}

// City selection callback
async function handleCityCallback(ctx) {
    const cityKey = ctx.callbackQuery.data.split('_')[1];
    const lang = ctx.session?.language || 'en';
    const telegramId = ctx.from.id.toString();
    
    // Store city in session
    ctx.session = ctx.session || {};
    ctx.session.city = cityKey;
    
    const cityName = getCityName(cityKey, lang);
    await ctx.answerCbQuery(getText(lang, 'citySelected') + ' ' + cityName);
    await ctx.editMessageText(getText(lang, 'citySelected') + ' ' + cityName);
    
    // Show main menu
    await handleMainMenu(ctx, lang);
}

// Business callback
async function handleBusinessCallback(ctx) {
    const lang = ctx.session?.language || 'en';
    const city = ctx.session?.city;
    
    if (!lang || !city) {
        await ctx.answerCbQuery(getText(lang, 'notRegistered'));
        return;
    }
    
    // Check if business already exists
    const telegramId = ctx.from.id.toString();
    const existingBusiness = await Business.findOne({ where: { telegramId } });
    
    if (existingBusiness) {
        // Show business dashboard with navigation buttons
        await ctx.answerCbQuery();
        const { showBusinessDashboard } = require('./businessHandlers');
        await showBusinessDashboard(ctx, existingBusiness, lang);
        return;
    }
    
    // Get admin phone number from environment
    const adminPhone = process.env.ADMIN_PHONE || '+7 (777) 123-45-67';
    
    // Start business registration with manual code entry
    await ctx.answerCbQuery();
    await ctx.editMessageText(getText(lang, 'businessRegistration'));
    
    // Set session state for business registration
    ctx.session.registrationType = 'business';
    ctx.session.registrationStep = 'code';
    
    // Show instructions and admin contact
    await ctx.reply(getText(lang, 'businessCodeInstructions', { phone: adminPhone }));
    
    // Prompt for business code
    await ctx.reply(getText(lang, 'enterBusinessCode'));
}

// Customer callback
async function handleCustomerCallback(ctx) {
    const lang = ctx.session?.language || 'en';
    const city = ctx.session?.city;
    
    if (!lang || !city) {
        await ctx.answerCbQuery(getText(lang, 'notRegistered'));
        return;
    }
    
    // Check if customer already exists
    const telegramId = ctx.from.id.toString();
    const existingCustomer = await Customer.findOne({ where: { telegramId } });
    
    if (existingCustomer) {
        // Show customer menu
        await ctx.answerCbQuery();
        await handleCustomerMenu(ctx, lang);
        return;
    }
    
    // Create customer automatically using Telegram data
    try {
        const customerName = ctx.from.first_name || ctx.from.username || getText(lang, 'customer');
        
        const customer = await Customer.create({
            telegramId: telegramId,
            name: customerName,
            language: lang,
            city: city
        });
        
        await ctx.answerCbQuery();
        await ctx.editMessageText(getText(lang, 'customerRegistrationSuccess', {
            name: customerName
        }));
        
        // Show customer menu
        await handleCustomerMenu(ctx, lang);
        
    } catch (error) {
        console.error('Customer registration error:', error);
        await ctx.answerCbQuery(getText(lang, 'registrationFailed'));
    }
}

// Customer menu handler
async function handleCustomerMenu(ctx, lang) {
    const keyboard = Markup.inlineKeyboard([
        [
            Markup.button.callback(getText(lang, 'viewBusinesses'), 'view_businesses')
        ]
    ]);

    await ctx.reply(getText(lang, 'welcomeCustomer'), keyboard);
}

// Help callback
async function handleHelpCallback(ctx) {
    const lang = ctx.session?.language || 'en';
    
    const keyboard = Markup.inlineKeyboard([
        [
            Markup.button.callback(getText(lang, 'backToMenu'), 'back_to_main')
        ]
    ]);
    
    await ctx.answerCbQuery();
    await ctx.editMessageText(getText(lang, 'helpInfo'), keyboard);
}

// Back to main menu callback
async function handleBackToMainCallback(ctx) {
    const lang = ctx.session?.language || 'en';
    const telegramId = ctx.from.id.toString();
    
    await ctx.answerCbQuery();
    
    // Check if user is already registered as business or customer
    const existingBusiness = await Business.findOne({ where: { telegramId } });
    const existingCustomer = await Customer.findOne({ where: { telegramId } });
    
    if (existingBusiness) {
        // Show business dashboard with navigation buttons
        const { showBusinessDashboard } = require('./businessHandlers');
        await showBusinessDashboard(ctx, existingBusiness, lang);
    } else if (existingCustomer) {
        // Show customer menu
        await handleCustomerMenu(ctx, lang);
    } else {
        // Show main menu for new users
        await handleMainMenu(ctx, lang);
    }
}

// Refresh callback
async function handleRefreshCallback(ctx) {
    const lang = ctx.session?.language || 'en';
    const city = ctx.session?.city;
    
    if (!city) {
        await ctx.answerCbQuery(getText(lang, 'notRegistered'));
        return;
    }
    
    await ctx.answerCbQuery();
    await handleCustomerMenu(ctx, lang);
}

// View businesses callback
async function handleViewBusinessesCallback(ctx) {
    const lang = ctx.session?.language || 'en';
    const city = ctx.session?.city;
    
    if (!city) {
        await ctx.answerCbQuery(getText(lang, 'notRegistered'));
        return;
    }
    
    // Get active businesses in the same city
    const businesses = await Business.findAll({
        where: {
            isActive: true,
            city: city
        }
    });
    
    if (businesses.length === 0) {
        await ctx.answerCbQuery();
        await ctx.editMessageText(getText(lang, 'noBusinessesAvailable', { city: getCityName(city, lang) }));
        
        // Show customer menu again
        await handleCustomerMenu(ctx, lang);
        return;
    }
    
    const keyboard = Markup.inlineKeyboard(
        businesses.map(business => [
            Markup.button.callback(business.name, `business_${business.id}`)
        ])
    );
    
    await ctx.answerCbQuery();
    await ctx.editMessageText(getText(lang, 'availableBusinesses', { city: getCityName(city, lang) }), keyboard);
}

module.exports = {
    handleStart,
    handleLanguageCallback,
    handleCityCallback,
    handleBusinessCallback,
    handleCustomerCallback,
    handleHelpCallback,
    handleBackToMainCallback,
    handleRefreshCallback,
    handleViewBusinessesCallback,
    handleCustomerMenu,
    getText,
    getCityName
}; 