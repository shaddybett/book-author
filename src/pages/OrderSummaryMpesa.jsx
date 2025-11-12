import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiPackage, FiCheck, FiAlertCircle, FiSmartphone, FiLoader } from 'react-icons/fi';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://author-fwlz.onrender.com';

function OrderSummaryMpesa() {
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;

  const [paymentStatus, setPaymentStatus] = useState(null); // 'pending', 'success', 'error', null
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    email: '',
    name: '',
    phone: ''
  });
  const [showPayment, setShowPayment] = useState(false);
  const [checkoutRequestId, setCheckoutRequestId] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleCustomerDetailsSubmit = (e) => {
    e.preventDefault();
    if (customerDetails.email && customerDetails.name && customerDetails.phone) {
      setShowPayment(true);
    }
  };

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

  // Redirect if no book data
  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <FiAlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">No Book Selected</h2>
          <p className="text-stone-400 mb-6">Please select a book to purchase.</p>
          <Link 
            to="/"
            className="bg-white text-stone-800 px-6 py-3 rounded-full font-semibold hover:bg-stone-100 transition-colors inline-flex items-center gap-2"
          >
            <FiArrowLeft />
            Back to Books
          </Link>
        </div>
      </div>
    );
  }

  // Parse price from string (e.g., "Ksh 800" to 800)
  const bookPrice = parseFloat(book.price.replace(/[^0-9.]/g, ''));
  const deliveryFee = 200; // KES 200 delivery
  const totalAmount = bookPrice + deliveryFee;

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
    <div className="min-h-screen bg-neutral-950 text-stone-300">
      {/* Background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 
                      bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link 
            to="/#books"
            className="text-stone-400 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Books
          </Link>
        </motion.div>

        {/* Order Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-stone-800/40 border border-stone-700/40 rounded-2xl overflow-hidden backdrop-blur-sm"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-stone-800 to-stone-900 px-6 py-6 border-b border-stone-700/40">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Order Summary
            </h1>
            <p className="text-stone-400 text-sm">
              Review your purchase details before proceeding
            </p>
          </div>

          {/* Book Details Section */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              {/* Book Cover */}
              <div className="w-full md:w-48 flex-shrink-0">
                <div className="relative overflow-hidden rounded-lg aspect-[2/3] bg-stone-700/40">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Book Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-3">
                  {book.title}
                </h2>
                <p className="text-stone-400 leading-relaxed mb-4">
                  {book.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-stone-400">
                  <div>
                    <span className="text-stone-500">Genre:</span>{' '}
                    <span className="text-stone-300">{book.genre}</span>
                  </div>
                  <div>
                    <span className="text-stone-500">Pages:</span>{' '}
                    <span className="text-stone-300">{book.pages}</span>
                  </div>
                  <div>
                    <span className="text-stone-500">Published:</span>{' '}
                    <span className="text-stone-300">{book.publishedYear}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-stone-900/40 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FiPackage className="w-5 h-5" />
                Price Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-stone-300">
                  <span>Book Price:</span>
                  <span className="font-medium">KES {bookPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span className="flex items-center gap-2">
                    <FiPackage className="w-4 h-4" />
                    Delivery Fee:
                  </span>
                  <span className="font-medium">KES {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-stone-700/40 pt-3 mt-3">
                  <div className="flex justify-between text-white text-lg font-bold">
                    <span>Total Amount:</span>
                    <span>KES {totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Notice */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-6">
              <h4 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <FiSmartphone className="w-5 h-5" />
                Pay with M-Pesa
              </h4>
              <p className="text-stone-300 text-sm leading-relaxed">
                After entering your details, you'll receive an M-Pesa prompt on your phone. 
                Enter your PIN to complete the payment, then you'll be redirected to WhatsApp 
                to finalize delivery details.
              </p>
            </div>

            {/* Customer Details Form */}
            {!showPayment && !isProcessing ? (
              <form onSubmit={handleCustomerDetailsSubmit} className="space-y-4 mb-6">
                <div className="bg-stone-900/40 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Your Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-stone-300 text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={customerDetails.name}
                        onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                        className="w-full bg-stone-800/60 border border-stone-700/40 rounded-lg px-4 py-3
                                 text-white placeholder-stone-500 focus:outline-none focus:ring-2 
                                 focus:ring-green-500/20 focus:border-green-500/40 transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-stone-300 text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={customerDetails.email}
                        onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                        className="w-full bg-stone-800/60 border border-stone-700/40 rounded-lg px-4 py-3
                                 text-white placeholder-stone-500 focus:outline-none focus:ring-2 
                                 focus:ring-green-500/20 focus:border-green-500/40 transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-stone-300 text-sm font-medium mb-2">
                        M-Pesa Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={customerDetails.phone}
                        onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                        className="w-full bg-stone-800/60 border border-stone-700/40 rounded-lg px-4 py-3
                                 text-white placeholder-stone-500 focus:outline-none focus:ring-2 
                                 focus:ring-green-500/20 focus:border-green-500/40 transition-all"
                        placeholder="0700 000 000 or +254 700 000 000"
                      />
                      <p className="text-xs text-stone-500 mt-2">
                        Enter the phone number registered with M-Pesa
                      </p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white 
                             px-4 py-4 rounded-full font-semibold text-lg
                             transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            ) : null}

            {/* Payment Status Messages */}
            <AnimatePresence mode="wait">
              {paymentStatus === 'pending' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-6"
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
                  className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-6"
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
                  className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-6"
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
                      setShowPayment(false);
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
            {showPayment && !isProcessing && !paymentStatus && (
              <div className="space-y-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                  <p className="text-green-400 text-sm">
                    ✓ Your details have been saved. Click below to initiate M-Pesa payment.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleMpesaPayment}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white 
                             px-8 py-4 rounded-full font-semibold text-lg
                             transition-all duration-200 shadow-lg hover:shadow-xl
                             flex items-center justify-center gap-2"
                  >
                    <FiSmartphone className="w-5 h-5" />
                    Pay with M-Pesa
                  </button>
                  
                  <button
                    onClick={() => setShowPayment(false)}
                    className="border-2 border-stone-400 hover:border-white
                             text-stone-300 hover:text-white
                             px-8 py-4 rounded-full font-semibold
                             transition-colors duration-200"
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            )}

            {/* Security Note */}
            <p className="text-center text-stone-500 text-xs mt-6">
              🔒 Secure payment powered by M-Pesa Daraja API
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default OrderSummaryMpesa;

