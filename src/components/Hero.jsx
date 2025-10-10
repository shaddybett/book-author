import React from 'react'
import authorPic from "../assets/prof1.jpg"
import { HERO_CONTENT } from '../constants/index'
import { motion } from "framer-motion"
import { FiBookOpen, FiAward, FiUsers } from 'react-icons/fi'

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

const statsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.8
    }
  }
}

function Hero() {
  const stats = [
    { icon: FiBookOpen, value: "5+", label: "Published Books" },
    { icon: FiAward, value: "3+", label: "Literary Awards" },
    { icon: FiUsers, value: "50K+", label: "Readers Worldwide" }
  ]

  return (
    <div id="hero" className='pt-24 pb-4 lg:mb-36'>
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
              {/* Decorative glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-stone-400/10 
                            rounded-3xl blur-2xl scale-105" />
              
              <motion.img
                src={authorPic}
                alt='Mercy Bett - Award-Winning Author'
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
              
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                className="absolute -bottom-4 -right-4 bg-gradient-to-br from-white to-stone-200
                         px-4 py-3 rounded-xl shadow-2xl border border-stone-300"
              >
                <div className="flex items-center gap-2">
                  <FiAward className="text-yellow-600 text-lg" />
                  <div>
                    <p className="text-stone-800 font-bold text-sm">Award Winner</p>
                    <p className="text-stone-600 text-xs">2023</p>
                  </div>
                </div>
              </motion.div>
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
              className='text-stone-300 text-lg mb-2 mt-8 lg:mt-2 font-light'
            >
              Welcome! I'm
            </motion.p>

            <motion.h1
              variants={childVariants}
              className='pb-4 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 
                      font-bold tracking-tighter 
                      bg-gradient-to-r from-white via-stone-200 to-stone-400 
                      bg-clip-text text-transparent
                      leading-tight'
            >
              Mercy Bett
            </motion.h1>
            
            <motion.span
              variants={childVariants}
              className='bg-gradient-to-r from-white to-stone-200
                      bg-clip-text text-2xl sm:text-3xl lg:text-4xl 
                      tracking-tight text-transparent font-semibold'
            >
              Award-Winning Author
            </motion.span>
            
            <motion.p
              variants={childVariants}
              className='my-4 max-w-xl text-lg sm:text-xl 
                      leading-relaxed tracking-tight text-stone-300
                      text-center lg:text-left'
            >
              {HERO_CONTENT}
            </motion.p>
            
            {/* Stats */}
            <motion.div
              variants={statsVariants}
              className="grid grid-cols-3 gap-4 w-full max-w-xl my-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="bg-stone-800/30 backdrop-blur-sm border border-stone-700/30 
                           rounded-xl p-4 text-center hover:bg-stone-800/50 
                           hover:border-stone-600/50 transition-all duration-300"
                >
                  <stat.icon className="w-5 h-5 text-stone-400 mx-auto mb-2" />
                  <p className="text-white font-bold text-xl">{stat.value}</p>
                  <p className="text-stone-400 text-xs mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Action buttons */}
            <motion.div
              variants={childVariants}
              className="flex flex-col sm:flex-row gap-4 mt-4"
            >
              <motion.a
                href='#books'
                className='bg-white hover:bg-stone-100 rounded-full px-8 py-4 
                        text-stone-800 font-semibold text-center
                        transition-colors duration-300
                        shadow-lg'
                whileHover={buttonHover}
                whileTap={{ scale: 0.95 }}
              >
                Explore My Books
              </motion.a>

              <motion.a
                href="#newsletter"
                className='border-2 border-stone-400 hover:border-white
                        rounded-full px-8 py-4 text-stone-300 hover:text-white
                        font-semibold text-center
                        transition-colors duration-300'
                whileHover={buttonHover}
                whileTap={{ scale: 0.95 }}
              >
                Join Newsletter
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