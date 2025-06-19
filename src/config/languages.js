const languages = {
    en: {
        // Main menu
        welcome: '🎉 **Welcome to Mystery Box Bot!**\n\nConnect food businesses with customers for amazing end-of-day deals.\n\n**For Businesses:**\n• Sell unsold products in mystery boxes\n• Set your own prices and timing\n• Track customer interest\n\n**For Customers:**\n• Discover local food businesses\n• Get great deals on mystery boxes\n• Express interest in your favorite sizes\n\nPlease select your role:',
        business: '🏪 Business',
        customer: '👤 Customer',
        help: '❓ Help',
        backToMain: '🏠 Back to Main Menu',
        
        // Language selection
        selectLanguage: '🌐 **Select Language**\n\nPlease choose your preferred language:',
        languageSelected: '✅ Language set to English',
        
        // City selection
        selectCity: '🏙️ **Select Your City**\n\nPlease choose your city:',
        citySelected: '✅ City set to',
        
        // Business flow
        businessRegistration: '🔐 **Business Registration**\n\nTo register as a business, you need a valid business code.\n\nPlease contact the administrator to get your business code.',
        enterBusinessCode: '📝 **Enter Business Code**\n\nPlease send your business code:',
        invalidCode: '❌ **Invalid Code**\n\nThe business code you entered is invalid or has expired.\n\nPlease contact admin:',
        codeValid: '✅ **Code Valid!**\n\nPlease enter your business name:',
        businessName: '📍 **Business Name**\n\nPlease enter your business name:',
        businessAddress: '📍 **Business Address**\n\nPlease enter your business address:',
        contactPhone: '📞 **Contact Phone**\n\nPlease enter your business phone number:',
        registrationSuccess: '🎉 **Registration Successful!**\n\nBusiness: {name}\nAddress: {address}\nPhone: {phone}\n\nYou can now manage your mystery boxes!',
        registrationFailed: '❌ **Registration Failed**\n\nAn error occurred during registration. Please try again.',
        businessNotFound: '❌ **Business Not Found**\n\nPlease register as a business first.',
        businessDashboard: '🏪 **Business Dashboard**\n\n**{name}**\n📍 {address}\n📞 {phone}\nStatus: {status}\n\n**Current Prices:**\nSmall Box: ${smallPrice}\nMedium Box: ${mediumPrice}\nLarge Box: ${largePrice}\n\n**Sales Start Time:** {time}',
        setPrices: '💰 Set Prices',
        setTime: '⏰ Set Sales Time',
        markInactive: '🚫 Mark Inactive',
        markActive: '✅ Mark Active',
        viewInterests: '📊 View Customer Interest',
        setBoxPrices: '💰 **Set Box Prices**\n\nSelect the price for each box size:',
        pricesUpdated: '✅ **Prices Updated Successfully!**',
        setSalesTime: '⏰ **Set Sales Start Time**\n\nSelect when your mystery boxes go on sale:',
        salesTimeUpdated: '✅ **Sales Time Updated!**\n\nBoxes will go on sale at {time}',
        statusUpdated: '✅ **Status Updated!**\n\nYour business is now {status}',
        customerInterestSummary: '📊 **Customer Interest Summary**\n\n',
        noInterestYet: 'No customer interest yet.',
        backToMenu: 'Back to Menu',
        
        // Customer flow
        welcomeCustomer: '👋 **Welcome Customer!**\n\nDiscover amazing mystery boxes from local food businesses.\n\nEach box contains delicious end-of-day products at great prices!',
        viewBusinesses: '🏪 View Available Businesses',
        noBusinessesAvailable: '😔 **No Businesses Available**\n\nNo businesses are currently offering mystery boxes.\n\nCheck back later or try refreshing!',
        availableBusinesses: '🏪 **Available Businesses**\n\nSelect a business to view their mystery box offerings:\n\n',
        businessNotAvailable: '❌ **Business Not Available**\n\nThis business is not currently offering mystery boxes.',
        businessDetails: '🏪 **{name}**\n\n📍 **Address:** {address}\n📞 **Phone:** {phone}\n⏰ **Sales Start:** {time}\n\n💰 **Mystery Box Prices:**\n• Small Box: ${smallPrice}\n• Medium Box: ${mediumPrice}\n• Large Box: ${largePrice}\n\nClick on a box size to express your interest!',
        interestRecorded: '✅ **Interest Recorded!**\n\nYou\'ve expressed interest in a **{size}** mystery box from **{business}**.\n\nThe business will be notified of your interest.\n\n💰 Price: ${price}\n⏰ Sales start at {time}',
        leaveFeedback: '📝 Leave Feedback',
        feedbackForBusiness: '📝 **Feedback for {business}**\n\n**Disclaimer:** We do not control restaurant pricing or behavior. If you had a bad experience, describe it below and we\'ll investigate. In serious cases we may remove the business.\n\nPlease provide your honest feedback about your experience with this business.',
        submitFeedback: '📝 Submit Feedback',
        submitYourFeedback: '📝 **Submit Your Feedback**\n\nPlease type your feedback message below:',
        feedbackSubmitted: '✅ **Feedback Submitted!**\n\nThank you for your feedback. We will review it and take appropriate action if necessary.',
        
        // Error messages
        error: '❌ **Error**\n\nAn error occurred. Please try again.',
        unableToProcess: '❌ **Error**\n\nUnable to process your request. Please try again.',
        unableToSubmit: '❌ **Error**\n\nUnable to submit. Please try again.',
        
        // Box sizes
        smallBox: 'Small Box',
        mediumBox: 'Medium Box',
        largeBox: 'Large Box',
        
        // Status
        active: '🟢 Active',
        inactive: '🔴 Inactive',
        
        // Help
        helpInfo: '❓ **Help & Information**\n\n**How it works:**\n\n🏪 **For Businesses:**\n1. Register with a business code\n2. Set prices for small/medium/large boxes\n3. Set when boxes go on sale\n4. Mark yourself active/inactive daily\n5. View customer interest counts\n\n👤 **For Customers:**\n1. Browse available businesses\n2. View prices and timing\n3. Express interest in box sizes\n4. Leave feedback if needed\n\n**Mystery Boxes:**\n• Small: Perfect for 1-2 people\n• Medium: Great for 2-3 people\n• Large: Ideal for families or groups\n\n**Need Support?**\nContact admin: {phone}',
        
        // Refresh
        refresh: '🔄 Refresh'
    },
    
    ru: {
        // Main menu
        welcome: '🎉 **Добро пожаловать в Mystery Box Bot!**\n\nСоединяем пищевые предприятия с клиентами для удивительных сделок в конце дня.\n\n**Для бизнеса:**\n• Продавайте непроданные продукты в mystery box\n• Устанавливайте свои цены и время\n• Отслеживайте интерес клиентов\n\n**Для клиентов:**\n• Откройте местные пищевые предприятия\n• Получите отличные предложения на mystery box\n• Выразите интерес к любимым размерам\n\nПожалуйста, выберите вашу роль:',
        business: '🏪 Бизнес',
        customer: '👤 Клиент',
        help: '❓ Помощь',
        backToMain: '🏠 Вернуться в главное меню',
        
        // Language selection
        selectLanguage: '🌐 **Выберите язык**\n\nПожалуйста, выберите предпочитаемый язык:',
        languageSelected: '✅ Язык установлен на русский',
        
        // City selection
        selectCity: '🏙️ **Выберите ваш город**\n\nПожалуйста, выберите ваш город:',
        citySelected: '✅ Город установлен',
        
        // Business flow
        businessRegistration: '🔐 **Регистрация бизнеса**\n\nДля регистрации в качестве бизнеса вам нужен действительный код бизнеса.\n\nПожалуйста, свяжитесь с администратором для получения кода бизнеса.',
        enterBusinessCode: '📝 **Введите код бизнеса**\n\nПожалуйста, отправьте ваш код бизнеса:',
        invalidCode: '❌ **Недействительный код**\n\nВведенный вами код бизнеса недействителен или истек.\n\nПожалуйста, свяжитесь с администратором:',
        codeValid: '✅ **Код действителен!**\n\nПожалуйста, введите название вашего бизнеса:',
        businessName: '📍 **Название бизнеса**\n\nПожалуйста, введите название вашего бизнеса:',
        businessAddress: '📍 **Адрес бизнеса**\n\nПожалуйста, введите адрес вашего бизнеса:',
        contactPhone: '📞 **Контактный телефон**\n\nПожалуйста, введите номер телефона вашего бизнеса:',
        registrationSuccess: '🎉 **Регистрация успешна!**\n\nБизнес: {name}\nАдрес: {address}\nТелефон: {phone}\n\nТеперь вы можете управлять вашими mystery box!',
        registrationFailed: '❌ **Регистрация не удалась**\n\nПроизошла ошибка во время регистрации. Пожалуйста, попробуйте снова.',
        businessNotFound: '❌ **Бизнес не найден**\n\nПожалуйста, сначала зарегистрируйтесь как бизнес.',
        businessDashboard: '🏪 **Панель управления бизнесом**\n\n**{name}**\n📍 {address}\n📞 {phone}\nСтатус: {status}\n\n**Текущие цены:**\nМаленький Box: ${smallPrice}\nСредний Box: ${mediumPrice}\nБольшой Box: ${largePrice}\n\n**Время начала продаж:** {time}',
        setPrices: '💰 Установить цены',
        setTime: '⏰ Установить время продаж',
        markInactive: '🚫 Отметить неактивным',
        markActive: '✅ Отметить активным',
        viewInterests: '📊 Просмотр интереса клиентов',
        setBoxPrices: '💰 **Установить цены на Box**\n\nВыберите цену для каждого размера box:',
        pricesUpdated: '✅ **Цены успешно обновлены!**',
        setSalesTime: '⏰ **Установить время начала продаж**\n\nВыберите, когда ваши mystery box поступят в продажу:',
        salesTimeUpdated: '✅ **Время продаж обновлено!**\n\nBox поступят в продажу в {time}',
        statusUpdated: '✅ **Статус обновлен!**\n\nВаш бизнес теперь {status}',
        customerInterestSummary: '📊 **Сводка интереса клиентов**\n\n',
        noInterestYet: 'Интерес клиентов пока нет.',
        backToMenu: 'Вернуться в меню',
        
        // Customer flow
        welcomeCustomer: '👋 **Добро пожаловать, клиент!**\n\nОткройте удивительные mystery box от местных пищевых предприятий.\n\nКаждый box содержит вкусные продукты конца дня по отличным ценам!',
        viewBusinesses: '🏪 Просмотр доступных предприятий',
        noBusinessesAvailable: '😔 **Нет доступных предприятий**\n\nВ настоящее время нет предприятий, предлагающих mystery box.\n\nПроверьте позже или попробуйте обновить!',
        availableBusinesses: '🏪 **Доступные предприятия**\n\nВыберите предприятие для просмотра их предложений mystery box:\n\n',
        businessNotAvailable: '❌ **Предприятие недоступно**\n\nЭто предприятие в настоящее время не предлагает mystery box.',
        businessDetails: '🏪 **{name}**\n\n📍 **Адрес:** {address}\n📞 **Телефон:** {phone}\n⏰ **Начало продаж:** {time}\n\n💰 **Цены Mystery Box:**\n• Маленький Box: ${smallPrice}\n• Средний Box: ${mediumPrice}\n• Большой Box: ${largePrice}\n\nНажмите на размер box, чтобы выразить интерес!',
        interestRecorded: '✅ **Интерес зарегистрирован!**\n\nВы выразили интерес к **{size}** mystery box от **{business}**.\n\nПредприятие будет уведомлено о вашем интересе.\n\n💰 Цена: ${price}\n⏰ Продажи начинаются в {time}',
        leaveFeedback: '📝 Оставить отзыв',
        feedbackForBusiness: '📝 **Отзыв для {business}**\n\n**Отказ от ответственности:** Мы не контролируем цены или поведение ресторанов. Если у вас был плохой опыт, опишите его ниже, и мы проведем расследование. В серьезных случаях мы можем удалить предприятие.\n\nПожалуйста, предоставьте ваш честный отзыв о вашем опыте с этим предприятием.',
        submitFeedback: '📝 Отправить отзыв',
        submitYourFeedback: '📝 **Отправить ваш отзыв**\n\nПожалуйста, введите ваше сообщение с отзывом ниже:',
        feedbackSubmitted: '✅ **Отзыв отправлен!**\n\nСпасибо за ваш отзыв. Мы рассмотрим его и примем соответствующие меры при необходимости.',
        
        // Error messages
        error: '❌ **Ошибка**\n\nПроизошла ошибка. Пожалуйста, попробуйте снова.',
        unableToProcess: '❌ **Ошибка**\n\nНе удалось обработать ваш запрос. Пожалуйста, попробуйте снова.',
        unableToSubmit: '❌ **Ошибка**\n\nНе удалось отправить. Пожалуйста, попробуйте снова.',
        
        // Box sizes
        smallBox: 'Маленький Box',
        mediumBox: 'Средний Box',
        largeBox: 'Большой Box',
        
        // Status
        active: '🟢 Активен',
        inactive: '🔴 Неактивен',
        
        // Help
        helpInfo: '❓ **Помощь и информация**\n\n**Как это работает:**\n\n🏪 **Для бизнеса:**\n1. Зарегистрируйтесь с кодом бизнеса\n2. Установите цены для маленьких/средних/больших box\n3. Установите, когда box поступят в продажу\n4. Отмечайте себя активным/неактивным ежедневно\n5. Просматривайте количество интереса клиентов\n\n👤 **Для клиентов:**\n1. Просматривайте доступные предприятия\n2. Просматривайте цены и время\n3. Выражайте интерес к размерам box\n4. Оставляйте отзывы при необходимости\n\n**Mystery Box:**\n• Маленький: Идеально для 1-2 человек\n• Средний: Отлично для 2-3 человек\n• Большой: Идеально для семей или групп\n\n**Нужна поддержка?**\nСвяжитесь с администратором: {phone}',
        
        // Refresh
        refresh: '🔄 Обновить'
    },
    
    kk: {
        // Main menu
        welcome: '🎉 **Mystery Box Bot-қа қош келдіңіз!**\n\nАзық-түлік бизнесдерін тұтынушылармен күндің соңындағы тауарларды сату үшін байланыстырыңыз.\n\n**Бизнес үшін:**\n• Сатылмаған өнімдерді mystery box-тарда сатыңыз\n• Өз бағаларыңызды және уақытыңызды белгілеңіз\n• Тұтынушылардың қызығушылығын қадағалаңыз\n\n**Тұтынушылар үшін:**\n• Жергілікті азық-түлік бизнесдерін табыңыз\n• Mystery box-тарда жақсы ұсыныстар алыңыз\n• Сүйікті өлшемдеріңізге қызығушылық білдіріңіз\n\nӨз рөліңізді таңдаңыз:',
        business: '🏪 Бизнес',
        customer: '👤 Тұтынушы',
        help: '❓ Көмек',
        backToMain: '🏠 Басты мәзірге оралу',
        
        // Language selection
        selectLanguage: '🌐 **Тілді таңдаңыз**\n\nӨз тіліңізді таңдаңыз:',
        languageSelected: '✅ Тіл қазақ тіліне орнатылды',
        
        // City selection
        selectCity: '🏙️ **Қалаңызды таңдаңыз**\n\nҚалаңызды таңдаңыз:',
        citySelected: '✅ Қала орнатылды',
        
        // Business flow
        businessRegistration: '🔐 **Бизнес тіркеуі**\n\nБизнес ретінде тіркелу үшін сізге жарамды бизнес коды қажет.\n\nБизнес кодыңызды алу үшін әкімшімен байланысыңыз.',
        enterBusinessCode: '📝 **Бизнес кодын енгізіңіз**\n\nБизнес кодыңызды жіберіңіз:',
        invalidCode: '❌ **Жарамсыз код**\n\nСіз енгізген бизнес коды жарамсыз немесе мерзімі өткен.\n\nӘкімшімен байланысыңыз:',
        codeValid: '✅ **Код жарамды!**\n\nБизнес атауыңызды енгізіңіз:',
        businessName: '📍 **Бизнес атауы**\n\nБизнес атауыңызды енгізіңіз:',
        businessAddress: '📍 **Бизнес мекенжайы**\n\nБизнес мекенжайыңызды енгізіңіз:',
        contactPhone: '📞 **Байланыс телефоны**\n\nБизнес телефон нөіріңізді енгізіңіз:',
        registrationSuccess: '🎉 **Тіркеу сәтті!**\n\nБизнес: {name}\nМекенжай: {address}\nТелефон: {phone}\n\nЕнді сіз mystery box-тарыңызды басқара аласыз!',
        registrationFailed: '❌ **Тіркеу сәтсіз**\n\nТіркеу кезінде қате орын алды. Қайталап көріңіз.',
        businessNotFound: '❌ **Бизнес табылмады**\n\nАлдымен бизнес ретінде тіркеліңіз.',
        businessDashboard: '🏪 **Бизнес бақылау панелі**\n\n**{name}**\n📍 {address}\n📞 {phone}\nКүй: {status}\n\n**Ағымдағы бағалар:**\nКіші Box: ${smallPrice}\nОрта Box: ${mediumPrice}\nҮлкен Box: ${largePrice}\n\n**Сату басталатын уақыт:** {time}',
        setPrices: '💰 Бағаларды белгілеу',
        setTime: '⏰ Сату уақытын белгілеу',
        markInactive: '🚫 Белсенді емес деп белгілеу',
        markActive: '✅ Белсенді деп белгілеу',
        viewInterests: '📊 Тұтынушылардың қызығушылығын көру',
        setBoxPrices: '💰 **Box бағаларын белгілеу**\n\nӘр box өлшемінің бағасын таңдаңыз:',
        pricesUpdated: '✅ **Бағалар сәтті жаңартылды!**',
        setSalesTime: '⏰ **Сату басталатын уақытты белгілеу**\n\nMystery box-тарыңыз сатыла бастайтын уақытты таңдаңыз:',
        salesTimeUpdated: '✅ **Сату уақыты жаңартылды!**\n\nBox-тар {time} уақытында сатыла бастайды',
        statusUpdated: '✅ **Күй жаңартылды!**\n\nСіздің бизнесіңіз енді {status}',
        customerInterestSummary: '📊 **Тұтынушылардың қызығушылық қорытындысы**\n\n',
        noInterestYet: 'Тұтынушылардың қызығушылығы әлі жоқ.',
        backToMenu: 'Мәзірге оралу',
        
        // Customer flow
        welcomeCustomer: '👋 **Тұтынушыға қош келдіңіз!**\n\nЖергілікті азық-түлік бизнесдерінен керемет mystery box-тарды табыңыз.\n\nӘр box-та күндің соңындағы дәмді өнімдер жақсы бағалармен бар!',
        viewBusinesses: '🏪 Қолжетімді бизнесдерді көру',
        noBusinessesAvailable: '😔 **Қолжетімді бизнесдер жоқ**\n\nҚазіргі уақытта mystery box-тар ұсынатын бизнесдер жоқ.\n\nКейінірек қайта көріңіз немесе жаңартуды көріңіз!',
        availableBusinesses: '🏪 **Қолжетімді бизнесдер**\n\nОлардың mystery box ұсыныстарын көру үшін бизнесті таңдаңыз:\n\n',
        businessNotAvailable: '❌ **Бизнес қолжетімді емес**\n\nБұл бизнес қазіргі уақытта mystery box-тар ұсынбайды.',
        businessDetails: '🏪 **{name}**\n\n📍 **Мекенжай:** {address}\n📞 **Телефон:** {phone}\n⏰ **Сату басталады:** {time}\n\n💰 **Mystery Box бағалары:**\n• Кіші Box: ${smallPrice}\n• Орта Box: ${mediumPrice}\n• Үлкен Box: ${largePrice}\n\nҚызығушылық білдіру үшін box өлшеміне басыңыз!',
        interestRecorded: '✅ **Қызығушылық тіркелді!**\n\nСіз **{business}**-тен **{size}** mystery box-қа қызығушылық білдірдіңіз.\n\nБизнес сіздің қызығушылығыңыз туралы хабардар болады.\n\n💰 Баға: ${price}\n⏰ Сату {time} уақытында басталады',
        leaveFeedback: '📝 Пікір қалдыру',
        feedbackForBusiness: '📝 **{business} туралы пікір**\n\n**Ескерту:** Біз ресторан бағаларын немесе мінез-құлқын бақыламаймыз. Егер сізде жаман тәжірибе болса, оны төменде сипаттаңыз және біз зерттейміз. Серьезді жағдайларда біз бизнесті алып тастауымыз мүмкін.\n\nБұл бизнес туралы шынайы пікіріңізді беріңіз.',
        submitFeedback: '📝 Пікір жіберу',
        submitYourFeedback: '📝 **Пікіріңізді жіберіңіз**\n\nТөменде пікір хабарламасын теріңіз:',
        feedbackSubmitted: '✅ **Пікір жіберілді!**\n\nПікіріңіз үшін рахмет. Біз оны қарастырамыз және қажет болса сәйкес әрекет жасаймыз.',
        
        // Error messages
        error: '❌ **Қате**\n\nҚате орын алды. Қайталап көріңіз.',
        unableToProcess: '❌ **Қате**\n\nСіздің сұрауыңызды өңдеу мүмкін емес. Қайталап көріңіз.',
        unableToSubmit: '❌ **Қате**\n\nЖіберу мүмкін емес. Қайталап көріңіз.',
        
        // Box sizes
        smallBox: 'Кіші Box',
        mediumBox: 'Орта Box',
        largeBox: 'Үлкен Box',
        
        // Status
        active: '🟢 Белсенді',
        inactive: '🔴 Белсенді емес',
        
        // Help
        helpInfo: '❓ **Көмек және ақпарат**\n\n**Қалай жұмыс істейді:**\n\n🏪 **Бизнес үшін:**\n1. Бизнес кодымен тіркеліңіз\n2. Кіші/орта/үлкен box-тарға баға белгілеңіз\n3. Box-тар сатыла бастайтын уақытты белгілеңіз\n4. Күнделікті белсенді/белсенді емес деп белгілеңіз\n5. Тұтынушылардың қызығушылық санын көріңіз\n\n👤 **Тұтынушылар үшін:**\n1. Қолжетімді бизнесдерді шолыңыз\n2. Бағалар мен уақытты көріңіз\n3. Box өлшемдеріне қызығушылық білдіріңіз\n4. Қажет болса пікір қалдырыңыз\n\n**Mystery Box-тар:**\n• Кіші: 1-2 адамға тамаша\n• Орта: 2-3 адамға жақсы\n• Үлкен: Отбасылар немесе топтарға идеал\n\n**Көмек керек пе?**\nӘкімшімен байланысыңыз: {phone}',
        
        // Refresh
        refresh: '🔄 Жаңарту'
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