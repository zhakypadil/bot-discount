const { Telegraf, session } = require('telegraf');
const sequelize = require('./config/database');
const mainHandlers = require('./handlers/mainHandlers');
const businessHandlers = require('./handlers/businessHandlers');
const customerHandlers = require('./handlers/customerHandlers');

// Load environment variables
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Session middleware
bot.use(session());

// Database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully.');
        return sequelize.sync();
    })
    .then(() => {
        console.log('Database synchronized.');
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

// Start command
bot.start(mainHandlers.handleStart);

// Language selection callbacks
bot.action(/lang_(.+)/, mainHandlers.handleLanguageCallback);

// City selection callbacks
bot.action(/city_(.+)/, mainHandlers.handleCityCallback);

// Main menu callbacks
bot.action('business', mainHandlers.handleBusinessCallback);
bot.action('customer', mainHandlers.handleCustomerCallback);
bot.action('help', mainHandlers.handleHelpCallback);
bot.action('back_to_main', mainHandlers.handleBackToMainCallback);

// Customer flow callbacks
bot.action('view_businesses', mainHandlers.handleViewBusinessesCallback);
bot.action('refresh', mainHandlers.handleRefreshCallback);
bot.action(/business_(\d+)/, customerHandlers.handleBusinessSelectionCallback);
bot.action(/interest_(.+)_(.+)/, customerHandlers.handleInterestCallback);
bot.action(/feedback_(.+)/, customerHandlers.handleFeedbackCallback);

// Business flow callbacks
bot.action('set_prices', businessHandlers.handleSetPricesCallback);
bot.action(/price_(.+)_(.+)/, businessHandlers.handlePriceCallback);
bot.action('set_time', businessHandlers.handleSetTimeCallback);
bot.action(/time_(.+)/, businessHandlers.handleTimeCallback);
bot.action(/mark_(.+)/, businessHandlers.handleStatusCallback);
bot.action('view_interests', businessHandlers.handleViewInterestsCallback);
bot.action('business_dashboard', businessHandlers.handleBusinessDashboardCallback);

// Text message handlers for registration flows
bot.on('text', async (ctx) => {
    const registrationType = ctx.session?.registrationType;
    
    if (registrationType === 'business') {
        await businessHandlers.handleBusinessRegistration(ctx);
    } else if (registrationType === 'customer') {
        await customerHandlers.handleCustomerRegistration(ctx);
    } else if (ctx.session?.feedbackStep === 'message') {
        await customerHandlers.handleFeedbackSubmission(ctx);
    }
});

// Error handling
bot.catch((err, ctx) => {
    console.error(`Error for ${ctx.updateType}:`, err);
    ctx.reply('An error occurred. Please try again.');
});

// Webhook setup for production
if (process.env.NODE_ENV === 'production') {
    const port = process.env.PORT || 3000;
    const url = process.env.WEBHOOK_URL;
    
    bot.telegram.setWebhook(url);
    bot.startWebhook(`/webhook`, null, port);
    console.log(`Bot webhook started on port ${port}`);
} else {
    // Polling for development
    bot.launch();
    console.log('Bot started in polling mode');
}

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
}); 