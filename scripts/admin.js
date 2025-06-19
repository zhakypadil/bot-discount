const { Telegraf } = require('telegraf');
const Business = require('../src/models/Business');
const BusinessCode = require('../src/models/BusinessCode');
const Customer = require('../src/models/Customer');
const Interest = require('../src/models/Interest');
const Feedback = require('../src/models/Feedback');
require('../src/config/database');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Admin user IDs (replace with actual admin Telegram IDs)
const ADMIN_IDS = process.env.ADMIN_IDS ? process.env.ADMIN_IDS.split(',').map(id => id.trim()) : [];

// Check if user is admin
function isAdmin(userId) {
    return ADMIN_IDS.includes(userId.toString());
}

// Admin commands
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

// Statistics
bot.action('admin_stats', async (ctx) => {
    if (!isAdmin(ctx.from.id)) return;

    try {
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

// View businesses
bot.action('admin_businesses', async (ctx) => {
    if (!isAdmin(ctx.from.id)) return;

    try {
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

// View customers
bot.action('admin_customers', async (ctx) => {
    if (!isAdmin(ctx.from.id)) return;

    try {
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

// View feedback
bot.action('admin_feedback', async (ctx) => {
    if (!isAdmin(ctx.from.id)) return;

    try {
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

// Generate codes
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

// Handle code generation
bot.action(/generate_(\d+)/, async (ctx) => {
    if (!isAdmin(ctx.from.id)) return;

    const count = parseInt(ctx.match[1]);
    
    try {
        await ctx.answerCbQuery(`Generating ${count} codes...`);
        
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

// View available codes
bot.action('admin_view_codes', async (ctx) => {
    if (!isAdmin(ctx.from.id)) return;

    try {
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

// Back to admin menu
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

// Error handling
bot.catch((err, ctx) => {
    console.error(`Error for ${ctx.updateType}:`, err);
});

// Start bot
bot.launch().then(() => {
    console.log('Admin bot started');
}).catch(console.error);

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM')); 