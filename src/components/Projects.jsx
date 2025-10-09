// import React, { useState, useRef } from 'react'
// import { PROJECTS } from '../constants/index'
// import { motion } from 'framer-motion'
// import { FiExternalLink, FiGithub, FiPlay } from 'react-icons/fi'

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.2,
//       delayChildren: 0.1
//     }
//   }
// }

// const projectVariants = {
//   hidden: { 
//     opacity: 0, 
//     y: 50,
//     scale: 0.95
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut"
//     }
//   }
// }

// const imageVariants = {
//   hidden: { 
//     opacity: 0, 
//     x: -50,
//     scale: 0.9
//   },
//   visible: {
//     opacity: 1,
//     x: 0,
//     scale: 1,
//     transition: {
//       duration: 0.7,
//       ease: "easeOut"
//     }
//   }
// }

// const contentVariants = {
//   hidden: { 
//     opacity: 0, 
//     x: 50
//   },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: 0.7,
//       delay: 0.2,
//       ease: "easeOut"
//     }
//   }
// }

// function Projects() {
//   return (
//     <div id="projects" className="mt-16">
//       {/* Header Section */}
//       <motion.div
//         initial={{ opacity: 0, y: -30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6 }}
//         className="text-center mb-16"
//       >
//         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight
//                      bg-gradient-to-r from-white via-stone-200 to-stone-400 
//                      bg-clip-text text-transparent mb-4">
//           Featured Projects
//         </h2>
//         <p className="text-stone-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
//           A showcase of my recent work and the technologies I've used to bring ideas to life
//         </p>
//       </motion.div>

//       {/* Projects Grid */}
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-100px" }}
//         className="space-y-16 lg:space-y-24"
//       >
//         {PROJECTS.map((project, index) => (
//           <ProjectCard key={index} project={project} index={index} />
//         ))}
//       </motion.div>

//       {/* Bottom accent */}
//       <motion.div
//         initial={{ opacity: 0, scaleX: 0 }}
//         whileInView={{ opacity: 1, scaleX: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//         className="flex justify-center mt-16"
//       >
//         <div className="h-px w-32 bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
//       </motion.div>
//     </div>
//   )
// }

// function ProjectCard({ project, index }) {
//   const [showVideo, setShowVideo] = useState(false)
//   const videoRef = useRef(null)

//   const handleMouseEnter = () => {
//     if (project.video) {
//       setShowVideo(true)
//       setTimeout(() => {
//         if (videoRef.current) {
//           videoRef.current.play()
//         }
//       }, 200) // Small delay for smooth transition
//     }
//   }

//   const handleMouseLeave = () => {
//     if (videoRef.current) {
//       videoRef.current.pause()
//       videoRef.current.currentTime = 0
//     }
//     setTimeout(() => setShowVideo(false), 300) // Delay to allow fade out
//   }

//   return (
//     <motion.div
//       variants={projectVariants}
//       className="group"
//     >
//       <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12
//                     ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
        
//         {/* Project Media */}
//         <motion.div
//           variants={imageVariants}
//           className="w-full lg:w-1/2"
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <div className="relative overflow-hidden rounded-2xl bg-stone-800/40 
//                         border border-stone-700/40 backdrop-blur-sm
//                         group-hover:border-stone-600/60 transition-all duration-500
//                         hover:shadow-2xl hover:shadow-stone-900/30
//                         aspect-video"> {/* Fixed 16:9 aspect ratio */}
            
//             {/* Static Image */}
//             <img
//               src={project.image}
//               alt={project.title}
//               className={`w-full h-full object-cover transform 
//                        transition-all duration-500
//                        ${showVideo ? 'scale-105 opacity-0' : 'group-hover:scale-105 opacity-100'}`}
//             />
            
//             {/* Video (if available) */}
//             {project.video && (
//               <video
//                 ref={videoRef}
//                 src={project.video}
//                 muted
//                 loop
//                 playsInline
//                 className={`absolute inset-0 w-full h-full object-cover 
//                          transition-opacity duration-300
//                          ${showVideo ? 'opacity-100' : 'opacity-0'}`}
//                 onLoadStart={() => {
//                   if (videoRef.current) {
//                     videoRef.current.currentTime = 0
//                   }
//                 }}
//               />
//             )}
            
//             {/* Video indicator */}
//             {project.video && !showVideo && (
//               <div className="absolute top-4 right-4 z-10">
//                 <div className="bg-stone-800/80 backdrop-blur-sm rounded-full p-2 
//                               border border-stone-600/50">
//                   <FiPlay className="w-4 h-4 text-white" />
//                 </div>
//               </div>
//             )}
            
