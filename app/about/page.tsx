"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function AboutPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            About Me
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <div className="relative">
                <motion.div
                  className="w-80 h-80 mx-auto rounded-full overflow-hidden border-4 border-blue-200 dark:border-blue-800"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/images/aryan-profile.jpeg"
                    alt="Aryan Choudhary Profile"
                    width={320}
                    height={320}
                    className="object-cover"
                  />
                </motion.div>
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  👋
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Hello! I'm Aryan Choudhary</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                I'm a passionate Full Stack Developer with a strong background in modern web technologies and artificial
                intelligence. With expertise in React, Python, and machine learning, I love creating innovative
                solutions that make a real impact.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                My journey in tech started with curiosity about how things work, which led me to explore programming
                languages like C, C++, and Python. Today, I specialize in building scalable web applications and
                implementing AI-driven features that enhance user experiences.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or sharing knowledge with the developer community.
              </p>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">My Journey</h3>
            <div className="space-y-6">
              {[
                {
                  year: "2025",
                  title: "AI & Machine Learning Specialist",
                  description: "Focused on implementing AI solutions using Python, pandas, NumPy, and matplotlib",
                },
                {
                  year: "2024",
                  title: "Full Stack Developer",
                  description: "Mastered React ecosystem and MongoDB for building complete web applications",
                },
                {
                  year: "2022",
                  title: "Frontend Developer",
                  description: "Started with HTML, CSS, and JavaScript, then moved to React",
                },
                {
                  year: "2021",
                  title: "Programming Foundations",
                  description: "Learned programming fundamentals with C and C++",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-6 p-6 bg-gray-800 dark:bg-gray-800 rounded-lg"
                  initial={{ x: -50, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {item.year}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                    <p className="text-gray-300">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
