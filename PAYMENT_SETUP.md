# Payment Integration Setup Guide

This guide will help you configure the Paystack payment integration for book author portfolio.

## 🚀 Features Implemented

- ✅ Complete purchase flow with order summary page
- ✅ Customer information collection (name, email, phone)
- ✅ Paystack payment integration (Visa/MasterCard/M-Pesa)
- ✅ Fixed delivery fee (KES 250)
- ✅ Automatic WhatsApp redirect after successful payment
- ✅ Clean and modern UI matching the website design
- ✅ Mobile-responsive design
- ✅ Error handling and status messages

## 📋 Prerequisites

1. **Paystack Account**: Sign up at [https://paystack.com](https://paystack.com)
2. **WhatsApp Business Number**: Have a WhatsApp number ready for customer communication

## ⚙️ Configuration Steps

### Step 1: Get Your Paystack API Keys

1. Log in to your Paystack Dashboard
2. Navigate to **Settings** → **API Keys & Webhooks**
3. Copy your **Public Key** (starts with `pk_test_` for test mode or `pk_live_` for production)

### Step 2: Update Payment Configuration

Open `src/constants/index.js` and update the `PAYMENT_CONFIG` object:

```javascript
export const PAYMENT_CONFIG = {
  paystackPublicKey: "pk_test_your_actual_key_here", // Replace with your Paystack public key
  whatsappNumber: "254700123456", // Replace with your WhatsApp number (country code + number, no + or spaces)
  deliveryFee: 250, // Delivery fee in KES (you can change this)
  currency: "KES" // Currency code
};
```

**Important Notes:**
- For **WhatsApp number**: Use format like `254700123456` (Kenya) or your country code + number
- No spaces, no "+" symbol, just the digits
- Example: `254712345678` for Kenya, `2348012345678` for Nigeria, etc.

### Step 3: Test the Integration

#### Testing with Paystack Test Mode

Paystack provides test cards for testing:

**Test Card Details:**
- **Card Number**: `5060 6668 6666 6666 666` (for Nigeria/Ghana) or `4084 0840 8408 4081` (international)
- **CVV**: `123`
- **Expiry**: Any future date (e.g., `12/25`)
- **PIN**: `1234` (if required)
- **OTP**: `123456` (if required)

#### Testing Flow:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to your site (usually `http://localhost:5173`)

3. Click on any book's "Purchase Book" or "Order Now" button

4. You'll be redirected to the Order Summary page

5. Fill in customer details (you can use test data):
   - Name: Test User
   - Email: test@example.com
   - Phone: +254700000000

6. Click "Continue to Payment"

7. Click "Confirm Purchase" to open Paystack payment modal

8. Use the test card details above

9. After successful payment, you'll be redirected to WhatsApp with the order details

### Step 4: Going Live

When you're ready to go live:

1. **Switch to Live Mode in Paystack**:
   - Go to Paystack Dashboard
   - Toggle from "Test Mode" to "Live Mode"
   - Copy your **Live Public Key** (starts with `pk_live_`)

2. **Update the configuration** in `src/constants/index.js`:
   ```javascript
   paystackPublicKey: "pk_live_your_live_key_here"
   ```

3. **Build and deploy**:
   ```bash
   npm run build
   ```

## 🎨 Customization Options

### Changing the Delivery Fee

Edit `src/constants/index.js`:
```javascript
export const PAYMENT_CONFIG = {
  // ... other settings
  deliveryFee: 500, // Change to your preferred amount
};
```

### Changing the Currency

If you want to use a different currency (e.g., USD, NGN):

1. Update the configuration:
   ```javascript
   export const PAYMENT_CONFIG = {
     // ... other settings
     currency: "USD", // or "NGN", "GHS", etc.
   };
   ```

2. Update book prices in `src/constants/index.js` to match your currency

### Customizing the WhatsApp Message

Edit `src/pages/OrderSummary.jsx` around line 69-79 to customize the message sent to WhatsApp.

## 📱 User Flow

1. **User clicks "Purchase Book"** on any book
2. **Redirected to Order Summary** page showing:
   - Book details and cover
   - Price breakdown (book price + delivery fee)
   - Total amount
3. **User fills in their details**:
   - Full name
   - Email address
   - Phone number
4. **User clicks "Continue to Payment"**
5. **Paystack payment modal opens**:
   - Supports Cards (Visa/MasterCard)
   - Supports M-Pesa (Kenya)
   - Supports other payment methods based on country
6. **After successful payment**:
   - Success message is shown
   - User is automatically redirected to WhatsApp
   - Message includes customer details and payment reference
7. **Author receives WhatsApp message** and can follow up with delivery details

## 🔒 Security Notes

- Only the **public key** is used in the frontend (safe to expose)
- Never expose your **secret key** in frontend code
- All payment processing is handled securely by Paystack
- Customer card details never touch your servers

## 🐛 Troubleshooting

### Payment modal doesn't open
- Check that your Paystack public key is correct
- Ensure you're using the correct key for your environment (test vs live)
- Check browser console for errors

### WhatsApp redirect not working
- Verify your WhatsApp number format (no spaces, no +)
- Ensure you have WhatsApp installed or WhatsApp Web access
- Test the format: `https://wa.me/254700123456`

### Styling issues
- Clear browser cache
- Rebuild the project: `npm run build`
- Check that Tailwind CSS is properly configured

## 📞 Support

For Paystack-specific issues:
- Documentation: [https://paystack.com/docs](https://paystack.com/docs)
- Support: [support@paystack.com](mailto:support@paystack.com)

For integration issues:
- Check the browser console for errors
- Verify all configuration values
- Test with Paystack test cards first

## 🎉 You're All Set!

Your book purchase flow is now ready. Remember to:
1. ✅ Add your real Paystack public key
2. ✅ Add your WhatsApp number
3. ✅ Test thoroughly with test cards
4. ✅ Switch to live mode when ready

Happy selling! 📚



