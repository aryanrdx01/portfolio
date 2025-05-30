"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Code, Database, Brain } from "lucide-react"

export default function SkillsPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Code className="w-8 h-8" />,
      skills: [
        { name: "HTML", level: 95, color: "bg-orange-500" },
        { name: "CSS", level: 90, color: "bg-blue-500" },
        { name: "JavaScript", level: 88, color: "bg-yellow-500" },
        { name: "React", level: 92, color: "bg-cyan-500" },
        { name: "WordPress", level: 85, color: "bg-blue-600" },
      ],
    },
    {
      title: "Backend & Database",
      icon: <Database className="w-8 h-8" />,
      skills: [
        { name: "MongoDB", level: 85, color: "bg-green-500" },
        { name: "C", level: 80, color: "bg-gray-600" },
        { name: "C++", level: 82, color: "bg-blue-600" },
      ],
    },
    {
      title: "Data Science & AI",
      icon: <Brain className="w-8 h-8" />,
      skills: [
        { name: "Python", level: 90, color: "bg-blue-400" },
        { name: "Pandas", level: 85, color: "bg-purple-500" },
        { name: "NumPy", level: 88, color: "bg-indigo-500" },
        { name: "Matplotlib", level: 80, color: "bg-red-500" },
        { name: "AI & ML", level: 85, color: "bg-pink-500" },
      ],
    },
  ]

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
          className="max-w-6xl mx-auto"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            My Skills
          </motion.h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="relative"
                      onHoverStart={() => setHoveredSkill(skill.name)}
                      onHoverEnd={() => setHoveredSkill(null)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${skill.color}`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{
                            duration: 1,
                            delay: categoryIndex * 0.2 + skillIndex * 0.1,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                      {hoveredSkill === skill.name && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs"
                        >
                          {skill.level}%
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Skills Showcase */}
          <motion.div variants={itemVariants} className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
              Technologies I Work With
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "React",
                "JavaScript",
                "Python",
                "MongoDB",
                "HTML",
                "CSS",
                "C++",
                "WordPress",
                "Machine Learning",
                "NumPy",
                "Pandas",
                "Matplotlib",
              ].map((tech, index) => (
                <motion.div
                  key={tech}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium cursor-pointer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
