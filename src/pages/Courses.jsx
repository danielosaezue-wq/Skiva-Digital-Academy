import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Laptop, Shield, Server, Monitor, Smartphone, Palette, Code, BarChart, PenTool, Video, Mic, Box as Cube, Megaphone, FileText, BrainCircuit, Wifi, Star, Search, Book, Image as ImageIcon, Wind, Eye, Calendar, X, CheckCircle, Wrench, Target, User, Mail, Users, MessageSquare, Phone, MapPin, Tag, Info, ExternalLink, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Updated courses data to match BookTraining structure
const coursesData = {
  'Creative & Digital Skills': [
    { id: 'ui-ux-design', title: 'UI/UX Design', description: 'Create intuitive and beautiful user interfaces and experiences for digital products using industry-standard design principles.', duration: '6 weeks', format: 'Online / Physical', icon: <Palette className="w-8 h-8 text-accent" />, price: 120000 },
    { id: 'graphic-brand-identity-design', title: 'Graphic Design', description: 'Develop complete brand identities including logos, color schemes, and brand guidelines.', duration: '10 weeks', format: 'Online / Physical', icon: <PenTool className="w-8 h-8 text-accent" />, price: 90000 },
    { id: 'video-editing', title: 'Video Editing', description: 'Learn professional video editing techniques from cutting to final production with industry-standard software.', duration: '4 weeks', format: 'Online / Physical', icon: <Video className="w-8 h-8 text-accent" />, price: 100000 },
    { id: 'character-animations', title: 'Character Animations', description: 'Bring characters to life through animation principles and digital tools.', duration: '8 weeks', format: 'Online / Physical', icon: <Cube className="w-8 h-8 text-accent" />, price: 130000 },
    { id: '3d-modelling', title: '3D Modelling', description: 'Create stunning 3D models and assets for games, animations, and visualizations.', duration: '8 weeks', format: 'Online / Physical', icon: <Cube className="w-8 h-8 text-accent" />, price: 120000 },
    { id: 'social-media-marketing', title: 'Social Media Marketing', description: 'Master social media strategies to grow brands and engage audiences effectively.', duration: '5 weeks', format: 'Online / Physical', icon: <Megaphone className="w-8 h-8 text-accent" />, price: 110000 },
    { id: 'search-engine-optimization-seo', title: 'Search Engine Optimization (SEO)', description: 'Optimize websites to rank higher in search engines and drive organic traffic through proven strategies.', duration: '5 weeks', format: 'Online / Physical', icon: <Search className="w-8 h-8 text-accent" />, price: 110000 },
    { id: 'digital-marketing', title: 'Digital Marketing', description: 'Master digital marketing strategies including SEO, social media, email marketing, and analytics to drive business growth.', duration: '10 weeks', format: 'Online / Physical', icon: <Megaphone className="w-8 h-8 text-accent" />, price: 170000 },
    { id: 'book-publishing', title: 'Book Publishing', description: 'Navigate the complete book publishing process from manuscript to marketplace successfully.', duration: '6 weeks', format: 'Online / Physical', icon: <Book className="w-8 h-8 text-accent" />, price: 140000 },
    { id: 'photo-editing-retouching', title: 'Photo Editing / Retouching', description: 'Professional photo editing and retouching techniques for stunning visual results.', duration: '4 weeks', format: 'Online / Physical', icon: <ImageIcon className="w-8 h-8 text-accent" />, price: 95000 },
  ],
  'Development': [
    { id: 'website-design', title: 'Website Design', description: 'This course teaches how to create, customize, and manage professional websites using ready-made themes and drag-and-drop tools—designing and building responsive, user-friendly websites that convert visitors, without coding or designing from scratch.', duration: '8 weeks', format: 'Online / Physical', icon: <Monitor className="w-8 h-8 text-accent" />, price: 150000 },
    { id: 'front-end-development', title: 'Front-End Development', description: 'Create beautiful, interactive user interfaces with modern web technologies.', duration: '8 weeks', format: 'Online / Physical', icon: <Code className="w-8 h-8 text-accent" />, price: 120000 },
    { id: 'back-end-development', title: 'Back-End Development', description: 'Build server-side applications, databases, and APIs that power web applications.', duration: '8 weeks', format: 'Online / Physical', icon: <Server className="w-8 h-8 text-accent" />, price: 120000 },
    { id: 'full-stack-development', title: 'Full Stack Development', description: 'Master both front-end and back-end development to build complete, scalable web applications from concept to deployment.', duration: '12 weeks', format: 'Online / Physical', icon: <Server className="w-8 h-8 text-accent" />, price: 200000 },
    { id: 'mobile-app-development', title: 'Mobile App Development', description: 'Create cross-platform mobile applications using modern development frameworks.', duration: '10 weeks', format: 'Online / Physical', icon: <Smartphone className="w-8 h-8 text-accent" />, price: 180000 },
    { id: 'cyber-security', title: 'Cybersecurity', description: 'Learn to protect systems, networks, and programs from digital attacks through hands-on labs and real-world security scenarios.', duration: '8 weeks', format: 'Online / Physical', icon: <Shield className="w-8 h-8 text-accent" />, price: 150000 },
    { id: 'python-programming', title: 'Python Programming', description: 'Learn Python programming from basics to advanced applications and automation.', duration: '8 weeks', format: 'Online / Physical', icon: <Code className="w-8 h-8 text-accent" />, price: 140000 },
  ],
  'Emerging Technologies': [
    { id: 'internet-of-things-fundamentals', title: 'Internet of Things (Fundamentals)', description: 'Connect physical devices to the internet and create smart IoT solutions.', duration: '8 weeks', format: 'Online / Physical', icon: <Wifi className="w-8 h-8 text-accent" />, price: 160000 },
    { id: 'data-analysis', title: 'Data Analysis', description: 'Transform raw data into meaningful insights for business decision making using powerful analytical tools.', duration: '6 weeks', format: 'Online / Physical', icon: <BarChart className="w-8 h-8 text-accent" />, price: 130000 },
    { id: 'data-science', title: 'Data Science', description: 'Master the complete data science pipeline from collection to insights with real-world datasets.', duration: '8 weeks', format: 'Online / Physical', icon: <BarChart className="w-8 h-8 text-accent" />, price: 120000 },
  ],
  'Foundational IT Skills': [
    { id: 'ict-fundamentals', title: 'ICT Fundamentals', description: 'Build essential computer skills and understand fundamental IT concepts.', duration: '4 weeks', format: 'Online / Physical', icon: <FileText className="w-8 h-8 text-accent" />, price: 70000 },
  ],
  'IT Certification': [
    { id: 'comptia-network-plus', title: 'CompTIA Network+ (N+)', description: 'CompTIA Network+ (N+) is an entry-level IT course that teaches the fundamentals of computer networking, including network concepts, infrastructure, security, and troubleshooting, preparing learners for network administration and IT support roles.', duration: '9 weeks', format: 'Online / Physical', icon: <Shield className="w-8 h-8 text-accent" />, price: 170000 },
  ]
};

