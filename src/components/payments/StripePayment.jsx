import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCreditCard, FiCheck, FiAlertCircle, FiLoader, FiLock } from 'react-icons/fi';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://author-fwlz.onrender.com';

// Initialize Stripe (will be set dynamically)
let stripePromise = null;

const getStripe = async () => {
  if (!stripePromise) {
    try {
      const response = await axios.get(`${API_URL}/api/stripe/config`);
      const publishableKey = response.data.publishableKey;
      stripePromise = loadStripe(publishableKey);
    } catch (error) {
      console.error('Error loading Stripe:', error);
    }
  }
  return stripePromise;
};

function CheckoutForm({ book, customerDetails, totalAmount, onBack }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
          receipt_email: customerDetails.email,
        },
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error.message);
        setPaymentStatus('error');
        setIsProcessing(false);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setPaymentStatus('success');
        
        // Redirect to WhatsApp after success
        setTimeout(() => {
          const message = encodeURIComponent(
            `Hi! I just completed payment for "${book.title}".

Customer Details:
- Name: ${customerDetails.name}
- Email: ${customerDetails.email}
- Amount Paid: $${totalAmount.toFixed(2)}

Please send me delivery details.`
          );
          window.location.href = `https://wa.me/254713315219?text=${message}`;
        }, 3000);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setErrorMessage('An unexpected error occurred. Please try again.');
      setPaymentStatus('error');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Information */}
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
        <h4 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
          <FiCreditCard className="w-5 h-5" />
          Secure Card Payment
        </h4>
        <p className="text-stone-300 text-sm leading-relaxed">
          Your payment information is processed securely by Stripe. 
          After successful payment, you'll be redirected to WhatsApp to finalize delivery details.
        </p>
      </div>

      {/* Stripe Payment Element */}
      <div className="bg-stone-900/40 rounded-xl p-6">
        <PaymentElement 
          options={{
            layout: 'tabs',
            business: { name: 'Mercy Langat Books' },
          }}
        />
      </div>

      {/* Payment Status Messages */}
      <AnimatePresence mode="wait">
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

        {paymentStatus === 'error' && errorMessage && (
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
                <p className="text-sm text-stone-300 mt-1">{errorMessage}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          disabled={!stripe || isProcessing || paymentStatus === 'success'}
          className={`flex-1 px-8 py-4 rounded-full font-semibold text-lg
                   transition-all duration-200 shadow-lg
                   flex items-center justify-center gap-2
                   ${!stripe || isProcessing || paymentStatus === 'success'
                     ? 'bg-stone-700/40 text-stone-500 cursor-not-allowed'
                     : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white hover:shadow-xl'
                   }`}
        >
          {isProcessing ? (
            <>
              <FiLoader className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <FiLock className="w-5 h-5" />
              Pay ${totalAmount.toFixed(2)}
            </>
          )}
        </button>
        
        <button
          type="button"
          onClick={onBack}
          disabled={isProcessing || paymentStatus === 'success'}
          className="border-2 border-stone-400 hover:border-white
                   text-stone-300 hover:text-white
                   px-8 py-4 rounded-full font-semibold
                   transition-colors duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
      </div>

      {/* Security Note */}
      <div className="flex items-center justify-center gap-2 text-stone-500 text-xs">
        <FiLock className="w-3 h-3" />
        <span>Secured by Stripe • PCI DSS Compliant</span>
      </div>
    </form>
  );
}

function StripePayment({ book, customerDetails, totalAmount, onBack }) {
  const [clientSecret, setClientSecret] = useState('');
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load Stripe
    getStripe().then(() => setStripeLoaded(true));

    // Create Payment Intent
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post(`${API_URL}/api/stripe/create-payment-intent`, {
          amount: totalAmount,
          bookTitle: book.title,
          customerEmail: customerDetails.email,
          customerName: customerDetails.name,
        });

        if (response.data.success) {
          setClientSecret(response.data.data.clientSecret);
        } else {
          setError('Failed to initialize payment. Please try again.');
        }
      } catch (err) {
        console.error('Error creating payment intent:', err);
        setError('Failed to initialize payment. Please try again.');
      }
    };

    createPaymentIntent();
  }, [book.title, totalAmount, customerDetails.email, customerDetails.name]);

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center gap-3 text-red-400">
            <FiAlertCircle className="w-6 h-6" />
            <div>
              <h4 className="font-semibold">Payment Error</h4>
              <p className="text-sm text-stone-300 mt-1">{error}</p>
            </div>
          </div>
        </div>
        <button
          onClick={onBack}
          className="w-full border-2 border-stone-400 hover:border-white
                   text-stone-300 hover:text-white
                   px-8 py-4 rounded-full font-semibold
                   transition-colors duration-200"
        >
          Back
        </button>
      </div>
    );
  }

  if (!stripeLoaded || !clientSecret) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <FiLoader className="w-8 h-8 text-purple-400 animate-spin" />
        <p className="text-stone-400">Loading payment form...</p>
      </div>
    );
  }

  const appearance = {
    theme: 'night',
    variables: {
      colorPrimary: '#a855f7',
      colorBackground: '#1c1917',
      colorText: '#d6d3d1',
      colorDanger: '#ef4444',
      fontFamily: 'system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '12px',
    },
  };

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      <CheckoutForm
        book={book}
        customerDetails={customerDetails}
        totalAmount={totalAmount}
        onBack={onBack}
      />
    </Elements>
  );
}

export default StripePayment;

