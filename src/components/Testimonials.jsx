import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiExternalLink } from 'react-icons/fi';
import { TESTIMONIALS } from '../constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const Testimonials = () => {
  const renderStars = (rating) => {
    return [...Array(rating)].map((_, i) => (
      <FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
    ));
  };

  return (
    <div id="testimonials" className="mt-16 mb-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight
                     bg-gradient-to-r from-white via-stone-200 to-stone-400 
                     bg-clip-text text-transparent mb-4">
          What Readers Say
        </h2>
        <p className="text-stone-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Voices from the community of readers who've journeyed through my stories
        </p>
      </motion.div>

      {/* Testimonials Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {TESTIMONIALS.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3 }
            }}
            className="group"
          >
            <div className="relative bg-stone-800/40 backdrop-blur-sm 
                          border border-stone-700/40 rounded-2xl p-6 h-full
                          hover:bg-stone-800/60 hover:border-stone-600/60
                          transition-all duration-500 hover:shadow-2xl 
                          hover:shadow-stone-900/30 flex flex-col">
              
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 bg-gradient-to-br from-white to-stone-300 
                            p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <FiExternalLink className="text-stone-800 text-xl" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4 mt-2">
                {renderStars(testimonial.rating)}
              </div>

              {/* Quote */}
              <p className="text-stone-300 leading-relaxed text-base mb-6 flex-grow">
                "{testimonial.quote}"
              </p>

              {/* Author Info */}
              <div className="border-t border-stone-700/40 pt-4 mt-auto">
                <p className="text-white font-semibold text-sm">
                  {testimonial.author}
                </p>
                <p className="text-stone-400 text-xs mt-1">
                  {testimonial.title}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom accent */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center mt-16"
      >
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
      </motion.div>
    </div>
  );
};

export default Testimonials;