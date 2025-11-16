import axios from 'axios';
import { generateToken, generatePassword, formatPhoneNumber } from '../utils/mpesaHelpers.js';

// Store transactions in memory (use database in production)
const transactions = new Map();

/**
 * Initiate STK Push for M-Pesa payment
 */
export const initiateStkPush = async (req, res) => {
  try {
    const { phoneNumber, amount, bookTitle, orderId } = req.body;

    // Validate input
    if (!phoneNumber || !amount || !bookTitle) {
      return res.status(400).json({
        success: false,
        message: 'Phone number, amount, and book title are required'
      });
    }

    // Format phone number (remove + and spaces)
    const formattedPhone = formatPhoneNumber(phoneNumber);
    
    // Generate access token
    const token = await generateToken();
    
    // Generate password
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = generatePassword(timestamp);

    const shortcode = process.env.MPESA_SHORTCODE;
    const callbackUrl = process.env.MPESA_CALLBACK_URL;

    // STK Push request
    const stkPushUrl = process.env.MPESA_ENVIRONMENT === 'production'
      ? 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest'
      : 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

    const stkPushData = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.ceil(amount), // M-Pesa doesn't support decimals
      PartyA: formattedPhone,
      PartyB: shortcode,
      PhoneNumber: formattedPhone,
      CallBackURL: callbackUrl,
      AccountReference: orderId || `ORDER-${Date.now()}`,
      TransactionDesc: `Payment for: ${bookTitle}`
    };

    const response = await axios.post(stkPushUrl, stkPushData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Store transaction details
    const checkoutRequestId = response.data.CheckoutRequestID;
    transactions.set(checkoutRequestId, {
      orderId: stkPushData.AccountReference,
      bookTitle,
      amount,
      phoneNumber: formattedPhone,
      status: 'pending',
      timestamp: new Date().toISOString()
    });

    res.json({
      success: true,
      message: 'STK Push initiated successfully. Please check your phone.',
      data: {
        checkoutRequestId,
        merchantRequestId: response.data.MerchantRequestID,
        responseCode: response.data.ResponseCode,
        responseDescription: response.data.ResponseDescription,
        customerMessage: response.data.CustomerMessage
      }
    });

  } catch (error) {
    console.error('STK Push Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to initiate payment',
      error: error.response?.data || error.message
    });
  }
};

/**
 * Handle M-Pesa callback
 */
export const mpesaCallback = async (req, res) => {
  try {
    console.log('M-Pesa Callback Received:', JSON.stringify(req.body, null, 2));

    const { Body } = req.body;
    const stkCallback = Body.stkCallback;
    
    const checkoutRequestId = stkCallback.CheckoutRequestID;
    const resultCode = stkCallback.ResultCode;
    const resultDesc = stkCallback.ResultDesc;

    // Update transaction status
    const transaction = transactions.get(checkoutRequestId);
    if (transaction) {
      transaction.status = resultCode === 0 ? 'completed' : 'failed';
      transaction.resultDesc = resultDesc;
      
      if (resultCode === 0 && stkCallback.CallbackMetadata) {
        const metadata = stkCallback.CallbackMetadata.Item;
        transaction.mpesaReceiptNumber = metadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value;
        transaction.transactionDate = metadata.find(item => item.Name === 'TransactionDate')?.Value;
        transaction.phoneNumber = metadata.find(item => item.Name === 'PhoneNumber')?.Value;
      }
      
      transactions.set(checkoutRequestId, transaction);
      console.log('Transaction updated:', transaction);
    }

    // Acknowledge callback
    res.json({ ResultCode: 0, ResultDesc: 'Success' });

  } catch (error) {
    console.error('Callback Error:', error);
    res.json({ ResultCode: 1, ResultDesc: 'Failed' });
  }
};

/**
 * Query transaction status
 */
export const queryTransactionStatus = async (req, res) => {
  try {
    const { checkoutRequestId } = req.params;

    const transaction = transactions.get(checkoutRequestId);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      data: transaction
    });

  } catch (error) {
    console.error('Query Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to query transaction status',
      error: error.message
    });
  }
};

/**
 * Query STK Push status from M-Pesa API
 */
export const queryStkStatus = async (req, res) => {
  try {
    const { checkoutRequestId } = req.body;

    if (!checkoutRequestId) {
      return res.status(400).json({
        success: false,
        message: 'CheckoutRequestID is required'
      });
    }

    const token = await generateToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = generatePassword(timestamp);
    const shortcode = process.env.MPESA_SHORTCODE;

    const queryUrl = process.env.MPESA_ENVIRONMENT === 'production'
      ? 'https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query'
      : 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query';

    const queryData = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId
    };

    const response = await axios.post(queryUrl, queryData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('STK Query Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to query STK status',
      error: error.response?.data || error.message
    });
  }
};