//             {/* Overlay gradient */}
//             <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
//             {/* Hover overlay with links */}
//             <div className="absolute inset-0 z-20 flex items-center justify-center 
//                           opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <div className="flex gap-4">
//                 {project.link && (
//                   <motion.a
//                     href={project.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="bg-white/90 hover:bg-white text-stone-800 
//                              p-3 rounded-full transition-colors duration-200
//                              shadow-lg hover:shadow-xl"
//                   >
//                     <FiExternalLink className="w-5 h-5" />
//                   </motion.a>
//                 )}
//                 {project.githubLink && (
//                   <motion.a
//                     href={project.githubLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="bg-stone-800/90 hover:bg-stone-700 text-white 
//                              p-3 rounded-full transition-colors duration-200
//                              shadow-lg hover:shadow-xl border border-stone-600"
//                   >
//                     <FiGithub className="w-5 h-5" />
//                   </motion.a>
//                 )}
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Project Content */}
//         <motion.div
//           variants={contentVariants}
//           className="w-full lg:w-1/2 space-y-6"
//         >
//           <div>
//             <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight
//                          bg-gradient-to-r from-white to-stone-300 
//                          bg-clip-text text-transparent mb-4">
//               {project.title}
//             </h3>
            
//             <div className="bg-stone-800/30 backdrop-blur-sm border border-stone-700/30 
//                           rounded-xl p-6 mb-6">
//               <p className="text-stone-300 leading-relaxed text-base lg:text-lg">
//                 {project.description}
//               </p>
//             </div>
//           </div>

//           {/* Technologies */}
//           <div className="space-y-3">
//             <h4 className="text-stone-400 font-medium text-sm uppercase tracking-wider">
//               Built With
//             </h4>
//             <div className="flex flex-wrap gap-2">
//               {project.technologies.map((tech, techIndex) => (
//                 <motion.span
//                   key={techIndex}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ 
//                     duration: 0.3, 
//                     delay: techIndex * 0.05,
//                     ease: "easeOut"
//                   }}
//                   whileHover={{ 
//                     scale: 1.05,
//                     transition: { duration: 0.2 }
//                   }}
//                   className="bg-stone-700/40 hover:bg-stone-600/40 
//                            border border-stone-600/40 hover:border-stone-500/60
//                            text-stone-200 hover:text-white
//                            px-3 py-1.5 rounded-full text-sm font-medium
//                            transition-all duration-200 cursor-default
//                            backdrop-blur-sm"
//                 >
//                   {tech}
//                 </motion.span>
//               ))}
//             </div>
//           </div>

//           {/* Action Links */}
//           <div className="flex flex-wrap gap-4 pt-2">
//             {project.link && (
//               <motion.a
//                 href={project.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ 
//                   scale: 1.02,
//                   boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
//                 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="bg-white hover:bg-stone-100 text-stone-800 
//                          px-6 py-3 rounded-full font-semibold
//                          transition-colors duration-200 flex items-center gap-2
//                          shadow-lg"
//               >
//                 <FiExternalLink className="w-4 h-4" />
//                 View Live
//               </motion.a>
//             )}
            
//             {project.githubLink && (
//               <motion.a
//                 href={project.githubLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ 
//                   scale: 1.02,
//                   boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
//                 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="border-2 border-stone-400 hover:border-white
//                          text-stone-300 hover:text-white
//                          px-6 py-3 rounded-full font-semibold
//                          transition-colors duration-200 flex items-center gap-2"
//               >
//                 <FiGithub className="w-4 h-4" />
//                 View Code
//               </motion.a>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   )
// }

// export default Projects







// import React, { useState, useRef } from 'react'
// import { PROJECTS } from '../constants/index'
// import { motion } from 'framer-motion'
// import { FiExternalLink, FiGithub, FiPlay } from 'react-icons/fi'

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.2,
//       delayChildren: 0.1
//     }
//   }
// }

// const projectVariants = {
//   hidden: { 
//     opacity: 0, 
//     y: 50,
//     scale: 0.95
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut"
//     }
//   }
// }

// const imageVariants = {
//   hidden: { 
//     opacity: 0, 
//     x: -50,
//     scale: 0.9
//   },
//   visible: {
//     opacity: 1,
//     x: 0,
//     scale: 1,
//     transition: {
//       duration: 0.7,
//       ease: "easeOut"
//     }
//   }
// }

// const contentVariants = {
//   hidden: { 
//     opacity: 0, 
//     x: 50
//   },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: {
//       duration: 0.7,
//       delay: 0.2,
//       ease: "easeOut"
//     }
//   }
// }

