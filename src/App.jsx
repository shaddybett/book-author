import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/Experience'
import Books from './components/Books'
import Testimonials from './components/Testimonials'
import WritingGenres from './components/Technologies'
import Newsletter from './components/Newsletter'
import Contact from './components/Contact'

function App() {
  return (
    <div className='overflow-x-hidden text-stone-300 antialiased'>
      {/* Background */}
      <div className='fixed inset-0 -z-10'>
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 
                      bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        </div>
      </div>
      
      <div className='container mx-auto px-8'>
        <Navbar />
        <Hero />
        <About />
        <Books />
        <Testimonials />
        <WritingGenres />
        <Newsletter />
        <Contact />
      </div>
    </div>
  )
}

export default App