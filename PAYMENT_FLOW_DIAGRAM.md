# 📱 M-Pesa Payment Flow Diagram

## Visual Payment Process

```
┌─────────────────────────────────────────────────────────────────┐
│                    CUSTOMER JOURNEY                              │
└─────────────────────────────────────────────────────────────────┘

1. Browse Books
   ↓
   [Customer sees books on homepage]
   ↓
2. Select Book
   ↓
   [Clicks "Order Now" button]
   ↓
3. Order Summary Page
   ↓
   [Sees book details, price, delivery fee]
   ↓
4. Enter Details
   ↓
   ┌──────────────────┐
   │ Name:           │
   │ Email:          │
   │ Phone: 0712... │
   └──────────────────┘
   ↓
5. Click "Pay with M-Pesa"
   ↓
   [Frontend → Backend API]
   ↓
6. STK Push Initiated
   ↓
   📱 [Phone vibrates/notification]
   ↓
7. Enter M-Pesa PIN on Phone
   ↓
   [M-Pesa → Safaricom → Backend]
   ↓
8. Payment Confirmed ✅
   ↓
9. Redirect to WhatsApp
   ↓
   💬 [Chat with Mercy about delivery]


┌─────────────────────────────────────────────────────────────────┐
│                    TECHNICAL FLOW                                │
└─────────────────────────────────────────────────────────────────┘

Frontend (React)
    ↓
    POST /api/mpesa/stkpush
    {
      phoneNumber: "254712345678",
      amount: 1000,
      bookTitle: "Book Name"
    }
    ↓
Backend (Express)
    ↓
    Generate OAuth Token
    ↓
    POST to Safaricom
    https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest
    ↓
Safaricom M-Pesa
    ↓
    Sends STK Push to Customer Phone
    ↓
Customer Phone
    📱 "Lipa Na M-Pesa"
    Enter PIN: ****
    ↓
M-Pesa Processes Payment
    ↓
    POST /api/mpesa/callback
    {
      ResultCode: 0,
      ResultDesc: "Success",
      MpesaReceiptNumber: "xxx"
    }
    ↓
Backend Updates Status
    ↓
Frontend Polls Status (every 3s)
    GET /api/mpesa/transaction/:id
    ↓
Shows Success Message ✅
    ↓
Redirects to WhatsApp


┌─────────────────────────────────────────────────────────────────┐
│                    SYSTEM ARCHITECTURE                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────┐
│   Customer      │
│   Browser       │
└────────┬────────┘
         │
         │ HTTPS
         │
         ↓
┌─────────────────┐
│   React App     │
│  (Frontend)     │
│  Port: 5173     │
└────────┬────────┘
         │
         │ REST API
         │
         ↓
┌─────────────────┐
│  Express API    │
│   (Backend)     │
│   Port: 5000    │
└────────┬────────┘
         │
         │ HTTPS
         │
         ↓
┌─────────────────┐
│  Safaricom      │
│  Daraja API     │
│  (M-Pesa)       │
└────────┬────────┘
         │
         │ STK Push
         │
         ↓
┌─────────────────┐
│  Customer       │
│  Phone (M-Pesa) │
└─────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                    DATA FLOW                                     │
└─────────────────────────────────────────────────────────────────┘

Customer Data:
┌──────────────────────┐
│ name: "John Doe"     │
│ email: "john@x.com"  │
│ phone: "0712345678"  │
└──────────────────────┘
         ↓
Transaction Created:
┌─────────────────────────────────┐
│ orderId: "ORD-1699999999"       │
│ bookTitle: "Book Name"          │
│ amount: 1000                    │
│ phoneNumber: "254712345678"     │
│ status: "pending"               │
│ timestamp: "2023-11-10..."      │
└─────────────────────────────────┘
         ↓
M-Pesa Response:
┌─────────────────────────────────┐
│ checkoutRequestId: "ws_CO_xxx"  │
│ merchantRequestId: "12345-xxx"  │
│ responseCode: "0"               │
│ responseDesc: "Success"         │
└─────────────────────────────────┘
         ↓
Callback Received:
┌─────────────────────────────────┐
│ ResultCode: 0                   │
│ MpesaReceiptNumber: "PGH7X..."  │
│ TransactionDate: "20231110..."  │
│ Amount: 1000                    │
└─────────────────────────────────┘
         ↓
Final Transaction:
┌─────────────────────────────────┐
│ status: "completed" ✅          │
│ mpesaReceiptNumber: "PGH7X..."  │
│ transactionDate: "2023-11..."   │
└─────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                    TIMING DIAGRAM                                │
└─────────────────────────────────────────────────────────────────┘

t=0s    Customer clicks "Pay with M-Pesa"
        ↓
t=1s    Frontend sends request to backend
        ↓
t=2s    Backend requests OAuth token from Safaricom
        ↓
t=3s    Backend sends STK Push request
        ↓
t=4s    Safaricom sends prompt to customer phone
        ↓
t=5s    Customer receives notification 📱
        ↓
t=10s   Customer opens M-Pesa
        ↓
t=15s   Customer enters PIN
        ↓
t=18s   M-Pesa processes payment
        ↓
t=20s   Safaricom sends callback to backend
        ↓
t=21s   Backend updates transaction status
        ↓
t=22s   Frontend polls and gets "completed" status
        ↓
t=23s   Success message shown ✅
        ↓
t=25s   Redirect to WhatsApp


┌─────────────────────────────────────────────────────────────────┐
│                    ERROR HANDLING                                │
└─────────────────────────────────────────────────────────────────┘

Possible Failures:

1. Invalid Phone Number
   ↓
   [Validation fails]
   ↓
   Error: "Please enter a valid Kenyan phone number"

2. Insufficient Funds
   ↓
   [M-Pesa returns ResultCode: 1]
   ↓
   Error: "Insufficient balance"

3. Customer Cancels
   ↓
   [Customer closes M-Pesa prompt]
   ↓
   Error: "Payment cancelled"

4. Network Timeout
   ↓
   [No callback received in 2 minutes]
   ↓
   Error: "Payment timeout. Please try again"

5. API Error
   ↓
   [Safaricom API returns error]
   ↓
   Error: "Service unavailable. Please try again"


┌─────────────────────────────────────────────────────────────────┐
│                    SUCCESS FLOW                                  │
└─────────────────────────────────────────────────────────────────┘

Payment Successful! ✅
    ↓
Transaction Saved
    ↓
Receipt Generated
    MpesaReceiptNumber: PGH7X2Z3
    ↓
Customer Details Sent to WhatsApp:
    ┌────────────────────────────────┐
    │ Hi! I just paid for:           │
    │ "Book Title"                   │
    │                                │
    │ Customer Details:              │
    │ - Name: John Doe               │
    │ - Email: john@example.com      │
    │ - Phone: 0712345678            │
    │                                │
    │ Please send delivery details.  │
    └────────────────────────────────┘
    ↓
Mercy receives message on WhatsApp
    ↓
Customer and Mercy discuss delivery
    ↓
Book delivered! 📚


┌─────────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                               │
└─────────────────────────────────────────────────────────────────┘

1. Frontend Security
   ├─ HTTPS only
   ├─ Input validation
   ├─ No sensitive data storage
   └─ Environment variables

2. Backend Security
   ├─ CORS restrictions
   ├─ Rate limiting
   ├─ Input sanitization
   ├─ Environment variables
   └─ Secure callbacks

3. M-Pesa Security
   ├─ OAuth 2.0
   ├─ Encrypted communication
   ├─ PIN verification
   ├─ Transaction limits
   └─ Fraud detection


┌─────────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT FLOW                               │
└─────────────────────────────────────────────────────────────────┘

Development:
├─ Local testing (localhost)
├─ Ngrok for callbacks
├─ Sandbox credentials
└─ Test phone numbers

Staging:
├─ Deploy backend (Railway/Render)
├─ Deploy frontend (Vercel/Netlify)
├─ Still using sandbox
└─ Test with real flow

Production:
├─ Production Daraja credentials
├─ Real Till/Paybill number
├─ Live callback URLs
├─ Real customer payments
└─ Monitor & maintain


┌─────────────────────────────────────────────────────────────────┐
│                    MONITORING                                    │
└─────────────────────────────────────────────────────────────────┘

Things to Monitor:
├─ Success rate (target: >95%)
├─ Average payment time
├─ Error rates
├─ Failed transactions
├─ Callback delays
└─ Customer drop-off points

Logs to Keep:
├─ All transaction IDs
├─ Payment amounts
├─ Customer phone numbers
├─ Success/failure reasons
├─ Timestamp of each step
└─ M-Pesa receipt numbers


┌─────────────────────────────────────────────────────────────────┐
│                    KEY METRICS                                   │
└─────────────────────────────────────────────────────────────────┘

Expected Performance:
├─ Payment initiation: < 3 seconds
├─ STK Push delivery: < 2 seconds
├─ Total payment time: 20-30 seconds
├─ Success rate: 95%+
└─ Customer satisfaction: High

Business Impact:
├─ Higher conversion (2-3x)
├─ Lower abandonment
├─ Faster checkout
├─ Better customer experience
└─ More completed sales


═══════════════════════════════════════════════════════════════════

This visual guide shows the complete M-Pesa payment integration flow
from customer selection to successful payment and delivery coordination.

═══════════════════════════════════════════════════════════════════



