import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, UserCheck, Award, BookOpen, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  // CORRECTED ICONS - matching the text properly
  const highlights = [
    { 
      icon: <UserCheck className="h-8 w-8 text-accent" />, 
      text: 'Learn from Experts', 
      subtext: 'Proven industry instructors.' 
    },
    { 
      icon: <Award className="h-8 w-8 text-accent" />, 
      text: 'Job-Ready Skills', 
      subtext: 'Fast, practical courses.' 
    },
    { 
      icon: <BookOpen className="h-8 w-8 text-accent" />, 
      text: 'Flexible Learning', 
      subtext: 'Group or one-on-one online.' 
    }
  ];

  const featuredCourses = [
    { 
      title: 'Cybersecurity', 
      image: 'images/Cybersecurity.jpg', 
      id: 'cyber-security',
      description: 'Learn to protect systems, networks, and programs from digital attacks through hands-on labs and real-world security scenarios.'
    },
    { 
      title: 'Full Stack Development', 
      image: 'images/Full_stack_development.jpg', 
      id: 'full-stack-development',
      description: 'Master both front-end and back-end development to build complete, scalable web applications from concept to deployment.'
    },
    { 
      title: 'Mobile App Development', 
      image: 'images/mobile_app_development.jpg', 
      id: 'mobile-app-development',
      description: 'Create cross-platform mobile applications using modern development frameworks.'
    },
    { 
      title: 'UI/UX Design', 
      image: 'images/ui_ux.jpg', 
      id: 'ui-ux-design',
      description: 'Create intuitive and beautiful user interfaces and experiences for digital products using industry-standard design principles.'
    },
    { 
      title: 'Data Analysis', 
      image: 'images/Data_Analysis.jpg', 
      id: 'data-analysis',
      description: 'Transform raw data into meaningful insights for business decision making using powerful analytical tools.'
    },
    { 
      title: 'Video Editing', 
      image: 'images/video_editing.png', 
      id: 'video-editing',
      description: 'Learn professional video editing techniques from cutting to final production with industry-standard software.'
    },
  ];

  const processSteps = [
    { icon: <BookOpen className="h-10 w-10 text-primary" />, title: 'Explore Courses', description: 'Browse practical, industry-relevant courses tailored to your goals.' },
    { icon: <UserCheck className="h-10 w-10 text-primary" />, title: 'Learn with Experts', description: 'Gain hands-on skills through engaging lessons from seasoned instructors.' },
    { icon: <Award className="h-10 w-10 text-primary" />, title: 'Practice & Apply', description: 'Work on real-world projects to solidify your knowledge.' },
    { icon: <Briefcase className="h-10 w-10 text-primary" />, title: 'Grow Your Career', description: 'Earn certificates and unlock new career opportunities.' },
  ];

  const whyChooseUs = [
    { title: 'Practical Training', description: 'Hands-on training focused on real-world application.' },
    { title: 'Verified Instructors', description: 'Learn from experts with deep industry experience.' },
    { title: 'Flexible Learning', description: 'Pick between group or one-on-one online sessions.' },
    { title: 'Standard Curriculum', description: 'Designed for immediate, impactful application.' },
  ];

  return (
    <>
      <Helmet>
        <title>Skiva Digital Academy - Tech Courses & Digital Skills Training</title>
        <meta name="description" content="Practical online training in web development, UI/UX, data science. Get certified and launch your tech career in Nigeria. Enroll now!" />
        <link rel="canonical" href="https://www.skivadigitalacademy.com/" />
      </Helmet>

      <div className="bg-background text-foreground">
        <section className="relative text-white min-h-[70vh] md:min-h-screen flex items-center justify-center pt-20">
          <div className="absolute inset-0">
            <img loading="lazy" className="w-full h-full object-cover" alt="Diverse group of engaged students in a modern tech training classroom in Nigeria" src="https://images.unsplash.com/photo-1562893492-afd14ae24913" />
            <div className="absolute inset-0 bg-primary/85"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight">
                Skill Up. Stay Relevant.
                <br />
                <span className="text-yellow-300">Build Your Future.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                Learn in-demand digital and tech skills with flexible training, mentorship, and real-world projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/courses">
                  <Button size="lg" variant="accent" className="px-10 py-7 text-lg rounded-full">
                    Explore Courses
                  </Button>
                </Link>
                <Link to="/book-training">
                   <Button size="lg" variant="outline" className="text-white border-2 border-white hover:bg-white hover:text-primary px-10 py-7 text-lg rounded-full bg-transparent">
                    Book a Training
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* HIGHLIGHTS SECTION WITH CORRECTED ICONS */}
        <section className="py-20 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col items-center p-6"
                >
                  {highlight.icon}
                  <h3 className="mt-4 text-xl font-semibold text-foreground">{highlight.text}</h3>
                  <p className="text-muted-foreground mt-1">{highlight.subtext}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
                Courses Available for Enrollment
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Start your journey with our most popular and in-demand courses.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 group"
                >
                  <div className="overflow-hidden h-48">
                    <img loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt={`Preview image for ${course.title} course`} src={course.image} />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-heading text-primary mb-3">{course.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                      {course.description}
                    </p>
                    <Link to="/book-training" state={{ preSelectedCourse: course.title }}>
                      <Button variant="outline" className="w-full border-primary text-foreground hover:bg-primary hover:text-primary-foreground">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/courses">
                <Button size="lg" variant="default" className="rounded-full px-10 py-7 text-lg">
                  See All Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Skiva Section - Moved before Process and Updated */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5 border-y border-primary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
                Why Choose Skiva Digital Academy?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're committed to providing the best learning experience with proven results
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-primary mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <Link to="/about">
                <Button size="lg" variant="default" className="rounded-full px-8">
                  Learn More About Us
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Our Process Section - Moved after Why Choose Skiva */}
        <section className="py-20 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
                Our Learning Process
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A simple, effective path to mastering new skills and advancing your career.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="text-center p-4"
                >
                  <div className="flex justify-center items-center mb-4 w-20 h-20 rounded-full bg-white shadow-md mx-auto">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold font-heading text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;