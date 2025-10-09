
  import React from 'react'
  import profilePic from "../assets/prof1.jpg"
  import { HERO_CONTENT } from '../constants/index'
  import { motion } from "framer-motion"

  const containerVariants = {
    hidden: {
      opacity: 0,
      x: -100
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
        ease: "easeOut"
      }
    }
  }

  const childVariants = {
    hidden: {
      opacity: 0,
      x: -100
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: 100,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 1,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  }

  const buttonHover = {
    scale: 1.05,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      duration: 0.2
    }
  }

  function Hero() {
    return (
      <div id="about" className='pt-24 pb-4 lg:mb-36 '>
        <div className='flex flex-wrap lg:flex-row-reverse w-full'>
          {/* Image Section */}
          <div className='w-full lg:w-1/2'>
            <div className='flex justify-center lg:justify-end lg:p-8'>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={imageVariants}
                className="relative"
              >
                {/* Decorative background elements */}
                
                <motion.img
                  src={profilePic}
                  alt='Shadrack Bett - Full Stack Developer'
                  className='relative border-2 border-stone-700/50 rounded-3xl 
                          w-72 h-72 
                          sm:w-96 sm:h-96 
                          lg:w-[420px] lg:h-[420px] 
                          xl:w-[480px] xl:h-[480px]
                          object-cover shadow-2xl'
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Content Section */}
          <div className='w-full lg:w-1/2'>
            <motion.div 
              initial='hidden'
              animate='visible'
              variants={containerVariants}
              className='flex flex-col items-center lg:items-start justify-center h-full px-4 lg:px-8'
            >
              {/* Greeting text */}
              <motion.p
                variants={childVariants}
                className='text-stone-300 text-lg mb-2 mt-2 font-light'
              >
                Hi there! I'm
              </motion.p>

              <motion.h1
                variants={childVariants}
                className='pb-4 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 
                        font-bold tracking-tighter 
                        bg-gradient-to-r from-white via-stone-200 to-stone-400 
                        bg-clip-text text-transparent
                        leading-tight'
              >
                Shadrack Bett
              </motion.h1>
              
              <motion.span
                variants={childVariants}
                className='bg-gradient-to-r bg-white
                        bg-clip-text text-2xl sm:text-3xl lg:text-4xl 
                        tracking-tight text-transparent font-semibold   '
              >
                Full Stack Developer
              </motion.span>
              
              <motion.p
                variants={childVariants}
                className='my-2 max-w-xl  text-lg sm:text-xl 
                        leading-relaxed tracking-tight text-stone-300
                        text-center lg:text-left'
              >
                {HERO_CONTENT}
              </motion.p>
              
              {/* Action buttons */}
              <motion.div
                variants={childVariants}
                className="flex flex-col sm:flex-row gap-4 mt-4"
              >
                <motion.a
                  href='/shadrack_bett.pdf'
                  target='_blank'
                  rel='noopener noreferrer'
                  download
                  className='bg-white hover:bg-stone-100 rounded-full px-8 py-4 
                          text-stone-800 font-semibold text-center
                          transition-colors duration-300
                          shadow-lg'
                  whileHover={buttonHover}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Resume
                </motion.a>

                <motion.a
                  href="mailto:shadrack.bett.92@gmail.com"
                  className='border-2 border-stone-400 hover:border-white
                          rounded-full px-8 py-4 text-stone-300 hover:text-white
                          font-semibold text-center
                          transition-colors duration-300'
                  whileHover={buttonHover}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
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
    )
  }

  export default Hero