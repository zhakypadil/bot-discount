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

// Admin user IDs (from environment variable)
const ADMIN_IDS = process.env.ADMIN_IDS ? process.env.ADMIN_IDS.split(',').map(id => id.trim()) : [];

// Check if user is admin
function isAdmin(userId) {
    return ADMIN_IDS.includes(userId.toString());
}

// Admin command handler
bot.command('admin', async (ctx) => {
    if (!isAdmin(ctx.from.id)) {
        return ctx.reply('Access denied. Admin only.');
    }

    const keyboard = {
        inline_keyboard: [
            [
                { text: '📊 Statistics', callback_data: 'admin_stats' },
                { text: '🏪 Businesses', callback_data: 'admin_businesses' }
            ],
            [
                { text: '👥 Customers', callback_data: 'admin_customers' },
                { text: '📝 Feedback', callback_data: 'admin_feedback' }
            ],
            [
                { text: '🔑 Generate Codes', callback_data: 'admin_generate_codes' },
                { text: '📋 View Codes', callback_data: 'admin_view_codes' }
            ]
        ]
    };

    await ctx.reply('🔧 Admin Panel', { reply_markup: keyboard });
});

// Admin action handlers
bot.action('admin_stats', async (ctx) => {
    if (!isAdmin(ctx.from.id)) return;

    try {
        const Business = require('./models/Business');
        const BusinessCode = require('./models/BusinessCode');
        const Customer = require('./models/Customer');
        const Interest = require('./models/Interest');
        const Feedback = require('./models/Feedback');

        const businessCount = await Business.count();
        const customerCount = await Customer.count();
        const interestCount = await Interest.count();
        const feedbackCount = await Feedback.count();
        const codeStats = await BusinessCode.getCodeStats();

        const stats = `📊 System Statistics

🏪 Businesses: ${businessCount}
👥 Customers: ${customerCount}
💼 Interests: ${interestCount}
📝 Feedback: ${feedbackCount}

🔑 Business Codes:
• Total: ${codeStats.total}
• Used: ${codeStats.used}
• Available: ${codeStats.available}
• Expired: ${codeStats.expired}`;

        await ctx.answerCbQuery();
        await ctx.editMessageText(stats, {
            reply_markup: {
                inline_keyboard: [[{ text: '🔙 Back', callback_data: 'admin_back' }]]
            }
        });
    } catch (error) {
        console.error('Stats error:', error);
        await ctx.answerCbQuery('Error loading statistics');
    }
});

bot.action('admin_businesses', async (ctx) => {
    if (!isAdmin(ctx.from.id)) return;

    try {
        const Business = require('./models/Business');
        const businesses = await Business.findAll({
            order: [['createdAt', 'DESC']],
            limit: 10
        });

        let message = '🏪 Recent Businesses\n\n';
        businesses.forEach((business, index) => {
            message += `${index + 1}. ${business.name}\n`;
            message += `   📍 ${business.address}\n`;
            message += `   📞 ${business.phone}\n`;
            message += `   🌍 ${business.city} (${business.language})\n`;
            message += `   ${business.isActive ? '🟢 Active' : '🔴 Inactive'}\n\n`;
        });

        await ctx.answerCbQuery();
        await ctx.editMessageText(message, {
            reply_markup: {
                inline_keyboard: [[{ text: '🔙 Back', callback_data: 'admin_back' }]]
            }
        });
    } catch (error) {
        console.error('Businesses error:', error);
        await ctx.answerCbQuery('Error loading businesses');
    }
});

bot.action('admin_customers', async (ctx) => {
    if (!isAdmin(ctx.from.id)) return;

    try {
        const Customer = require('./models/Customer');
        const customers = await Customer.findAll({
            order: [['createdAt', 'DESC']],
            limit: 10
        });

        let message = '👥 Recent Customers\n\n';
        customers.forEach((customer, index) => {
            message += `${index + 1}. ${customer.name}\n`;
            message += `   📞 ${customer.phone}\n`;
            message += `   🌍 ${customer.city} (${customer.language})\n\n`;
        });

        await ctx.answerCbQuery();
        await ctx.editMessageText(message, {
            reply_markup: {
                inline_keyboard: [[{ text: '🔙 Back', callback_data: 'admin_back' }]]
            }
        });
    } catch (error) {
        console.error('Customers error:', error);
        await ctx.answerCbQuery('Error loading customers');
    }
});

