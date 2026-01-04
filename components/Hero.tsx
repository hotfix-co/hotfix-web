"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SiDotnet, SiReact, SiGo, SiKotlin, SiSwift } from "react-icons/si";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 -z-10" />
      
      {/* Animated circles */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-[var(--primary-red)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-[var(--primary-orange)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Logo */}
        <motion.div 
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/logo_without_bg.png"
            alt="HOTFIX Logo"
            width={400}
            height={250}
            className="h-40 w-auto"
            priority
          />
        </motion.div>

        {/* Headline */}
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Building <span className="text-gradient">Exceptional</span>
          <br />
          Software Solutions
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Full-stack and mobile development expertise in C#, React, Golang, Kotlin, and Swift.
          We transform ideas into robust, scalable applications.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link
            href="/services"
            className="px-8 py-4 rounded-lg gradient-primary text-white font-semibold text-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl hover:scale-105 transform transition-transform duration-200"
          >
            View Our Services
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-lg bg-white text-gray-900 font-semibold text-lg border-2 border-gray-300 hover:border-[var(--primary-red)] transition-colors shadow-md hover:scale-105 transform transition-transform duration-200"
          >
            Get In Touch
          </Link>
        </motion.div>

        {/* Tech Stack Icons */}
        <motion.div 
          className="mt-20 pt-12 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-sm uppercase tracking-wide text-gray-500 mb-8 font-semibold">
            Our Technology Stack
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              { icon: SiDotnet, label: ".NET", color: "text-[#512BD4]" },
              { icon: SiReact, label: "React", color: "text-[#61DAFB]" },
              { icon: SiGo, label: "Golang", color: "text-[#00ADD8]" },
              { icon: SiKotlin, label: "Kotlin", color: "text-[#7F52FF]" },
              { icon: SiSwift, label: "Swift", color: "text-[#F05138]" }
            ].map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <motion.div 
                  key={tech.label}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className={`w-16 h-16 flex items-center justify-center ${tech.color}`}>
                    <IconComponent className="text-5xl" />
                  </div>
                  <span className="text-sm text-gray-600 mt-2">{tech.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

