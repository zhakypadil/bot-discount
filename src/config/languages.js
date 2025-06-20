const languages = {
    en: {
        welcome: "Welcome to the Discount Bot! 🍕\n\nThis bot helps food businesses sell unsold end-of-day products in mystery boxes to customers.\n\nPlease select your language:",
        languageSelected: "Language selected: English",
        selectCity: "Please select your city:",
        citySelected: "City selected:",
        mainMenu: "Please select your role:\n\n🏪 Business - If you want to sell mystery boxes\n👥 Customer - If you want to buy mystery boxes\n❓ Help - For assistance and information",
        business: "Business",
        customer: "Customer",
        help: "Help",
        welcomeCustomer: "Welcome! You can now browse available mystery boxes in your city.",
        registerAsBusiness: "Register as Business",
        registerAsCustomer: "Register as Customer",
        backToMain: "Back to Main Menu",
        backToMenu: "Back to Menu",
        
        // Business registration
        businessRegistration: "Business Registration",
        businessCodeInstructions: "🔑 To register your business, you need a registration code.\n\n📞 Please contact the administrator to receive your code:\n{phone}\n\n💬 Send a message with:\n• Your business name\n• Your location\n• Request for registration code\n\n✅ Once you receive the code, enter it below.",
        enterBusinessCode: "Please enter your business registration code.\n\nIf you don't have a code, please contact the administrator to receive one.",
        invalidCode: "❌ Invalid or expired code. Please check the code and try again, or contact the administrator for a new code.",
        codeValid: "✅ Code is valid! Please enter your business name:",
        businessAddress: "Please enter your business address:",
        contactPhone: "Please enter your contact phone number:",
        registrationSuccess: "✅ Registration successful!\n\nBusiness: {name}\nAddress: {address}\nPhone: {phone}\n\nYou can now manage your mystery box sales.",
        registrationFailed: "❌ Registration failed. Please try again.",
        
        // Business dashboard
        businessDashboard: "🏪 Business Dashboard\n\nName: {name}\nAddress: {address}\nPhone: {phone}\nStatus: {status}\n\nSmall Box Price: {smallPrice} ₸\nMedium Box Price: {mediumPrice} ₸\nLarge Box Price: {largePrice} ₸\nSales Time: {time}",
        active: "🟢 Active",
        inactive: "🔴 Inactive",
        setPrices: "Set Prices",
        setTime: "Set Sales Time",
        setSalesTime: "Select sales time:",
        selectBoxToSetPrice: "Select which box to set the price for:",
        enterSmallBoxPrice: "Enter price for Small Box (in ₸):",
        enterMediumBoxPrice: "Enter price for Medium Box (in ₸):",
        enterLargeBoxPrice: "Enter price for Large Box (in ₸):",
        priceUpdated: "✅ {box} price updated to {price} ₸",
        pricesUpdated: "✅ All prices updated successfully!",
        markActive: "Mark as Active",
        markInactive: "Mark as Inactive",
        viewInterests: "View Customer Interest",
        
        // Price and time settings
        invalidPrice: "❌ Invalid price. Please enter a valid number.",
        salesTimeUpdated: "✅ Sales time updated to {time}!",
        statusUpdated: "✅ Status updated to {status}!",
        notSet: "Not set",
        
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
        customerRegistrationSuccess: "✅ Registration successful!\n\nWelcome, {name}! You can now browse available mystery boxes in your city.",
        
        // Customer browsing
        viewBusinesses: "View Businesses",
        availableBusinesses: "Available businesses in {city}:",
        noBusinessesAvailable: "No businesses are currently active in {city}.",
        businessNotAvailable: "This business is not available.",
        businessDetails: "🏪 {name}\n📍 {address}\n📞 {phone}\n⏰ Sales Time: {time}\n\nSmall Box: {smallPrice} ₸\nMedium Box: {mediumPrice} ₸\nLarge Box: {largePrice} ₸\n\n💡 Box selection notifies the restaurant of your interest. First come, first serve basis.",
        selectBoxSize: "Select box size:",
        interestRecorded: "✅ Your interest has been recorded!\n\nBox: {size}\nBusiness: {business}\nPrice: {price} ₸\nTime: {time}\n\nThe business will contact you.",
        alreadyInterested: "You have already expressed interest in this business.",
        leaveFeedback: "Leave Feedback",
        
        // Feedback
        feedbackPrompt: "How was your mystery box experience?",
        feedbackSubmitted: "✅ Thank you for your feedback!",
        feedbackForBusiness: "Feedback for {business}:",
        submitYourFeedback: "Please submit your feedback:",
        unableToSubmit: "Unable to submit feedback. Please try again.",
        
        // Errors
        businessNotFound: "Business not found.",
        error: "An error occurred. Please try again.",
        notRegistered: "Please register first.",
        notBusiness: "This feature is only available for businesses.",
        notCustomer: "This feature is only available for customers.",
        
        // Help
        helpInfo: "🤖 Mystery Box Bot Help\n\nThis bot helps food businesses sell unsold end-of-day products in mystery boxes to customers.\n\n📱 For businesses:\n• Register with a code from admin\n• Set your prices and availability\n• View customer interest\n\n👥 For customers:\n• Browse available businesses\n• Express interest in mystery boxes\n• Leave feedback\n\n📞 Need help? Contact the administrator."
    },
    
    ru: {
        welcome: "Добро пожаловать в бот скидок! 🍕\n\nЭтот бот помогает пищевым предприятиям продавать непроданные продукты в конце дня в таинственных коробках клиентам.\n\nПожалуйста, выберите ваш язык:",
        languageSelected: "Язык выбран: Русский",
        selectCity: "Пожалуйста, выберите ваш город:",
        citySelected: "Город выбран:",
        mainMenu: "Пожалуйста, выберите вашу роль:\n\n🏪 Бизнес - Если вы хотите продавать таинственные коробки\n👥 Клиент - Если вы хотите покупать таинственные коробки\n❓ Помощь - Для получения помощи и информации",
        business: "Бизнес",
        customer: "Клиент",
        help: "Помощь",
        welcomeCustomer: "Добро пожаловать! Теперь вы можете просматривать доступные таинственные коробки в вашем городе.",
        registerAsBusiness: "Зарегистрироваться как бизнес",
        registerAsCustomer: "Зарегистрироваться как клиент",
        backToMain: "Вернуться в главное меню",
        backToMenu: "Вернуться в меню",
        
        // Business registration
        businessRegistration: "Регистрация бизнеса",
        businessCodeInstructions: "🔑 Для регистрации вашего бизнеса вам нужен регистрационный код.\n\n📞 Пожалуйста, свяжитесь с администратором для получения кода:\n{phone}\n\n💬 Отправьте сообщение с:\n• Названием вашего бизнеса\n• Местоположением\n• Запросом на регистрационный код\n\n✅ После получения кода введите его ниже.",
        enterBusinessCode: "Пожалуйста, введите код регистрации вашего бизнеса.\n\nЕсли у вас нет кода, пожалуйста, свяжитесь с администратором для его получения.",
        invalidCode: "❌ Неверный или истекший код. Пожалуйста, проверьте код и попробуйте снова, или свяжитесь с администратором для получения нового кода.",
        codeValid: "✅ Код действителен! Пожалуйста, введите название вашего бизнеса:",
        businessAddress: "Пожалуйста, введите адрес вашего бизнеса:",
        contactPhone: "Пожалуйста, введите ваш контактный номер телефона:",
        registrationSuccess: "✅ Регистрация прошла успешно!\n\nБизнес: {name}\nАдрес: {address}\nТелефон: {phone}\n\nТеперь вы можете управлять продажами таинственных коробок.",
        registrationFailed: "❌ Регистрация не удалась. Пожалуйста, попробуйте снова.",
        
        // Business dashboard
        businessDashboard: "🏪 Панель управления бизнесом\n\nНазвание: {name}\nАдрес: {address}\nТелефон: {phone}\nСтатус: {status}\n\nЦена маленькой коробки: {smallPrice} ₸\nЦена средней коробки: {mediumPrice} ₸\nЦена большой коробки: {largePrice} ₸\nВремя продаж: {time}",
        active: "🟢 Активен",
        inactive: "🔴 Неактивен",
        setPrices: "Установить цены коробок",
        setTime: "Установить время продаж",
        setSalesTime: "Выберите время, когда у вас будут доступны таинственные коробки:",
        selectBoxToSetPrice: "Выберите коробку, для которой нужно установить цену:",
        enterSmallBoxPrice: "Введите цену для маленькой коробки (в тенге):",
        enterMediumBoxPrice: "Введите цену для средней коробки (в тенге):",
        enterLargeBoxPrice: "Введите цену для большой коробки (в тенге):",
        priceUpdated: "✅ Цена {box} обновлена до {price} ₸",
        pricesUpdated: "✅ Все цены успешно обновлены!",
        markActive: "Отметить как активный",
        markInactive: "Отметить как неактивный",
        viewInterests: "Просмотр интереса клиентов",
        
        // Price and time settings
        invalidPrice: "❌ Неверная цена. Пожалуйста, введите действительное число.",
        salesTimeUpdated: "✅ Время продаж обновлено на {time}!",
        statusUpdated: "✅ Статус обновлен на {status}!",
        notSet: "Не установлено",
        
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
        customerRegistrationSuccess: "✅ Регистрация прошла успешно!\n\nДобро пожаловать, {name}! Теперь вы можете просматривать доступные таинственные коробки в вашем городе.",
        
        // Customer browsing
        viewBusinesses: "Просмотр предприятий",
        availableBusinesses: "Доступные предприятия в {city}:",
        noBusinessesAvailable: "В {city} в настоящее время нет активных предприятий.",
        businessNotAvailable: "Это предприятие недоступно.",
        businessDetails: "🏪 {name}\n📍 {address}\n📞 {phone}\n⏰ Время продаж: {time}\n\nМаленькая коробка: {smallPrice} ₸\nСредняя коробка: {mediumPrice} ₸\nБольшая коробка: {largePrice} ₸\n\n💡 Выбор коробки уведомляет ресторан о вашем интересе. Первым пришел - первым обслужили.",
        selectBoxSize: "Выберите размер коробки:",
        interestRecorded: "✅ Ваш интерес зафиксирован!\n\nКоробка: {size}\nБизнес: {business}\nЦена: {price} ₸\nВремя: {time}\n\nПредприятие свяжется с вами.",
        alreadyInterested: "Вы уже выразили интерес к этому предприятию.",
        leaveFeedback: "Оставить отзыв",
        
        // Feedback
        feedbackPrompt: "Как вам опыт с таинственной коробкой?",
        feedbackSubmitted: "✅ Спасибо за ваш отзыв!",
        feedbackForBusiness: "{business} кәсіпорынына пікір:",
        submitYourFeedback: "Өз пікіріңізді жіберіңіз:",
        unableToSubmit: "Пікір жіберу мүмкін емес. Қайталап көріңіз.",
        
        // Errors
        businessNotFound: "Предприятие не найдено.",
        error: "Произошла ошибка. Пожалуйста, попробуйте снова.",
        notRegistered: "Пожалуйста, сначала зарегистрируйтесь.",
        notBusiness: "Эта функция доступна только для предприятий.",
        notCustomer: "Эта функция доступна только для клиентов.",
        
        // Help
        helpInfo: "🤖 Справка по боту Mystery Box\n\nЭтот бот помогает пищевым предприятиям продавать непроданные продукты в конце дня в таинственных коробках клиентам.\n\n📱 Для предприятий:\n• Зарегистрируйтесь с кодом от администратора\n• Установите цены и доступность\n• Просматривайте интерес клиентов\n\n👥 Для клиентов:\n• Просматривайте доступные предприятия\n• Выражайте интерес к таинственным коробкам\n• Оставляйте отзывы\n\n📞 Нужна помощь? Обратитесь к администратору."
    },
    
    kk: {
        welcome: "Жеңілдік ботына қош келдіңіз! 🍕\n\nБұл бот тамақ кәсіпорындарына күндің соңында сатылмаған өнімдерді тұтынушыларға жұмбақ қораптарда сатуға көмектеседі.\n\nӨз тіліңізді таңдаңыз:",
        languageSelected: "Тіл таңдалды: Қазақ",
        selectCity: "Өз қалаңызды таңдаңыз:",
        citySelected: "Қала таңдалды:",
        mainMenu: "Өз рөліңізді таңдаңыз:\n\n🏪 Кәсіпорын - Егер сіз жұмбақ қораптар сатқыңыз келсе\n👥 Тұтынушы - Егер сіз жұмбақ қораптар сатқыңыз келсе\n❓ Көмек - Көмек және ақпарат алу үшін",
        business: "Кәсіпорын",
        customer: "Тұтынушы",
        help: "Көмек",
        welcomeCustomer: "Қош келдіңіз! Енді сіз өз қалаңыздағы қолжетімді жұмбақ қораптарды шолуға болады.",
        registerAsBusiness: "Кәсіпорын ретінде тіркелу",
        registerAsCustomer: "Тұтынушы ретінде тіркелу",
        backToMain: "Басты менюге оралу",
        backToMenu: "Менюге оралу",
        
        // Business registration
        businessRegistration: "Кәсіпорын тіркеуі",
        businessCodeInstructions: "🔑 Кәсіпорын тіркеуі үшін сізде тіркеу коды керек.\n\n📞 Әкімшіге хабарласыңыз код алу үшін:\n{phone}\n\n💬 Хабарлама жіберіңіз:\n• Кәсіпорын аты\n• Орналасуы\n• Тіркеу кодын өтініз\n\n✅ Код алудан кейін оны төменде енгізіңіз.",
        enterBusinessCode: "Өз кәсіпорыныңыздың тіркеу кодін енгізіңіз.\n\nЕгер сізде код жоқ болса, оны алу үшін әкімшіге хабарласыңыз.",
        invalidCode: "❌ Жарамсыз немесе мерзімі өткен код. Кодты тексеріп, қайталап көріңіз немесе жаңа код алу үшін әкімшіге хабарласыңыз.",
        codeValid: "✅ Код жарамды! Өз кәсіпорыныңыздың атауын енгізіңіз:",
        businessAddress: "Өз кәсіпорыныңыздың мекенжайын енгізіңіз:",
        contactPhone: "Өз байланыс телефон нөіріңізді енгізіңіз:",
        registrationSuccess: "✅ Тіркеу сәтті болды!\n\nКәсіпорын: {name}\nМекенжай: {address}\nТелефон: {phone}\n\nЕнді сіз жұмбақ қорап сатуын басқара аласыз.",
        registrationFailed: "❌ Тіркеу сәтсіз болды. Қайталап көріңіз.",
        
        // Business dashboard
        businessDashboard: "🏪 Кәсіпорын басқару панелі\n\nАтауы: {name}\nМекенжай: {address}\nТелефон: {phone}\nКүйі: {status}\n\nКіші қорап бағасы: {smallPrice} ₸\nОрта қорап бағасы: {mediumPrice} ₸\nҮлкен қорап бағасы: {largePrice} ₸\nСату уақыты: {time}",
        active: "🟢 Белсенді",
        inactive: "🔴 Белсенді емес",
        setPrices: "Қорап бағаларын орнату",
        setTime: "Сату уақытын орнату",
        setSalesTime: "Жұмбақ қораптарыңыз қолжетімді болатын уақытты таңдаңыз:",
        selectBoxToSetPrice: "Қорап өлшемін таңдаңыз:",
        enterSmallBoxPrice: "Кіші қораптың бағасын енгізіңіз (тенге):",
        enterMediumBoxPrice: "Орта қораптың бағасын енгізіңіз (тенге):",
        enterLargeBoxPrice: "Үлкен қораптың бағасын енгізіңіз (тенге):",
        priceUpdated: "✅ {box} бағасы {price} ₸ деп жаңартылды",
        pricesUpdated: "✅ Барлық бағалар сәтті жаңартылды!",
        markActive: "Белсенді деп белгілеу",
        markInactive: "Белсенді емес деп белгілеу",
        viewInterests: "Тұтынушы қызығушылығын көру",
        
        // Price and time settings
        invalidPrice: "❌ Жалған баға. Нақты санды енгізіңіз.",
        salesTimeUpdated: "✅ Сату уақыты {time} деп жаңартылды!",
        statusUpdated: "✅ Күй {status} деп жаңартылды!",
        notSet: "Орнатылмаған",
        
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
        customerRegistrationSuccess: "✅ Тіркеу сәтті болды!\n\nҚош келдіңіз, {name}! Енді сіз өз қалаңыздағы қолжетімді жұмбақ қораптарды шолуға болады.",
        
        // Customer browsing
        viewBusinesses: "Кәсіпорындарды көру",
        availableBusinesses: "{city} қаласындағы қолжетімді кәсіпорындар:",
        noBusinessesAvailable: "{city} қаласында әзірше белсенді кәсіпорындар жоқ.",
        businessNotAvailable: "Бұл кәсіпорын қолжетімді емес.",
        businessDetails: "🏪 {name}\n📍 {address}\n📞 {phone}\n⏰ Сату уақыты: {time}\n\nКіші қорап: {smallPrice} ₸\nОрта қорап: {mediumPrice} ₸\nҮлкен қорап: {largePrice} ₸\n\n💡 Қорап таңдау ресторанға қызығушылығыңыз туралы хабарлайды. Алғашқы келген алғашқы қызмет көрсетіледі.",
        selectBoxSize: "Қорап өлшемін таңдаңыз:",
        interestRecorded: "✅ Сіздің қызығушылығыңыз тіркелді!\n\nКоробка: {size}\nБизнес: {business}\nБаға: {price} ₸\nУақыт: {time}\n\nКәсіпорын сізбен байланысады.",
        alreadyInterested: "Сіз бұл кәсіпорынға қызығушылық білдіргенсіз.",
        leaveFeedback: "Пікір қалдыру",
        
        // Feedback
        feedbackPrompt: "Жұмбақ қорап тәжірибесі қалай болды?",
        feedbackSubmitted: "✅ Пікіріңіз үшін рахмет!",
        feedbackForBusiness: "{business} кәсіпорынына пікір:",
        submitYourFeedback: "Өз пікіріңізді жіберіңіз:",
        unableToSubmit: "Пікір жіберу мүмкін емес. Қайталап көріңіз.",
        
        // Errors
        businessNotFound: "Кәсіпорын табылмады.",
        error: "Қате орын алды. Қайталап көріңіз.",
        notRegistered: "Алдымен тіркеліңіз.",
        notBusiness: "Бұл функция тек кәсіпорындар үшін қолжетімді.",
        notCustomer: "Бұл функция тек тұтынушылар үшін қолжетімді.",
        
        // Help
        helpInfo: "🤖 Mystery Box боты туралы ақпарат\n\nБұл бот тамақ кәсіпорындарына күндің соңында сатылмаған өнімдерді тұтынушыларға жұмбақ қораптарда сатуға көмектеседі.\n\n📱 Кәсіпорындар үшін:\n• Администратордан кодпен тіркеліңіз\n• Бағалар мен қолжетімділікті орнатыңыз\n• Тұтынушы қызығушылығын көріңіз\n\n👥 Тұтынушылар үшін:\n• Қолжетімді кәсіпорындарды шолыңыз\n• Жұмбақ қораптарға қызығушылық білдіріңіз\n• Пікір қалдырыңыз\n\n📞 Көмек керек пе? Администраторға хабарласыңыз."
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