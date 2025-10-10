import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiCheck, FiGift } from 'react-icons/fi';
import { NEWSLETTER } from '../constants';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div id="newsletter" className="mt-16 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-800/20 to-stone-700/20 
                      rounded-3xl blur-3xl -z-10" />
        
        <div className="relative bg-gradient-to-br from-stone-800/60 to-stone-900/60 
                      backdrop-blur-sm border border-stone-700/50 rounded-3xl 
                      p-8 md:p-12 overflow-hidden">
          
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br 
                        from-white/5 to-transparent rounded-full blur-3xl -z-10" />
          
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div className="bg-gradient-to-br from-white to-stone-300 p-4 rounded-2xl">
                <FiGift className="text-stone-800 text-3xl" />
              </div>
            </motion.div>

            {/* Header */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight
                         bg-gradient-to-r from-white via-stone-200 to-stone-400 
                         bg-clip-text text-transparent mb-4 text-center">
              {NEWSLETTER.headline}
            </h2>
            
            <p className="text-stone-300 text-center max-w-2xl mx-auto mb-8 leading-relaxed">
              {NEWSLETTER.description}
            </p>

            {/* Benefits list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-2xl mx-auto">
              {NEWSLETTER.benefits.slice(0, 4).map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex items-center gap-2 text-stone-400 text-sm"
                >
                  <FiCheck className="text-green-400 flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* Form */}
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
                >
                  <div className="relative flex-grow">
                    <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 
                                     text-stone-400 text-lg" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="w-full bg-stone-900/60 border border-stone-700/50 
                               rounded-xl px-12 py-4 text-white placeholder-stone-500
                               focus:outline-none focus:border-stone-500/80 
                               transition-colors duration-200"
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white hover:bg-stone-100 text-stone-800 
                             px-8 py-4 rounded-xl font-semibold
                             transition-colors duration-200 whitespace-nowrap
                             disabled:opacity-50 disabled:cursor-not-allowed
                             shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? 'Joining...' : 'Join Now'}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center w-16 h-16 
                             bg-green-500/20 border-2 border-green-500 
                             rounded-full mb-4"
                  >
                    <FiCheck className="text-green-400 text-2xl" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    Welcome to the Story Circle!
                  </h3>
                  <p className="text-stone-300">
                    Check your inbox for a confirmation email
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Privacy note */}
            <p className="text-stone-500 text-xs text-center mt-6">
              Your privacy matters. Unsubscribe anytime. No spam, ever.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Newsletter;