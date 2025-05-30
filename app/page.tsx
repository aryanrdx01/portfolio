"use client"

import type React from "react"
import { Mail } from "lucide-react" // Import Mail icon

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useMemo } from "react"
import {
  ArrowDown,
  Github,
  Linkedin,
  MessageCircle,
  Code,
  Database,
  Brain,
  ExternalLink,
  Eye,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import Image from "next/image"
import emailjs from "@emailjs/browser"

export default function HomePage() {
  // Contact form state
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  // Refs for sections
  const heroRef = useRef(null)
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)

  // In view hooks
  const heroInView = useInView(heroRef, { once: true })
  const aboutInView = useInView(aboutRef, { once: true })
  const skillsInView = useInView(skillsRef, { once: true })
  const projectsInView = useInView(projectsRef, { once: true })
  const contactInView = useInView(contactRef, { once: true })

  // Skills data
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

  // Projects data
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

  // Animation variants
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

  // Contact form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_5u64x29"
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_6c5n8ir"
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "3dAEzeuP_iVdfwFHP"

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        to_email: "choudharyaryan855@gmail.com",
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
      }

      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey)

      if (result.status === 200) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setSubmitStatus("idle"), 5000)
      } else {
        throw new Error(`EmailJS returned status: ${result.status}`)
      }
    } catch (error: any) {
      setSubmitStatus("error")
      setErrorMessage(`❌ Error: ${error.text || error.message || "Failed to send message"}`)
      setTimeout(() => {
        setSubmitStatus("idle")
        setErrorMessage("")
      }, 10000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="home" className="min-h-[85vh] relative overflow-hidden flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-900" />
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 bg-blue-500/10 rounded-full"
              animate={{
                x: [0, 50, 0],
                y: [0, -50, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              style={{
                left: `${20 + i * 25}%`,
                top: `${20 + i * 15}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 flex items-center justify-center min-h-screen">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Aryan Choudhary
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Full Stack Developer & AI Enthusiast
            </motion.p>

            <motion.p
              className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Passionate about creating innovative solutions with modern technologies. Specializing in React, Python,
              and Machine Learning to build impactful applications.
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex justify-center space-x-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.a
                href="https://github.com/aryanrdx01"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 dark:bg-gray-700 text-white rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/aryan-choudhary-485465230/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="https://wa.me/918319359979"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={20} />
              </motion.a>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.a
                href="#projects"
                className="inline-block w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                className="inline-block w-full sm:w-auto px-8 py-3 border-2 border-blue-600 text-blue-400 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <ArrowDown className="text-gray-400" size={24} />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-[85vh] py-8 bg-gray-900 flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            ref={aboutRef}
            variants={containerVariants}
            initial="hidden"
            animate={aboutInView ? "visible" : "hidden"}
            className="max-w-5xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            >
              About Me
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants}>
                <div className="relative">
                  <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-blue-500 shadow-xl shadow-blue-500/20 bg-gradient-to-br from-gray-800 to-gray-900">
                    <Image
                      src="/images/aryan-profile.jpeg"
                      alt="Aryan Choudhary Profile"
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                  </div>
                  <motion.div
                    className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    👋
                  </motion.div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <h3 className="text-3xl font-bold text-white">Hello! I'm Aryan Choudhary</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  I'm a passionate Full Stack Developer with a strong background in modern web technologies and
                  artificial intelligence. With expertise in React, Python, and machine learning, I love creating
                  innovative solutions that make a real impact.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  My journey in tech started with curiosity about how things work, which led me to explore programming
                  languages like C, C++, and Python. Today, I specialize in building scalable web applications and
                  implementing AI-driven features that enhance user experiences.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                  or sharing knowledge with the developer community.
                </p>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="mt-16">
              <h4 className="text-2xl font-bold text-center mb-8 text-white">My Journey</h4>
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
                    className="flex items-center space-x-6 p-6 bg-gray-800 rounded-lg"
                    initial={{ x: -50, opacity: 0 }}
                    animate={aboutInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {item.year}
                    </div>
                    <div className="flex-1">
                      <h5 className="text-xl font-semibold text-white mb-2">{item.title}</h5>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-[85vh] py-8 bg-gray-950 flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            ref={skillsRef}
            variants={containerVariants}
            initial="hidden"
            animate={skillsInView ? "visible" : "hidden"}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            >
              My Skills
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  variants={itemVariants}
                  className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-700"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-blue-900 rounded-lg mr-4">{category.icon}</div>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name} className="relative">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                          <span className="text-sm text-gray-400">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${skill.color}`}
                            initial={{ width: 0 }}
                            animate={skillsInView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{
                              duration: 1,
                              delay: categoryIndex * 0.2 + skillIndex * 0.1,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Technologies */}
            <motion.div variants={itemVariants} className="mt-16">
              <h3 className="text-2xl font-bold text-center mb-8 text-white">Technologies I Work With</h3>
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
                    animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-[85vh] py-8 bg-gray-900 flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            ref={projectsRef}
            variants={containerVariants}
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            >
              My Projects
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-700"
                  whileHover={{ y: -5 }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
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
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-900 text-blue-200 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-medium">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-4">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </motion.a>
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
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
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-[85vh] py-8 bg-gray-950 flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            ref={contactRef}
            variants={containerVariants}
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            >
              Get In Touch
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    I'm always interested in new opportunities and exciting projects. Whether you have a question, want
                    to collaborate, or just want to say hi, feel free to reach out!
                  </p>
                </div>

                <div className="space-y-6">
                  <motion.div
                    className="flex items-center space-x-4"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Email</h4>
                      <p className="text-gray-300">choudharyaryan855@gmail.com</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-4"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 bg-green-900 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Phone</h4>
                      <p className="text-gray-300">+91 8319359979</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center space-x-4"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 bg-purple-900 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Location</h4>
                      <p className="text-gray-300">M.P, India</p>
                    </div>
                  </motion.div>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-4">Follow Me</h4>
                  <div className="flex space-x-4">
                    {[
                      {
                        icon: <Github size={20} />,
                        href: "https://github.com/aryanrdx01",
                        color: "hover:bg-gray-700",
                      },
                      {
                        icon: <Linkedin size={20} />,
                        href: "https://www.linkedin.com/in/aryan-choudhary-485465230/",
                        color: "hover:bg-blue-600",
                      },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-gray-300 ${social.color} hover:text-white transition-all duration-300`}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div variants={itemVariants}>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={contactInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white transition-all duration-200"
                        placeholder="Your Name"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={contactInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white transition-all duration-200"
                        placeholder="your@email.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={contactInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white transition-all duration-200"
                      placeholder="What's this about?"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={contactInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white transition-all duration-200 resize-none"
                      placeholder="Tell me about your project or just say hello!"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={contactInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>

                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-900/20 border border-green-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-green-300 font-medium">
                          ✅ Message sent successfully! I'll get back to you soon.
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-900/20 border border-red-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <span className="text-red-300 font-medium">
                          {errorMessage || "Something went wrong. Please try again."}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </form>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.7 }}
                  className="mt-8 p-4 bg-blue-900/20 rounded-lg border border-blue-800"
                >
                  <h5 className="text-sm font-semibold text-blue-200 mb-2">Alternative Contact Methods</h5>
                  <p className="text-sm text-blue-300">
                    You can also reach me directly at:{" "}
                    <a href="mailto:choudharyaryan855@gmail.com" className="font-medium underline hover:no-underline">
                      choudharyaryan855@gmail.com
                    </a>
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
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
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                    <p className="text-gray-300 mb-6">{project.longDescription}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm font-medium"
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
                        className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
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
