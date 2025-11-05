import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Clock, User, Mail, Phone, Wrench, Users, Briefcase, Monitor, Wifi, BookOpen, Brain, Info, HardDrive } from 'lucide-react';
import emailjs from '@emailjs/browser';

const coursesData = {
  'cyber-security': { title: 'Cyber Security', description: 'Learn to protect digital assets, prevent cyber threats, and secure networks in our comprehensive Cyber Security course. Ideal for aspiring security analysts.', basePrice: 150000, syllabus: ['Intro to Cyber Security', 'Network Security', 'Ethical Hacking', 'Cryptography'], tools: ['Wireshark', 'Nmap', 'Metasploit'], duration: '10 weeks' },
  'full-stack-development': { title: 'Full Stack Development', description: 'Become a complete web developer by mastering front-end and back-end technologies, from building responsive UIs to managing databases.', basePrice: 200000, syllabus: ['HTML/CSS/JS', 'React', 'Node.js & Express', 'Databases (SQL & NoSQL)'], tools: ['VS Code', 'Git', 'Postman', 'Docker'], duration: '12 weeks' },
  'ui-ux-design': { title: 'UI/UX Design', description: 'Master the art of user-centric design. Learn to create intuitive, beautiful, and effective digital products through user research, wireframing, and prototyping.', basePrice: 120000, syllabus: ['Design Principles', 'User Research', 'Wireframing & Prototyping', 'Usability Testing'], tools: ['Figma', 'Adobe XD', 'Sketch'], duration: '6 weeks' },
  'video-editing-basics': { title: 'Video Editing Basics', description: 'Learn to edit and produce professional-quality videos. This course covers everything from basic cuts to color grading and audio mixing.', basePrice: 100000, syllabus: ['Intro to Editing', 'Color Grading', 'Audio Mixing', 'Exporting for Web'], tools: ['Adobe Premiere Pro', 'DaVinci Resolve'], duration: '6 weeks' },
  'artificial-intelligence': { title: 'Artificial Intelligence', description: 'Step into the world of Artificial Intelligence. Understand the basics of machine learning, neural networks, and real-world AI applications.', basePrice: 180000, syllabus: ['Intro to AI', 'Machine Learning Concepts', 'Neural Networks', 'AI Ethics'], tools: ['Python', 'TensorFlow', 'Scikit-learn'], duration: '8 weeks' },
  'data-analysis': { title: 'Data Analysis', description: 'Learn to turn raw data into actionable insights. Master data visualization and business intelligence with industry-standard tools like Power BI and Excel.', basePrice: 130000, syllabus: ['Data Cleaning', 'Data Visualization', 'DAX Functions', 'Building Dashboards'], tools: ['Power BI', 'Microsoft Excel'], duration: '8 weeks' },
  'search-engine-optimization-seo': { title: 'Search Engine Optimization (SEO)', description: 'Learn how to optimize websites and content to rank higher on search engines, drive organic traffic, and improve online visibility.', basePrice: 110000, syllabus: ['Keyword Research', 'On-Page SEO', 'Off-Page SEO', 'Technical SEO'], tools: ['Google Analytics', 'SEMrush', 'Ahrefs'], duration: '6 weeks' },
  'book-publishing': { title: 'Book Publishing', description: 'Learn how to edit, design, publish, and market books in print and digital formats for a professional audience reach.', basePrice: 140000, syllabus: ['Manuscript Preparation', 'Cover Design', 'Ebook & Print Formatting', 'Publishing to Amazon KDP'], tools: ['Microsoft Word', 'Kindle Create', 'Canva'], duration: '8 weeks' },
  'photo-editing-retouching': { title: 'Photo Editing / Retouching', description: 'Master professional photo enhancement and retouching techniques for stunning visuals.', basePrice: 95000, syllabus: ['Intro to Lightroom & Photoshop', 'Color Correction', 'Advanced Retouching', 'Exporting for Different Media'], tools: ['Adobe Lightroom', 'Adobe Photoshop'], duration: '5 weeks' },
  'graphics-brand-identity-design': { title: 'Graphic / Brand Identity Design', description: 'Master the art of visual storytelling and brand creation. Learn to design stunning graphics, build strong brand identities, and craft visuals that connect emotionally and professionally.', basePrice: 90000, syllabus: ['Visual Communication, Colour Theory & Typography', 'Logos, Mood Boards & Brand Guidelines', 'Print & Digital Design — Flyers, Posters, Social Media Graphics', 'Portfolio Design & Client Pitching'], tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign'], duration: '8 weeks (2 sessions per week)', customPrices: { 'Online (Group)': 90000, 'Online (One-on-one)': 120000, 'Physical (One-on-one)': 180000 } },
  'character-animations': { title: 'Character Animations', description: 'Bring characters to life through rigging, keyframing, and movement.', basePrice: 130000, syllabus: ['Animation principles', 'Rigging characters', 'Motion graphics', 'Storytelling in animation'], tools: ['Adobe After Effects', 'Blender', 'Toon Boom', 'Moho'], duration: '8 Weeks' },
  'social-media-marketing': { title: 'Social Media Marketing', description: 'Master the art of social media to grow brands and communities.', basePrice: 110000, syllabus: ['Social strategy setup', 'Content planning', 'Paid ads & campaigns', 'Analytics & growth'], tools: ['Meta Business Suite', 'Canva', 'Buffer', 'Google Analytics'], duration: '6 Weeks' },
  'website-design': { title: 'Website Design', description: 'Create modern, user-friendly websites with strong layouts and smooth navigation.', basePrice: 150000, syllabus: ['Web design basics', 'Responsive layouts', 'UI/UX principles', 'Hosting & launch'], tools: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'Figma'], duration: '8 Weeks' },
  'mobile-app-development': { title: 'Mobile App Development', description: 'Create applications for iOS and Android devices.', basePrice: 180000, syllabus: ['Mobile UI design', 'App development basics', 'Backend integration', 'Deployment to stores'], tools: ['Flutter', 'React Native', 'Android Studio', 'Figma'], duration: '10 Weeks' },
  'python-programming': { title: 'Python Programming', description: 'Master the versatile and powerful Python programming language.', basePrice: 140000, syllabus: ['Python basics', 'Data handling', 'Functions & modules', 'Simple projects'], tools: ['Python', 'Jupyter Notebook', 'VS Code', 'GitHub'], duration: '8 Weeks' },
  'internet-of-things-fundamentals': { title: 'Internet of Things (Fundamentals)', description: 'Learn how smart devices connect, communicate, and power industries.', basePrice: 160000, syllabus: ['IoT basics', 'Sensors & devices', 'Connectivity protocols', 'Smart projects'], tools: ['Arduino', 'Raspberry Pi', 'Python', 'MQTT'], duration: '8 Weeks' },
  'ict-fundamentals': { title: 'ICT Fundamentals', description: 'Master MS Excel, Access, and Word for office productivity.', basePrice: 70000, syllabus: ['Basic computer use', 'Word & Excel', 'Internet & email', 'File management'], tools: ['Microsoft Office', 'Windows OS', 'Google Workspace'], duration: '4 Weeks' },
  'front-end-development': { title: 'Front-End Development', description: 'Learn how to build beautiful, responsive, and interactive websites. This course covers the essentials of modern web interfaces using HTML, CSS, and JavaScript, helping you create stunning, user-friendly front-end experiences.', basePrice: 120000, syllabus: ['Introduction to Web Development', 'HTML5 & Semantic Structure', 'CSS3 & Responsive Design (Flexbox, Grid)', 'JavaScript Fundamentals', 'DOM Manipulation & Events', 'Version Control (Git & GitHub)', 'Frameworks: React (Basics)', 'Project: Build and Deploy a Portfolio Website'], tools: ['VS Code', 'Google Chrome Developer Tools', 'Git & GitHub', 'Figma', 'Netlify / Vercel'], duration: '8-10 weeks' },
  'back-end-development': { title: 'Back-End Development', description: 'Master the logic and functionality behind web applications. Learn how to build secure servers, manage databases, and create powerful APIs that drive dynamic apps.', basePrice: 120000, syllabus: ['Introduction to Backend & Client-Server Architecture', 'Node.js Fundamentals', 'Express.js Framework', 'Working with Databases (MongoDB / MySQL)', 'RESTful API Design', 'Authentication & Authorization (JWT)', 'Deployment & Hosting', 'Final Project: Build a REST API with Authentication'], tools: ['VS Code', 'Node.js & npm', 'Postman', 'Git & GitHub', 'MongoDB Atlas / MySQL Workbench', 'Render / Railway'], duration: '10-12 weeks' },
  '3d-modelling': { title: '3D Modelling', description: 'Explore the world of 3D art and design. Learn how to model, texture, light, and render realistic objects and scenes for games, animation, and visual presentations.', basePrice: 120000, syllabus: ['Introduction to 3D Design Concepts', 'Understanding Meshes, Polygons, and Topology', 'Modelling Techniques (Objects, Characters, Environments)', 'Texturing & Materials', 'Lighting & Rendering', 'Animation Basics', 'Exporting & Presentation of 3D Projects', 'Final Project: Create a Detailed 3D Scene'], tools: ['Blender', 'Autodesk Maya (Optional)', 'Substance Painter', 'Photoshop'], duration: '8-10 weeks' },
  'data-science': { title: 'Data Science', description: 'Learn to collect, analyze, and visualize data using Python and key analytical tools. Gain hands-on experience turning data into insights for real-world decision-making.', basePrice: 120000, syllabus: ['Introduction to Data Science & Data Ecosystem', 'Python Programming for Data Analysis', 'Data Cleaning and Manipulation (NumPy, Pandas)', 'Data Visualization (Matplotlib, Seaborn, Power BI)', 'Statistics & Probability for Data Science', 'Machine Learning Fundamentals (Scikitlearn)', 'Working with Realworld Datasets', 'Final Project: Analyze and Visualize a Dataset'], tools: ['Python (Anaconda / Jupyter Notebook)', 'Pandas, NumPy, Matplotlib, Seaborn', 'Scikitlearn', 'Power BI / Tableau (for visualization)', 'Git & GitHub'], duration: '10-12 weeks' },
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const { toast } = useToast();
  const course = coursesData[courseId] || { title: 'Course Not Found', description: '', syllabus: [], tools: [], duration: '', basePrice: 0 };

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', sponsor: 'Self', trainingPreference: 'Online (Group)', preferredTime: 'Morning' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(course.basePrice);
  const [exchangeRate, setExchangeRate] = useState(1400); // Fallback rate

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
      } else if (formData.trainingPreference === 'Physical (One-on-one)') {
        price *= 2;
      }
    }
    setCalculatedPrice(price);
  }, [formData.trainingPreference, course]);

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
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold font-heading mb-6">Course Details</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold font-heading mb-3">Syllabus</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {course.syllabus.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold font-heading mb-3 flex items-center"><Wrench className="w-5 h-5 mr-2 text-primary" /> Tools & Software</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.tools.map((tool, i) => <span key={i} className="bg-secondary text-secondary-foreground text-sm font-medium px-3 py-1 rounded-full">{tool}</span>)}
                  </div>
                </div>
                <div className="flex items-center space-x-8 text-muted-foreground pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>Duration: {course.duration}</span>
                  </div>
                </div>
              </div>
              <div className="mt-12 bg-secondary p-6 rounded-lg">
                <h3 className="text-xl font-semibold font-heading mb-4">Course Learning Requirements</h3>
                <ul className="space-y-3 text-muted-foreground text-sm">
                  <li className="flex items-start"><Monitor className="w-4 h-4 mr-3 mt-1 text-primary" /><span><b>Laptop/Computer:</b> At least 8GB RAM, Core i5/i7 processor.</span></li>
                  <li className="flex items-start"><HardDrive className="w-4 h-4 mr-3 mt-1 text-primary" /><span><b>Storage:</b> 256GB SSD recommended for smooth performance.</span></li>
                  <li className="flex items-start"><Wifi className="w-4 h-4 mr-3 mt-1 text-primary" /><span><b>Internet Access:</b> Stable connection (5–10 Mbps recommended).</span></li>
                  <li className="flex items-start"><BookOpen className="w-4 h-4 mr-3 mt-1 text-primary" /><span><b>Notebook/Journal:</b> For taking notes and tracking progress.</span></li>
                  <li className="flex items-start"><Clock className="w-4 h-4 mr-3 mt-1 text-primary" /><span><b>Time Commitment:</b> Dedicate 5–10 hours weekly for classes/projects.</span></li>
                  <li className="flex items-start"><Brain className="w-4 h-4 mr-3 mt-1 text-primary" /><span><b>Learning Mindset:</b> Be ready to practice, collaborate, and grow.</span></li>
                </ul>
              </div>
            </div>
            
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
                <div><Label htmlFor="trainingPreference" className="flex items-center space-x-2 mb-1"><Users className="w-4 h-4" /><span>Training Preference</span></Label><select id="trainingPreference" name="trainingPreference" value={formData.trainingPreference} onChange={handleInputChange} required className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"><option value="Online (Group)">Online (Group)</option><option value="Online (One-on-one)">Online (One-on-one)</option><option value="Physical (One-on-one)">Physical (One-on-one)</option></select></div>
                {formData.trainingPreference === 'Physical (One-on-one)' && <div className="flex items-start p-3 text-xs text-blue-800 rounded-lg bg-blue-50"><Info className="w-8 h-8 mr-2 text-blue-500" /><span>For physical (1-on-1) training, please note that if your chosen location is outside the instructor's proximity, transportation costs may apply for each session.</span></div>}
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