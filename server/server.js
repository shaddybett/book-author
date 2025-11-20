import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mpesaRoutes from './routes/mpesa.js';
import stripeRoutes from './routes/stripe.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://www.mercylangat.com',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/mpesa', mpesaRoutes);
app.use('/api/stripe', stripeRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Payment Server Running (M-Pesa + Stripe)' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Payment Server running on port ${PORT}`);
  console.log(`📱 M-Pesa Environment: ${process.env.MPESA_ENVIRONMENT || 'sandbox'}`);
  console.log(`💳 Stripe Environment: ${process.env.STRIPE_SECRET_KEY ? 'Configured' : 'Not Configured'}`);
});



