# Telegram Bot for Food Business Mystery Boxes

A Telegram bot-based SaaS application that helps food businesses sell unsold end-of-day products in mystery boxes to customers. The system supports two user types: businesses and customers, with multi-language support (English, Russian, Kazakh) and city-based filtering.

## Features

### For Businesses
- **Registration**: Businesses must contact the administrator to receive a unique registration code
- **Profile Management**: Set business name, address, and contact information
- **Pricing Control**: Set prices for small, medium, and large mystery boxes
- **Availability Management**: Toggle active/inactive status and set sales time
- **Customer Interest Tracking**: View customer interest in their mystery boxes
- **Multi-language Support**: Interface available in English, Russian, and Kazakh

### For Customers
- **Registration**: Simple registration with name and phone number
- **Browse Businesses**: View available businesses in their city
- **Express Interest**: Show interest in specific box sizes
- **Feedback System**: Rate and comment on mystery box experiences
- **City Filtering**: Only see businesses in their selected city

### For Administrators
- **Code Management**: Generate and distribute business registration codes
- **System Statistics**: View business and customer statistics
- **Code Tracking**: Monitor used, available, and expired codes
- **User Management**: View registered businesses and customers
- **Feedback Monitoring**: Review customer feedback and ratings

## System Architecture

### Database Schema
- **Businesses**: Store business information, pricing, and status
- **BusinessCodes**: Auto-generated codes with expiration dates
- **Customers**: Customer registration and preferences
- **Interests**: Track customer interest in specific businesses
- **Feedback**: Customer ratings and comments

### Code Generation System
- **Auto-generation**: Codes are automatically generated in the database
- **Admin Distribution**: Administrators generate codes and distribute them to businesses
- **Security**: Businesses must contact admin to receive registration codes
- **Expiration**: Codes expire after 1 year for security
- **Unique Format**: BUS + timestamp + random string (e.g., BUS123456ABC)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- Telegram Bot Token (from @BotFather)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bot-discount
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   BOT_TOKEN=your_telegram_bot_token
   DATABASE_URL=postgresql://username:password@localhost:5432/bot_discount
   ADMIN_IDS=123456789,987654321
   ```

4. **Set up the database**
   ```bash
   npm run setup
   ```

5. **Generate initial business codes (Admin only)**
   ```bash
   npm run admin
   ```
   Use the `/admin` command in Telegram to generate codes

### Running the Application

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

## Admin Panel

The admin panel is accessible via Telegram commands for authorized administrators:

### Commands
- `/admin` - Access the admin panel

### Features
- **Statistics**: View system-wide statistics
- **Business Management**: View registered businesses
- **Customer Management**: View registered customers
- **Code Generation**: Generate new business codes (5, 10, or 20 at a time)
- **Code Management**: View available, used, and expired codes
- **Feedback Review**: Monitor customer feedback

### Setting Up Admin Access
1. Get your Telegram user ID
2. Add it to the `ADMIN_IDS` environment variable (comma-separated for multiple admins)
3. Restart the bot
4. Use `/admin` command in Telegram

## Business Registration Flow

1. **Contact Admin**: Business contacts administrator for registration code
2. **Receive Code**: Admin generates and provides unique code
3. **Enter Code**: Business enters code in bot registration
4. **Complete Profile**: Business provides name, address, and phone
5. **Setup Pricing**: Set prices for different box sizes
6. **Set Availability**: Configure sales time and active status

## Deployment

### Render Deployment
The application is configured for deployment on Render with automatic webhook setup.

1. **Push to GitHub**: Ensure your code is in a GitHub repository
2. **Deploy on Render**: Use the provided `render.yaml` for blueprint deployment
3. **Set Environment Variables**: Configure all required environment variables
4. **Set Webhook**: The deployment script automatically sets the webhook URL

See `RENDER_DEPLOYMENT.md` for detailed deployment instructions.

## City Management

### Current Cities
- **Almaty** (Алматы / Алматы)
- **Astana** (Астана / Астана)

### Adding New Cities
Use the provided script to add new cities:
```bash
npm run add-city
```

## Language Support

The bot supports three languages:
- **English** (en)
- **Russian** (ru) 
- **Kazakh** (kk)

Users can select their preferred language during initial setup.

## Security Features

- **Code-based Registration**: Businesses require admin-provided codes
- **Code Expiration**: All codes expire after 1 year
- **Unique Code Generation**: Prevents code conflicts
- **Admin-only Access**: Restricted admin functions
- **Session Management**: Secure user session handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the documentation
- Review the deployment guide
- Contact the development team 