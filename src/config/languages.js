const languages = {
    en: {
        welcome: "Welcome to the Discount Bot! 🍕\n\nThis bot helps food businesses sell unsold end-of-day products in mystery boxes to customers.\n\nPlease select your language:",
        languageSelected: "Language selected: English",
        selectCity: "Please select your city:",
        citySelected: "City selected: {city}",
        mainMenu: "Main Menu",
        registerAsBusiness: "Register as Business",
        registerAsCustomer: "Register as Customer",
        backToMain: "Back to Main Menu",
        backToMenu: "Back to Menu",
        
        // Business registration
        businessRegistration: "Business Registration",
        enterBusinessCode: "Please enter your business registration code.\n\nIf you don't have a code, please contact the administrator to receive one.",
        invalidCode: "❌ Invalid or expired code. Please check the code and try again, or contact the administrator for a new code.",
        codeValid: "✅ Code is valid! Please enter your business name:",
        businessAddress: "Please enter your business address:",
        contactPhone: "Please enter your contact phone number:",
        registrationSuccess: "✅ Registration successful!\n\nBusiness: {name}\nAddress: {address}\nPhone: {phone}\n\nYou can now manage your mystery box sales.",
        registrationFailed: "❌ Registration failed. Please try again.",
        
        // Business dashboard
        businessDashboard: "🏪 Business Dashboard\n\nName: {name}\nAddress: {address}\nPhone: {phone}\nStatus: {status}\n\nSmall Box Price: ${smallPrice}\nMedium Box Price: ${mediumPrice}\nLarge Box Price: ${largePrice}\nSales Time: {time}",
        active: "🟢 Active",
        inactive: "🔴 Inactive",
        setPrices: "Set Box Prices",
        setTime: "Set Sales Time",
        markActive: "Mark as Active",
        markInactive: "Mark as Inactive",
        viewInterests: "View Customer Interest",
        
        // Price and time settings
        setBoxPrices: "Select prices for your mystery boxes:",
        setSalesTime: "Select the time when you'll have mystery boxes available:",
        pricesUpdated: "✅ Prices updated successfully!",
        salesTimeUpdated: "✅ Sales time updated to {time}!",
        statusUpdated: "✅ Status updated to {status}!",
        
        // Customer interest
        customerInterestSummary: "📊 Customer Interest Summary\n\n",
        noInterestYet: "No customer interest yet.",
        
        // Box sizes
        smallBox: "Small Box",
        mediumBox: "Medium Box",
        largeBox: "Large Box",
        
        // Customer registration
        customerRegistration: "Customer Registration",
        customerName: "Please enter your name:",
        customerPhone: "Please enter your phone number:",
        customerRegistrationSuccess: "✅ Registration successful!\n\nName: {name}\nPhone: {phone}\n\nYou can now browse available mystery boxes.",
        
        // Customer browsing
        availableBusinesses: "Available businesses in {city}:",
        noBusinessesAvailable: "No businesses are currently active in {city}.",
        businessInfo: "🏪 {name}\n📍 {address}\n📞 {phone}\n⏰ Sales Time: {time}\n\nSmall Box: ${smallPrice}\nMedium Box: ${mediumPrice}\nLarge Box: {largePrice}",
        selectBoxSize: "Select box size:",
        interestRecorded: "✅ Your interest has been recorded! The business will contact you.",
        alreadyInterested: "You have already expressed interest in this business.",
        
        // Feedback
        feedbackPrompt: "How was your mystery box experience?",
        feedbackSubmitted: "✅ Thank you for your feedback!",
        
        // Errors
        businessNotFound: "Business not found.",
        error: "An error occurred. Please try again.",
        notRegistered: "Please register first.",
        notBusiness: "This feature is only available for businesses.",
        notCustomer: "This feature is only available for customers."
    },
    
    ru: {
        welcome: "Добро пожаловать в бот скидок! 🍕\n\nЭтот бот помогает пищевым предприятиям продавать непроданные продукты в конце дня в таинственных коробках клиентам.\n\nПожалуйста, выберите ваш язык:",
        languageSelected: "Язык выбран: Русский",
        selectCity: "Пожалуйста, выберите ваш город:",
        citySelected: "Город выбран: {city}",
        mainMenu: "Главное меню",
        registerAsBusiness: "Зарегистрироваться как бизнес",
        registerAsCustomer: "Зарегистрироваться как клиент",
        backToMain: "Вернуться в главное меню",
        backToMenu: "Вернуться в меню",
        
        // Business registration
        businessRegistration: "Регистрация бизнеса",
        enterBusinessCode: "Пожалуйста, введите код регистрации вашего бизнеса.\n\nЕсли у вас нет кода, пожалуйста, свяжитесь с администратором для его получения.",
        invalidCode: "❌ Неверный или истекший код. Пожалуйста, проверьте код и попробуйте снова, или свяжитесь с администратором для получения нового кода.",
        codeValid: "✅ Код действителен! Пожалуйста, введите название вашего бизнеса:",
        businessAddress: "Пожалуйста, введите адрес вашего бизнеса:",
        contactPhone: "Пожалуйста, введите ваш контактный номер телефона:",
        registrationSuccess: "✅ Регистрация прошла успешно!\n\nБизнес: {name}\nАдрес: {address}\nТелефон: {phone}\n\nТеперь вы можете управлять продажами таинственных коробок.",
        registrationFailed: "❌ Регистрация не удалась. Пожалуйста, попробуйте снова.",
        
        // Business dashboard
        businessDashboard: "🏪 Панель управления бизнесом\n\nНазвание: {name}\nАдрес: {address}\nТелефон: {phone}\nСтатус: {status}\n\nЦена маленькой коробки: ${smallPrice}\nЦена средней коробки: ${mediumPrice}\nЦена большой коробки: ${largePrice}\nВремя продаж: {time}",
        active: "🟢 Активен",
        inactive: "🔴 Неактивен",
        setPrices: "Установить цены коробок",
        setTime: "Установить время продаж",
        markActive: "Отметить как активный",
        markInactive: "Отметить как неактивный",
        viewInterests: "Просмотр интереса клиентов",
        
        // Price and time settings
        setBoxPrices: "Выберите цены для ваших таинственных коробок:",
        setSalesTime: "Выберите время, когда у вас будут доступны таинственные коробки:",
        pricesUpdated: "✅ Цены успешно обновлены!",
        salesTimeUpdated: "✅ Время продаж обновлено на {time}!",
        statusUpdated: "✅ Статус обновлен на {status}!",
        
        // Customer interest
        customerInterestSummary: "📊 Сводка интереса клиентов\n\n",
        noInterestYet: "Пока нет интереса клиентов.",
        
        // Box sizes
        smallBox: "Маленькая коробка",
        mediumBox: "Средняя коробка",
        largeBox: "Большая коробка",
        
        // Customer registration
        customerRegistration: "Регистрация клиента",
        customerName: "Пожалуйста, введите ваше имя:",
        customerPhone: "Пожалуйста, введите ваш номер телефона:",
        customerRegistrationSuccess: "✅ Регистрация прошла успешно!\n\nИмя: {name}\nТелефон: {phone}\n\nТеперь вы можете просматривать доступные таинственные коробки.",
        
        // Customer browsing
        availableBusinesses: "Доступные предприятия в {city}:",
        noBusinessesAvailable: "В {city} в настоящее время нет активных предприятий.",
        businessInfo: "🏪 {name}\n📍 {address}\n📞 {phone}\n⏰ Время продаж: {time}\n\nМаленькая коробка: ${smallPrice}\nСредняя коробка: ${mediumPrice}\nБольшая коробка: {largePrice}",
        selectBoxSize: "Выберите размер коробки:",
        interestRecorded: "✅ Ваш интерес зафиксирован! Предприятие свяжется с вами.",
        alreadyInterested: "Вы уже выразили интерес к этому предприятию.",
        
        // Feedback
        feedbackPrompt: "Как вам опыт с таинственной коробкой?",
        feedbackSubmitted: "✅ Спасибо за ваш отзыв!",
        
        // Errors
        businessNotFound: "Предприятие не найдено.",
        error: "Произошла ошибка. Пожалуйста, попробуйте снова.",
        notRegistered: "Пожалуйста, сначала зарегистрируйтесь.",
        notBusiness: "Эта функция доступна только для предприятий.",
        notCustomer: "Эта функция доступна только для клиентов."
    },
    
    kk: {
        welcome: "Жеңілдік ботына қош келдіңіз! 🍕\n\nБұл бот тамақ кәсіпорындарына күндің соңында сатылмаған өнімдерді тұтынушыларға жұмбақ қораптарда сатуға көмектеседі.\n\nӨз тіліңізді таңдаңыз:",
        languageSelected: "Тіл таңдалды: Қазақ",
        selectCity: "Өз қалаңызды таңдаңыз:",
        citySelected: "Қала таңдалды: {city}",
        mainMenu: "Басты меню",
        registerAsBusiness: "Кәсіпорын ретінде тіркелу",
        registerAsCustomer: "Тұтынушы ретінде тіркелу",
        backToMain: "Басты менюге оралу",
        backToMenu: "Менюге оралу",
        
        // Business registration
        businessRegistration: "Кәсіпорын тіркеуі",
        enterBusinessCode: "Өз кәсіпорыныңыздың тіркеу кодін енгізіңіз.\n\nЕгер сізде код жоқ болса, оны алу үшін әкімшіге хабарласыңыз.",
        invalidCode: "❌ Жарамсыз немесе мерзімі өткен код. Кодты тексеріп, қайталап көріңіз немесе жаңа код алу үшін әкімшіге хабарласыңыз.",
        codeValid: "✅ Код жарамды! Өз кәсіпорыныңыздың атауын енгізіңіз:",
        businessAddress: "Өз кәсіпорыныңыздың мекенжайын енгізіңіз:",
        contactPhone: "Өз байланыс телефон нөміріңізді енгізіңіз:",
        registrationSuccess: "✅ Тіркеу сәтті болды!\n\nКәсіпорын: {name}\nМекенжай: {address}\nТелефон: {phone}\n\nЕнді сіз жұмбақ қорап сатуын басқара аласыз.",
        registrationFailed: "❌ Тіркеу сәтсіз болды. Қайталап көріңіз.",
        
        // Business dashboard
        businessDashboard: "🏪 Кәсіпорын басқару панелі\n\nАтауы: {name}\nМекенжай: {address}\nТелефон: {phone}\nКүйі: {status}\n\nКіші қорап бағасы: ${smallPrice}\nОрта қорап бағасы: ${mediumPrice}\nҮлкен қорап бағасы: ${largePrice}\nСату уақыты: {time}",
        active: "🟢 Белсенді",
        inactive: "🔴 Белсенді емес",
        setPrices: "Қорап бағаларын орнату",
        setTime: "Сату уақытын орнату",
        markActive: "Белсенді деп белгілеу",
        markInactive: "Белсенді емес деп белгілеу",
        viewInterests: "Тұтынушы қызығушылығын көру",
        
        // Price and time settings
        setBoxPrices: "Жұмбақ қораптарыңыздың бағаларын таңдаңыз:",
        setSalesTime: "Жұмбақ қораптарыңыз қолжетімді болатын уақытты таңдаңыз:",
        pricesUpdated: "✅ Бағалар сәтті жаңартылды!",
        salesTimeUpdated: "✅ Сату уақыты {time} деп жаңартылды!",
        statusUpdated: "✅ Күй {status} деп жаңартылды!",
        
        // Customer interest
        customerInterestSummary: "📊 Тұтынушы қызығушылығының қорытындысы\n\n",
        noInterestYet: "Әзірше тұтынушы қызығушылығы жоқ.",
        
        // Box sizes
        smallBox: "Кіші қорап",
        mediumBox: "Орта қорап",
        largeBox: "Үлкен қорап",
        
        // Customer registration
        customerRegistration: "Тұтынушы тіркеуі",
        customerName: "Өз атыңызды енгізіңіз:",
        customerPhone: "Өз телефон нөміріңізді енгізіңіз:",
        customerRegistrationSuccess: "✅ Тіркеу сәтті болды!\n\nАты: {name}\nТелефон: {phone}\n\nЕнді сіз қолжетімді жұмбақ қораптарды шолуға болады.",
        
        // Customer browsing
        availableBusinesses: "{city} қаласындағы қолжетімді кәсіпорындар:",
        noBusinessesAvailable: "{city} қаласында әзірше белсенді кәсіпорындар жоқ.",
        businessInfo: "🏪 {name}\n📍 {address}\n📞 {phone}\n⏰ Сату уақыты: {time}\n\nКіші қорап: ${smallPrice}\nОрта қорап: ${mediumPrice}\nҮлкен қорап: {largePrice}",
        selectBoxSize: "Қорап өлшемін таңдаңыз:",
        interestRecorded: "✅ Сіздің қызығушылығыңыз тіркелді! Кәсіпорын сізбен байланысады.",
        alreadyInterested: "Сіз бұл кәсіпорынға қызығушылық білдіргенсіз.",
        
        // Feedback
        feedbackPrompt: "Жұмбақ қорап тәжірибесі қалай болды?",
        feedbackSubmitted: "✅ Пікіріңіз үшін рахмет!",
        
        // Errors
        businessNotFound: "Кәсіпорын табылмады.",
        error: "Қате орын алды. Қайталап көріңіз.",
        notRegistered: "Алдымен тіркеліңіз.",
        notBusiness: "Бұл функция тек кәсіпорындар үшін қолжетімді.",
        notCustomer: "Бұл функция тек тұтынушылар үшін қолжетімді."
    }
};

// Available cities
const cities = {
    'almaty': {
        en: 'Almaty',
        ru: 'Алматы',
        kk: 'Алматы'
    },
    'astana': {
        en: 'Astana',
        ru: 'Астана',
        kk: 'Астана'
    }
    // Easy to add more cities here
};

module.exports = { languages, cities }; 