bot.action('admin_feedback', async (ctx) => {
    if (!isAdmin(ctx.from.id)) return;

    try {
        const Feedback = require('./models/Feedback');
        const Customer = require('./models/Customer');
        const feedbacks = await Feedback.findAll({
            include: [{
                model: Customer,
                attributes: ['name', 'phone']
            }],
            order: [['createdAt', 'DESC']],
            limit: 10
        });

        let message = '📝 Recent Feedback\n\n';
        feedbacks.forEach((feedback, index) => {
            message += `${index + 1}. ${feedback.rating}/5 ⭐\n`;
            message += `   💬 ${feedback.comment}\n`;
            message += `   👤 ${feedback.Customer.name} (${feedback.Customer.phone})\n\n`;
        });

        await ctx.answerCbQuery();
        await ctx.editMessageText(message, {
            reply_markup: {
                inline_keyboard: [[{ text: '🔙 Back', callback_data: 'admin_back' }]]
            }
        });
    } catch (error) {
        console.error('Feedback error:', error);
        await ctx.answerCbQuery('Error loading feedback');
    }
});

bot.action('admin_generate_codes', async (ctx) => {
    if (!isAdmin(ctx.from.id)) return;

    const keyboard = {
        inline_keyboard: [
            [
                { text: '🔑 Generate 5', callback_data: 'generate_5' },
                { text: '🔑 Generate 10', callback_data: 'generate_10' },
                { text: '🔑 Generate 20', callback_data: 'generate_20' }
            ],
            [{ text: '🔙 Back', callback_data: 'admin_back' }]
        ]
    };

    await ctx.answerCbQuery();
    await ctx.editMessageText('🔑 Generate Business Codes\n\nSelect how many codes to generate:', {
        reply_markup: keyboard
    });
});

bot.action(/generate_(\d+)/, async (ctx) => {
    if (!isAdmin(ctx.from.id)) return;

    const count = parseInt(ctx.match[1]);
    
    try {
        await ctx.answerCbQuery(`Generating ${count} codes...`);
        
        const BusinessCode = require('./models/BusinessCode');
        const codes = await BusinessCode.generateMultipleCodes(count);
        
        let message = `✅ Generated ${codes.length} business codes:\n\n`;
        codes.forEach((code, index) => {
            message += `${index + 1}. ${code.code}\n`;
        });
        
        message += `\nExpires: ${new Date(codes[0].expiresAt).toLocaleDateString()}`;

        await ctx.editMessageText(message, {
            reply_markup: {
                inline_keyboard: [[{ text: '🔙 Back', callback_data: 'admin_back' }]]
            }
        });
    } catch (error) {
        console.error('Code generation error:', error);
        await ctx.answerCbQuery('Error generating codes');
    }
});

bot.action('admin_view_codes', async (ctx) => {
    if (!isAdmin(ctx.from.id)) return;

    try {
        const BusinessCode = require('./models/BusinessCode');
        const availableCodes = await BusinessCode.getAvailableCodes();
        const codeStats = await BusinessCode.getCodeStats();

        let message = `📋 Available Business Codes\n\n`;
        message += `📊 Stats: ${codeStats.available} available, ${codeStats.used} used, ${codeStats.expired} expired\n\n`;

        if (availableCodes.length === 0) {
            message += 'No available codes. Generate some first!';
        } else {
            message += 'Available codes:\n';
            availableCodes.slice(0, 20).forEach((code, index) => {
                message += `${index + 1}. ${code.code}\n`;
            });
            
            if (availableCodes.length > 20) {
                message += `\n... and ${availableCodes.length - 20} more`;
            }
        }

        await ctx.answerCbQuery();
        await ctx.editMessageText(message, {
            reply_markup: {
                inline_keyboard: [[{ text: '🔙 Back', callback_data: 'admin_back' }]]
            }
        });
    } catch (error) {
        console.error('View codes error:', error);
        await ctx.answerCbQuery('Error loading codes');
    }
});

bot.action('admin_back', async (ctx) => {
    if (!isAdmin(ctx.from.id)) return;

    const keyboard = {
        inline_keyboard: [
            [
                { text: '📊 Statistics', callback_data: 'admin_stats' },
                { text: '🏪 Businesses', callback_data: 'admin_businesses' }
            ],
            [
                { text: '👥 Customers', callback_data: 'admin_customers' },
                { text: '📝 Feedback', callback_data: 'admin_feedback' }
            ],
            [
                { text: '🔑 Generate Codes', callback_data: 'admin_generate_codes' },
                { text: '📋 View Codes', callback_data: 'admin_view_codes' }
            ]
        ]
    };

    await ctx.answerCbQuery();
    await ctx.editMessageText('🔧 Admin Panel', { reply_markup: keyboard });
});

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