// function Projects() {
//   return (
//     <div id="projects" className="mt-16">
//       {/* Header Section */}
//       <motion.div
//         initial={{ opacity: 0, y: -30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6 }}
//         className="text-center mb-16"
//       >
//         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight
//                      bg-gradient-to-r from-white via-stone-200 to-stone-400 
//                      bg-clip-text text-transparent mb-4">
//           Featured Projects
//         </h2>
//         <p className="text-stone-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
//           A showcase of my recent work and the technologies I've used to bring ideas to life
//         </p>
//       </motion.div>

//       {/* Projects Grid */}
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-100px" }}
//         className="space-y-16 lg:space-y-24"
//       >
//         {PROJECTS.map((project, index) => (
//           <ProjectCard key={index} project={project} index={index} />
//         ))}
//       </motion.div>

//       {/* Bottom accent */}
//       <motion.div
//         initial={{ opacity: 0, scaleX: 0 }}
//         whileInView={{ opacity: 1, scaleX: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//         className="flex justify-center mt-16"
//       >
//         <div className="h-px w-32 bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
//       </motion.div>
//     </div>
//   )
// }

// function ProjectCard({ project, index }) {
//   const [showVideo, setShowVideo] = useState(false)
//   const videoRef = useRef(null)

//   // Handle both camelCase (githubLink) and snake_case (github_link) naming conventions
//   const githubUrl = project.githubLink || project.github_link

//   const handleMouseEnter = () => {
//     if (project.video) {
//       setShowVideo(true)
//       setTimeout(() => {
//         if (videoRef.current) {
//           videoRef.current.play()
//         }
//       }, 200) // Small delay for smooth transition
//     }
//   }

//   const handleMouseLeave = () => {
//     if (videoRef.current) {
//       videoRef.current.pause()
//       videoRef.current.currentTime = 0
//     }
//     setTimeout(() => setShowVideo(false), 300) // Delay to allow fade out
//   }

//   return (
//     <motion.div
//       variants={projectVariants}
//       className="group"
//     >
//       <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12
//                     ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
        
//         {/* Project Media */}
//         <motion.div
//           variants={imageVariants}
//           className="w-full lg:w-1/2"
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <div className="relative overflow-hidden rounded-2xl bg-stone-800/40 
//                         border border-stone-700/40 backdrop-blur-sm
//                         group-hover:border-stone-600/60 transition-all duration-500
//                         hover:shadow-2xl hover:shadow-stone-900/30
//                         aspect-video"> {/* Fixed 16:9 aspect ratio */}
            
//             {/* Static Image */}
//             <img
//               src={project.image}
//               alt={project.title}
//               className={`w-full h-full object-cover transform 
//                        transition-all duration-500
//                        ${showVideo ? 'scale-105 opacity-0' : 'group-hover:scale-105 opacity-100'}`}
//             />
            
//             {/* Video (if available) */}
//             {project.video && (
//               <video
//                 ref={videoRef}
//                 src={project.video}
//                 muted
//                 loop
//                 playsInline
//                 className={`absolute inset-0 w-full h-full object-cover 
//                          transition-opacity duration-300
//                          ${showVideo ? 'opacity-100' : 'opacity-0'}`}
//                 onLoadStart={() => {
//                   if (videoRef.current) {
//                     videoRef.current.currentTime = 0
//                   }
//                 }}
//               />
//             )}
            
//             {/* Video indicator */}
//             {project.video && !showVideo && (
//               <div className="absolute top-4 right-4 z-10">
//                 <div className="bg-stone-800/80 backdrop-blur-sm rounded-full p-2 
//                               border border-stone-600/50">
//                   <FiPlay className="w-4 h-4 text-white" />
//                 </div>
//               </div>
//             )}
            
//             {/* Overlay gradient */}
//             <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
//             {/* Hover overlay with links */}
//             <div className="absolute inset-0 z-20 flex items-center justify-center 
//                           opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <div className="flex gap-4">
//                 {project.link && (
//                   <motion.a
//                     href={project.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="bg-white/90 hover:bg-white text-stone-800 
//                              p-3 rounded-full transition-colors duration-200
//                              shadow-lg hover:shadow-xl"
//                   >
//                     <FiExternalLink className="w-5 h-5" />
//                   </motion.a>
//                 )}
//                 {githubUrl && (
//                   <motion.a
//                     href={githubUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="bg-stone-800/90 hover:bg-stone-700 text-white 
//                              p-3 rounded-full transition-colors duration-200
//                              shadow-lg hover:shadow-xl border border-stone-600"
//                   >
//                     <FiGithub className="w-5 h-5" />
//                   </motion.a>
//                 )}
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Project Content */}
//         <motion.div
//           variants={contentVariants}
//           className="w-full lg:w-1/2 space-y-6"
//         >
//           <div>
//             <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight
//                          bg-gradient-to-r from-white to-stone-300 
//                          bg-clip-text text-transparent mb-4">
//               {project.title}
//             </h3>
            
