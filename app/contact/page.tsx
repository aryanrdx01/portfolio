"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Mail, Phone, MapPin, Send, Github, Linkedin, AlertCircle, CheckCircle } from "lucide-react"
import emailjs from "@emailjs/browser"

export default function ContactPage() {
  const ref = useRef(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(ref, { once: true })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Initialize EmailJS when component mounts
  useEffect(() => {
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "3dAEzeuP_iVdfwFHP"
    emailjs.init(publicKey)
  }, [])

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

      // Method 1: Try using sendForm first
      try {
        const result = await emailjs.sendForm(serviceId, templateId, formRef.current!, publicKey)

        if (result.status === 200) {
          setSubmitStatus("success")
          setFormData({ name: "", email: "", subject: "", message: "" })
          if (formRef.current) formRef.current.reset()
          setTimeout(() => setSubmitStatus("idle"), 5000)
          return
        }
      } catch (formError) {
        // Fallback to send method
      }

      // Method 2: Fallback to send method with explicit parameters
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

      if (error.status === 422) {
        setErrorMessage("❌ EmailJS template configuration issue. Please check the template setup.")
      } else if (error.text?.includes("recipients address is empty")) {
        setErrorMessage("❌ Template missing recipient configuration. Please contact me directly.")
      } else {
        setErrorMessage(`❌ Error: ${error.text || error.message || "Failed to send message"}`)
      }

      setTimeout(() => {
        setSubmitStatus("idle")
        setErrorMessage("")
      }, 10000)
    } finally {
      setIsSubmitting(false)
    }
  }

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
            Get In Touch
          </motion.h1>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Let's Connect</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  I'm always interested in new opportunities and exciting projects. Whether you have a question, want to
                  collaborate, or just want to say hi, feel free to reach out!
                </p>
              </div>

              <div className="space-y-6">
                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">choudharyaryan855@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-300">+91 8319359979</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center space-x-4"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white">Location</h3>
                    <p className="text-gray-600 dark:text-gray-300">M.P, India</p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Follow Me</h3>
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
                      className={`w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-300 ${social.color} hover:text-white transition-all duration-300`}
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
                {/* Hidden fields for EmailJS sendForm method */}
                <input type="hidden" name="to_email" value="choudharyaryan855@gmail.com" />
                <input type="hidden" name="reply_to" value={formData.email} />

                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="from_name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                      placeholder="Your Name"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="from_email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                      placeholder="your@email.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData((prev) => ({ ...prev, subject: e.target.value }))}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                    placeholder="What's this about?"
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
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
                    className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-green-700 dark:text-green-300 font-medium">
                        ✅ Message sent successfully! I'll get back to you soon.
                      </span>
                    </div>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-700 dark:text-red-300 font-medium">
                        {errorMessage || "Something went wrong. Please try again."}
                      </span>
                    </div>
                  </motion.div>
                )}
              </form>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.7 }}
                className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
              >
                <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  Alternative Contact Methods
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300">
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
    </div>
  )
}
