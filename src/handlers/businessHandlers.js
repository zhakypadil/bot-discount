const { Markup } = require('telegraf');
const Business = require('../models/Business');
const BusinessCode = require('../models/BusinessCode');
const Interest = require('../models/Interest');
const { getText } = require('./mainHandlers');

// Business registration flow
async function handleBusinessRegistration(ctx) {
    const telegramId = ctx.from.id.toString();
    const lang = ctx.session?.language || 'en';
    const city = ctx.session?.city;
    
    if (!lang || !city) {
        await ctx.reply('Please complete language and city selection first');
        return;
    }
    
    const step = ctx.session.registrationStep;
    
    switch (step) {
        case 'code':
            // Process the code that was just entered
            const code = ctx.message.text;
            const businessCode = await BusinessCode.findOne({ 
                where: { 
                    code: code,
                    isUsed: false,
                    expiresAt: { [require('sequelize').Op.gt]: new Date() }
                }
            });
            
            if (!businessCode) {
                await ctx.reply(getText(lang, 'invalidCode'));
                return;
            }
            
            // Mark code as used
            await businessCode.update({ 
                isUsed: true,
                usedBy: null // Will be set when business is created
            });
            
            ctx.session.businessCode = code;
            ctx.session.registrationStep = 'name';
            await ctx.reply(getText(lang, 'codeValid'));
            break;
            
        case 'name':
            ctx.session.businessName = ctx.message.text;
            ctx.session.registrationStep = 'address';
            await ctx.reply(getText(lang, 'businessAddress'));
            break;
            
        case 'address':
            ctx.session.businessAddress = ctx.message.text;
            ctx.session.registrationStep = 'phone';
            await ctx.reply(getText(lang, 'contactPhone'));
            break;
            
        case 'phone':
            const phone = ctx.message.text;
            
            try {
                // Create business
                const business = await Business.create({
                    telegramId: telegramId,
                    name: ctx.session.businessName,
                    address: ctx.session.businessAddress,
                    phone: phone,
                    language: lang,
                    city: city
                });
                
                // Update business code with business ID
                await BusinessCode.update(
                    { usedBy: business.id },
                    { where: { code: ctx.session.businessCode } }
                );
                
                // Clear session
                delete ctx.session.registrationType;
                delete ctx.session.registrationStep;
                delete ctx.session.businessCode;
                delete ctx.session.businessName;
                delete ctx.session.businessAddress;
                
                await ctx.reply(getText(lang, 'registrationSuccess', {
                    name: business.name,
                    address: business.address,
                    phone: business.phone
                }));
                
                // Show business dashboard
                await showBusinessDashboard(ctx, business, lang);
                
            } catch (error) {
                console.error('Business registration error:', error);
                await ctx.reply(getText(lang, 'registrationFailed'));
            }
            break;
    }
}

// Show business dashboard
async function showBusinessDashboard(ctx, business, lang) {
    const keyboard = Markup.inlineKeyboard([
        [
            Markup.button.callback(getText(lang, 'setPrices'), 'set_prices'),
            Markup.button.callback(getText(lang, 'setTime'), 'set_time')
        ],
        [
            business.isActive 
                ? Markup.button.callback(getText(lang, 'markInactive'), 'mark_inactive')
                : Markup.button.callback(getText(lang, 'markActive'), 'mark_active')
        ],
        [
            Markup.button.callback(getText(lang, 'viewInterests'), 'view_interests')
        ],
        [
            Markup.button.callback(getText(lang, 'backToMain'), 'back_to_main')
        ]
    ]);

    await ctx.reply(getText(lang, 'businessDashboard', {
        name: business.name,
        address: business.address,
        phone: business.phone,
        status: business.isActive ? getText(lang, 'active') : getText(lang, 'inactive'),
        smallPrice: business.smallPrice,
        mediumPrice: business.mediumPrice,
        largePrice: business.largePrice,
        time: business.salesTime
    }), keyboard);
}

// Set prices callback
async function handleSetPricesCallback(ctx) {
    const lang = ctx.session?.language || 'en';
    const keyboard = Markup.inlineKeyboard([
        [
            Markup.button.callback('$5', 'price_small_5'),
            Markup.button.callback('$10', 'price_small_10'),
            Markup.button.callback('$15', 'price_small_15')
        ],
        [
            Markup.button.callback('$8', 'price_medium_8'),
            Markup.button.callback('$12', 'price_medium_12'),
            Markup.button.callback('$18', 'price_medium_18')
        ],
        [
            Markup.button.callback('$12', 'price_large_12'),
            Markup.button.callback('$18', 'price_large_18'),
            Markup.button.callback('$25', 'price_large_25')
        ],
        [
            Markup.button.callback(getText(lang, 'backToMenu'), 'business_dashboard')
        ]
    ]);

    await ctx.answerCbQuery();
    await ctx.editMessageText(getText(lang, 'setBoxPrices'), keyboard);
}

// Price selection callback
async function handlePriceCallback(ctx) {
    const [_, size, price] = ctx.callbackQuery.data.split('_');
    const telegramId = ctx.from.id.toString();
    const lang = ctx.session?.language || 'en';
    
    try {
        const business = await Business.findOne({ where: { telegramId } });
        if (!business) {
            await ctx.answerCbQuery(getText(lang, 'businessNotFound'));
            return;
        }
        
        const updateData = {};
        updateData[`${size}Price`] = parseFloat(price);
        
        await business.update(updateData);
        
        await ctx.answerCbQuery(getText(lang, 'pricesUpdated'));
        await ctx.editMessageText(getText(lang, 'pricesUpdated'));
        
        // Show updated dashboard
        await showBusinessDashboard(ctx, business, lang);
        
    } catch (error) {
        console.error('Price update error:', error);
        await ctx.answerCbQuery(getText(lang, 'error'));
    }
}