//             <div className="bg-stone-800/30 backdrop-blur-sm border border-stone-700/30 
//                           rounded-xl p-6 mb-6">
//               <p className="text-stone-300 leading-relaxed text-base lg:text-lg">
//                 {project.description}
//               </p>
//             </div>
//           </div>

//           {/* Technologies */}
//           <div className="space-y-3">
//             <h4 className="text-stone-400 font-medium text-sm uppercase tracking-wider">
//               Built With
//             </h4>
//             <div className="flex flex-wrap gap-2">
//               {project.technologies.map((tech, techIndex) => (
//                 <motion.span
//                   key={techIndex}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ 
//                     duration: 0.3, 
//                     delay: techIndex * 0.05,
//                     ease: "easeOut"
//                   }}
//                   whileHover={{ 
//                     scale: 1.05,
//                     transition: { duration: 0.2 }
//                   }}
//                   className="bg-stone-700/40 hover:bg-stone-600/40 
//                            border border-stone-600/40 hover:border-stone-500/60
//                            text-stone-200 hover:text-white
//                            px-3 py-1.5 rounded-full text-sm font-medium
//                            transition-all duration-200 cursor-default
//                            backdrop-blur-sm"
//                 >
//                   {tech}
//                 </motion.span>
//               ))}
//             </div>
//           </div>

//           {/* Action Links */}
//           <div className="flex flex-wrap gap-4 pt-2">
//             {project.link && (
//               <motion.a
//                 href={project.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ 
//                   scale: 1.02,
//                   boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
//                 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="bg-white hover:bg-stone-100 text-stone-800 
//                          px-6 py-3 rounded-full font-semibold
//                          transition-colors duration-200 flex items-center gap-2
//                          shadow-lg"
//               >
//                 <FiExternalLink className="w-4 h-4" />
//                 View Live
//               </motion.a>
//             )}
            
//             {githubUrl && (
//               <motion.a
//                 href={githubUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 whileHover={{ 
//                   scale: 1.02,
//                   boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
//                 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="border-2 border-stone-400 hover:border-white
//                          text-stone-300 hover:text-white
//                          px-6 py-3 rounded-full font-semibold
//                          transition-colors duration-200 flex items-center gap-2"
//               >
//                 <FiGithub className="w-4 h-4" />
//                 View Code
//               </motion.a>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   )
// }

// export default Projects







import React, { useState, useRef, useEffect } from 'react'
import { PROJECTS } from '../constants/index'
import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiPlay } from 'react-icons/fi'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

const projectVariants = {
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
}

const imageVariants = {
  hidden: { 
    opacity: 0, 
    x: -50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
}

const contentVariants = {
  hidden: { 
    opacity: 0, 
    x: 50
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      delay: 0.2,
      ease: "easeOut"
    }
  }
}