// Enhanced courses data with detailed information - Matching BookTraining.jsx structure exactly
const courseDetailsData = {
  'Cybersecurity': { 
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
  },
  'Full Stack Development': { 
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
  },
  'UI/UX Design': { 
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
  },
  'Video Editing': { 
    basePrice: 100000,
    description: 'Learn professional video editing techniques from cutting to final production with industry-standard software.',
    duration: '2 hrs/session • 8 sessions • 4 weeks',
    level: 'Beginner',
    tools: ['Adobe Premiere Pro', 'Cap Cut'],
    outcomes: [
      'Video Fundamentals - Frame rates, resolution, aspect ratios, formats',
      'Editing Basics - Cutting, trimming, transitions, layering clips',
      'Color Grading & Correction - Enhancing visual tone, LUTs, color matching',
      'Storytelling with Video Editing',
      'Audio & Sound Design - Background music, sound effects, voiceovers',
      'Exporting & Delivery - Formats for web, social media, and broadcast',
      'AI-assisted editing, automated video cutting, AI-based color grading, smart transitions, AI-generated captions and subtitles'
    ],
  },
  'Data Analysis': { 
    basePrice: 130000,
    description: 'Transform raw data into meaningful insights for business decision making using powerful analytical tools.',
    duration: '2 hrs/session • 12 sessions • 6 weeks',
    level: 'Beginner to Intermediate',
    tools: ['Python (Pandas, NumPy)', 'Excel', 'Google Sheets', 'Tableau', 'Power BI'],
    outcomes: [
      'Data collection & cleaning',
      'Exploratory Data Analysis (EDA)',
      'Statistical analysis & visualization',
      'Reporting & dashboards',
      'Business insights & decision making',
      'Integrating AI (AI-driven predictive analytics, automated data insights)'
    ],
  },
  'Data Science': { 
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
  },
  'Search Engine Optimization (SEO)': { 
    basePrice: 110000,
    description: 'Optimize websites to rank higher in search engines and drive organic traffic through proven strategies.',
    duration: '2 hrs/session • 10 sessions • 5 weeks',
    level: 'Beginner to Intermediate',
    tools: ['Google Analytics', 'Google Search Console', 'SEMrush', 'Ahrefs', 'Moz', 'Screaming Frog'],
    outcomes: [
      'SEO fundamentals & ranking factors',
      'Keyword research & analysis',
      'On-page SEO (meta tags, headings, URL structure)',
      'Off-page SEO (link building, outreach)',
      'Technical SEO (site speed, mobile optimization, schema)',
      'SEO reporting & analytics',
      'Integrating AI (AI-powered keyword analysis, content optimization, automated SEO tools)'
    ],
  },
  'Digital Marketing': { 
    basePrice: 170000,
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
  },
  'Book Publishing': { 
    basePrice: 140000,
    description: 'Navigate the complete book publishing process from manuscript to marketplace successfully.',
    duration: '2 hrs/session • 12 sessions • 6 weeks',
    level: 'Beginner',
    tools: ['Microsoft Word', 'Adobe InDesign', 'KDP', 'Google Docs', 'Grammarly'],
    outcomes: [
      'Manuscript Preparation and Editing',
      'Professional Formatting and Layout Design',
      'Cover Design Principles and Creation',
      'Publishing Platforms Mastery',
      'Marketing and Distribution Strategies',
      'Integrating Artificial Intelligence (AI)'
    ],
  },
  'Photo Editing / Retouching': { 
    basePrice: 95000,
    description: 'Professional photo editing and retouching techniques for stunning visual results.',
    duration: '2 hrs/session • 8 sessions • 4 weeks',
    level: 'Beginner to Intermediate',
    tools: ['Adobe Photoshop', 'Adobe Lightroom', 'Capture One', 'Affinity Photo'],
    outcomes: [
      'Image adjustments (exposure, contrast, color)',
      'Retouching (blemishes, skin smoothing, background removal)',
      'Layers, masks & non-destructive editing',
      'Compositing & creative effects',
      'Exporting for web & print',
      'Integrating AI (AI-assisted image enhancement, auto-retouching, AI filters etc)'
    ],
  },
  'Graphic Design': { 
    basePrice: 90000,
    customPrices: { 'Online (Group)': 90000, 'Online (One-on-one)': 120000, 'Physical (One-on-one)': 180000 },
    description: 'Develop complete brand identities including logos, color schemes, and brand guidelines.',
    duration: '2 hrs/session • 20 sessions • 10 weeks',
    level: 'Beginner to Intermediate',
    tools: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'Canva'],
    outcomes: [
      'Design Principles & Fundamentals',
      'Color Theory & Typography',
      'Image Editing & Photo Manipulation',
      'Branding & Logo Design',
      'Illustrations & Iconography',
      'Layout & Publication Design',
      'Marketing & Promotional Design',
      'Creative Workflow & File Management',
      'Exporting for Print & Digital',
      'Portfolio Development',
      'AI-assisted logo and asset generation, automated color palette suggestions, AI-driven brand style recommendations, generative design tools'
    ],
  },
  'Character Animations': { 
    basePrice: 130000,
    description: 'Bring characters to life through animation principles and digital tools.',
    duration: '2 hrs/session • 16 sessions • 8 weeks',
    level: 'Beginner to Intermediate',
    tools: ['Adobe Animate', 'After Effects', 'Blender'],
    outcomes: [
      'Animation Principles: Timing, squash & stretch, anticipation, follow-through',
      'Character Design: Creating appealing and expressive characters',
      'Storyboarding & Planning: Visual storytelling, scene planning, animatics',
      '2D & 3D Animation Techniques: Keyframing, rigging, motion paths',
      'Facial & Body Animation: Expressions, gestures, lip-sync',
      'Special Effects & Motion Graphics: Particle effects, environmental interaction',
      'Exporting & Delivery: Formats for web, social media, and film',
      'Integrating AI: AI-assisted rigging, AI-driven in-betweening, automated lip-sync, AI-enhanced motion capture'
    ],
  },
  'Social Media Marketing': { 
    basePrice: 110000,
    description: 'Master social media strategies to grow brands and engage audiences effectively.',
    duration: '2 hrs/session • 10 sessions • 5 weeks',
    level: 'Beginner to Intermediate',
    tools: ['Meta Business Suite', 'Hootsuite', 'Buffer', 'Canva', 'Sprout Social', 'Google Analytics'],
    outcomes: [
      'Social media strategy & planning',
      'Content creation & scheduling',
      'Platform management (Facebook, Instagram, LinkedIn, TikTok, Twitter)',
      'Audience engagement & community building',
      'Analytics & performance tracking',
      'Paid advertising & campaign management',
      'Integrating AI: AI-powered content generation, predictive analytics, automated scheduling, audience targeting, AI-driven campaign optimization'
    ],
  },
  'Website Design': { 
    basePrice: 150000,
    description: 'This course teaches how to create, customize, and manage professional websites using ready-made themes and drag-and-drop tools—designing and building responsive, user-friendly websites that convert visitors, without coding or designing from scratch.',
    duration: '2 hrs/session • 16 sessions • 8 weeks',
    level: 'Beginner to Intermediate',
    tools: ['WordPress', 'Elementor', 'Wix / Squarespace', 'Canva', 'cPanel', 'Domain & Hosting Platforms'],
    outcomes: [
      'Website Basics & Builders Overview',
      'Domain, Hosting & Website Setup',
      'Theme Selection & Customization',
      'Drag-and-Drop Page Building',
      'Content Management & Media Upload',
      'Basic SEO, Security & Maintenance',
      'Website Publishing & Client Handover',
      'Integrating AI for Website Content, Layout & SEO'
    ],
  },
  'Mobile App Development': { 
    basePrice: 180000,
    description: 'Create cross-platform mobile applications using modern development frameworks.',
    duration: '2 hrs/session • 20 sessions • 10 weeks',
    level: 'Intermediate to Advanced',
    tools: ['Flutter', 'React Native', 'Android Studio', 'Xcode', 'Figma (UI)'],
    outcomes: [
      'Mobile UI/UX principles',
      'Dart / JavaScript basics',
      'Cross-platform app development (Flutter/React Native)',
      'State management & navigation',
      'Backend integration & APIs',
      'App testing & deployment (Play Store/App Store)',
      'Integrating AI (AI-assisted app prototyping, AI chatbots, predictive app analytics)'
    ],
  },
  'Python Programming': { 
    basePrice: 140000,
    description: 'Learn Python programming from basics to advanced applications and automation.',
    duration: '2 hrs/session • 16 sessions • 8 weeks',
    level: 'Beginner to Advanced',
    tools: ['VS Code', 'PyCharm', 'Jupyter Notebook', 'Anaconda'],
    outcomes: [
      'Python syntax & data types',
      'Control flow & functions',
      'Modules & packages',
      'File handling & exceptions',
      'Object-Oriented Programming (OOP)',
      'Basic libraries: NumPy, Pandas, Matplotlib',
      'Integrating AI (AI libraries, neural networks, AI-powered problem solving)'
    ],
  },
  'Internet of Things (Fundamentals)': { 
    basePrice: 160000,
    description: 'Connect physical devices to the internet and create smart IoT solutions.',
    duration: '2 hrs/session • 16 sessions • 8 weeks',
    level: 'Beginner to Intermediate',
    tools: ['Arduino', 'Raspberry Pi', 'Sensors', 'Node-RED', 'MQTT'],
    outcomes: [
      'Circuit Design and Electronic Principles',
      'Sensor Integration and Data Collection',
      'IoT Protocols and Communication Methods',
      'Remote Control and Monitoring Systems',
      'Prototype Development and Testing',
      'Integrating Artificial Intelligence (AI)'
    ],
  },
  'ICT Fundamentals': { 
    basePrice: 70000,
    description: 'Build essential computer skills and understand fundamental IT concepts.',
    duration: '2 hrs/session • 8 sessions • 4 weeks',
    level: 'Absolute Beginner',
    tools: ['Microsoft Office', 'Windows OS', 'Internet Tools', 'File Management'],
    outcomes: [
      'Computer Literacy and Operating System Navigation',
      'Office Software Proficiency (Word, Excel, PowerPoint)',
      'Internet Skills and Online Safety',
      'File Management and Organization',
      'Basic Troubleshooting and Maintenance',
      'Integrating Artificial Intelligence (AI)'
    ],
  },
  'Front-End Development': { 
    basePrice: 120000,
    description: 'Create beautiful, interactive user interfaces with modern web technologies.',
    duration: '2 hrs/session • 16 sessions • 8 weeks',
    level: 'Beginner to Intermediate',
    tools: ['VS Code', 'Chrome DevTools', 'Git', 'Node.js'],
    outcomes: [
      'HTML5, CSS3, JavaScript fundamentals',
      'Responsive web design & Flexbox/Grid',
      'CSS frameworks (Bootstrap, Tailwind)',
      'JavaScript DOM manipulation & events',
      'Version control (Git & GitHub)',
      'Integrating AI (AI code assistants, predictive coding, AI-based testing)'
    ],
  },
  'Back-End Development': { 
    basePrice: 120000,
    description: 'Build server-side applications, databases, and APIs that power web applications.',
    duration: '2 hrs/session • 16 sessions • 8 weeks',
    level: 'Intermediate',
    tools: ['Node.js', 'Express', 'Django', 'Flask', 'MySQL', 'PostgreSQL', 'MongoDB'],
    outcomes: [
      'Server-side programming & APIs',
      'Database design & management',
      'Authentication & authorization',
      'RESTful APIs & CRUD operations',
      'Security & deployment basics',
      'Integrating AI (AI-driven server optimization, predictive analytics, AI-based security monitoring)'
    ],
  },
  '3D Modelling': { 
    basePrice: 120000,
    description: 'Create stunning 3D models and assets for games, animations, and visualizations.',
    duration: '2 hrs/session • 16 sessions • 8 weeks',
    level: 'Beginner to Intermediate',
    tools: ['Blender', 'Maya', 'Unity'],
    outcomes: [
      '3D Modeling Techniques and Topology',
      'Texturing and Material Creation',
      'Lighting and Rendering Principles',
      'Asset Creation and Optimization',
      'Scene Composition and Presentation',
      'Integrating Artificial Intelligence (AI)'
    ],
  },
  'CompTIA Network+ (N+)': { 
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
  },
};

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const navigate = useNavigate();

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

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setShowCourseModal(true);
  };

  const handleBookNow = (courseTitle) => {
    navigate('/book-training', { state: { preSelectedCourse: courseTitle } });
  };

  return (
    <>
      <Helmet>
        <title>Explore Our Courses - Skiva Digital Academy</title>
        <meta name="description" content="Explore top-rated tech courses in Lagos and across Nigeria. Skiva offers training in web development, cybersecurity, UI/UX, data analysis, digital marketing, and more." />
        <link rel="canonical" href="https://www.skivadigitalacademy.com/courses" />
      </Helmet>

      {/* Course Details Modal - Updated to match BookTraining.jsx exactly */}
      {showCourseModal && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-primary text-white p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-4">{selectedCourse.title}</h2>
                  <p className="text-white text-lg leading-relaxed opacity-95">
                    {courseDetailsData[selectedCourse.title]?.description || selectedCourse.description}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCourseModal(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 ml-6 flex-shrink-0"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm uppercase tracking-wide opacity-90">Duration</div>
                    <div className="text-white font-medium text-lg">
                      {courseDetailsData[selectedCourse.title]?.duration || selectedCourse.duration}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                    <BarChart className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm uppercase tracking-wide opacity-90">Skill Level</div>
                    <div className="text-white font-medium text-lg">
                      {courseDetailsData[selectedCourse.title]?.level || 'Beginner to Intermediate'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 overflow-y-auto max-h-[60vh]">
              <div className="space-y-8">
                {/* Learning Requirements - Updated to match BookTraining */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center text-lg">
                    <Laptop className="h-5 w-5 mr-3 text-primary" />
                    Course Learning Requirements
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Any laptop with at least 8GB RAM, a Core i5/i7 processor, 256GB SSD, and stable internet is required. 
                    Students should also have a notebook for notes, maintain a practical and collaborative learning mindset.
                  </p>
                </div>

                {/* Tools & Technologies */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-6 flex items-center text-lg">
                    <Wrench className="h-5 w-5 mr-3 text-primary" />
                    Tools & Technologies You'll Master
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {(courseDetailsData[selectedCourse.title]?.tools || []).map((tool, index) => (
                      <span
                        key={index}
                        className="px-4 py-3 bg-gray-100 text-gray-800 text-sm rounded-lg font-medium border border-gray-200"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Learning Outcomes - Updated to match BookTraining */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-6 flex items-center text-lg">
                    <Target className="h-5 w-5 mr-3 text-primary" />
                    What You'll Learn
                  </h4>
                  <div className="space-y-3">
                    {(courseDetailsData[selectedCourse.title]?.outcomes || []).map((outcome, index) => (
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
              </div>
            </div>

            <div className="border-t border-gray-200 bg-white px-8 py-6">
              <div className="flex justify-end space-x-4">
                <Button
                  onClick={() => setShowCourseModal(false)}
                  variant="outline"
                  className="px-8 py-3 text-base font-semibold"
                >
                  Close
                </Button>
                <Button
                  onClick={() => handleBookNow(selectedCourse.title)}
                  className="bg-primary text-white hover:bg-primary-dark px-8 py-3 text-base font-semibold"
                >
                  Book This Course
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

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
              Pick your program and jumpstart your digital career now.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 max-w-2xl mx-auto"
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for a course (e.g., 'UI/UX')"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-12 pl-5 rounded-full h-14 text-lg"
                />
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
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
                        <div className="grid grid-cols-2 gap-3">
                          <Button 
                            variant="outline" 
                            className="w-full hover:bg-gray-100 hover:text-gray-900 border-gray-300"
                            onClick={() => handleViewDetails(course)}
                          >
                            View Details
                          </Button>
                          <Button 
                            className="w-full bg-primary text-white hover:bg-primary-dark"
                            onClick={() => handleBookNow(course.title)}
                          >
                            Book Now
                          </Button>
                        </div>
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