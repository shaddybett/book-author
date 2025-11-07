import React, { useState, useEffect } from "react"
import { FaInstagram, FaFacebook } from "react-icons/fa"
import { FaSquareXTwitter } from "react-icons/fa6"
import { motion, AnimatePresence } from "framer-motion"
import logo from "../assets/M/M-1.png"

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track active section
  useEffect(() => {
    const sections = ['about', 'books', 'testimonials', 'genres', 'newsletter', 'contact']
    
    const handleScroll = () => {
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'books', label: 'Books' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'genres', label: 'Genres' },
    { id: 'newsletter', label: 'Newsletter' },
    { id: 'contact', label: 'Contact' }
  ]

  const socialLinks = [
    { icon: FaSquareXTwitter, href: "https://twitter.com/mercybettauthor", label: "Twitter" },
    { icon: FaInstagram, href: "https://www.instagram.com/mercy_chep_/", label: "Instagram" },
    { icon: FaFacebook, href: "https://www.facebook.com/Mer.langat", label: "Facebook" }
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-lg border-b border-stone-800/50 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button 
              onClick={scrollToTop} 
              aria-label="Home"
              className="relative group flex items-center gap-3"
            >
              {/* Logo with glow effect */}
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 to-stone-400/20 blur-lg"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.3, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <img 
                  src={logo} 
                  className={`relative transition-all duration-300 group-hover:brightness-110 
                           ${isScrolled ? 'w-14 h-14' : 'w-16 h-16'}
                           rounded-xl object-cover`}
                  alt="Mercy Langat Logo"
                />
              </div>
              
              {/* Brand text - hidden on very small screens */}
              {/* <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white via-stone-200 to-stone-400 
                             bg-clip-text text-transparent tracking-tight">
                  Mercy Langat
                </h1>
                <p className="text-xs text-stone-400 tracking-wide">Award-Winning Author</p>
              </div> */}
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-white'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-white/10 to-stone-400/10 rounded-full border border-stone-600/30"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
                
                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-white/5 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Social Links & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Social Links - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="text-stone-300 hover:text-white transition-all duration-200 
                           p-2.5 rounded-full hover:bg-white/5 border border-transparent 
                           hover:border-stone-700/50"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="lg:hidden p-2.5 rounded-lg text-stone-300 hover:text-white 
                       hover:bg-white/5 transition-colors duration-200 
                       border border-transparent hover:border-stone-700/50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <motion.div
                className="w-6 h-5 flex flex-col justify-between"
                animate={isMobileMenuOpen ? "open" : "closed"}
              >
                <motion.span
                  className="w-full h-0.5 bg-current rounded-full"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-current rounded-full"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-full h-0.5 bg-current rounded-full"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 }
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden mt-4 overflow-hidden"
            >
              <div className="bg-stone-900/60 backdrop-blur-lg rounded-2xl border border-stone-800/50 p-4">
                <div className="flex flex-col space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                        activeSection === item.id
                          ? 'text-white bg-white/10'
                          : 'text-stone-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>
                
                {/* Mobile Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="flex justify-center gap-6 mt-6 pt-4 border-t border-stone-800/50"
                >
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="text-stone-400 hover:text-white transition-colors duration-200 p-2"
                    >
                      <social.icon className="text-xl" />
                    </a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0 }}
      />
    </motion.nav>
  )
}

export default Navbar