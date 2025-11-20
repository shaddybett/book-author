import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowLeft, FiPackage, FiAlertCircle, FiSmartphone, 
  FiCreditCard, FiGlobe, FiMapPin 
} from 'react-icons/fi';
import MpesaPayment from '../components/payments/MpesaPayment';
import StripePayment from '../components/payments/StripePayment';

function OrderSummary() {
  const location = useLocation();
  const book = location.state?.book;

  const [paymentMethod, setPaymentMethod] = useState(null); // 'mpesa' or 'stripe'
  const [customerDetails, setCustomerDetails] = useState({
    email: '',
    name: '',
    phone: '',
    country: 'KE'
  });
  const [showPayment, setShowPayment] = useState(false);

  const handleCustomerDetailsSubmit = (e) => {
    e.preventDefault();
    if (customerDetails.email && customerDetails.name && 
        (paymentMethod === 'stripe' || customerDetails.phone)) {
      setShowPayment(true);
    }
  };

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

  // Parse price from string (e.g., "Ksh 800" to 800 KES or convert to USD)
  const bookPriceKES = parseFloat(book.price.replace(/[^0-9.]/g, ''));
  const bookPriceUSD = (bookPriceKES / 150).toFixed(2); // Rough conversion rate
  const deliveryFee = 0;
  const totalAmountKES = bookPriceKES + deliveryFee;
  const totalAmountUSD = (parseFloat(bookPriceUSD) + (deliveryFee / 150)).toFixed(2);

  const isKenyan = customerDetails.country === 'KE';

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
              Review your purchase details and select payment method
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
                <p className="text-stone-400 leading-relaxed mb-4 line-clamp-3">
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
                  <span className="font-medium">
                    {isKenyan ? `KES ${bookPriceKES.toFixed(2)}` : `$${bookPriceUSD}`}
                  </span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span className="flex items-center gap-2">
                    <FiPackage className="w-4 h-4" />
                    Delivery Fee:
                  </span>
                  <span className="font-medium">
                    {isKenyan ? `KES ${deliveryFee.toFixed(2)}` : `$${(deliveryFee / 150).toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-stone-700/40 pt-3 mt-3">
                  <div className="flex justify-between text-white text-lg font-bold">
                    <span>Total Amount:</span>
                    <span>
                      {isKenyan ? `KES ${totalAmountKES.toFixed(2)}` : `$${totalAmountUSD}`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Details Form */}
            {!showPayment ? (
              <form onSubmit={handleCustomerDetailsSubmit} className="space-y-4 mb-6">
                <div className="bg-stone-900/40 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Your Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="country" className="block text-stone-300 text-sm font-medium mb-2">
                        <FiGlobe className="inline mr-1" />
                        Country *
                      </label>
                      <select
                        id="country"
                        required
                        value={customerDetails.country}
                        onChange={(e) => {
                          setCustomerDetails({...customerDetails, country: e.target.value});
                          setPaymentMethod(null); // Reset payment method when country changes
                        }}
                        className="w-full bg-stone-800/60 border border-stone-700/40 rounded-lg px-4 py-3
                                 text-white placeholder-stone-500 focus:outline-none focus:ring-2 
                                 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
                      >
                        <option value="KE">🇰🇪 Kenya</option>
                        <option value="US">🇺🇸 United States</option>
                        <option value="GB">🇬🇧 United Kingdom</option>
                        <option value="CA">🇨🇦 Canada</option>
                        <option value="AU">🇦🇺 Australia</option>
                        <option value="OTHER">🌍 Other</option>
                      </select>
                    </div>

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
                                 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
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
                                 focus:ring-purple-500/20 focus:border-purple-500/40 transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    {isKenyan && (
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
                    )}
                  </div>

                  {/* Payment Method Selection */}
                  <div className="mt-6">
                    <h4 className="text-white font-medium mb-3">Select Payment Method *</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* M-Pesa Option (Kenya only) */}
                      {isKenyan && (
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('mpesa')}
                          className={`relative p-6 rounded-xl border-2 transition-all duration-200 text-left
                                   ${paymentMethod === 'mpesa' 
                                     ? 'bg-green-500/10 border-green-500 shadow-lg shadow-green-500/20' 
                                     : 'bg-stone-800/40 border-stone-700/40 hover:border-green-500/40'}`}
                        >
                          <FiSmartphone className={`w-8 h-8 mb-3 ${paymentMethod === 'mpesa' ? 'text-green-400' : 'text-stone-400'}`} />
                          <h5 className="text-white font-semibold mb-1">M-Pesa</h5>
                          <p className="text-stone-400 text-sm">Pay with M-Pesa mobile money</p>
                          {paymentMethod === 'mpesa' && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </button>
                      )}

                      {/* Stripe Option (Global) */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('stripe')}
                        className={`relative p-6 rounded-xl border-2 transition-all duration-200 text-left
                                 ${paymentMethod === 'stripe' 
                                   ? 'bg-purple-500/10 border-purple-500 shadow-lg shadow-purple-500/20' 
                                   : 'bg-stone-800/40 border-stone-700/40 hover:border-purple-500/40'}`}
                      >
                        <FiCreditCard className={`w-8 h-8 mb-3 ${paymentMethod === 'stripe' ? 'text-purple-400' : 'text-stone-400'}`} />
                        <h5 className="text-white font-semibold mb-1">Credit/Debit Card</h5>
                        <p className="text-stone-400 text-sm">Secure payment with Stripe</p>
                        {paymentMethod === 'stripe' && (
                          <div className="absolute top-3 right-3 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!paymentMethod}
                    className={`w-full mt-6 px-4 py-4 rounded-full font-semibold text-lg
                             transition-all duration-200 shadow-lg
                             ${paymentMethod 
                               ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white hover:shadow-xl' 
                               : 'bg-stone-700/40 text-stone-500 cursor-not-allowed'}`}
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            ) : null}

            {/* Payment Components */}
            <AnimatePresence mode="wait">
              {showPayment && paymentMethod === 'mpesa' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <MpesaPayment
                    book={book}
                    customerDetails={customerDetails}
                    totalAmount={totalAmountKES}
                    onBack={() => setShowPayment(false)}
                  />
                </motion.div>
              )}

              {showPayment && paymentMethod === 'stripe' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <StripePayment
                    book={book}
                    customerDetails={customerDetails}
                    totalAmount={parseFloat(totalAmountUSD)}
                    onBack={() => setShowPayment(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default OrderSummary;
