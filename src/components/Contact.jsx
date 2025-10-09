import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUp, FiHeart, FiCode, FiCoffee } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiGithub, href: "https://github.com/shaddybett", label: "GitHub" },
    { icon: FiLinkedin, href: "https://www.linkedin.com/in/sbett/", label: "LinkedIn" },
    { icon: FiTwitter, href: "https://x.com/ShadrackBe32546", label: "Twitter" },
    { icon: FiMail, href: "mailto:shadrack.bett.92@gmail.com", label: "Email" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="relative mt-32 bg-gradient-to-b from-transparent to-stone-950/50">
      {/* Top border with animated gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-stone-700 to-transparent mb-16" />
      
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 
                   bg-gradient-to-r from-stone-800 to-stone-700 
                   border border-stone-600/50 rounded-full p-3
                   hover:from-stone-700 hover:to-stone-600
                   transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <FiArrowUp className="text-stone-200 text-lg" />
      </button>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          
          {/* Brand/Logo section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-stone-200 to-stone-400 
                         bg-clip-text text-transparent mb-4">
              Shadrack Bett
            </h3>
            <p className="text-stone-400 leading-relaxed mb-6">
              Full-stack developer passionate about creating beautiful, functional, 
              and user-centered digital experiences.
            </p>
            
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="bg-stone-800/40 backdrop-blur-sm border border-stone-700/40 
                           p-3 rounded-xl hover:bg-stone-700/60 hover:border-stone-600/60
                           transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="text-stone-300 group-hover:text-white transition-colors text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold mb-6 text-lg">Quick Links</h4>
            <div className="space-y-3">
              {[
                { name: 'About', id: 'about' },
                { name: 'Projects', id: 'projects' },
                { name: 'Experience', id: 'experience' },
                { name: 'Contact', id: 'contact' }
              ].map((link, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(link.id)}
                  className="block text-stone-400 hover:text-white transition-colors duration-200
                           hover:underline decoration-stone-500 underline-offset-4 text-left w-full"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold mb-6 text-lg">Let's Connect</h4>
            <div className="space-y-4">
              <p className="text-stone-400">
                Always open to discussing new opportunities and exciting projects.
              </p>
              <a
                href="mailto:shadrack.bett.92@gmail.com"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-stone-700 to-stone-600
                         px-6 py-3 rounded-xl text-white font-medium
                         hover:from-stone-600 hover:to-stone-500
                         transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FiMail className="text-lg" />
                Get In Touch
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-stone-700 to-transparent mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-stone-400 text-sm">
            <span>© {currentYear} Shadrack Bett</span>
            <span className="hidden md:block">•</span>
            <span className="hidden sm:flex items-center gap-1">
              Crafted with passion and precision <FiHeart className="text-red-400 text-xs" />
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-stone-500 text-xs">
            <span className="flex items-center gap-1">
              <FiCode className="text-sm" />
              React • Tailwind • Framer Motion
            </span>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 
                      bg-gradient-to-t from-stone-900/30 to-transparent -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 
                      bg-gradient-radial from-stone-800/10 to-transparent rounded-full blur-3xl -z-10" />
      </div>
    </footer>
  );
};

export default Footer;