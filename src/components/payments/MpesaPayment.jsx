import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSmartphone, FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://author-fwlz.onrender.com';

function MpesaPayment({ book, customerDetails, totalAmount, onBack }) {
  const [paymentStatus, setPaymentStatus] = useState(null); // 'pending', 'success', 'error'
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutRequestId, setCheckoutRequestId] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  // Poll for payment status
  useEffect(() => {
    if (!checkoutRequestId || paymentStatus === 'success') return;

    const pollInterval = setInterval(async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/mpesa/transaction/${checkoutRequestId}`
        );

        if (response.data.success) {
          const { status, resultDesc } = response.data.data;

          if (status === 'completed') {
            setPaymentStatus('success');
            setStatusMessage('Payment completed successfully!');
            clearInterval(pollInterval);

            // Redirect to WhatsApp after success
            setTimeout(() => {
              const message = encodeURIComponent(
                `Hi! I just completed payment for "${book.title}".

Customer Details:
- Name: ${customerDetails.name}
- Email: ${customerDetails.email}
- Phone: ${customerDetails.phone}

Please send me delivery details.`
              );
              window.location.href = `https://wa.me/254713315219?text=${message}`;
            }, 3000);
          } else if (status === 'failed') {
            setPaymentStatus('error');
            setStatusMessage(resultDesc || 'Payment failed. Please try again.');
            clearInterval(pollInterval);
          }
        }
      } catch (error) {
        console.error('Status check error:', error);
      }
    }, 3000); // Poll every 3 seconds

    // Cleanup after 2 minutes
    const timeout = setTimeout(() => {
      clearInterval(pollInterval);
      if (paymentStatus === 'pending') {
        setPaymentStatus('error');
        setStatusMessage('Payment timeout. Please try again.');
      }
    }, 120000);

    return () => {
      clearInterval(pollInterval);
      clearTimeout(timeout);
    };
  }, [checkoutRequestId, paymentStatus, book, customerDetails]);

  const handleMpesaPayment = async () => {
    setIsProcessing(true);
    setPaymentStatus('pending');
    setStatusMessage('Initiating M-Pesa payment...');

    try {
      const response = await axios.post(`${API_URL}/api/mpesa/stkpush`, {
        phoneNumber: customerDetails.phone,
        amount: totalAmount,
        bookTitle: book.title,
        orderId: `ORD-${Date.now()}`
      });

      if (response.data.success) {
        setCheckoutRequestId(response.data.data.checkoutRequestId);
        setStatusMessage('Please check your phone and enter your M-Pesa PIN');
      } else {
        setPaymentStatus('error');
        setStatusMessage('Failed to initiate payment. Please try again.');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('M-Pesa Error:', error);
      setPaymentStatus('error');
      setStatusMessage(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Information Notice */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
        <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
          <FiSmartphone className="w-5 h-5" />
          Pay with M-Pesa
        </h4>
        <p className="text-stone-300 text-sm leading-relaxed">
          You'll receive an M-Pesa prompt on your phone ({customerDetails.phone}). 
          Enter your PIN to complete the payment, then you'll be redirected to WhatsApp 
          to finalize delivery details.
        </p>
      </div>

      {/* Payment Status Messages */}
      <AnimatePresence mode="wait">
        {paymentStatus === 'pending' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3">
              <FiLoader className="w-6 h-6 text-blue-400 animate-spin" />
              <div>
                <h4 className="font-semibold text-blue-400">Processing Payment</h4>
                <p className="text-sm text-stone-300 mt-1">{statusMessage}</p>
              </div>
            </div>
          </motion.div>
        )}

        {paymentStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-green-500/10 border border-green-500/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 text-green-400">
              <FiCheck className="w-6 h-6" />
              <div>
                <h4 className="font-semibold">Payment Successful!</h4>
                <p className="text-sm text-stone-300 mt-1">
                  Redirecting you to WhatsApp...
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {paymentStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-red-500/10 border border-red-500/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 text-red-400">
              <FiAlertCircle className="w-6 h-6" />
              <div>
                <h4 className="font-semibold">Payment Failed</h4>
                <p className="text-sm text-stone-300 mt-1">{statusMessage}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setPaymentStatus(null);
                setIsProcessing(false);
                setCheckoutRequestId(null);
              }}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white 
                       px-4 py-3 rounded-full font-semibold
                       transition-all duration-200"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Button */}
      {!isProcessing && !paymentStatus && (
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleMpesaPayment}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white 
                     px-8 py-4 rounded-full font-semibold text-lg
                     transition-all duration-200 shadow-lg hover:shadow-xl
                     flex items-center justify-center gap-2"
          >
            <FiSmartphone className="w-5 h-5" />
            Pay KES {totalAmount.toFixed(2)} with M-Pesa
          </button>
          
          <button
            onClick={onBack}
            className="border-2 border-stone-400 hover:border-white
                     text-stone-300 hover:text-white
                     px-8 py-4 rounded-full font-semibold
                     transition-colors duration-200"
          >
            Back
          </button>
        </div>
      )}

      {/* Security Note */}
      <p className="text-center text-stone-500 text-xs">
        🔒 Secure payment powered by M-Pesa Daraja API
      </p>
    </div>
  );
}

export default MpesaPayment;