// Set time callback
async function handleSetTimeCallback(ctx) {
    const lang = ctx.session?.language || 'en';
    const keyboard = Markup.inlineKeyboard([
        [
            Markup.button.callback('17:00', 'time_17:00'),
            Markup.button.callback('18:00', 'time_18:00'),
            Markup.button.callback('19:00', 'time_19:00')
        ],
        [
            Markup.button.callback('20:00', 'time_20:00'),
            Markup.button.callback('21:00', 'time_21:00'),
            Markup.button.callback('22:00', 'time_22:00')
        ],
        [
            Markup.button.callback(getText(lang, 'backToMenu'), 'business_dashboard')
        ]
    ]);

    await ctx.answerCbQuery();
    await ctx.editMessageText(getText(lang, 'setSalesTime'), keyboard);
}

// Time selection callback
async function handleTimeCallback(ctx) {
    const time = ctx.callbackQuery.data.split('_')[1];
    const telegramId = ctx.from.id.toString();
    const lang = ctx.session?.language || 'en';
    
    try {
        const business = await Business.findOne({ where: { telegramId } });
        if (!business) {
            await ctx.answerCbQuery(getText(lang, 'businessNotFound'));
            return;
        }
        
        await business.update({ salesTime: time });
        
        await ctx.answerCbQuery(getText(lang, 'salesTimeUpdated', { time: time }));
        await ctx.editMessageText(getText(lang, 'salesTimeUpdated', { time: time }));
        
        // Show updated dashboard
        await showBusinessDashboard(ctx, business, lang);
        
    } catch (error) {
        console.error('Time update error:', error);
        await ctx.answerCbQuery(getText(lang, 'error'));
    }
}

// Mark active/inactive callback
async function handleStatusCallback(ctx) {
    const telegramId = ctx.from.id.toString();
    const lang = ctx.session?.language || 'en';
    
    try {
        const business = await Business.findOne({ where: { telegramId } });
        if (!business) {
            await ctx.answerCbQuery(getText(lang, 'businessNotFound'));
            return;
        }
        
        const newStatus = !business.isActive;
        await business.update({ isActive: newStatus });
        
        const statusText = newStatus ? getText(lang, 'active') : getText(lang, 'inactive');
        await ctx.answerCbQuery(getText(lang, 'statusUpdated', { status: statusText }));
        await ctx.editMessageText(getText(lang, 'statusUpdated', { status: statusText }));
        
        // Show updated dashboard
        await showBusinessDashboard(ctx, business, lang);
        
    } catch (error) {
        console.error('Status update error:', error);
        await ctx.answerCbQuery(getText(lang, 'error'));
    }
}

// View interests callback
async function handleViewInterestsCallback(ctx) {
    const telegramId = ctx.from.id.toString();
    const lang = ctx.session?.language || 'en';
    
    try {
        const business = await Business.findOne({ where: { telegramId } });
        if (!business) {
            await ctx.answerCbQuery(getText(lang, 'businessNotFound'));
            return;
        }
        
        const interests = await Interest.findAll({
            where: { businessId: business.id }
        });
        
        let message = getText(lang, 'customerInterestSummary');
        
        if (interests.length === 0) {
            message += getText(lang, 'noInterestYet');
        } else {
            const summary = {};
            interests.forEach(interest => {
                if (!summary[interest.boxSize]) {
                    summary[interest.boxSize] = 0;
                }
                summary[interest.boxSize]++;
            });
            
            Object.keys(summary).forEach(size => {
                const sizeText = getText(lang, `${size}Box`);
                message += `${sizeText}: ${summary[size]} customers\n`;
            });
        }
        
        const keyboard = Markup.inlineKeyboard([
            [
                Markup.button.callback(getText(lang, 'backToMenu'), 'business_dashboard')
            ]
        ]);
        
        await ctx.answerCbQuery();
        await ctx.editMessageText(message, keyboard);
        
    } catch (error) {
        console.error('View interests error:', error);
        await ctx.answerCbQuery(getText(lang, 'error'));
    }
}

// Business dashboard callback
async function handleBusinessDashboardCallback(ctx) {
    const telegramId = ctx.from.id.toString();
    const lang = ctx.session?.language || 'en';
    
    try {
        const business = await Business.findOne({ where: { telegramId } });
        if (!business) {
            await ctx.answerCbQuery(getText(lang, 'businessNotFound'));
            return;
        }
        
        await ctx.answerCbQuery();
        await showBusinessDashboard(ctx, business, lang);
        
    } catch (error) {
        console.error('Business dashboard error:', error);
        await ctx.answerCbQuery(getText(lang, 'error'));
    }
}

module.exports = {
    handleBusinessRegistration,
    showBusinessDashboard,
    handleSetPricesCallback,
    handlePriceCallback,
    handleSetTimeCallback,
    handleTimeCallback,
    handleStatusCallback,
    handleViewInterestsCallback,
    handleBusinessDashboardCallback
}; 