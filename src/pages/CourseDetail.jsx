import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Clock, User, Mail, Phone, Wrench, Users, Briefcase, Monitor, Wifi, BookOpen, Brain, Info, HardDrive, ChevronDown, ChevronUp, CheckCircle, Target, Laptop, Eye, BarChart } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Updated courses data to match BookTraining structure
const coursesData = {
  'cyber-security': { 
    title: 'Cybersecurity', 
    basePrice: 150000,
    description: 'Learn to protect systems, networks, and programs from digital attacks through hands-on labs and real-world security scenarios.',
    duration: '2 hrs/session • 16 sessions • 8 weeks',
    level: 'Beginner to Advanced',
    tools: ['Wireshark', 'Kali Linux', 'Metasploit', 'Nessus', 'Burp Suite'],
    outcomes: [
      'Cybersecurity fundamentals & threat types',
      'Network security & firewalls',
      'Ethical hacking & penetration testing',
      'Security protocols & encryption',
      'Incident response & vulnerability assessment',
      'Integrating AI (AI-driven threat detection, anomaly detection, predictive cybersecurity)'
    ],
    syllabus: [
      {
        module: 'Introduction to Cyber Security',
        topics: [
          'Understanding Cyber Threats and Attack Vectors',
          'Cyber Security Principles and CIA Triad',
          'Types of Malware and Cyber Attacks',
          'Security Policies and Compliance'
        ]
      },
      {
        module: 'Network Security Fundamentals',
        topics: [
          'Network Protocols and Security',
          'Firewalls and Intrusion Detection Systems',
          'VPNs and Secure Communication',
          'Wireless Network Security'
        ]
      },
      {
        module: 'Ethical Hacking and Penetration Testing',
        topics: [
          'Footprinting and Reconnaissance',
          'Vulnerability Assessment',
          'Penetration Testing Methodologies',
          'Social Engineering Techniques'
        ]
      },
      {
        module: 'Cryptography and Data Protection',
        topics: [
          'Encryption Algorithms and Techniques',
          'Digital Signatures and Certificates',
          'Public Key Infrastructure (PKI)',
          'Secure Data Storage and Transmission'
        ]
      },
      {
        module: 'Integrating Artificial Intelligence (AI)',
        topics: [
          'AI in Threat Detection and Analysis',
          'Machine Learning for Security Analytics',
          'Automated Security Response Systems',
          'AI-Powered Vulnerability Management'
        ]
      }
    ]
  },
  'full-stack-development': { 
    title: 'Full Stack Development', 
    basePrice: 200000,
    description: 'Master both front-end and back-end development to build complete, scalable web applications from concept to deployment.',
    duration: '2 hrs/session • 24 sessions • 12 weeks',
    level: 'Beginner to Advanced',
    tools: ['VS Code', 'Git', 'Node.js', 'React', 'Django/Express', 'MongoDB/MySQL'],
    outcomes: [
      'Frontend & backend integration',
      'Full-stack project workflow',
      'API consumption & development',
      'State management & routing',
      'Deployment & hosting (Netlify, Vercel, Heroku)',
      'Integrating AI (AI-assisted full-stack coding, auto-generated components, AI-driven testing)'
    ],
    syllabus: [
      {
        module: 'Frontend Development Fundamentals',
        topics: [
          'HTML5 Semantic Structure and Accessibility',
          'CSS3 Flexbox, Grid and Responsive Design',
          'JavaScript ES6+ Features and DOM Manipulation',
          'Version Control with Git and GitHub'
        ]
      },
      {
        module: 'React.js and Modern Frontend',
        topics: [
          'React Components and JSX Syntax',
          'State Management with Hooks',
          'React Router for Navigation',
          'API Integration and Async Operations'
        ]
      },
      {
        module: 'Backend Development with Node.js',
        topics: [
          'Node.js Runtime and NPM Ecosystem',
          'Express.js Framework and Middleware',
          'RESTful API Design and Development',
          'Authentication and Authorization'
        ]
      },
      {
        module: 'Database Management',
        topics: [
          'SQL Databases (PostgreSQL/MySQL)',
          'NoSQL Databases (MongoDB)',
          'Database Design and Normalization',
          'ORM and Query Optimization'
        ]
      },
      {
        module: 'Integrating Artificial Intelligence (AI)',
        topics: [
          'AI-Powered Features in Web Applications',
          'Chatbot Integration and Natural Language Processing',
          'Machine Learning Model Deployment',
          'Intelligent User Experience Enhancement'
        ]
      }
    ]
  },
  'ui-ux-design': { 
    title: 'UI/UX Design', 
    basePrice: 120000,
    description: 'Create intuitive and beautiful user interfaces and experiences for digital products using industry-standard design principles.',
    duration: '2 hrs/session • 12 sessions • 6 weeks',
    level: 'Beginner to Intermediate',
    tools: ['Figma', 'Adobe Photoshop'],
    outcomes: [
      'Wireframing and Interactive Prototyping',
      'User Research Methods and Persona Development',
      'Design Systems and Component Libraries',
      'Usability Testing and User Feedback Integration',
      'Design Thinking Process and Problem Solving',
      'AI-assisted prototyping, smart design suggestions, automated accessibility checks, AI-powered user testing insights',
      'Portfolio Development'
    ],
    syllabus: [
      {
        module: 'Design Principles and Fundamentals',
        topics: [
          'User-Centered Design Methodology',
          'Color Theory and Typography',
          'Layout and Composition Principles',
          'Design Systems and Component Libraries'
        ]
      },
      {
        module: 'User Research and Analysis',
        topics: [
          'User Personas and Journey Mapping',
          'Usability Testing Methods',
          'Competitive Analysis and Market Research',
          'Accessibility and Inclusive Design'
        ]
      },
      {
        module: 'Wireframing and Prototyping',
        topics: [
          'Low-Fidelity to High-Fidelity Design',
          'Interactive Prototyping Techniques',
          'Design Handoff and Developer Collaboration',
          'Mobile-First Responsive Design'
        ]
      },
      {
        module: 'Usability Testing and Iteration',
        topics: [
          'User Feedback Collection Methods',
          'A/B Testing and Data-Driven Design',
          'Design Iteration and Improvement Cycles',
          'Stakeholder Presentation and Communication'
        ]
      },
      {
        module: 'Integrating Artificial Intelligence (AI)',
        topics: [
          'AI-Powered Design Tools and Automation',
          'User Behavior Prediction and Personalization',
          'Generative AI for Design Inspiration',
          'Intelligent User Interface Adaptation'
        ]
      }
    ]
  },
  'data-science': { 
    title: 'Data Science', 
    basePrice: 120000,
    description: 'Master the complete data science pipeline from collection to insights with real-world datasets.',
    duration: '2 hrs/session • 16 sessions • 8 weeks',
    level: 'Intermediate',
    tools: ['Python', 'R', 'Jupyter Notebook', 'Tableau', 'Scikit-learn', 'TensorFlow', 'SQL'],
    outcomes: [
      'Data preprocessing & wrangling',
      'EDA & visualization',
      'Statistical modeling & hypothesis testing',
      'Machine learning algorithms (supervised & unsupervised)',
      'Model evaluation & deployment',
      'Big data tools (optional: Spark, Hadoop)',
      'Integrating AI (AI model building, neural networks, AI-driven data insights)'
    ],
    syllabus: [
      {
        module: 'Introduction to Data Science',
        topics: [
          'Data Science Ecosystem and Workflow',
          'Python Programming for Data Analysis',
          'Data Collection and Web Scraping',
          'Statistical Foundations for Data Science'
        ]
      },
      {
        module: 'Data Manipulation and Analysis',
        topics: [
          'Pandas for Data Wrangling',
          'NumPy for Numerical Computing',
          'Data Cleaning and Preprocessing',
          'Exploratory Data Analysis (EDA)'
        ]
      },
      {
        module: 'Data Visualization',
        topics: [
          'Matplotlib and Seaborn for Plotting',
          'Interactive Visualization with Plotly',
          'Dashboard Creation with Power BI/Tableau',
          'Storytelling with Data'
        ]
      },
      {
        module: 'Machine Learning Fundamentals',
        topics: [
          'Supervised vs Unsupervised Learning',
          'Regression and Classification Algorithms',
          'Model Evaluation and Validation',
          'Feature Engineering and Selection'
        ]
      },
      {
        module: 'Integrating Artificial Intelligence (AI)',
        topics: [
          'Advanced Machine Learning Techniques',
          'Natural Language Processing (NLP)',
          'Deep Learning Fundamentals',
          'AI Model Deployment and Monitoring'
        ]
      }
    ]
  },
  'digital-marketing': { 
    title: 'Digital Marketing', 
    basePrice: 150000,
    description: 'Digital Marketing teaches learners how to promote products and services effectively across digital channels using strategic content, targeted advertising, analytics, and automation. The course equips learners with hands-on skills in social media marketing, SEO, paid ads, email marketing, content strategy, and campaign optimization — preparing them to manage real-world digital marketing campaigns for businesses and brands.',
    duration: '2 hrs/session • 20 sessions • 10 weeks',
    level: 'Beginner to Intermediate',
    tools: ['Google Analytics', 'Google Ads', 'Meta Ads Manager', 'Mailchimp', 'SEMrush', 'Ahrefs', 'Canva', 'Hootsuite', 'WordPress'],
    outcomes: [
      'Digital marketing fundamentals',
      'Content marketing strategy',
      'Social media marketing',
      'Search engine marketing (SEO & Paid Ads)',
      'Email marketing & automation',
      'Conversion rate optimization (CRO)',
      'Web analytics & performance measurement',
      'Influencer & affiliate marketing',
      'Marketing funnels & customer journey',
      'Integrating AI: AI-powered content creation, predictive analytics, automated campaign optimization, AI-driven audience targeting, smart personalization & segmentation'
    ],
    syllabus: [
      {
        module: 'Digital Marketing Fundamentals',
        topics: [
          'Introduction to Digital Marketing Landscape',
          'Understanding Customer Journey and Funnels',
          'Digital Marketing Strategy Development',
          'Setting SMART Goals and KPIs'
        ]
      },
      {
        module: 'Content Marketing & Strategy',
        topics: [
          'Content Strategy and Planning',
          'Blogging and Article Writing',
          'Video Marketing and Storytelling',
          'Content Distribution and Promotion'
        ]
      },
      {
        module: 'Social Media Marketing',
        topics: [
          'Platform-Specific Strategies (Facebook, Instagram, LinkedIn, TikTok)',
          'Community Management and Engagement',
          'Social Media Advertising',
          'Influencer Marketing Strategies'
        ]
      },
      {
        module: 'Search Engine Marketing',
        topics: [
          'SEO Fundamentals and On-Page Optimization',
          'Technical SEO and Site Structure',
          'Paid Search Advertising (Google Ads)',
          'Local SEO and Google My Business'
        ]
      },
      {
        module: 'Email Marketing & Automation',
        topics: [
          'Email List Building Strategies',
          'Email Campaign Design and Copywriting',
          'Marketing Automation Workflows',
          'A/B Testing and Optimization'
        ]
      },
      {
        module: 'Analytics & Performance Measurement',
        topics: [
          'Google Analytics Setup and Configuration',
          'Key Metrics and Performance Tracking',
          'Conversion Rate Optimization (CRO)',
          'ROI Calculation and Reporting'
        ]
      },
      {
        module: 'Integrating Artificial Intelligence (AI)',
        topics: [
          'AI-Powered Content Creation and Optimization',
          'Predictive Analytics for Campaign Planning',
          'Automated Campaign Management',
          'AI-Driven Audience Targeting and Personalization'
        ]
      }
    ]
  },
  'comptia-network-plus': {
    title: 'CompTIA Network+ (N+)',
    basePrice: 170000,
    description: 'CompTIA Network+ (N+) is an entry-level IT course that teaches the fundamentals of computer networking, including network concepts, infrastructure, security, and troubleshooting, preparing learners for network administration and IT support roles.',
    duration: '2 hrs/session • 18 sessions • 9 weeks',
    level: 'Beginner to Intermediate',
    tools: ['Packet Tracer', 'Wireshark', 'VirtualBox / VMware', 'CompTIA CertMaster Labs', 'Windows / Linux OS'],
    outcomes: [
      'Networking Concepts (OSI/TCP-IP, protocols, IP addressing)',
      'Network Infrastructure (LAN, WAN, wireless, routers, switches, cabling)',
      'Network Operations (Monitoring, documentation, disaster recovery)',
      'Network Security (Firewalls, VPNs, authentication, threats)',
      'Troubleshooting & Tools (Diagnostics, Packet Tracer, Wireshark)',
      'Cloud & Virtualization (Virtual networks, network services)',
      'Network Policies & Best Practices',
      'Integrating Artificial Intelligence (AI)'
    ],
    syllabus: [
      {
        module: 'Networking Fundamentals',
        topics: [
          'OSI and TCP/IP Models',
          'Network Topologies and Types',
          'IP Addressing and Subnetting',
          'Network Protocols and Services'
        ]
      },
      {
        module: 'Network Infrastructure',
        topics: [
          'Network Devices and Components',
          'Cabling and Connectors',
          'Wireless Networks',
          'Network Storage and Virtualization'
        ]
      },
      {
        module: 'Network Operations',
        topics: [
          'Network Monitoring and Management',
          'Documentation and Diagrams',
          'Disaster Recovery and Business Continuity',
          'Network Optimization'
        ]
      },
      {
        module: 'Network Security',
        topics: [
          'Security Concepts and Threats',
          'Network Hardening Techniques',
          'Firewalls and VPNs',
          'Access Control and Authentication'
        ]
      },
      {
        module: 'Network Troubleshooting',
        topics: [
          'Troubleshooting Methodology',
          'Common Network Issues',
          'Tools and Utilities',
          'Performance Optimization'
        ]
      }
    ]
  }
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const { toast } = useToast();
  const course = coursesData[courseId] || { title: 'Course Not Found', description: '', syllabus: [], tools: [], duration: '', basePrice: 0, outcomes: [] };
  const [expandedModules, setExpandedModules] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', sponsor: 'Self', trainingPreference: 'Online (Group)', preferredTime: 'Morning' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(course.basePrice);
  const [exchangeRate, setExchangeRate] = useState(1400);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        if (data && data.rates && data.rates.NGN) {
          setExchangeRate(data.rates.NGN);
        }
      } catch (error) {
        console.error("Failed to fetch exchange rate, using fallback.", error);
      }
    };
    fetchRate();
  }, []);

  useEffect(() => {
    let price;
    if (course.customPrices && course.customPrices[formData.trainingPreference]) {
      price = course.customPrices[formData.trainingPreference];
    } else {
      price = course.basePrice;
      if (formData.trainingPreference === 'Online (One-on-one)') {
        price *= 1.4;
      }
    }
    setCalculatedPrice(price);
  }, [formData.trainingPreference, course]);

  const toggleModule = (moduleIndex) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleIndex]: !prev[moduleIndex]
    }));
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast({ variant: "destructive", title: "Missing Information", description: "Please fill in all required fields." });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const EMAILJS_SERVICE_ID = 'service_mw1a8qa';
      const EMAILJS_TEMPLATE_ID = 'template_4x534yq'; 
      const EMAILJS_PUBLIC_KEY = 'XO3x8E4Ry_8SzuR8N';

      const submissionData = {
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: 'N/A',
        course_name: course.title,
        training_type: formData.trainingPreference,
        weekdays_selected: 'N/A',
        weekends_selected: 'N/A',
        additional_message: `Sponsor: ${formData.sponsor}, Preferred Time: ${formData.preferredTime}`,
        form_type: 'Explore Courses',
        submission_date: new Date().toLocaleString()
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        submissionData,
        EMAILJS_PUBLIC_KEY
      );

      toast({ 
        title: "Enrollment Submitted Successfully! 👍", 
        description: "Our team will contact you to confirm your course placement and payment details.",
        duration: 8000,
        className: 'bg-green-100 border-green-400 text-green-700'
      });
      
      const message = `Hello Skiva Digital Academy! 👋

I would like to enroll for a course:

📚 *Course:* ${course.title}
👤 *Full Name:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone}
💼 *Sponsor:* ${formData.sponsor}
💻 *Training Mode:* ${formData.trainingPreference}
⏰ *Preferred Time:* ${formData.preferredTime}

I'm excited to get started and look forward to learning with you!

Please send me the payment details and next steps.

Thank you! 🎓`;
      
      const whatsappUrl = `https://wa.me/2347025753414?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      setFormData({ name: '', email: '', phone: '', sponsor: 'Self', trainingPreference: 'Online (Group)', preferredTime: 'Morning' });
      
    } catch (error) {
      console.error('Error submitting enrollment:', error);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "There was an error submitting your enrollment. Please try again or contact us directly via WhatsApp.",
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const courseSchema = useMemo(() => {
    if (course.title === 'Course Not Found') return null;
    return {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": course.title,
      "description": course.description,
      "provider": { "@type": "Organization", "name": "Skiva Digital Academy", "sameAs": "https://www.skivadigitalacademy.com" },
      "offers": {
        "@type": "Offer",
        "price": course.basePrice,
        "priceCurrency": "NGN",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "85"
      }
    };
  }, [course]);

  const displayPrice = () => {
    const priceInNGN = calculatedPrice.toLocaleString();
    const priceInUSD = (calculatedPrice / exchangeRate).toFixed(0);
    return `₦${priceInNGN} ($${priceInUSD} USD)`;
  };

  if (course.title === 'Course Not Found') {
    return <div className="text-center py-40">
        <h1 className="text-3xl font-bold">Course Not Found</h1>
        <p className="text-muted-foreground mt-4">The course you are looking for does not exist.</p>
        <Link to="/courses"><Button className="mt-8">Back to Courses</Button></Link>
      </div>;
  }

  return <>
      <Helmet>
        <title>{`${course.title} - Skiva Digital Academy`}</title>
        <meta name="description" content={course.description} />
        <link rel="canonical" href={`https://www.skivadigitalacademy.com/course/${courseId}`} />
        {courseSchema && <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>}
      </Helmet>
      <div className="bg-background text-foreground pt-20">
        <section className="py-20 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl md:text-5xl font-bold font-heading text-primary mb-4">{course.title}</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-lg text-muted-foreground max-w-3xl">{course.description}</motion.p>
            <div className="flex flex-wrap gap-6 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart className="w-4 h-4 text-primary" />
                <span>{course.level}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold font-heading mb-6">Course Details</h2>
              <div className="space-y-8">
                {/* Learning Outcomes Section - Updated to match BookTraining */}
                <div>
                  <h3 className="text-xl font-semibold font-heading mb-6 flex items-center">
                    <Target className="w-5 h-5 mr-3 text-primary" />
                    What You'll Learn
                  </h3>
                  <div className="space-y-3">
                    {course.outcomes.map((outcome, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200"
                      >
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-gray-700 font-medium align-middle">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Syllabus */}
                <div>
                  <h3 className="text-xl font-semibold font-heading mb-3">Course Syllabus</h3>
                  <div className="space-y-4">
                    {course.syllabus.map((moduleItem, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleModule(index)}
                          className="w-full p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center text-left"
                        >
                          <span className="font-semibold text-lg">{moduleItem.module}</span>
                          {expandedModules[index] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </button>
                        {expandedModules[index] && (
                          <div className="p-4 bg-white">
                            <ul className="space-y-2">
                              {moduleItem.topics.map((topic, topicIndex) => (
                                <li key={topicIndex} className="flex items-start">
                                  <span className="text-primary mr-2">•</span>
                                  <span className="text-muted-foreground">{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools & Technologies */}
                <div>
                  <h3 className="text-xl font-semibold font-heading mb-3 flex items-center"><Wrench className="w-5 h-5 mr-2 text-primary" /> Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.tools.map((tool, i) => <span key={i} className="bg-secondary text-secondary-foreground text-sm font-medium px-3 py-1 rounded-full">{tool}</span>)}
                  </div>
                </div>
              </div>

              {/* Course Learning Requirements - Updated to match BookTraining */}
              <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-xl font-semibold font-heading mb-4 flex items-center">
                  <Laptop className="w-5 h-5 mr-3 text-primary" />
                  Course Learning Requirements
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Any laptop with at least 8GB RAM, a Core i5/i7 processor, 256GB SSD, and stable internet is required. 
                  Students should also have a notebook for notes, maintain a practical and collaborative learning mindset.
                </p>
              </div>
            </div>
            
            {/* Enrollment Form */}
            <div className="bg-card p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold font-heading mb-2 text-center">Enroll Now</h2>
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-primary">{displayPrice()}</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div><Label htmlFor="name" className="flex items-center space-x-2 mb-1"><User className="w-4 h-4" /><span>Full Name</span></Label><Input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required placeholder="Your Full Name" /></div>
                <div><Label htmlFor="email" className="flex items-center space-x-2 mb-1"><Mail className="w-4 h-4" /><span>Email</span></Label><Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required placeholder="you@example.com" /></div>
                <div><Label htmlFor="phone" className="flex items-center space-x-2 mb-1"><Phone className="w-4 h-4" /><span>WhatsApp Phone Number</span></Label><Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required placeholder="For class updates" /></div>
                <div><Label htmlFor="sponsor" className="flex items-center space-x-2 mb-1"><Briefcase className="w-4 h-4" /><span>Sponsor</span></Label><select id="sponsor" name="sponsor" value={formData.sponsor} onChange={handleInputChange} required className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"><option>Self</option><option>Parent / Guardian</option><option>Employer</option><option>Other</option></select></div>
                <div><Label htmlFor="trainingPreference" className="flex items-center space-x-2 mb-1"><Users className="w-4 h-4" /><span>Training Preference</span></Label><select id="trainingPreference" name="trainingPreference" value={formData.trainingPreference} onChange={handleInputChange} required className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"><option value="Online (Group)">Online (Group)</option><option value="Online (One-on-one)">Online (One-on-one)</option></select></div>
                <div><Label htmlFor="preferredTime" className="flex items-center space-x-2 mb-1"><Clock className="w-4 h-4" /><span>Preferred Time</span></Label><select id="preferredTime" name="preferredTime" value={formData.preferredTime} onChange={handleInputChange} required className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"><option>Morning</option><option>Afternoon</option><option>Evening</option></select></div>
                <Button type="submit" variant="accent" size="lg" className="w-full mt-4" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Enrollment'}</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>;
};
export default CourseDetail;