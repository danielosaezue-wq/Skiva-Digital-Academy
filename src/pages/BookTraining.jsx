import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Book, Users, Calendar, MessageSquare, Phone, MapPin, BarChart, Clock, Tag, Info, X, CheckCircle, ExternalLink, Wrench, Laptop, Target, Eye, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import emailjs from '@emailjs/browser';
import { useLocation } from 'react-router-dom';

// Enhanced courses data with detailed information
const coursesData = {
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
    duration: '2 hrs/session • 12 sessions • 6 weeks',
    level: 'Beginner to Intermediate',
    tools: ['Google Analytics', 'Google Search Console', 'Ubersuggest', 'Google Keyword Planner', 'Screaming Frog'],
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
    tools: ['Google Analytics', 'Google Ads', 'Meta Ads Manager (Facebook & Instagram)', 'TikTok Ads Manager', 'Snapchat Ads Manager', 'Mailchimp', 'Ubersuggest', 'Canva', 'Hootsuite', 'WordPress'],
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
    tools: ['Microsoft Word', 'Adobe InDesign', 'KDP', 'Google Docs', 'Photoshop', 'Grammarly'],
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
    duration: '2 hrs/session • 12 sessions • 6 weeks',
    level: 'Beginner to Intermediate',
    tools: ['Meta Business Suite', 'Hootsuite', 'Buffer', 'Canva', 'Zapier', 'TikTok Ads Manager', 'Snapchat Ads Manager'],
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

const allCourses = Object.keys(coursesData);

const BookTraining = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', location: '', ageRange: '', skillLevel: '',
    courseInterest: '', trainingMode: 'Online (Group)', preferredTime: '', preferredSchedule: [], message: '', promoCode: '',
    otherCourseName: ''
  });
  
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  
  const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Handle pre-selected course from navigation
  useEffect(() => {
    if (location.state?.preSelectedCourse) {
      setFormData(prev => ({
        ...prev,
        courseInterest: location.state.preSelectedCourse
      }));
    }
  }, [location.state]);

  const selectedCourse = coursesData[formData.courseInterest];
  const isCustomCourse = formData.courseInterest === 'Other';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ 
      ...prev, 
      courseInterest: value,
      // Clear other course name when a specific course is selected
      otherCourseName: value === 'Other' ? prev.otherCourseName : '',
      // Clear promo code when switching to custom course
      promoCode: value === 'Other' ? '' : prev.promoCode
    }));
    
    // Remove discount if switching to custom course
    if (value === 'Other' && isPromoApplied) {
      setIsPromoApplied(false);
    }
  };

  const handleOtherCourseChange = (e) => {
    const value = e.target.value;
    // Basic validation - remove any HTML tags and limit to 150 characters
    const sanitizedValue = value.replace(/<[^>]*>/g, '').slice(0, 150);
    setFormData(prev => ({ ...prev, otherCourseName: sanitizedValue }));
  };

  const handleCheckboxChange = (day) => {
    setFormData(prev => {
      const schedule = prev.preferredSchedule.includes(day)
        ? prev.preferredSchedule.filter(d => d !== day)
        : [...prev.preferredSchedule, day];
      return { ...prev, preferredSchedule: schedule };
    });
  };

  const getPriceForMode = (courseName, mode) => {
    // For custom courses, return null to indicate no fixed price
    if (courseName === 'Other') {
      return null;
    }

    if (!coursesData[courseName]) return 0;

    const course = coursesData[courseName];
    if (!course) return 0;

    if (course.customPrices && course.customPrices[mode]) {
      return course.customPrices[mode];
    }

    if (mode === 'Online (One-on-one)') return course.basePrice * 1.4;
    return course.basePrice; // Default is 'Online (Group)'
  };
  
  // Calculate original price for the selected course and mode
  const originalPrice = getPriceForMode(formData.courseInterest, formData.trainingMode);
  
  // Check if it's a custom course (no fixed price)
  const isCustomCoursePrice = originalPrice === null;
  
  // Calculate discount and final price only for non-custom courses
  const discount = isPromoApplied && !isCustomCoursePrice ? originalPrice * 0.3 : 0;
  const calculatedPrice = !isCustomCoursePrice ? originalPrice - discount : null;

  const handlePromoCodeApply = () => {
    // Don't apply promo code for custom courses
    if (isCustomCourse) {
      toast({
        variant: "destructive",
        title: "Promo Code Not Applicable",
        description: "Promo codes cannot be applied to custom course requests.",
      });
      return;
    }
    
    if (formData.promoCode.trim() === 'sda_101125') {
      setIsPromoApplied(true);
      toast({
        title: "🎉 Promo Code Applied!",
        description: "30% discount has been applied to your training fee!",
        className: 'bg-green-100 border-green-400 text-green-700'
      });
    } else if (formData.promoCode.trim()) {
      toast({
        variant: "destructive",
        title: "Invalid Promo Code",
        description: "The promo code you entered is not valid.",
      });
    }
  };

  const handlePromoCodeChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, promoCode: value }));
    
    // Remove discount if promo code is cleared
    if (!value.trim() && isPromoApplied) {
      setIsPromoApplied(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.email) {
      toast({ variant: "destructive", title: "Missing Information", description: "Please fill in all required fields." });
      return;
    }

    // Validate course selection
    if (!formData.courseInterest) {
      toast({ variant: "destructive", title: "Course Required", description: "Please select a course or enter a custom course name." });
      return;
    }

    // Validate custom course name if "Other" is selected
    if (isCustomCourse && !formData.otherCourseName.trim()) {
      toast({ variant: "destructive", title: "Custom Course Required", description: "Please enter the name of the course you're interested in." });
      return;
    }

    setIsSubmitting(true);
    try {
      const weekdays_selected = formData.preferredSchedule.filter(day => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(day)).join(', ') || 'Not specified';
      const weekends_selected = formData.preferredSchedule.filter(day => ['Saturday', 'Sunday'].includes(day)).join(', ') || 'Not specified';

      // Determine the final course name (custom name overrides dropdown)
      const finalCourseName = formData.otherCourseName.trim() && isCustomCourse 
        ? formData.otherCourseName 
        : formData.courseInterest;

      // Prepare submission data
      const submissionData = {
        full_name: formData.fullName || 'Not provided',
        email: formData.email || 'Not provided',
        phone: formData.phone || 'Not provided',
        location: formData.location || 'Not provided',
        age_range: formData.ageRange || 'Not specified',
        skill_level: formData.skillLevel || 'Not specified',
        course_name: finalCourseName || 'Not specified',
        training_type: formData.trainingMode || 'Not specified',
        preferred_time: formData.preferredTime || 'Not specified',
        weekdays_selected: weekdays_selected,
        weekends_selected: weekends_selected,
        course_price: isCustomCourse ? 'Custom Quote - Contact for Pricing' : `₦${calculatedPrice.toLocaleString()}`,
        original_price: isCustomCourse ? 'Custom Quote' : `₦${originalPrice.toLocaleString()}`,
        discount_applied: isCustomCourse ? 'N/A' : (isPromoApplied ? '30%' : '0%'),
        promo_code_used: isCustomCourse ? 'N/A' : (isPromoApplied ? formData.promoCode : 'None'),
        additional_message: formData.message || 'No additional message provided',
        form_type: isCustomCourse ? 'Custom Course Request' : 'Book Training',
        submission_date: new Date().toLocaleString(),
        is_custom_course: isCustomCourse ? 'Yes' : 'No'
      };

      console.log('EmailJS Submission Data:', submissionData);

      const EMAILJS_SERVICE_ID = 'service_mw1a8qa';
      const EMAILJS_TEMPLATE_ID = 'template_cxtz3cs';
      const EMAILJS_PUBLIC_KEY = 'XO3x8E4Ry_8SzuR8N';
      
      // Send email first
      const emailResult = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, submissionData, EMAILJS_PUBLIC_KEY);
      
      console.log('EmailJS result:', emailResult);
      
      if (emailResult.status === 200) {
        // WhatsApp message
        const whatsappMessage = isCustomCourse 
          ? `Hello Skiva Digital Academy! 👋

I would like to request a custom training:

📚 *Course Request:* ${finalCourseName}
👤 *Full Name:* ${formData.fullName}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone}
📍 *Location:* ${formData.location}
👥 *Age Range:* ${formData.ageRange}
📊 *Skill Level:* ${formData.skillLevel}
💻 *Training Mode:* ${formData.trainingMode}
⏰ *Preferred Time:* ${formData.preferredTime}
📅 *Schedule:* ${formData.preferredSchedule.join(', ') || 'Not specified'}
💰 *Price:* Custom Quote Required
💬 *Message:* ${formData.message || 'No additional message'}

Please contact me with more information and pricing details.`
          : `Hello Skiva Digital Academy! 👋

I would like to book a training:

📚 *Course:* ${finalCourseName}
👤 *Full Name:* ${formData.fullName}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone}
📍 *Location:* ${formData.location}
👥 *Age Range:* ${formData.ageRange}
📊 *Skill Level:* ${formData.skillLevel}
💻 *Training Mode:* ${formData.trainingMode}
⏰ *Preferred Time:* ${formData.preferredTime}
📅 *Schedule:* ${formData.preferredSchedule.join(', ') || 'Not specified'}
💰 *Price:* ₦${calculatedPrice.toLocaleString()}${isPromoApplied ? ` (Original: ₦${originalPrice.toLocaleString()}, 30% OFF!)` : ''}
${isPromoApplied ? `🎟️ *Promo Code Used:* ${formData.promoCode}` : ''}
💬 *Message:* ${formData.message || 'No additional message'}

Please contact me with available dates and payment details.`;

        const whatsappUrl = `https://wa.me/2347025753414?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');

        toast({ 
          title: isCustomCourse ? "Custom Course Request Submitted! 👍" : "Booking Submitted Successfully! 👍", 
          description: isCustomCourse 
            ? "We've received your custom course request and will contact you with pricing details within 24 hours."
            : "We've received your request and will contact you within 24 hours.",
          duration: 8000,
          className: 'bg-green-100 border-green-400 text-green-700'
        });

        // Reset form
        setFormData({ 
          fullName: '', email: '', phone: '', location: '', ageRange: '', skillLevel: '', 
          courseInterest: '', trainingMode: 'Online (Group)', preferredTime: '', preferredSchedule: [], message: '', promoCode: '',
          otherCourseName: '' 
        });
        setIsPromoApplied(false);
        setShowCourseModal(false);
      } else {
        throw new Error(`EmailJS returned status: ${emailResult.status}`);
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      
      // More specific error messages
      let errorMessage = "Something went wrong. Please try again or contact us directly.";
      
      if (error.text) {
        errorMessage = `Email service error: ${error.text}`;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({ 
        variant: "destructive", 
        title: "Submission Error", 
        description: errorMessage, 
        duration: 6000 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const showOtherCourseField = isCustomCourse;

  return (
    <>
      <Helmet>
        <title>Book a Training - Skiva Digital Academy</title>
        <meta name="description" content="Register for a training session at Skiva Digital Academy. Fill out the form to get started on your learning journey." />
        <meta name="keywords" content="book training, tech courses, digital skills, Nigeria, Skiva Digital Academy, digital marketing" />
      </Helmet>

      {/* Course Details Modal - Only show for non-custom courses */}
      <AnimatePresence>
        {showCourseModal && selectedCourse && !isCustomCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCourseModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-primary text-white p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-4">{formData.courseInterest}</h2>
                    <p className="text-white text-lg leading-relaxed opacity-95">{selectedCourse.description}</p>
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
                
                {/* Course Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm uppercase tracking-wide opacity-90">Duration</div>
                      <div className="text-white font-medium text-lg">{selectedCourse.duration}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                      <BarChart className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm uppercase tracking-wide opacity-90">Skill Level</div>
                      <div className="text-white font-medium text-lg">{selectedCourse.level}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="p-8 overflow-y-auto max-h-[60vh]">
                <div className="space-y-8">
                  {/* Learning Requirements */}
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
                      {selectedCourse.tools.map((tool, index) => (
                        <span
                          key={index}
                          className="px-4 py-3 bg-gray-100 text-gray-800 text-sm rounded-lg font-medium border border-gray-200"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Learning Outcomes - Updated with perfect alignment */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-6 flex items-center text-lg">
                      <Target className="h-5 w-5 mr-3 text-primary" />
                      What You'll Learn
                    </h4>
                    <div className="space-y-3">
                      {selectedCourse.outcomes.map((outcome, index) => (
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

              {/* Modal Footer */}
              <div className="border-t border-gray-200 bg-white px-8 py-6">
                <div className="flex justify-end">
                  <Button
                    onClick={() => setShowCourseModal(false)}
                    className="bg-primary text-white hover:bg-primary-dark px-8 py-3 text-base font-semibold"
                  >
                    Close Preview
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white text-foreground">
        <section className="py-20 bg-gray-50 pt-32 sm:pt-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl md:text-5xl font-bold text-primary mb-4">Register Now</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-lg text-gray-600 max-w-2xl mx-auto">Complete the form to book your training. <br /> We'll confirm and match you with an instructor.</motion.p>
          </div>
        </section>
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }} 
              className="bg-white p-8 md:p-12 rounded-2xl shadow-lg"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                      <User className="h-5 w-5 text-primary" />
                      <span>Full Name</span>
                    </label>
                    <Input 
                      id="fullName" 
                      name="fullName" 
                      type="text" 
                      value={formData.fullName} 
                      onChange={handleInputChange} 
                      placeholder="John Doe" 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <span>Email Address</span>
                    </label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      placeholder="you@example.com" 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                      <Phone className="h-5 w-5 text-primary" />
                      <span>WhatsApp Phone Number</span>
                    </label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      placeholder="+1234567890" 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>Present Location (Country/State)</span>
                    </label>
                    <Input 
                      id="location" 
                      name="location" 
                      type="text" 
                      value={formData.location} 
                      onChange={handleInputChange} 
                      placeholder="Nigeria/Lagos" 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="ageRange" className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span>Age Range</span>
                    </label>
                    <select 
                      id="ageRange" 
                      name="ageRange" 
                      value={formData.ageRange} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="" disabled>Select your age range</option>
                      <option value="12-30">12-30</option>
                      <option value="31-49">31-49</option>
                      <option value="50+">50+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="skillLevel" className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                      <BarChart className="h-5 w-5 text-primary" />
                      <span>Skill Level</span>
                    </label>
                    <select 
                      id="skillLevel" 
                      name="skillLevel" 
                      value={formData.skillLevel} 
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="" disabled>Select your skill level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                {/* Course Selection with View Details Link */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="courseInterest" className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                      <Book className="h-5 w-5 text-primary" />
                      <span>Course of Interest</span>
                    </label>
                    <select 
                      id="courseInterest" 
                      name="courseInterest" 
                      value={formData.courseInterest} 
                      onChange={handleCourseChange} 
                      required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="" disabled>Select a course</option>
                      {allCourses.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                      <option value="Other">Other (Custom Course)</option>
                    </select>
                    
                    {/* View Course Details Link - Only show for non-custom courses */}
                    {formData.courseInterest && !isCustomCourse && (
                      <div className="mt-2 text-right">
                        <button
                          type="button"
                          onClick={() => setShowCourseModal(true)}
                          className="flex items-center space-x-2 text-primary hover:text-primary-dark text-sm font-medium transition-colors underline ml-auto"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View course details</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Custom Course Input Field */}
                  {showOtherCourseField && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      <label htmlFor="otherCourseName" className="flex items-center space-x-2 text-gray-700 font-medium">
                        <HelpCircle className="h-4 w-4 text-primary" />
                        <span>Describe Your Custom Course Request *</span>
                      </label>
                      <Textarea
                        id="otherCourseName"
                        name="otherCourseName"
                        value={formData.otherCourseName}
                        onChange={handleOtherCourseChange}
                        placeholder="Please describe the course you're looking for. Include topics, duration, and any specific requirements."
                        maxLength={300}
                        className="w-full min-h-[120px]"
                      />
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>We'll contact you with a custom quote based on your requirements</span>
                        <span>{formData.otherCourseName.length}/300</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Training Mode - Show different options for custom vs standard courses */}
                <div className="space-y-4">
                  <label className="flex items-center space-x-2 text-gray-700 font-medium">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Training Mode</span>
                  </label>
                  <div className="space-y-2">
                    {['Online (Group)', 'Online (One-on-one)'].map(mode => {
                      const modeOriginalPrice = getPriceForMode(formData.courseInterest, mode);
                      const modeDiscount = isPromoApplied && modeOriginalPrice !== null ? modeOriginalPrice * 0.3 : 0;
                      const modeFinalPrice = modeOriginalPrice !== null ? modeOriginalPrice - modeDiscount : null;
                      
                      return (
                        <label key={mode} className="flex items-center justify-between p-3 border rounded-lg cursor-pointer has-[:checked]:bg-secondary has-[:checked]:border-primary">
                          <div className="flex items-center space-x-3">
                            <input 
                              type="radio" 
                              name="trainingMode" 
                              value={mode} 
                              checked={formData.trainingMode === mode} 
                              onChange={handleInputChange} 
                              className="text-primary focus:ring-primary" 
                            />
                            <span className="text-gray-700 font-medium">{mode}</span>
                          </div>
                          <div className="text-right">
                            {formData.courseInterest && !isCustomCourse && (
                              <>
                                {isPromoApplied ? (
                                  <>
                                    <span className="text-green-600 font-semibold">₦{modeFinalPrice.toLocaleString()}</span>
                                    <span className="block text-sm text-gray-500 line-through">₦{modeOriginalPrice.toLocaleString()}</span>
                                  </>
                                ) : (
                                  <span className="text-primary font-semibold">₦{modeOriginalPrice.toLocaleString()}</span>
                                )}
                              </>
                            )}
                            {isCustomCourse && (
                              <span className="text-gray-500 text-sm italic">Custom Quote</span>
                            )}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Preferred Time</span>
                  </label>
                  <select 
                    id="preferredTime" 
                    name="preferredTime" 
                    value={formData.preferredTime} 
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="" disabled>Select a time</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>

                {/* Preferred Schedule - Updated Layout */}
                <div>
                  <label className="flex items-center space-x-2 text-gray-700 font-medium mb-4">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Preferred Schedule</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {allDays.map(day => (
                      <div key={day} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <Checkbox 
                          id={`schedule-${day.toLowerCase()}`} 
                          checked={formData.preferredSchedule.includes(day)} 
                          onCheckedChange={() => handleCheckboxChange(day)} 
                        />
                        <Label htmlFor={`schedule-${day.toLowerCase()}`} className="text-sm font-medium cursor-pointer">
                          {day}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="flex items-center space-x-2 text-gray-700 font-medium mb-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <span>Additional Message</span>
                  </label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    placeholder="Any specific questions or requirements?" 
                    rows={4} 
                    className="w-full"
                  />
                </div>
                
                {/* Promo Code Section - Hide for custom courses */}
                {!isCustomCourse && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-5 w-5 text-primary" />
                      <label htmlFor="promoCode" className="text-gray-700 font-medium">Promo Code (Optional)</label>
                    </div>
                    <div className={`p-4 rounded-lg border-2 ${isPromoApplied ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                          <Input
                            id="promoCode"
                            name="promoCode"
                            type="text"
                            value={formData.promoCode}
                            onChange={handlePromoCodeChange}
                            placeholder="Enter promo code"
                            className={`h-12 text-center font-medium ${isPromoApplied ? 'border-green-300 bg-white' : 'border-yellow-300'}`}
                          />
                        </div>
                        <Button
                          type="button"
                          onClick={handlePromoCodeApply}
                          disabled={!formData.promoCode.trim() || isPromoApplied}
                          className={`h-12 ${isPromoApplied ? 'bg-green-600 hover:bg-green-700' : 'bg-yellow-600 hover:bg-yellow-700'} text-white font-semibold`}
                        >
                          {isPromoApplied ? '✓ Applied' : 'Apply Code'}
                        </Button>
                      </div>
                      {isPromoApplied && (
                        <div className="mt-3 p-3 bg-green-100 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-green-800 font-semibold">🎉 30% Discount Applied!</span>
                            <span className="text-green-800 font-bold">
                              You save: ₦{discount.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-green-700 text-sm mt-1">
                            Your training fee has been reduced from ₦{originalPrice.toLocaleString()} to ₦{calculatedPrice.toLocaleString()}
                          </p>
                        </div>
                      )}
                      {!isPromoApplied && formData.promoCode && (
                        <p className="text-sm text-gray-600 mt-2 text-center">
                          Enter your discount code to receive 30% off your training fee!
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Info message for custom courses */}
                {isCustomCourse && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-blue-800 font-medium">Custom Course Request</p>
                        <p className="text-blue-700 text-sm mt-1">
                          For custom courses, we'll provide a personalized quote based on your specific requirements. 
                          Our team will contact you within 24 hours with pricing details and course customization options.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <Button 
                    type="submit" 
                    size="lg" 
                    disabled={isSubmitting} 
                    className={`w-full md:w-auto ${isCustomCourse ? 'bg-blue-600 hover:bg-blue-700' : 'bg-accent text-accent-foreground hover:bg-yellow-400'} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? 'Submitting...' : (
                      isCustomCourse 
                        ? 'Request Custom Quote' 
                        : `Book Training - ₦${calculatedPrice.toLocaleString()}`
                    )}
                  </Button>
                  {isCustomCourse && (
                    <p className="text-sm text-gray-600 mt-2">
                      No price shown - We'll provide a custom quote based on your requirements
                    </p>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BookTraining;