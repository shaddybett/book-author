# 🚀 M-Pesa Integration - Quick Start

**Get up and running in 15 minutes!**

---

## 📦 What You Need

1. Safaricom Daraja account → https://developer.safaricom.co.ke/
2. Node.js installed
3. Your Consumer Key, Secret, and Passkey

---

## ⚡ Quick Setup (3 Steps)

### Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 2: Configure Credentials

Create `server/.env`:

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
MPESA_RESULT_URL=http://localhost:5000/api/mpesa/result
```

### Step 3: Start Servers

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd ..
npm run dev
```

---

## 🧪 Test It

1. Open
   https://www.mercylangat.com
2. Click any book → "Order Now"
3. Fill details:
   - Phone: `254708374149` (test number)
4. Click "Pay with M-Pesa"
5. Check terminal for success!

---

## 📁 Project Structure

```
paza/
├── server/                 # M-Pesa backend
│   ├── server.js          # Main server
│   ├── controllers/       # Payment logic
│   ├── routes/           # API endpoints
│   ├── utils/            # Helpers
│   └── .env              # Your credentials
├── src/
│   ├── pages/
│   │   └── OrderSummaryMpesa.jsx  # Payment page
│   └── components/
│       └── Books.jsx     # Updated for M-Pesa
```

---

## 🔑 API Endpoints

| Endpoint                     | Method | Purpose          |
| ---------------------------- | ------ | ---------------- |
| `/api/mpesa/stkpush`         | POST   | Initiate payment |
| `/api/mpesa/callback`        | POST   | M-Pesa callback  |
| `/api/mpesa/transaction/:id` | GET    | Check status     |

---

## 💡 Common Issues

**"Invalid Access Token"**
→ Check your Consumer Key & Secret

**"Timeout"**
→ Use ngrok for callback URL (see full guide)

**"Invalid Phone"**
→ Use format: 254XXXXXXXXX

---

## 📚 Full Documentation

See `MPESA_SETUP_GUIDE.md` for:

- Detailed setup instructions
- Production deployment
- Security best practices
- Troubleshooting guide

---

## 🎉 You're Ready!

Your M-Pesa integration is live! Customers can now pay with their phones.

**Next Steps:**

1. Test thoroughly in sandbox
2. Apply for production credentials
3. Deploy to production
4. Start selling books! 📚

---

**Need Help?** Check MPESA_SETUP_GUIDE.md or contact Safaricom support.
