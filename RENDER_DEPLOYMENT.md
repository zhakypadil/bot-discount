# 🚀 Render Deployment Guide

Complete guide to deploy your Mystery Box Bot on Render.

## 📋 Prerequisites

1. **GitHub Account** - Your code must be on GitHub
2. **Telegram Bot Token** - Get from @BotFather
3. **Render Account** - Sign up at [render.com](https://render.com)

## 🎯 Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure your code is pushed to GitHub with these files:
- `package.json`
- `src/index.js`
- `render.yaml` (optional, for automatic setup)
- `scripts/render-setup.js`

### 2. Create Render Account

1. Go to [render.com](https://render.com)
2. Click "Get Started"
3. Sign up with your GitHub account
4. Authorize Render to access your repositories

### 3. Create PostgreSQL Database

1. In Render dashboard, click **"New +"**
2. Select **"PostgreSQL"**
3. Configure:
   - **Name**: `mystery-box-db`
   - **Database**: `bot_discount`
   - **User**: `bot_user`
   - **Plan**: `Free`
4. Click **"Create Database"**
5. **Copy the connection string** (you'll need this later)

### 4. Deploy Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select your `bot-discount` repository
4. Configure the service:

   **Basic Settings:**
   - **Name**: `mystery-box-bot`
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main` (or your default branch)
   - **Plan**: `Free`

   **Build & Deploy:**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Auto-Deploy**: `Yes`

5. Click **"Create Web Service"**

### 5. Configure Environment Variables

1. Go to your web service dashboard
2. Click **"Environment"** tab
3. Add these variables:

   ```
   BOT_TOKEN=your_telegram_bot_token_here
   DATABASE_URL=your_postgres_connection_string_from_step_3
   ADMIN_PHONE=+1234567890
   NODE_ENV=production
   ```

4. Click **"Save Changes"**

### 6. Wait for Deployment

1. Render will automatically start building and deploying
2. Watch the logs for any errors
3. Deployment takes 2-3 minutes
4. Your app URL will be: `https://your-app-name.onrender.com`

### 7. Set Telegram Webhook

After successful deployment, set the webhook:

```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
     -H "Content-Type: application/json" \
     -d '{"url": "https://your-app-name.onrender.com/webhook"}'
```

Replace:
- `<YOUR_BOT_TOKEN>` with your actual bot token
- `your-app-name` with your actual Render app name

### 8. Test Your Bot

1. Open Telegram
2. Find your bot
3. Send `/start`
4. Test both business and customer flows

## 🔧 Troubleshooting

### Common Issues

**1. Build Fails**
```
Error: Cannot find module 'telegraf'
```
**Solution**: Make sure `package.json` has all dependencies listed.

**2. Database Connection Fails**
```
Error: connect ECONNREFUSED
```
**Solution**: 
- Check `DATABASE_URL` is correct
- Ensure database is created and running
- Wait 1-2 minutes after database creation

**3. Webhook Not Working**
```
Error: 404 Not Found
```
**Solution**:
- Check your app URL is correct
- Ensure webhook is set to `/webhook` endpoint
- Verify bot token is correct

**4. Bot Not Responding**
```
Bot doesn't reply to messages
```
**Solution**:
- Check Render logs for errors
- Verify webhook is set correctly
- Test webhook URL in browser

### Checking Logs

1. Go to your web service in Render
2. Click **"Logs"** tab
3. Look for:
   - ✅ "Database connection successful"
   - ✅ "Bot webhook set to: ..."
   - ✅ "Webhook server started on port ..."

### Manual Database Setup

If automatic setup fails:

1. Go to your PostgreSQL database in Render
2. Click **"Connect"** → **"External Database"**
3. Use a PostgreSQL client to connect
4. Run the schema manually:
   ```sql
   -- Copy and paste the contents of src/database/schema.sql
   ```

## 📊 Monitoring

### Render Dashboard Features

- **Logs**: Real-time application logs
- **Metrics**: CPU, memory, request count
- **Events**: Deployments, restarts, errors
- **Health**: Service status and uptime

### Health Check

Your bot includes a health check endpoint:
```
https://your-app-name.onrender.com/health
```

## 🔄 Updates and Maintenance

### Automatic Deployments

- Every push to your main branch triggers a new deployment
- Render automatically builds and deploys changes
- No manual intervention needed

### Manual Deployments

1. Go to your web service
2. Click **"Manual Deploy"**
3. Choose branch and commit
4. Click **"Deploy Latest Commit"**

### Environment Variable Updates

1. Go to **"Environment"** tab
2. Edit variables as needed
3. Click **"Save Changes"**
4. Service will restart automatically

## 💰 Costs

### Free Tier Limits

- **Web Service**: 750 hours/month
- **PostgreSQL**: 90 days free trial
- **Bandwidth**: 100GB/month
- **Build Time**: 500 minutes/month

### Paid Plans

- **Web Service**: $7/month
- **PostgreSQL**: $7/month
- **Unlimited**: No time restrictions

## 🆘 Support

### Render Support

- **Documentation**: [docs.render.com](https://docs.render.com)
- **Community**: [community.render.com](https://community.render.com)
- **Status**: [status.render.com](https://status.render.com)

### Bot Issues

- Check Render logs first
- Verify environment variables
- Test database connection
- Check webhook configuration

## ✅ Deployment Checklist

- [ ] Repository pushed to GitHub
- [ ] Render account created
- [ ] PostgreSQL database created
- [ ] Web service deployed
- [ ] Environment variables configured
- [ ] Database schema created
- [ ] Webhook set in Telegram
- [ ] Bot responds to `/start`
- [ ] Business registration works
- [ ] Customer flow works
- [ ] Admin panel accessible

## 🎉 Success!

Once all checklist items are complete, your Mystery Box Bot is live and ready to serve customers and businesses! 