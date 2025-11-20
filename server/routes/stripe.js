import express from 'express';
import {
  createPaymentIntent,
  handleWebhook,
  getPaymentStatus,
  getPublishableKey
} from '../controllers/stripeController.js';

const router = express.Router();

// Get Stripe publishable key
router.get('/config', getPublishableKey);

// Create payment intent
router.post('/create-payment-intent', createPaymentIntent);

// Webhook handler (must be raw body, not JSON)
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// Get payment status
router.get('/payment/:paymentIntentId', getPaymentStatus);

export default router;

