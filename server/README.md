# 🚀 M-Pesa Payment Server

Express.js backend for M-Pesa Daraja API integration.

---

## 📦 Installation

```bash
npm install
```

---

## ⚙️ Configuration

1. Copy environment template:

```bash
cp env.example .env
```

2. Edit `.env` with your Daraja credentials:

```env
MPESA_CONSUMER_KEY=your_key_here
MPESA_CONSUMER_SECRET=your_secret_here
MPESA_PASSKEY=your_passkey_here
MPESA_SHORTCODE=174379
MPESA_ENVIRONMENT=sandbox
PORT=5000
FRONTEND_URL=
https://www.mercylangat.com
MPESA_CALLBACK_URL=http://localhost:5000/api/mpesa/callback
```

---

## 🏃 Running the Server

### Development (with auto-reload):

```bash
npm run dev
```

### Production:

```bash
npm start
```

Server will run on: `http://localhost:5000`

---

## 🔌 API Endpoints

### Health Check

```
GET /health
```

Response:

```json
{
  "status": "OK",
  "message": "M-Pesa Payment Server Running"
}
```

### Initiate STK Push

```
POST /api/mpesa/stkpush
Content-Type: application/json
```

Body:

```json
{
  "phoneNumber": "254708374149",
  "amount": 1000,
  "bookTitle": "The Whispering Woods",
  "orderId": "ORD-1234567890"
}
```

Response:

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

### M-Pesa Callback (Automatic)

```
POST /api/mpesa/callback
```

This endpoint is called by Safaricom automatically when payment is processed.

### Check Transaction Status

```
GET /api/mpesa/transaction/:checkoutRequestId
```

Response:

```json
{
  "success": true,
  "data": {
    "orderId": "ORD-xxx",
    "bookTitle": "Book Name",
    "amount": 1000,
    "phoneNumber": "254708374149",
    "status": "completed",
    "mpesaReceiptNumber": "PGH7X2Z3",
    "transactionDate": "20231110143000",
    "timestamp": "2023-11-10T14:30:00.000Z"
  }
}
```

### Query STK Status

```
POST /api/mpesa/query
Content-Type: application/json
```

Body:

```json
{
  "checkoutRequestId": "ws_CO_xxx"
}
```

---

## 🧪 Testing

### Test Phone Numbers (Sandbox):

- **Success**: 254708374149
- **Insufficient Funds**: 254700000000

### Testing Flow:

1. Start server:

```bash
npm run dev
```

2. Test health endpoint:

```bash
curl http://localhost:5000/health
```

3. Test STK Push:

```bash
curl -X POST http://localhost:5000/api/mpesa/stkpush \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "254708374149",
    "amount": 100,
    "bookTitle": "Test Book",
    "orderId": "TEST-123"
  }'
```

---

## 📁 Project Structure

```
server/
├── server.js                 # Main Express app
├── controllers/
│   └── mpesaController.js   # Payment logic
├── routes/
│   └── mpesa.js             # API routes
├── utils/
│   └── mpesaHelpers.js      # Helper functions
├── package.json             # Dependencies
├── env.example              # Environment template
└── README.md               # This file
```

---

## 🔐 Security

- Never commit `.env` file
- Use different credentials for dev/prod
- Keep access tokens secure
- Validate all inputs
- Use HTTPS in production

---

## 🚀 Deployment

### Railway:

```bash
railway login
railway up
```

### Render:

1. Connect GitHub repository
2. Add environment variables
3. Deploy

### Environment Variables (Production):

```env
MPESA_CONSUMER_KEY=prod_key
MPESA_CONSUMER_SECRET=prod_secret
MPESA_PASSKEY=prod_passkey
MPESA_SHORTCODE=your_actual_shortcode
MPESA_ENVIRONMENT=production
MPESA_CALLBACK_URL=https://your-domain.com/api/mpesa/callback
FRONTEND_URL=https://your-frontend-domain.com
NODE_ENV=production
```

---

## 🐛 Troubleshooting

### "Invalid Access Token"

- Check Consumer Key and Secret
- Verify correct environment (sandbox/production)

### "Callback not received"

- Use ngrok for local testing
- Verify callback URL is accessible
- Check firewall settings

### "Invalid Phone Number"

- Format: 254XXXXXXXXX
- No spaces or special characters

### "Timeout"

- Check internet connection
- Verify Safaricom API is up
- Check ngrok is running (local)

---

## 📚 Documentation

- [Full Setup Guide](../MPESA_SETUP_GUIDE.md)
- [Quick Start](../MPESA_QUICK_START.md)
- [Implementation Summary](../MPESA_IMPLEMENTATION_SUMMARY.md)

---

## 💡 Tips

1. **Local Testing**: Use ngrok for callback URL
2. **Logging**: Monitor console for transaction logs
3. **Database**: Consider adding MongoDB/PostgreSQL for production
4. **Rate Limiting**: Add rate limiting for production
5. **Monitoring**: Set up error tracking (Sentry, etc.)

---

## 📞 Support

- Safaricom Support: apisupport@safaricom.co.ke
- Daraja Portal: https://developer.safaricom.co.ke/
- Documentation: https://developer.safaricom.co.ke/Documentation

---

**Version**: 1.0.0
**License**: MIT
**Author**: Developed for Mercy Langat Books


