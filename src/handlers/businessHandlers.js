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
        await ctx.reply(getText(lang, 'notRegistered'));
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
        [Markup.button.callback(getText(lang, 'setPrices'), 'set_prices')],
        [Markup.button.callback(getText(lang, 'setTime'), 'set_time')],
        [business.isActive 
            ? Markup.button.callback(getText(lang, 'markInactive'), 'mark_inactive')
            : Markup.button.callback(getText(lang, 'markActive'), 'mark_active')
        ],
        [Markup.button.callback(getText(lang, 'viewInterests'), 'view_interests')]
    ]);

    await ctx.reply(getText(lang, 'businessDashboard', {
        name: business.name,
        address: business.address,
        phone: business.phone,
        status: business.isActive ? getText(lang, 'active') : getText(lang, 'inactive'),
        smallPrice: business.smallPrice || 0,
        mediumPrice: business.mediumPrice || 0,
        largePrice: business.largePrice || 0,
        time: business.salesTime || getText(lang, 'notSet')
    }), keyboard);
}

// Set prices callback
async function handleSetPricesCallback(ctx) {
    const lang = ctx.session?.language || 'en';
    
    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback(getText(lang, 'smallBox'), 'set_price_small')],
        [Markup.button.callback(getText(lang, 'mediumBox'), 'set_price_medium')],
        [Markup.button.callback(getText(lang, 'largeBox'), 'set_price_large')],
        [Markup.button.callback(getText(lang, 'backToMenu'), 'business_dashboard')]
    ]);
    
    await ctx.answerCbQuery();
    await ctx.editMessageText(getText(lang, 'selectBoxToSetPrice'), keyboard);
}

// Set individual box price callbacks
async function handleSetPriceSmallCallback(ctx) {
    console.log('handleSetPriceSmallCallback called');
    console.log('ctx.session before:', ctx.session);
    
    const lang = ctx.session?.language || 'en';
    
    // Set session state for price input
    ctx.session = ctx.session || {};
    console.log('ctx.session after initialization:', ctx.session);
    
    ctx.session.priceInputStep = 'small';
    console.log('priceInputStep set to:', ctx.session.priceInputStep);
    
    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback(getText(lang, 'backToMenu'), 'business_dashboard')]
    ]);
    
    await ctx.answerCbQuery();
    await ctx.editMessageText(getText(lang, 'enterSmallBoxPrice'), keyboard);
}

async function handleSetPriceMediumCallback(ctx) {
    const lang = ctx.session?.language || 'en';
    
    // Set session state for price input
    ctx.session = ctx.session || {};
    ctx.session.priceInputStep = 'medium';
    
    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback(getText(lang, 'backToMenu'), 'business_dashboard')]
    ]);
    
    await ctx.answerCbQuery();
    await ctx.editMessageText(getText(lang, 'enterMediumBoxPrice'), keyboard);
}

async function handleSetPriceLargeCallback(ctx) {
    const lang = ctx.session?.language || 'en';
    
    // Set session state for price input
    ctx.session = ctx.session || {};
    ctx.session.priceInputStep = 'large';
    
    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback(getText(lang, 'backToMenu'), 'business_dashboard')]
    ]);
    
    await ctx.answerCbQuery();
    await ctx.editMessageText(getText(lang, 'enterLargeBoxPrice'), keyboard);
}

// Handle manual price input
async function handlePriceInput(ctx) {
    const telegramId = ctx.from.id.toString();
    const lang = ctx.session?.language || 'en';
    const input = ctx.message.text;
    
    // Initialize session if it doesn't exist
    if (!ctx.session) {
        ctx.session = {};
    }
    const step = ctx.session.priceInputStep;
    
    // Check if input is a valid price format (number)
    const price = parseFloat(input);
    if (isNaN(price) || price < 0) {
        const errorKeyboard = Markup.inlineKeyboard([
            [
                Markup.button.callback(getText(lang, 'backToMenu'), 'business_dashboard')
            ]
        ]);
        await ctx.reply(getText(lang, 'invalidPrice'), errorKeyboard);
        return;
    }
    
    try {
        const business = await Business.findOne({ where: { telegramId } });
        if (!business) {
            const errorKeyboard = Markup.inlineKeyboard([
                [
                    Markup.button.callback(getText(lang, 'backToMenu'), 'business_dashboard')
                ]
            ]);
            await ctx.reply(getText(lang, 'businessNotFound'), errorKeyboard);
            return;
        }
        
        // Update the specific box price
        const updateData = {};
        updateData[`${step}Price`] = price;
        
        await business.update(updateData);
        
        // Clear session
        delete ctx.session.priceInputStep;
        
        const boxText = getText(lang, `${step}Box`);
        await ctx.reply(getText(lang, 'priceUpdated', { box: boxText, price: price }));
        
        // Show updated dashboard
        await showBusinessDashboard(ctx, business, lang);
        
    } catch (error) {
        console.error('Price update error:', error);
        const errorKeyboard = Markup.inlineKeyboard([
            [
                Markup.button.callback(getText(lang, 'backToMenu'), 'business_dashboard')
            ]
        ]);
        await ctx.reply(getText(lang, 'error'), errorKeyboard);
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
        
        // Add back to dashboard button
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
        
        // Clear any active price input session
        if (ctx.session.priceInputStep) {
            delete ctx.session.priceInputStep;
            delete ctx.session.smallPrice;
            delete ctx.session.mediumPrice;
            delete ctx.session.largePrice;
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
    handleSetPriceSmallCallback,
    handleSetPriceMediumCallback,
    handleSetPriceLargeCallback,
    handlePriceInput,
    handleSetTimeCallback,
    handleTimeCallback,
    handleStatusCallback,
    handleViewInterestsCallback,
    handleBusinessDashboardCallback
}; 