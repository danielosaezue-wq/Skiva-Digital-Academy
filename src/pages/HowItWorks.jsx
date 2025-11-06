import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, UserCheck, Calendar, BookOpen, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Explore Courses',
      description: 'Browse through our market-ready catalog of courses designed by industry experts.',
      details: 'Discover courses in UI/UX Design, Product Design, Video Editing, Web Development, and more. Each course is carefully crafted to meet current industry demands.'
    },
    {
      icon: UserCheck,
      title: 'Select Your Instructor',
      description: 'Choose who you want to learn from based on their expertise and teaching style.',
      details: 'Our instructors are industry professionals with years of experience. Read their profiles, check their portfolios, and select the perfect mentor for your journey.'
    },
    {
      icon: Calendar,
      title: 'Book a Training',
      description: 'Schedule your sessions (online or onsite) at times that work best for you.',
      details: 'Flexible scheduling options including weekday, weekend, and evening sessions. Choose between online, onsite, or hybrid learning formats.'
    },
    {
      icon: BookOpen,
      title: 'Learn & Practice',
      description: 'Engage with practical activities and real-world projects to build your skills.',
      details: 'Hands-on learning with practical assignments, live projects, and interactive sessions. Get immediate feedback and personalized guidance.'
    },
    {
      icon: TrendingUp,
      title: 'Grow with Confidence',
      description: 'Secure internships and career opportunities with our industry connections.',
      details: 'Access to our network of partner companies, internship placements, career guidance, and ongoing mentorship even after course completion.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>How It Works - Skiva Digital Academy</title>
        <meta name="description" content="Learn how Skiva Digital Academy works. From exploring courses to securing internships, discover our 5-step process to transform your career in the digital economy." />
      </Helmet>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                How It <span className="gradient-text">Works</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Your journey to digital success in 5 simple steps
              </p>
            </motion.div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
                >
                  {/* Content */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">{index + 1}</span>
                      </div>
                      <step.icon className="h-12 w-12 text-blue-400" />
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-white">{step.title}</h3>
                    <p className="text-xl text-gray-300 leading-relaxed">{step.description}</p>
                    <p className="text-gray-400 leading-relaxed">{step.details}</p>
                    
                    {index === steps.length - 1 && (
                      <Link to="/book-training">
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white mt-4">
                          Start Your Journey
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>

                  {/* Visual */}
                  <div className="flex-1">
                    <div className="glass-effect rounded-2xl p-8 card-hover">
                      <step.icon className="h-32 w-32 text-blue-400 mx-auto mb-6" />
                      <div className="text-center">
                        <h4 className="text-xl font-bold text-white mb-2">Step {index + 1}</h4>
                        <p className="text-gray-300">{step.title}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Flow */}
        <section className="py-20 bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Your Learning <span className="gradient-text">Journey</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                From beginner to professional in a structured, supportive environment
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-10 w-10 text-white" />
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transform -translate-y-1/2"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why Our <span className="gradient-text">Process Works</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Personalized Learning',
                  description: 'Every student gets individual attention and customized learning paths based on their goals and pace.',
                  icon: '🎯'
                },
                {
                  title: 'Industry-Relevant Skills',
                  description: 'Our curriculum is constantly updated to reflect current industry needs and emerging technologies.',
                  icon: '🚀'
                },
                {
                  title: 'Career Support',
                  description: 'From portfolio building to job placement assistance, we support you beyond the classroom.',
                  icon: '💼'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="glass-effect rounded-xl p-8 text-center card-hover"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-effect rounded-2xl p-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Start Your <span className="gradient-text">Journey?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of students who have transformed their careers with our proven process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/courses">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4">
                    Explore Courses
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/book-training">
                  <Button size="lg" variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4">
                    Book Consultation
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HowItWorks;