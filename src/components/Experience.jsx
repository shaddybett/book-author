import { motion } from "framer-motion"
import { AUTHOR_BIO } from "../constants"
import { FiCalendar, FiMapPin, FiAward, FiBook } from "react-icons/fi"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
}

const experienceVariants = {
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

const timelineVariants = {
  hidden: { 
    opacity: 0, 
    scaleY: 0
  },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: "easeOut"
    }
  }
}

const About = () => {
  return (
    <div id="about" className="mt-16">
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
          About Me
        </h2>
        <p className="text-stone-400 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          My journey as a writer and the experiences that have shaped my storytelling
        </p>
      </motion.div>

      {/* Experience Timeline */}
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Timeline line - hidden on mobile, visible on larger screens */}
        <motion.div
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden lg:block absolute left-1/2 transform -translate-x-px h-full w-0.5 
                   bg-gradient-to-b from-stone-600 via-stone-500 to-stone-600"
          style={{ originY: 0 }}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12 lg:space-y-16"
        >
          {AUTHOR_BIO.map((bio, index) => (
            <motion.div
              key={index}
              variants={experienceVariants}
              className="group relative"
            >
              {/* Timeline dot - hidden on mobile */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-8">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.2 }}
                  className="w-4 h-4 bg-white rounded-full border-4 border-stone-800 
                           group-hover:bg-stone-200 transition-colors duration-300"
                />
              </div>

              <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12
                            ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                
                {/* Date Section */}
                <div className="w-full lg:w-5/12">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-inherit`}
                  >
                    <div className="bg-stone-800/30 backdrop-blur-sm border border-stone-700/30 
                                  rounded-xl p-4 inline-block">
                      <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                        <FiCalendar className="text-stone-400 text-sm" />
                        <span className="text-stone-300 font-medium text-sm">
                          {bio.year}
                        </span>
                      </div>
                      <div className="flex items-center justify-center lg:justify-start gap-2">
                        <FiMapPin className="text-stone-400 text-sm" />
                        <span className="text-stone-400 text-sm">
                          {bio.company}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-7/12">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-stone-800/40 backdrop-blur-sm border border-stone-700/40 
                             rounded-2xl p-6 lg:p-8 hover:bg-stone-800/60 hover:border-stone-600/60
                             transition-all duration-500 hover:shadow-2xl hover:shadow-stone-900/30
                             group-hover:transform group-hover:scale-[1.02]"
                  >
                    {/* Role Title */}
                    <h3 className="text-xl lg:text-2xl font-bold tracking-tight
                                 bg-gradient-to-r from-white to-stone-300 
                                 bg-clip-text text-transparent mb-3">
                      {bio.role}
                    </h3>

                    {/* Company */}
                    <div className="mb-4">
                      <span className="text-stone-400 font-medium">
                        {bio.company}
                      </span>
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                      <p className="text-stone-300 leading-relaxed text-base lg:text-lg">
                        {bio.description}
                      </p>
                    </div>

                    {/* Achievements */}
                    <div className="space-y-3">
                      <h4 className="text-stone-400 font-medium text-sm uppercase tracking-wider flex items-center gap-2">
                        <FiAward className="w-4 h-4" />
                        Key Achievements
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {bio.achievements.map((achievement, achievementIndex) => (
                          <motion.span
                            key={achievementIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                              duration: 0.3, 
                              delay: achievementIndex * 0.05,
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
                                     backdrop-blur-sm flex items-center gap-2"
                          >
                            <FiBook className="w-3 h-3" />
                            {achievement}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom accent */}
      {/* <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center mt-16"
      >
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-stone-500 to-transparent" />
      </motion.div> */}
    </div>
  )
}

export default About