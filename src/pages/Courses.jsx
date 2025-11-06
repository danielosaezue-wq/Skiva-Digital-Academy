import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Laptop, Shield, Server, Monitor, Smartphone, Palette, Code, BarChart, PenTool, Video, Mic, Box as Cube, Megaphone, FileText, BrainCircuit, Wifi, Star, Search, Book, Image as ImageIcon, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const coursesData = {
  'Creative & Digital Skills': [
    { id: 'ui-ux-design', title: 'UI/UX Design', description: 'Design intuitive and user-friendly digital products.', duration: '6 weeks', format: 'Online / Physical', icon: <Palette className="w-8 h-8 text-accent" />, price: 120000 },
    { id: 'graphics-brand-identity-design', title: 'Graphics / Brand Identity Design', description: 'Master the art of visual storytelling and brand creation. Learn to design stunning graphics, build strong brand identities, and craft visuals that connect emotionally and professionally.', duration: '8 weeks', format: 'Online / Physical', icon: <PenTool className="w-8 h-8 text-accent" />, price: 90000 },
    { id: 'video-editing-basics', title: 'Video Editing Basics', description: 'Edit raw footage into polished, engaging video content.', duration: '4 weeks', format: 'Online / Physical', icon: <Video className="w-8 h-8 text-accent" />, price: 100000 },
    { id: 'character-animations', title: 'Character Animations', description: 'Bring characters to life through rigging, keyframing, and movement.', duration: '8 weeks', format: 'Online / Physical', icon: <Cube className="w-8 h-8 text-accent" />, price: 130000 },
    { id: '3d-modelling', title: '3D Modelling', description: 'Explore the world of 3D art and design. Learn to model, texture, light, and render realistic objects and scenes.', duration: '8-10 weeks', format: 'Online / Physical', icon: <Cube className="w-8 h-8 text-accent" />, price: 120000 },
    { id: 'social-media-marketing', title: 'Social Media Marketing', description: 'Master the art of social media to grow brands and communities.', duration: '6 weeks', format: 'Online / Physical', icon: <Megaphone className="w-8 h-8 text-accent" />, price: 110000 },
    { id: 'search-engine-optimization-seo', title: 'Search Engine Optimization (SEO)', description: 'Optimize websites to rank higher on search engines and drive organic traffic.', duration: '6 weeks', format: 'Online / Physical', icon: <Search className="w-8 h-8 text-accent" />, price: 110000 },
    { id: 'book-publishing', title: 'Book Publishing', description: 'Learn how to edit, design, publish, and market books in print and digital formats for a professional audience reach.', duration: '8 weeks', format: 'Online / Physical', icon: <Book className="w-8 h-8 text-accent" />, price: 140000 },
    { id: 'photo-editing-retouching', title: 'Photo Editing / Retouching', description: 'Master professional photo enhancement and retouching techniques for stunning visuals.', duration: '5 weeks', format: 'Online / Physical', icon: <ImageIcon className="w-8 h-8 text-accent" />, price: 95000 },
  ],
  'Development': [
    { id: 'website-design', title: 'Website Design', description: 'Create modern, user-friendly websites with strong layouts and smooth navigation.', duration: '8 weeks', format: 'Online / Physical', icon: <Monitor className="w-8 h-8 text-accent" />, price: 150000 },
    { id: 'front-end-development', title: 'Front-End Development', description: 'Learn how to build beautiful, responsive, and interactive websites using HTML, CSS, and JavaScript.', duration: '8-10 weeks', format: 'Online / Physical', icon: <Code className="w-8 h-8 text-accent" />, price: 120000 },
    { id: 'back-end-development', title: 'Back-End Development', description: 'Master the logic and functionality behind web applications. Learn to build secure servers, manage databases, and create powerful APIs.', duration: '10-12 weeks', format: 'Online / Physical', icon: <Server className="w-8 h-8 text-accent" />, price: 120000 },
    { id: 'full-stack-development', title: 'Full Stack Development', description: 'Master both front-end and back-end technologies.', duration: '12 weeks', format: 'Online / Physical', icon: <Server className="w-8 h-8 text-accent" />, price: 200000 },
    { id: 'mobile-app-development', title: 'Mobile App Development', description: 'Create applications for iOS and Android devices.', duration: '10 weeks', format: 'Online / Physical', icon: <Smartphone className="w-8 h-8 text-accent" />, price: 180000 },
    { id: 'cyber-security', title: 'Cyber Security', description: 'Learn how to protect digital assets and prevent cyber threats.', duration: '10 weeks', format: 'Online / Physical', icon: <Shield className="w-8 h-8 text-accent" />, price: 150000 },
    { id: 'python-programming', title: 'Python Programming', description: 'Master the versatile and powerful Python programming language.', duration: '8 weeks', format: 'Online / Physical', icon: <Code className="w-8 h-8 text-accent" />, price: 140000 },
  ],
  'Emerging Technologies': [
    { id: 'artificial-intelligence', title: 'Artificial Intelligence', description: 'Discover the basics of AI, machine learning, and real-world applications.', duration: '6 weeks', format: 'Online / Physical', icon: <BrainCircuit className="w-8 h-8 text-accent" />, price: 180000 },
    { id: 'internet-of-things-fundamentals', title: 'Internet of Things (Fundamentals)', description: 'Learn how smart devices connect, communicate, and power industries.', duration: '8 weeks', format: 'Online / Physical', icon: <Wifi className="w-8 h-8 text-accent" />, price: 160000 },
    { id: 'data-analysis', title: 'Data Analysis', description: 'Turn raw data into actionable insights with powerful analysis tools.', duration: '8 weeks', format: 'Online / Physical', icon: <BarChart className="w-8 h-8 text-accent" />, price: 130000 },
    { id: 'data-science', title: 'Data Science', description: 'Learn to collect, analyze, and visualize data using Python and key analytical tools. Gain hands-on experience turning data into insights for real-world decision-making.', duration: '10-12 weeks', format: 'Online / Physical', icon: <BarChart className="w-8 h-8 text-accent" />, price: 120000 },
  ],
  'Foundational IT Skills': [
    { id: 'ict-fundamentals', title: 'ICT Fundamentals', description: 'Master MS Excel, Access, and Word for office productivity.', duration: '4 weeks', format: 'Online / Physical', icon: <FileText className="w-8 h-8 text-accent" />, price: 70000 },
  ]
};

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = useMemo(() => {
    if (!searchTerm) {
      return coursesData;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = {};
    for (const category in coursesData) {
      const courses = coursesData[category].filter(course =>
        course.title.toLowerCase().includes(lowercasedFilter) ||
        course.description.toLowerCase().includes(lowercasedFilter) ||
        category.toLowerCase().includes(lowercasedFilter)
      );
      if (courses.length > 0) {
        filtered[category] = courses;
      }
    }
    return filtered;
  }, [searchTerm]);

  const sortedCategories = Object.keys(filteredCourses).sort();

  return (
    <>
      <Helmet>
        <title>Explore Our Courses - Skiva Digital Academy</title>
        <meta name="description" content="Explore top-rated tech courses in Lagos and across Nigeria. Skiva offers training in web development, cybersecurity, UI/UX, data analysis, and more." />
        <link rel="canonical" href="https://www.skivadigitalacademy.com/courses" />
      </Helmet>
      <div className="bg-background text-foreground pt-20">
        <section className="py-20 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold font-heading text-primary mb-4"
            >
              Explore our courses
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Find the perfect program to launch or advance your career in the digital economy.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 max-w-xl mx-auto"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for a course (e.g., 'UI/UX')"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-12 pl-5 rounded-full"
                />
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </motion.div>
          </div>
        </section>

        <div className="py-20">
          {sortedCategories.length > 0 ? sortedCategories.map((category) => (
            <section key={category} className="mb-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold font-heading text-foreground mb-10 text-center">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCourses[category].map((course, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-card rounded-lg shadow-lg overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2"
                    >
                      <div className="p-8">
                        <div className="mb-4">{course.icon}</div>
                        <h3 className="text-xl font-bold font-heading text-primary mb-3">{course.title}</h3>
                        <p className="text-muted-foreground mb-3 text-sm min-h-[60px]">{course.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <Clock className="w-4 h-4 mr-2" />
                          Duration: {course.duration}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <Laptop className="w-4 h-4 mr-2" />
                          Format: {course.format}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Star className="w-4 h-4 mr-2" />
                          Level: Beginner friendly
                        </div>
                      </div>
                      <div className="p-6 bg-secondary flex flex-col space-y-3">
                        <p className="text-center text-lg font-bold text-primary">₦{course.price.toLocaleString()}</p>
                        <Link to={`/course/${course.id}`} className="w-full">
                          <Button variant="accent" className="w-full">
                            Enroll Now
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No courses found for "{searchTerm}".</p>
              <Button variant="link" onClick={() => setSearchTerm('')}>Clear search</Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Courses;