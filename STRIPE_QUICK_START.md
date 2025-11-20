# 🚀 Stripe Integration - Quick Start

Get up and running with Stripe payments in 10 minutes!

---

## What's New? 🎉

Your website now supports **two payment methods**:

1. **M-Pesa** 📱 - For customers in Kenya
2. **Stripe** 💳 - For international customers (credit/debit cards)

Customers choose based on their country, and payment flows seamlessly!

---

## Quick Setup (5 Steps)

### 1. Create Stripe Account (5 min)

1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Sign up with your email
3. Complete verification (add business info)

### 2. Get Your API Keys (1 min)

1. Dashboard → Developers → API keys
2. Copy both keys:
   - **Publishable key**: `pk_test_...`
   - **Secret key**: `sk_test_...`

### 3. Update Backend Environment Variables (1 min)

On **Render Dashboard** (where your backend is hosted):

1. Go to your service → Environment
2. Add these variables:
   ```
   STRIPE_PUBLISHABLE_KEY = pk_test_your_key_here
   STRIPE_SECRET_KEY = sk_test_your_secret_key_here
   ```
3. Save and redeploy

### 4. Test It Out! (2 min)

1. Visit your website
2. Click "Order Now" on any book
3. Select "United States" or another country (not Kenya)
4. Choose "Credit/Debit Card" payment method
5. Use test card: `4242 4242 4242 4242`
6. Expiry: `12/25`, CVC: `123`
7. Complete payment!

### 5. Verify Success (1 min)

- Check Stripe Dashboard → Payments
- You should see the test payment
- After payment, customer redirects to WhatsApp

---

## Test Card Numbers 💳

### Success
```
Card: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
```

### Declined
```
Card: 4000 0000 0000 0002
```

### Requires 3D Secure
```
Card: 4000 0025 0000 3155
```

[More test cards](https://stripe.com/docs/testing)

---

## How It Works 🔄

```
Customer clicks "Order Now"
    ↓
Enters details & selects country
    ↓
    ┌──────────┬──────────┐
    Kenya      Other
    ↓          ↓
    M-Pesa     Stripe
    ↓          ↓
    └──────────┴──────────┘
            ↓
    Payment Success
            ↓
    WhatsApp Redirect
```

---

## Going Live 🌟

When ready for real payments:

### 1. Complete Stripe Verification
- Dashboard → Complete account setup
- Add bank details for payouts

### 2. Get Live Keys
- Dashboard → Toggle to "Live mode"
- Copy live keys:
  - `pk_live_...`
  - `sk_live_...`

### 3. Update Production
- Render Dashboard → Environment
- Replace test keys with live keys
- Redeploy

### 4. Test with Real Card
- Use your own card
- Start with small amount
- Verify payment in dashboard

---

## Important Notes ⚠️

1. **Never share secret key** (`sk_*`)
2. **Use HTTPS** in production (already done on Render)
3. **Test thoroughly** before going live
4. **Monitor payments** in Stripe Dashboard
5. **Respond to WhatsApp** messages from customers

---

## Pricing 💰

### Stripe Fees
- **2.9% + $0.30** per successful card charge (US)
- No setup fees
- No monthly fees

### M-Pesa Fees
- As per your Paybill configuration
- Typically lower for Kenyan customers

### Currency
- **Kenya**: KES (M-Pesa)
- **International**: USD (Stripe)
- Conversion: ~KES 150 = $1 (update in code as needed)

---

## Support 🆘

### Quick Fixes

**Problem**: "Stripe not loading"
- **Fix**: Check backend env variables are set

**Problem**: "Payment failed"
- **Fix**: Use correct test cards in test mode

**Problem**: "Can't see payments"
- **Fix**: Check correct Stripe mode (test/live)

### Get Help

- **Stripe Docs**: [stripe.com/docs](https://stripe.com/docs)
- **Full Guide**: See `STRIPE_SETUP_GUIDE.md`
- **Developer**: shadrack.bett.92@gmail.com

---

## What Customers See 👥

### Kenyan Customer
1. Selects Kenya as country
2. Sees M-Pesa option
3. Enters phone number
4. Pays via M-Pesa STK Push

### International Customer
1. Selects their country
2. Sees card payment option
3. Enters card details
4. Pays with Stripe

**Both** redirect to WhatsApp after successful payment!

---

## Next Steps ✅

- [ ] Create Stripe account
- [ ] Add API keys to Render
- [ ] Test with test cards
- [ ] Complete verification
- [ ] Switch to live mode
- [ ] Test with real card
- [ ] Start accepting payments!

---

## Features Included ✨

- ✅ Dual payment system (M-Pesa + Stripe)
- ✅ Country-based payment selection
- ✅ Secure card processing
- ✅ Real-time payment status
- ✅ WhatsApp integration
- ✅ Mobile responsive
- ✅ Test mode for development
- ✅ Error handling
- ✅ Payment confirmation

---

**Ready to accept global payments? 🌍💳**

Start with Step 1 above and you'll be live in 10 minutes!

Questions? Check `STRIPE_SETUP_GUIDE.md` for detailed instructions.

