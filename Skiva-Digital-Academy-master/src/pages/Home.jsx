import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, ShieldCheck, BookOpen, UserCheck, Award, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  const highlights = [
    { icon: <CheckCircle className="h-8 w-8 text-accent" />, text: 'Flexible Training Options', subtext: 'One-on-one, group, or online classes.' },
    { icon: <Users className="h-8 w-8 text-accent" />, text: 'Career Growth Support', subtext: 'Mentorship & Internship Opportunities.' },
    { icon: <ShieldCheck className="h-8 w-8 text-accent" />, text: 'Personalized Learning', subtext: 'Custom paths & seasoned instructors.' }
  ];

  const featuredCourses = [
    { title: 'Cybersecurity', image: 'https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/6b64e76048b390486c8974ebf88237c7.jpg', id: 'cyber-security' },
    { title: 'AI Fundamentals', image: 'https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/a12c8af88cf250dfcc61f0ba1f8ba6bb.jpg', id: 'ai-fundamentals' },
    { title: 'Full Stack Development', image: 'https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/f24d30959a4c21004a95ca7105fd2f4f.jpg', id: 'full-stack-development' },
    { title: 'Mobile App Development', image: 'https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/c65852eb7b9fad86a9af1b95e79c1803.jpg', id: 'mobile-app-development' },
    { title: 'UI/UX Design', image: 'https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/945a4ed01b10de4fe6ff5430ef2c7e03.jpg', id: 'ui-ux-design' },
    { title: 'Data Analysis', image: 'https://horizons-cdn.hostinger.com/3ecd7a20-b3eb-4907-8c44-334fb3f217e8/9bdfb0c833f6ec52c172b0860c6a72c3.jpg', id: 'data-analysis' },
  ];

  const processSteps = [
    { icon: <BookOpen className="h-10 w-10 text-primary" />, title: 'Explore Courses', description: 'Browse practical, industry-relevant courses tailored to your goals.' },
    { icon: <UserCheck className="h-10 w-10 text-primary" />, title: 'Learn with Experts', description: 'Gain hands-on skills through engaging lessons from seasoned instructors.' },
    { icon: <Award className="h-10 w-10 text-primary" />, title: 'Practice & Apply', description: 'Work on real-world projects to solidify your knowledge.' },
    { icon: <Briefcase className="h-10 w-10 text-primary" />, title: 'Grow Your Career', description: 'Earn certificates and unlock new career opportunities.' },
  ];

  const whyChooseUs = [
    { title: 'Practical Training', description: 'Hands-on training focused on real-world application.' },
    { title: 'Seasoned Instructors', description: 'Learn from experts with deep industry experience.' },
    { title: 'Flexible Learning', description: 'Choose from physical, online, or private sessions.' },
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
                    <h3 className="text-xl font-bold font-heading text-primary mb-4">{course.title}</h3>
                    <Link to={`/course/${course.id}`}>
                      <Button variant="outline" className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground">
                        View Course
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

        <section className="py-20 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
                Our Process
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

        <section className="py-20 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Why Choose Skiva?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center max-w-4xl mx-auto mb-8">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="p-4">
                    <h3 className="text-xl font-bold text-accent">{item.title}</h3>
                    <p className="text-gray-200">{item.description}</p>
                  </div>
                ))}
              </div>
              <Link to="/about">
                <Button size="lg" variant="accent" className="rounded-full">
                  Learn More About Us
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;