import express from 'express';
import { 
  initiateStkPush, 
  mpesaCallback, 
  queryTransactionStatus,
  queryStkStatus 
} from '../controllers/mpesaController.js';

const router = express.Router();

// Initiate STK Push
router.post('/stkpush', initiateStkPush);

// M-Pesa callback endpoint
router.post('/callback', mpesaCallback);

// Query transaction status (local)
router.get('/transaction/:checkoutRequestId', queryTransactionStatus);

// Query STK status from M-Pesa
router.post('/query', queryStkStatus);

export default router;