function Projects() {
  return (
    <div id="projects" className="mt-16">
      {/* Header Section */}
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
          Featured Projects
        </h2>
        <p className="text-stone-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          A showcase of my recent work and the technologies I've used to bring ideas to life
        </p>
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-16 lg:space-y-24"
      >
        {PROJECTS.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
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
  )
}

function ProjectCard({ project, index }) {
  const [showVideo, setShowVideo] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [playbackError, setPlaybackError] = useState(false)
  const videoRef = useRef(null)

  // Handle both camelCase (githubLink) and snake_case (github_link) naming conventions
  const githubUrl = project.githubLink || project.github_link

  // Preload video when component mounts
  useEffect(() => {
    if (project.video && videoRef.current) {
      const video = videoRef.current
      
      const handleCanPlay = () => {
        setVideoLoaded(true)
        setPlaybackError(false)
      }

      const handleError = () => {
        setPlaybackError(true)
        console.warn(`Failed to load video for project: ${project.title}`)
      }

      video.addEventListener('canplay', handleCanPlay)
      video.addEventListener('error', handleError)
      
      // Preload the video
      video.load()

      return () => {
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('error', handleError)
      }
    }
  }, [project.video, project.title])

  const handleMouseEnter = async () => {
    if (project.video && videoRef.current && videoLoaded && !playbackError) {
      setShowVideo(true)
      
      try {
        // Small delay for smooth transition
        setTimeout(async () => {
          if (videoRef.current) {
            videoRef.current.currentTime = 0
            const playPromise = videoRef.current.play()
            
            if (playPromise !== undefined) {
              await playPromise.catch(error => {
                console.warn('Video play failed:', error)
                setPlaybackError(true)
              })
            }
          }
        }, 200)
      } catch (error) {
        console.warn('Video play error:', error)
        setPlaybackError(true)
      }
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    setTimeout(() => setShowVideo(false), 300) // Delay to allow fade out
  }

  return (
    <motion.div
      variants={projectVariants}
      className="group"
    >
      <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12
                    ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
        
        {/* Project Media */}
        <motion.div
          variants={imageVariants}
          className="w-full lg:w-1/2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative overflow-hidden rounded-2xl bg-stone-800/40 
                        border border-stone-700/40 backdrop-blur-sm
                        group-hover:border-stone-600/60 transition-all duration-500
                        hover:shadow-2xl hover:shadow-stone-900/30
                        aspect-video"> {/* Fixed 16:9 aspect ratio */}
            
            {/* Static Image */}
            <img
              src={project.image}
              alt={project.title}
              className={`w-full h-full object-cover transform 
                       transition-all duration-500
                       ${showVideo && videoLoaded && !playbackError ? 'scale-105 opacity-0' : 'group-hover:scale-105 opacity-100'}`}
            />
            
            {/* Video (if available) */}
            {project.video && (
              <video
                ref={videoRef}
                src={project.video}
                muted
                loop
                playsInline
                preload="metadata"
                webkit-playsinline="true"
                className={`absolute inset-0 w-full h-full object-cover 
                         transition-opacity duration-300
                         ${showVideo && videoLoaded && !playbackError ? 'opacity-100' : 'opacity-0'}`}
                onLoadedData={() => {
                  setVideoLoaded(true)
                  setPlaybackError(false)
                }}
                onError={() => {
                  setPlaybackError(true)
                  console.warn(`Video error for project: ${project.title}`)
                }}
                onLoadStart={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0
                  }
                }}
              />
            )}
            
            {/* Video indicator - only show if video is available and not in error state */}
            {project.video && !showVideo && !playbackError && (
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-stone-800/80 backdrop-blur-sm rounded-full p-2 
                              border border-stone-600/50">
                  <FiPlay className="w-4 h-4 text-white" />
                </div>
              </div>
            )}
            
            {/* Loading indicator */}
            {project.video && !videoLoaded && !playbackError && (
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-stone-800/80 backdrop-blur-sm rounded-full p-2 
                              border border-stone-600/50">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            )}
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Hover overlay with links */}
            <div className="absolute inset-0 z-20 flex items-center justify-center 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex gap-4">
                {project.link && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/90 hover:bg-white text-stone-800 
                             p-3 rounded-full transition-colors duration-200
                             shadow-lg hover:shadow-xl"
                  >
                    <FiExternalLink className="w-5 h-5" />
                  </motion.a>
                )}
                {/* {githubUrl && (
                  <motion.a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-stone-800/90 hover:bg-stone-700 text-white 
                             p-3 rounded-full transition-colors duration-200
                             shadow-lg hover:shadow-xl border border-stone-600"
                  >
                    <FiGithub className="w-5 h-5" />
                  </motion.a>
                )} */}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Content */}
        <motion.div
          variants={contentVariants}
          className="w-full lg:w-1/2 space-y-6"
        >
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight
                         bg-gradient-to-r from-white to-stone-300 
                         bg-clip-text text-transparent mb-4">
              {project.title}
            </h3>
            
            <div className="bg-stone-800/30 backdrop-blur-sm border border-stone-700/30 
                          rounded-xl p-6 mb-6">
              <p className="text-stone-300 leading-relaxed text-base lg:text-lg">
                {project.description}
              </p>
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-3">
            <h4 className="text-stone-400 font-medium text-sm uppercase tracking-wider">
              Built With
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <motion.span
                  key={techIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.3, 
                    delay: techIndex * 0.05,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className="bg-stone-700/40 hover:bg-stone-600/40 
                           border border-stone-600/40 hover:border-stone-500/60
                           text-stone-200 hover:text-white
                           px-3 py-1.5 rounded-full text-sm font-medium
                           transition-all duration-200 cursor-default
                           backdrop-blur-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap gap-4 pt-2">
            {project.link && (
              <motion.a
                href={project.link}
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
                View Live
              </motion.a>
            )}
            
            {/* {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
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
                <FiGithub className="w-4 h-4" />
                View Code
              </motion.a>
            )} */}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Projects