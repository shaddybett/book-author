# 📱 M-Pesa Daraja API Integration Guide

Complete step-by-step guide to set up M-Pesa payments for Mercy Langat's book website.

---

## 🎯 Overview

This integration allows customers to pay for books using M-Pesa (Kenya's mobile money service) through Safaricom's Daraja API. The payment flow uses STK Push (Lipa Na M-Pesa Online).

### Payment Flow:
1. Customer selects a book
2. Enters their details (name, email, phone)
3. Initiates M-Pesa payment
4. Receives STK Push prompt on their phone
5. Enters M-Pesa PIN
6. Payment confirmed
7. Redirected to WhatsApp for delivery details

---

## 📋 Prerequisites

Before starting, you need:
- ✅ Node.js installed (v16 or higher)
- ✅ Safaricom Daraja API account
- ✅ M-Pesa Paybill/Till Number
- ✅ Basic understanding of API integration

---

## 🚀 Step 1: Create Safaricom Daraja Account

### 1.1 Register on Daraja Portal

1. Go to https://developer.safaricom.co.ke/
2. Click **"Sign Up"** or **"Get Started"**
3. Fill in your details:
   - Email address
   - Password
   - Phone number
   - Confirm you're not a robot
4. Verify your email
5. Log in to your account

### 1.2 Create an App

1. Once logged in, go to **"My Apps"**
2. Click **"Create New App"**
3. Fill in app details:
   - **App Name**: `Mercy Langat Books` (or your preferred name)
   - **Description**: `M-Pesa payment integration for book purchases`
4. Select the following APIs:
   - ✅ **Lipa Na M-Pesa Online** (STK Push)
   - ✅ **Lipa Na M-Pesa Online Query** (Check payment status)
5. Click **"Create App"**

### 1.3 Get Your Credentials

After creating the app, you'll see:

**For SANDBOX (Testing)**:
- Consumer Key: `xxxxxxxxxxxxxxxxxxxxxxx`
- Consumer Secret: `xxxxxxxxxxxxxxxxxxxxxxx`
- Passkey: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- Test Shortcode: `174379`

**For PRODUCTION (Live)**:
- You'll need to apply for production credentials
- Follow Safaricom's Go-Live process
- Get your actual Till/Paybill number

---

## 🔧 Step 2: Install Backend Dependencies

Navigate to the server directory and install packages:

```bash
cd server
npm install
```

This installs:
- `express` - Web framework
- `axios` - HTTP client for API calls
- `cors` - Enable cross-origin requests
- `dotenv` - Environment variables management
- `body-parser` - Parse request bodies

---

## ⚙️ Step 3: Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cd server
cp env.example .env
```

Edit `.env` file with your actual credentials:

```env
# M-Pesa Daraja API Credentials
# SANDBOX CREDENTIALS (for testing)
MPESA_CONSUMER_KEY=your_consumer_key_here
MPESA_CONSUMER_SECRET=your_consumer_secret_here
MPESA_PASSKEY=your_passkey_here

# Business Details
MPESA_SHORTCODE=174379
MPESA_BUSINESS_NAME="Mercy Langat Books"

# Callback URLs
MPESA_CALLBACK_URL=https://your-domain.com/api/mpesa/callback
MPESA_RESULT_URL=https://your-domain.com/api/mpesa/result

# Environment (sandbox or production)
MPESA_ENVIRONMENT=sandbox

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Important Notes:

**Callback URLs**:
- For local testing, use ngrok or a similar tunnel service
- For production, use your actual domain
- Must be HTTPS in production

**Passkey**:
- Sandbox passkey is usually provided by Safaricom
- Production passkey: Contact Safaricom support

---

## 🏃 Step 4: Start the Backend Server

### Development Mode:

```bash
cd server
npm run dev
```

You should see:
```
🚀 M-Pesa Payment Server running on port 5000
📱 Environment: sandbox
```

### Production Mode:

```bash
cd server
npm start
```

---

## 🎨 Step 5: Configure Frontend

### 5.1 Install Frontend Dependencies

```bash
cd .. # Back to project root
npm install
```

Additional packages needed:
```bash
npm install react-router-dom axios
```

### 5.2 Create Frontend Environment File

Create `.env` in the project root:

```env
VITE_API_URL=http://localhost:5000
```

For production:
```env
VITE_API_URL=https://your-api-domain.com
```

---

## 🧪 Step 6: Testing the Integration

### 6.1 Test Phone Numbers (Sandbox)

Safaricom provides test numbers for sandbox:

| Phone Number | Behavior |
|--------------|----------|
| 254708374149 | Success |
| 254700000000 | Failure |

### 6.2 Test Payment Flow

1. **Start both servers**:
   ```bash
   # Terminal 1 - Backend
   cd server && npm run dev

   # Terminal 2 - Frontend
   npm run dev
   ```

2. **Test the flow**:
   - Open browser: `http://localhost:5173`
   - Click on any book
   - Click "Order Now"
   - Fill in details (use test phone number)
   - Click "Pay with M-Pesa"
   - Check your terminal for logs

3. **Expected Response**:
   ```json
   {
     "success": true,
     "message": "STK Push initiated successfully",
     "data": {
       "checkoutRequestId": "ws_CO_xxx",
       "merchantRequestId": "xxx",
       "responseCode": "0",
       "responseDescription": "Success"
     }
   }
   ```

### 6.3 Debugging

Check server logs for:
```
M-Pesa Callback Received: {
  "Body": {
    "stkCallback": {
      "ResultCode": 0,
      "ResultDesc": "The service request is processed successfully.",
      ...
    }
  }
}
```

---

## 🌐 Step 7: Setup Ngrok for Local Testing

Since M-Pesa requires a public callback URL:

### 7.1 Install Ngrok

```bash
# Download from https://ngrok.com/download
# Or install via package manager:
brew install ngrok # macOS
choco install ngrok # Windows
snap install ngrok # Linux
```

### 7.2 Start Ngrok Tunnel

```bash
ngrok http 5000
```

You'll get a URL like: `https://abc123.ngrok.io`

### 7.3 Update Environment Variables

Update `.env` in server directory:

```env
MPESA_CALLBACK_URL=https://abc123.ngrok.io/api/mpesa/callback
MPESA_RESULT_URL=https://abc123.ngrok.io/api/mpesa/result
```

Restart your server after updating.

---

## 🚀 Step 8: Going to Production

### 8.1 Get Production Credentials

1. Complete Safaricom's Go-Live checklist:
   - Business registration documents
   - Till/Paybill number
   - Integration testing completion
   - Security compliance

2. Apply for production access on Daraja portal

3. Receive production credentials:
   - Production Consumer Key
   - Production Consumer Secret
   - Production Passkey
   - Your actual Shortcode

### 8.2 Update Production Environment

Update `.env` for production:

```env
# Production Credentials
MPESA_CONSUMER_KEY=your_production_key
MPESA_CONSUMER_SECRET=your_production_secret
MPESA_PASSKEY=your_production_passkey
MPESA_SHORTCODE=your_actual_shortcode

# Environment
MPESA_ENVIRONMENT=production

# Production URLs
MPESA_CALLBACK_URL=https://your-domain.com/api/mpesa/callback
FRONTEND_URL=https://your-domain.com

NODE_ENV=production
```

### 8.3 Deploy Backend

Deploy to services like:
- **Railway**: https://railway.app
- **Render**: https://render.com
- **Heroku**: https://heroku.com
- **DigitalOcean**: https://digitalocean.com

Example Railway deployment:
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### 8.4 Deploy Frontend

Deploy to:
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **GitHub Pages**
- **Firebase Hosting**

Update frontend `.env`:
```env
VITE_API_URL=https://your-backend-domain.com
```

---

## 🛡️ Step 9: Security Best Practices

### 9.1 Environment Variables

✅ **DO:**
- Keep `.env` files out of version control
- Use different credentials for dev/prod
- Rotate keys regularly
- Use secrets management (AWS Secrets Manager, etc.)

❌ **DON'T:**
- Commit `.env` files to Git
- Share credentials in plain text
- Use production keys in development

### 9.2 API Security

```javascript
// Add rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10 // 10 requests per window
});

app.use('/api/mpesa', limiter);
```

### 9.3 Input Validation

```javascript
// Validate phone numbers
const isValidPhone = (phone) => {
  return /^254[17]\d{8}$/.test(phone);
};
```

---

## 📊 Step 10: Monitoring & Logging

### 10.1 Add Logging

```javascript
// Use Winston or similar
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### 10.2 Database Integration

Store transactions in a database (MongoDB, PostgreSQL):

```javascript
// Example with MongoDB
const transactionSchema = new Schema({
  checkoutRequestId: String,
  orderId: String,
  bookTitle: String,
  amount: Number,
  phoneNumber: String,
  status: String,
  mpesaReceiptNumber: String,
  timestamp: Date
});
```

---

## 🐛 Troubleshooting

### Common Issues:

**1. "Invalid Access Token"**
```
Solution: Check your Consumer Key and Secret
Verify environment (sandbox vs production)
```

**2. "Request failed with status code 400"**
```
Solution: Check phone number format (254XXXXXXXXX)
Verify all required fields are present
Check amount is an integer
```

**3. "Timeout" or "No response"**
```
Solution: Check callback URL is accessible
Verify ngrok is running (for local testing)
Check firewall settings
```

**4. "Invalid Shortcode"**
```
Solution: Use correct shortcode for environment
Sandbox: 174379
Production: Your actual Till/Paybill
```

**5. "Passkey Error"**
```
Solution: Verify passkey is correct
Check no extra spaces or characters
Contact Safaricom if persists
```

### Debug Mode:

Enable verbose logging:

```javascript
// In mpesaController.js
console.log('Request Data:', JSON.stringify(stkPushData, null, 2));
console.log('Response:', JSON.stringify(response.data, null, 2));
```

---

## 📞 Support & Resources

### Official Documentation:
- Daraja API Docs: https://developer.safaricom.co.ke/Documentation
- API Reference: https://developer.safaricom.co.ke/APIs

### Safaricom Support:
- Email: apisupport@safaricom.co.ke
- Portal: https://developer.safaricom.co.ke/support

### Community:
- Stack Overflow: Tag `mpesa` or `daraja-api`
- GitHub: Search for M-Pesa integration examples

---

## ✅ Checklist

Use this checklist to ensure everything is set up:

### Backend Setup:
- [ ] Daraja account created
- [ ] App created on portal
- [ ] Credentials obtained
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file configured
- [ ] Server starts successfully
- [ ] Test endpoint works

### Frontend Setup:
- [ ] Dependencies installed
- [ ] React Router configured
- [ ] OrderSummary page created
- [ ] API URL configured
- [ ] Books component updated
- [ ] Test flow works

### Testing:
- [ ] Sandbox credentials work
- [ ] STK Push initiated successfully
- [ ] Callback received
- [ ] Payment status updates
- [ ] WhatsApp redirect works

### Production:
- [ ] Production credentials obtained
- [ ] Backend deployed
- [ ] Frontend deployed
- [ ] Environment variables set
- [ ] SSL certificate configured
- [ ] Callback URLs updated
- [ ] End-to-end test completed

---

## 🎉 You're Done!

You now have a fully functional M-Pesa payment integration! Customers can:

1. ✅ Select books
2. ✅ Pay via M-Pesa
3. ✅ Get instant confirmation
4. ✅ Connect on WhatsApp for delivery

For any issues or questions, refer to the troubleshooting section or contact Safaricom support.

---

**Last Updated**: November 2025
**Version**: 1.0.0
**Author**: Developed for Mercy Langat Books

