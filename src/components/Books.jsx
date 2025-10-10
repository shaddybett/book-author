import React, { useState } from 'react';
import { BOOKS } from '../constants/index';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiStar, FiBookOpen, FiCalendar, FiDollarSign, FiAward, FiFilter } from 'react-icons/fi';

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

const bookVariants = {
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
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3
    }
  }
};

function Books() {
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [showExcerpt, setShowExcerpt] = useState({});
  
  const genres = ['All', ...new Set(BOOKS.map(book => book.genre))];
  
  const filteredBooks = selectedGenre === 'All' 
    ? BOOKS 
    : BOOKS.filter(book => book.genre === selectedGenre);

  return (
    <div id="books" className="mt-16">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight
                     bg-gradient-to-r from-white via-stone-200 to-stone-400 
                     bg-clip-text text-transparent mb-4">
          Published Works
        </h2>
        <p className="text-stone-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Explore my collection of published works, each crafted with passion and attention to detail
        </p>
      </motion.div>

      {/* Genre Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        <FiFilter className="text-stone-400 self-center mr-2" />
        {genres.map((genre) => (
          <motion.button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2.5 rounded-full font-medium text-sm
                     transition-all duration-300 ${
              selectedGenre === genre
                ? 'bg-white text-stone-800 shadow-lg'
                : 'bg-stone-800/40 text-stone-300 border border-stone-700/40 hover:bg-stone-700/60 hover:border-stone-600/60'
            }`}
          >
            {genre}
          </motion.button>
        ))}
      </motion.div>

      {/* Books Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-16 lg:space-y-24"
      >
        <AnimatePresence mode="wait">
          {filteredBooks.map((book, index) => (
            <BookCard 
              key={book.isbn} 
              book={book} 
              index={index}
              showExcerpt={showExcerpt[book.isbn]}
              setShowExcerpt={(show) => setShowExcerpt(prev => ({...prev, [book.isbn]: show}))}
            />
          ))}
        </AnimatePresence>
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
}

function BookCard({ book, index, showExcerpt, setShowExcerpt }) {
  const [isHovered, setIsHovered] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
    }

    if (hasHalfStar) {
      stars.push(<FiStar key="half" className="w-4 h-4 text-yellow-400 fill-current opacity-50" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FiStar key={`empty-${i}`} className="w-4 h-4 text-stone-400" />);
    }

    return stars;
  };

  return (
    <motion.div
      variants={bookVariants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true }}
      className="group"
    >
      <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12
                    ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Book Cover */}
        <motion.div
          className="w-full lg:w-1/2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative overflow-hidden rounded-2xl bg-stone-800/40 
                        border border-stone-700/40 backdrop-blur-sm
                        group-hover:border-stone-600/60 transition-all duration-500
                        hover:shadow-2xl hover:shadow-stone-900/30
                        aspect-[3/4] max-w-sm mx-auto">
            
            <img
              src={book.image}
              alt={book.title}
              className={`w-full h-full object-cover transform 
                       transition-all duration-500
                       ${isHovered ? 'scale-105' : ''}`}
            />
            
            {/* Awards badge */}
            {book.awards && book.awards.length > 0 && (
              <div className="absolute top-4 left-4 bg-gradient-to-br from-yellow-400 to-yellow-600
                            px-3 py-2 rounded-lg shadow-lg z-20">
                <div className="flex items-center gap-1">
                  <FiAward className="text-yellow-900 text-sm" />
                  <span className="text-yellow-900 font-bold text-xs">Award Winner</span>
                </div>
              </div>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="absolute inset-0 z-20 flex items-center justify-center 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.a
                href={book.purchaseLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/90 hover:bg-white text-stone-800 
                         px-6 py-3 rounded-full transition-colors duration-200
                         shadow-lg hover:shadow-xl flex items-center gap-2 font-semibold"
              >
                <FiExternalLink className="w-5 h-5" />
                <span>Buy Now</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Book Content */}
        <motion.div
          className="w-full lg:w-1/2 space-y-6"
        >
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight
                         bg-gradient-to-r from-white to-stone-300 
                         bg-clip-text text-transparent mb-4">
              {book.title}
            </h3>
            
            {/* Awards */}
            {book.awards && book.awards.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {book.awards.map((award, i) => (
                  <span key={i} className="text-xs bg-yellow-500/10 text-yellow-400 
                                         px-3 py-1 rounded-full border border-yellow-500/20">
                    🏆 {award}
                  </span>
                ))}
              </div>
            )}
            
            <div className="bg-stone-800/30 backdrop-blur-sm border border-stone-700/30 
                          rounded-xl p-6 mb-6">
              <p className="text-stone-300 leading-relaxed text-base lg:text-lg mb-4">
                {book.description}
              </p>
              
              {/* Excerpt toggle */}
              {book.excerpt && (
                <div>
                  <button
                    onClick={() => setShowExcerpt(!showExcerpt)}
                    className="text-white hover:text-stone-200 text-sm font-medium 
                             flex items-center gap-2 transition-colors duration-200"
                  >
                    <FiBookOpen className="w-4 h-4" />
                    {showExcerpt ? 'Hide' : 'Read'} Excerpt
                  </button>
                  
                  <AnimatePresence>
                    {showExcerpt && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-stone-700/30"
                      >
                        <p className="text-stone-400 italic text-sm leading-relaxed">
                          "{book.excerpt}"
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          {/* Book Details */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 text-sm text-stone-400">
              <div className="flex items-center gap-2">
                <FiBookOpen className="w-4 h-4" />
                <span>{book.pages} pages</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="w-4 h-4" />
                <span>{book.publishedYear}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiDollarSign className="w-4 h-4" />
                <span className="text-white font-semibold">{book.price}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {renderStars(book.rating)}
              </div>
              <span className="text-stone-400 text-sm">({book.rating}/5)</span>
            </div>

            {/* Genre */}
            <div className="space-y-3">
              <h4 className="text-stone-400 font-medium text-sm uppercase tracking-wider">
                Genre
              </h4>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.3, 
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="bg-stone-700/40 hover:bg-stone-600/40 
                         border border-stone-600/40 hover:border-stone-500/60
                         text-stone-200 hover:text-white
                         px-4 py-2 rounded-full text-sm font-medium
                         transition-all duration-200 cursor-default
                         backdrop-blur-sm inline-block"
              >
                {book.genre}
              </motion.span>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-4 pt-2">
            <motion.a
              href={book.purchaseLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-white hover:bg-stone-100 text-stone-800 
                       px-6 py-3 rounded-full font-semibold
                       transition-colors duration-200 flex items-center gap-2
                       shadow-lg"
            >
              <FiExternalLink className="w-4 h-4" />
              Purchase Book
            </motion.a>
            
            <motion.button
              onClick={() => setShowExcerpt(!showExcerpt)}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.98 }}
              className="border-2 border-stone-400 hover:border-white
                       text-stone-300 hover:text-white
                       px-6 py-3 rounded-full font-semibold
                       transition-colors duration-200 flex items-center gap-2"
            >
              <FiBookOpen className="w-4 h-4" />
              {showExcerpt ? 'Hide' : 'Read'} Sample
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Books;