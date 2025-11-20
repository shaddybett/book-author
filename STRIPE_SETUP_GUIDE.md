# 🎯 Stripe Payment Integration - Complete Setup Guide

## Overview

This guide covers the complete integration of Stripe payment processing for international customers alongside M-Pesa for Kenyan customers. Customers can choose their preferred payment method based on their location.

---

## 📋 Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Stripe Account Setup](#stripe-account-setup)
4. [Backend Configuration](#backend-configuration)
5. [Frontend Configuration](#frontend-configuration)
6. [Testing](#testing)
7. [Going to Production](#going-to-production)
8. [Troubleshooting](#troubleshooting)

---

## ✨ Features

- **Dual Payment System**: M-Pesa for Kenya, Stripe for international customers
- **Country Detection**: Automatic payment method recommendation based on country
- **Secure Card Payments**: PCI DSS compliant card processing
- **Multiple Payment Methods**: Credit cards, debit cards, Apple Pay, Google Pay
- **Real-time Payment Status**: Instant feedback on payment success/failure
- **WhatsApp Integration**: Automatic redirect to WhatsApp after successful payment
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Currency Support**: KES for M-Pesa, USD for Stripe

---

## 📦 Prerequisites

### Already Installed
- Node.js and npm
- React application
- Express.js server
- M-Pesa integration (already set up)

### New Dependencies (Already Installed)
```bash
# Frontend
npm install @stripe/stripe-js @stripe/react-stripe-js

# Backend
cd server
npm install stripe
```

---

## 🔑 Stripe Account Setup

### Step 1: Create a Stripe Account

1. **Go to Stripe Dashboard**
   - Visit [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
   - Sign up with your email

2. **Activate Your Account**
   - Complete the account verification process
   - Provide business information
   - Add bank account details (for payouts)

### Step 2: Get API Keys

1. **Navigate to API Keys**
   - Dashboard → Developers → API keys
   - You'll see two types of keys:
     - **Test keys** (for development)
     - **Live keys** (for production)

2. **Copy Your Keys**
   ```
   Test Mode:
   - Publishable key: pk_test_...
   - Secret key: sk_test_...
   
   Live Mode:
   - Publishable key: pk_live_...
   - Secret key: sk_live_...
   ```

### Step 3: Configure Webhooks (Optional for Production)

1. **Create Webhook Endpoint**
   - Dashboard → Developers → Webhooks
   - Click "Add endpoint"
   - URL: `https://your-domain.com/api/stripe/webhook`
   - Events to listen for:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `payment_intent.canceled`

2. **Copy Webhook Secret**
   - After creating, you'll see: `whsec_...`
   - Save this for your environment variables

---

## ⚙️ Backend Configuration

### Step 1: Update Environment Variables

Edit `server/.env`:

```env
# Existing M-Pesa variables...
MPESA_CONSUMER_KEY=your_mpesa_key
MPESA_CONSUMER_SECRET=your_mpesa_secret
# ... other M-Pesa vars

# Add Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### Step 2: Verify Backend Files

Your server now includes:

1. **`server/controllers/stripeController.js`**
   - Creates payment intents
   - Handles webhooks
   - Manages payment status

2. **`server/routes/stripe.js`**
   - API routes for Stripe operations

3. **`server/server.js`**
   - Updated with Stripe routes

### Step 3: Test Backend

```bash
cd server
npm start
```

Test the health endpoint:
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Payment Server Running (M-Pesa + Stripe)"
}
```

---

## 🎨 Frontend Configuration

### Step 1: Update Environment Variables

Create/update `paza/.env`:

```env
VITE_API_URL=http://localhost:5000
```

For production:
```env
VITE_API_URL=https://your-backend-domain.com
```

### Step 2: Verify Frontend Components

Your frontend now includes:

1. **`src/pages/OrderSummary.jsx`**
   - Unified payment page
   - Country selection
   - Payment method selector
   - Customer details form

2. **`src/components/payments/MpesaPayment.jsx`**
   - M-Pesa STK Push integration
   - Payment status tracking

3. **`src/components/payments/StripePayment.jsx`**
   - Stripe Elements integration
   - Card payment form
   - Payment processing

4. **`src/components/Books.jsx`**
   - Updated to redirect to OrderSummary
   - "Order Now" button

### Step 3: Test Frontend

```bash
cd paza
npm run dev
```

Visit `http://localhost:5173` and test the order flow.

---

## 🧪 Testing

### Test Mode (Development)

Use Stripe's test card numbers:

#### Successful Payment
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

#### Payment Declined
```
Card Number: 4000 0000 0000 0002
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

#### Requires Authentication (3D Secure)
```
Card Number: 4000 0025 0000 3155
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

### Testing Workflow

1. **Select a Book**
   - Click "Order Now" on any book

2. **Enter Customer Details**
   - Choose country (select non-Kenya for Stripe)
   - Fill in name, email
   - Select "Credit/Debit Card" payment method

3. **Enter Card Details**
   - Use test card numbers above
   - Complete payment

4. **Verify Success**
   - Should see success message
   - Redirects to WhatsApp after 3 seconds

### M-Pesa Testing

For Kenyan customers:
- Select Kenya as country
- Enter M-Pesa phone number
- Use M-Pesa sandbox for testing

---

## 🚀 Going to Production

### Step 1: Activate Stripe Live Mode

1. **Complete Account Verification**
   - Dashboard → Complete account setup
   - Provide business details
   - Verify identity

2. **Switch to Live Keys**
   - Dashboard → Developers → API keys
   - Toggle to "Live mode"
   - Copy live keys

### Step 2: Update Production Environment Variables

**Backend (`server/.env` on Render)**:
```env
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret
```

**Frontend (`paza/.env.production`)**:
```env
VITE_API_URL=https://author-fwlz.onrender.com
```

### Step 3: Configure Production Webhooks

1. **Create Live Webhook**
   - Dashboard (Live mode) → Developers → Webhooks
   - Add endpoint: `https://author-fwlz.onrender.com/api/stripe/webhook`
   - Select events: `payment_intent.*`
   - Copy webhook secret

2. **Update Environment Variable**
   - Add `STRIPE_WEBHOOK_SECRET` to Render dashboard

### Step 4: Deploy

```bash
# Build frontend
cd paza
npm run build

# Deploy to Vercel/Netlify/Render
# Ensure environment variables are set

# Backend is already on Render
# Just update environment variables
```

### Step 5: Test Live Payments

**⚠️ WARNING**: Use real cards with small amounts first!

1. Use your own card for initial test
2. Test complete flow from book selection to WhatsApp
3. Verify payment appears in Stripe dashboard

---

## 💰 Currency and Pricing

### Current Setup

- **Kenya (M-Pesa)**: Prices in KES
- **International (Stripe)**: Prices in USD
- **Conversion**: ~KES 150 = $1 USD (hardcoded, update as needed)

### Updating Conversion Rate

Edit `src/pages/OrderSummary.jsx`:

```javascript
// Line ~59
const bookPriceUSD = (bookPriceKES / 150).toFixed(2); // Change 150 to current rate
```

### Adding More Currencies

To support EUR, GBP, etc., you'll need to:
1. Update frontend to detect currency
2. Modify Stripe payment intent creation
3. Add currency conversion logic

---

## 🔒 Security Considerations

### Best Practices

1. **Never Expose Secret Keys**
   - Keep `sk_*` keys server-side only
   - Never commit `.env` files to Git
   - Use environment variables on hosting platforms

2. **Use HTTPS**
   - Required for live Stripe payments
   - Already configured on Render

3. **Validate Webhooks**
   - Webhook signature verification implemented
   - Prevents webhook spoofing

4. **PCI Compliance**
   - Stripe handles card data (PCI DSS Level 1)
   - Never store card numbers

### Environment Variable Security

**Render Dashboard**:
- Environment → Add secret variables
- Never log secret keys
- Rotate keys if compromised

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "Stripe is not defined"
**Problem**: Frontend can't load Stripe

**Solution**:
```javascript
// Check that Stripe publishable key is returned from backend
console.log(await axios.get(`${API_URL}/api/stripe/config`));
```

#### 2. "Payment Intent Creation Failed"
**Problem**: Backend can't create payment intent

**Solutions**:
- Verify `STRIPE_SECRET_KEY` is set correctly
- Check backend logs for errors
- Ensure amount is at least $0.50 USD

#### 3. "Card Declined"
**Problem**: Payment fails

**Solutions**:
- Use test cards in test mode
- Check if live keys are used with test cards
- Verify sufficient funds (live mode)

#### 4. "Webhook Verification Failed"
**Problem**: Webhooks not working

**Solutions**:
- Verify `STRIPE_WEBHOOK_SECRET` is correct
- Check webhook endpoint is publicly accessible
- Ensure webhook signature validation is implemented

### Error Messages

| Error | Meaning | Solution |
|-------|---------|----------|
| `invalid_request_error` | Bad API request | Check API parameters |
| `card_declined` | Bank declined card | Use different card |
| `expired_card` | Card expired | Use valid card |
| `insufficient_funds` | Not enough money | Add funds or use different card |
| `processing_error` | Stripe processing issue | Retry or contact Stripe support |

### Debugging Tips

1. **Check Browser Console**
   ```javascript
   // Add to StripePayment.jsx for debugging
   console.log('Client Secret:', clientSecret);
   console.log('Stripe loaded:', !!stripe);
   ```

2. **Check Backend Logs**
   ```bash
   # On Render
   Dashboard → Logs → View recent logs
   ```

3. **Stripe Dashboard**
   - Dashboard → Payments → See all payment attempts
   - Dashboard → Logs → API request logs
   - Dashboard → Events → Webhook events

---

## 📊 Payment Flow Diagram

```
User selects book
     ↓
Order Summary Page
     ↓
Select Country
     ↓
    ┌─────────────────┐
    │                 │
    ↓                 ↓
Kenya           Other Country
    ↓                 ↓
M-Pesa           Stripe
Payment          Payment
    ↓                 ↓
    └────────┬────────┘
             ↓
    Payment Success
             ↓
    WhatsApp Redirect
             ↓
    Delivery Details
```

---

## 📱 WhatsApp Integration

Both payment methods redirect to WhatsApp after successful payment:

**WhatsApp Number**: +254 713 315 219 (Mercy Langat)

**Message Format**:
```
Hi! I just completed payment for "[Book Title]".

Customer Details:
- Name: [Customer Name]
- Email: [Customer Email]
- Phone/Amount: [Phone for M-Pesa / Amount for Stripe]

Please send me delivery details.
```

To change WhatsApp number, update:
- `src/components/payments/MpesaPayment.jsx` (line ~47)
- `src/components/payments/StripePayment.jsx` (line ~60)

---

## 📈 Monitoring and Analytics

### Stripe Dashboard

**Useful Views**:
1. **Payments**: All transactions
2. **Customers**: Customer list
3. **Balance**: Available and pending funds
4. **Reports**: Revenue, failed payments, etc.

### Key Metrics to Track

- **Conversion Rate**: Orders / Visitors
- **Payment Success Rate**: Successful / Total attempts
- **Average Order Value**: Total revenue / Orders
- **Top Countries**: Where customers are from
- **Failed Payments**: Reasons for failures

---

## 💡 Tips and Best Practices

### For Customers

1. **Kenyan Customers**
   - Select "Kenya" as country
   - Use M-Pesa for lower fees
   - Keep phone ready for PIN prompt

2. **International Customers**
   - Select your country
   - Use Stripe for secure card payments
   - Accepts all major credit/debit cards

### For You (Merchant)

1. **Monitor Payments Daily**
   - Check Stripe dashboard
   - Respond to WhatsApp messages promptly

2. **Handle Failed Payments**
   - Reach out to customers
   - Offer alternative payment methods

3. **Regular Backups**
   - Export transaction data monthly
   - Keep customer records secure

4. **Update Prices**
   - Adjust for currency fluctuations
   - Update conversion rate as needed

---

## 🆘 Support

### Stripe Support

- **Dashboard**: Help → Contact Support
- **Documentation**: [https://stripe.com/docs](https://stripe.com/docs)
- **Community**: [https://support.stripe.com](https://support.stripe.com)

### Developer Support

For issues with this integration:
- Check this documentation first
- Review error logs
- Test in sandbox mode
- Contact: shadrack.bett.92@gmail.com

---

## ✅ Checklist

### Before Going Live

- [ ] Stripe account fully verified
- [ ] Live API keys obtained
- [ ] Webhook configured (production)
- [ ] Environment variables updated (production)
- [ ] Test payment with real card (small amount)
- [ ] Verify WhatsApp redirect works
- [ ] Check payment appears in Stripe dashboard
- [ ] Update conversion rate (KES to USD)
- [ ] Monitor first 10 transactions closely

### Regular Maintenance

- [ ] Check failed payments weekly
- [ ] Export transaction data monthly
- [ ] Update currency conversion rate quarterly
- [ ] Review Stripe dashboard for anomalies
- [ ] Respond to customer WhatsApp messages within 24h

---

## 📚 Additional Resources

### Documentation
- [Stripe API Docs](https://stripe.com/docs/api)
- [Stripe React Elements](https://stripe.com/docs/stripe-js/react)
- [Payment Intents API](https://stripe.com/docs/payments/payment-intents)

### Testing
- [Test Card Numbers](https://stripe.com/docs/testing)
- [Test Mode Guide](https://stripe.com/docs/test-mode)

### Security
- [PCI Compliance](https://stripe.com/docs/security/guide)
- [Best Practices](https://stripe.com/docs/security/best-practices)

---

## 🎉 Conclusion

You now have a fully functional dual payment system:
- **M-Pesa** for Kenyan customers
- **Stripe** for international customers

Customers can choose based on their location, ensuring maximum convenience and payment success rate.

**Next Steps**:
1. Complete Stripe account verification
2. Test with small real payments
3. Update to live keys
4. Monitor and optimize

---

**Happy Selling! 📚💳**

*Last Updated: November 20, 2025*

