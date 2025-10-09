// import { BiLogoPostgresql } from "react-icons/bi"
// import { RiReactjsLine } from "react-icons/ri"
// import { TbBrandNextjs } from "react-icons/tb"
// import { SiJavascript } from "react-icons/si"
// import { DiRedis } from "react-icons/di"
// import { FaNodeJs, FaPython } from "react-icons/fa"
// import { motion } from "framer-motion"

// const iconVariants = (duration) => ({
//   initial: { y: -10 },
//   animate: {
//     y: [10, -10],
//     transition: {
//       ease: "linear",
//       repeat: Infinity,
//       duration,
//       repeatType: "reverse",
//     },
//   },
// })

// const techIcons = [
//   { Icon: RiReactjsLine, color: "text-cyan-400", duration: 2.5 },
//   { Icon: FaPython, color: "text-cyan-500", duration: 3 },
//   { Icon: SiJavascript, color: "text-cyan-500", duration: 5 },
//   { Icon: DiRedis, color: "text-red-700", duration: 4 },
//   { Icon: FaNodeJs, color: "text-green-500", duration: 6 },
//   { Icon: BiLogoPostgresql, color: "text-sky-700", duration: 4 },
// ]

// function Technologies() {
//   return (
//     <div className="pb-24">
//       <motion.h2
//         whileInView={{ opacity: 1, y: 0 }}
//         initial={{ opacity: 0, y: -100 }}
//         transition={{ duration: 1.5 }}
//         className="my-20 text-center text-4xl"
//       >
//         Technologies
//       </motion.h2>

//       <motion.div
//         whileInView={{ opacity: 1, x: 0 }}
//         initial={{ opacity: 0, x: -100 }}
//         transition={{ duration: 1.5 }}
//         className="flex flex-wrap justify-center items-center gap-4"
//       >
//         {techIcons.map(({ Icon, color, duration }, index) => (
//           <motion.div
//             key={index}
//             initial="initial"
//             animate="animate"
//             variants={iconVariants(duration)}
//             className="p-4"
//           >
//             <Icon className={`text-7xl ${color}`} />
//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   )
// }

// export default Technologies





import { BiLogoPostgresql } from "react-icons/bi"
import { RiReactjsLine } from "react-icons/ri"
import { SiJavascript, SiFlask, SiTailwindcss, SiHtml5, SiCss3, SiGit, SiGithub } from "react-icons/si"
import { FaNodeJs, FaPython } from "react-icons/fa"
import { motion } from "framer-motion"

const techStack = [
  { Icon: FaPython, name: "Python" },
  { Icon: SiJavascript, name: "JavaScript" },
  { Icon: RiReactjsLine, name: "React" },
  { Icon: SiFlask, name: "Flask" },
  { Icon: FaNodeJs, name: "Node.js" },
  { Icon: BiLogoPostgresql, name: "PostgreSQL" },
  { Icon: SiTailwindcss, name: "Tailwind" },
  { Icon: SiGit, name: "Git" },
  { Icon: SiGithub, name: "GitHub" },
  { Icon: SiHtml5, name: "HTML5" },
  { Icon: SiCss3, name: "CSS3" }
]

// Duplicate for seamless loop
const duplicatedTechStack = [...techStack, ...techStack]

function Technologies() {
  return (
    <div className="mt-16 pb-16 overflow-hidden">
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
          Technologies
        </h2>
        <p className="text-stone-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Tools and technologies I use to build exceptional digital experiences
        </p>
      </motion.div>

      {/* Desktop/Tablet Grid */}
      <div className="hidden sm:block">
        <div className="relative">
          {/* Smoother gradient overlays */}
          <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent z-10" />
          <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-stone-950 via-stone-950/80 to-transparent z-10" />
          
          <motion.div
            animate={{ x: [0, -1800] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,  // Slightly slower
                ease: "linear",
              },
            }}
            className="flex gap-6 py-8"
            style={{ width: "fit-content" }}
          >
            {duplicatedTechStack.map(({ Icon, name }, index) => (
              <motion.div
                key={index}
                whileHover={{ 
                  scale: 1.05,
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group flex-shrink-0 cursor-pointer"
              >
                <div className="relative bg-stone-800/40 backdrop-blur-sm 
                             border border-stone-700/40 rounded-2xl p-6 text-center 
                             min-w-[130px] hover:bg-stone-800/60 hover:border-stone-600/60
                             transition-all duration-300 hover:shadow-xl hover:shadow-stone-900/30">
                  
                  <div className="flex justify-center items-center mb-4">
                    <Icon className="text-3xl text-stone-300 group-hover:text-white 
                                   transition-colors duration-300" />
                  </div>
                  
                  <h3 className="text-stone-200 font-medium text-sm
                               group-hover:text-white transition-colors duration-300">
                    {name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile Grid - Static */}
      <div className="sm:hidden">
        <div className="grid grid-cols-2 gap-4 px-4 max-w-sm mx-auto">
          {techStack.map(({ Icon, name }, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileTap={{ scale: 0.95 }}
              className="group"
            >
              <div className="bg-stone-800/40 backdrop-blur-sm border border-stone-700/40 
                           rounded-xl p-4 text-center hover:bg-stone-800/60 
                           hover:border-stone-600/60 transition-all duration-300 
                           active:scale-95">
                
                <div className="flex justify-center items-center mb-3">
                  <Icon className="text-2xl text-stone-300 group-hover:text-white 
                                 transition-colors duration-300" />
                </div>
                
                <h3 className="text-stone-200 font-medium text-xs
                             group-hover:text-white transition-colors duration-300">
                  {name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

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

export default Technologies