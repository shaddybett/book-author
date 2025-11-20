import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Store payment intents temporarily (in production, use a database)
const paymentIntents = new Map();

/**
 * Create a Payment Intent for Stripe payment
 */
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, bookTitle, customerEmail, customerName } = req.body;

    // Validate required fields
    if (!amount || !bookTitle || !customerEmail) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: amount, bookTitle, or customerEmail'
      });
    }

    // Validate amount (minimum $0.50 USD)
    if (amount < 0.50) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be at least $0.50 USD'
      });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        bookTitle,
        customerEmail,
        customerName: customerName || 'Guest',
        orderId: `ORD-${Date.now()}`,
      },
      receipt_email: customerEmail,
      description: `Purchase of "${bookTitle}" by ${customerName || 'Guest'}`,
    });

    // Store payment intent data
    paymentIntents.set(paymentIntent.id, {
      id: paymentIntent.id,
      amount,
      bookTitle,
      customerEmail,
      customerName,
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    console.log('✅ Payment Intent created:', paymentIntent.id);

    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount,
        currency: 'usd',
      }
    });
  } catch (error) {
    console.error('❌ Stripe Payment Intent Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment intent',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Handle Stripe webhook events
 */
export const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('✅ Payment succeeded:', paymentIntent.id);
      
      // Update payment status
      if (paymentIntents.has(paymentIntent.id)) {
        const storedIntent = paymentIntents.get(paymentIntent.id);
        paymentIntents.set(paymentIntent.id, {
          ...storedIntent,
          status: 'completed',
          completedAt: new Date().toISOString(),
        });
      }
      
      // TODO: Send confirmation email, update database, etc.
      break;

    case 'payment_intent.payment_failed':
      const failedIntent = event.data.object;
      console.log('❌ Payment failed:', failedIntent.id);
      
      // Update payment status
      if (paymentIntents.has(failedIntent.id)) {
        const storedIntent = paymentIntents.get(failedIntent.id);
        paymentIntents.set(failedIntent.id, {
          ...storedIntent,
          status: 'failed',
          failedAt: new Date().toISOString(),
          error: failedIntent.last_payment_error?.message,
        });
      }
      break;

    case 'payment_intent.canceled':
      const canceledIntent = event.data.object;
      console.log('⚠️ Payment canceled:', canceledIntent.id);
      
      // Update payment status
      if (paymentIntents.has(canceledIntent.id)) {
        const storedIntent = paymentIntents.get(canceledIntent.id);
        paymentIntents.set(canceledIntent.id, {
          ...storedIntent,
          status: 'canceled',
          canceledAt: new Date().toISOString(),
        });
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

/**
 * Get payment status by Payment Intent ID
 */
export const getPaymentStatus = async (req, res) => {
  try {
    const { paymentIntentId } = req.params;

    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        message: 'Payment Intent ID is required'
      });
    }

    // Check if we have stored data
    const storedData = paymentIntents.get(paymentIntentId);

    // Fetch from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.json({
      success: true,
      data: {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100, // Convert from cents
        currency: paymentIntent.currency,
        metadata: paymentIntent.metadata,
        storedData: storedData || null,
      }
    });
  } catch (error) {
    console.error('❌ Error fetching payment status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get Stripe publishable key
 */
export const getPublishableKey = (req, res) => {
  res.json({
    success: true,
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  });
};

