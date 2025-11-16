import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mpesaRoutes from './routes/mpesa.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '
https://www.mercylangat.com',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/mpesa', mpesaRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'M-Pesa Payment Server Running' });
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
  console.log(`🚀 M-Pesa Payment Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.MPESA_ENVIRONMENT || 'sandbox'}`);
});



