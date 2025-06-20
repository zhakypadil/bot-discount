const { Markup } = require('telegraf');
const Customer = require('../models/Customer');
const Business = require('../models/Business');
const Interest = require('../models/Interest');
const Feedback = require('../models/Feedback');
const { getText, getCityName } = require('./mainHandlers');

// Show customer menu
async function showCustomerMenu(ctx, lang) {
    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback(getText(lang, 'viewBusinesses'), 'view_businesses')]
    ]);

    await ctx.reply(getText(lang, 'welcomeCustomer'), keyboard);
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
        return;
    }
    
    const keyboard = Markup.inlineKeyboard(
        businesses.map(business => [
            Markup.button.callback(business.name, `business_${business.id}`)
        ])
    );
    
    await ctx.answerCbQuery();
    await ctx.editMessageText(getText(lang, 'availableBusinesses'), keyboard);
}

// Business selection callback
async function handleBusinessSelectionCallback(ctx) {
    const businessId = ctx.callbackQuery.data.split('_')[1];
    const lang = ctx.session?.language || 'en';
    
    try {
        const business = await Business.findByPk(businessId);
        if (!business) {
            await ctx.answerCbQuery(getText(lang, 'businessNotAvailable'));
            return;
        }
        
        if (!business.isActive) {
            await ctx.answerCbQuery(getText(lang, 'businessNotAvailable'));
            return;
        }
        
        // Show business details with box options, each on its own row
        const keyboard = Markup.inlineKeyboard([
            [Markup.button.callback(getText(lang, 'smallBox'), `interest_${businessId}_small`)],
            [Markup.button.callback(getText(lang, 'mediumBox'), `interest_${businessId}_medium`)],
            [Markup.button.callback(getText(lang, 'largeBox'), `interest_${businessId}_large`)],
            [Markup.button.callback(getText(lang, 'leaveFeedback'), `feedback_${businessId}`)]
        ]);
        
        await ctx.answerCbQuery();
        await ctx.editMessageText(getText(lang, 'businessDetails', {
            name: business.name,
            address: business.address,
            phone: business.phone,
            time: business.salesTime,
            smallPrice: business.smallPrice,
            mediumPrice: business.mediumPrice,
            largePrice: business.largePrice
        }), keyboard);
        
    } catch (error) {
        console.error('Business selection error:', error);
        await ctx.answerCbQuery(getText(lang, 'error'));
    }
}

// Interest expression callback
async function handleInterestCallback(ctx) {
    const [_, businessId, boxSize] = ctx.callbackQuery.data.split('_');
    const telegramId = ctx.from.id.toString();
    const lang = ctx.session?.language || 'en';
    
    try {
        const customer = await Customer.findOne({ where: { telegramId } });
        const business = await Business.findByPk(businessId);
        
        if (!customer || !business) {
            await ctx.answerCbQuery(getText(lang, 'error'));
            return;
        }
        
        // Check if interest already exists
        const existingInterest = await Interest.findOne({
            where: {
                customerId: customer.id,
                businessId: business.id,
                boxSize: boxSize
            }
        });
        
        if (existingInterest) {
            await ctx.answerCbQuery(getText(lang, 'alreadyInterested'));
            return;
        }
        
        // Create interest
        await Interest.create({
            customerId: customer.id,
            businessId: business.id,
            boxSize: boxSize
        });
        
        const sizeText = getText(lang, `${boxSize}Box`);
        const price = business[`${boxSize}Price`];
        
        await ctx.answerCbQuery(getText(lang, 'interestRecorded', {
            size: sizeText,
            business: business.name,
            price: price,
            time: business.salesTime
        }));
        
        await ctx.editMessageText(getText(lang, 'interestRecorded', {
            size: sizeText,
            business: business.name,
            price: price,
            time: business.salesTime
        }));
        
    } catch (error) {
        console.error('Interest creation error:', error);
        await ctx.answerCbQuery(getText(lang, 'error'));
    }
}

// Feedback callback
async function handleFeedbackCallback(ctx) {
    const businessId = ctx.callbackQuery.data.split('_')[1];
    const lang = ctx.session?.language || 'en';
    
    try {
        const business = await Business.findByPk(businessId);
        if (!business) {
            await ctx.answerCbQuery(getText(lang, 'error'));
            return;
        }
        
        // Set session for feedback
        ctx.session.feedbackBusinessId = businessId;
        ctx.session.feedbackStep = 'message';
        
        await ctx.answerCbQuery();
        await ctx.editMessageText(getText(lang, 'feedbackForBusiness', { business: business.name }));
        await ctx.reply(getText(lang, 'submitYourFeedback'));
        
    } catch (error) {
        console.error('Feedback error:', error);
        await ctx.answerCbQuery(getText(lang, 'error'));
    }
}

// Feedback submission
async function handleFeedbackSubmission(ctx) {
    const telegramId = ctx.from.id.toString();
    const lang = ctx.session?.language || 'en';
    const businessId = ctx.session?.feedbackBusinessId;
    const message = ctx.message.text;
    
    if (!businessId) {
        await ctx.reply(getText(lang, 'error'));
        return;
    }
    
    try {
        const customer = await Customer.findOne({ where: { telegramId } });
        const business = await Business.findByPk(businessId);
        
        if (!customer || !business) {
            await ctx.reply(getText(lang, 'error'));
            return;
        }
        
        // Create feedback
        await Feedback.create({
            customerId: customer.id,
            businessId: business.id,
            message: message
        });
        
        // Clear session
        delete ctx.session.feedbackBusinessId;
        delete ctx.session.feedbackStep;
        
        await ctx.reply(getText(lang, 'feedbackSubmitted'));
        
    } catch (error) {
        console.error('Feedback submission error:', error);
        await ctx.reply(getText(lang, 'unableToSubmit'));
    }
}

module.exports = {
    showCustomerMenu,
    handleViewBusinessesCallback,
    handleBusinessSelectionCallback,
    handleInterestCallback,
    handleFeedbackCallback,
    handleFeedbackSubmission
};