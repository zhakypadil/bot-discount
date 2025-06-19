# Mystery Box Bot

A Telegram bot-based SaaS app for food businesses to sell unsold end-of-day products in mystery boxes. The bot supports multiple languages (English, Russian, Kazakh) and city-based filtering.

## Features

### Multi-Language Support
- **English, Russian, and Kazakh** languages
- Users select their preferred language during registration
- All user-facing text is localized
- Easy to add more languages

### City-Based Filtering
- **Almaty and Astana** currently supported
- Businesses and customers are filtered by city
- Users only see businesses and customers from their city
- Easy to add more cities

### For Businesses
- **Automatic registration** with auto-generated business codes
- Set prices for small/medium/large mystery boxes
- Set sales start time
- Mark active/inactive status
- View customer interest counts
- Receive customer feedback

### For Customers
- Browse available businesses in their city
- View mystery box prices and timing
- Express interest in box sizes
- Leave feedback for businesses
- Real-time updates

## Tech Stack

- **Node.js** with Express
- **Telegraf** for Telegram Bot API
- **PostgreSQL** database
- **Sequelize** ORM
- **Render** for deployment

## Setup

### Prerequisites
- Node.js 16+
- PostgreSQL database
- Telegram Bot Token

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bot-discount
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Configure environment variables:
```env
BOT_TOKEN=your_telegram_bot_token
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=development
ADMIN_PHONE=+1234567890
```

5. Run database setup:
```bash
npm run setup
```

6. Start the bot:
```bash
# Development
npm run dev

# Production
npm start
```

## Adding New Cities

To add a new city, use the provided script:

```bash
node scripts/add-city.js <cityKey> <englishName> <russianName> <kazakhName>
```

Example:
```bash
node scripts/add-city.js shymkent "Shymkent" "Шымкент" "Шымкент"
```

Then update the `cities` object in `src/config/languages.js` to make it permanent.

## Adding New Languages

To add a new language:

1. Add the language code to the `languages` object in `src/config/languages.js`
2. Add the language to the `language` field ENUM in database models
3. Update the language selection UI in `mainHandlers.js`

## Database Schema

### Businesses
- `id` - Primary key
- `telegram_id` - Telegram user ID
- `name` - Business name
- `address` - Business address
- `phone` - Contact phone
- `small_price`, `medium_price`, `large_price` - Box prices
- `sales_time` - Sales start time
- `is_active` - Active status
- `language` - User's language preference
- `city` - Business city

### Customers
- `id` - Primary key
- `telegram_id` - Telegram user ID
- `name` - Customer name
- `language` - User's language preference
- `city` - Customer city

### Interests
- `id` - Primary key
- `customer_id` - Customer reference
- `business_id` - Business reference
- `box_size` - Box size (small/medium/large)

### Feedback
- `id` - Primary key
- `customer_id` - Customer reference
- `business_id` - Business reference
- `message` - Feedback message

### Business Codes
- `id` - Primary key
- `code` - Auto-generated business registration code
- `is_used` - Whether code has been used
- `used_by` - Business ID that used the code
- `expires_at` - Code expiration date (1 year from creation)

## Business Code System

The bot automatically generates unique business codes when users register as businesses:

- **Format**: `BUS` + timestamp + random string (e.g., `BUS123456ABC`)
- **Validity**: 1 year from generation
- **Uniqueness**: Each code is guaranteed to be unique
- **Automatic Assignment**: Codes are automatically assigned to the registering business

## Deployment

### Render Deployment

1. Connect your repository to Render
2. Set environment variables in Render dashboard
3. Deploy using the provided `render.yaml`

### Environment Variables for Production

```env
BOT_TOKEN=your_telegram_bot_token
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=production
WEBHOOK_URL=https://your-app.onrender.com/webhook
ADMIN_PHONE=+1234567890
```

## Admin Panel

Access the admin panel to manage the system:

```bash
npm run admin
```

## Scripts

- `npm start` - Start the bot
- `npm run dev` - Start in development mode with nodemon
- `npm run setup` - Initialize database and create admin user
- `npm run admin` - Access admin panel
- `npm run render-setup` - Setup for Render deployment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details. 