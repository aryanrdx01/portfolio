"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useMemo } from "react"
import { ExternalLink, Github, Eye } from "lucide-react"
import OptimizedImage from "@/components/optimized-image"

export default function ProjectsPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  // Memoize projects data to prevent re-renders
  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "AI-Powered Task Manager",
        description:
          "A smart task management application that uses machine learning to prioritize tasks and predict completion times.",
        longDescription:
          "Built with React and Python, this application leverages machine learning algorithms to analyze user behavior and automatically prioritize tasks. Features include intelligent scheduling, progress tracking, and predictive analytics.",
        technologies: ["React", "Python", "Machine Learning", "MongoDB"],
        image: "/placeholder.svg?height=300&width=400",
        github: "https://github.com",
        demo: "https://demo.com",
        category: "AI/ML",
      },
      {
        id: 2,
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with real-time inventory management and payment processing.",
        longDescription:
          "Complete e-commerce platform built with React frontend and Node.js backend. Features include user authentication, shopping cart, payment integration, admin dashboard, and real-time inventory updates.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
        image: "/placeholder.svg?height=300&width=400",
        github: "https://github.com",
        demo: "https://demo.com",
        category: "Full Stack",
      },
      {
        id: 3,
        title: "Data Visualization Dashboard",
        description: "Interactive dashboard for visualizing complex datasets using Python and modern web technologies.",
        longDescription:
          "A comprehensive data visualization tool that processes large datasets and presents insights through interactive charts and graphs. Built using Python for data processing and React for the frontend interface.",
        technologies: ["Python", "Pandas", "Matplotlib", "React"],
        image: "/placeholder.svg?height=300&width=400",
        github: "https://github.com",
        demo: "https://demo.com",
        category: "Data Science",
      },
      {
        id: 4,
        title: "Portfolio Website",
        description: "This very website! A modern, animated portfolio built with React and Framer Motion.",
        longDescription:
          "A fully responsive portfolio website featuring smooth animations, dark mode toggle, and modern design. Built with React, Next.js, Tailwind CSS, and Framer Motion for enhanced user experience.",
        technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
        image: "/placeholder.svg?height=300&width=400",
        github: "https://github.com",
        demo: "https://demo.com",
        category: "Frontend",
      },
    ],
    [],
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
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
            My Projects
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                whileHover={{ y: -5 }}
              >
                <div className="relative overflow-hidden">
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <motion.button
                      className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                      onClick={() => setSelectedProject(project.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye size={16} />
                      <span>View Details</span>
                    </motion.button>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs font-medium">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Github size={16} />
                      <span>Code</span>
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <ExternalLink size={16} />
                      <span>Demo</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Optimized Project Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const project = projects.find((p) => p.id === selectedProject)
              if (!project) return null

              return (
                <div>
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{project.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{project.longDescription}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Github size={16} />
                        <span>View Code</span>
                      </motion.a>
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </motion.a>
                    </div>
                  </div>
                </div>
              )
            })()}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
