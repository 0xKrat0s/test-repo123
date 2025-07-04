import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import { LinkedIn, Email, GitHub } from "./SocialButtons";
import { motion } from "framer-motion";

export default function Hero({ onProjectsClick, onKnowMeClick }) {
  return (
    <section className="relative flex flex-col justify-center min-h-screen items-center bg-gradient-to-br from-black via-gray-900 to-black px-2 pt-20 pb-6 sm:px-4 sm:py-8 sm:pt-8 overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-primary-600/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
      
      <div className="flex flex-col lg:flex-row gap-8 sm:gap-16 max-w-6xl w-full mx-auto items-center justify-center relative z-10">
        {/* Modern Profile Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl flex flex-col items-center p-6 sm:p-10 w-full max-w-sm">
            {/* Profile Image with modern frame */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl blur-sm"></div>
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
            <Image
              src="/images/profile-picture.jpg"
              alt="Photo of Muhsin Bin Irshad"
                  width={144}
                  height={144}
              className="object-cover w-full h-full"
              priority={true}
            />
          </div>
              {/* Status indicator */}
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-3 border-white shadow-lg">
                <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Name and title with modern typography */}
            <h2 className="text-white text-2xl sm:text-3xl font-black mb-2 text-center tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Muhsin Bin Irshad
          </h2>
            <div className="text-primary-400 text-sm sm:text-base text-center mb-1 font-bold tracking-widest uppercase">
            Security Engineer
          </div>
            <div className="text-gray-400 text-xs sm:text-sm text-center mb-4 font-medium">
            Kerala, India
          </div>
          
            {/* Social links with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="flex flex-row gap-4 sm:gap-5 mb-6"
            aria-label="Social Links"
          >
              <motion.div whileHover={{ scale: 1.1, y: -2 }} className="transition-all duration-200">
                <LinkedIn username="muhsinbinirshad" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, y: -2 }} className="transition-all duration-200">
                <Email mailId="muhsinhaseeb@gmail.com" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, y: -2 }} className="transition-all duration-200">
                <GitHub username="muhsinbinirshad" />
              </motion.div>
          </motion.div>
            
            {/* Modern connect button */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 sm:py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold text-base shadow-lg hover:shadow-primary-500/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 text-center tracking-wide border border-primary-500/30"
            href="https://linkedin.com/in/muhsinbinirshad"
            target="_blank"
            rel="noopener noreferrer"
          >
              Connect with Me
            </motion.a>
        </div>
        </motion.div>

        {/* Main Content with modern design */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 flex flex-col items-center lg:items-start mt-8 lg:mt-0 w-full"
        >
          {/* Main heading with unique styling */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-center lg:text-left leading-tight tracking-tight mb-2">
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                Security Engineer
              </span>
          </h1>
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-center lg:text-left text-white tracking-wide">
              Specializing in Application Security
            </h2>
          </div>
          
          {/* Expertise grid with modern styling */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-6 justify-center lg:justify-start">
            {['Web', 'API', 'Mobile', 'Cloud', 'GraphQL', 'Network', 'OSINT', 'Red Teaming'].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                className="group relative"
              >
                <div className="px-6 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-white/5 to-white/10 border border-white/10 text-white text-xs font-semibold tracking-wide backdrop-blur-sm text-center hover:bg-gradient-to-r hover:from-primary-500/20 hover:to-primary-600/20 hover:border-primary-500/30 transition-all duration-300 cursor-default">
                  {skill}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/0 to-primary-600/0 group-hover:from-primary-500/10 group-hover:to-primary-600/10 transition-all duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Description with enhanced styling */}
          <div className="relative mb-8 sm:mb-10">
            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600 rounded-full opacity-60"></div>
            <p className="text-gray-300 text-sm sm:text-base text-center lg:text-left max-w-2xl sm:max-w-3xl ml-2 font-medium leading-relaxed pl-4">
            Dynamic security engineer with hands-on experience in vulnerability assessment, penetration testing, and red teaming. Passionate about open-source, OSINT, and continuous learning. Dedicated to helping organizations secure their digital assets and innovate safely.
          </p>
          </div>
          
          {/* CTA Button with modern design */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-2 justify-center lg:justify-start w-full max-w-xs sm:max-w-none"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 rounded-xl border-2 border-primary-500/50 text-primary-400 font-bold text-sm sm:text-base hover:bg-primary-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-lg hover:shadow-primary-500/25 backdrop-blur-sm"
              onClick={onProjectsClick}
            >
              <span className="flex items-center justify-center">
                Explore My Work
                <BsArrowRight className="ml-2 inline-block text-lg align-middle group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 